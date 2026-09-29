import { ReactNode, useId, useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
}

/**
 * Accessible Tabs Component
 * 
 * W3C ARIA Pattern: Tabs
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 * 
 * Features:
 * - role="tablist" for container, role="tab" for each tab
 * - aria-selected indicates active tab
 * - aria-controls links tab to tabpanel
 * - Keyboard: Arrow keys (←/→) to navigate, Tab to focus first tab
 * - Automatically selects first tab on init
 */
export function Tabs({ items, defaultTabId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId || items[0]?.id || ''
  );
  const tablistId = useId();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = index > 0 ? index - 1 : items.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = index < items.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    setActiveTabId(items[newIndex].id);
    // Focus the newly selected tab
    setTimeout(() => {
      const tabElement = document.getElementById(`tab-${items[newIndex].id}`);
      tabElement?.focus();
    }, 0);
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Tab List */}
      <div
        role="tablist"
        id={tablistId}
        className="flex border-b border-slate-200 bg-slate-50"
      >
        {items.map((item, index) => {
          const tabId = `tab-${item.id}`;
          const panelId = `panel-${item.id}`;
          const isActive = activeTabId === item.id;

          return (
            <button
              key={item.id}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTabId(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`flex-1 px-4 py-3 font-medium text-sm transition ${
                isActive
                  ? 'text-slate-900 border-b-2 border-blue-600 bg-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div>
        {items.map((item) => {
          const panelId = `panel-${item.id}`;
          const isActive = activeTabId === item.id;

          return (
            <div
              key={item.id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              hidden={!isActive}
              className="p-6 text-slate-600"
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Demo component showing Tabs usage
 */
export function TabsDemo() {
  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div>
          <h3 className="font-semibold text-slate-900">Overview Tab</h3>
          <p className="mt-2">
            Use arrow keys (←/→) or Home/End to navigate between tabs.
            Tab key focuses the first tab in the list.
          </p>
        </div>
      ),
    },
    {
      id: 'keyboard',
      label: 'Keyboard Guide',
      content: (
        <div>
          <h3 className="font-semibold text-slate-900">Keyboard Navigation</h3>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li><kbd>→</kbd> or <kbd>↓</kbd> moves to next tab</li>
            <li><kbd>←</kbd> or <kbd>↑</kbd> moves to previous tab</li>
            <li><kbd>Home</kbd> selects first tab</li>
            <li><kbd>End</kbd> selects last tab</li>
            <li><kbd>Tab</kbd> moves to tab content</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'wcag',
      label: 'WCAG Compliance',
      content: (
        <div>
          <h3 className="font-semibold text-slate-900">WCAG 2.1 Level A</h3>
          <p className="mt-2 text-sm">
            This component follows W3C ARIA Authoring Practices for Tabs pattern,
            ensuring full keyboard accessibility and screen reader support.
          </p>
        </div>
      ),
    },
  ];

  return <Tabs items={tabs} defaultTabId="overview" />;
}
