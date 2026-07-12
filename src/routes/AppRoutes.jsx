import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import { Spinner } from '@components/ui';
import { ROUTES } from '@constants/routes';
import styles from './AppRoutes.module.css';

// Route-level code splitting: each page is its own chunk.
const Home = lazy(() => import('@pages/Home'));
const Features = lazy(() => import('@pages/Features'));
const Pricing = lazy(() => import('@pages/Pricing'));
const About = lazy(() => import('@pages/About'));
const Contact = lazy(() => import('@pages/Contact'));
const NotFound = lazy(() => import('@pages/NotFound'));

function RouteFallback() {
  return (
    <div className={styles.fallback}>
      <Spinner size={32} label="Loading page" />
    </div>
  );
}

/**
 * Central route table. Pages render inside the shared MainLayout.
 */
function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.FEATURES} element={<Features />} />
          <Route path={ROUTES.PRICING} element={<Pricing />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
