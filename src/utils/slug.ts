/**
 * Utility functions for generating and normalizing slugs
 */

/**
 * Generates a URL-friendly slug from a product title
 * Handles hyphens, spaces, and special characters properly
 * 
 * @param title - The product title to convert to a slug
 * @returns A normalized slug string
 * 
 * @example
 * generateProductSlug("ADA-Compliant Portable Restroom")
 * // Returns: "ada-compliant-portable-restroom"
 */
export function generateProductSlug(title: string): string {
  if (!title) return "";
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Slug mapping for common URL variations to normalized product slugs
 * Maps user-friendly URLs to actual product title slugs
 */
export const productSlugMapping: Record<string, string> = {
  "ada-compliant-porta-potty": "ada-compliant-portable-restroom",
  "ada-compliant-portable-toilet": "ada-compliant-portable-restroom",
  "standard-porta-potty": "standard-portable-restroom",
  "deluxe-porta-potty": "flushable-restroom-sink-combo",
  "hand-wash-station": "hand-wash-stations",
  "construction-porta-potty": "standard-portable-restroom",
  "luxury-restroom-trailer": "flushable-restroom-sink-combo",
};

/**
 * Finds a product by slug, handling both direct matches and mapped variations
 * 
 * @param slug - The URL slug to search for
 * @param products - Array of products to search
 * @returns The matching product or undefined
 */
export function findProductBySlug<T extends { title: string }>(
  slug: string,
  products: T[]
): T | undefined {
  if (!slug || !products?.length) {
    return undefined;
  }

  // First, try direct mapping
  const mappedSlug = productSlugMapping[slug];
  const searchSlug = mappedSlug || slug;

  // Find product by matching slug
  let product = products.find((product) => {
    const formattedSlug = generateProductSlug(product.title);
    return formattedSlug === searchSlug;
  });

  // If not found, try case-insensitive partial matching as fallback
  if (!product) {
    const normalizedSearchSlug = searchSlug.toLowerCase();
    product = products.find((product) => {
      const formattedSlug = generateProductSlug(product.title);
      return formattedSlug.includes(normalizedSearchSlug) || 
             normalizedSearchSlug.includes(formattedSlug);
    });
  }

  return product;
}

