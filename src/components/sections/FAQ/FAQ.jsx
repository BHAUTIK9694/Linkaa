import { Section, SectionHeading } from '@components/ui';
import { Accordion } from '@components/common';
import { FAQS } from '@constants/content';

/**
 * Frequently asked questions section.
 */
function FAQ({
  eyebrow = 'FAQ',
  title = 'Frequently asked questions',
  subtitle = 'Everything you need to know before getting started.',
  items = FAQS,
}) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Accordion items={items} />
    </Section>
  );
}

export default FAQ;
