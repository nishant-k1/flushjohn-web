import { MetadataRoute } from "next";
import { websiteURL, apiBaseUrls } from "@/constants";
import { getCitiesForSitemap, statesData, SERVICES } from "@/features/locations/constants";
import { products_data } from "@/features/products/constants";
import { generateProductSlug } from "@/utils/slug";

const targetCities = getCitiesForSitemap();

// Fetch all published blog posts from API
async function getAllPublishedBlogs() {
  try {
    const { API_BASE_URL } = apiBaseUrls;
    // Fetch all published blogs (use high limit to get all)
    const res = await fetch(
      `${API_BASE_URL}/blogs?page=1&limit=1000&status=published&sortBy=createdAt&sortOrder=desc`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (res.ok) {
      const result = await res.json();
      if (result.success && result.data) {
        return result.data.map((blog: any) => ({
          slug: blog.slug || blog._id,
          lastModified: blog.updatedAt || blog.createdAt || new Date().toISOString(),
          priority: 0.7,
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }
  
  // Fallback to empty array if fetch fails
  return [];
}

// Generate product slugs dynamically from actual products data
// This ensures sitemap always matches what's actually available

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();
  
  // Fetch all published blog posts dynamically
  const publishedBlogs = await getAllPublishedBlogs();

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

  // Derive state pages dynamically from statesData
  const statePages = Object.keys(statesData).map((stateSlug) => {
    const state = statesData[stateSlug as keyof typeof statesData];
    // Set priority based on number of cities (more cities = higher priority)
    const cityCount = state.cities.length;
    const priority = cityCount >= 5 ? 0.75 : cityCount >= 3 ? 0.7 : 0.65;
    
    return {
      url: `${websiteURL}/service-areas/${stateSlug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority,
    };
  });

  // Generate product pages dynamically from actual products data
  const productPages = products_data.product_list.map((product) => {
    const slug = generateProductSlug(product.title);
    return {
      url: `${websiteURL}/rental-products/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    };
  });

  // Use dynamically fetched blog posts instead of hardcoded list
  const blogPages = publishedBlogs.map((blog: { slug: string; lastModified: string; priority: number }) => ({
    url: `${websiteURL}/blog/${blog.slug}`,
    lastModified: blog.lastModified,
    changeFrequency: "weekly" as const, // Blog posts change more frequently
    priority: blog.priority,
  }));

  // Service-specific city pages (construction, events, weddings)
  // Use SERVICES constant to ensure consistency
  const serviceCityPages = targetCities
    .filter((city) => majorCities.includes(city.slug))
    .flatMap((city) =>
      SERVICES.map((service) => ({
        url: `${websiteURL}/porta-potty-rental/${city.slug}/${service}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );

  return [...corePages, ...statePages, ...cityPages, ...productPages, ...blogPages, ...serviceCityPages];
}
