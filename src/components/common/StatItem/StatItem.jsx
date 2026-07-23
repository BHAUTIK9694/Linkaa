import { useInView } from '@hooks/useInView';
import { useCountUp } from '@hooks/useCountUp';
import styles from './StatItem.module.css';

/**
 * Single headline metric with optional count-up animation.
 * If `numericValue` is provided, animates from 0 to that number.
 * Otherwise renders `value` as a static string.
 *
 * @param {object} props
 * @param {string} props.value - display string (e.g. "18,000+" or "Since 1989")
 * @param {string} props.label
 * @param {number} [props.numericValue] - if set, enables count-up animation
 * @param {string} [props.prefix] - text before the number (e.g. "₹")
 * @param {string} [props.suffix] - text after the number (e.g. "+")
 */
function StatItem({ value, label, numericValue, prefix = '', suffix = '' }) {
  const [ref, inView] = useInView();
  const count = useCountUp(numericValue ?? 0, { inView, duration: 1800 });

  const display = numericValue != null
    ? `${prefix}${count.toLocaleString('en-IN')}${suffix}`
    : value;

  return (
    <div ref={ref} className={styles.item}>
      <span className={styles.value}>{display}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default StatItem;
