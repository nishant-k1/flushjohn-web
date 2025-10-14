/**
 * Display Formatting Utilities - Enterprise Form Data Pipeline
 * Step 11: Convert to strings for display ONLY
 */

/**
 * Format currency for display
 * Convert number to formatted string
 */
export function formatCurrency(
  amount: number, 
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number for display
 */
export function formatNumber(
  value: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

/**
 * Format date for display
 * Convert Date object to formatted string
 */
export function formatDate(
  date: Date,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(date);
}

/**
 * Format date for input fields (YYYY-MM-DD)
 * Convert Date object to string for HTML input
 */
export function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format boolean for display
 */
export function formatBoolean(value: boolean, labels: { true: string; false: string } = { true: 'Yes', false: 'No' }): string {
  return value ? labels.true : labels.false;
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // Return original if not standard US format
  return phone;
}

/**
 * Format product summary for display
 */
export function formatProductSummary(product: {
  item: string;
  qty: number;
  rate: number;
  amount: number;
}): string {
  return `${product.item} (Qty: ${product.qty}) - ${formatCurrency(product.rate)} = ${formatCurrency(product.amount)}`;
}

/**
 * Format product list for display
 */
export function formatProductList(products: Array<{
  item: string;
  qty: number;
  rate: number;
  amount: number;
}>): string {
  return products
    .map((product, index) => `${index + 1}. ${formatProductSummary(product)}`)
    .join('\n');
}

/**
 * Format total amount for display
 */
export function formatTotalAmount(products: Array<{ amount: number }>): string {
  const total = products.reduce((sum, product) => sum + product.amount, 0);
  return formatCurrency(total);
}

/**
 * Format form input value for HTML inputs
 * Convert proper types back to strings for form inputs
 */
export function formatInputValue(value: any, inputType: string): string {
  switch (inputType) {
    case 'number':
      return value?.toString() || '';
    case 'date':
      return value instanceof Date ? formatDateForInput(value) : '';
    case 'email':
      return String(value || '').toLowerCase();
    case 'tel':
      return String(value || '');
    default:
      return String(value || '');
  }
}

/**
 * Format checkbox value for HTML inputs
 * Booleans are OK for checked attribute, but convert to string for value
 */
export function formatCheckboxValue(value: boolean): string {
  return value ? 'true' : 'false';
}
