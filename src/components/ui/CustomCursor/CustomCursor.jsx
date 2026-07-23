import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import styles from './CustomCursor.module.css';

/**
 * Premium custom cursor for Livantaa — an "atelier viewfinder".
 *
 * Rather than a generic circle, the cursor frames the pointer like a gallery
 * viewfinder, echoing the care Livantaa takes in composing each piece:
 * - `dot`     — a precise center point that tracks the pointer instantly.
 * - `frame`   — four corner brackets that ease behind the pointer with spring
 *               lag, bloom outward over interactive elements, rotate subtly,
 *               and contract on press.
 * - `label`   — an optional contextual word (e.g. "View", "Explore") revealed
 *               for elements that declare `data-cursor-text`.
 *
 * Performance notes:
 * - All positioning is written straight to the DOM inside a single
 *   requestAnimationFrame loop — no React state churn, no re-render per move.
 * - Only mounts for fine pointers (mouse) with motion enabled; touch devices
 *   and reduced-motion users keep the native cursor.
 * - `mix-blend-mode: difference` keeps the monochrome cursor legible on any
 *   surface by inverting against whatever sits behind it.
 *
 * Author interactive elements can opt into richer states:
 * - `data-cursor="hover"`      → force the expanded hover state
 * - `data-cursor="media"`      → reveal the leaf mark (used on images/cards)
 * - `data-cursor-text="View"`  → reveal a contextual label
 *
 * @param {object} props
 * @param {number} [props.ease=0.18] - Frame follow easing (0–1, lower = laggier)
 */
function CustomCursor({ ease = 0.18 }) {
  const hasFinePointer = useMediaQuery('(pointer: fine)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = hasFinePointer && !prefersReducedMotion;

  const dotRef = useRef(null);
  const frameRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const dot = dotRef.current;
    const frame = frameRef.current;
    const label = labelRef.current;
    if (!dot || !frame || !label) return undefined;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const framePos = { ...target };
    const labelPos = { ...target };
    let visible = false;
    let raf = 0;
    let idleTimeout = 0;
    let isIdle = false;

    const interactiveSelector =
      'a, button, input, textarea, select, label, summary, ' +
      '[role="button"], [data-cursor="hover"], [data-cursor="media"], [data-cursor-text]';
    const mediaSelector = 'img, [data-cursor="media"]';

    const render = () => {
      // Frame eases behind the pointer for a fluid, weighted trail.
      framePos.x += (target.x - framePos.x) * ease;
      framePos.y += (target.y - framePos.y) * ease;
      // Label follows a touch faster than the frame but slower than the dot.
      labelPos.x += (target.x - labelPos.x) * (ease + 0.14);
      labelPos.y += (target.y - labelPos.y) * (ease + 0.14);

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      frame.style.transform = `translate3d(${framePos.x}px, ${framePos.y}px, 0) translate(-50%, -50%)`;
      label.style.transform = `translate3d(${labelPos.x}px, ${labelPos.y}px, 0) translate(-50%, -50%)`;

      if (!isIdle) {
        raf = window.requestAnimationFrame(render);
      }
    };

    const handleMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        document.body.classList.add(styles.active);
      }
      // Resume RAF loop if idle
      if (isIdle) {
        isIdle = false;
        raf = window.requestAnimationFrame(render);
      }
      // Reset idle timer
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isIdle = true;
      }, 2000);
    };

    const handleLeave = () => {
      visible = false;
      document.body.classList.remove(styles.active);
    };

    const handleEnter = () => {
      visible = true;
      document.body.classList.add(styles.active);
    };

    const handleOver = (event) => {
      const el = event.target?.closest?.(interactiveSelector);
      frame.classList.toggle(styles.hover, Boolean(el));

      const isMedia = Boolean(event.target?.closest?.(mediaSelector));
      frame.classList.toggle(styles.media, isMedia);

      const text = el?.dataset?.cursorText;
      if (text) {
        label.textContent = text;
        label.classList.add(styles.show);
        frame.classList.add(styles.labelled);
      } else {
        label.classList.remove(styles.show);
        frame.classList.remove(styles.labelled);
      }
    };

    const handleDown = () => frame.classList.add(styles.press);
    const handleUp = () => frame.classList.remove(styles.press);

    document.body.classList.add(styles.hideNative);
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    raf = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(raf);
      clearTimeout(idleTimeout);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.body.classList.remove(styles.hideNative, styles.active);
    };
  }, [enabled, ease]);

  if (!enabled) return null;

  return (
    <>
      <div ref={frameRef} className={styles.frame} aria-hidden="true">
        <span className={styles.corners}>
          <i className={styles.corner} data-c="tl" />
          <i className={styles.corner} data-c="tr" />
          <i className={styles.corner} data-c="bl" />
          <i className={styles.corner} data-c="br" />
        </span>
      </div>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <span ref={labelRef} className={styles.label} aria-hidden="true" />
    </>
  );
}

export default CustomCursor;
