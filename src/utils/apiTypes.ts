/**
 * API Types - Enterprise Form Data Pipeline
 * Step 4: API Request Payload with proper types
 */

import dayjs from "dayjs";

export interface ProductRequest {
  id: string;
  item: string;
  desc: string;
  quantity: number; // Proper number type
  rate: number; // Proper number type
  amount: number; // Proper number type
}

export interface LeadFormRequest {
  usageType: string;
  products: ProductRequest[];
  deliveryDate: string; // YYYY-MM-DD
  pickupDate: string; // YYYY-MM-DD
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
      quantity: Number(product.quantity), // Ensure number type
      rate: Number(product.rate), // Ensure number type
      amount: Number(product.amount), // Ensure number type
    })),
    deliveryDate: dayjs(formData.deliveryDate).format("YYYY-MM-DD"),
    pickupDate: dayjs(formData.pickupDate).format("YYYY-MM-DD"),
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
    deliveryDate: dayjs(data.deliveryDate, "YYYY-MM-DD").toDate(),
    pickupDate: dayjs(data.pickupDate, "YYYY-MM-DD").toDate(),
    createdAt: dayjs(data.createdAt).toDate(),
    updatedAt: dayjs(data.updatedAt).toDate(),
    products: data.products.map((product) => ({
      ...product,
      quantity: Number(product.quantity),
      rate: Number(product.rate),
      amount: Number(product.amount),
    })),
  };
}
