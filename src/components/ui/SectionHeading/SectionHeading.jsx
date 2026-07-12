import { cn } from '@utils/classNames';
import Badge from '../Badge';
import styles from './SectionHeading.module.css';

/**
 * Consistent section header: optional eyebrow badge, title, and subtitle.
 *
 * @param {object} props
 * @param {string} [props.eyebrow] - small label above the title
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.subtitle]
 * @param {'left'|'center'} [props.align='center']
 * @param {2|3} [props.level=2] - heading level for the title (h2/h3)
 * @param {string} [props.className]
 */
function SectionHeading({ eyebrow, title, subtitle, align = 'center', level = 2, className }) {
  const Heading = `h${level}`;

  return (
    <div className={cn(styles.wrapper, styles[align], className)}>
      {eyebrow && <Badge variant="outline">{eyebrow}</Badge>}
      <Heading className={styles.title}>{title}</Heading>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;
