/**
 * API Types - Enterprise Form Data Pipeline
 * Step 4: API Request Payload with proper types
 */

import dayjs from 'dayjs';

export interface ProductRequest {
  id: string;
  item: string;
  desc: string;
  qty: number; // Proper number type
  rate: number; // Proper number type
  amount: number; // Proper number type
}

export interface LeadFormRequest {
  usageType: string;
  products: ProductRequest[];
  deliveryDate: string; // ISO 8601 string
  pickupDate: string; // ISO 8601 string
  zip: string;
  fName: string;
  lName: string;
  email: string;
  phone: string;
  leadSource: string;
}

export interface CustomerContactRequest {
  fName: string;
  lName: string;
  email: string;
  phone: string;
  cName?: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
}

/**
 * Convert application state to API request format
 * This is where we ensure proper types are sent to the backend
 */
export function prepareApiPayload(formData: any): LeadFormRequest {
  return {
    usageType: String(formData.usageType),
    products: formData.products.map((product: any) => ({
      id: String(product.id),
      item: String(product.item),
      desc: String(product.desc),
      qty: Number(product.qty), // Ensure number type
      rate: Number(product.rate), // Ensure number type
      amount: Number(product.amount), // Ensure number type
    })),
    deliveryDate: dayjs(formData.deliveryDate).toISOString(),
    pickupDate: dayjs(formData.pickupDate).toISOString(),
    zip: String(formData.zip),
    fName: String(formData.fName),
    lName: String(formData.lName),
    email: String(formData.email).trim().toLowerCase(),
    phone: String(formData.phone),
    leadSource: String(formData.leadSource || "Web Lead"),
  };
}

/**
 * Validate API response data
 * Step 9: API Response Payload validation
 */
export interface LeadResponse {
  id: string;
  leadNo: string;
  usageType: string;
  products: ProductRequest[];
  deliveryDate: string;
  pickupDate: string;
  zip: string;
  fName: string;
  lName: string;
  email: string;
  phone: string;
  leadSource: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Parse API response to client state
 * Convert ISO date strings back to Date objects
 */
export function parseApiResponse(data: LeadResponse): any {
  return {
    ...data,
    deliveryDate: dayjs(data.deliveryDate).toDate(),
    pickupDate: dayjs(data.pickupDate).toDate(),
    createdAt: dayjs(data.createdAt).toDate(),
    updatedAt: dayjs(data.updatedAt).toDate(),
    products: data.products.map((product) => ({
      ...product,
      qty: Number(product.qty),
      rate: Number(product.rate),
      amount: Number(product.amount),
    })),
  };
}
