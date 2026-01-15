/**
 * Centralized API Client with Automatic Serialization/Deserialization
 *
 * Wraps fetch API with interceptors-like functionality
 * Automatically serializes requests and deserializes responses
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
 *   url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/leads`,
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
    let errorMessage = `HTTP ${response.status}`;
    let errorDetails: any = null;

    try {
      const errorData = await response.json();
      if (errorData && typeof errorData === "object") {
        errorMessage = errorData.message || errorData.error || errorMessage;
        if (errorData.details) {
          errorDetails = errorData.details;
        }
        // Include status text if available and message is generic
        if (response.statusText && (!errorData.message || errorData.message === errorMessage)) {
          errorMessage = `${errorMessage}: ${response.statusText}`;
        }
      } else if (typeof errorData === "string") {
        errorMessage = errorData || errorMessage;
      }
    } catch (parseError) {
      // Response is not JSON, try to get text
      try {
        const text = await response.text();
        if (text) {
          errorMessage = text.substring(0, 200); // Limit length
        }
      } catch (textError) {
        // Failed to read response body, use status text
        if (response.statusText) {
          errorMessage = `${errorMessage}: ${response.statusText}`;
        }
      }
    }

    // Create error object with more details
    const error = new Error(errorMessage) as Error & { status?: number; details?: any };
    error.status = response.status;
    if (errorDetails) {
      error.details = errorDetails;
    }
    throw error;
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
