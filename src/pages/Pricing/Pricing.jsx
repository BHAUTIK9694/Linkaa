import { CTA, FAQ, PageHero, PricingSection, Testimonials } from '@components/sections';
import { useDocumentTitle } from '@hooks';

/**
 * Pricing page.
 */
function Pricing() {
  useDocumentTitle('Pricing');

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Plans that scale with your team"
        subtitle="Start free, upgrade when you need more. Cancel anytime."
      />
      <PricingSection eyebrow="" title="Choose your plan" subtitle="" />
      <FAQ />
      <Testimonials />
      <CTA />
    </>
  );
}

export default Pricing;
