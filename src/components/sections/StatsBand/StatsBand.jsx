import { Section } from '@components/ui';
import { StatItem } from '@components/common';
import { STATS } from '@constants/content';
import styles from './StatsBand.module.css';

/**
 * Dark band of headline metrics. Reuses the brand's inverse tone.
 */
function StatsBand({ items = STATS }) {
  return (
    <Section tone="inverse">
      <div className={styles.grid}>
        {items.map((stat) => (
          <StatItem key={stat.id} value={stat.value} label={stat.label} />
        ))}
      </div>
    </Section>
  );
}

export default StatsBand;
