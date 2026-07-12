import { useCallback, useState } from 'react';

/**
 * Manage boolean open/close state (menus, modals, accordions).
 *
 * @param {boolean} [initial=false]
 * @returns {{ isOpen: boolean, open: () => void, close: () => void, toggle: () => void }}
 */
export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}
