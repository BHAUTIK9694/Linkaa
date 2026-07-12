import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@utils/classNames';
import styles from './Button.module.css';

/**
 * Polymorphic button. Renders a native <button>, a router <Link> (when `to`
 * is passed), or an <a> (when `href` is passed) while keeping identical styles.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.fullWidth=false]
 * @param {string} [props.to] - render as a router Link
 * @param {string} [props.href] - render as an anchor
 * @param {React.ReactNode} [props.iconLeft]
 * @param {React.ReactNode} [props.iconRight]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    to,
    href,
    iconLeft,
    iconRight,
    className,
    children,
    ...rest
  },
  ref
) {
  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className
  );

  const content = (
    <>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} {...rest}>
      {content}
    </button>
  );
});

export default Button;
