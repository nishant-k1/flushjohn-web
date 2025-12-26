/**
 * Cities Data - Single source of truth for all city information
 * Used across sitemap, pages, API routes, and components
 * 
 * Last Updated: 2025
 */

export interface CityData {
  name: string;           // slug: "houston", "san-antonio"
  displayName: string;    // "Houston", "San Antonio"
  state: string;          // "TX", "FL", etc.
  population: string;     // "2.3M", "1.3M"
}

/**
 * Complete list of all cities served (25 cities)
 * Business location (Dover, DE) must be first for local SEO
 */
export const citiesData: CityData[] = [
  // Business location - Dover, DE (CRITICAL - must be first for local SEO)
  { name: "dover", displayName: "Dover", state: "DE", population: "39K" },
  
  // Texas
  { name: "houston", displayName: "Houston", state: "TX", population: "2.3M" },
  { name: "dallas", displayName: "Dallas", state: "TX", population: "1.3M" },
  { name: "austin", displayName: "Austin", state: "TX", population: "965K" },
  { name: "san-antonio", displayName: "San Antonio", state: "TX", population: "1.5M" },
  { name: "fort-worth", displayName: "Fort Worth", state: "TX", population: "918K" },
  
  // Florida
  { name: "miami", displayName: "Miami", state: "FL", population: "467K" },
  { name: "orlando", displayName: "Orlando", state: "FL", population: "307K" },
  { name: "tampa", displayName: "Tampa", state: "FL", population: "399K" },
  { name: "jacksonville", displayName: "Jacksonville", state: "FL", population: "950K" },
  { name: "fort-lauderdale", displayName: "Fort Lauderdale", state: "FL", population: "182K" },
  
  // California
  { name: "los-angeles", displayName: "Los Angeles", state: "CA", population: "4.0M" },
  { name: "san-diego", displayName: "San Diego", state: "CA", population: "1.4M" },
  { name: "sacramento", displayName: "Sacramento", state: "CA", population: "525K" },
  { name: "san-jose", displayName: "San Jose", state: "CA", population: "1.0M" },
  { name: "fresno", displayName: "Fresno", state: "CA", population: "542K" },
  
  // Georgia
  { name: "atlanta", displayName: "Atlanta", state: "GA", population: "498K" },
  { name: "savannah", displayName: "Savannah", state: "GA", population: "147K" },
  { name: "augusta", displayName: "Augusta", state: "GA", population: "202K" },
  { name: "macon", displayName: "Macon", state: "GA", population: "153K" },
  { name: "columbus", displayName: "Columbus", state: "GA", population: "206K" },
  
  // Illinois
  { name: "chicago", displayName: "Chicago", state: "IL", population: "2.7M" },
  { name: "springfield", displayName: "Springfield", state: "IL", population: "114K" },
  { name: "peoria", displayName: "Peoria", state: "IL", population: "113K" },
  { name: "rockford", displayName: "Rockford", state: "IL", population: "148K" },
  { name: "naperville", displayName: "Naperville", state: "IL", population: "149K" },
];

/**
 * Get city by slug/name
 */
export const getCityBySlug = (slug: string): CityData | undefined => {
  return citiesData.find(city => city.name === slug.toLowerCase());
};

/**
 * Get cities by state
 */
export const getCitiesByState = (stateAbbr: string): CityData[] => {
  return citiesData.filter(city => city.state.toUpperCase() === stateAbbr.toUpperCase());
};

/**
 * Get all cities as array of objects with slug (for sitemap)
 */
export const getCitiesForSitemap = () => {
  return citiesData.map(city => ({
    slug: city.name,
    state: city.state.toLowerCase(),
    displayName: `${city.displayName}, ${getStateDisplayName(city.state)}`,
    population: city.population,
  }));
};

/**
 * Helper to get state display name from abbreviation
 */
const getStateDisplayName = (stateAbbr: string): string => {
  const stateNames: Record<string, string> = {
    TX: "Texas",
    FL: "Florida",
    CA: "California",
    GA: "Georgia",
    IL: "Illinois",
    DE: "Delaware",
  };
  return stateNames[stateAbbr.toUpperCase()] || stateAbbr;
};

