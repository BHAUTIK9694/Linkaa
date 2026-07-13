import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll parallax. Translates the referenced element on the Y axis
 * relative to its position in the viewport, driven by requestAnimationFrame.
 *
 * @param {number} [speed=0.15] - fraction of scroll distance to offset by.
 *   Positive moves slower than scroll (drifts down), negative drifts up.
 * @returns {React.RefObject<HTMLElement>} ref to attach to the moving element
 */
export function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let frame = null;

    const update = () => {
      frame = null;
      const rect = node.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      // Distance of element center from viewport center, normalized.
      const offset = rect.top + rect.height / 2 - viewportH / 2;
      node.style.transform = `translate3d(0, ${(-offset * speed).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame == null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame != null) window.cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
