import { Section, SectionHeading } from '@components/ui';
import { FeatureCard } from '@components/common';
import { FEATURES } from '@constants/content';
import styles from './Features.module.css';

/**
 * Feature grid section. Accepts an optional `items` prop to override the
 * default feature list, so it can be reused on multiple pages.
 */
function Features({
  eyebrow = 'Features',
  title = 'Everything your team needs in one place',
  subtitle = 'Powerful building blocks that work together out of the box.',
  items = FEATURES,
}) {
  return (
    <Section id="features" tone="subtle">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={styles.grid}>
        {items.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
    </Section>
  );
}

export default Features;
