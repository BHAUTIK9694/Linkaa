/**
 * Static marketing content for the landing pages.
 * In a production app this could be replaced by a CMS response
 * fetched through the services layer.
 *
 * All images are imported locally from src/assets/images/ so Vite
 * hashes them for cache-busting and the site works offline.
 */
import {
  collectionSeating,
  collectionTables,
  collectionStorage,
  collectionBedroom,
  projectVilla,
  projectPenthouse,
  projectFarmhouse,
} from '@assets/images';

/* -----------------------------------------------------------------------------
   Craft pillars — "why choose us"
   -------------------------------------------------------------------------- */
export const FEATURES = [
  {
    id: 'timber',
    icon: 'tree',
    title: 'Responsibly sourced timber',
    description:
      'Solid teak, sheesham, and mango wood from certified suppliers — chosen board by board for grain and character.',
  },
  {
    id: 'joinery',
    icon: 'ruler',
    title: 'Honest joinery',
    description:
      'Mortise-and-tenon and hand-cut dovetails. No hidden screws, no shortcuts — structure you can trust.',
  },
  {
    id: 'bespoke',
    icon: 'tool',
    title: 'Made to your measure',
    description:
      'Every piece is built to order. Adjust dimensions, timber, and finish to suit your space exactly.',
  },
  {
    id: 'finish',
    icon: 'sparkle',
    title: 'Natural hand finishes',
    description:
      'Low-VOC oils and waxes rubbed in by hand, deepening the grain and ageing beautifully over decades.',
  },
  {
    id: 'delivery',
    icon: 'truck',
    title: 'Doorstep delivery & installation',
    description:
      'Our team delivers, assembles, and places each piece in your home — packaging removed, nothing to lift.',
  },
  {
    id: 'guarantee',
    icon: 'award',
    title: 'Lifetime guarantee',
    description:
      'We stand behind our craft for life. If a joint ever fails, we repair or replace it — no questions asked.',
  },
];

/* -----------------------------------------------------------------------------
   Headline metrics
   -------------------------------------------------------------------------- */
export const STATS = [
  { id: 'years', value: '35+', label: 'Years at the bench' },
  { id: 'pieces', value: '18,000', label: 'Pieces delivered' },
  { id: 'timber', value: '100%', label: 'Certified timber' },
  { id: 'guarantee', value: 'Lifetime', label: 'Craftsmanship guarantee' },
];

/* -----------------------------------------------------------------------------
   Our process
   -------------------------------------------------------------------------- */
export const STEPS = [
  {
    id: 'consult',
    number: '01',
    title: 'Design consultation',
    description:
      'Share your space and vision. We sketch options, select timber, and agree the details together — at our Rajkot showroom or online.',
  },
  {
    id: 'craft',
    number: '02',
    title: 'Handcrafted in the workshop',
    description:
      'A single maker builds your piece from rough board to finished surface — signed when complete.',
  },
  {
    id: 'deliver',
    number: '03',
    title: 'Delivered & placed',
    description:
      'We deliver, assemble, and position your furniture with care, ready to be lived with for generations.',
  },
];

/* -----------------------------------------------------------------------------
   Collections — premium product cards
   -------------------------------------------------------------------------- */
export const COLLECTIONS = [
  {
    id: 'seating',
    name: 'Seating',
    tagline: 'Sofas, lounge & dining chairs',
    image: collectionSeating,
  },
  {
    id: 'tables',
    name: 'Tables',
    tagline: 'Dining, coffee & console',
    image: collectionTables,
  },
  {
    id: 'storage',
    name: 'Storage',
    tagline: 'Sideboards, shelving & cabinets',
    image: collectionStorage,
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    tagline: 'Beds, nightstands & dressers',
    image: collectionBedroom,
  },
];

/* -----------------------------------------------------------------------------
   Featured projects / showcase
   -------------------------------------------------------------------------- */
export const PROJECTS = [
  {
    id: 'villa',
    name: 'Villa Harmony',
    meta: 'Live-edge teak dining table · 10 seats',
    image: projectVilla,
  },
  {
    id: 'penthouse',
    name: 'Skyline Penthouse',
    meta: 'Modular sheesham shelving · full-height wall',
    image: projectPenthouse,
  },
  {
    id: 'farmhouse',
    name: 'Countryside Farmhouse',
    meta: 'Mango wood bed frame & matching nightstands',
    image: projectFarmhouse,
  },
];

/* -----------------------------------------------------------------------------
   Client stories
   -------------------------------------------------------------------------- */
export const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'The dining table is the heart of our home now. The craftsmanship is on another level — it will outlive us.',
    author: 'Ankit Mehta',
    role: 'Homeowner, Rajkot',
  },
  {
    id: 't2',
    quote:
      'From the first sketch to delivery, every detail was considered. Livantaa builds furniture the way it used to be made.',
    author: 'Pooja Shah',
    role: 'Interior Designer, Ahmedabad',
  },
  {
    id: 't3',
    quote:
      'We specified custom dimensions for a tricky alcove and it fit perfectly. Unrivalled quality and service.',
    author: 'Ravi Patel',
    role: 'Architect, Rajkot',
  },
];

/* -----------------------------------------------------------------------------
   FAQ
   -------------------------------------------------------------------------- */
export const FAQS = [
  {
    id: 'q1',
    question: 'How long does a commission take?',
    answer:
      'Most bespoke pieces are hand-built and delivered within 8–12 weeks. We confirm a timeline with you at the design stage.',
  },
  {
    id: 'q2',
    question: 'Can I choose my own timber and finish?',
    answer:
      'Yes. Every commission starts with material selection — choose from teak, sheesham, mango wood and more, paired with hand-rubbed oil or wax finishes.',
  },
  {
    id: 'q3',
    question: 'Do you deliver and assemble?',
    answer:
      'We offer doorstep delivery and installation across Gujarat and major cities in India. Our team assembles and places each piece in your home, then removes all packaging.',
  },
  {
    id: 'q4',
    question: 'What does the lifetime guarantee cover?',
    answer:
      'We guarantee our joinery for life. If a structural joint ever fails under normal use, we will repair or replace the piece free of charge.',
  },
];

/* -----------------------------------------------------------------------------
   Social proof — partners / press wordmarks
   -------------------------------------------------------------------------- */
export const PARTNERS = [
  'AD India',
  'Architectural Digest',
  'Elle Decor India',
  'Home & Design',
  'Living Spaces',
  'Gujarat Today',
];
