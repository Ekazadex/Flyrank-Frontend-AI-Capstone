const highlights = [
  'Mission-led product thinking',
  'Clear information hierarchy',
  'Thoughtful interactions and spacing',
];

export default function OverviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Overview</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">A product story that feels intentional.</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">The experience is shaped around clarity, confidence, and calm. Every section is designed to feel considered rather than assembled.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
