const insights = [
  { title: 'Signal quality', body: 'The interface prioritizes important information without overwhelming the reader.' },
  { title: 'Flow confidence', body: 'Navigation feels obvious, making the app easier to understand at a glance.' },
  { title: 'Momentum', body: 'The experience feels complete enough to support a confident first impression.' },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Insights</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">A thoughtful view into the experience.</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Small details matter here: tone, pacing, clarity, and rhythm all shape how the product feels.</p>

        <div className="mt-8 space-y-4">
          {insights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
