# Google Ads Conversion Variables - Usage Mapping

This document shows exactly where each environment variable suffix is used in the codebase.

## Environment Variables → Code Exports → Usage Locations

### 1. `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_PAGE_FORM_SUFFIX`

**Exported as:** `GOOGLE_ADS_CONVERSION_QUOTE_FORM`

**Used in:**
- `src/features/quote/components/Quote/QuoteStep3/index.tsx`
  - **Location:** `/quote` page
  - **When:** Form submission (Step 3 - final step)
  - **Event Label:** Form submission on quote page

---

### 2. `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUICK_QUOTE_FORM_SUFFIX`

**Exported as:** `GOOGLE_ADS_CONVERSION_HERO_QUOTE`

**Used in:**
- `src/components/HeroQuickQuote/index.tsx`
  - **Location:** Hero section on homepage
  - **When:** Hero quick quote form submission
  - **Event Label:** Hero quick quote form
  - **Note:** Used via dynamic import in `src/features/home/components/Hero/index.tsx`

---

### 3. `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_MODAL_QUICK_QUOTE_FORM_SUFFIX`

**Exported as:** `GOOGLE_ADS_CONVERSION_QUICK_QUOTE`

**Used in:**
- `src/features/quote/components/QuickQuote/index.tsx`
  - **Location:** Modal quick quote form (triggered by "Quick Quote" button)
  - **When:** Modal quick quote form submission
  - **Event Label:** Modal quick quote form

---

### 4. `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX`

**Exported as:** `GOOGLE_ADS_CONVERSION_PHONE_CALL`

**Used in (7 locations):**
- `src/features/home/components/Hero/index.tsx`
  - **Location:** Hero section phone link
  - **Event Label:** "Hero Phone Link"
  
- `src/features/home/components/CTAsection/index.tsx`
  - **Location:** CTA section phone button
  - **Event Label:** "CTA Phone Link"
  
- `src/components/StickyCTA/index.tsx`
  - **Location:** Sticky CTA (2 places)
  - **Event Labels:** 
    - "Sticky CTA Quote" (quote button)
    - "Sticky CTA Phone" (phone button)
  
- `src/components/PhoneNumberBar/index.tsx`
  - **Location:** Phone number bar
  - **Event Label:** "Phone Bar Link"
  
- `src/components/Navbar/index.tsx`
  - **Location:** Navbar phone link
  - **Event Label:** "Navbar Phone Link"
  
- `src/components/CombinedContactBar/index.tsx`
  - **Location:** Combined contact bar phone link
  - **Event Label:** "Phone Bar Link"

---

### 5. `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FLOATING_PHONE_BUTTON_SUFFIX`

**Exported as:** `GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE`

**Used in:**
- `src/features/quote/components/QuickQuote/QuickQuoteButton/index.tsx`
  - **Location:** Floating phone button (in Quick Quote overlay/modal)
  - **When:** Phone link click in Quick Quote button component
  - **Event Label:** "Quick Phone Link"

---

### 6. `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CONTACT_FORM_SUFFIX`

**Exported as:** `GOOGLE_ADS_CONVERSION_CONTACT_FORM`

**Used in:**
- `src/features/contact/components/Contact/index.tsx`
  - **Location:** `/contact` page
  - **When:** Contact form submission
  - **Event Label:** Contact form submission
  - **Value:** 1.0 INR

---

## Summary Table

| Environment Variable | Code Export | Used In | Count |
|---------------------|-------------|---------|-------|
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_PAGE_FORM_SUFFIX` | `GOOGLE_ADS_CONVERSION_QUOTE_FORM` | Quote page form | 1 |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUICK_QUOTE_FORM_SUFFIX` | `GOOGLE_ADS_CONVERSION_HERO_QUOTE` | Hero quick quote form | 1 |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_MODAL_QUICK_QUOTE_FORM_SUFFIX` | `GOOGLE_ADS_CONVERSION_QUICK_QUOTE` | Modal quick quote form | 1 |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX` | `GOOGLE_ADS_CONVERSION_PHONE_CALL` | Multiple phone links | 7 |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FLOATING_PHONE_BUTTON_SUFFIX` | `GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE` | Floating phone button | 1 |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CONTACT_FORM_SUFFIX` | `GOOGLE_ADS_CONVERSION_CONTACT_FORM` | Contact form | 1 |

---

## Notes

- **Phone Call Conversions:** The `GOOGLE_ADS_CONVERSION_PHONE_CALL` (using `SITE_WIDE_PHONE_BUTTON_SUFFIX`) is used in 7 different locations for various phone links throughout the site.

- **Contact Form Conversion:** The contact form on `/contact` page fires a conversion with value 1.0 INR when submitted successfully.

- **Hero Quick Quote:** The component is located in `components/HeroQuickQuote/index.tsx` and is dynamically imported in the Hero component.

- **Overlay vs Floating:** The overlay quick quote form uses `OVERLAY_AND_FLOATING_QUICK_QUOTE_FORM_SUFFIX` for the form submission, while the floating phone button in that same overlay uses `FLOATING_PHONE_BUTTON_SUFFIX` for phone clicks.
