import { Link } from 'react-router-dom';
import { Container, Icon, Reveal, SectionHeading } from '@components/ui';
import { COLLECTIONS } from '@constants/content';
import { ROUTES } from '@constants/routes';
import styles from './Collections.module.css';

const TILE_LINK = ROUTES.CONTACT;

/**
 * Editorial grid of product collections, each a large image tile that lifts
 * and reveals on scroll. Content comes from constants so it stays reusable.
 */
function Collections({
  eyebrow = 'Collections',
  title = 'Pieces for every room',
  subtitle = 'Explore our core ranges, each handcrafted in solid timber and made to order.',
  items = COLLECTIONS,
}) {
  return (
    <section id="collections" className={styles.section}>
      <Container>
        <SectionHeading align="left" eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className={styles.grid}>
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              variant="up"
              delay={index * 90}
              as={Link}
              to={TILE_LINK}
              className={styles.tile}
              data-cursor-text="View"
            >
              <div className={styles.media}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className={styles.scrim} aria-hidden="true" />
              </div>
              <div className={styles.body}>
                <div>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.tagline}>{item.tagline}</p>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  <Icon name="arrow-up-right" size={20} />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Collections;
