/**
 * Centralized route path definitions.
 * Import from here instead of hardcoding path strings across the app.
 */
export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  NOT_FOUND: '*',
};

/** In-page section anchors on the home route. */
export const ANCHORS = {
  COLLECTIONS: '/#collections',
};

/** Admin panel route paths. All nested under /admin. */
export const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  FORGOT_PASSWORD: '/admin/forgot-password',
  RESET_PASSWORD: '/admin/reset-password',
  DASHBOARD: '/admin',
  SUBMISSIONS: '/admin/submissions',
  SUBMISSION_DETAIL: '/admin/submissions/:id',
};
