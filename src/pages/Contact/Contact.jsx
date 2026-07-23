import { Container, Icon, Reveal, Section } from '@components/ui';
import { SEO } from '@components/common';
import { ContactForm, PageHero } from '@components/sections';
import { SITE } from '@constants/site';
import { PAGE_SEO, SITE_URL, buildBreadcrumbSchema } from '@constants/seo';
import { useDocumentTitle } from '@hooks';
import styles from './Contact.module.css';

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi Livantaa! I would like to enquire about your furniture. Please help me.'
);
const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${WHATSAPP_MESSAGE}`;

const CONTACT_DETAILS = [
  { id: 'email', icon: 'mail', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { id: 'phone', icon: 'phone', label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone}` },
  { id: 'office', icon: 'pin', label: 'Showroom', value: SITE.address },
  { id: 'hours', icon: 'clock', label: 'Visiting Hours', value: SITE.showroom.hours },
];

/**
 * Contact page — two-column layout with form on left, map on right.
 * WhatsApp quick-message section for non-technical users.
 */
function Contact() {
  useDocumentTitle('Contact');

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Contact', url: `${SITE_URL}/contact` },
  ]);

  return (
    <>
      <SEO
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
        schema={[breadcrumbs]}
      />
      <PageHero
        variant="contact"
        eyebrow="Visit"
        title="Start a conversation"
        subtitle="Book a showroom visit at our Rajkot studio or tell us about your commission. We usually reply within one business day."
        className={styles.heroCompact}
      />

      {/* WhatsApp quick contact */}
      <Section className={styles.whatsappSection}>
        <Container>
          <Reveal>
            <div className={styles.whatsappBanner}>
              <div className={styles.whatsappContent}>
                <Icon name="whatsapp" size={32} className={styles.whatsappIcon} />
                <div>
                  <h2 className={styles.whatsappTitle}>Prefer WhatsApp?</h2>
                  <p className={styles.whatsappText}>
                    No forms, no waiting. Tap the button below and message us directly on WhatsApp.
                    We&apos;ll reply quickly!
                  </p>
                </div>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
                aria-label="Message us on WhatsApp"
              >
                <Icon name="whatsapp" size={20} />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Main content: Form (left) + Map & details (right) */}
      <Section>
        <Container>
          <div className={styles.layout}>
            {/* Left — Contact Form */}
            <Reveal variant="left" className={styles.formCol}>
              <h2 className={styles.formTitle}>Send us a message</h2>
              <p className={styles.formSubtitle}>
                Fill out the form below and we&apos;ll get back to you within one business day.
                All fields marked with * are required.
              </p>
              <ContactForm />
            </Reveal>

            {/* Right — Map + Contact details */}
            <Reveal variant="right" delay={120} className={styles.sideCol}>
              <div className={styles.mapWrapper}>
                <iframe
                  title="Livantaa Showroom Location on Google Maps"
                  src={SITE.googleMapsEmbedUrl}
                  className={styles.mapIframe}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={SITE.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <Icon name="pin" size={16} />
                <span>Open in Google Maps</span>
              </a>

              <div className={styles.details}>
                <h3 className={styles.detailsTitle}>Get in touch</h3>
                <ul className={styles.list}>
                  {CONTACT_DETAILS.map((item) => (
                    <li key={item.id} className={styles.item}>
                      <span className={styles.itemIcon}>
                        <Icon name={item.icon} size={18} />
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
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default Contact;
