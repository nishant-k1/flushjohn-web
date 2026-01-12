# Google Ads Conversion Tracking - Additional Recommendations

## Current Conversion Tracking Coverage ✅

You currently have conversion tracking for:
1. ✅ Quote page form submission (`/quote`) - `QUOTE_PAGE_FORM_SUFFIX`
2. ✅ Hero quick quote form (homepage hero section) - `HERO_QUICK_QUOTE_FORM_SUFFIX`
3. ✅ Modal quick quote form (floating button overlay) - `MODAL_QUICK_QUOTE_FORM_SUFFIX`
4. ✅ Phone calls (7 locations across site) - `SITE_WIDE_PHONE_BUTTON_SUFFIX`
5. ✅ Floating phone button (in modal) - `FLOATING_PHONE_BUTTON_SUFFIX`

## Recommended Additional Conversion Actions

### 🔴 HIGH PRIORITY

#### 1. Contact Form Submission (`/contact` page)
**Current Status:** ❌ Missing conversion tracking  
**Location:** `src/features/contact/components/Contact/index.tsx`  
**Recommendation:** Add conversion tracking when contact form is submitted

**Why:** Contact form submissions are valuable leads. Currently only has generic `button_click` event (line 119), not a Google Ads conversion event.

**Implementation:**
- Create new conversion action in Google Ads: "Contact Form Submission"
- Add conversion tracking in `Contact/index.tsx` onSubmit handler (around line 108-162)
- Use new env variable: `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CONTACT_FORM_SUFFIX`

**Current Code Issue:** Only tracks generic analytics event, not Google Ads conversion.

---

#### 2. Quote Page CTA Clicks (Intent Tracking) - OPTIONAL
**Current Status:** ✅ Not tracked (intentionally removed)  
**Locations with Quote CTAs:**
- `src/features/home/components/Hero/index.tsx` - "GET A QUOTE" button (line 41)
- `src/components/Navbar/index.tsx` - "Request Quote" link (line 105)
- `src/components/Footer/data.tsx` - "Request Quote" link
- `src/app/how-it-works/page.tsx` - "Get Free Quote" button (line 246)
- `src/app/about/page.tsx` - "Request Free Quote" button (line 276)
- `src/app/porta-potty-rental/[city]/[service]/page.tsx` - "Get Free Quote" button (line 440)

**Recommendation:** Consider tracking quote page visits as a "softer" conversion

**Why:** These clicks show purchase intent. Currently not tracked - conversions only fire on actual form submissions.

**Implementation (if desired):**
- Create new conversion action: "Quote Page Visit" or "Quote Intent"
- Track clicks on quote CTAs
- Use new env variable: `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_INTENT_SUFFIX`

**Note:** This is optional. Your current approach (only tracking form submissions) is cleaner and more accurate. Only add this if you want to measure intent vs. actual conversions.

---

### 🟡 MEDIUM PRIORITY

#### 3. Service Area Page Engagement
**Current Status:** ❌ Missing  
**Location:** `src/features/service-areas/components/ServiceAreasPage/index.tsx`  
**Recommendation:** Track when users interact with service area pages

**Why:** Users viewing service areas are likely checking if you serve their location - high intent.

**Implementation:**
- Track page views or interactions on service area pages
- Could use existing conversion or create "Service Area View" conversion

---

#### 4. Product Page Engagement
**Current Status:** ❌ Missing  
**Location:** `src/features/products/components/Products/index.tsx`  
**Recommendation:** Track when users view product details

**Why:** Product page views indicate serious consideration.

**Implementation:**
- Track product detail page views
- Or track clicks on "Get Quote" from product pages

---

#### 5. Blog Engagement (Content Marketing ROI)
**Current Status:** ❌ Missing  
**Location:** `src/features/blog/components/Blog/index.tsx`  
**Recommendation:** Track blog engagement metrics

**Why:** If blog drives conversions, track it. Can measure content marketing ROI.

**Implementation:**
- Track blog post reads (time on page > X seconds)
- Track clicks on CTAs within blog posts
- Use existing quote conversion if blog CTA leads to quote

---

### 🟢 LOW PRIORITY (Optional)

#### 6. Email Link Clicks
**Current Status:** ❌ Missing  
**Location:** Footer, contact page  
**Recommendation:** Track email link clicks

**Why:** Email clicks show engagement, though less valuable than form submissions.

**Implementation:**
- Track clicks on email links
- Use existing contact conversion or create separate one

---

#### 7. FAQ Page Engagement
**Current Status:** ❌ Missing  
**Location:** `src/features/legal/components/Faq/index.tsx`  
**Recommendation:** Track FAQ engagement

**Why:** Users reading FAQs are researching - could indicate high intent.

**Implementation:**
- Track FAQ page views or specific question clicks
- Lower priority as it's more informational

---

## Implementation Priority Summary

| Priority | Conversion Action | Current Status | Impact |
|---------|------------------|----------------|--------|
| 🔴 **HIGH** | Contact Form Submission | ❌ Missing | High - Direct lead generation |
| 🟡 **OPTIONAL** | Quote Page CTA Clicks | ✅ Not tracked (by design) | Medium - Purchase intent (optional) |
| 🟡 **MEDIUM** | Service Area Views | ❌ Missing | Medium - Location intent |
| 🟡 **MEDIUM** | Product Page Views | ❌ Missing | Medium - Product interest |
| 🟡 **MEDIUM** | Blog Engagement | ❌ Missing | Low-Medium - Content ROI |
| 🟢 **LOW** | Email Clicks | ❌ Missing | Low - Less valuable |
| 🟢 **LOW** | FAQ Engagement | ❌ Missing | Low - Informational |

## Recommended Next Steps

1. **🔴 HIGH PRIORITY:** Add contact form conversion tracking
2. **🟡 OPTIONAL:** Consider quote intent tracking (if you want to measure intent vs. actual conversions)
3. **🟡 MEDIUM PRIORITY:** Consider service area and product page tracking
4. **🟢 LOW PRIORITY:** Add blog engagement tracking if content marketing is important

## Notes

- **Don't over-track:** Too many conversions can dilute data. Focus on actions that lead to revenue.
- **Conversion Hierarchy:** 
  - Primary: Form submissions (quote, contact)
  - Secondary: High-intent actions (quote page visits, service area views)
  - Tertiary: Engagement metrics (blog reads, product views)
- **Google Ads Best Practice:** Keep primary conversions to 3-5 max for better optimization.
