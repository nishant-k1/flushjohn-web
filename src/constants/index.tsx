// Cross-Cutting Constants
// These are shared across multiple features and should remain centralized

export const G_TAG_ID: string = process.env.NEXT_PUBLIC_G_TAG_ID as string;

export type apiBaseUrlsType = {
  CRM_BASE_URL: string;
  API_BASE_URL: string;
};

export const apiBaseUrls: apiBaseUrlsType = {
  CRM_BASE_URL: process.env.NEXT_PUBLIC_CRM_BASE_URL as string,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
};

export type phoneType = {
  phone_link: string;
  phone_number: string;
};

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
  street: "1234 Main Street",
  city: "Houston",
  state: "TX",
  zip: "77001",
  country: "United States",
  full_address: "1234 Main Street, Houston, TX 77001, United States",
};

export const contact: contactType = {
  email: "info@flushjohn.com",
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

export const s3assets: string = process.env
  .NEXT_PUBLIC_CLOUD_FRONT_URL as string;

export const websiteURL: string = process.env.NEXT_PUBLIC_WEBSITE_URL as string;

// NOTE: Feature-specific constants have been moved to their respective features:
// - home_data, testimonials → /features/home/constants
// - products_data → /features/products/constants
// - cityPageData → /features/locations/constants
