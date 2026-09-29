import { ReactNode, useId, useState } from 'react';

interface DisclosureProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Accessible Disclosure Component (Collapsible Section)
 * 
 * W3C ARIA Pattern: Disclosure (Show/Hide)
 * https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 * 
 * Features:
 * - Button with aria-expanded to indicate state
 * - aria-controls links button to content
 * - Keyboard: Space/Enter to toggle, no focus trap needed
 * - Screen reader announces expand/collapse state
 */
export function Disclosure({ title, children, defaultOpen = false }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Disclosure Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-900 transition"
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 text-slate-600 transition transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Disclosure Content */}
      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={`disclosure-title-${contentId}`}
          className="px-6 py-4 border-t border-slate-200 bg-white text-slate-600"
        >
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Demo component showing multiple Disclosure components
 */
export function DisclosureDemo() {
  return (
    <div className="space-y-3">
      <Disclosure title="What is FE-05?">
        <p>
          FE-05 is about building accessible components from scratch. You learn keyboard
          interaction, focus management, and ARIA patterns by implementing them yourself.
        </p>
      </Disclosure>

      <Disclosure title="Keyboard Interaction">
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li><kbd>Space</kbd> or <kbd>Enter</kbd> toggles disclosure</li>
          <li><kbd>Tab</kbd> moves between disclosures</li>
          <li>Content is removed from DOM when closed (for performance)</li>
          <li><code className="bg-slate-100 px-2 py-1 rounded text-xs">aria-expanded</code> indicates state</li>
        </ul>
      </Disclosure>

      <Disclosure title="Why Build from Scratch?" defaultOpen={true}>
        <p>
          Building accessible components by hand teaches you the principles behind
          design patterns. When you read shadcn/ui code later, you understand the
          implementation choices instead of just copying.
        </p>
      </Disclosure>

      <Disclosure title="ARIA Attributes Used">
        <div className="space-y-2 text-sm">
          <p><code className="bg-slate-100 px-2 py-1 rounded">aria-expanded</code>: Indicates if disclosure is open/closed</p>
          <p><code className="bg-slate-100 px-2 py-1 rounded">aria-controls</code>: Links button to content</p>
          <p><code className="bg-slate-100 px-2 py-1 rounded">role="region"</code>: Marks content as significant</p>
        </div>
      </Disclosure>
    </div>
  );
}
