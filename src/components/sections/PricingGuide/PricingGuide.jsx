import { Button, Icon, Reveal, Section, SectionHeading } from '@components/ui';
import { ROUTES } from '@constants/routes';
import styles from './PricingGuide.module.css';

const PRICING = [
  { id: 'tables', icon: 'table', name: 'Dining Tables', range: '₹45,000 – ₹2,00,000', note: '4-seater to 12-seater, all timbers' },
  { id: 'beds', icon: 'bed', name: 'Beds & Frames', range: '₹60,000 – ₹3,00,000', note: 'Single to king, with headboard options' },
  { id: 'cabinets', icon: 'cabinet', name: 'Cabinets & Storage', range: '₹55,000 – ₹2,50,000', note: 'Sideboards, wardrobes, bookshelves' },
  { id: 'seating', icon: 'armchair', name: 'Chairs & Seating', range: '₹35,000 – ₹80,000', note: 'Dining chairs, lounge chairs, benches' },
];

/**
 * Pricing guide section — transparent price ranges per category to reduce friction.
 */
function PricingGuide({
  eyebrow = 'Investment',
  title = 'Transparent pricing',
  subtitle = 'Handcrafted furniture is an investment. Here\u2019s what to expect \u2014 final pricing depends on size, timber, and complexity.',
}) {
  return (
    <Section tone="subtle">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={styles.grid}>
        {PRICING.map((item, index) => (
          <Reveal key={item.id} variant="up" delay={index * 80}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <Icon name={item.icon} size={24} className={styles.icon} />
                <h3 className={styles.name}>{item.name}</h3>
              </div>
              <p className={styles.range}>{item.range}</p>
              <p className={styles.note}>{item.note}</p>
              <Button
                variant="ghost"
                size="sm"
                to={ROUTES.CONTACT}
                iconRight={<Icon name="arrow-right" size={14} />}
                className={styles.link}
              >
                Get exact quote
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal variant="up" delay={400}>
        <p className={styles.footnote}>
          All prices include materials, labour, finishing, and delivery within Gujarat.
          EMI available for orders above ₹2,00,000.
        </p>
      </Reveal>
    </Section>
  );
}

export default PricingGuide;
