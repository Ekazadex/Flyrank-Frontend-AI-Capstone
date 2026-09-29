const cards = [
  { title: 'Weekly momentum', value: '+18%', note: 'Ahead of target' },
  { title: 'Active focus', value: '7', note: 'Priority initiatives' },
  { title: 'Team health', value: '92%', note: 'Strong alignment' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">A calm, high-signal workspace.</h1>
              <p className="mt-3 max-w-2xl text-slate-600">This section is designed to feel like a real operating surface—clear, composed, and ready for product detail.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Updated 2 minutes ago
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">{card.title}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
                <p className="mt-2 text-sm text-slate-600">{card.note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
