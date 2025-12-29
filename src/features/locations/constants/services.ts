/**
 * Services Constants - Single source of truth for service types
 * Used across sitemap, page generation, and routing
 * 
 * Last Updated: 2025
 */

export const SERVICES = ["construction", "events", "weddings"] as const;

export type ServiceType = typeof SERVICES[number];

export interface ServiceData {
  title: string;
  description: string;
  productLink: string;
  features: string[];
}

export const servicesData: Record<ServiceType, ServiceData> = {
  construction: {
    title: "Construction Site Porta Potty Rentals",
    description: "Professional porta potty rentals for construction sites",
    productLink: "/rental-products/standard-porta-potty",
    features: [
      "OSHA-compliant units",
      "Long-term rental options",
      "Regular maintenance & servicing",
      "Durable construction-grade units",
    ],
  },
  events: {
    title: "Event Porta Potty Rentals",
    description: "Portable toilet rentals for festivals, concerts, and large gatherings",
    productLink: "/rental-products/deluxe-porta-potty",
    features: [
      "High-capacity units",
      "Fast setup & delivery",
      "Event-grade sanitation",
      "Multiple unit options",
    ],
  },
  weddings: {
    title: "Wedding Porta Potty Rentals",
    description: "Elegant portable restroom solutions for weddings",
    productLink: "/rental-products/luxury-restroom-trailer",
    features: [
      "Luxury restroom trailers",
      "Elegant interior design",
      "Climate-controlled units",
      "Premium amenities",
    ],
  },
};

