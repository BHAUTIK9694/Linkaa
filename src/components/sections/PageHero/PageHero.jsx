import { Container, FloatingLeaves, Icon } from '@components/ui';
import { cn } from '@utils/classNames';
import styles from './PageHero.module.css';

/**
 * Premium hero for interior pages. Frames the page title within a layered,
 * nature-inspired backdrop — drifting leaves, a ghosted leaf ornament, and
 * soft radial washes — with staggered, blur-in entrance motion that mirrors
 * the quality of the home hero while staying strictly monochrome.
 *
 * @param {object} props
 * @param {string} [props.eyebrow] - Small kicker above the title
 * @param {string} props.title - Main heading
 * @param {string} [props.subtitle] - Supporting intro line
 * @param {'center'|'left'} [props.align='center'] - Content alignment
 * @param {string} [props.className]
 */
function PageHero({ eyebrow, title, subtitle, align = 'center', className }) {
  return (
    <section className={cn(styles.hero, 'grain', className)}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.washTop} />
        <span className={styles.washBottom} />
        <FloatingLeaves count={7} theme="light" className={styles.leaves} />
        <svg className={styles.ornament} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <Container narrow className={styles.container}>
        <div className={cn(styles.inner, align === 'left' && styles.left)}>
          {eyebrow && (
            <p className={styles.eyebrow}>
              <Icon name="leaf" size={14} />
              {eyebrow}
            </p>
          )}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <span className={styles.divider} aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}

export default PageHero;
