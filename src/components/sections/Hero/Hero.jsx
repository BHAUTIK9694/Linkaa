import { Badge, Button, Container, Icon } from '@components/ui';
import { ROUTES } from '@constants/routes';
import styles from './Hero.module.css';

/**
 * Landing hero: eyebrow, headline, subcopy, primary/secondary CTAs, and a
 * decorative product preview panel. Content is passed via props so the hero
 * can be reused across pages.
 */
function Hero({
  eyebrow = 'New · Automation 2.0 is here',
  title = 'Connect, automate, and scale your business relationships.',
  subtitle = 'Linkaa unifies your contacts, tools, and workflows into one platform so your team can move faster with less busywork.',
  primaryCta = { label: 'Start for free', to: ROUTES.PRICING },
  secondaryCta = { label: 'See features', to: ROUTES.FEATURES },
}) {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          <Badge variant="outline" className={styles.eyebrow}>
            {eyebrow}
          </Badge>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.ctas}>
            <Button size="lg" to={primaryCta.to} iconRight={<Icon name="arrow-right" size={18} />}>
              {primaryCta.label}
            </Button>
            <Button size="lg" variant="outline" to={secondaryCta.to}>
              {secondaryCta.label}
            </Button>
          </div>
          <p className={styles.note}>No credit card required · Free forever plan</p>
        </div>

        <div className={styles.preview} aria-hidden="true">
          <div className={styles.previewBar}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.previewBody}>
            <div className={styles.previewSidebar} />
            <div className={styles.previewMain}>
              <div className={styles.previewRow} />
              <div className={styles.previewRow} />
              <div className={styles.previewCards}>
                <div className={styles.previewCard} />
                <div className={styles.previewCard} />
                <div className={styles.previewCard} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
