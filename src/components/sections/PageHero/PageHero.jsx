import { Container } from '@components/ui';
import styles from './PageHero.module.css';

/**
 * Compact hero for interior pages (title + intro on a subtle background).
 *
 * @param {object} props
 * @param {string} [props.eyebrow]
 * @param {string} props.title
 * @param {string} [props.subtitle]
 */
function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className={styles.hero}>
      <Container narrow>
        <div className={styles.inner}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </Container>
    </section>
  );
}

export default PageHero;
