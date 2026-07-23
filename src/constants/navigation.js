import { ANCHORS, ROUTES } from './routes';

/** Primary navigation links used in the header. */
export const NAV_LINKS = [
  { id: 'collections', label: 'Collections', to: ANCHORS.COLLECTIONS },
  { id: 'craft', label: 'Craftsmanship', to: ROUTES.FEATURES },
  { id: 'about', label: 'About', to: ROUTES.ABOUT },
  { id: 'contact', label: 'Contact', to: ROUTES.CONTACT },
];

/** Grouped footer navigation — only real, navigable pages. */
export const FOOTER_NAV = [
  {
    id: 'explore',
    title: 'Explore',
    links: [
      { id: 'collections', label: 'Collections', to: ANCHORS.COLLECTIONS },
      { id: 'craft', label: 'Craftsmanship', to: ROUTES.FEATURES },
      { id: 'about', label: 'About us', to: ROUTES.ABOUT },
      { id: 'contact', label: 'Contact', to: ROUTES.CONTACT },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { id: 'privacy', label: 'Privacy Policy', to: ROUTES.PRIVACY },
      { id: 'terms', label: 'Terms of Service', to: ROUTES.TERMS },
    ],
  },
];
