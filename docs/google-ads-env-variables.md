# Google Ads Environment Variables

All Google Ads account IDs and conversion labels are now configured via environment variables instead of hardcoded values.

## Required Environment Variables

Add these to your `.env.local` (for local development) and your deployment platform (Vercel, etc.):

```bash
# Google Ads Base Account ID (for gtag script)
NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID=AW-11248564671

# Google Ads Conversion Label Suffixes (only the part after the slash)
# The full conversion label is constructed as: {ACCOUNT_ID}/{SUFFIX}
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX=EhUQCLz8kKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUOTE_SUFFIX=6KpkCNjzpaoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_SUFFIX=tcj2CLn8kKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PHONE_CALL_SUFFIX=kLt0CLzekKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE_SUFFIX=OTFxCOSso6oaEL_z3fMp
```

## Conversion Label Usage

| Environment Variable | Used In | Conversion Type |
|---------------------|---------|----------------|
| `NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID` | `layout.tsx` | Base Google Ads script (account ID) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX` | Quote Step 3 form submission | Form Submission (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUOTE_SUFFIX` | Hero Quick Quote form | Form Submission (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_SUFFIX` | Quick Quote sidebar form | Form Submission (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PHONE_CALL_SUFFIX` | Phone links (Navbar, Contact Bar, Sticky CTA, Phone Bar, Hero, CTA Section) | Phone Call (suffix only) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE_SUFFIX` | Quick Quote Button phone link | Phone Call (suffix only) |

## Important Notes

1. **Conversion Label Format**: Only store the suffix (the part after the slash). The full conversion label is automatically constructed as `{ACCOUNT_ID}/{SUFFIX}` in the code.

2. **Example**: 
   - Account ID: `AW-11248564671` (from `NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID`)
   - Suffix: `EhUQCLz8kKoaEL_z3fMp` (from `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX`)
   - Full label: `AW-11248564671/EhUQCLz8kKoaEL_z3fMp` (constructed automatically)

4. **Fallback Behavior**: If environment variables are not set, conversion tracking will be skipped (no errors, but no tracking).

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
