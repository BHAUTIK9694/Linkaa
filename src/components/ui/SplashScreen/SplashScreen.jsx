import { useEffect, useState } from 'react';
import Logo from '../Logo';
import styles from './SplashScreen.module.css';

/**
 * Animated brand splash screen shown while the app boots.
 *
 * The component that owns this only mounts on a full document load (initial
 * visit or a browser reload), never on client-side route changes — so the
 * splash reliably plays on every reload without interrupting in-app navigation.
 * It reveals the Livantaa mark with a staggered entrance, then fades and lifts
 * away to expose the main content underneath.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Main app content revealed after splash
 * @param {number} [props.duration=800] - Hold time before the exit begins (ms)
 */
function SplashScreen({ children, duration = 800 }) {
  const [phase, setPhase] = useState('active'); // active | exiting | done

  useEffect(() => {
    // Respect reduced motion — skip straight to content.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      return undefined;
    }

    // Skip splash for return visitors within this session.
    if (window.sessionStorage.getItem('livantaa_splash_shown')) {
      setPhase('done');
      return undefined;
    }

    window.sessionStorage.setItem('livantaa_splash_shown', '1');

    const exitTimer = window.setTimeout(() => setPhase('exiting'), duration);
    const doneTimer = window.setTimeout(() => setPhase('done'), duration + 800);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [duration]);

  if (phase === 'done') return children;

  return (
    <>
      <div
        className={`${styles.splash} ${phase === 'exiting' ? styles.exiting : ''}`}
        role="presentation"
        aria-hidden="true"
      >
        <div className={styles.logoWrap}>
          {/* <Logo variant="icon" height={68} className={styles.logoIcon} /> */}
          <Logo variant="full" height={34} className={styles.logoFull} />
          <span className={styles.tagline}>Furniture, crafted to endure.</span>
          <span className={styles.progress}>
            <span className={styles.progressBar} />
          </span>
        </div>
      </div>
      {/* Keep the app in the tree so lazy chunks load behind the splash. */}
      <div className={styles.behind}>{children}</div>
    </>
  );
}

export default SplashScreen;
