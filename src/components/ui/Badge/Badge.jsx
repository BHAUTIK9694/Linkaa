import { cn } from '@utils/classNames';
import styles from './Badge.module.css';

/**
 * Small pill label used for eyebrows, tags, and status hints.
 *
 * @param {object} props
 * @param {'neutral'|'accent'|'outline'} [props.variant='neutral']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
function Badge({ variant = 'neutral', className, children, ...rest }) {
  return (
    <span className={cn(styles.badge, styles[variant], className)} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
