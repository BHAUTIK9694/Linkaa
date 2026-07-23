import { Button, Container, Icon, Reveal, SectionHeading } from '@components/ui';
import { FEATURED_PROJECTS } from '@constants/content';
import { ROUTES } from '@constants/routes';
import { cn } from '@utils/classNames';
import styles from './FeaturedProjects.module.css';

/**
 * Featured projects section — an immersive, modern grid of architectural
 * projects. Each card reveals on scroll with staggered animations, featuring
 * a dramatic image with a product list overlay on hover. The first project
 * is displayed larger as a hero card for visual hierarchy.
 *
 * @param {object} props
 * @param {string} [props.eyebrow] - small label above title
 * @param {string} [props.title] - section heading
 * @param {string} [props.subtitle] - section description
 * @param {Array} [props.items] - projects data array
 */
function FeaturedProjects({
  eyebrow = 'Featured projects',
  title = 'Each project tells its own story',
  subtitle = 'of collaboration and precision.',
  items = FEATURED_PROJECTS,
}) {
  return (
    <section className={styles.section} id="featured-projects">
      <Container>
        <SectionHeading align="center" eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className={styles.grid}>
          {items.map((project, index) => (
            <Reveal
              key={project.id}
              variant={index === 0 ? 'scale' : 'up'}
              delay={index * 120}
              className={cn(styles.cardWrap, index === 0 && styles.heroCard)}
            >
              <article className={styles.card}>
                <div className={styles.imageWrap}>
                  <img
                    src={project.image}
                    alt={`${project.name} — Livantaa featured project`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className={styles.image}
                  />
                  <div className={styles.scrim} />
                </div>

                <div className={styles.content}>
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <h3 className={styles.name}>{project.name}</h3>
                  <ul className={styles.products}>
                    {project.products.map((product) => (
                      <li key={product} className={styles.product}>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.overlay}>
                  <h3 className={styles.overlayName}>{project.name}</h3>
                  <ul className={styles.overlayProducts}>
                    {project.products.map((product) => (
                      <li key={product} className={styles.overlayProduct}>
                        <Icon name="check" size={14} />
                        <span>{product}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    to={ROUTES.CONTACT}
                    className={styles.overlayBtn}
                    iconRight={<Icon name="arrow-right" size={14} />}
                  >
                    View project
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={200}>
          <div className={styles.cta}>
            <Button
              variant="primary"
              size="lg"
              to={ROUTES.CONTACT}
              iconRight={<Icon name="arrow-right" size={18} />}
            >
              View all projects
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default FeaturedProjects;
