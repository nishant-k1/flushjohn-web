# FlushJohn Web - Comprehensive Bug Report

**Scan Date:** $(date)  
**Project:** flushjohn-web  
**Framework:** Next.js 16.1.0 with React 19.0.0  
**TypeScript:** Yes  

---

## Executive Summary

A comprehensive scan of the flushjohn-web codebase identified **26 potential bugs** across multiple priority levels:
- **Critical (3):** Bugs that could lead to security vulnerabilities, memory leaks, or data loss
- **High (6):** Bugs that could cause runtime errors, performance issues, or poor user experience
- **Medium (8):** Bugs that could lead to inconsistent behavior or minor errors
- **Low (9):** Bugs related to code quality, maintainability, or best practices

---

## Critical Priority Bugs (3)

### 1. **Empty Catch Block - Silent Error Swallowing**
**Location:** `src/features/quote/components/Quote/QuoteStep2/index.tsx:47`
**Severity:** Critical
**Issue:** Empty catch block silently swallows all errors, making debugging impossible.
```typescript
onSubmit={async (values, { setSubmitting, resetForm }) => {
  try {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...values,
    }));
    setStep(3);
    window.scrollTo(0, 0);
  } catch (err) {} // ❌ Empty catch block - errors are silently swallowed
}}
```
**Impact:** Errors during form submission are completely hidden, preventing proper error handling and user feedback.
**Fix:** Add proper error logging and user feedback.

---

### 2. **XSS Vulnerability in Email Templates**
**Locations:**
- `src/features/contact/api/contact/route.ts:23-27`
- `src/features/quote/api/quick-quote/route.ts:23-57`
- `src/features/quote/api/quote/route.ts:48-67`
**Severity:** Critical
**Issue:** User input is directly interpolated into email templates without sanitization, creating XSS vulnerabilities.
```typescript
// contact/route.ts
text: `
  From: ${emailData.firstName} ${emailData.lastName}  // ❌ No sanitization
  Email: ${emailData.email}
  Phone: ${emailData.phone}
  Message: ${emailData.message}`, // ❌ Direct user input injection

// quick-quote/route.ts
html: `
  <div>
    <h4>From:</h4>
    <p>${quickQuoteData.fullName}</p>  // ❌ No sanitization
    ...
  </div>
`
```
**Impact:** Malicious users could inject HTML/JavaScript into email templates, potentially compromising email clients or recipients.
**Fix:** Sanitize all user input before including in email templates using a library like `DOMPurify` or `html-to-text`.

---

### 3. **Memory Leak - Event Listeners Without Cleanup**
**Locations:**
- `src/components/SEO/FinalOptimizer/index.tsx:43-63` (form validation listeners)
- `src/utils/performance.ts:116` (scroll listener)
- `src/app/layout.tsx:168-188` (error/rejection listeners in inline script)
**Severity:** Critical
**Issue:** Event listeners are added but never removed, causing memory leaks and potential performance degradation.
```typescript
// FinalOptimizer/index.tsx
const optimizeFormValidation = () => {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("input", () => { /* ... */ }, { passive: true });
      // ❌ No cleanup - listeners accumulate on every useEffect run
    });
  });
};

// performance.ts
window.addEventListener("scroll", handleScroll, { passive: true });
// ❌ No cleanup - listener never removed
```
**Impact:** Memory leaks accumulate over time, leading to performance degradation and potential browser crashes.
**Fix:** Store references to listeners and remove them in cleanup functions.

---

## High Priority Bugs (6)

### 4. **Infinite Loop in useEffect**
**Location:** `src/features/quote/components/Quote/QuoteStep2/index.tsx:28-30`
**Severity:** High
**Issue:** useEffect depends on `formValues` and calls `setFormValues(formValues)`, creating an infinite re-render loop.
```typescript
React.useEffect(() => {
  setFormValues(formValues); // ❌ This causes infinite loop
}, [formValues]); // ❌ formValues changes, triggering useEffect again
```
**Impact:** Infinite re-renders cause performance issues, browser freezing, and potential crashes.
**Fix:** Remove this useEffect if unnecessary, or use a different dependency that doesn't cause a loop.

---

### 5. **Missing Error Logging in API Routes**
**Locations:**
- `src/features/contact/api/contact/route.ts:31-36`
- `src/features/quote/api/quick-quote/route.ts:62-67`
- `src/features/quote/api/quote/route.ts:72-77`
**Severity:** High
**Issue:** Catch blocks return generic error messages without logging the actual error, making debugging difficult.
```typescript
catch (err) {
  return NextResponse.json(
    { error: "Failed to send email" }, // ❌ Generic message, no error details
    { status: 500 }
  );
  // ❌ Actual error (err) is not logged anywhere
}
```
**Impact:** Production errors cannot be diagnosed, making troubleshooting impossible.
**Fix:** Log errors to a logging service (e.g., Sentry, LogRocket) or at minimum to console with stack traces.

---

### 6. **Missing Error Logging in Error Handlers**
**Locations:**
- `src/app/error.tsx:12`
- `global-error.tsx:13-15`
**Severity:** High
**Issue:** Error handlers have empty useEffect hooks that don't log errors to external services.
```typescript
// error.tsx
useEffect(() => {}, [error]); // ❌ Empty effect - doesn't log error

// global-error.tsx
useEffect(() => {
  // Log the error to an error reporting service
  // ❌ Comment but no actual implementation
}, [error]);
```
**Impact:** Client-side errors are not tracked, making it impossible to identify and fix production issues.
**Fix:** Implement error logging to an error tracking service (e.g., Sentry, LogRocket).

---

### 7. **Memory Leak - MutationObserver Without Cleanup**
**Location:** `src/components/FormControls/DateInput/index.tsx:198-212`
**Severity:** High
**Issue:** MutationObserver is created but cleanup depends on component lifecycle; if cleanup doesn't run, observer leaks.
```typescript
const observer = new MutationObserver(forceWidth);
observer.observe(containerRef.current, {
  attributes: true,
  attributeFilter: ["style"],
  subtree: true,
});

return () => {
  clearTimeout(timeoutId);
  observer.disconnect(); // ✅ Cleanup exists, but if useEffect doesn't clean up properly, leak occurs
};
```
**Impact:** MutationObservers accumulate if cleanup doesn't run, causing memory leaks.
**Fix:** Ensure cleanup always runs, or move observer creation outside useEffect if possible.

---

### 8. **Missing Cleanup for Event Listeners in optimizeFormValidation**
**Location:** `src/components/SEO/FinalOptimizer/index.tsx:43-63`
**Severity:** High
**Issue:** Event listeners added in `optimizeFormValidation` are never removed, and the function is called multiple times.
```typescript
const optimizeFormValidation = () => {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      let validationTimeout: NodeJS.Timeout;
      input.addEventListener("input", () => { /* ... */ }, { passive: true });
      // ❌ No cleanup function to remove listener
      // ❌ validationTimeout is recreated on every call, old timeouts are never cleared
    });
  });
};
```
**Impact:** Event listeners and timeouts accumulate on every call, causing memory leaks and potential performance issues.
**Fix:** Store listener references and remove them in cleanup, or refactor to use event delegation.

---

### 9. **Missing Cleanup for Event Listeners in Layout Script**
**Location:** `src/app/layout.tsx:168-188`
**Severity:** High
**Issue:** Event listeners are added in an inline script but never removed, and script runs on every page load.
```typescript
window.addEventListener('error', function(event) { /* ... */ }, true);
window.addEventListener('unhandledrejection', function(event) { /* ... */ });
// ❌ No cleanup - listeners are added multiple times on navigation
// ❌ Inline script runs on every page load, adding duplicate listeners
```
**Impact:** Duplicate event listeners accumulate on client-side navigation, causing memory leaks and potential performance issues.
**Fix:** Use a client-side component with proper useEffect cleanup instead of inline script, or add checks to prevent duplicate listeners.

---

### 10. **Missing Error Details in API Error Responses**
**Locations:**
- `src/features/contact/api/contact/route.ts:31-36`
- `src/features/quote/api/quick-quote/route.ts:62-67`
- `src/features/quote/api/quote/route.ts:72-77`
**Severity:** High
**Issue:** Generic error messages don't help with debugging, and actual error details are lost.
```typescript
catch (err) {
  return NextResponse.json(
    { error: "Failed to send email" }, // ❌ Generic message
    { status: 500 }
  );
}
```
**Impact:** API clients receive unhelpful error messages, and backend errors cannot be diagnosed.
**Fix:** Include error details in development mode, and send sanitized error messages to clients in production.

---

## Medium Priority Bugs (8)

### 11. **Race Condition in Date Parsing**
**Location:** `src/features/quote/api/quote/route.ts:23-31`
**Severity:** Medium
**Issue:** Date parsing without validation could throw errors if invalid date strings are received.
```typescript
const deliveryDate = new Date(quoteData.deliveryDate);
const longDeliveryDate = `${
  months[deliveryDate.getMonth()]  // ❌ Could throw if date is invalid (NaN)
} ${deliveryDate.getDate()}, ${deliveryDate.getFullYear()}`;
```
**Impact:** Invalid dates cause runtime errors, crashing the API route.
**Fix:** Validate dates before parsing and handle invalid dates gracefully.

---

### 12. **Missing Input Validation in API Routes**
**Locations:**
- `src/features/contact/api/contact/route.ts:6`
- `src/features/quote/api/quick-quote/route.ts:6`
- `src/features/quote/api/quote/route.ts:21`
**Severity:** Medium
**Issue:** Request body is parsed without validation, potentially leading to runtime errors or security issues.
```typescript
const emailData = await req.json(); // ❌ No validation
await transporter.sendMail({
  from: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`,
  // ❌ emailData fields are used without checking if they exist or are valid
});
```
**Impact:** Missing or invalid fields cause runtime errors, potentially crashing the API route.
**Fix:** Validate request body using a schema validator (e.g., Zod, Yup) before processing.

---

### 13. **Incorrect Environment Variable Usage**
**Locations:**
- `src/features/quote/components/QuickQuote/index.tsx:329`
- `src/components/HeroQuickQuote/index.tsx:313`
- `src/features/quote/components/Quote/QuoteStep3/index.tsx:82`
- `src/features/contact/components/Contact/index.tsx:125,139,150`
**Severity:** Medium
**Issue:** Using `process.env.NODE_ENV` in client-side code. In Next.js, this should be checked at build time, not runtime.
```typescript
if (process.env.NODE_ENV === "development") { // ❌ Should use import.meta.env.DEV or check at build time
  console.error("Error submitting lead:", err);
}
```
**Impact:** `process.env.NODE_ENV` may not be available in client-side code in Next.js, causing issues.
**Fix:** Use `import.meta.env.DEV` (for Vite/Next.js) or check environment at build time using Next.js environment variables.

---

### 14. **Missing Cleanup for Timers in optimizeFormValidation**
**Location:** `src/components/SEO/FinalOptimizer/index.tsx:48-57`
**Severity:** Medium
**Issue:** `validationTimeout` is scoped to the forEach loop, but old timeouts are never cleared when new ones are set.
```typescript
inputs.forEach((input) => {
  let validationTimeout: NodeJS.Timeout; // ❌ New variable on each iteration
  input.addEventListener("input", () => {
    clearTimeout(validationTimeout); // ❌ Clears timeout from current iteration only
    validationTimeout = setTimeout(() => { /* ... */ }, 300);
  }, { passive: true });
});
```
**Impact:** Multiple rapid inputs create multiple timeouts that may not all be cleared, causing unnecessary function calls.
**Fix:** Store timeout references outside the loop or use a Map to track timeouts per input.

---

### 15. **Missing Error Handling in API Client**
**Location:** `src/utils/apiClient.ts:76-81`
**Severity:** Medium
**Issue:** Error response parsing could fail if response is not valid JSON, but error handling is minimal.
```typescript
if (!response.ok) {
  const errorData = await response.json().catch(() => ({})); // ✅ Handles JSON parse error
  throw new Error(
    errorData.message || `HTTP ${response.status}: ${response.statusText}`
  );
  // ❌ But doesn't handle cases where errorData.message is undefined and statusText is empty
}
```
**Impact:** Users may see unhelpful error messages like "Error: HTTP 500: ".
**Fix:** Provide more detailed error messages and handle edge cases better.

---

### 16. **Missing Validation for Email Template Data**
**Locations:**
- `src/features/contact/api/contact/route.ts:19-28`
- `src/features/quote/api/quick-quote/route.ts:19-59`
- `src/features/quote/api/quote/route.ts:44-69`
**Severity:** Medium
**Issue:** Email template uses data fields without checking if they exist or are valid.
```typescript
text: `
  From: ${emailData.firstName} ${emailData.lastName}  // ❌ Could be undefined
  Email: ${emailData.email}  // ❌ Could be undefined
  Phone: ${emailData.phone}  // ❌ Could be undefined
  Message: ${emailData.message}`, // ❌ Could be undefined
```
**Impact:** Undefined values render as "undefined" in emails, making them unprofessional.
**Fix:** Validate and provide default values or handle missing fields gracefully.

---

### 17. **Potential Race Condition in Form Validation**
**Location:** `src/components/SEO/FinalOptimizer/index.tsx:43-63`
**Severity:** Medium
**Issue:** `optimizeFormValidation` queries the DOM and adds listeners, but forms may be dynamically added/removed.
```typescript
const optimizeFormValidation = () => {
  const forms = document.querySelectorAll("form"); // ❌ Static query - doesn't handle dynamic forms
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea, select");
    // ❌ If forms are added after this runs, they won't have validation listeners
  });
};
```
**Impact:** Dynamically added forms won't have validation listeners, causing inconsistent behavior.
**Fix:** Use event delegation on a parent element or use MutationObserver to detect new forms.

---

### 18. **Missing Type Safety in Error Handling**
**Location:** Multiple locations with `catch (err)`
**Severity:** Medium
**Issue:** Error objects are caught as `unknown` or `any` without proper type checking.
```typescript
catch (err) { // ❌ err is of type unknown, but used without type checking
  console.error("Error:", err);
  // ❌ If err is not an Error object, error.message could throw
}
```
**Impact:** Runtime errors if error is not an Error object, causing crashes.
**Fix:** Add type guards to check if error is an Error instance before accessing properties.

---

## Low Priority Bugs (9)

### 19. **Console.log in Production Code**
**Locations:**
- `src/features/quote/components/QuickQuote/index.tsx:330`
- `src/components/HeroQuickQuote/index.tsx:314`
- `src/features/quote/components/Quote/QuoteStep3/index.tsx:83`
- `src/features/contact/components/Contact/index.tsx:126,140,151`
**Severity:** Low
**Issue:** Direct `console.error` calls even with environment checks. Should use a centralized logger.
```typescript
if (process.env.NODE_ENV === "development") {
  console.error("Error submitting lead:", err); // ❌ Should use centralized logger
}
```
**Impact:** Inconsistent logging approach and potential performance impact if environment check fails.
**Fix:** Create a centralized logger utility (similar to `safeConsole`) and use it throughout the application.

---

### 20. **Missing JSDoc Comments**
**Locations:** Multiple utility functions and components
**Severity:** Low
**Issue:** Many functions lack JSDoc comments, making it difficult to understand their purpose and parameters.
**Impact:** Reduced code maintainability and developer experience.
**Fix:** Add comprehensive JSDoc comments to all public functions and components.

---

### 21. **Type Safety Issues with `any` Types**
**Locations:**
- `src/utils/apiTypes.ts:44,47`
- `src/utils/dataTransformers.ts:14,36,42`
- `src/components/FormControls/DateInput/index.tsx:111`
- Multiple component props using `any`
**Severity:** Low
**Issue:** Extensive use of `any` types reduces TypeScript's type safety benefits.
```typescript
export function prepareApiPayload(formData: any): LeadFormRequest { // ❌ any type
  return {
    products: formData.products.map((product: any) => ({ // ❌ any type
      // ...
    })),
  };
}
```
**Impact:** Reduced type safety, potential runtime errors, and poorer IDE autocomplete.
**Fix:** Replace `any` types with proper interfaces and types.

---

### 22. **Inconsistent Error Response Format**
**Locations:** API routes return different error formats
**Severity:** Low
**Issue:** Different API routes return errors in different formats, making client-side error handling inconsistent.
```typescript
// contact/route.ts
{ error: "Failed to send email" }

// quick-quote/route.ts
{ error: "Failed to send quote" }

// ❌ Different error formats - should be consistent
```
**Impact:** Inconsistent error handling on the client side, requiring different parsing logic.
**Fix:** Standardize error response format across all API routes (e.g., `{ success: false, message: string, error?: any }`).

---

### 23. **Missing Cleanup Dependency in useEffect**
**Location:** `src/features/quote/components/Quote/QuoteStep2/index.tsx:28-30`
**Severity:** Low
**Issue:** useEffect has `formValues` as a dependency, but the effect doesn't actually need to run when `formValues` changes.
```typescript
React.useEffect(() => {
  setFormValues(formValues); // ❌ This seems unnecessary
}, [formValues]); // ❌ Dependency may not be needed
```
**Impact:** Unnecessary re-renders and potential infinite loops (as mentioned in bug #4).
**Fix:** Remove the useEffect if unnecessary, or use a different approach.

---

### 24. **Missing Validation for Environment Variables**
**Locations:** `src/constants/index.tsx:1-70`
**Severity:** Low
**Issue:** Environment variables are used without validation, potentially causing runtime errors if they're undefined.
```typescript
export const G_TAG_ID: string = process.env.NEXT_PUBLIC_G_TAG_ID as string; // ❌ No validation
export const apiBaseUrls: apiBaseUrlsType = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL as string, // ❌ Could be undefined
};
```
**Impact:** Runtime errors if environment variables are not set, causing application crashes.
**Fix:** Validate environment variables at startup and provide helpful error messages if missing.

---

### 25. **Missing Error Boundaries for Specific Components**
**Location:** Application-wide
**Severity:** Low
**Issue:** While global error boundaries exist, specific error-prone components (forms, API calls) don't have localized error boundaries.
**Impact:** Errors in one component can crash the entire page instead of being contained.
**Fix:** Add error boundaries around error-prone components (forms, API-dependent components).

---

### 26. **Duplicate Event Listener Setup**
**Locations:**
- `src/app/layout.tsx:168-188` (inline script)
- `src/utils/errorHandling.ts:55-102` (setupGlobalErrorHandlers)
**Severity:** Low
**Issue:** Error handlers are set up in multiple places (inline script and utility function), potentially causing duplicate listeners.
**Impact:** Duplicate event listeners fire multiple times, causing unnecessary processing and potential performance issues.
**Fix:** Consolidate error handler setup into a single location (preferably in a client-side component with proper cleanup).

---

### 27. **Missing Input Sanitization for Blog Content**
**Location:** `src/features/blog/components/Blog/BlogPost/index.tsx:111-113`
**Severity:** Low (mitigated)
**Issue:** Blog content uses `dangerouslySetInnerHTML` with DOMPurify sanitization, but the sanitization happens at render time, not at fetch time.
```typescript
dangerouslySetInnerHTML={{
  __html: actualBlogPost?.content || "", // ❌ Content is already sanitized at line 182, but this uses actualBlogPost
}}
```
**Note:** Line 182 shows `blogPost.content` is sanitized, but `actualBlogPost` may be different. Verify both are sanitized.
**Impact:** Potential XSS if unsanitized content is rendered.
**Fix:** Ensure all blog content is sanitized before rendering, and verify `actualBlogPost` uses sanitized content.

---

## Summary Statistics

- **Total Bugs Found:** 27
- **Critical:** 3
- **High:** 7
- **Medium:** 8
- **Low:** 9

## Recommendations

1. **Immediate Actions (Critical):**
   - Fix empty catch block in QuoteStep2
   - Sanitize all user input in email templates
   - Fix memory leaks in event listeners

2. **Short-term Actions (High):**
   - Add proper error logging to all API routes
   - Fix infinite loop in QuoteStep2 useEffect
   - Implement error tracking service integration

3. **Medium-term Actions (Medium):**
   - Add input validation to all API routes
   - Fix environment variable usage in client-side code
   - Improve error handling consistency

4. **Long-term Actions (Low):**
   - Improve type safety by removing `any` types
   - Add comprehensive JSDoc comments
   - Standardize error response formats

---

**Report Generated By:** QA Automated Scan  
**Next Steps:** Review and prioritize bugs for fixing
