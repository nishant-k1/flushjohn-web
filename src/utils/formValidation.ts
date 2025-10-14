/**
 * Form Validation Utilities - Enterprise Form Data Pipeline
 * Follows: Validate strings before parsing to proper types
 */

import * as z from 'zod';

// Step 1: String format validation (before parsing)
export const stringFormatSchemas = {
  // Number validation - check string format first
  quantity: z.string()
    .min(1, "Quantity is required")
    .regex(/^\d+$/, "Quantity must be a whole number")
    .refine(val => parseInt(val, 10) >= 1, "Quantity must be at least 1"),
  
  // Price validation - check decimal format
  price: z.string()
    .min(1, "Price is required")
    .regex(/^\d+\.?\d{0,2}$/, "Price must be a valid decimal (e.g., 125.50)")
    .refine(val => parseFloat(val) >= 0, "Price cannot be negative"),
  
  // Zip code validation
  zipCode: z.string()
    .min(1, "Zip code is required")
    .regex(/^\d{5}$/, "Zip code must be 5 digits"),
  
  // Phone validation
  phone: z.string()
    .min(1, "Phone is required")
    .regex(/^[\d\s\-\+\(\)]+$/, "Phone must contain only numbers and common separators")
    .refine(val => val.replace(/\D/g, '').length >= 10, "Phone must have at least 10 digits"),
  
  // Email validation
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  
  // Date validation
  date: z.string()
    .min(1, "Date is required")
    .refine(val => !isNaN(Date.parse(val)), "Invalid date format"),
};

// Step 2: Parsed type validation (after string validation passes)
export const parsedTypeSchemas = {
  // Product with proper types
  product: z.object({
    id: z.string(),
    item: z.string().min(1),
    desc: z.string(),
    qty: z.number().int().min(1, "Quantity must be at least 1"),
    rate: z.number().min(0, "Rate cannot be negative"),
    amount: z.number().min(0, "Amount cannot be negative"),
  }),
  
  // Lead form with proper types
  leadForm: z.object({
    usageType: z.string().min(1),
    products: z.array(z.object({
      id: z.string(),
      item: z.string().min(1),
      desc: z.string(),
      qty: z.number().int().min(0),
      rate: z.number().min(0),
      amount: z.number().min(0),
    })).min(1, "At least one product required"),
    deliveryDate: z.date(),
    pickupDate: z.date(),
    zip: z.string().regex(/^\d{5}$/),
    fName: z.string().min(2),
    lName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
  }),
};

/**
 * Parse form data from strings to proper types
 * Only call this AFTER string validation passes
 */
export function parseFormData(formData: Record<string, string>): Record<string, any> {
  const parsed: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(formData)) {
    // Handle different field types
    if (key.includes('qty') || key.includes('quantity')) {
      parsed[key] = parseInt(value, 10) || 0;
    } else if (key.includes('rate') || key.includes('price') || key.includes('amount')) {
      parsed[key] = parseFloat(value) || 0;
    } else if (key.includes('Date') || key.includes('date')) {
      parsed[key] = new Date(value);
    } else if (key === 'email') {
      parsed[key] = value.trim().toLowerCase();
    } else if (key === 'isActive' || key === 'is_active') {
      parsed[key] = value === 'true';
    } else {
      parsed[key] = value.trim();
    }
  }
  
  return parsed;
}

/**
 * Validate string format first, then parse to types
 */
export function validateAndParse<T>(
  data: Record<string, string>,
  stringSchema: z.ZodSchema,
  typeSchema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    // Step 1: Validate string formats
    const stringValidated = stringSchema.parse(data);
    
    // Step 2: Parse to proper types
    const parsedData = parseFormData(stringValidated);
    
    // Step 3: Validate parsed types
    const typeValidated = typeSchema.parse(parsedData);
    
    return { success: true, data: typeValidated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      };
    }
    return { success: false, errors: ['Unknown validation error'] };
  }
}
