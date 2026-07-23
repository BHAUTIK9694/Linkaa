import { Reveal, Section, SectionHeading } from '@components/ui';
import { FeatureCard } from '@components/common';
import { FEATURES } from '@constants/content';
import styles from './Features.module.css';

/**
 * Craft-pillars grid. Accepts an optional `items` prop to override the default
 * list, so it can be reused across pages. Cards reveal with a subtle stagger.
 */
function Features({
  eyebrow = 'Why Livantaa',
  title = 'The difference is in the making',
  subtitle = 'Six principles guide every piece that leaves our workshop.',
  items = FEATURES,
}) {
  return (
    <Section id="features" tone="subtle">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={styles.grid}>
        {items.map((feature, index) => (
          <Reveal key={feature.id} variant="up" delay={(index % 3) * 100}>
            <FeatureCard {...feature} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Features;
