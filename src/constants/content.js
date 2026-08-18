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
  projectOrchardHouse,
  projectAshmeadBarn,
  projectKeepersCottage,
  projectSeaBreeze,
  projectRustyHouse,
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
      'Solid teak, sheesham, and mango wood from FSC-certified suppliers in Central India — chosen board by board for grain, character, and structural integrity.',
  },
  {
    id: 'joinery',
    icon: 'ruler',
    title: 'Honest joinery',
    description:
      'Mortise-and-tenon and hand-cut dovetails. No hidden screws, no shortcuts — the same joints used in furniture that has lasted 200 years.',
  },
  {
    id: 'bespoke',
    icon: 'tool',
    title: 'Made to your measure',
    description:
      'Every piece is built to order. Adjust dimensions, timber species, and finish to suit your space exactly — no two pieces are identical.',
  },
  {
    id: 'finish',
    icon: 'sparkle',
    title: 'Natural hand finishes',
    description:
      'Low-VOC oils and waxes rubbed in by hand across 4–6 coats, deepening the grain and ageing beautifully over decades of daily use.',
  },
  {
    id: 'delivery',
    icon: 'truck',
    title: 'Doorstep delivery & installation',
    description:
      'Our team delivers, assembles, and places each piece in your home — packaging removed, nothing to lift. Available across Gujarat and major Indian cities.',
  },
  {
    id: 'guarantee',
    icon: 'award',
    title: 'Lifetime guarantee',
    description:
      'We stand behind our craft for life. If a structural joint ever fails, we repair or replace it — no questions asked.',
  },
];

/* -----------------------------------------------------------------------------
   Headline metrics
   -------------------------------------------------------------------------- */
export const STATS = [
  { id: 'years', value: 'Tailored service', label: 'Across residential and commercial projects' },
  { id: 'pieces', value: '18,000+', label: 'Pieces delivered across Gujarat', numericValue: 18000, suffix: '+' },
  { id: 'timber', value: '100%', label: 'FSC-certified timber', numericValue: 100, suffix: '%' },
  { id: 'guarantee', value: 'Lifetime', label: 'Structural guarantee' },
];

/* -----------------------------------------------------------------------------
   Our process
   -------------------------------------------------------------------------- */
export const STEPS = [
  {
    id: 'consult',
    number: '01',
    title: 'Design consultation',
    timeline: '1–2 weeks',
    description:
      'Share your space and vision. We sketch options, select timber, and agree the details together — at our Rajkot showroom or online.',
  },
  {
    id: 'craft',
    number: '02',
    title: 'Handcrafted in the workshop',
    timeline: '6–8 weeks',
    description:
      'A single maker builds your piece from rough board to finished surface — signed when complete.',
  },
  {
    id: 'deliver',
    number: '03',
    title: 'Delivered & placed',
    timeline: '1 week',
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
    startingPrice: 'From ₹35,000',
    image: collectionSeating,
  },
  {
    id: 'tables',
    name: 'Tables',
    tagline: 'Dining, coffee & console',
    startingPrice: 'From ₹45,000',
    image: collectionTables,
  },
  {
    id: 'storage',
    name: 'Storage',
    tagline: 'Sideboards, shelving & cabinets',
    startingPrice: 'From ₹55,000',
    image: collectionStorage,
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    tagline: 'Beds, nightstands & dressers',
    startingPrice: 'From ₹60,000',
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
    location: 'Ahmedabad',
    year: '2024',
    meta: 'Live-edge teak dining table · 10 seats',
    image: projectVilla,
  },
  {
    id: 'penthouse',
    name: 'Skyline Penthouse',
    location: 'Rajkot',
    year: '2023',
    meta: 'Modular sheesham shelving · full-height wall',
    image: projectPenthouse,
  },
  {
    id: 'farmhouse',
    name: 'Countryside Farmhouse',
    location: 'Junagadh',
    year: '2024',
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
      'The dining table is the heart of our home now. We\'ve had it for three years and the teak has only grown more beautiful. The craftsmanship is on another level — it will outlive us.',
    author: 'Ankit Mehta',
    role: 'Homeowner, Rajkot',
  },
  {
    id: 't2',
    quote:
      'From the first sketch to delivery, every detail was considered. I\'ve specified Livantaa on five client projects — they build furniture the way it used to be made.',
    author: 'Pooja Shah',
    role: 'Interior Designer, Ahmedabad',
  },
  {
    id: 't3',
    quote:
      'We specified custom dimensions for a tricky alcove and the sheesham bookshelf fit perfectly. Unrivalled quality and service — the team even adjusted the finish on-site.',
    author: 'Ravi Patel',
    role: 'Architect, Rajkot',
  },
  {
    id: 't4',
    quote:
      'Our mango wood bed frame is a conversation piece every time someone visits. Worth every rupee and then some. The lifetime guarantee gives real peace of mind.',
    author: 'Meera Joshi',
    role: 'Homeowner, Surat',
  },
  {
    id: 't5',
    quote:
      'Livantaa understood exactly what we needed for the hotel lobby. The console table arrived on time and the quality matched what we\'d seen in the showroom. Professional from start to finish.',
    author: 'Dharmesh Vora',
    role: 'Hospitality Developer, Ahmedabad',
  },
  {
    id: 't6',
    quote:
      'I inherited my parents\' love for solid wood furniture and Livantaa is the only workshop I trust. They restored our family dining table and built new chairs to match — seamlessly.',
    author: 'Shreya Desai',
    role: 'Homeowner, Vadodara',
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
      'Most bespoke pieces are hand-built and delivered within 8–12 weeks. We confirm a timeline with you at the design stage so there are no surprises.',
  },
  {
    id: 'q2',
    question: 'What does custom furniture cost?',
    answer:
      'Pricing depends on size, timber, and complexity. As a guide: dining tables start from ₹45,000, beds from ₹60,000, and wardrobes from ₹80,000. We provide a detailed quote after the design consultation — no obligation.',
  },
  {
    id: 'q3',
    question: 'Can I choose my own timber and finish?',
    answer:
      'Yes. Every commission starts with material selection — choose from teak, sheesham, mango wood and more, paired with hand-rubbed oil or wax finishes. We can send timber samples if you\'re outside Rajkot.',
  },
  {
    id: 'q4',
    question: 'Do you deliver and assemble?',
    answer:
      'We offer doorstep delivery and installation across Gujarat and major cities in India. Our team assembles and places each piece in your home, then removes all packaging.',
  },
  {
    id: 'q5',
    question: 'What does the lifetime guarantee cover?',
    answer:
      'We guarantee our joinery for life. If a structural joint ever fails under normal use, we will repair or replace the piece free of charge.',
  },
  {
    id: 'q6',
    question: 'Do you offer EMI or payment plans?',
    answer:
      'Yes. We offer flexible payment in 3 instalments: 40% at design sign-off, 40% at build completion, and 20% on delivery. For orders above ₹2,00,000 we can arrange EMI through partner banks.',
  },
  {
    id: 'q7',
    question: 'Can I visit the workshop?',
    answer:
      'Absolutely. Our showroom and workshop on Kalawad Road, Rajkot is open Monday–Saturday, 10 AM – 7 PM. Book a visit and we\'ll walk you through active projects and material selections.',
  },
  {
    id: 'q8',
    question: 'How do I care for solid wood furniture?',
    answer:
      'Dust regularly with a soft cloth, wipe spills promptly, and re-oil once a year with the finishing oil we provide. Avoid direct sunlight and keep away from heat sources. We include a care guide with every delivery.',
  },
];

/* -----------------------------------------------------------------------------
   Featured Projects — story-driven showcase with product specs per project
   -------------------------------------------------------------------------- */
export const FEATURED_PROJECTS = [
  {
    id: 'orchard-house',
    name: 'Orchard House',
    image: projectOrchardHouse,
    products: [
      'Fluid Timeless Window',
      'Fluid Timeless Door',
      'Fluid X — Minimal Sliding Doors',
      'Fluid X Vertical (Structural Glazing)',
    ],
  },
  {
    id: 'ashmead-barn',
    name: 'Ashmead Barn',
    image: projectAshmeadBarn,
    products: [
      'Fluid Sliding Door',
      'Fluid Glass Balustrade',
      'Fluid X Pivot Door',
      'Fluid Window',
    ],
  },
  {
    id: 'keepers-cottage',
    name: 'Keepers Cottage',
    image: projectKeepersCottage,
    products: [
      'Fluid Sliding Door',
      'Fluid Window',
      'Fluid X Vertical (Structural Glazing)',
      'Fluid Glass Skylight / Ridgelight',
    ],
  },
  {
    id: 'sea-breeze',
    name: 'Sea Breeze',
    image: projectSeaBreeze,
    products: [
      'Fluid X Vertical (Structural Glazing)',
      'Fluid X — Minimal Sliding Doors',
      'Fluid Window',
    ],
  },
  {
    id: 'rusty-house',
    name: 'Rusty House',
    image: projectRustyHouse,
    products: [
      'Fluid Window',
      'Fluid X Vertical (Structural Glazing)',
      'Fluid X — Minimal Sliding Doors',
    ],
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
