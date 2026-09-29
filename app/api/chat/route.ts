import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { model, CAPSTONE_SYSTEM_PROMPT } from '@/lib/ai-config';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('Missing GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY.');
      return Response.json(
        { error: 'The AI service is not configured.' },
        { status: 500 }
      );
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Payload must contain a valid messages array.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = streamText({
      model,
      system: CAPSTONE_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error('AI chat stream failed:', error);
        return 'The assistant could not complete the response.';
      },
    });
  } catch (error) {
    console.error('Streaming error in /api/chat:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal Server Error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
