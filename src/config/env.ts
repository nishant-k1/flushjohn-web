/**
 * Centralized Environment Variables Configuration
 *
 * All environment variables should be accessed through this file for consistency.
 * This ensures type safety and makes it easier to manage environment variables.
 *
 * IMPORTANT: These are direct references to process.env, not function calls.
 * Next.js replaces process.env.NEXT_PUBLIC_* at build time with actual values.
 * The || "" prevents undefined errors and provides empty string fallback.
 */

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Website Configuration
export const WEBSITE_URL = process.env.NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL || "";

// Contact Information
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE || "";
export const PHONE_LINK = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK || "";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID || "";
export const ADDRESS_FULL = process.env.NEXT_PUBLIC_FLUSH_JOHN_ADDRESS || "";

// Social Media
export const FACEBOOK_URL = process.env.NEXT_PUBLIC_FLUSH_JOHN_FACEBOOK || "";
export const TWITTER_URL = process.env.NEXT_PUBLIC_FLUSH_JOHN_TWITTER || "";
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_FLUSH_JOHN_LINKEDIN || "";
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_FLUSH_JOHN_INSTAGRAM || "";

// CDN/Assets
export const CLOUD_FRONT_URL = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL || "";

// Validation - only runs when accessed, not at module initialization
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // Check all required env vars on first client-side access
  const requiredVars = {
    API_BASE_URL,
    WEBSITE_URL,
    PHONE_NUMBER,
    PHONE_LINK,
    CONTACT_EMAIL,
    ADDRESS_FULL,
    FACEBOOK_URL,
    TWITTER_URL,
    LINKEDIN_URL,
    INSTAGRAM_URL,
    CLOUD_FRONT_URL,
  };

  const missing = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error(
      `[ENV] Missing environment variables: ${missing.join(", ")}. Please check your .env file.`
    );
  }
}
