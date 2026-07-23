import { Section } from '@components/ui';
import { SEO } from '@components/common';
import { PageHero } from '@components/sections';
import { SITE } from '@constants/site';
import { SITE_URL, buildBreadcrumbSchema } from '@constants/seo';
import { useDocumentTitle } from '@hooks';
import styles from './Terms.module.css';

/**
 * Terms of Service page — commission terms, payment, cancellation, and guarantees.
 */
function Terms() {
  useDocumentTitle('Terms of Service');

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Terms of Service', url: `${SITE_URL}/terms` },
  ]);

  return (
    <>
      <SEO
        title={`Terms of Service | ${SITE.name}`}
        description="Terms and conditions for Livantaa furniture commissions including payment terms, delivery, cancellation policy, and our lifetime structural guarantee."
        schema={[breadcrumbs]}
        canonicalPath="/terms"
      />
      <PageHero
        variant="story"
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Terms and conditions governing furniture commissions and services."
      />

      <Section narrow>
        <div className={styles.prose}>
          <p className={styles.updated}>Last updated: July 2026</p>

          <h2>1. Overview</h2>
          <p>
            These terms govern the commissioning, manufacture, and delivery of custom furniture
            by Livantaa (registered at {SITE.address}). By placing a commission with us, you
            agree to these terms.
          </p>

          <h2>2. Commission Process</h2>
          <ol>
            <li>
              <strong>Design consultation</strong> — We discuss your requirements, select
              materials, and agree specifications. This stage typically takes 1–2 weeks.
            </li>
            <li>
              <strong>Quotation and sign-off</strong> — We provide a detailed quote including
              materials, dimensions, finish, and delivery timeline. The commission begins upon
              your written acceptance and first payment.
            </li>
            <li>
              <strong>Manufacture</strong> — Your piece is handcrafted in our Rajkot workshop.
              Standard lead time is 6–8 weeks from sign-off.
            </li>
            <li>
              <strong>Delivery and installation</strong> — We deliver, assemble, and position
              your furniture in your home within 1 week of completion.
            </li>
          </ol>

          <h2>3. Payment Terms</h2>
          <ul>
            <li>40% of the quoted price at design sign-off (non-refundable deposit)</li>
            <li>40% upon build completion (before dispatch)</li>
            <li>20% on delivery and installation</li>
          </ul>
          <p>
            For orders above ₹2,00,000, EMI options are available through our partner banks.
            We accept UPI, bank transfer, and demand drafts. Cash payments are accepted at our
            showroom for amounts up to ₹2,00,000 as per RBI guidelines.
          </p>

          <h2>4. Pricing</h2>
          <p>
            All quoted prices include materials, labour, finishing, and delivery within Gujarat.
            Delivery to other Indian states incurs an additional logistics charge communicated
            at quotation stage. Prices are valid for 30 days from the date of the quote.
          </p>

          <h2>5. Changes and Cancellation</h2>
          <ul>
            <li>
              Design changes are free before manufacture begins. Changes during manufacture
              may incur additional costs and extend the timeline.
            </li>
            <li>
              Cancellation before manufacture: full refund minus a 10% design fee.
            </li>
            <li>
              Cancellation after manufacture has started: the deposit (40%) is non-refundable
              as materials have been purchased and cut.
            </li>
            <li>
              We reserve the right to cancel a commission and issue a full refund if materials
              become unavailable or if manufacturing cannot meet quality standards.
            </li>
          </ul>

          <h2>6. Delivery</h2>
          <p>
            Delivery is included for addresses within Gujarat. We deliver, assemble, and place
            each piece in your home. All packaging is removed by our team. You must ensure
            adequate access (doorways, staircases, elevators) for the furniture dimensions.
          </p>
          <p>
            Delivery dates are estimates. We are not liable for delays caused by circumstances
            beyond our control (material shortages, transport disruptions, force majeure).
          </p>

          <h2>7. Lifetime Structural Guarantee</h2>
          <p>
            We guarantee all structural joints (mortise-and-tenon, dovetails, dowel joints) for
            the lifetime of the piece. If a structural joint fails under normal domestic use,
            we will repair or replace the piece free of charge.
          </p>
          <p>This guarantee does not cover:</p>
          <ul>
            <li>Natural ageing, colour change, or patina of solid wood</li>
            <li>Damage from misuse, abuse, or commercial use (unless specified at commission)</li>
            <li>Damage from exposure to excessive moisture, heat, or direct sunlight</li>
            <li>Scratches, dents, or surface wear from normal use</li>
            <li>Modifications made by third parties</li>
          </ul>

          <h2>8. Care and Maintenance</h2>
          <p>
            We provide a care guide with every delivery. Following the recommended care
            instructions is necessary to maintain your guarantee. Annual re-oiling with the
            supplied finishing oil is recommended.
          </p>

          <h2>9. Intellectual Property</h2>
          <p>
            Designs created during the commission process are jointly owned. We reserve the right
            to photograph completed pieces for our portfolio and marketing unless you request
            otherwise in writing.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            Our total liability for any claim arising from a commission shall not exceed the
            total amount paid for that commission. We are not liable for indirect, incidental,
            or consequential damages.
          </p>

          <h2>11. Disputes</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be resolved through
            mediation first, followed by arbitration in Rajkot, Gujarat if necessary.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or visit our showroom during
            business hours ({SITE.showroom.hours}).
          </p>
        </div>
      </Section>
    </>
  );
}

export default Terms;
