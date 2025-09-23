import { MetadataRoute } from "next";
import { websiteURL } from "@/constants";

// Target cities for sitemap generation
const targetCities = [
  "houston-tx",
  "dallas-tx",
  "austin-tx",
  "san-antonio-tx",
  "fort-worth-tx",
  "miami-fl",
  "orlando-fl",
  "tampa-fl",
  "jacksonville-fl",
  "fort-lauderdale-fl",
  "los-angeles-ca",
  "san-diego-ca",
  "sacramento-ca",
  "san-jose-ca",
  "fresno-ca",
  "atlanta-ga",
  "savannah-ga",
  "augusta-ga",
  "macon-ga",
  "columbus-ga",
  "chicago-il",
  "springfield-il",
  "peoria-il",
  "rockford-il",
  "naperville-il",
];

// Product slugs for rental products
const productSlugs = [
  "standard-porta-potty",
  "deluxe-porta-potty",
  "ada-compliant-porta-potty",
  "luxury-restroom-trailer",
  "hand-wash-station",
  "construction-porta-potty",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core pages
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
      priority: 0.9,
    },
    {
      url: `${websiteURL}/rental-products`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${websiteURL}/quote`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${websiteURL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${websiteURL}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${websiteURL}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // City pages
  const cityPages = targetCities.map((city) => ({
    url: `${websiteURL}/porta-potty-rental/${city}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Product pages
  const productPages = productSlugs.map((slug) => ({
    url: `${websiteURL}/rental-products/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog posts - we'll add a few sample ones
  const blogPages = [
    "porta-potty-rental-guide",
    "event-sanitation-best-practices",
    "construction-site-sanitation-requirements",
    "wedding-porta-potty-solutions",
    "festival-bathroom-planning",
  ].map((slug) => ({
    url: `${websiteURL}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...corePages, ...cityPages, ...productPages, ...blogPages];
}
