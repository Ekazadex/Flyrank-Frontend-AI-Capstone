import { ReactNode, useId, useState } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Accessible Modal Dialog Component
 * 
 * W3C ARIA Pattern: Dialog (Modal)
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
 * 
 * Features:
 * - role="dialog" with aria-modal="true"
 * - Focus trap: prevents focus leaving dialog
 * - Escape key closes dialog
 * - Returns focus to trigger on close
 * - aria-labelledby points to title
 */
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const titleId = useId();
  const focusTrapRef = useFocusTrap(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with click-to-close */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Title */}
        <h2 id={titleId} className="text-2xl font-semibold text-slate-900">
          {title}
        </h2>

        {/* Modal Content */}
        <div className="mt-4 text-slate-600">
          {children}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-lg transition"
          aria-label="Close dialog"
        >
          Close
        </button>
      </div>
    </>
  );
}

/**
 * Demo component showing Modal usage
 */
export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        Open Modal (FE-05 Accessible)
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Accessible Modal Example"
      >
        <p>
          This modal is fully keyboard accessible:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
          <li><kbd>Tab</kbd> to navigate buttons (focus trapped)</li>
          <li><kbd>Escape</kbd> to close</li>
          <li>Focus returns to trigger button on close</li>
        </ul>
      </Modal>
    </div>
  );
}
