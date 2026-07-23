import { Button, Container, FloatingLeaves, Icon, Reveal, SectionHeading } from '@components/ui';
import { PROJECTS } from '@constants/content';
import { ROUTES } from '@constants/routes';
import { cn } from '@utils/classNames';
import styles from './Showcase.module.css';

/**
 * Featured projects, presented as alternating cinematic rows on a dark ground.
 * Images subtly scale on hover; each row reveals as it enters the viewport.
 */
function Showcase({
  eyebrow = 'Featured work',
  title = 'Where craft meets the everyday',
  subtitle = 'A selection of recent commissions, built for homes and studios that value the made-by-hand.',
  items = PROJECTS,
}) {
  return (
    <section className={cn(styles.section, 'grain')}>
      <FloatingLeaves count={4} theme="dark" />
      <Container>
        <SectionHeading align="left" eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className={styles.rows}>
          {items.map((item, index) => (
            <article key={item.id} className={cn(styles.row, index % 2 === 1 && styles.reversed)}>
              <Reveal variant={index % 2 === 1 ? 'right' : 'left'} className={styles.mediaWrap}>
                <div className={styles.media}>
                  <img
                    src={item.image}
                    alt={`${item.name} — ${item.meta} | Livantaa custom furniture project`}
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
              </Reveal>

              <Reveal variant="up" delay={120} className={styles.info}>
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.name}>{item.name}</h3>
                {item.location && (
                  <span className={styles.attribution}>
                    {item.location}{item.year ? ` · ${item.year}` : ''}
                  </span>
                )}
                <p className={styles.meta}>{item.meta}</p>
                <Button
                  variant="ghost"
                  to={ROUTES.CONTACT}
                  className={styles.link}
                  iconRight={<Icon name="arrow-right" size={16} />}
                >
                  View project
                </Button>
              </Reveal>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Showcase;
