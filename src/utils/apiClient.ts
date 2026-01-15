/**
 * Centralized API Client with Automatic Formatting
 *
 * Wraps fetch API with interceptors-like functionality
 * Automatically formats requests before sending to API
 *
 * Single Source of Truth: Uses utils/dataTransformers.ts
 */

import {
  formatDataForApi,
} from "./dataTransformers";

/**
 * API Client Configuration
 */
interface ApiClientConfig extends RequestInit {
  url: string;
  data?: any;
  serialize?: boolean; // Default: true (formatting enabled)
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
    headers = {},
    ...fetchOptions
  } = config;

  // Format request data (if enabled)
  let formattedData = data;
  if (serialize && data) {
    formattedData = formatDataForApi(url, data);
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
  if (
    formattedData &&
    (fetchConfig.method === "POST" ||
      fetchConfig.method === "PUT" ||
      fetchConfig.method === "PATCH")
  ) {
    fetchConfig.body = JSON.stringify(formattedData);
  }

  // Make the request
  const response = await fetch(url, fetchConfig);

  // Handle errors
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  // Parse response
  const responseData = await response.json().catch(() => null);

  // Response data is used as-is (no deserialization needed)
  // DateInput component handles date parsing directly when needed

  return responseData as T;
};

/**
 * Convenience methods for common HTTP methods
 */
export const api = {
  get: <T = any>(
    url: string,
    config?: Omit<ApiClientConfig, "url" | "method" | "data">
  ): Promise<T> => apiClient<T>({ ...config, url, method: "GET" }),

  post: <T = any>(
    url: string,
    data?: any,
    config?: Omit<ApiClientConfig, "url" | "method" | "data">
  ): Promise<T> => apiClient<T>({ ...config, url, method: "POST", data }),

  put: <T = any>(
    url: string,
    data?: any,
    config?: Omit<ApiClientConfig, "url" | "method" | "data">
  ): Promise<T> => apiClient<T>({ ...config, url, method: "PUT", data }),

  patch: <T = any>(
    url: string,
    data?: any,
    config?: Omit<ApiClientConfig, "url" | "method" | "data">
  ): Promise<T> => apiClient<T>({ ...config, url, method: "PATCH", data }),

  delete: <T = any>(
    url: string,
    config?: Omit<ApiClientConfig, "url" | "method" | "data">
  ): Promise<T> => apiClient<T>({ ...config, url, method: "DELETE" }),
};
