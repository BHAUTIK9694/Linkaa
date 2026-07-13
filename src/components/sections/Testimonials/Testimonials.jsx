import { Reveal, Section, SectionHeading } from '@components/ui';
import { TestimonialCard } from '@components/common';
import { TESTIMONIALS } from '@constants/content';
import styles from './Testimonials.module.css';

/**
 * Grid of client stories.
 */
function Testimonials({
  eyebrow = 'Client stories',
  title = 'Lived with, and loved',
  subtitle = 'Homeowners, designers, and architects share what it means to own a Livantaa piece.',
  items = TESTIMONIALS,
}) {
  return (
    <Section tone="subtle">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={styles.grid}>
        {items.map((testimonial, index) => (
          <Reveal key={testimonial.id} variant="up" delay={index * 110}>
            <TestimonialCard {...testimonial} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Testimonials;
