import { Container } from '@components/ui';
import styles from './LogoCloud.module.css';

const DEFAULT_BRANDS = ['Northwind', 'Lumen Labs', 'Vertex', 'Aperture', 'Monolith', 'Skyline'];

/**
 * Social-proof strip of customer wordmarks. Uses styled text as a lightweight
 * stand-in for partner logos (swap in <img> assets when available).
 */
function LogoCloud({ label = 'Trusted by fast-growing teams worldwide', brands = DEFAULT_BRANDS }) {
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
