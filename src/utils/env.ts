/**
 * Environment utilities for Next.js
 * Provides type-safe environment variable access
 */

/**
 * Check if running in development mode
 * Works in both server-side and client-side code
 */
export const isDevelopment = (): boolean => {
  if (typeof window === "undefined") {
    // Server-side: process.env.NODE_ENV is always available
    return process.env.NODE_ENV === "development";
  } else {
    // Client-side: Next.js replaces process.env.NODE_ENV at build time
    // For Next.js 13+, we can also check for development mode
    return (
      process.env.NODE_ENV === "development" ||
      (process.env.NEXT_PUBLIC_ENV === "development" as any)
    );
  }
};

/**
 * Check if running in production mode
 */
export const isProduction = (): boolean => {
  return !isDevelopment();
};
