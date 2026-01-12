# Google Ads Environment Variables

All Google Ads account IDs and conversion labels are now configured via environment variables instead of hardcoded values.

## Required Environment Variables

Add these to your `.env.local` (for local development) and your deployment platform (Vercel, etc.):

```bash
# Google Ads Base Account ID (for gtag script)
NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID=AW-11248564671

# Google Ads Conversion Label Suffixes (only the part after the slash)
# The full conversion label is constructed as: {ACCOUNT_ID}/{SUFFIX}
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_PAGE_FORM_SUFFIX=EhUQCLz8kKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUICK_QUOTE_FORM_SUFFIX=6KpkCNjzpaoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_MODAL_QUICK_QUOTE_FORM_SUFFIX=tcj2CLn8kKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX=kLt0CLzekKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FLOATING_PHONE_BUTTON_SUFFIX=OTFxCOSso6oaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CONTACT_FORM_SUFFIX=DkPVCMr71-EbEL_z3fMp

# Google Ads Conversion Values (expected profit per lead in USD)
# Based on 5% conversion rate: $50 profit per booking / 20 leads = $2.50 per lead
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY=USD
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_QUOTE_PAGE_FORM=3.0
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_HERO_QUICK_QUOTE_FORM=2.5
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_MODAL_QUICK_QUOTE_FORM=2.5
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_CONTACT_FORM=2.0
```

## Conversion Label Usage

| Environment Variable | Used In | Conversion Type |
|---------------------|---------|----------------|
| `NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID` | `layout.tsx` | Base Google Ads script (account ID) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_PAGE_FORM_SUFFIX` | Quote page (/quote) form submission | Form Submission (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUICK_QUOTE_FORM_SUFFIX` | Hero Quick Quote form | Form Submission (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_MODAL_QUICK_QUOTE_FORM_SUFFIX` | Modal Quick Quote form (triggered by Quick Quote button) | Form Submission (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX` | Phone links across entire site (Navbar, Contact Bar, Sticky CTA, Phone Bar, Hero, CTA Section) | Phone Call (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FLOATING_PHONE_BUTTON_SUFFIX` | Floating phone button (Quick Quote overlay) | Phone Call (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CONTACT_FORM_SUFFIX` | Contact form submission (`/contact` page) | Form Submission (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY` | All conversion events | Currency code (e.g., "USD") |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_QUOTE_PAGE_FORM` | Quote page form conversion value | Expected profit per lead (number) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_HERO_QUICK_QUOTE_FORM` | Hero quick quote form conversion value | Expected profit per lead (number) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_MODAL_QUICK_QUOTE_FORM` | Modal quick quote form conversion value | Expected profit per lead (number) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_CONTACT_FORM` | Contact form conversion value | Expected profit per lead (number) |

## Important Notes

1. **Conversion Label Format**: Only store the suffix (the part after the slash). The full conversion label is automatically constructed as `{ACCOUNT_ID}/{SUFFIX}` in the code.

2. **Example**: 
   - Account ID: `AW-11248564671` (from `NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID`)
   - Suffix: `EhUQCLz8kKoaEL_z3fMp` (from `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_PAGE_FORM_SUFFIX`)
   - Full label: `AW-11248564671/EhUQCLz8kKoaEL_z3fMp` (constructed automatically)

3. **Conversion Values**: These represent the expected profit per lead based on your conversion rate. Currently set to:
   - Quote Page Form: $3.00 (higher intent)
   - Hero Quick Quote: $2.50 (standard)
   - Modal Quick Quote: $2.50 (standard)
   - Contact Form: $2.00 (lower intent)
   
   These values are calculated as: `(Profit per booking × Conversion rate)`. Adjust based on your actual conversion rates.

4. **Currency**: All conversion values use the same currency specified in `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY` (default: "USD").

5. **Fallback Behavior**: If environment variables are not set, the application will throw an error at build time (fail-fast approach).

## Files Updated

All Google Ads IDs have been moved from hardcoded values to environment variables in:

- ✅ `src/config/env.ts` - Added environment variable exports
- ✅ `src/app/layout.tsx` - Base Google Ads script
- ✅ `src/features/quote/components/Quote/QuoteStep3/index.tsx`
- ✅ `src/features/home/components/HeroQuickQuote/index.tsx`
- ✅ `src/features/quote/components/QuickQuote/index.tsx`
- ✅ `src/components/HeroQuickQuote/index.tsx`
- ✅ `src/components/CombinedContactBar/index.tsx`
- ✅ `src/components/Navbar/index.tsx`
- ✅ `src/components/StickyCTA/index.tsx`
- ✅ `src/components/PhoneNumberBar/index.tsx`
- ✅ `src/features/home/components/Hero/index.tsx`
- ✅ `src/features/home/components/CTAsection/index.tsx`
- ✅ `src/features/quote/components/QuickQuote/QuickQuoteButton/index.tsx`

## Verification

After setting environment variables, verify:
1. Google Ads script loads in browser DevTools → Network tab
2. Conversion events fire when forms are submitted or phone links are clicked
3. Check browser Console for any errors
4. Verify conversions appear in Google Ads dashboard
