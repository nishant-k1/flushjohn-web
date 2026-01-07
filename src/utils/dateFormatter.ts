/**
 * Date Formatter Utilities
 * 
 * Formats ISO 8601 dates for display in UI
 * Storage: "2026-01-07T00:00:00.000Z"
 * Display: "January 7, 2026" or "01/07/2026"
 */

/**
 * Format ISO date for display (long format)
 * 
 * @param isoDate - ISO 8601 date string
 * @returns Formatted date string "January 7, 2026"
 */
export const formatDateForDisplay = (isoDate: string | null | undefined): string => {
  if (!isoDate) return '';

  try {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) return '';

    // Format: January 7, 2026
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Use UTC to match stored date
    });
  } catch {
    return '';
  }
};

/**
 * Format ISO date for display (short format)
 * 
 * @param isoDate - ISO 8601 date string
 * @returns Formatted date string "01/07/2026"
 */
export const formatDateShort = (isoDate: string | null | undefined): string => {
  if (!isoDate) return '';

  try {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) return '';

    // Format: 01/07/2026
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    });
  } catch {
    return '';
  }
};

/**
 * Format ISO date for display (medium format)
 * 
 * @param isoDate - ISO 8601 date string
 * @returns Formatted date string "Jan 7, 2026"
 */
export const formatDateMedium = (isoDate: string | null | undefined): string => {
  if (!isoDate) return '';

  try {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) return '';

    // Format: Jan 7, 2026
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    });
  } catch {
    return '';
  }
};

/**
 * Format ISO datetime for display (includes time)
 * 
 * @param isoDateTime - ISO 8601 datetime string
 * @returns Formatted datetime string "Jan 7, 2026 at 3:30 PM"
 */
export const formatDateTimeForDisplay = (isoDateTime: string | null | undefined): string => {
  if (!isoDateTime) return '';

  try {
    const date = new Date(isoDateTime);

    if (isNaN(date.getTime())) return '';

    // Format: Jan 7, 2026 at 3:30 PM
    const dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${dateStr} at ${timeStr}`;
  } catch {
    return '';
  }
};

/**
 * Format date range for display
 * 
 * @param startDate - ISO 8601 start date
 * @param endDate - ISO 8601 end date
 * @returns Formatted date range "Jan 7 - Jan 14, 2026"
 */
export const formatDateRange = (
  startDate: string | null | undefined,
  endDate: string | null | undefined
): string => {
  if (!startDate || !endDate) return '';

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';

    // Same day
    if (start.toDateString() === end.toDateString()) {
      return formatDateMedium(startDate);
    }

    // Same year
    if (start.getFullYear() === end.getFullYear()) {
      const startStr = start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      });
      const endStr = end.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
      });
      return `${startStr} - ${endStr}`;
    }

    // Different years
    return `${formatDateMedium(startDate)} - ${formatDateMedium(endDate)}`;
  } catch {
    return '';
  }
};

/**
 * Parse date to ISO 8601 format (for sending to server)
 * 
 * @param date - Date in any format
 * @returns ISO 8601 string or null if invalid
 */
export const parseDateToISO = (date: string | Date | null | undefined): string | null => {
  if (!date) return null;

  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return null;

    // Set to start of day UTC
    dateObj.setUTCHours(0, 0, 0, 0);

    return dateObj.toISOString();
  } catch {
    return null;
  }
};

