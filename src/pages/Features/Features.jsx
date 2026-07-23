import {
  CTA,
  Features as FeaturesSection,
  HowItWorks,
  PageHero,
  StatsBand,
  Sustainability,
} from '@components/sections';
import { SEO } from '@components/common';
import { Reveal, Section, SectionHeading, Icon } from '@components/ui';
import { ANCHORS, ROUTES } from '@constants/routes';
import { PAGE_SEO, SITE_URL, buildBreadcrumbSchema } from '@constants/seo';
import { useDocumentTitle } from '@hooks';
import styles from './Features.module.css';

const MATERIALS = [
  {
    id: 'teak',
    name: 'Teak',
    origin: 'Central India (MP, Maharashtra)',
    characteristics: 'Golden-brown, naturally oily, extremely durable. Resists moisture and termites. Ages to a rich honey patina.',
    bestFor: 'Dining tables, outdoor furniture, bed frames',
    hardness: 'Very high',
  },
  {
    id: 'sheesham',
    name: 'Sheesham (Indian Rosewood)',
    origin: 'Punjab, Rajasthan',
    characteristics: 'Deep brown with dramatic grain patterns. Dense and heavy. Takes polish beautifully.',
    bestFor: 'Bookshelves, cabinets, console tables',
    hardness: 'High',
  },
  {
    id: 'mango',
    name: 'Mango Wood',
    origin: 'Gujarat, Maharashtra',
    characteristics: 'Light golden with streaks of pink and brown. Sustainable (harvested from non-fruiting trees). Lighter weight.',
    bestFor: 'Coffee tables, nightstands, decorative pieces',
    hardness: 'Medium',
  },
];

const FINISHES = [
  { id: 'natural-oil', name: 'Natural Oil', description: 'Hand-rubbed tung oil in 4–6 coats. Deepens grain, ages beautifully. Requires annual re-oiling.' },
  { id: 'hard-wax', name: 'Hard Wax', description: 'Matte protective wax layer. Silky touch, water-resistant. Ideal for dining tables.' },
  { id: 'matte-lacquer', name: 'Matte Lacquer', description: 'Sealed low-sheen finish. Minimal maintenance, stain-resistant. Best for high-use furniture.' },
];

const JOINERY_TYPES = [
  { id: 'mortise', name: 'Mortise & Tenon', description: 'The gold standard for table and bed frames. A shaped peg locked into a matching cavity — no metal fasteners needed.' },
  { id: 'dovetail', name: 'Hand-Cut Dovetails', description: 'Interlocking fan-shaped joints for drawer boxes. Resists pulling apart under load. A sign of true craftsmanship.' },
  { id: 'dowel', name: 'Dowel Joints', description: 'Precision-drilled wooden pegs for panel alignment. Used in cabinet doors and frame construction.' },
];

/**
 * Features/Craftsmanship page — expanded with materials, finishes, and joinery detail.
 */
function Features() {
  useDocumentTitle('Craftsmanship');

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Craftsmanship', url: `${SITE_URL}/features` },
  ]);

  return (
    <>
      <SEO
        title={PAGE_SEO.features.title}
        description={PAGE_SEO.features.description}
        keywords={PAGE_SEO.features.keywords}
        schema={[breadcrumbs]}
      />
      <PageHero
        variant="craft"
        eyebrow="Craftsmanship"
        title="How we build furniture that outlives trends"
        subtitle="Explore the materials, methods, and guarantees behind every Livantaa piece — handcrafted in Rajkot, Gujarat."
        actions={[
          { label: 'Start a commission', to: ROUTES.CONTACT, icon: 'arrow-right' },
          { label: 'Explore collections', to: ANCHORS.COLLECTIONS, variant: 'outline' },
        ]}
      />

      <FeaturesSection
        eyebrow="Our principles"
        title="The difference is in the making"
        subtitle="Each principle stands on its own — together they define our craft."
      />

      {/* Materials section — unique to this page */}
      <Section tone="subtle">
        <SectionHeading
          eyebrow="Materials"
          title="Timber, chosen board by board"
          subtitle="We work exclusively with FSC-certified hardwoods sourced from sustainable forests across India."
        />
        <div className={styles.materialsGrid}>
          {MATERIALS.map((material, index) => (
            <Reveal key={material.id} variant="up" delay={index * 100}>
              <div className={styles.materialCard}>
                <h3 className={styles.materialName}>{material.name}</h3>
                <span className={styles.materialOrigin}>
                  <Icon name="map-pin" size={14} />
                  {material.origin}
                </span>
                <p className={styles.materialDesc}>{material.characteristics}</p>
                <div className={styles.materialMeta}>
                  <span className={styles.materialLabel}>Best for</span>
                  <span className={styles.materialValue}>{material.bestFor}</span>
                </div>
                <div className={styles.materialMeta}>
                  <span className={styles.materialLabel}>Hardness</span>
                  <span className={styles.materialValue}>{material.hardness}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Finishes section */}
      <Section>
        <SectionHeading
          eyebrow="Finishes"
          title="Natural hand finishes"
          subtitle="Every surface is finished by hand — never sprayed. Choose the finish that suits your lifestyle."
        />
        <div className={styles.finishesGrid}>
          {FINISHES.map((finish, index) => (
            <Reveal key={finish.id} variant="up" delay={index * 100}>
              <div className={styles.finishCard}>
                <Icon name="sparkle" size={20} className={styles.finishIcon} />
                <h3 className={styles.finishName}>{finish.name}</h3>
                <p className={styles.finishDesc}>{finish.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Joinery section */}
      <Section tone="subtle">
        <SectionHeading
          eyebrow="Joinery"
          title="Built to outlast generations"
          subtitle="The same joints used in furniture that has lasted 200 years — no hidden screws, no shortcuts."
        />
        <div className={styles.joineryGrid}>
          {JOINERY_TYPES.map((joint, index) => (
            <Reveal key={joint.id} variant="up" delay={index * 100}>
              <div className={styles.joineryCard}>
                <span className={styles.joineryNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.joineryName}>{joint.name}</h3>
                <p className={styles.joineryDesc}>{joint.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <HowItWorks />
      <Sustainability />
      <StatsBand />
      <CTA
        title="Ready to commission your piece?"
        subtitle="Every piece begins with a conversation about your space and vision."
      />
    </>
  );
}

export default Features;
