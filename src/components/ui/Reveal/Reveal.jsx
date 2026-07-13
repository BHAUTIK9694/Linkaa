import { useInView } from '@hooks';
import { cn } from '@utils/classNames';

/**
 * Scroll-reveal wrapper. Renders any element and animates it into view the
 * first time it enters the viewport. Motion tokens + base states live in
 * global.css under `[data-reveal]`.
 *
 * @param {object} props
 * @param {'up'|'fade'|'left'|'right'|'scale'|'blur'} [props.variant='up'] - entrance style
 * @param {number} [props.delay=0] - delay in ms before the reveal plays
 * @param {React.ElementType} [props.as='div'] - polymorphic element
 * @param {boolean} [props.once=true] - reveal only once
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
function Reveal({
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
  once = true,
  className,
  children,
  style,
  ...rest
}) {
  const [ref, inView] = useInView({ once });

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible={inView ? 'true' : 'false'}
      className={cn(className)}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
