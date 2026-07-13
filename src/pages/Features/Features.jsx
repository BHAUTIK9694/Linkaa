import {
  CTA,
  Features as FeaturesSection,
  HowItWorks,
  PageHero,
  StatsBand,
} from '@components/sections';
import { useDocumentTitle } from '@hooks';

/**
 * Features page — deep dive into product capabilities.
 */
function Features() {
  useDocumentTitle('Features');

  return (
    <>
      <PageHero
        eyebrow="Craftsmanship"
        title="How we build furniture that outlives trends"
        subtitle="Explore the materials, methods, and guarantees behind every Livantaa piece — handcrafted in Rajkot, Gujarat."
      />
      <FeaturesSection
        eyebrow="Our principles"
        title="The difference is in the making"
        subtitle="Each principle stands on its own — together they define our craft."
      />
      <HowItWorks />
      <StatsBand />
      <CTA />
    </>
  );
}

export default Features;
