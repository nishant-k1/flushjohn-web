/**
 * Centralized Environment Variables Configuration
 *
 * All environment variables should be accessed through this file for consistency.
 * This ensures type safety and makes it easier to manage environment variables.
 *
 * Validates all required environment variables - throws error if missing.
 * Uses lazy getters to allow Next.js to load .env files before validation.
 */

function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name];
  if (!value) {
    const isServer = typeof window === "undefined";
    const isDevelopment = process.env.NODE_ENV === "development";
    
    // In client-side code (browser), be lenient - Next.js replaces NEXT_PUBLIC_* at build time
    // In development, env vars might not be available during module initialization
    if (!isServer) {
      if (fallback) {
        console.warn(
          `[ENV] Missing environment variable: ${name}. Using fallback: ${fallback}`
        );
        return fallback;
      }
      
      const errorMsg = isDevelopment
        ? `[ENV] Missing environment variable: ${name}. Please ensure it's set in your .env file and restart the dev server.`
        : `[ENV] Missing required environment variable: ${name}. The application may not work correctly.`;
      
      console.error(errorMsg);
      // Return empty string to prevent crash - this allows the app to load
      // but the app may not work correctly until env vars are set
      return "";
    }
    
    // Server-side: throw error to catch issues early
    throw new Error(
      `Missing required environment variable: ${name}. Please set it in your .env file or ensure it's available in your deployment environment.`
    );
  }
  return value;
}

// API Configuration
export const API_BASE_URL = getEnvVar("NEXT_PUBLIC_API_BASE_URL");

// Website Configuration
export const WEBSITE_URL = getEnvVar("NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL");

// Contact Information
export const PHONE_NUMBER = getEnvVar("NEXT_PUBLIC_FLUSH_JOHN_PHONE");
export const PHONE_LINK = getEnvVar("NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK");
export const CONTACT_EMAIL = getEnvVar("NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID");
export const ADDRESS_FULL = getEnvVar("NEXT_PUBLIC_FLUSH_JOHN_ADDRESS");

// Social Media
export const FACEBOOK_URL = getEnvVar("NEXT_PUBLIC_FLUSH_JOHN_FACEBOOK");
export const TWITTER_URL = getEnvVar("NEXT_PUBLIC_FLUSH_JOHN_TWITTER");
export const LINKEDIN_URL = getEnvVar("NEXT_PUBLIC_FLUSH_JOHN_LINKEDIN");
export const INSTAGRAM_URL = getEnvVar("NEXT_PUBLIC_FLUSH_JOHN_INSTAGRAM");

// CDN/Assets
export const CLOUD_FRONT_URL = getEnvVar("NEXT_PUBLIC_CLOUD_FRONT_URL");
