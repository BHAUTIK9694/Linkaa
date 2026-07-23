import { Button, Container, Icon, Reveal } from '@components/ui';
import { ROUTES } from '@constants/routes';
import { ctaBg } from '@assets/images';
import { cn } from '@utils/classNames';
import styles from './CTA.module.css';

/**
 * Full-width call-to-action band, typically placed before the footer.
 * Accepts props for per-page customisation of headline and CTAs.
 */
function CTA({
  title = 'Let\u2019s make something built to last',
  subtitle = 'Book a design consultation or start your commission online.',
  primaryCta = { label: 'Start a commission', to: ROUTES.CONTACT },
  secondaryCta = { label: 'Visit the showroom', to: ROUTES.CONTACT },
}) {
  return (
    <section className={styles.cta}>
      <Container>
        <Reveal variant="scale" className={cn(styles.inner, 'grain')}>
          <div className={styles.bg} aria-hidden="true">
            <img src={ctaBg} alt="" loading="lazy" />
            <div className={styles.scrim} />
          </div>
          <div className={styles.content}>
            <span className={styles.eyebrow}>
              <Icon name="leaf" size={15} />
              Made to order
            </span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={styles.actions}>
              <Button
                size="lg"
                variant="primary"
                to={primaryCta.to}
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                {primaryCta.label}
              </Button>
              <Button size="lg" variant="outline" to={secondaryCta.to} className={styles.secondary}>
                {secondaryCta.label}
              </Button>
            </div>
            <p className={styles.trust}>
              <Icon name="award" size={14} />
              Trusted by 18,000+ homeowners across Gujarat
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default CTA;
