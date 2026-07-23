import { useState } from 'react';
import { Container, Reveal, SectionHeading } from '@components/ui';
import styles from './ProcessGallery.module.css';

const PROCESS_STEPS = [
  { id: 'select', label: 'Timber selection', description: 'Hand-picked from FSC-certified forests for grain and character.' },
  { id: 'cut', label: 'Precision cutting', description: 'Each board dimensioned by hand to exact specifications.' },
  { id: 'join', label: 'Joinery', description: 'Mortise-and-tenon joints fitted without metal fasteners.' },
  { id: 'sand', label: 'Surface preparation', description: 'Sanded through 6 grits — 80 to 400 — for a glass-smooth finish.' },
  { id: 'finish', label: 'Hand finishing', description: 'Natural oil rubbed in 4–6 coats over two weeks of curing.' },
  { id: 'deliver', label: 'Delivered & placed', description: 'Assembled and positioned in your home with care.' },
];

/**
 * Process gallery — interactive step-by-step showing the transformation
 * from raw timber to finished piece. Each step has a visual treatment.
 */
function ProcessGallery({
  eyebrow = 'The transformation',
  title = 'From rough board to finished surface',
  subtitle = 'Every piece passes through six stages of hand craft before it reaches your home.',
}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <Reveal variant="up">
          <div className={styles.gallery}>
            {/* Step indicators */}
            <div className={styles.steps}>
              {PROCESS_STEPS.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  className={`${styles.step} ${index === activeStep ? styles.active : ''}`}
                  onClick={() => setActiveStep(index)}
                  aria-label={`View step: ${step.label}`}
                >
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.stepLabel}>{step.label}</span>
                </button>
              ))}
            </div>

            {/* Active step detail */}
            <div className={styles.detail}>
              <div className={styles.visual}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%` }}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.infoNumber}>
                  Step {String(activeStep + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.infoTitle}>{PROCESS_STEPS[activeStep].label}</h3>
                <p className={styles.infoDesc}>{PROCESS_STEPS[activeStep].description}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default ProcessGallery;
