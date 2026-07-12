import { ROUTES } from './routes';

/** Primary navigation links used in the header. */
export const NAV_LINKS = [
  { id: 'features', label: 'Features', to: ROUTES.FEATURES },
  { id: 'pricing', label: 'Pricing', to: ROUTES.PRICING },
  { id: 'about', label: 'About', to: ROUTES.ABOUT },
  { id: 'contact', label: 'Contact', to: ROUTES.CONTACT },
];

/** Grouped footer navigation. */
export const FOOTER_NAV = [
  {
    id: 'product',
    title: 'Product',
    links: [
      { id: 'features', label: 'Features', to: ROUTES.FEATURES },
      { id: 'pricing', label: 'Pricing', to: ROUTES.PRICING },
      { id: 'security', label: 'Security', to: ROUTES.FEATURES },
      { id: 'integrations', label: 'Integrations', to: ROUTES.FEATURES },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'about', label: 'About', to: ROUTES.ABOUT },
      { id: 'contact', label: 'Contact', to: ROUTES.CONTACT },
      { id: 'careers', label: 'Careers', to: ROUTES.ABOUT },
      { id: 'blog', label: 'Blog', to: ROUTES.ABOUT },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { id: 'privacy', label: 'Privacy', to: ROUTES.HOME },
      { id: 'terms', label: 'Terms', to: ROUTES.HOME },
      { id: 'cookies', label: 'Cookies', to: ROUTES.HOME },
    ],
  },
];
