import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query and re-render when it changes.
 *
 * @param {string} query e.g. '(min-width: 768px)'
 * @returns {boolean} whether the query currently matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);

    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
