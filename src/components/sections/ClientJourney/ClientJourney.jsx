import { Button, Container, Icon, Reveal } from '@components/ui';
import { ROUTES } from '@constants/routes';
import styles from './ClientJourney.module.css';

/**
 * Featured client journey — a single detailed success story that's more
 * persuasive than short quotes. Shows the full commissioning experience.
 */
function ClientJourney({
  client = 'Ankit & Priya Mehta',
  location = 'Ahmedabad',
  need = 'A 10-seater live-edge teak dining table for their new villa — something that would anchor their open-plan living space for decades.',
  process = 'Two design consultations, timber selection at our showroom, and 8 weeks of handcrafting by our senior maker Ramesh.',
  result = 'A 3-metre live-edge teak table with butterfly joints, hand-oiled to a warm honey finish. Delivered, assembled, and placed in under an hour.',
  quote = 'The dining table is the heart of our home now. We\'ve had it for three years and the teak has only grown more beautiful. It will outlive us.',
}) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.layout}>
          <Reveal variant="left" className={styles.content}>
            <span className={styles.eyebrow}>
              <Icon name="award" size={14} />
              Featured story
            </span>
            <h2 className={styles.title}>
              {client}, {location}
            </h2>

            <div className={styles.timeline}>
              <div className={styles.step}>
                <span className={styles.stepLabel}>The need</span>
                <p className={styles.stepText}>{need}</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepLabel}>The process</span>
                <p className={styles.stepText}>{process}</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepLabel}>The result</span>
                <p className={styles.stepText}>{result}</p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120} className={styles.quoteCol}>
            <blockquote className={styles.quote}>
              <Icon name="quote" size={28} className={styles.quoteMark} />
              <p className={styles.quoteText}>&ldquo;{quote}&rdquo;</p>
              <cite className={styles.cite}>
                — {client}, {location}
              </cite>
            </blockquote>
            <Button
              variant="outline"
              to={ROUTES.CONTACT}
              iconRight={<Icon name="arrow-right" size={16} />}
              className={styles.cta}
            >
              Start a similar project
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default ClientJourney;
