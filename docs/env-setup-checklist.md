# Environment Variables Setup Checklist

## ⚠️ Required Variables

Your `.env` file must contain ALL of these variables. The application will throw an error if any are missing.

### Core Application Variables

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.flushjohn.com
NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL=https://flushjohn.com
NEXT_PUBLIC_FLUSH_JOHN_PHONE=(877) 790-7062
NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK=tel:+18777907062
NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID=your-email@example.com
NEXT_PUBLIC_FLUSH_JOHN_ADDRESS=Your Address Here
NEXT_PUBLIC_FLUSH_JOHN_FACEBOOK=https://facebook.com/yourpage
NEXT_PUBLIC_FLUSH_JOHN_TWITTER=https://twitter.com/yourpage
NEXT_PUBLIC_FLUSH_JOHN_LINKEDIN=https://linkedin.com/company/yourpage
NEXT_PUBLIC_FLUSH_JOHN_INSTAGRAM=https://instagram.com/yourpage
NEXT_PUBLIC_CLOUD_FRONT_URL=https://cdn.flushjohn.com
```

### Google Ads Configuration

```bash
# Google Ads Account ID
NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID=AW-11248564671

# Google Ads Conversion Label Suffixes
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_PAGE_FORM_SUFFIX=EhUQCLz8kKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUICK_QUOTE_FORM_SUFFIX=6KpkCNjzpaoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_MODAL_QUICK_QUOTE_FORM_SUFFIX=tcj2CLn8kKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX=kLt0CLzekKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FLOATING_PHONE_BUTTON_SUFFIX=OTFxCOSso6oaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CONTACT_FORM_SUFFIX=DkPVCMr71-EbEL_z3fMp

# Google Ads Conversion Values
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY=USD
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_QUOTE_PAGE_FORM=3.0
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_HERO_QUICK_QUOTE_FORM=2.5
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_MODAL_QUICK_QUOTE_FORM=2.5
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_CONTACT_FORM=2.0
```

## 🔍 How to Check Your .env File

1. Open your `.env` file in the root directory
2. Make sure ALL variables above are present
3. Check for typos (especially variable names)
4. Make sure there are no extra spaces or quotes around values

## 🚨 Common Issues

### Issue 1: Missing Variable
**Error:** `Missing required environment variable: NEXT_PUBLIC_API_BASE_URL`

**Solution:** Add the missing variable to your `.env` file

### Issue 2: Empty Variable
**Error:** `Missing required environment variable: ...`

**Solution:** Make sure the variable has a value (not empty)

### Issue 3: Dev Server Not Restarted
**Error:** Changes to `.env` not taking effect

**Solution:** Restart your Next.js dev server:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Issue 4: Wrong File
**Error:** Variables not loading

**Solution:** Make sure you're editing `.env` (not `.env.example` or `.env.local`)

## ✅ Quick Fix

If you're getting the error about `NEXT_PUBLIC_API_BASE_URL`, add this to your `.env` file:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.flushjohn.com
```

Then **restart your dev server**.
