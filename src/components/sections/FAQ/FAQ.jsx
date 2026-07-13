import { FloatingLeaves, Reveal, Section, SectionHeading } from '@components/ui';
import { Accordion } from '@components/common';
import { FAQS } from '@constants/content';

/**
 * Frequently asked questions section.
 */
function FAQ({
  eyebrow = 'Good to know',
  title = 'Questions, answered',
  subtitle = 'Everything you might want to know before commissioning a piece.',
  items = FAQS,
}) {
  return (
    <Section tone="subtle">
      <FloatingLeaves count={7} theme="light" />
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Reveal variant="up">
        <Accordion items={items} />
      </Reveal>
    </Section>
  );
}

export default FAQ;
