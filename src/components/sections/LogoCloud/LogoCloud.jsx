import { Container, Icon } from '@components/ui';
import { PARTNERS } from '@constants/content';
import styles from './LogoCloud.module.css';

/**
 * Social-proof strip — marquee of brand/partner wordmarks with a trust headline.
 * Displays as an infinite horizontal scroll for visual interest.
 */
function LogoCloud({ label = 'Trusted by homeowners, designers & architects across Gujarat', brands = PARTNERS }) {
  return (
    <div className={styles.wrapper}>
      <Container>
        <p className={styles.label}>
          <Icon name="award" size={16} />
          {label}
        </p>
      </Container>
      <div className={styles.marquee} aria-hidden="true">
        <ul className={styles.track}>
          {/* Double the list for seamless loop */}
          {[...brands, ...brands].map((brand, i) => (
            <li key={`${brand}-${i}`} className={styles.logo}>
              {brand}
            </li>
          ))}
        </ul>
      </div>
      {/* Accessible static list for screen readers */}
      <ul className="sr-only">
        {brands.map((brand) => (
          <li key={brand}>{brand}</li>
        ))}
      </ul>
    </div>
  );
}

export default LogoCloud;
