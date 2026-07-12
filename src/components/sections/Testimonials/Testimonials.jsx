import { Section, SectionHeading } from '@components/ui';
import { TestimonialCard } from '@components/common';
import { TESTIMONIALS } from '@constants/content';
import styles from './Testimonials.module.css';

/**
 * Grid of customer testimonials.
 */
function Testimonials({
  eyebrow = 'Testimonials',
  title = 'Trusted by teams that ship',
  subtitle = 'See why operations, revenue, and security leaders choose Linkaa.',
  items = TESTIMONIALS,
}) {
  return (
    <Section tone="subtle">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={styles.grid}>
        {items.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </Section>
  );
}

export default Testimonials;
