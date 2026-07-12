import styles from './StepCard.module.css';

/**
 * Numbered step used in "how it works" sequences.
 *
 * @param {object} props
 * @param {string} props.number
 * @param {string} props.title
 * @param {string} props.description
 */
function StepCard({ number, title, description }) {
  return (
    <div className={styles.step}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default StepCard;
