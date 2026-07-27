import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/overview', label: 'Overview' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/insights', label: 'Insights' },
  { href: '/settings', label: 'Settings' },
  { href: '/health', label: 'Health' },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-base font-semibold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
            FR
          </span>
          <span>FlyRank Studio</span>
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
