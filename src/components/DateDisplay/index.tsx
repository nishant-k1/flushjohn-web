/**
 * DateDisplay Component
 *
 * Displays dates in formatted style
 * Input: ISO 8601 format from database ("2026-01-07T00:00:00.000Z")
 * Output: Formatted display ("January 7, 2026" or "01/07/2026")
 */

import {
  formatDateForDisplay,
  formatDateShort,
  formatDateMedium,
} from "@/utils/dateFormatter";

interface DateDisplayProps {
  date: string | null | undefined;
  format?: "long" | "short" | "medium";
  className?: string;
}

const DateDisplay = ({
  date,
  format = "medium",
  className = "",
}: DateDisplayProps) => {
  if (!date) {
    return <span className={className}>—</span>;
  }

  let formattedDate: string;

  switch (format) {
    case "long":
      formattedDate = formatDateForDisplay(date);
      break;
    case "short":
      formattedDate = formatDateShort(date);
      break;
    case "medium":
    default:
      formattedDate = formatDateMedium(date);
      break;
  }

  if (!formattedDate) {
    return <span className={className}>—</span>;
  }

  return <span className={className}>{formattedDate}</span>;
};

export default DateDisplay;
