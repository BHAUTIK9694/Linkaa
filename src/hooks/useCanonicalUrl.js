import { useLocation } from 'react-router-dom';
import { SITE_URL } from '@constants/seo';

/**
 * Returns the full canonical URL for the current route.
 * Strips trailing slashes and query parameters for clean canonical URLs.
 *
 * @returns {string} Canonical URL
 */
export function useCanonicalUrl() {
  const { pathname } = useLocation();
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  return `${SITE_URL}${cleanPath}`;
}
