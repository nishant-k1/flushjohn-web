# Quick Test: Is Conversion Tracking Working?

## ⚠️ Important Note

The Google Ads script **only loads in production mode** (`NODE_ENV === "production"`). 

If you're testing locally:
- The tracking won't work in development
- You need to test on your production/staging environment
- OR temporarily remove the production check for testing

## Quick Test Steps

### 1. Check if Base Script Loads

1. Open your website (in production)
2. Open DevTools (F12) → **Network** tab
3. Filter by: `gtag` or `googletagmanager`
4. Look for: `gtag/js?id=AW-11248564671`
5. ✅ **If you see this request** → Base script is loading
6. ❌ **If you don't see it** → Check environment variables or production mode

### 2. Test Form Submission Conversion

1. Go to your quote form page
2. Open DevTools → **Console** tab
3. Fill out and submit the form
4. Look for: `gtag("event", "conversion", { send_to: "AW-11248564671/..." })`
5. ✅ **If you see this** → Conversion event is firing
6. Check **Network** tab for request to `googleads.g.doubleclick.net`

### 3. Test Phone Click Conversion

1. Click any phone number link
2. Check **Console** for conversion event
3. Check **Network** tab for conversion request

### 4. Verify Conversion Labels Match

The conversion label in the code should match exactly what's in Google Ads:

**In Google Ads:**
- Go to Conversions → Click on "Web Lead"
- Find the conversion label (e.g., `AW-11248564671/EhUQCLz8kKoaEL_z3fMp`)
- Copy the suffix: `EhUQCLz8kKoaEL_z3fMp`

**In your code:**
- Check your `.env` file
- `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX` should be `EhUQCLz8kKoaEL_z3fMp`

## Common Issues

### "Needs attention" in Google Ads

This usually means:
1. **No conversions recorded yet** - Normal if you just set it up
2. **Conversion label mismatch** - Check labels match exactly
3. **Code not firing** - Check browser console for errors
4. **Not in production** - Code only runs in production mode

### No conversion events in console

Possible causes:
1. Site not in production mode
2. Environment variables not set
3. JavaScript errors preventing code from running
4. Ad blocker blocking Google scripts

## Expected Behavior

When working correctly, you should see:

1. **Network tab**: Request to `gtag/js?id=AW-11248564671`
2. **Console**: `gtag("event", "conversion", ...)` when you trigger conversions
3. **Network tab**: Request to `googleads.g.doubleclick.net/pagead/convert/...` with your conversion label

## Next Steps

1. **Test in production environment**
2. **Verify conversion labels match** Google Ads exactly
3. **Trigger test conversions** and check browser DevTools
4. **Wait 24-48 hours** for Google Ads to process and show conversions
5. **Check Google Ads dashboard** again
