/**
 * Date Formatter Utilities
 *
 * Formats date strings for display in UI
 * Storage: "2026-01-07"
 * Display: "January 7, 2026" or "01/07/2026"
 */

/**
 * Format date for display (long format)
 *
 * @param isoDate - Date string
 * @returns Formatted date string "January 7, 2026"
 */
export const formatDateForDisplay = (
  isoDate: string | null | undefined
): string => {
  if (!isoDate) return "";

  try {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) return "";

    // Format: January 7, 2026
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/New_York", // US local timezone
    });
  } catch {
    return "";
  }
};

/**
 * Format date for display (short format)
 *
 * @param isoDate - Date string
 * @returns Formatted date string "01/07/2026"
 */
export const formatDateShort = (isoDate: string | null | undefined): string => {
  if (!isoDate) return "";

  try {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) return "";

    // Format: 01/07/2026
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/New_York",
    });
  } catch {
    return "";
  }
};

/**
 * Format date for display (medium format)
 *
 * @param isoDate - Date string
 * @returns Formatted date string "Jan 7, 2026"
 */
export const formatDateMedium = (
  isoDate: string | null | undefined
): string => {
  if (!isoDate) return "";

  try {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) return "";

    // Format: Jan 7, 2026
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "America/New_York",
    });
  } catch {
    return "";
  }
};

/**
 * Format datetime for display (includes time)
 *
 * @param isoDateTime - Datetime string
 * @returns Formatted datetime string "Jan 7, 2026 at 3:30 PM"
 */
export const formatDateTimeForDisplay = (
  isoDateTime: string | null | undefined
): string => {
  if (!isoDateTime) return "";

  try {
    const date = new Date(isoDateTime);

    if (isNaN(date.getTime())) return "";

    // Format: Jan 7, 2026 at 3:30 PM
    const dateStr = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "America/New_York",
    });

    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });

    return `${dateStr} at ${timeStr}`;
  } catch {
    return "";
  }
};

/**
 * Format date range for display
 *
 * @param startDate - Date string
 * @param endDate - Date string
 * @returns Formatted date range "Jan 7 - Jan 14, 2026"
 */
export const formatDateRange = (
  startDate: string | null | undefined,
  endDate: string | null | undefined
): string => {
  if (!startDate || !endDate) return "";

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

    // Same day
    if (start.toDateString() === end.toDateString()) {
      return formatDateMedium(startDate);
    }

    // Same year
    if (start.getFullYear() === end.getFullYear()) {
      const startStr = start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "America/New_York",
      });
      const endStr = end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "America/New_York",
      });
      return `${startStr} - ${endStr}`;
    }

    // Different years
    return `${formatDateMedium(startDate)} - ${formatDateMedium(endDate)}`;
  } catch {
    return "";
  }
};

/**
 * Parse date to YYYY-MM-DD format (for sending to server)
 *
 * @param date - Date in any format
 * @returns YYYY-MM-DD string or null if invalid
 */
export const parseDateToISO = (
  date: string | Date | null | undefined
): string | null => {
  if (!date) return null;

  try {
    if (typeof date === "string") {
      const trimmed = date.trim();
      if (!trimmed) return null;
      if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return trimmed;
      }
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return null;

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch {
    return null;
  }
};
