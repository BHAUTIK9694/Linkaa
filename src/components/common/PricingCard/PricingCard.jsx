import { Badge, Button, Card, Icon } from '@components/ui';
import { ROUTES } from '@constants/routes';
import { cn } from '@utils/classNames';
import styles from './PricingCard.module.css';

/**
 * Pricing plan card. Highlights the featured plan.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.price
 * @param {string} props.period
 * @param {string} props.description
 * @param {string[]} props.features
 * @param {string} props.cta
 * @param {boolean} [props.featured=false]
 */
function PricingCard({ name, price, period, description, features, cta, featured = false }) {
  return (
    <Card className={cn(styles.card, featured && styles.featured)} padding="lg">
      {featured && (
        <Badge variant="accent" className={styles.badge}>
          Most popular
        </Badge>
      )}
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        <span className={styles.period}>{period}</span>
      </div>
      <Button
        variant={featured ? 'primary' : 'outline'}
        fullWidth
        to={ROUTES.CONTACT}
        className={styles.cta}
      >
        {cta}
      </Button>
      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <Icon name="check" size={18} className={styles.check} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default PricingCard;
