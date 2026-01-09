/**
 * Validate and get environment variable
 * Throws error in development if missing, provides fallback in production
 */
function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && fallback) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Environment variable ${key} is not set. Using fallback: ${fallback}`);
    }
    return fallback;
  }
  if (!value && process.env.NODE_ENV === "development") {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value || fallback || "";
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

export const phone: phoneType = {
  phone_link: getEnvVar("NEXT_PUBLIC_PHONE_URL", ""),
  phone_number: getEnvVar("NEXT_PUBLIC_PHONE_NUMBER", ""),
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

export const s3assets: string = getEnvVar("NEXT_PUBLIC_CLOUD_FRONT_URL", "");

export const websiteURL: string = getEnvVar("NEXT_PUBLIC_WEBSITE_URL", "");

// Theme exports
export { theme, type Theme, type ThemeColors, type ThemeSpacing } from "./theme";
