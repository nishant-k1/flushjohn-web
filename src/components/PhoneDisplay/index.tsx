/**
 * PhoneDisplay Component
 * 
 * Displays phone numbers in formatted style: (713) 555-1234
 * Input: E.164 format from database (+17135551234)
 * Output: Formatted display (713) 555-1234
 */

import { formatPhoneForDisplay } from '@/utils/phoneFormatter';

interface PhoneDisplayProps {
  phone: string | null | undefined;
  clickable?: boolean;
  className?: string;
}

const PhoneDisplay = ({ 
  phone, 
  clickable = false,
  className = ''
}: PhoneDisplayProps) => {
  if (!phone) {
    return <span className={className}>—</span>;
  }

  const formattedPhone = formatPhoneForDisplay(phone);

  if (clickable) {
    return (
      <a 
        href={`tel:${phone}`} 
        className={className}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {formattedPhone}
      </a>
    );
  }

  return <span className={className}>{formattedPhone}</span>;
};

export default PhoneDisplay;

