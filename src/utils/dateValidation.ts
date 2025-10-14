/**
 * Date Validation Utilities - Business Logic for Porta Potty Rental
 * Uses dayjs for robust date handling and validation
 */

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/**
 * Business rules for date validation
 */
export const BUSINESS_RULES = {
  MIN_ADVANCE_NOTICE_DAYS: 1, // Minimum 1 day advance notice
  MAX_RENTAL_DURATION_DAYS: 365, // Maximum 1 year rental
  BUSINESS_HOURS: {
    START: 8, // 8 AM
    END: 18,  // 6 PM
  },
};

/**
 * Validate delivery date for business rules
 */
export function validateDeliveryDate(date: string | Date): { isValid: boolean; error?: string } {
  const deliveryDate = dayjs(date);
  
  // Check if date is valid
  if (!deliveryDate.isValid()) {
    return { isValid: false, error: "Invalid date format" };
  }
  
  // Check if date is in the past
  if (deliveryDate.isBefore(dayjs(), 'day')) {
    return { isValid: false, error: "Delivery date cannot be in the past" };
  }
  
  // Check minimum advance notice
  const today = dayjs().startOf('day');
  const minDeliveryDate = today.add(BUSINESS_RULES.MIN_ADVANCE_NOTICE_DAYS, 'day');
  
  if (deliveryDate.isBefore(minDeliveryDate)) {
    return { 
      isValid: false, 
      error: `Delivery must be at least ${BUSINESS_RULES.MIN_ADVANCE_NOTICE_DAYS} day(s) in advance` 
    };
  }
  
  // Check if too far in the future (reasonable booking window)
  const maxDeliveryDate = today.add(6, 'months');
  if (deliveryDate.isAfter(maxDeliveryDate)) {
    return { 
      isValid: false, 
      error: "Delivery date cannot be more than 6 months in advance" 
    };
  }
  
  return { isValid: true };
}

/**
 * Validate pickup date against delivery date
 */
export function validatePickupDate(
  pickupDate: string | Date, 
  deliveryDate: string | Date
): { isValid: boolean; error?: string } {
  const pickup = dayjs(pickupDate);
  const delivery = dayjs(deliveryDate);
  
  // Check if pickup date is valid
  if (!pickup.isValid()) {
    return { isValid: false, error: "Invalid pickup date format" };
  }
  
  // Check if pickup is after delivery
  if (!pickup.isAfter(delivery, 'day')) {
    return { isValid: false, error: "Pickup date must be after delivery date" };
  }
  
  // Check maximum rental duration
  const duration = pickup.diff(delivery, 'day');
  if (duration > BUSINESS_RULES.MAX_RENTAL_DURATION_DAYS) {
    return { 
      isValid: false, 
      error: `Rental duration cannot exceed ${BUSINESS_RULES.MAX_RENTAL_DURATION_DAYS} days` 
    };
  }
  
  // Check minimum rental duration (at least 1 day)
  if (duration < 1) {
    return { isValid: false, error: "Minimum rental duration is 1 day" };
  }
  
  return { isValid: true };
}

/**
 * Calculate rental duration in days
 */
export function calculateRentalDuration(deliveryDate: string | Date, pickupDate: string | Date): number {
  const delivery = dayjs(deliveryDate);
  const pickup = dayjs(pickupDate);
  
  return pickup.diff(delivery, 'day') + 1; // +1 to include both delivery and pickup days
}

/**
 * Get available delivery dates (business days only)
 */
export function getAvailableDeliveryDates(startDate?: string | Date): string[] {
  const start = startDate ? dayjs(startDate) : dayjs().add(BUSINESS_RULES.MIN_ADVANCE_NOTICE_DAYS, 'day');
  const end = start.add(3, 'months'); // Show 3 months of availability
  const dates: string[] = [];
  
  let current = start;
  while (current.isBefore(end)) {
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (current.day() !== 0 && current.day() !== 6) {
      dates.push(current.format('YYYY-MM-DD'));
    }
    current = current.add(1, 'day');
  }
  
  return dates;
}

/**
 * Format date for business display
 */
export function formatBusinessDate(date: string | Date): string {
  return dayjs(date).format('dddd, MMMM Do, YYYY');
}

/**
 * Get next business day
 */
export function getNextBusinessDay(date?: string | Date): dayjs.Dayjs {
  let current = date ? dayjs(date).add(1, 'day') : dayjs().add(1, 'day');
  
  // Skip weekends
  while (current.day() === 0 || current.day() === 6) {
    current = current.add(1, 'day');
  }
  
  return current;
}

/**
 * Check if date is a business day
 */
export function isBusinessDay(date: string | Date): boolean {
  const day = dayjs(date).day();
  return day !== 0 && day !== 6; // Not Sunday (0) or Saturday (6)
}

/**
 * Get rental pricing based on duration
 */
export function getRentalPricing(duration: number): { 
  baseRate: number; 
  discountPercentage: number; 
  totalDiscount: number 
} {
  let discountPercentage = 0;
  
  // Volume discounts for longer rentals
  if (duration >= 30) {
    discountPercentage = 15; // 15% off for monthly rentals
  } else if (duration >= 14) {
    discountPercentage = 10; // 10% off for bi-weekly rentals
  } else if (duration >= 7) {
    discountPercentage = 5; // 5% off for weekly rentals
  }
  
  // Base rate (this would come from your pricing system)
  const baseRate = 125.00; // Example base rate
  
  return {
    baseRate,
    discountPercentage,
    totalDiscount: (baseRate * discountPercentage) / 100,
  };
}
