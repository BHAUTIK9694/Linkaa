import styles from './StatItem.module.css';

/**
 * Single headline metric.
 *
 * @param {object} props
 * @param {string} props.value
 * @param {string} props.label
 */
function StatItem({ value, label }) {
  return (
    <div className={styles.item}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default StatItem;
