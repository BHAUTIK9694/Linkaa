import { Section } from '@components/ui';
import { SEO } from '@components/common';
import { PageHero } from '@components/sections';
import { SITE } from '@constants/site';
import { SITE_URL, buildBreadcrumbSchema } from '@constants/seo';
import { useDocumentTitle } from '@hooks';
import styles from './Privacy.module.css';

/**
 * Privacy Policy page — legally required for Indian businesses collecting personal data.
 */
function Privacy() {
  useDocumentTitle('Privacy Policy');

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Privacy Policy', url: `${SITE_URL}/privacy` },
  ]);

  return (
    <>
      <SEO
        title={`Privacy Policy | ${SITE.name}`}
        description="Learn how Livantaa collects, uses, and protects your personal data. Our privacy policy covers form submissions, WhatsApp contact, cookies, and your rights."
        schema={[breadcrumbs]}
        canonicalPath="/privacy"
      />
      <PageHero
        variant="story"
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
      />

      <Section narrow>
        <div className={styles.prose}>
          <p className={styles.updated}>Last updated: July 2026</p>

          <h2>1. Introduction</h2>
          <p>
            Livantaa (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting
            your personal data. This policy explains what information we collect when you visit
            our website or contact us, how we use it, and your rights regarding that data.
          </p>
          <p>
            Our registered address is {SITE.address}. You can reach us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Information you provide</h3>
          <ul>
            <li>Name, email address, and phone number (via our contact form)</li>
            <li>Subject and message content submitted through forms</li>
            <li>Messages sent via WhatsApp</li>
          </ul>
          <h3>2.2 Information collected automatically</h3>
          <ul>
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on the website</li>
            <li>Referring website URL</li>
            <li>Device type and screen resolution</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To respond to your enquiries and commission requests</li>
            <li>To schedule showroom visits and design consultations</li>
            <li>To send project updates if you have an active commission</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>4. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            your data with:
          </p>
          <ul>
            <li>Delivery partners (name and address only, for furniture delivery)</li>
            <li>Payment processors (for commission payments)</li>
            <li>Legal authorities (if required by law)</li>
          </ul>

          <h2>5. Cookies</h2>
          <p>
            Our website uses minimal cookies for session management and remembering your
            preferences. We do not use third-party advertising cookies. The Google Maps embed
            on our contact page may set cookies as per Google&apos;s own privacy policy.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your contact form submissions for up to 2 years to manage enquiries and
            follow up on commissions. You may request deletion at any time by emailing us.
          </p>

          <h2>7. Your Rights</h2>
          <p>Under applicable Indian data protection laws, you have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>8. Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your
            personal data against unauthorised access, alteration, or destruction. Form data
            is transmitted over HTTPS and stored in secure databases.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be posted
            on this page with an updated &quot;Last updated&quot; date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, contact us at:{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
            <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}

export default Privacy;
