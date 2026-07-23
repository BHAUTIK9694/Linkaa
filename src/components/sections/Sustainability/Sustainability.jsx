import { Icon, Reveal, Section, SectionHeading } from '@components/ui';
import styles from './Sustainability.module.css';

const METRICS = [
  { id: 'fsc', icon: 'tree', value: '100%', label: 'FSC-certified timber', description: 'Every board traceable to responsibly managed forests in Central India.' },
  { id: 'waste', icon: 'recycle', value: 'Zero waste', label: 'workshop practice', description: 'Offcuts become smaller pieces, sawdust fuels our wood-drying kiln.' },
  { id: 'local', icon: 'map-pin', value: '<500 km', label: 'sourcing radius', description: 'All timber sourced within 500 km, reducing transport emissions.' },
  { id: 'voc', icon: 'sparkle', value: 'Zero VOCs', label: 'natural finishes', description: 'Only natural oils and waxes — no volatile organic compounds, ever.' },
];

/**
 * Sustainability section — factual environmental impact metrics.
 */
function Sustainability({
  eyebrow = 'Responsibility',
  title = 'Built to last means less waste',
  subtitle = 'Furniture that endures for generations is the most sustainable choice you can make.',
}) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={styles.grid}>
        {METRICS.map((metric, index) => (
          <Reveal key={metric.id} variant="up" delay={index * 100}>
            <div className={styles.card}>
              <Icon name={metric.icon} size={22} className={styles.icon} />
              <span className={styles.value}>{metric.value}</span>
              <span className={styles.label}>{metric.label}</span>
              <p className={styles.desc}>{metric.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Sustainability;
