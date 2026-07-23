import { useEffect } from 'react';

/**
 * Traps keyboard focus within a container when active.
 * When the trap is active, Tab/Shift+Tab cycle through focusable elements
 * inside the ref, and Escape calls the onEscape callback.
 *
 * @param {React.RefObject} ref - ref to the container element
 * @param {boolean} active - whether the trap is currently active
 * @param {{ onEscape?: () => void }} [options]
 */
export function useFocusTrap(ref, active, { onEscape } = {}) {
  useEffect(() => {
    if (!active || !ref.current) return;

    const container = ref.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function getFocusable() {
      return [...container.querySelectorAll(focusableSelector)];
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    // Focus the first focusable element when trap activates
    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ref, active, onEscape]);
}
