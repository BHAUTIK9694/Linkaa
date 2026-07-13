import { useEffect, useRef, useState } from 'react';

/**
 * Observe an element and report when it scrolls into the viewport.
 * Powers scroll-reveal animations without a heavy dependency.
 *
 * @param {object} [options]
 * @param {number} [options.threshold=0.15] - visible ratio that triggers "in view"
 * @param {string} [options.rootMargin='0px 0px -10% 0px'] - IO root margin
 * @param {boolean} [options.once=true] - stop observing after first reveal
 * @returns {[React.RefObject<HTMLElement>, boolean]} ref to attach, and in-view state
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Reduced-motion or no IO support: reveal immediately.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
