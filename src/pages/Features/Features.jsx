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
        eyebrow="Features"
        title="Built to connect and automate every workflow"
        subtitle="Explore the capabilities that help modern teams do more with less."
      />
      <FeaturesSection
        eyebrow="Platform"
        title="A complete toolkit"
        subtitle="Each capability works independently and gets better together."
      />
      <HowItWorks />
      <StatsBand />
      <CTA />
    </>
  );
}

export default Features;
