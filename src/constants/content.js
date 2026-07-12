/**
 * Static marketing content for the landing pages.
 * In a production app this could be replaced by a CMS response
 * fetched through the services layer.
 */

export const FEATURES = [
  {
    id: 'connect',
    icon: 'link',
    title: 'Unified Connections',
    description:
      'Bring every contact, account, and integration into a single source of truth that stays in sync automatically.',
  },
  {
    id: 'automate',
    icon: 'zap',
    title: 'Smart Automation',
    description:
      'Design no-code workflows that trigger on real events and remove repetitive manual work across teams.',
  },
  {
    id: 'insights',
    icon: 'chart',
    title: 'Actionable Insights',
    description:
      'Real-time dashboards surface the signals that matter so you can make decisions with confidence.',
  },
  {
    id: 'secure',
    icon: 'shield',
    title: 'Enterprise Security',
    description:
      'SOC 2 Type II, SSO, granular roles, and encryption at rest and in transit — secure by default.',
  },
  {
    id: 'scale',
    icon: 'layers',
    title: 'Scales With You',
    description:
      'From a five-person team to a global enterprise, Linkaa grows without slowing you down.',
  },
  {
    id: 'integrate',
    icon: 'plug',
    title: '200+ Integrations',
    description:
      'Connect the tools you already use with native integrations and a fully documented open API.',
  },
];

export const STATS = [
  { id: 'customers', value: '12,000+', label: 'Teams onboarded' },
  { id: 'uptime', value: '99.99%', label: 'Guaranteed uptime' },
  { id: 'countries', value: '90+', label: 'Countries served' },
  { id: 'automations', value: '4.2M', label: 'Automations run daily' },
];

export const STEPS = [
  {
    id: 'connect',
    number: '01',
    title: 'Connect your stack',
    description: 'Link your existing tools in minutes with secure one-click integrations.',
  },
  {
    id: 'build',
    number: '02',
    title: 'Build your workflows',
    description: 'Use the visual builder to automate hand-offs, alerts, and follow-ups.',
  },
  {
    id: 'scale',
    number: '03',
    title: 'Measure and scale',
    description: 'Track performance in real time and roll out what works across the org.',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'Linkaa replaced four separate tools and cut our onboarding time in half. It just works.',
    author: 'Amelia Chen',
    role: 'VP of Operations, Northwind',
  },
  {
    id: 't2',
    quote:
      'The automation engine is the most flexible we have used. Our team ships workflows in a day.',
    author: 'Marcus Reed',
    role: 'Head of RevOps, Lumen Labs',
  },
  {
    id: 't3',
    quote:
      'Security and compliance were non-negotiable for us. Linkaa checked every box on the first call.',
    author: 'Priya Nair',
    role: 'CISO, Vertex Financial',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'For individuals and small teams getting started.',
    features: ['Up to 3 users', '5 active workflows', 'Core integrations', 'Community support'],
    cta: 'Get started',
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$49',
    period: 'per user / month',
    description: 'For growing teams that need automation at scale.',
    features: [
      'Unlimited users',
      'Unlimited workflows',
      '200+ integrations',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'talk to sales',
    description: 'For organizations with advanced security and control needs.',
    features: [
      'Everything in Growth',
      'SSO & SCIM',
      'Dedicated success manager',
      'Custom SLAs',
      'On-premise options',
    ],
    cta: 'Contact sales',
    featured: false,
  },
];

export const FAQS = [
  {
    id: 'q1',
    question: 'How long does it take to get set up?',
    answer:
      'Most teams are live within a day. Our guided onboarding and one-click integrations handle the heavy lifting.',
  },
  {
    id: 'q2',
    question: 'Do you offer a free plan?',
    answer: 'Yes. Our Starter plan is free forever for up to three users and five active workflows.',
  },
  {
    id: 'q3',
    question: 'Is my data secure?',
    answer:
      'We are SOC 2 Type II compliant, encrypt data at rest and in transit, and support SSO and granular role-based access.',
  },
  {
    id: 'q4',
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. Plans are month-to-month with no long-term contracts required.',
  },
];
