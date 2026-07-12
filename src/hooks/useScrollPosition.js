import { useEffect, useState } from 'react';

/**
 * Track whether the page has scrolled past a threshold.
 * Useful for toggling a "scrolled" state on a sticky header.
 *
 * @param {number} [threshold=8] pixels scrolled before returning true
 * @returns {boolean}
 */
export function useScrollPosition(threshold = 8) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
