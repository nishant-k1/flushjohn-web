import { MetadataRoute } from "next";
import { websiteURL } from "@/constants";
import { getCitiesForSitemap } from "@/features/locations/constants";

const targetCities = getCitiesForSitemap();

const productSlugs = [
  {
    slug: "standard-porta-potty",
    name: "Standard Porta Potty",
    description:
      "Basic portable toilet rental for events and construction sites",
  },
  {
    slug: "deluxe-porta-potty",
    name: "Deluxe Flushing Porta Potty",
    description: "Upgraded porta potty with flushing toilet and sink",
  },
  {
    slug: "ada-compliant-porta-potty",
    name: "ADA Compliant Porta Potty",
    description: "Wheelchair accessible portable toilet meeting ADA standards",
  },
  {
    slug: "luxury-restroom-trailer",
    name: "Luxury Restroom Trailer",
    description: "Premium multi-stall restroom trailer with air conditioning",
  },
  {
    slug: "hand-wash-station",
    name: "Portable Hand Wash Station",
    description: "Standalone hand washing station with soap and towels",
  },
  {
    slug: "construction-porta-potty",
    name: "Construction Porta Potty",
    description:
      "Rugged portable toilet for construction site long-term rental",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  const corePages = [
    {
      url: websiteURL,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${websiteURL}/porta-potty-rental`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${websiteURL}/service-areas`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${websiteURL}/faq`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${websiteURL}/quote`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${websiteURL}/rental-products`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${websiteURL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${websiteURL}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${websiteURL}/gallery`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    },
    {
      url: `${websiteURL}/api/business-info`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  const majorCities = [
    "houston",
    "dallas",
    "los-angeles",
    "chicago",
    "miami",
    "atlanta",
  ];
  const cityPages = targetCities.map((city) => ({
    url: `${websiteURL}/porta-potty-rental/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: majorCities.includes(city.slug) ? 0.9 : 0.8,
  }));

  const statePages = [
    { slug: "texas", priority: 0.75 },
    { slug: "florida", priority: 0.75 },
    { slug: "california", priority: 0.75 },
    { slug: "georgia", priority: 0.7 },
    { slug: "illinois", priority: 0.7 },
    { slug: "delaware", priority: 0.7 },
  ].map((state) => ({
    url: `${websiteURL}/service-areas/${state.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: state.priority,
  }));

  const productPages = productSlugs.map((product) => ({
    url: `${websiteURL}/rental-products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPages = [
    {
      slug: "porta-potty-rental-guide",
      title: "Complete Porta Potty Rental Guide 2025",
      priority: 0.7,
    },
    {
      slug: "event-sanitation-best-practices",
      title: "Event Sanitation Best Practices",
      priority: 0.65,
    },
    {
      slug: "construction-site-sanitation-requirements",
      title: "OSHA Construction Site Sanitation Requirements",
      priority: 0.7,
    },
    {
      slug: "wedding-porta-potty-solutions",
      title: "Luxury Porta Potty Solutions for Weddings",
      priority: 0.65,
    },
    {
      slug: "festival-bathroom-planning",
      title: "Festival Bathroom Planning Guide",
      priority: 0.65,
    },
    {
      slug: "how-many-porta-potties-needed",
      title: "Porta Potty Calculator - How Many Do You Need?",
      priority: 0.7,
    },
    {
      slug: "ada-compliant-porta-potty-requirements",
      title: "ADA Compliant Porta Potty Requirements",
      priority: 0.7,
    },
    {
      slug: "porta-potty-rental-cost-breakdown",
      title: "Porta Potty Rental Cost Breakdown 2025",
      priority: 0.75,
    },
  ].map((blog) => ({
    url: `${websiteURL}/blog/${blog.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: blog.priority,
  }));

  // Service-specific city pages (construction, events, weddings)
  const services = ["construction", "events", "weddings"];
  const serviceCityPages = targetCities
    .filter((city) => majorCities.includes(city.slug))
    .flatMap((city) =>
      services.map((service) => ({
        url: `${websiteURL}/porta-potty-rental/${city.slug}/${service}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );

  return [...corePages, ...statePages, ...cityPages, ...productPages, ...blogPages, ...serviceCityPages];
}
