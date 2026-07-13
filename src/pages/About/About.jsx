import { Reveal, Section } from '@components/ui';
import { CTA, PageHero, StatsBand, Testimonials } from '@components/sections';
import { useDocumentTitle } from '@hooks';
import styles from './About.module.css';

/**
 * About page — mission statement, story, and social proof.
 */
function About() {
  useDocumentTitle('About');

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A workshop devoted to furniture that lasts"
        subtitle="Livantaa began at a single bench in Rajkot in 1989 with one conviction: furniture should be built to be handed down, not thrown away."
      />

      <Section narrow>
        <div className={styles.prose}>
          <Reveal as="p" variant="up">
            We start with solid, responsibly sourced timber — teak, sheesham, and mango wood — and
            honest joinery: mortise and tenon, hand-cut dovetails, surfaces finished with natural
            oils rubbed in by hand. No veneers over particleboard, no hidden fasteners, no
            shortcuts.
          </Reveal>
          <Reveal as="p" variant="up" delay={100}>
            Every piece is made to order by a single maker who signs their work when it is complete.
            That maker sees your furniture from rough board to finished surface, so the person who
            builds it is accountable for it.
          </Reveal>
          <Reveal as="p" variant="up" delay={200}>
            Based in Rajkot, Gujarat, our values are simple: source responsibly, build honestly, and
            stand behind every joint for life. Everything we make follows from there.
          </Reveal>
        </div>
      </Section>

      <StatsBand />
      <Testimonials
        eyebrow="Client stories"
        title="Lived with, and loved"
        subtitle="We measure success in decades of daily use, not quarters."
      />
      <CTA title="Let’s make something built to last" />
    </>
  );
}

export default About;
