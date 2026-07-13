import { Card, Icon } from '@components/ui';
import styles from './TestimonialCard.module.css';

/**
 * Client story card with a large opening quote mark and author attribution.
 *
 * @param {object} props
 * @param {string} props.quote
 * @param {string} props.author
 * @param {string} props.role
 */
function TestimonialCard({ quote, author, role }) {
  return (
    <Card as="figure" padding="lg" className={styles.card}>
      <Icon name="quote" size={32} className={styles.mark} />
      <div className={styles.stars} aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={15} />
        ))}
      </div>
      <blockquote className={styles.quote}>{quote}</blockquote>
      <figcaption className={styles.author}>
        <span className={styles.name}>{author}</span>
        <span className={styles.role}>{role}</span>
      </figcaption>
    </Card>
  );
}

export default TestimonialCard;
