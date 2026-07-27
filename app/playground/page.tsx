'use client';

import { ModalDemo } from '@/playground/components/Modal';
import { TabsDemo } from '@/playground/components/Tabs';
import { DisclosureDemo } from '@/playground/components/Disclosure';

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">FE-05</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Accessible Component Playground
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Three keyboard-accessible components built from scratch using W3C ARIA Authoring Practices.
            Test each component with Tab, Escape, and arrow keys.
          </p>
        </section>

        {/* Component 1: Modal */}
        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-slate-900">1. Modal Dialog</h2>
          <p className="mt-2 text-slate-600 text-sm">
            W3C ARIA Pattern: Dialog (Modal) —{' '}
            <a
              href="https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View spec
            </a>
          </p>
          <div className="mt-6">
            <ModalDemo />
          </div>
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer font-medium text-slate-700">Features:</summary>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
              <li>Focus trap: Tab/Shift+Tab wraps inside modal</li>
              <li>Escape key closes dialog</li>
              <li>Focus returns to trigger button on close</li>
              <li>Backdrop click also closes</li>
              <li><code>role="dialog"</code> with <code>aria-modal="true"</code></li>
            </ul>
          </details>
        </section>

        {/* Component 2: Tabs */}
        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-slate-900">2. Tabs</h2>
          <p className="mt-2 text-slate-600 text-sm">
            W3C ARIA Pattern: Tabs —{' '}
            <a
              href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View spec
            </a>
          </p>
          <div className="mt-6">
            <TabsDemo />
          </div>
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer font-medium text-slate-700">Features:</summary>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
              <li>Arrow keys navigate between tabs (←/→ or ↑/↓)</li>
              <li>Home/End jump to first/last tab</li>
              <li>Focus trap within tablist (roving tabindex)</li>
              <li><code>aria-selected</code> indicates active tab</li>
              <li><code>aria-controls</code> links tab to panel</li>
            </ul>
          </details>
        </section>

        {/* Component 3: Disclosure */}
        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-slate-900">3. Disclosure</h2>
          <p className="mt-2 text-slate-600 text-sm">
            W3C ARIA Pattern: Disclosure (Show/Hide) —{' '}
            <a
              href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View spec
            </a>
          </p>
          <div className="mt-6">
            <DisclosureDemo />
          </div>
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer font-medium text-slate-700">Features:</summary>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
              <li>Space/Enter toggles disclosure</li>
              <li>Tab moves between multiple disclosures</li>
              <li><code>aria-expanded</code> indicates open/closed state</li>
              <li>Content removed from DOM when closed (performance)</li>
              <li><code>role="region"</code> marks content as significant</li>
            </ul>
          </details>
        </section>

        {/* Testing Instructions */}
        <section className="mt-8 rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-emerald-900">🧪 Testing Checklist</h2>
          <ul className="list-disc list-inside mt-4 space-y-2 text-emerald-800">
            <li>Test <strong>keyboard-only</strong> (no mouse)</li>
            <li>Use Tab to navigate between components</li>
            <li>Verify arrow keys work in Tabs</li>
            <li>Check modal focus trap (Tab cannot escape)</li>
            <li>Test Escape key closes modal</li>
            <li>Verify Space/Enter toggles Disclosure</li>
            <li>Open browser DevTools → Elements → check ARIA attributes</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
