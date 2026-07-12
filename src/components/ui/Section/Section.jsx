import { cn } from '@utils/classNames';
import Container from '../Container';
import styles from './Section.module.css';

/**
 * Vertical page section with consistent rhythm and optional background tone.
 *
 * @param {object} props
 * @param {'base'|'subtle'|'inverse'} [props.tone='base'] - background treatment
 * @param {boolean} [props.narrow=false] - constrain inner container width
 * @param {boolean} [props.container=true] - wrap children in a Container
 * @param {string} [props.id] - anchor id for in-page navigation
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
function Section({
  tone = 'base',
  narrow = false,
  container = true,
  id,
  className,
  children,
  ...rest
}) {
  const content = container ? <Container narrow={narrow}>{children}</Container> : children;

  return (
    <section id={id} className={cn(styles.section, styles[tone], className)} {...rest}>
      {content}
    </section>
  );
}

export default Section;
