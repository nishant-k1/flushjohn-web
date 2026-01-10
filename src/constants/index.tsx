/**
 * Validate and get environment variable
 * If fallback is provided (even empty string), use it when env var is missing
 * Only throws error if no fallback is provided and env var is missing
 */
function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  
  // If value exists, return it
  if (value) {
    return value;
  }
  
  // If fallback is explicitly provided (even if it's empty string), use it
  if (fallback !== undefined) {
    if (fallback !== "" && process.env.NODE_ENV === "development") {
      console.warn(`Environment variable ${key} is not set. Using fallback: ${fallback}`);
    }
    return fallback;
  }
  
  // No value and no fallback provided - throw error in development, return empty in production
  if (process.env.NODE_ENV === "development") {
    throw new Error(`Required environment variable ${key} is not set and no fallback provided`);
  }
  
  // In production, log error but return empty string as last resort
  console.error(`Environment variable ${key} is not set in production. This may cause issues.`);
  return "";
}

export const G_TAG_ID: string = getEnvVar("NEXT_PUBLIC_G_TAG_ID", "");

export type apiBaseUrlsType = {
  CRM_BASE_URL: string;
  API_BASE_URL: string;
};

export const apiBaseUrls: apiBaseUrlsType = {
  CRM_BASE_URL: getEnvVar("NEXT_PUBLIC_CRM_BASE_URL", ""),
  API_BASE_URL: getEnvVar("NEXT_PUBLIC_API_BASE_URL", ""),
};

export type phoneType = {
  phone_link: string;
  phone_number: string;
};

// Critical constants - use direct access like before to ensure they're always set
// These should never be empty strings, so we access them directly
export const phone: phoneType = {
  phone_link: process.env.NEXT_PUBLIC_PHONE_URL as string,
  phone_number: process.env.NEXT_PUBLIC_PHONE_NUMBER as string,
};

export type contactType = {
  email: string;
  support_email: string;
  sales_email: string;
};

export type addressType = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  full_address: string;
};

export const address: addressType = {
  street: "8 The Green STE R",
  city: "Dover",
  state: "DE",
  zip: "19901",
  country: "United States",
  full_address: "8 The Green STE R, Dover, DE 19901, United States",
};

export const contact: contactType = {
  email: "support@flushjohn.com", // Primary contact email
  support_email: "support@flushjohn.com",
  sales_email: "support@flushjohn.com",
};

export type socialMediaType = {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
};

export const socialMedia: socialMediaType = {
  facebook: "https://www.facebook.com/flushjohn",
  twitter: "https://www.twitter.com/flushjohn",
  linkedin: "https://www.linkedin.com/company/flushjohn",
  instagram: "https://www.instagram.com/flushjohn",
};

// Critical constant - use direct access like before to ensure it's always set
// This should never be empty string, so we access it directly
export const s3assets: string = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL as string;

export const websiteURL: string = getEnvVar("NEXT_PUBLIC_WEBSITE_URL", "");

// Theme exports
export { theme, type Theme, type ThemeColors, type ThemeSpacing } from "./theme";
