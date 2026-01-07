# Phone Number Formatting Guide - FlushJohn Web

## Overview

Phone numbers are now handled consistently across the application:
- **Storage (Database):** E.164 format `+17135551234`
- **Network (API):** E.164 format `+17135551234`
- **Display (UI):** Formatted `(713) 555-1234`

## Quick Reference

```typescript
import { formatPhoneForDisplay } from '@/utils/phoneFormatter';

// From database/API: +17135551234
const phone = lead.phone; // "+17135551234"

// Display in UI
const displayPhone = formatPhoneForDisplay(phone); // "(713) 555-1234"
```

## Usage Examples

### 1. Display Phone in Lists/Tables

```tsx
import { formatPhoneForDisplay } from '@/utils/phoneFormatter';

export const LeadsList = ({ leads }) => {
  return (
    <table>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.fName} {lead.lName}</td>
            <td>{formatPhoneForDisplay(lead.phone)}</td>
            <td>{lead.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

### 2. Display Phone in Detail View

```tsx
import { formatPhoneForDisplay } from '@/utils/phoneFormatter';

export const LeadDetail = ({ lead }) => {
  return (
    <div>
      <h2>{lead.fName} {lead.lName}</h2>
      <div>
        <label>Phone:</label>
        <span>{formatPhoneForDisplay(lead.phone)}</span>
      </div>
      <div>
        <label>Contact Person Phone:</label>
        <span>{formatPhoneForDisplay(lead.contactPersonPhone)}</span>
      </div>
    </div>
  );
};
```

### 3. Display Phone as Clickable Link

```tsx
import { formatPhoneForDisplay } from '@/utils/phoneFormatter';

export const PhoneLink = ({ phone }) => {
  if (!phone) return null;
  
  return (
    <a href={`tel:${phone}`}>
      {formatPhoneForDisplay(phone)}
    </a>
  );
};

// Usage
<PhoneLink phone={lead.phone} />
// Displays: (713) 555-1234
// Clicking calls: +17135551234
```

### 4. Input Phone in Forms (Already Implemented)

All forms now use `PhoneInput` component which:
- ✅ Accepts user input in any format
- ✅ Displays formatted as user types
- ✅ Sends E.164 to server automatically

```tsx
import PhoneInput from 'react-phone-number-input';

<PhoneInput
  defaultCountry="US"
  value={formData.phone}
  onChange={(value) => setFormData({ ...formData, phone: value })}
/>
```

### 5. Display with Country Code

```tsx
import { formatPhoneForDisplayWithCountryCode } from '@/utils/phoneFormatter';

const phone = "+17135551234";
const display = formatPhoneForDisplayWithCountryCode(phone);
// Returns: "+1 (713) 555-1234"
```

## Component Examples

### Reusable PhoneDisplay Component

```tsx
// src/components/PhoneDisplay.tsx
import { formatPhoneForDisplay } from '@/utils/phoneFormatter';

interface PhoneDisplayProps {
  phone: string | null | undefined;
  clickable?: boolean;
  showCountryCode?: boolean;
}

export const PhoneDisplay = ({ 
  phone, 
  clickable = false,
  showCountryCode = false 
}: PhoneDisplayProps) => {
  if (!phone) return <span>—</span>;

  const formattedPhone = showCountryCode 
    ? formatPhoneForDisplayWithCountryCode(phone)
    : formatPhoneForDisplay(phone);

  if (clickable) {
    return <a href={`tel:${phone}`}>{formattedPhone}</a>;
  }

  return <span>{formattedPhone}</span>;
};

// Usage
<PhoneDisplay phone={lead.phone} clickable />
<PhoneDisplay phone={lead.contactPersonPhone} />
```

### PhoneField Component (Already Available)

Use the existing phone field components:
- `<PhoneField />` - For quote forms
- `<MyPhoneTextField />` - For generic forms
- `<MyPhoneField />` - For contact form

All send E.164 format to the server automatically.

## Forms Reference

### Contact Form
**Location:** `src/features/contact/components/Contact/index.tsx`
- ✅ **Updated to send E.164 format**
- Uses `PhoneInput` component
- Input: User types any format
- Server receives: `+17135551234`

### Quote Forms
**Location:** `src/features/quote/`
- ✅ **Already sending E.164 format**
- Uses `PhoneInput` component
- Already implemented correctly

## API Communication

### Sending to Server

```typescript
// Form submits with E.164 format
const formData = {
  fName: "John",
  lName: "Doe",
  phone: "+17135551234", // E.164 format
  email: "john@example.com"
};

await fetch('/api/leads', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

### Receiving from Server

```typescript
// Server returns E.164 format
const response = await fetch('/api/leads/123');
const lead = await response.json();

console.log(lead.phone); // "+17135551234"

// Display in UI
const displayPhone = formatPhoneForDisplay(lead.phone);
console.log(displayPhone); // "(713) 555-1234"
```

## Best Practices

### ✅ DO

- Use `formatPhoneForDisplay()` for all phone number displays
- Keep phone numbers in E.164 format in your state/store
- Format only when rendering to the DOM
- Use `PhoneInput` component for all phone inputs

### ❌ DON'T

- Store formatted phone numbers in state
- Format phone numbers before sending to API
- Manually format phone numbers with string manipulation
- Use different input components for phone numbers

## Testing

### Test Display Formatting

```typescript
import { formatPhoneForDisplay } from '@/utils/phoneFormatter';

// Test cases
console.log(formatPhoneForDisplay("+17135551234")); 
// Expected: "(713) 555-1234"

console.log(formatPhoneForDisplay("+12125551234")); 
// Expected: "(212) 555-1234"

console.log(formatPhoneForDisplay("7135551234")); 
// Expected: "(713) 555-1234"
```

### Test Input (Manual)

1. Go to Contact form
2. Enter phone: `(713) 555-1234`
3. Submit form
4. Check network tab: Should send `+17135551234`
5. Check database: Should store `+17135551234`

## Migration Notes

- ✅ Contact form updated to send E.164
- ✅ Quote forms already sending E.164
- ✅ Server normalizes all formats to E.164
- ✅ Display utilities created

All new data will be in E.164 format. Existing data will be normalized on next update.

