import { cn } from '@utils/classNames';
import styles from './Container.module.css';

/**
 * Constrains content to a max width and applies responsive horizontal padding.
 *
 * @param {object} props
 * @param {boolean} [props.narrow=false] - use the narrow reading width
 * @param {React.ElementType} [props.as='div'] - polymorphic element
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
function Container({ narrow = false, as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn(styles.container, narrow && styles.narrow, className)} {...rest}>
      {children}
    </Tag>
  );
}

export default Container;
