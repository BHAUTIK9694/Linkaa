import { cn } from '@utils/classNames';
import styles from './Card.module.css';

/**
 * Generic surface container with border, radius, and optional hover elevation.
 *
 * @param {object} props
 * @param {boolean} [props.interactive=false] - lift on hover
 * @param {'sm'|'md'|'lg'} [props.padding='md']
 * @param {React.ElementType} [props.as='div']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
function Card({ interactive = false, padding = 'md', as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag
      className={cn(
        styles.card,
        styles[`pad-${padding}`],
        interactive && styles.interactive,
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Card;
