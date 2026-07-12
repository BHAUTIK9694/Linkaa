import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './MainLayout.module.css';

/**
 * Primary application shell: skip link, sticky header, routed page content,
 * and global footer. Resets scroll position on route change.
 */
function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);

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
