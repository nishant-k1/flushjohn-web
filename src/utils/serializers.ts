/**
 * Data Formatting Utilities - Client Side
 *
 * Formats data before sending to API for consistency.
 * Backend also formats as defensive check before saving to DB.
 */

/**
 * Format phone number to E.164 format
 *
 * @param phone - Phone number in any format
 * @returns E.164 format (+1XXXXXXXXXX) or null if invalid
 */
export const formatPhoneNumber = (
  phone: string | null | undefined
): string | null => {
  if (!phone) return null;

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Validate: must have 10 digits, or 11 digits starting with 1
  if (digits.length === 10) {
    // US number without country code: add +1
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith("1")) {
    // US number with country code 1
    return `+${digits}`;
  }

  // Invalid phone number
  return null;
};

/**
 * Normalize email to lowercase
 *
 * @param email - Email address
 * @returns Normalized email in lowercase
 */
export const normalizeEmail = (
  email: string | null | undefined
): string | null => {
  if (!email) return null;
  return email.trim().toLowerCase();
};

/**
 * Normalize ZIP code to 5-digit format
 *
 * @param zip - ZIP code in any format
 * @returns 5-digit ZIP or null if invalid
 */
export const normalizeZipCode = (
  zip: string | null | undefined
): string | null => {
  if (!zip) return null;

  // Remove all non-digit characters
  const digits = zip.replace(/\D/g, "");

  // Validate: must have at least 5 digits
  if (digits.length >= 5) {
    // Return first 5 digits
    return digits.slice(0, 5);
  }

  // Invalid ZIP code
  return null;
};

/**
 * Normalize state abbreviation to uppercase
 *
 * @param state - State name or abbreviation
 * @returns Normalized state
 */
export const normalizeState = (state: string | null | undefined): string => {
  if (!state) return "";
  const trimmed = state.trim();
  if (!trimmed) return "";

  // If 2 characters, assume it's abbreviation and uppercase it
  if (trimmed.length === 2) {
    return trimmed.toUpperCase();
  }

  // Otherwise, return as titlecase
  return trimmed
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Normalize text field (trim)
 *
 * @param text - Text to normalize
 * @returns Trimmed text
 */
export const normalizeText = (text: string | null | undefined): string => {
  if (!text) return "";
  return text.trim();
};

/**
 * Normalize usage type
 *
 * @param usageType - Usage type string
 * @returns Normalized usage type
 */
export const normalizeUsageType = (
  usageType: string | null | undefined
): string => {
  if (!usageType) return "";
  const trimmed = usageType.trim();
  if (!trimmed) return "";

  // Capitalize first letter, lowercase the rest
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

/**
 * Normalize date to ISO 8601 format
 *
 * @param date - Date in any format
 * @returns ISO 8601 string at start of day or null if invalid
 */
export const normalizeDate = (
  date: string | Date | null | undefined
): string | null => {
  if (!date) return null;

  try {
    const dateObj = new Date(date);

    // Check if valid date
    if (isNaN(dateObj.getTime())) {
      return null;
    }

    // Set to start of day UTC
    dateObj.setUTCHours(0, 0, 0, 0);

    return dateObj.toISOString();
  } catch {
    return null;
  }
};

/**
 * Parse date from API format to Date object for form inputs
 *
 * Converts API format (ISO 8601 string) to Date object for date pickers.
 * react-datepicker requires Date objects, not ISO strings.
 *
 * @param date - Date from API (ISO 8601 string) or Date object
 * @returns Date object or null if invalid
 *
 * @example
 * parseDateForInput("2024-01-15T00:00:00.000Z") // Returns: Date object
 * parseDateForInput(null) // Returns: null
 */
export const parseDateForInput = (
  date: string | Date | null | undefined
): Date | null => {
  if (!date) return null;

  // If already a Date object, return it
  if (date instanceof Date) {
    // Check if valid
    return isNaN(date.getTime()) ? null : date;
  }

  // Try to parse ISO string or any date string
  try {
    const dateObj = new Date(date);

    // Check if valid date
    if (isNaN(dateObj.getTime())) {
      return null;
    }

    return dateObj;
  } catch {
    return null;
  }
};

/**
 * Normalize long text fields
 *
 * @param text - Text to normalize
 * @param maxLength - Maximum length
 * @returns Normalized text
 */
export const normalizeLongText = (
  text: string | null | undefined,
  maxLength: number = 5000
): string => {
  if (!text) return "";

  const trimmed = text.trim();

  // Truncate if too long
  if (trimmed.length > maxLength) {
    return trimmed.substring(0, maxLength);
  }

  return trimmed;
};

/**
 * Format contact data (all fields)
 * This is the main function to use before sending data to API
 *
 * @param data - Object containing contact information
 * @returns Object with formatted contact data
 */

export const formatContactData = (data: any): any => {
  const formatted: any = { ...data };

  // Format phone fields
  if (data.phone) {
    formatted.phone = formatPhoneNumber(data.phone);
  }
  if (data.contactPersonPhone) {
    formatted.contactPersonPhone = formatPhoneNumber(
      data.contactPersonPhone
    );
  }
  if (data.fax) {
    formatted.fax = formatPhoneNumber(data.fax);
  }

  // Format email
  if (data.email) {
    formatted.email = normalizeEmail(data.email);
  }

  // Format ZIP code
  if (data.zip) {
    formatted.zip = normalizeZipCode(data.zip);
  }

  // Format state
  if (data.state) {
    formatted.state = normalizeState(data.state);
  }

  // Format text fields
  if (data.fName !== undefined) {
    formatted.fName = normalizeText(data.fName);
  }
  if (data.lName !== undefined) {
    formatted.lName = normalizeText(data.lName);
  }
  if (data.cName !== undefined) {
    formatted.cName = normalizeText(data.cName);
  }
  if (data.contactPersonName !== undefined) {
    formatted.contactPersonName = normalizeText(data.contactPersonName);
  }
  if (data.streetAddress !== undefined) {
    formatted.streetAddress = normalizeText(data.streetAddress);
  }
  if (data.street !== undefined) {
    formatted.street = normalizeText(data.street);
  }
  if (data.city !== undefined) {
    formatted.city = normalizeText(data.city);
  }
  if (data.instructions !== undefined) {
    formatted.instructions = normalizeLongText(data.instructions);
  }

  // Format usage type
  if (data.usageType) {
    formatted.usageType = normalizeUsageType(data.usageType);
  }

  // Format dates
  if (data.deliveryDate) {
    formatted.deliveryDate = normalizeDate(data.deliveryDate);
  }
  if (data.pickupDate) {
    formatted.pickupDate = normalizeDate(data.pickupDate);
  }

  // Format products array - convert quantity, rate, and amount to numbers
  if (data.products && Array.isArray(data.products)) {
    formatted.products = data.products.map((product: any) => {
      const formattedProduct: any = { ...product };
      
      // Convert quantity to number (handle string inputs from form fields)
      if (product.quantity !== undefined && product.quantity !== null) {
        const quantityNum = Number(product.quantity);
        formattedProduct.quantity = isNaN(quantityNum) ? 0 : quantityNum;
      }
      
      // Convert rate to number
      if (product.rate !== undefined && product.rate !== null) {
        const rateNum = Number(product.rate);
        formattedProduct.rate = isNaN(rateNum) ? 0 : rateNum;
      }
      
      // Convert amount to number
      if (product.amount !== undefined && product.amount !== null) {
        const amountNum = Number(product.amount);
        formattedProduct.amount = isNaN(amountNum) ? 0 : amountNum;
      }
      
      return formattedProduct;
    });
  }

  return formatted;
};
