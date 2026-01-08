/**
 * Data Transformers - Centralized Serialization/Deserialization
 *
 * Routes to correct serializer based on API endpoint
 * Single source of truth for data transformation
 */

import { serializeContactData } from "./serializers";

/**
 * Serialize data for API requests
 * Automatically routes to correct serializer based on URL
 */
export const serializeDataForApi = (url: string, data: any): any => {
  // Determine which routes need contact data serialization
  const needsContactSerialization =
    url.includes("/leads") ||
    url.includes("/customers") ||
    url.includes("/quotes") ||
    url.includes("/salesOrders") ||
    url.includes("/jobOrders") ||
    url.includes("/contact");

  if (needsContactSerialization) {
    return serializeContactData(data);
  }

  // For other endpoints, return data as-is
  return data;
};

/**
 * Deserialize data from API responses
 * Converts API format to form-ready format
 */
export const deserializeDataFromApi = (url: string, data: any): any => {
  if (!data || typeof data !== "object") {
    return data;
  }

  // Convert ISO date strings to Date objects
  const deserializeDates = (obj: any): any => {
    if (!obj || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(deserializeDates);
    }

    const result: any = { ...obj };

    // Convert date fields
    const dateFields = ["deliveryDate", "pickupDate", "createdAt", "updatedAt"];
    dateFields.forEach((field) => {
      if (result[field] && typeof result[field] === "string") {
        try {
          const date = new Date(result[field]);
          if (!isNaN(date.getTime())) {
            result[field] = date;
          }
        } catch {
          // Keep as string if conversion fails
        }
      }
    });

    // Recursively process nested objects
    Object.keys(result).forEach((key) => {
      if (
        result[key] &&
        typeof result[key] === "object" &&
        !(result[key] instanceof Date)
      ) {
        result[key] = deserializeDates(result[key]);
      }
    });

    return result;
  };

  return deserializeDates(data);
};
