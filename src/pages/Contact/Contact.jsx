import { Container, Icon, Reveal, Section } from '@components/ui';
import { ContactForm, PageHero } from '@components/sections';
import { SITE } from '@constants/site';
import { useDocumentTitle } from '@hooks';
import styles from './Contact.module.css';

const CONTACT_DETAILS = [
  { id: 'email', icon: 'mail', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { id: 'phone', icon: 'phone', label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone}` },
  { id: 'office', icon: 'pin', label: 'Showroom', value: SITE.address },
];

/**
 * Contact page — details column plus a validated contact form.
 */
function Contact() {
  useDocumentTitle('Contact');

  return (
    <>
      <PageHero
        eyebrow="Visit"
        title="Start a conversation"
        subtitle="Book a showroom visit at our Rajkot studio or tell us about your commission. We usually reply within one business day."
      />

      <Section>
        <Container>
          <div className={styles.layout}>
            <Reveal variant="left" className={styles.details}>
              <h2 className={styles.detailsTitle}>Get in touch</h2>
              <p className={styles.detailsText}>
                Whether you&apos;re planning a bespoke commission or want to see our work in person,
                we&apos;d love to hear from you.
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
            </Reveal>

            <Reveal variant="right" delay={120} className={styles.formCol}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default Contact;
