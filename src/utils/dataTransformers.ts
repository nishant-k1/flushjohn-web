/**
 * Data Transformers - Centralized Serialization/Deserialization
 *
 * Routes to correct serializer based on API endpoint
 * Single source of truth for data transformation
 */

import { formatContactData } from "./serializers";

/**
 * Format data for API requests
 * Automatically routes to correct formatter based on URL
 */
export const formatDataForApi = (url: string, data: any): any => {
  // Determine which routes need contact data formatting
  const needsContactFormatting =
    url.includes("/leads") ||
    url.includes("/customers") ||
    url.includes("/quotes") ||
    url.includes("/salesOrders") ||
    url.includes("/jobOrders") ||
    url.includes("/contact");

  if (needsContactFormatting) {
    return formatContactData(data);
  }

  // For other endpoints, return data as-is
  return data;
};
