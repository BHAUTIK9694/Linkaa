import { useMemo } from 'react';
import { cn } from '@utils/classNames';
import styles from './FloatingLeaves.module.css';

/**
 * Decorative, nature-inspired leaves that drift and sway gently across a
 * section — echoing Livantaa's timber/craft branding. Pure CSS animation, so
 * there is zero JavaScript cost at runtime. Purely ornamental and hidden from
 * assistive tech; disabled entirely for reduced-motion users.
 *
 * @param {object} props
 * @param {number} [props.count=8] - Number of leaves to scatter
 * @param {'light'|'dark'} [props.theme='light'] - Surface context for tint
 * @param {string} [props.className]
 */

/* Two elegant leaf silhouettes for subtle variety. */
const LEAF_SHAPES = [
  // Simple pointed leaf with a central vein.
  'M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12Zm0 3.5c3 2.6 5 5.6 5 8.5a5 5 0 0 1-4 4.9V9a1 1 0 0 0-2 0v9.9A5 5 0 0 1 7 14c0-2.9 2-5.9 5-8.5Z',
  // Broad, curved leaf with stem.
  'M20 3C10 4 4 9 4 16c0 2 .6 3.6 1.5 4.9L4 22.5 5.4 24l1.7-1.6C8.4 23.4 10 24 12 24c7 0 13-8 13-18 0-1 0-2-.2-3-1.3 0-2.7 0-4.8 0Zm-1 3c.6 0 1.2 0 1.7.1C21 13 16.5 20 11.5 20.8c1.4-3.6 3.9-7 7.5-9.3-4.4 1.4-7.9 4.5-9.9 8.3C9 15 12.8 6.7 19 6Z',
];

function FloatingLeaves({ count = 8, theme = 'light', className }) {
  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = 16 + Math.random() * 22;
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = 16 + Math.random() * 14;
      const rotate = Math.random() * 360;
      const drift = -70 + Math.random() * 140;
      const opacity = 0.05 + Math.random() * 0.09;
      const sway = 3 + Math.random() * 5;

      return {
        id: i,
        size,
        shape: LEAF_SHAPES[i % LEAF_SHAPES.length],
        style: {
          '--l-left': `${left}%`,
          '--l-delay': `${delay}s`,
          '--l-duration': `${duration}s`,
          '--l-rotate': `${rotate}deg`,
          '--l-drift': `${drift}px`,
          '--l-opacity': opacity,
          '--l-sway': `${sway}deg`,
        },
      };
    });
  }, [count]);

  return (
    <div
      className={cn(styles.field, theme === 'dark' && styles.dark, className)}
      aria-hidden="true"
    >
      {leaves.map((leaf) => (
        <span key={leaf.id} className={styles.leaf} style={leaf.style}>
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={leaf.shape} />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default FloatingLeaves;
