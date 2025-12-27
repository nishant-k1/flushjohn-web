# React Hydration Error #418 - Debugging Guide

## What is Error #418?

React error #418 is a **hydration mismatch** error. It occurs when the HTML rendered on the server doesn't match what React expects on the client during hydration.

## Getting the Full Error Message

The minified production build only shows error codes. To see the full error:

### Option 1: Run in Development Mode (Recommended)

```bash
npm run dev
```

Then visit `http://localhost:3000` - you'll see the full error message with details about which HTML tag is mismatched.

### Option 2: Visit React Error Page

The error message includes a URL:

```
https://react.dev/errors/418?args[]=HTML&args[]=
```

Visit this URL to see documentation about the error.

## Common Causes

1. **Browser Extensions**: Extensions that modify the DOM (ad blockers, password managers, etc.)
2. **Third-Party Scripts**: Scripts that inject HTML before React hydrates
3. **Conditional Rendering**: Using `typeof window !== 'undefined'` or `document` in render
4. **Date/Time Formatting**: Server and client rendering different date formats
5. **Random Values**: Using `Math.random()` or `Date.now()` in render
6. **Invalid HTML**: Nesting issues (e.g., `<p>` inside `<p>`)

## Current Suppressions

We already have `suppressHydrationWarning` on:

- `<html>` tag
- `<body>` tag
- Date formatting in blog posts

## Debugging Steps

1. **Run in dev mode** to see full error:

   ```bash
   npm run dev
   ```

2. **Check browser console** for the full error message - it will tell you which HTML tag is mismatched

3. **Test in incognito mode** to rule out browser extensions

4. **Check for third-party scripts** that might modify the DOM:

   - Google Analytics
   - Facebook Pixel
   - Any other scripts that inject HTML

5. **Look for conditional rendering** based on `window` or `document`

## Fixing the Error

Once you have the full error message, it will tell you:

- Which HTML tag is mismatched
- What the server rendered vs. what the client expects

Common fixes:

- Add `suppressHydrationWarning` to the problematic element
- Move client-only code to `useEffect`
- Ensure server and client render the same HTML

## Next Steps

1. Run `npm run dev` and check the console for the full error
2. Share the full error message so we can identify the exact issue
3. Test in incognito mode to rule out browser extensions
