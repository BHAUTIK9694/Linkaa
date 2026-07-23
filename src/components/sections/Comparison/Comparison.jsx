import { Icon, Reveal, Section, SectionHeading } from '@components/ui';
import styles from './Comparison.module.css';

const ROWS = [
  { id: 'material', label: 'Material', factory: 'Particleboard with veneer', livantaa: 'Solid teak, sheesham, or mango wood' },
  { id: 'joinery', label: 'Assembly', factory: 'Cam-lock & staple assembly', livantaa: 'Mortise-and-tenon & hand-cut dovetails' },
  { id: 'finish', label: 'Finish', factory: 'Machine-sprayed lacquer', livantaa: 'Hand-rubbed natural oil, 4–6 coats' },
  { id: 'guarantee', label: 'Guarantee', factory: '1-year limited warranty', livantaa: 'Lifetime structural guarantee' },
  { id: 'custom', label: 'Sizing', factory: 'Standard sizes only', livantaa: 'Made to your exact dimensions' },
  { id: 'timeline', label: 'Build', factory: '2–4 week mass production', livantaa: '6–8 weeks, one maker per piece' },
];

/**
 * Side-by-side comparison: factory furniture vs Livantaa handcrafted.
 * Directly addresses the "why pay more?" objection with factual differences.
 */
function Comparison({
  eyebrow = 'The difference',
  title = 'Factory furniture vs. handcrafted',
  subtitle = 'See exactly what changes when furniture is built by hand, board by board.',
}) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className={styles.table}>
        <div className={styles.header}>
          <span className={styles.headerLabel}>Attribute</span>
          <span className={styles.headerFactory}>Factory</span>
          <span className={styles.headerLivantaa}>Livantaa</span>
        </div>
        {ROWS.map((row, index) => (
          <Reveal key={row.id} variant="up" delay={index * 60}>
            <div className={styles.row}>
              <span className={styles.label}>{row.label}</span>
              <span className={styles.factory}>
                <Icon name="x" size={14} className={styles.iconFactory} />
                {row.factory}
              </span>
              <span className={styles.livantaa}>
                <Icon name="check" size={14} className={styles.iconLivantaa} />
                {row.livantaa}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Comparison;
