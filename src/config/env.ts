/**
 * Centralized Environment Variables Configuration
 *
 * All environment variables should be accessed through this file for consistency.
 * This ensures type safety and makes it easier to manage environment variables.
 *
 * Validates all required environment variables at startup - throws error if missing.
 */

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Please set it in your .env file.`
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
