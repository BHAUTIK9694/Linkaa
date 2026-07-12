import { ICONS } from './icons';

/**
 * Renders an inline SVG icon from the local registry.
 * Icons inherit `currentColor`, so control color via the parent's CSS `color`.
 *
 * @param {object} props
 * @param {keyof typeof ICONS} props.name - registry key
 * @param {number} [props.size=24] - width/height in px
 * @param {string} [props.title] - accessible label; omit for decorative icons
 * @param {string} [props.className]
 */
function Icon({ name, size = 24, title, className, ...rest }) {
  const glyph = ICONS[name];
  if (!glyph) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Unknown icon name: "${name}"`);
    }
    return null;
  }

  const isDecorative = !title;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={isDecorative ? 'presentation' : 'img'}
      aria-hidden={isDecorative ? 'true' : undefined}
      aria-label={title}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {glyph}
    </svg>
  );
}

export default Icon;
