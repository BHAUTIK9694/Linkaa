import { Button, Container, FloatingLeaves, Icon } from '@components/ui';
import { usePointerParallax } from '@hooks';
import { cn } from '@utils/classNames';
import styles from './PageHero.module.css';

/**
 * Premium hero for interior pages. Frames the page title within a deeply
 * layered, monochrome backdrop — a mesh gradient wash, a low-opacity grid,
 * blurred gradient orbs, and drifting leaves — all reacting subtly to the
 * pointer for a sense of depth. Typography enters with staggered, blur-in
 * motion that mirrors the quality of the home hero.
 *
 * @param {object} props
 * @param {string} [props.eyebrow] - Small kicker above the title
 * @param {string} props.title - Main heading
 * @param {string} [props.subtitle] - Supporting intro line
 * @param {'center'|'left'} [props.align='center'] - Content alignment
 * @param {'craft'|'story'|'contact'} [props.variant='craft'] - Backdrop personality
 * @param {Array<{label:string,to:string,variant?:string,icon?:string}>} [props.actions=[]] - Optional CTA buttons
 * @param {string} [props.className]
 */
function PageHero({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  variant = 'craft',
  actions = [],
  className,
}) {
  const parallaxRef = usePointerParallax();

  return (
    <section
      ref={parallaxRef}
      className={cn(styles.hero, styles[variant], 'grain', className)}
    >
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.mesh} />
        <span className={styles.grid} />
        <span className={cn(styles.orb, styles.orbA)} />
        <span className={cn(styles.orb, styles.orbB)} />

        <FloatingLeaves count={6} theme="light" className={styles.leaves} />

        <svg className={styles.ornament} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <Container narrow className={styles.container}>
        <div className={cn(styles.inner, align === 'left' && styles.left)}>
          {eyebrow && (
            <p className={styles.eyebrow}>
              <Icon name="leaf" size={14} />
              {eyebrow}
            </p>
          )}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

          {actions.length > 0 && (
            <div className={styles.actions}>
              {actions.map((action) => (
                <Button
                  key={action.label}
                  to={action.to}
                  variant={action.variant}
                  iconRight={action.icon ? <Icon name={action.icon} size={18} /> : undefined}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          <span className={styles.divider} aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}

export default PageHero;
