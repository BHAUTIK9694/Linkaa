import { useEffect, useRef } from 'react';

/**
 * Pointer-driven parallax. Tracks the cursor across the referenced element and
 * writes two normalized custom properties onto it — `--px` and `--py`, each in
 * the range [-1, 1] — so any descendant can offset itself by an arbitrary depth
 * via `translate: calc(var(--px) * <depth>) calc(var(--py) * <depth>)`.
 *
 * Uses requestAnimationFrame for smoothness, resets to center on leave, and is
 * disabled for coarse pointers and reduced-motion users (vars stay at 0).
 *
 * @returns {React.RefObject<HTMLElement>} ref to attach to the tracking element
 */
export function usePointerParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia?.('(hover: none)').matches;
    if (reduce || coarse) return undefined;

    let frame = null;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = null;
      node.style.setProperty('--px', px.toFixed(3));
      node.style.setProperty('--py', py.toFixed(3));
    };

    const schedule = () => {
      if (frame == null) frame = window.requestAnimationFrame(apply);
    };

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };

    const onLeave = () => {
      px = 0;
      py = 0;
      schedule();
    };

    node.addEventListener('pointermove', onMove, { passive: true });
    node.addEventListener('pointerleave', onLeave, { passive: true });

    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      if (frame != null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
