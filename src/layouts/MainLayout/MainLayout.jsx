import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './MainLayout.module.css';

/**
 * Primary application shell: skip link, sticky header, routed page content,
 * and global footer. Handles scroll behaviour on navigation — smooth-scrolling
 * to an in-page anchor when a hash is present, otherwise resetting to the top.
 */
function MainLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a beat for the (possibly lazy) page to mount before scrolling.
      const id = window.setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => window.clearTimeout(id);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash]);

  return (
    <div className={styles.shell}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
