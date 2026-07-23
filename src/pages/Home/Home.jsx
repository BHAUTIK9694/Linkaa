import {
  CTA,
  Certifications,
  ClientJourney,
  Collections,
  Comparison,
  FAQ,
  FeaturedProjects,
  Features,
  Hero,
  HowItWorks,
  LogoCloud,
  PricingGuide,
  ProcessGallery,
  Showcase,
  StatsBand,
  Sustainability,
  Testimonials,
} from '@components/sections';
import { SEO } from '@components/common';
import { FAQS } from '@constants/content';
import { PAGE_SEO, WEBSITE_SCHEMA, SITE_URL, buildFaqSchema, buildBreadcrumbSchema } from '@constants/seo';
import { useDocumentTitle } from '@hooks';

/**
 * Marketing home page — composes reusable sections in narrative order.
 * Flow: Hook → Trust → Browse → Convince → Process → Proof → Convert.
 */
function Home() {
  useDocumentTitle('');

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
  ]);

  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        canonicalPath="/"
        schema={[WEBSITE_SCHEMA, breadcrumbs, faqSchema]}
      />
      <Hero />
      <LogoCloud />
      <Certifications />
      <Collections />
      <Comparison />
      <Features />
      <PricingGuide />
      <HowItWorks />
      <ProcessGallery />
      <StatsBand />
      <Showcase />
      <FeaturedProjects />
      <Sustainability />
      <ClientJourney />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;
