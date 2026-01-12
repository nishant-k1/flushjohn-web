# Google Ads Conversion Tracking Verification Guide

## Current Implementation Mapping

Based on your Google Ads dashboard, here's how the conversions should map:

| Google Ads Conversion Name | Code Variable | Expected Label Format |
|---------------------------|---------------|----------------------|
| **Web Lead** | `GOOGLE_ADS_CONVERSION_QUOTE_FORM` | `AW-11248564671/{suffix}` |
| **Web Hero Quick Lead** | `GOOGLE_ADS_CONVERSION_HERO_QUOTE` | `AW-11248564671/{suffix}` |
| **Web Quick Lead** | `GOOGLE_ADS_CONVERSION_QUICK_QUOTE` | `AW-11248564671/{suffix}` |
| **Hero Phone Call** | `GOOGLE_ADS_CONVERSION_PHONE_CALL` | `AW-11248564671/{suffix}` |
| **Quick Phone Call** | `GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE` | `AW-11248564671/{suffix}` |

## How to Find Your Conversion Labels in Google Ads

1. **Go to Google Ads Dashboard** → **Tools & Settings** → **Conversions**

2. **Click on each conversion action** (e.g., "Web Lead")

3. **Look for "Tag setup" or "Tag details"** section

4. **Find the conversion label/ID** - It will look like:
   - Full format: `AW-11248564671/EhUQCLz8kKoaEL_z3fMp`
   - You need only the suffix: `EhUQCLz8kKoaEL_z3fMp`

5. **Copy the suffix** (the part after the slash `/`)

## Verify Your Environment Variables

Make sure your `.env` file has the correct suffixes:

```bash
NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID=AW-11248564671

# These should match the suffixes from Google Ads (part after the slash)
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX=EhUQCLz8kKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUOTE_SUFFIX=6KpkCNjzpaoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_SUFFIX=tcj2CLn8kKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PHONE_CALL_SUFFIX=kLt0CLzekKoaEL_z3fMp
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE_SUFFIX=OTFxCOSso6oaEL_z3fMp
```

## Testing if Conversions Are Working

### Method 1: Browser DevTools (Recommended)

1. **Open your website** in Chrome/Firefox
2. **Open DevTools** (F12) → **Network** tab
3. **Filter by**: `googleads` or `doubleclick`
4. **Trigger a conversion**:
   - Submit a quote form
   - Click a phone number link
5. **Look for requests** to `googleads.g.doubleclick.net/pagead/convert/...`
6. **Check the request URL** - it should contain your conversion label

### Method 2: Browser Console

1. **Open DevTools** → **Console** tab
2. **Trigger a conversion** (submit form or click phone link)
3. **Look for** `gtag("event", "conversion", ...)` calls
4. **Check the `send_to` value** matches your conversion label

### Method 3: Google Tag Assistant (Chrome Extension)

1. **Install** [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. **Enable** the extension
3. **Visit your website**
4. **Trigger conversions**
5. **Check** if conversion events are detected

## Common Issues and Solutions

### Issue: "Needs attention" status

**Possible causes:**
1. Conversion label doesn't match
2. Code not firing (check browser console for errors)
3. Environment variables not set correctly
4. Site not in production mode (code only runs in production)

**Solutions:**
- Verify conversion labels match exactly
- Check browser console for JavaScript errors
- Ensure `NODE_ENV=production` or remove the production check
- Test in production environment

### Issue: No conversions showing

**Check:**
1. Is the base Google Ads script loading? (Check Network tab for `gtag/js`)
2. Are conversion events firing? (Check Console for `gtag` calls)
3. Are environment variables set? (App should throw error if missing)
4. Is the site in production? (Code checks `process.env.NODE_ENV === "production"`)

### Issue: Wrong conversion label format

**Remember:**
- Full label: `AW-11248564671/EhUQCLz8kKoaEL_z3fMp`
- Store only suffix: `EhUQCLz8kKoaEL_z3fMp`
- Code constructs: `${ACCOUNT_ID}/${SUFFIX}`

## Quick Verification Checklist

- [ ] Base Google Ads script loads (check Network tab)
- [ ] Environment variables are set correctly
- [ ] Conversion labels match Google Ads exactly
- [ ] Conversion events fire in browser console
- [ ] Network requests to `googleads.g.doubleclick.net` appear
- [ ] Site is in production mode (or production check removed)
- [ ] No JavaScript errors in console

## Next Steps

1. **Verify conversion labels** in Google Ads match your env variables
2. **Test each conversion type** (forms and phone clicks)
3. **Check browser DevTools** to confirm events are firing
4. **Wait 24-48 hours** for Google Ads to process and display conversions
5. **Check Google Ads dashboard** again after testing
