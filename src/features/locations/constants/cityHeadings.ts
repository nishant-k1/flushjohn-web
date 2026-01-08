/**
 * City Page Headings - Alternating between synonyms for SEO
 *
 * Some cities use "Porta Potty Rental" and others use "Portable Restroom Rental"
 * This natural variation helps capture broader search volume without keyword stuffing
 *
 * Last Updated: 2025
 */

export type HeadingVariant = "porta-potty" | "portable-restroom" | "porta-john";

/**
 * Get heading variant for a city (alternates between synonyms)
 * Uses city index to create natural distribution
 */
export function getCityHeadingVariant(citySlug: string): HeadingVariant {
  // Use city slug hash to determine variant (consistent per city)
  const cityIndex = citySlug
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variants: HeadingVariant[] = [
    "porta-potty",
    "portable-restroom",
    "porta-john",
  ];
  return variants[cityIndex % variants.length];
}

/**
 * Get H1 heading text for a city page
 */
export function getCityH1Heading(
  cityName: string,
  variant?: HeadingVariant
): string {
  const v =
    variant ||
    getCityHeadingVariant(cityName.toLowerCase().replace(/\s+/g, "-"));

  const headings = {
    "porta-potty": `Porta Potty Rental in ${cityName} | Fast, Affordable & Clean | FlushJohn`,
    "portable-restroom": `Portable Restroom Rental in ${cityName} | Fast, Affordable & Clean | FlushJohn`,
    "porta-john": `Porta John Rental in ${cityName} | Fast, Affordable & Clean | FlushJohn`,
  };

  return headings[v];
}

/**
 * Get H2 heading variations for city pages
 */
export function getCityH2Heading(
  cityName: string,
  section: "why-choose" | "services" | "pricing",
  variant?: HeadingVariant
): string {
  const v =
    variant ||
    getCityHeadingVariant(cityName.toLowerCase().replace(/\s+/g, "-"));

  const headings = {
    "why-choose": {
      "porta-potty": `Why Choose FlushJohn for Porta Potty Rentals in ${cityName}?`,
      "portable-restroom": `Why Choose FlushJohn for Portable Restroom Rentals in ${cityName}?`,
      "porta-john": `Why Choose FlushJohn for Porta John Rentals in ${cityName}?`,
    },
    services: {
      "porta-potty": `Our Portable Toilet Rental Services in ${cityName}`,
      "portable-restroom": `Our Portable Restroom Rental Services in ${cityName}`,
      "porta-john": `Our Porta Potty Rental Services in ${cityName}`,
    },
    pricing: {
      "porta-potty": `How Much Does a Porta Potty Rental Cost in ${cityName}?`,
      "portable-restroom": `How Much Does a Portable Restroom Rental Cost in ${cityName}?`,
      "porta-john": `How Much Does a Porta John Rental Cost in ${cityName}?`,
    },
  };

  return headings[section][v];
}
