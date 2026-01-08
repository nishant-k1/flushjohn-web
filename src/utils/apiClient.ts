/**
 * Centralized API Client with Automatic Serialization/Deserialization
 * 
 * Wraps fetch API with interceptors-like functionality
 * Automatically serializes requests and deserializes responses
 * 
 * Single Source of Truth: Uses utils/dataTransformers.ts
 */

import { serializeDataForApi, deserializeDataFromApi } from "./dataTransformers";

/**
 * API Client Configuration
 */
interface ApiClientConfig extends RequestInit {
  url: string;
  data?: any;
  serialize?: boolean; // Default: true
  deserialize?: boolean; // Default: true
}

/**
 * Centralized fetch wrapper with automatic serialization/deserialization
 * 
 * @example
 * const response = await apiClient({
 *   url: '/api/leads',
 *   method: 'POST',
 *   data: { fName: 'John', phone: '(713) 555-1234' }
 * });
 */
export const apiClient = async <T = any>(
  config: ApiClientConfig
): Promise<T> => {
  const {
    url,
    data,
    serialize = true,
    deserialize = true,
    headers = {},
    ...fetchOptions
  } = config;

  // Serialize request data (if enabled)
  let serializedData = data;
  if (serialize && data) {
    serializedData = serializeDataForApi(url, data);
  }

  // Prepare fetch options
  const fetchConfig: RequestInit = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Add body if data is provided
  if (serializedData && (fetchConfig.method === "POST" || 
                         fetchConfig.method === "PUT" || 
                         fetchConfig.method === "PATCH")) {
    fetchConfig.body = JSON.stringify(serializedData);
  }

  // Make the request
  const response = await fetch(url, fetchConfig);

  // Handle errors
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  // Parse response
  const responseData = await response.json().catch(() => null);

  // Deserialize response data (if enabled)
  if (deserialize && responseData) {
    // Handle paginated responses
    if (responseData.data && typeof responseData.data === "object") {
      return {
        ...responseData,
        data: deserializeDataFromApi(url, responseData.data),
      } as T;
    }

    // Handle direct data responses
    return deserializeDataFromApi(url, responseData) as T;
  }

  return responseData as T;
};

/**
 * Convenience methods for common HTTP methods
 */
export const api = {
  get: <T = any>(url: string, config?: Omit<ApiClientConfig, "url" | "method" | "data">): Promise<T> =>
    apiClient<T>({ ...config, url, method: "GET" }),

  post: <T = any>(url: string, data?: any, config?: Omit<ApiClientConfig, "url" | "method" | "data">): Promise<T> =>
    apiClient<T>({ ...config, url, method: "POST", data }),

  put: <T = any>(url: string, data?: any, config?: Omit<ApiClientConfig, "url" | "method" | "data">): Promise<T> =>
    apiClient<T>({ ...config, url, method: "PUT", data }),

  patch: <T = any>(url: string, data?: any, config?: Omit<ApiClientConfig, "url" | "method" | "data">): Promise<T> =>
    apiClient<T>({ ...config, url, method: "PATCH", data }),

  delete: <T = any>(url: string, config?: Omit<ApiClientConfig, "url" | "method" | "data">): Promise<T> =>
    apiClient<T>({ ...config, url, method: "DELETE" }),
};

