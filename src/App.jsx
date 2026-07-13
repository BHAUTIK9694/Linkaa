import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import { ErrorBoundary } from '@components/common';
import { CustomCursor, SplashScreen, Spinner } from '@components/ui';
import { ROUTES } from '@constants/routes';
import styles from './App.module.css';

// Route-level code splitting: each page is its own chunk.
const Home = lazy(() => import('@pages/Home'));
const Features = lazy(() => import('@pages/Features'));
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
 * Application root. Owns the top-level error boundary and the full route table.
 * Every page renders inside the shared MainLayout. Router context is provided
 * in main.jsx.
 */
function App() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <SplashScreen>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.FEATURES} element={<Features />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path={ROUTES.CONTACT} element={<Contact />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </SplashScreen>
    </ErrorBoundary>
  );
}

export default App;
