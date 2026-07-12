import { Section } from '@components/ui';
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
        eyebrow="About"
        title="We're building the connective tissue for modern teams"
        subtitle="Linkaa started with a simple belief: your tools should work for you, not the other way around."
      />

      <Section narrow>
        <div className={styles.prose}>
          <p>
            Teams waste countless hours moving data between disconnected tools. We set out to change
            that by building a single platform where connections, automation, and insight live
            together.
          </p>
          <p>
            Today, thousands of teams across 90+ countries rely on Linkaa to remove busywork and
            focus on the work that matters. We&apos;re a remote-first company obsessed with craft,
            reliability, and the details that make software feel effortless.
          </p>
          <p>
            Our values are simple: put customers first, default to transparency, and ship with care.
            Everything we build follows from there.
          </p>
        </div>
      </Section>

      <StatsBand />
      <Testimonials
        eyebrow="Our customers"
        title="Loved by teams everywhere"
        subtitle="We measure success by the outcomes our customers achieve."
      />
      <CTA title="Join the teams building with Linkaa" />
    </>
  );
}

export default About;
