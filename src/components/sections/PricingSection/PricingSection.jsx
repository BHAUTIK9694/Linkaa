import { Section, SectionHeading } from '@components/ui';
import { PricingCard } from '@components/common';
import { PRICING_PLANS } from '@constants/content';
import styles from './PricingSection.module.css';

/**
 * Pricing plans grid.
 */
function PricingSection({
  eyebrow = 'Pricing',
  title = 'Simple, transparent pricing',
  subtitle = 'Start free and upgrade as you grow. No hidden fees.',
  items = PRICING_PLANS,
}) {
  return (
    <Section id="pricing">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={styles.grid}>
        {items.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </Section>
  );
}

export default PricingSection;
