import {
  CTA,
  FAQ,
  Features,
  Hero,
  HowItWorks,
  LogoCloud,
  PricingSection,
  StatsBand,
  Testimonials,
} from '@components/sections';
import { useDocumentTitle } from '@hooks';

/**
 * Marketing home page — composes reusable sections in narrative order.
 */
function Home() {
  useDocumentTitle('');

  return (
    <>
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <StatsBand />
      <Testimonials />
      <PricingSection />
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;
