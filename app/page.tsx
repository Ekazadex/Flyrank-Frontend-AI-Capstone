import Link from 'next/link';

const links = [
  { href: '/overview', label: 'Overview', blurb: 'A clear snapshot of the product vision and priorities.' },
  { href: '/dashboard', label: 'Dashboard', blurb: 'A refined command center for status, metrics, and activity.' },
  { href: '/insights', label: 'Insights', blurb: 'A thoughtful space for recommendations and reflection.' },
  { href: '/settings', label: 'Settings', blurb: 'A calm control surface for preferences and account flow.' },
  { href: '/health', label: 'Health Check', blurb: 'A live data view that proves the experience is functioning.' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_36%),linear-gradient(135deg,_#f8fbff_0%,_#f5f7fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.32)] backdrop-blur sm:p-10 lg:p-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">FlyRank FE-04 • Foundations</p>
              <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
                A thoughtful capstone experience, designed like a real product.
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                This project brings together a polished shell, clear app states, and a live health view so the experience feels complete from day one.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
              <p className="font-medium text-slate-900">Current status</p>
              <p className="mt-1">Preview-ready • Responsive • Build verified</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">{item.label}</h2>
                <span className="text-slate-400 transition group-hover:text-slate-900">↗</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.blurb}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
