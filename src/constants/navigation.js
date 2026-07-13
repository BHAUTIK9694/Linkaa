import { ANCHORS, ROUTES } from './routes';

/** Primary navigation links used in the header. */
export const NAV_LINKS = [
  { id: 'collections', label: 'Collections', to: ANCHORS.COLLECTIONS },
  { id: 'craft', label: 'Craftsmanship', to: ROUTES.FEATURES },
  { id: 'about', label: 'About', to: ROUTES.ABOUT },
  { id: 'contact', label: 'Contact', to: ROUTES.CONTACT },
];

/** Grouped footer navigation. */
export const FOOTER_NAV = [
  {
    id: 'collections',
    title: 'Collections',
    links: [
      { id: 'seating', label: 'Seating', to: ANCHORS.COLLECTIONS },
      { id: 'tables', label: 'Tables', to: ANCHORS.COLLECTIONS },
      { id: 'storage', label: 'Storage', to: ANCHORS.COLLECTIONS },
      { id: 'bespoke', label: 'Bespoke', to: ROUTES.FEATURES },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'about', label: 'Our story', to: ROUTES.ABOUT },
      { id: 'craft', label: 'Craftsmanship', to: ROUTES.FEATURES },
      { id: 'projects', label: 'Projects', to: ROUTES.ABOUT },
      { id: 'careers', label: 'Careers', to: ROUTES.CONTACT },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    links: [
      { id: 'showroom', label: 'Showroom', to: ROUTES.CONTACT },
      { id: 'contact', label: 'Contact', to: ROUTES.CONTACT },
      { id: 'care', label: 'Care & repair', to: ROUTES.CONTACT },
      { id: 'faq', label: 'FAQ', to: ROUTES.CONTACT },
    ],
  },
];
