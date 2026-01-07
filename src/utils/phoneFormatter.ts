/**
 * Phone Number Display Formatter
 * 
 * Formats E.164 phone numbers for display in UI
 * Storage: +17135551234
 * Display: (713) 555-1234
 */

/**
 * Format E.164 phone number for display
 * 
 * @param phone - Phone number in E.164 format (+1XXXXXXXXXX) or any format
 * @returns Formatted phone number (XXX) XXX-XXXX
 */
export const formatPhoneForDisplay = (phone: string | null | undefined): string => {
  if (!phone) return '';

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Handle US numbers (10 digits or 11 digits with country code 1)
  if (digits.length === 10) {
    // Format: (XXX) XXX-XXXX
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    // Remove country code and format
    const withoutCountryCode = digits.slice(1);
    return `(${withoutCountryCode.slice(0, 3)}) ${withoutCountryCode.slice(3, 6)}-${withoutCountryCode.slice(6)}`;
  }

  // If format is unexpected, return as-is
  return phone;
};

/**
 * Format phone number for display with country code
 * 
 * @param phone - Phone number in E.164 format
 * @returns Formatted phone number +1 (XXX) XXX-XXXX
 */
export const formatPhoneForDisplayWithCountryCode = (phone: string | null | undefined): string => {
  if (!phone) return '';

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Handle US numbers (10 digits or 11 digits with country code 1)
  if (digits.length === 10) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    const withoutCountryCode = digits.slice(1);
    return `+1 (${withoutCountryCode.slice(0, 3)}) ${withoutCountryCode.slice(3, 6)}-${withoutCountryCode.slice(6)}`;
  }

  // If format is unexpected, return as-is
  return phone;
};

/**
 * Parse phone number from display format to E.164
 * 
 * @param phone - Phone number in any format
 * @returns E.164 format +1XXXXXXXXXX
 */
export const parsePhoneToE164 = (phone: string | null | undefined): string | null => {
  if (!phone) return null;

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Validate: must have 10 digits, or 11 digits starting with 1
  if (digits.length === 10) {
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  // Invalid phone number
  return null;
};

