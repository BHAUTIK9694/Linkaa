import { Container, Icon, Reveal, SectionHeading } from '@components/ui';
import styles from './Workshop.module.css';

const WORKSHOP_STATS = [
  { id: 'area', value: '3,000', suffix: 'sq ft', label: 'Workshop area' },
  { id: 'craftsmen', value: '12', label: 'Master craftsmen' },
  { id: 'rooms', value: '3', label: 'Finishing rooms' },
  { id: 'kiln', value: '1', label: 'Timber seasoning kiln' },
];

/**
 * Workshop section — visual overview of the Livantaa workshop with key stats.
 * Designed for the About page to add visual proof of the craft story.
 */
function Workshop({
  eyebrow = 'The workshop',
  title = 'Where every piece begins',
  subtitle = '3,000 sq ft of honest craft on Kalawad Road, Rajkot — open for visits Monday to Saturday.',
}) {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <Reveal variant="up">
          <div className={styles.visual}>
            <div className={styles.overlay}>
              <span className={styles.overlayText}>
                <Icon name="map-pin" size={16} />
                Kalawad Road, Rajkot
              </span>
            </div>
          </div>
        </Reveal>

        <div className={styles.stats}>
          {WORKSHOP_STATS.map((stat, index) => (
            <Reveal key={stat.id} variant="up" delay={index * 80}>
              <div className={styles.stat}>
                <span className={styles.statValue}>
                  {stat.value}
                  {stat.suffix && <span className={styles.statSuffix}>{stat.suffix}</span>}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Workshop;
