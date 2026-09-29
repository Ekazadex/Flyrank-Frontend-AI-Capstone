import type { Metadata } from 'next';
import './globals.css';
import { SiteNav } from '@/components/site-nav';

export const metadata: Metadata = {
  title: 'FlyRank Capstone',
  description: 'Frontend AI Engineering capstone skeleton with placeholder routes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <SiteNav />
          {children}
        </div>
      </body>
    </html>
  );
}
