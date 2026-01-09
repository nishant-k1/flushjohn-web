/**
 * Email Content Sanitization Utility
 * 
 * Sanitizes user input before including in email templates
 * to prevent XSS vulnerabilities
 */

/**
 * Escape HTML entities to prevent XSS in email templates
 * @param text - Text to escape
 * @returns Escaped text safe for HTML email templates
 */
export function escapeHtml(text: string | undefined | null): string {
  if (!text) return "";
  
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  
  return String(text).replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Sanitize text for plain text email templates
 * Removes newlines and special characters that could cause issues
 * @param text - Text to sanitize
 * @returns Sanitized text safe for plain text emails
 */
export function sanitizePlainText(text: string | undefined | null): string {
  if (!text) return "";
  
  return String(text)
    .replace(/\r\n/g, " ") // Replace Windows line breaks
    .replace(/\n/g, " ") // Replace Unix line breaks
    .replace(/\r/g, " ") // Replace Mac line breaks
    .replace(/\t/g, " ") // Replace tabs
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim()
    .substring(0, 10000); // Limit length to prevent email size issues
}

/**
 * Sanitize object properties for email templates
 * Escapes HTML entities for all string values
 * @param data - Object with potentially unsafe string values
 * @returns Object with sanitized string values
 */
export function sanitizeEmailData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      sanitized[key] = "";
    } else if (typeof value === "string") {
      sanitized[key] = escapeHtml(value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      sanitized[key] = value;
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? escapeHtml(item) : item
      );
    } else if (typeof value === "object") {
      sanitized[key] = sanitizeEmailData(value);
    } else {
      sanitized[key] = String(value);
    }
  }
  
  return sanitized;
}
