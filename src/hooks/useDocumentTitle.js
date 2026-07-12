import { useEffect } from 'react';
import { SITE } from '@constants/site';

/**
 * Sets the document title for a page and restores nothing on unmount
 * (the next page sets its own). Keep for lightweight SEO; swap for
 * react-helmet-async when meta tags / OG data are needed (see STEERING.md).
 *
 * @param {string} title - page-specific title segment
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  }, [title]);
}
