import { FloatingLeaves, Reveal, Section, SectionHeading } from '@components/ui';
import { StepCard } from '@components/common';
import { STEPS } from '@constants/content';
import styles from './HowItWorks.module.css';

/**
 * Three-step "our process" sequence, from consultation to delivery.
 */
function HowItWorks({
  eyebrow = 'Our process',
  title = 'From first sketch to your living room',
  subtitle = 'A considered, transparent process — you are part of it at every stage.',
  items = STEPS,
}) {
  return (
    <Section>
      <FloatingLeaves count={5} theme="light" />
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <ol className={styles.grid}>
        {items.map((step, index) => (
          <Reveal key={step.id} as="li" variant="up" delay={index * 120}>
            <StepCard {...step} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export default HowItWorks;
