import { Button, Icon, Section, SectionHeading } from '@components/ui';
import { Accordion } from '@components/common';
import { FAQS } from '@constants/content';
import { ROUTES } from '@constants/routes';
import styles from './FAQ.module.css';

/**
 * Frequently asked questions section with a contact CTA for unanswered questions.
 */
function FAQ({
  eyebrow = 'Good to know',
  title = 'Questions, answered',
  subtitle = 'Everything you might want to know before commissioning a piece.',
  items = FAQS,
}) {
  return (
    <Section tone="subtle">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Accordion items={items} />
      <p className={styles.followUp}>
        Still have questions?{' '}
        <Button
          variant="ghost"
          size="sm"
          to={ROUTES.CONTACT}
          iconRight={<Icon name="arrow-right" size={14} />}
          className={styles.followUpLink}
        >
          Get in touch
        </Button>
      </p>
    </Section>
  );
}

export default FAQ;
