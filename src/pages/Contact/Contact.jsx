import { Container, Icon, Section } from '@components/ui';
import { ContactForm, PageHero } from '@components/sections';
import { SITE } from '@constants/site';
import { useDocumentTitle } from '@hooks';
import styles from './Contact.module.css';

const CONTACT_DETAILS = [
  { id: 'email', icon: 'link', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { id: 'phone', icon: 'plug', label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone}` },
  { id: 'office', icon: 'layers', label: 'Office', value: SITE.address },
];

/**
 * Contact page — details column plus a validated contact form.
 */
function Contact() {
  useDocumentTitle('Contact');

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        subtitle="Questions about Linkaa? Our team usually responds within one business day."
      />

      <Section>
        <Container>
          <div className={styles.layout}>
            <div className={styles.details}>
              <h2 className={styles.detailsTitle}>Get in touch</h2>
              <p className={styles.detailsText}>
                Whether you&apos;re evaluating Linkaa or need a hand getting set up, we&apos;re here
                to help.
              </p>
              <ul className={styles.list}>
                {CONTACT_DETAILS.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <span className={styles.itemIcon}>
                      <Icon name={item.icon} size={20} />
                    </span>
                    <div>
                      <span className={styles.itemLabel}>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className={styles.itemValue}>
                          {item.value}
                        </a>
                      ) : (
                        <span className={styles.itemValue}>{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.formCol}>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default Contact;
