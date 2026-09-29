'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/overview', label: 'Overview' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/insights', label: 'Insights' },
  { href: '/settings', label: 'Settings' },
  { href: '/health', label: 'Health' },
  { href: '/playground', label: 'Playground (FE-05)' },
  { href: '/chat', label: 'AI Chat (FE-06)' },
];

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-base font-semibold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
            FR
          </span>
          <span>FlyRank AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-nowrap items-center gap-1 whitespace-nowrap text-xs text-slate-600 lg:flex xl:gap-2 xl:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-2 py-2 transition hover:bg-slate-100 hover:text-slate-900 xl:px-3"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg p-1.5 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
        >
          <svg
            className="w-6 h-6 text-slate-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-x-0 bottom-0 top-[69px] z-40 cursor-default bg-black/45 lg:hidden"
          />
          <div
            id="mobile-navigation-menu"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-69px)] overflow-y-auto border-t border-slate-200/80 bg-white px-4 py-3 shadow-lg lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
