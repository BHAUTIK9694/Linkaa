import { Reveal, Section } from '@components/ui';
import { StatItem } from '@components/common';
import { STATS } from '@constants/content';
import styles from './StatsBand.module.css';

/**
 * Dark band of headline metrics. Reuses the brand's inverse tone.
 */
function StatsBand({
  eyebrow = 'By the numbers',
  title = 'A workshop measured in decades, not quarters',
  items = STATS,
}) {
  return (
    <Section tone="inverse">
      <div className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.grid}>
        {items.map((stat, index) => (
          <Reveal key={stat.id} variant="up" delay={index * 90}>
            <StatItem value={stat.value} label={stat.label} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default StatsBand;
