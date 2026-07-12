import { useId, useState } from 'react';
import { Icon } from '@components/ui';
import { cn } from '@utils/classNames';
import styles from './Accordion.module.css';

/**
 * Accessible single-open accordion for FAQ-style content.
 *
 * @param {object} props
 * @param {{ id: string, question: string, answer: string }[]} props.items
 */
function Accordion({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);
  const baseId = useId();

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <div className={styles.accordion}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const headerId = `${baseId}-${item.id}-header`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id} className={cn(styles.item, isOpen && styles.open)}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={headerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.question}</span>
                <Icon name="chevron-down" size={20} className={styles.chevron} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={styles.panel}
              hidden={!isOpen}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
