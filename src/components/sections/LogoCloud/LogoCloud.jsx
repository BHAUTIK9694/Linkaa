import { Container } from '@components/ui';
import { PARTNERS } from '@constants/content';
import styles from './LogoCloud.module.css';

/**
 * Social-proof strip of press / partner wordmarks. Uses styled text as a
 * lightweight stand-in for logos (swap in <img> assets when available).
 */
function LogoCloud({ label = 'As featured in', brands = PARTNERS }) {
  return (
    <div className={styles.wrapper}>
      <Container>
        <p className={styles.label}>{label}</p>
        <ul className={styles.logos}>
          {brands.map((brand) => (
            <li key={brand} className={styles.logo}>
              {brand}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default LogoCloud;
