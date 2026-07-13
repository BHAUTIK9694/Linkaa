import { Button, Container, Icon } from '@components/ui';
import { ANCHORS, ROUTES } from '@constants/routes';
import { heroBg, heroFloatCard } from '@assets/images';
import { useParallax } from '@hooks';
import { cn } from '@utils/classNames';
import styles from './Hero.module.css';

/**
 * Landing hero: full-viewport, cinematic furniture backdrop with a fluid-glass
 * content panel, floating glass highlight card, and a scroll cue. Content is
 * passed via props so the hero can be reused across pages.
 */
function Hero({
  eyebrow = 'Handcrafted since 1989',
  title = 'Furniture, crafted to endure.',
  subtitle = 'Livantaa designs and builds bespoke pieces in solid timber — shaped by hand, finished with care, and made to be lived with for generations.',
  primaryCta = { label: 'Explore collections', to: ANCHORS.COLLECTIONS },
  secondaryCta = { label: 'Start a commission', to: ROUTES.CONTACT },
}) {
  const cardRef = useParallax(-0.06);
  const chipRef = useParallax(0.1);

  return (
    <section className={cn(styles.hero, 'grain')}>
      <div className={styles.bg} aria-hidden="true">
        <img className={styles.bgImg} src={heroBg} alt="" />
        <div className={styles.overlay} />
      </div>

      <Container className={styles.container}>
        <div className={styles.content}>
          <span className={cn(styles.eyebrow, 'glass-dark')}>
            <Icon name="leaf" size={15} />
            {eyebrow}
          </span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          <div className={styles.ctas}>
            <Button size="lg" to={primaryCta.to} iconRight={<Icon name="arrow-right" size={18} />}>
              {primaryCta.label}
            </Button>
            <Button size="lg" variant="outline" to={secondaryCta.to} className={styles.ghostCta}>
              {secondaryCta.label}
            </Button>
          </div>

          <dl className={cn(styles.stats, 'glass-dark')}>
            <div className={styles.stat}>
              <dt className={styles.statValue}>35+</dt>
              <dd className={styles.statLabel}>Years at the bench</dd>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}>
              <dt className={styles.statValue}>100%</dt>
              <dd className={styles.statLabel}>Certified timber</dd>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}>
              <dt className={styles.statValue}>Lifetime</dt>
              <dd className={styles.statLabel}>Craft guarantee</dd>
            </div>
          </dl>
        </div>

        <div ref={cardRef} className={cn(styles.floatCard, 'glass-dark')} aria-hidden="true">
          <div className={styles.floatImg}>
            <img src={heroFloatCard} alt="" loading="lazy" />
          </div>
          <div className={styles.floatBody}>
            <span className={styles.floatMeta}>Featured piece</span>
            <span className={styles.floatName}>The Neem Lounge Chair</span>
            <span className={styles.floatPrice}>Hand-oiled teak · made to order</span>
          </div>
        </div>

        <span ref={chipRef} className={cn(styles.chip, 'glass-dark')} aria-hidden="true">
          <Icon name="award" size={16} />
          Made to order
        </span>
      </Container>

      <a className={styles.scrollCue} href="#collections" aria-label="Scroll to collections">
        <span>Scroll</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}

export default Hero;
