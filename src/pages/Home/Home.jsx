import {
  CTA,
  Collections,
  FAQ,
  Features,
  Hero,
  HowItWorks,
  LogoCloud,
  Showcase,
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
      <Collections />
      <Features />
      <HowItWorks />
      <StatsBand />
      <Showcase />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;
