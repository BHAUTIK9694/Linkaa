import { useInView } from '@hooks';
import { cn } from '@utils/classNames';
import styles from './SectionHeading.module.css';

/**
 * Consistent, editorial section header: a tracked accent eyebrow, a serif title,
 * and an optional subtitle. Elements reveal with a subtle upward stagger the
 * first time the heading scrolls into view.
 *
 * @param {object} props
 * @param {string} [props.eyebrow] - small tracked label above the title
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.subtitle]
 * @param {'left'|'center'} [props.align='center']
 * @param {2|3} [props.level=2] - heading level for the title (h2/h3)
 * @param {string} [props.className]
 */
function SectionHeading({ eyebrow, title, subtitle, align = 'center', level = 2, className }) {
  const Heading = `h${level}`;
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      data-visible={inView ? 'true' : 'false'}
      className={cn(styles.wrapper, styles[align], className)}
    >
      {eyebrow && (
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <Heading className={styles.title}>{title}</Heading>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;
