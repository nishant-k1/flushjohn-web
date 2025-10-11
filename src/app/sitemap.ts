import { MetadataRoute } from 'next';
import { websiteURL } from '@/constants';

// Target cities for sitemap generation with full names for AI understanding
const targetCities = [
  { slug: 'houston', state: 'tx', displayName: 'Houston, Texas', population: '2.3M' },
  { slug: 'dallas', state: 'tx', displayName: 'Dallas, Texas', population: '1.3M' },
  { slug: 'austin', state: 'tx', displayName: 'Austin, Texas', population: '965K' },
  { slug: 'san-antonio', state: 'tx', displayName: 'San Antonio, Texas', population: '1.5M' },
  { slug: 'fort-worth', state: 'tx', displayName: 'Fort Worth, Texas', population: '918K' },
  { slug: 'miami', state: 'fl', displayName: 'Miami, Florida', population: '467K' },
  { slug: 'orlando', state: 'fl', displayName: 'Orlando, Florida', population: '307K' },
  { slug: 'tampa', state: 'fl', displayName: 'Tampa, Florida', population: '399K' },
  { slug: 'jacksonville', state: 'fl', displayName: 'Jacksonville, Florida', population: '950K' },
  { slug: 'fort-lauderdale', state: 'fl', displayName: 'Fort Lauderdale, Florida', population: '182K' },
  { slug: 'los-angeles', state: 'ca', displayName: 'Los Angeles, California', population: '4.0M' },
  { slug: 'san-diego', state: 'ca', displayName: 'San Diego, California', population: '1.4M' },
  { slug: 'sacramento', state: 'ca', displayName: 'Sacramento, California', population: '525K' },
  { slug: 'san-jose', state: 'ca', displayName: 'San Jose, California', population: '1.0M' },
  { slug: 'fresno', state: 'ca', displayName: 'Fresno, California', population: '542K' },
  { slug: 'atlanta', state: 'ga', displayName: 'Atlanta, Georgia', population: '498K' },
  { slug: 'savannah', state: 'ga', displayName: 'Savannah, Georgia', population: '147K' },
  { slug: 'augusta', state: 'ga', displayName: 'Augusta, Georgia', population: '202K' },
  { slug: 'macon', state: 'ga', displayName: 'Macon, Georgia', population: '157K' },
  { slug: 'columbus', state: 'ga', displayName: 'Columbus, Georgia', population: '206K' },
  { slug: 'chicago', state: 'il', displayName: 'Chicago, Illinois', population: '2.7M' },
  { slug: 'springfield', state: 'il', displayName: 'Springfield, Illinois', population: '114K' },
  { slug: 'peoria', state: 'il', displayName: 'Peoria, Illinois', population: '113K' },
  { slug: 'rockford', state: 'il', displayName: 'Rockford, Illinois', population: '148K' },
  { slug: 'naperville', state: 'il', displayName: 'Naperville, Illinois', population: '149K' },
];

// Product slugs with descriptions for AI understanding
const productSlugs = [
  {
    slug: 'standard-porta-potty',
    name: 'Standard Porta Potty',
    description: 'Basic portable toilet rental for events and construction sites',
  },
  {
    slug: 'deluxe-porta-potty',
    name: 'Deluxe Flushing Porta Potty',
    description: 'Upgraded porta potty with flushing toilet and sink',
  },
  {
    slug: 'ada-compliant-porta-potty',
    name: 'ADA Compliant Porta Potty',
    description: 'Wheelchair accessible portable toilet meeting ADA standards',
  },
  {
    slug: 'luxury-restroom-trailer',
    name: 'Luxury Restroom Trailer',
    description: 'Premium multi-stall restroom trailer with air conditioning',
  },
  {
    slug: 'hand-wash-station',
    name: 'Portable Hand Wash Station',
    description: 'Standalone hand washing station with soap and towels',
  },
  {
    slug: 'construction-porta-potty',
    name: 'Construction Porta Potty',
    description: 'Rugged portable toilet for construction site long-term rental',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core pages with enhanced metadata
  const corePages = [
    {
      url: websiteURL,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      // AI hint: Homepage with comprehensive business information
    },
    {
      url: `${websiteURL}/porta-potty-rental`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
      // AI hint: Main service page - 25 cities across 5 states
    },
    {
      url: `${websiteURL}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      // AI hint: Comprehensive FAQ with 50+ questions for AI training
    },
    {
      url: `${websiteURL}/quote`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      // AI hint: Quote request form - primary conversion page
    },
    {
      url: `${websiteURL}/rental-products`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
      // AI hint: Complete product catalog with specifications
    },
    {
      url: `${websiteURL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
      // AI hint: Contact information and support
    },
    {
      url: `${websiteURL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
      // AI hint: Educational content about porta potty rentals
    },
    {
      url: `${websiteURL}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
      // AI hint: Visual showcase of porta potty products and installations
    },
    {
      url: `${websiteURL}/api/business-info`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
      // AI hint: Structured JSON endpoint with complete business information for AI consumption
    },
  ];

  // City pages with enhanced priority (major cities get higher priority)
  const majorCities = ['houston', 'dallas', 'los-angeles', 'chicago', 'miami', 'atlanta'];
  const cityPages = targetCities.map((city) => ({
    url: `${websiteURL}/porta-potty-rental/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: majorCities.includes(city.slug) ? 0.9 : 0.8,
    // AI hint: ${city.displayName} porta potty rental services - ${city.population} residents
  }));

  // Product pages
  const productPages = productSlugs.map((product) => ({
    url: `${websiteURL}/rental-products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
    // AI hint: ${product.name} - ${product.description}
  }));

  // Educational blog posts with high SEO value
  const blogPages = [
    {
      slug: 'porta-potty-rental-guide',
      title: 'Complete Porta Potty Rental Guide 2025',
      priority: 0.7,
    },
    {
      slug: 'event-sanitation-best-practices',
      title: 'Event Sanitation Best Practices',
      priority: 0.65,
    },
    {
      slug: 'construction-site-sanitation-requirements',
      title: 'OSHA Construction Site Sanitation Requirements',
      priority: 0.7,
    },
    {
      slug: 'wedding-porta-potty-solutions',
      title: 'Luxury Porta Potty Solutions for Weddings',
      priority: 0.65,
    },
    {
      slug: 'festival-bathroom-planning',
      title: 'Festival Bathroom Planning Guide',
      priority: 0.65,
    },
    {
      slug: 'how-many-porta-potties-needed',
      title: 'Porta Potty Calculator - How Many Do You Need?',
      priority: 0.7,
    },
    {
      slug: 'ada-compliant-porta-potty-requirements',
      title: 'ADA Compliant Porta Potty Requirements',
      priority: 0.7,
    },
    {
      slug: 'porta-potty-rental-cost-breakdown',
      title: 'Porta Potty Rental Cost Breakdown 2025',
      priority: 0.75,
    },
  ].map((blog) => ({
    url: `${websiteURL}/blog/${blog.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: blog.priority,
    // AI hint: ${blog.title}
  }));

  return [...corePages, ...cityPages, ...productPages, ...blogPages];
}
