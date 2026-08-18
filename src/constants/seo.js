/**
 * SEO constants — meta data, keywords, and structured data for every page.
 * Single source of truth for all SEO-related content across the application.
 *
 * Includes common misspellings and keyword variations to capture
 * search traffic from users who spell the brand or industry terms differently.
 */
import { SITE } from './site';

/** Production site URL — update in .env.production before deploying */
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://livantaa.com';

/** Default OG image path (relative to public/) */
export const DEFAULT_OG_IMAGE = '/og-image.jpg';

/**
 * Core keywords for the business — used in meta keywords and structured data.
 * Includes misspellings and regional variations for discoverability.
 */
export const BRAND_KEYWORDS = [
  // Brand name + misspellings
  'Livantaa',
  'Livanta',
  'Livantaa furniture',
  'Livanta furniture',
  'Livantaa Rajkot',
  // Core industry terms
  'furniture',
  'custom furniture',
  'bespoke furniture',
  'handmade furniture',
  'handcrafted furniture',
  'solid wood furniture',
  'timber furniture',
  // Wood types
  'teak furniture',
  'sheesham furniture',
  'mango wood furniture',
  'rosewood furniture',
  // Product categories
  'dining table',
  'coffee table',
  'sofa',
  'bed frame',
  'bookshelf',
  'cabinet',
  'sideboard',
  'wardrobe',
  // Location-based
  'furniture Rajkot',
  'furniture Gujarat',
  'furniture India',
  'furniture shop Rajkot',
  'furniture store Rajkot',
  'custom furniture Rajkot',
  'bespoke furniture India',
  // Craft/quality terms
  'artisan furniture',
  'luxury furniture',
  'premium furniture',
  'made to order furniture',
  'hand finished furniture',
  // Misspellings of common searches
  'furnitures Rajkot',
  'furnature Rajkot',
  'furnitur Rajkot',
  'custome furniture',
  'wooden furnitures',
];

/**
 * Per-page SEO metadata. Titles follow format: "Page Title | Livantaa"
 * Descriptions are 150–160 characters for optimal SERP display.
 */
export const PAGE_SEO = {
  home: {
    title: `${SITE.name} — Handcrafted Solid Wood Furniture in Rajkot, Gujarat`,
    description:
      'Livantaa crafts bespoke solid wood furniture in Rajkot, Gujarat. Teak, sheesham & mango wood pieces built by hand with honest joinery and lifetime guarantee.',
    keywords: [
      'handcrafted furniture Rajkot',
      'solid wood furniture Gujarat',
      'bespoke furniture India',
      'teak furniture Rajkot',
      'custom made furniture',
      'Livantaa furniture',
      'luxury furniture Rajkot',
      'artisan furniture Gujarat',
    ],
  },
  features: {
    title: `Craftsmanship & Materials | ${SITE.name}`,
    description:
      'Discover how Livantaa builds furniture that lasts generations — responsibly sourced timber, hand-cut joinery, natural finishes, and a lifetime structural guarantee.',
    keywords: [
      'furniture craftsmanship',
      'hand-cut joinery',
      'mortise and tenon furniture',
      'natural wood finish',
      'responsibly sourced timber',
      'lifetime furniture guarantee',
      'teak wood Rajkot',
      'sheesham furniture India',
    ],
  },
  about: {
    title: `About Us — Design Approach & Process | ${SITE.name}`,
    description:
      'Learn how Livantaa approaches planning, materials, execution, and project coordination for residential and commercial spaces.',
    keywords: [
      'about Livantaa',
      'furniture workshop Rajkot',
      'handmade furniture India',
      'furniture maker Gujarat',
      'design approach furniture',
      'Rajkot furniture atelier',
      'project delivery furniture',
    ],
  },
  contact: {
    title: `Contact & Showroom Visit | ${SITE.name}`,
    description:
      'Visit our Rajkot showroom on Kalawad Road or start a commission online. Book a consultation, request a quote, or message us on WhatsApp for a quick reply.',
    keywords: [
      'Livantaa showroom Rajkot',
      'furniture showroom Kalawad Road',
      'book furniture consultation',
      'custom furniture quote',
      'furniture Rajkot contact',
      'WhatsApp furniture enquiry',
    ],
  },
  notFound: {
    title: `Page Not Found | ${SITE.name}`,
    description: 'The page you are looking for does not exist. Return to our homepage to explore our handcrafted furniture collections.',
    noindex: true,
  },
};

/**
 * Structured Data — LocalBusiness schema for the organization.
 * Used on every page for consistent business identity signals.
 */
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  '@id': `${SITE_URL}/#organization`,
  name: SITE.name,
  alternateName: ['Livanta', 'Livantaa Furniture', 'Livantaa Rajkot'],
  description: SITE.description,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-256.png`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12, Kalawad Road, Near Amin Marg',
    addressLocality: 'Rajkot',
    addressRegion: 'Gujarat',
    postalCode: '360005',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.2969,
    longitude: 70.7718,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
  ],
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Bank Transfer',
  areaServed: [
    { '@type': 'City', name: 'Rajkot' },
    { '@type': 'State', name: 'Gujarat' },
    { '@type': 'Country', name: 'India' },
  ],
  sameAs: [
    'https://instagram.com/livantaa',
    'https://linkedin.com/company/livantaa',
    'https://youtube.com/@livantaa',
  ],
  founder: {
    '@type': 'Person',
    name: 'Livantaa Artisans',
  },
  knowsAbout: [
    'Custom furniture design',
    'Solid wood furniture',
    'Teak furniture',
    'Sheesham furniture',
    'Mango wood furniture',
    'Hand-cut joinery',
    'Bespoke furniture commissioning',
  ],
};

/**
 * FAQ structured data schema built from content constants.
 * Used on home page and features page where FAQs appear.
 */
export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Breadcrumb structured data builder.
 * @param {Array<{name: string, url: string}>} items - breadcrumb trail
 */
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * WebSite schema with SearchAction for sitelinks search box.
 */
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  alternateName: 'Livanta',
  url: SITE_URL,
};
