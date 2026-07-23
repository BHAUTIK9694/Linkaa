import { Container, Reveal } from '@components/ui';
import styles from './Certifications.module.css';

const CERTS = [
  { id: 'fsc', label: 'FSC Certified' },
  { id: 'handmade', label: 'Handmade in India' },
  { id: 'lifetime', label: 'Lifetime Guarantee' },
  { id: 'zerovoc', label: 'Zero VOC Finishes' },
  { id: 'local', label: 'Locally Sourced' },
];

/**
 * Slim certifications band — trust signals for high-ticket purchases.
 */
function Certifications({ items = CERTS }) {
  return (
    <div className={styles.band}>
      <Container>
        <Reveal variant="fade">
          <ul className={styles.list}>
            {items.map((cert) => (
              <li key={cert.id} className={styles.item}>
                {cert.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}

export default Certifications;
