import { Button, Container, Icon } from '@components/ui';
import { ROUTES } from '@constants/routes';
import styles from './CTA.module.css';

/**
 * Full-width call-to-action band, typically placed before the footer.
 */
function CTA({
  title = 'Ready to scale your workflows?',
  subtitle = 'Join thousands of teams building faster with Linkaa. Free to start.',
  primaryCta = { label: 'Get started free', to: ROUTES.PRICING },
  secondaryCta = { label: 'Talk to sales', to: ROUTES.CONTACT },
}) {
  return (
    <section className={styles.cta}>
      <Container>
        <div className={styles.inner}>
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
        </div>
      </Container>
    </section>
  );
}

export default CTA;
