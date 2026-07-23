import styles from './StepCard.module.css';

/**
 * Numbered step used in "how it works" sequences.
 *
 * @param {object} props
 * @param {string} props.number
 * @param {string} props.title
 * @param {string} [props.timeline] - Estimated duration for this step
 * @param {string} props.description
 */
function StepCard({ number, title, timeline, description }) {
  return (
    <div className={styles.step}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      <h3 className={styles.title}>{title}</h3>
      {timeline && (
        <span className={styles.timeline}>~{timeline}</span>
      )}
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default StepCard;
