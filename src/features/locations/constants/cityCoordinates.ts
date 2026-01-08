/**
 * City Coordinates - Single source of truth for city geographic coordinates
 * Used for geo-targeting meta tags and location-based features
 *
 * Last Updated: 2025
 */

export interface CityCoordinates {
  lat: string;
  lng: string;
}

export const cityCoordinates: Record<string, CityCoordinates> = {
  dover: { lat: "39.1615", lng: "-75.5268" },
  houston: { lat: "29.7604", lng: "-95.3698" },
  dallas: { lat: "32.7767", lng: "-96.7970" },
  austin: { lat: "30.2672", lng: "-97.7431" },
  "san-antonio": { lat: "29.4241", lng: "-98.4936" },
  "fort-worth": { lat: "32.7555", lng: "-97.3308" },
  miami: { lat: "25.7617", lng: "-80.1918" },
  orlando: { lat: "28.5383", lng: "-81.3792" },
  tampa: { lat: "27.9506", lng: "-82.4572" },
  jacksonville: { lat: "30.3322", lng: "-81.6557" },
  "fort-lauderdale": { lat: "26.1224", lng: "-80.1373" },
  "los-angeles": { lat: "34.0522", lng: "-118.2437" },
  "san-diego": { lat: "32.7157", lng: "-117.1611" },
  sacramento: { lat: "38.5816", lng: "-121.4944" },
  "san-jose": { lat: "37.3382", lng: "-121.8863" },
  fresno: { lat: "36.7378", lng: "-119.7871" },
  atlanta: { lat: "33.7490", lng: "-84.3880" },
  savannah: { lat: "32.0835", lng: "-81.0998" },
  augusta: { lat: "33.4735", lng: "-82.0105" },
  macon: { lat: "32.8407", lng: "-83.6324" },
  columbus: { lat: "32.4610", lng: "-84.9877" },
  chicago: { lat: "41.8781", lng: "-87.6298" },
  springfield: { lat: "39.7817", lng: "-89.6501" },
  peoria: { lat: "40.6936", lng: "-89.5890" },
  rockford: { lat: "42.2711", lng: "-89.0940" },
  naperville: { lat: "41.7508", lng: "-88.1535" },
};

/**
 * Get city coordinates
 * @param cityName - City slug/name (e.g., "houston", "san-antonio")
 * @returns Coordinates object with lat/lng or null if not found
 */
export const getCityCoordinates = (
  cityName: string | null
): CityCoordinates | null => {
  if (!cityName) return null;
  const normalizedCity = cityName.toLowerCase().trim();
  return cityCoordinates[normalizedCity] || null;
};

/**
 * Get city coordinates with fallback to US center
 * @param cityName - City slug/name (e.g., "houston", "san-antonio")
 * @returns Coordinates object with lat/lng or default US center
 */
export const getCityCoordinatesWithFallback = (
  cityName: string | null
): CityCoordinates => {
  const coords = getCityCoordinates(cityName);
  return coords || { lat: "39.8283", lng: "-98.5795" }; // Default: US center
};
