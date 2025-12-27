# Content Security Policy (CSP) Debugging Guide

## Understanding CSP Errors

### Error Types

1. **connect-src violations**: Network requests (fetch, XHR, WebSocket, EventSource)
2. **style-src violations**: External stylesheets loaded via `<link>` or `@import`

## How to Identify Blocked Resources

### Step 1: Check Browser Console

Open your browser's Developer Tools (F12) and look at the Console tab. The actual blocked URLs will be shown in the error messages.

### Step 2: Check Network Tab

1. Open Developer Tools → Network tab
2. Look for failed requests (red status codes)
3. Check the "Response Headers" for CSP violation reports

### Step 3: Common Sources of Violations

#### Third-Party Services That May Need CSP Updates:

- **Tawk.to**: `https://va.tawk.to`, `https://embed.tawk.to`, `wss://embed.tawk.to`
- **Google Services**: Various subdomains
- **Facebook Pixel**: `https://connect.facebook.net`
- **CDN Resources**: External stylesheets or fonts
- **Analytics**: Google Analytics, Facebook Analytics
- **Vercel**: `https://vercel.live` (for preview deployments)

#### Common External Stylesheet Sources:

- Google Fonts: `https://fonts.googleapis.com` (already allowed)
- CDN-hosted CSS: Check if any CSS is loaded from external domains
- Third-party widgets: Chat widgets, social media embeds, etc.

## Fixing CSP Violations

### For connect-src violations:

Add the blocked domain to the `connectSrc` variable in `next.config.js`:

```javascript
let connectSrc =
  "'self' ... https://blocked-domain.com wss://blocked-domain.com";
```

### For style-src violations:

Add the blocked domain to the `style-src` directive:

```javascript
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.flushjohn.com https://blocked-domain.com
```

### Using style-src-elem (Recommended)

Modern CSP supports `style-src-elem` which specifically controls `<link>` and `<style>` elements:

```javascript
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.flushjohn.com;
style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.flushjohn.com https://blocked-domain.com
```

## Current CSP Configuration

See `next.config.js` lines 312-334 for the current CSP policy.

### Currently Allowed Domains:

**connect-src:**

- 'self'
- https://www.google-analytics.com
- https://www.google.com
- https://googleads.g.doubleclick.net
- https://api.flushjohn.com
- wss://api.flushjohn.com
- https://connect.facebook.net
- https://www.gstatic.com
- https://embed.tawk.to
- wss://embed.tawk.to
- https://va.tawk.to
- https://vercel.live (Vercel deployments only)
- wss://vercel.live (Vercel deployments only)

**style-src:**

- 'self'
- 'unsafe-inline'
- https://fonts.googleapis.com
- https://cdn.flushjohn.com

## Quick Fix Checklist

1. ✅ Check browser console for exact blocked URLs
2. ✅ Identify which service/resource is being blocked
3. ✅ Add the domain to the appropriate CSP directive
4. ✅ Test in browser to confirm fix
5. ✅ Commit and deploy changes

## Why CSP Works Locally But Fails on Vercel

**⚠️ Important**: CSP headers are **only applied in production mode** (`NODE_ENV === "production"`).

- **Locally (`npm run dev`)**: `NODE_ENV` is `"development"`, so **CSP headers are NOT applied** - no resources are blocked
- **On Vercel**: `NODE_ENV` is `"production"`, so **CSP headers ARE applied** - resources can be blocked

This is why you might not see CSP violations locally but see them after deploying to Vercel.

## Testing CSP Changes Locally

### Option 1: Test with Production Build (Recommended)

To test CSP locally before deploying:

```bash
# Use the convenience script (builds and starts production server)
npm run test:production
```

Or manually:

```bash
# Build in production mode
npm run build

# Start production server
npm start
```

Then visit `http://localhost:3000` and check the browser console for CSP violations.

### Option 2: Temporarily Enable CSP in Development

If you want to test CSP during development, you can temporarily modify `next.config.js`:

```javascript
// Change line 309 from:
...(process.env.NODE_ENV === "production" ? [...] : []),

// To (temporarily):
...([...]),  // Always apply CSP
```

**⚠️ Remember to revert this change before committing!**

### Option 3: Test on Vercel Preview

1. Push your changes to a branch
2. Vercel will create a preview deployment
3. Test the preview URL to see CSP violations
4. Fix issues and push again

## Testing CSP Changes

1. Make changes to `next.config.js`
2. **Test locally with production build** (see above) OR test on Vercel preview
3. Clear browser cache or use incognito mode
4. Check browser console for remaining violations
5. Repeat until all violations are resolved

## Security Best Practices

- **Avoid 'unsafe-inline'** when possible (but sometimes necessary for third-party scripts)
- **Be specific**: Only allow domains you actually use
- **Test thoroughly**: CSP violations can break functionality
- **Monitor in production**: Set up CSP reporting to catch new violations
