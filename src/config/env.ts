/**
 * Centralized Environment Variables Configuration
 *
 * All environment variables should be accessed through this file for consistency.
 * This ensures type safety and makes it easier to manage environment variables.
 *
 * IMPORTANT: Next.js replaces process.env.NEXT_PUBLIC_* at build time with actual values.
 * Missing environment variables will throw errors to catch configuration issues early.
 */

/**
 * Helper function to get required environment variable
 * Throws error if variable is missing or empty
 */
function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${key}. Please check your .env file.`
    );
  }
  return value;
}

// API Configuration
export const API_BASE_URL = getRequiredEnv("NEXT_PUBLIC_API_BASE_URL");

// Website Configuration
export const WEBSITE_URL = getRequiredEnv("NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL");

// Contact Information
export const PHONE_NUMBER = getRequiredEnv("NEXT_PUBLIC_FLUSH_JOHN_PHONE");
export const PHONE_LINK = getRequiredEnv("NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK");
export const CONTACT_EMAIL = getRequiredEnv("NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID");
export const ADDRESS_FULL = getRequiredEnv("NEXT_PUBLIC_FLUSH_JOHN_ADDRESS");

// Social Media
export const FACEBOOK_URL = getRequiredEnv("NEXT_PUBLIC_FLUSH_JOHN_FACEBOOK");
export const TWITTER_URL = getRequiredEnv("NEXT_PUBLIC_FLUSH_JOHN_TWITTER");
export const LINKEDIN_URL = getRequiredEnv("NEXT_PUBLIC_FLUSH_JOHN_LINKEDIN");
export const INSTAGRAM_URL = getRequiredEnv("NEXT_PUBLIC_FLUSH_JOHN_INSTAGRAM");

// CDN/Assets
export const CLOUD_FRONT_URL = getRequiredEnv("NEXT_PUBLIC_CLOUD_FRONT_URL");

// Google Ads Configuration
export const GOOGLE_ADS_ACCOUNT_ID = getRequiredEnv("NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID");

// Google Ads Conversion Label Suffixes (without account ID prefix)
// These are combined with GOOGLE_ADS_ACCOUNT_ID to create full conversion labels
const GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX = getRequiredEnv("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX");
const GOOGLE_ADS_CONVERSION_HERO_QUOTE_SUFFIX = getRequiredEnv("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUOTE_SUFFIX");
const GOOGLE_ADS_CONVERSION_QUICK_QUOTE_SUFFIX = getRequiredEnv("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_SUFFIX");
const GOOGLE_ADS_CONVERSION_PHONE_CALL_SUFFIX = getRequiredEnv("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PHONE_CALL_SUFFIX");
const GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE_SUFFIX = getRequiredEnv("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE_SUFFIX");

// Full conversion labels (account ID + suffix)
export const GOOGLE_ADS_CONVERSION_QUOTE_FORM = `${GOOGLE_ADS_ACCOUNT_ID}/${GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX}`;
export const GOOGLE_ADS_CONVERSION_HERO_QUOTE = `${GOOGLE_ADS_ACCOUNT_ID}/${GOOGLE_ADS_CONVERSION_HERO_QUOTE_SUFFIX}`;
export const GOOGLE_ADS_CONVERSION_QUICK_QUOTE = `${GOOGLE_ADS_ACCOUNT_ID}/${GOOGLE_ADS_CONVERSION_QUICK_QUOTE_SUFFIX}`;
export const GOOGLE_ADS_CONVERSION_PHONE_CALL = `${GOOGLE_ADS_ACCOUNT_ID}/${GOOGLE_ADS_CONVERSION_PHONE_CALL_SUFFIX}`;
export const GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE = `${GOOGLE_ADS_ACCOUNT_ID}/${GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE_SUFFIX}`;
