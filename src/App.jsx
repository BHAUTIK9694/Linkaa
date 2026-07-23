import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import AdminLayout from '@layouts/AdminLayout';
import { ErrorBoundary } from '@components/common';
import RequireAdminAuth from '@components/admin/RequireAdminAuth';
import { CustomCursor, MobileCTA, SplashScreen, Spinner } from '@components/ui';
import { AdminAuthProvider } from '@contexts/AdminAuthContext';
import { ROUTES, ADMIN_ROUTES } from '@constants/routes';
import styles from './App.module.css';

// ── Public pages (route-level code splitting) ─────────────────────────
const Home       = lazy(() => import('@pages/Home'));
const Features   = lazy(() => import('@pages/Features'));
const About      = lazy(() => import('@pages/About'));
const Contact    = lazy(() => import('@pages/Contact'));
const Privacy    = lazy(() => import('@pages/Privacy'));
const Terms      = lazy(() => import('@pages/Terms'));
const NotFound   = lazy(() => import('@pages/NotFound'));

// ── Admin pages ────────────────────────────────────────────────────────
const AdminLogin           = lazy(() => import('@pages/admin/AdminLogin'));
const AdminForgotPassword  = lazy(() => import('@pages/admin/AdminForgotPassword'));
const AdminResetPassword   = lazy(() => import('@pages/admin/AdminResetPassword'));
const AdminDashboard       = lazy(() => import('@pages/admin/AdminDashboard'));
const AdminSubmissions     = lazy(() => import('@pages/admin/AdminSubmissions'));
const AdminSubmissionDetail = lazy(() => import('@pages/admin/AdminSubmissionDetail'));

function RouteFallback() {
  return (
    <div className={styles.fallback}>
      <Spinner size={32} label="Loading page" />
    </div>
  );
}

/**
 * Application root. Owns the top-level error boundary and the full route table.
 * Public pages render inside MainLayout; admin pages inside AdminLayout (protected).
 * Router context is provided in main.jsx.
 */
function App() {
  return (
    <ErrorBoundary>
      <AdminAuthProvider>
        <CustomCursor />
        <MobileCTA />
        <SplashScreen>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              {/* ── Public site ─────────────────────────────────────── */}
              <Route element={<MainLayout />}>
                <Route path={ROUTES.HOME}     element={<Home />} />
                <Route path={ROUTES.FEATURES} element={<Features />} />
                <Route path={ROUTES.ABOUT}    element={<About />} />
                <Route path={ROUTES.CONTACT}  element={<Contact />} />
                <Route path={ROUTES.PRIVACY}  element={<Privacy />} />
                <Route path={ROUTES.TERMS}    element={<Terms />} />
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
              </Route>

              {/* ── Admin auth (no shell) ───────────────────────────── */}
              <Route path={ADMIN_ROUTES.LOGIN}           element={<AdminLogin />} />
              <Route path={ADMIN_ROUTES.FORGOT_PASSWORD} element={<AdminForgotPassword />} />
              <Route path={ADMIN_ROUTES.RESET_PASSWORD}  element={<AdminResetPassword />} />

              {/* ── Protected admin panel ───────────────────────────── */}
              <Route
                element={
                  <RequireAdminAuth>
                    <AdminLayout />
                  </RequireAdminAuth>
                }
              >
                <Route index path={ADMIN_ROUTES.DASHBOARD}         element={<AdminDashboard />} />
                <Route path={ADMIN_ROUTES.SUBMISSIONS}             element={<AdminSubmissions />} />
                <Route path={ADMIN_ROUTES.SUBMISSION_DETAIL}       element={<AdminSubmissionDetail />} />
              </Route>
            </Routes>
          </Suspense>
        </SplashScreen>
      </AdminAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
