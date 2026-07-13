import { cn } from '@utils/classNames';
import styles from './Logo.module.css';

/**
 * Brand logo rendered as inline SVG using `currentColor`, so a single asset
 * adapts to any background (dark header, light footer). This is the ONLY
 * place the Livantaa mark is defined — never duplicate the SVG elsewhere.
 *
 * @param {object} props
 * @param {'full'|'icon'} [props.variant='full'] - wordmark + mark, or mark only
 * @param {number} [props.height=32] - rendered height in px (width auto-scales)
 * @param {string} [props.title='Livantaa'] - accessible label
 * @param {string} [props.className]
 */
function Logo({ variant = 'full', height = 32, title = 'Livantaa', className }) {
  const isIcon = variant === 'icon';
  const viewBox = isIcon ? '0 0 78 78' : '0 0 372 78.1';

  return (
    <svg
      className={cn(styles.logo, className)}
      height={height}
      viewBox={viewBox}
      fill="currentColor"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Brand mark (the stylized "L" with leaf accent) */}
      <g transform="matrix(1.5097229237261127,0,0,1.5097229237261127,0,-0.04531288133192846)">
        <g transform="translate(-3764,-160.030000)">
          <g transform="translate(3764,160.030000)">
            <path d="M27.53,1.41 C27.68,1.25 27.76,1.05 27.76,0.83 C27.76,0.37 27.39,0 26.93,0 L0.83,0 C0.37,0 0,0.37 0,0.83 C0,1.05 0.08,1.25 0.23,1.41 C1.19,2.4 2.81,3.88 3.67,5.03 C4.93,6.71 4.85,8.97 4.85,8.97 L4.88,8.97 L4.88,41.75 L4.85,41.75 C4.85,41.75 4.93,44 3.67,45.69 C2.81,46.85 1.19,48.32 0.23,49.31 C0.08,49.47 0,49.67 0,49.89 C0,50.35 0.37,50.72 0.83,50.72 L22.91,50.72 L22.91,8.8 C22.91,8.26 23.03,6.44 24.09,5.03 C24.95,3.87 26.57,2.4 27.53,1.41 Z" />
            <path d="M50.24,26.27 C49.07,26.11 48.04,26.1 47.07,26.14 C46.09,26.18 45.16,26.26 44.29,26.4 C42.54,26.68 40.95,27.12 39.5,27.69 C36.6,28.84 34.19,30.49 32.18,32.53 C30.17,34.57 28.53,36.98 27.38,39.9 C26.81,41.35 26.36,42.94 26.08,44.68 C25.94,45.55 25.85,46.47 25.81,47.45 C25.77,48.42 25.77,49.44 25.92,50.6 C27.08,50.75 28.1,50.75 29.07,50.71 C30.04,50.67 30.96,50.58 31.84,50.44 C33.58,50.16 35.17,49.72 36.62,49.14 C39.53,48 41.94,46.36 43.99,44.34 C46.03,42.33 47.68,39.92 48.83,37.02 C49.41,35.57 49.85,33.98 50.12,32.23 C50.26,31.35 50.34,30.43 50.38,29.45 C50.42,28.47 50.4,27.45 50.25,26.28 L50.24,26.27 Z" />
          </g>
        </g>
      </g>
      {/* Wordmark "Livantaa" — hidden in icon variant */}
      {!isIcon && (
        <text
          x="95"
          y="56"
          textLength="270"
          lengthAdjust="spacingAndGlyphs"
          dominantBaseline="alphabetic"
          style={{
            fontFamily: 'var(--font-family-heading)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: '58px',
          }}
        >
          Livantaa
        </text>
      )}
    </svg>
  );
}

export default Logo;
