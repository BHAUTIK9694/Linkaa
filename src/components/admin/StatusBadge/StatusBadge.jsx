import { cn } from '@utils/classNames';
import styles from './StatusBadge.module.css';

/**
 * Displays a contact submission status as a styled pill badge.
 *
 * @param {object} props
 * @param {'new'|'in_progress'|'contacted'|'resolved'|'closed'} props.status
 * @param {string} [props.className]
 */
function StatusBadge({ status, className, ...rest }) {
  const labels = {
    new:         'New',
    in_progress: 'In Progress',
    contacted:   'Contacted',
    resolved:    'Resolved',
    closed:      'Closed',
  };

  return (
    <span className={cn(styles.badge, styles[status?.replace('-', '_')], className)} {...rest}>
      <span className={styles.dot} aria-hidden="true" />
      {labels[status] ?? status}
    </span>
  );
}

export default StatusBadge;
