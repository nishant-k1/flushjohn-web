/**
 * State Center Coordinates - Single source of truth for state geographic centers
 * Used for geo-targeting meta tags and location-based features
 * 
 * Last Updated: 2025
 */

export interface StateCoordinates {
  lat: string;
  lng: string;
}

export const stateCoordinates: Record<string, StateCoordinates> = {
  TX: { lat: "31.9686", lng: "-99.9018" },
  FL: { lat: "27.7663", lng: "-81.6868" },
  CA: { lat: "36.7783", lng: "-119.4179" },
  GA: { lat: "32.1656", lng: "-82.9001" },
  IL: { lat: "40.3495", lng: "-88.9861" },
  DE: { lat: "39.3185", lng: "-75.5071" },
};

/**
 * Get state center coordinates
 * @param stateAbbr - State abbreviation (e.g., "TX", "FL")
 * @returns Coordinates object with lat/lng or default US center
 */
export const getStateCoordinates = (stateAbbr: string): StateCoordinates => {
  const abbr = stateAbbr?.toUpperCase();
  return stateCoordinates[abbr] || { lat: "39.8283", lng: "-98.5795" }; // Default: US center
};

