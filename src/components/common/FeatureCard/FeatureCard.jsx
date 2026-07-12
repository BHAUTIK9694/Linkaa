import { Card, Icon } from '@components/ui';
import styles from './FeatureCard.module.css';

/**
 * Displays a single product feature: icon, title, and description.
 *
 * @param {object} props
 * @param {string} props.icon - Icon registry name
 * @param {string} props.title
 * @param {string} props.description
 */
function FeatureCard({ icon, title, description }) {
  return (
    <Card interactive className={styles.card}>
      <span className={styles.iconWrap}>
        <Icon name={icon} size={22} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  );
}

export default FeatureCard;
