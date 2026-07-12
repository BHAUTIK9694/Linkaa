import { Section, SectionHeading } from '@components/ui';
import { StepCard } from '@components/common';
import { STEPS } from '@constants/content';
import styles from './HowItWorks.module.css';

/**
 * Three-step "how it works" sequence.
 */
function HowItWorks({
  eyebrow = 'How it works',
  title = 'Up and running in three steps',
  subtitle = 'Go from sign-up to your first automation without touching code.',
  items = STEPS,
}) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <ol className={styles.grid}>
        {items.map((step) => (
          <li key={step.id}>
            <StepCard {...step} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default HowItWorks;
