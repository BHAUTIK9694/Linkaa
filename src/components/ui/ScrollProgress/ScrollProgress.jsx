import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';

/**
 * Thin scroll progress indicator at the top of the viewport.
 * Fills left-to-right as the user scrolls down the page.
 * Only renders after the user has scrolled past the hero.
 */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (progress < 2) return null;

  return (
    <div className={styles.bar} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <div className={styles.fill} style={{ width: `${progress}%` }} />
    </div>
  );
}

export default ScrollProgress;
