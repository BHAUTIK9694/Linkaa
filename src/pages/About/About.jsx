import { Reveal, Section, SectionHeading, Icon } from '@components/ui';
import { SEO } from '@components/common';
import { CTA, PageHero, StatsBand, Sustainability, Testimonials, Workshop } from '@components/sections';
import { ROUTES } from '@constants/routes';
import { PAGE_SEO, SITE_URL, buildBreadcrumbSchema } from '@constants/seo';
import { useDocumentTitle } from '@hooks';
import styles from './About.module.css';

const HIGHLIGHTS = [
  {
    id: 'planning',
    icon: 'compass',
    title: 'Clear planning from the start',
    description: 'Every project begins with practical guidance on layout, finishes, dimensions, and delivery expectations.',
  },
  {
    id: 'quality',
    icon: 'sparkle',
    title: 'Consistent quality standards',
    description: 'Materials, detailing, and finishing are reviewed carefully so every space feels polished and cohesive.',
  },
  {
    id: 'delivery',
    icon: 'truck',
    title: 'Smooth coordination',
    description: 'From approvals to installation, the process is structured to keep communication simple and timelines visible.',
  },
  {
    id: 'support',
    icon: 'award',
    title: 'Support beyond delivery',
    description: 'Aftercare, maintenance guidance, and responsive follow-up help each project stay in great shape over time.',
  },
];

const VALUES = [
  { id: 'source', icon: 'tree', title: 'Choose materials carefully', description: 'Every selection is guided by durability, finish quality, and the needs of the space.' },
  { id: 'build', icon: 'ruler', title: 'Keep the process transparent', description: 'Recommendations, pricing, and delivery expectations are shared clearly before work moves ahead.' },
  { id: 'stand', icon: 'award', title: 'Focus on long-term value', description: 'The goal is simple: thoughtful results that continue to perform well long after installation.' },
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
        eyebrow="About us"
        title="Thoughtful spaces, built around real needs"
        subtitle="Livantaa combines material quality, practical design, and hands-on coordination to deliver polished spaces for homes, studios, and commercial projects."
        actions={[{ label: 'Talk to our team', to: ROUTES.CONTACT, icon: 'arrow-right' }]}
      />

      {/* Overview prose */}
      <Section narrow>
        <div className={styles.prose}>
          <Reveal as="p" variant="up">
            Livantaa is built around a straightforward approach: understand the brief clearly,
            recommend the right materials and finishes, and execute each project with care from first
            conversation to final placement.
          </Reveal>
          <Reveal as="p" variant="up" delay={100}>
            Our work spans residential, hospitality, and workspace environments, with every solution
            tailored to the dimensions, use case, and visual direction of the space. The emphasis is
            always on balance between appearance, performance, and day-to-day usability.
          </Reveal>
          <Reveal as="p" variant="up" delay={200}>
            Clients work with a team that values clarity. Specifications, options, lead times, and
            installation details are mapped early so decisions stay simple and surprises stay limited.
          </Reveal>
          <Reveal as="p" variant="up" delay={300}>
            Whether the requirement is a single statement piece or a wider fit-out, the objective
            stays the same: deliver spaces that feel intentional, durable, and easy to live or work
            in.
          </Reveal>
        </div>
      </Section>

      {/* Our values */}
      <Section tone="subtle">
        <SectionHeading
          eyebrow="Our values"
          title="Three principles guide every project"
          subtitle="A practical standard for planning, execution, and follow-through."
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

      {/* Project highlights */}
      <Section>
        <SectionHeading
          eyebrow="How we work"
          title="Built for clear decisions and reliable delivery"
          subtitle="The experience is designed to stay practical from concept through completion."
        />
        <div className={styles.valuesGrid}>
          {HIGHLIGHTS.map((highlight, index) => (
            <Reveal key={highlight.id} variant="up" delay={index * 100}>
              <div className={styles.valueCard}>
                <span className={styles.valueIcon}>
                  <Icon name={highlight.icon} size={24} />
                </span>
                <div>
                  <h3 className={styles.valueTitle}>{highlight.title}</h3>
                  <p className={styles.valueDesc}>{highlight.description}</p>
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
        eyebrow="Client feedback"
        title="Delivered with care and consistency"
        subtitle="A few examples of how clients describe the experience of working with Livantaa."
      />
      <CTA title="Ready to plan your project?" subtitle="Speak with our team to discuss scope, finishes, timelines, and next steps." />
    </>
  );
}

export default About;
