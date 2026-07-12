import { cn } from '@utils/classNames';
import styles from './Spinner.module.css';

/**
 * Accessible loading spinner.
 *
 * @param {object} props
 * @param {number} [props.size=24]
 * @param {string} [props.label='Loading'] - screen-reader label
 * @param {string} [props.className]
 */
function Spinner({ size = 24, label = 'Loading', className }) {
  return (
    <span
      className={cn(styles.spinner, className)}
      style={{ width: size, height: size }}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default Spinner;
