import { Reveal, Section, SectionHeading, Icon } from '@components/ui';
import { SEO } from '@components/common';
import { CTA, PageHero, StatsBand, Sustainability, Testimonials, Workshop } from '@components/sections';
import { ROUTES } from '@constants/routes';
import { PAGE_SEO, SITE_URL, buildBreadcrumbSchema } from '@constants/seo';
import { useDocumentTitle } from '@hooks';
import styles from './About.module.css';

const MILESTONES = [
  { year: '1989', title: 'Founded in Rajkot', description: 'A single workbench on Kalawad Road with one conviction: furniture should last generations.' },
  { year: '1998', title: 'Workshop expansion', description: 'Grew to a full 3,000 sq ft workshop with dedicated timber seasoning and finishing rooms.' },
  { year: '2008', title: 'FSC certification', description: 'Became one of the first Gujarat furniture makers to source exclusively FSC-certified timber.' },
  { year: '2015', title: 'New showroom', description: 'Opened our flagship showroom on Kalawad Road with live workshop viewing for clients.' },
  { year: '2020', title: '15,000 pieces milestone', description: 'Delivered our 15,000th piece — a teak dining table for a family in Ahmedabad.' },
  { year: '2024', title: 'Digital commissioning', description: 'Launched online design consultations, serving clients across India from our Rajkot base.' },
];

const VALUES = [
  { id: 'source', icon: 'tree', title: 'Source responsibly', description: 'Every board is FSC-certified and hand-selected for grain, strength, and character.' },
  { id: 'build', icon: 'ruler', title: 'Build honestly', description: 'Traditional joinery with no shortcuts. One maker per piece, signed when complete.' },
  { id: 'stand', icon: 'award', title: 'Stand behind every joint', description: 'Lifetime structural guarantee — honoured without exception since 1989.' },
];

/**
 * About page — expanded with mission, values, milestones, and workshop story.
 */
function About() {
  useDocumentTitle('About');

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about` },
  ]);

  return (
    <>
      <SEO
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        keywords={PAGE_SEO.about.keywords}
        schema={[breadcrumbs]}
      />
      <PageHero
        variant="story"
        eyebrow="Our story"
        title="A workshop devoted to furniture that lasts"
        subtitle="Livantaa began at a single bench in Rajkot in 1989 with one conviction: furniture should be built to be handed down, not thrown away."
        actions={[{ label: 'Visit the showroom', to: ROUTES.CONTACT, icon: 'arrow-right' }]}
      />

      {/* Story prose */}
      <Section narrow>
        <div className={styles.prose}>
          <Reveal as="p" variant="up">
            In 1989, our founder set up a single workbench on Kalawad Road with one conviction:
            furniture should be built to be handed down, not thrown away. Three decades later, that
            bench has become a full workshop — but the principle hasn&apos;t changed.
          </Reveal>
          <Reveal as="p" variant="up" delay={100}>
            We start with solid, responsibly sourced timber — teak, sheesham, and mango wood from
            FSC-certified forests in Central India — and honest joinery: mortise and tenon, hand-cut
            dovetails, surfaces finished with natural oils rubbed in by hand. No veneers over
            particleboard, no hidden fasteners, no shortcuts.
          </Reveal>
          <Reveal as="p" variant="up" delay={200}>
            Every piece is made to order by a single maker who signs their work when it is complete.
            That maker sees your furniture from rough board to finished surface, so the person who
            builds it is accountable for it.
          </Reveal>
          <Reveal as="p" variant="up" delay={300}>
            Over 18,000 pieces have left our workshop for homes, studios, and offices across Gujarat
            and beyond. Each one carries a lifetime structural guarantee — a promise we&apos;ve
            honoured without exception since the day we opened.
          </Reveal>
        </div>
      </Section>

      {/* Our values */}
      <Section tone="subtle">
        <SectionHeading
          eyebrow="Our values"
          title="Three principles guide everything we make"
          subtitle="Simple convictions that haven't changed since 1989."
        />
        <div className={styles.valuesGrid}>
          {VALUES.map((value, index) => (
            <Reveal key={value.id} variant="up" delay={index * 100}>
              <div className={styles.valueCard}>
                <span className={styles.valueIcon}>
                  <Icon name={value.icon} size={24} />
                </span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline / Milestones */}
      <Section>
        <SectionHeading
          eyebrow="Our journey"
          title="35 years of honest craft"
          subtitle="Key moments that shaped our workshop."
        />
        <div className={styles.timeline}>
          {MILESTONES.map((milestone, index) => (
            <Reveal key={milestone.year} variant="up" delay={index * 80}>
              <div className={styles.milestone}>
                <span className={styles.milestoneYear}>{milestone.year}</span>
                <div className={styles.milestoneContent}>
                  <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                  <p className={styles.milestoneDesc}>{milestone.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <StatsBand />
      <Workshop />
      <Sustainability />
      <Testimonials
        eyebrow="Client stories"
        title="Lived with, and loved"
        subtitle="We measure success in decades of daily use, not quarters."
      />
      <CTA title="Ready to meet the makers?" subtitle="Book a visit to our Rajkot showroom or start your commission online." />
    </>
  );
}

export default About;
