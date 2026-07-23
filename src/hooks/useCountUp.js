import { useState, useEffect, useRef } from 'react';

/**
 * Animated count-up hook. Counts from 0 to `end` over `duration` ms
 * once the element is in view (controlled externally via `inView` flag).
 * Respects prefers-reduced-motion by showing the final value immediately.
 *
 * @param {number} end - target number
 * @param {object} [options]
 * @param {number} [options.duration=1500] - animation duration in ms
 * @param {boolean} [options.inView=false] - whether the element is in viewport
 * @returns {number} current animated value
 */
export function useCountUp(end, { duration = 1500, inView = false } = {}) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(end);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    let startTime = null;
    let rafId;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, inView]);

  return value;
}
