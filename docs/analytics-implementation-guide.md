# Analytics Implementation Guide

This guide explains all the analytics features that have been implemented to improve your Google Ads economics and lead generation.

## 🎯 Overview

Four major analytics features have been implemented:

1. **Form Abandonment Tracking** - Tracks when users start but don't complete forms
2. **Remarketing Audiences** - Sets up audiences for Google Ads retargeting
3. **A/B Testing Framework** - Enables testing different variations
4. **Detailed Analytics Tracking** - Tracks scroll depth, time on page, engagement

---

## 1. Form Abandonment Tracking

### What It Does

Tracks when users start filling out forms but don't complete them. This helps identify:
- Which forms have high abandonment rates
- At which step users abandon forms
- How long users spend before abandoning
- Why users abandon (timeout, page leave, tab switch)

### How It Works

- Automatically tracks when forms are started
- Monitors field interactions
- Tracks step changes in multi-step forms
- Detects abandonment after 30 seconds of inactivity
- Tracks abandonment on page leave or tab switch

### Implementation

**Already integrated in:**
- ✅ Quote Page Form (`/quote`)
- ✅ Hero Quick Quote Form (homepage)
- ✅ Modal Quick Quote Form
- ✅ Contact Form (`/contact`)

### Events Tracked

- `form_start` - When user starts filling form
- `form_field_interaction` - When user fills a field
- `form_step_change` - When user moves to next step (multi-step forms)
- `form_abandon` - When user abandons form
- `form_complete` - When user successfully completes form

### Data Collected

- Form type
- Time spent on form
- Last step reached
- Fields filled vs total fields
- Completion percentage
- Abandonment reason (timeout, page_leave, tab_switch)

### Using in Google Ads

1. Go to Google Ads → Tools & Settings → Audience Manager
2. Create new audience based on "Website visitors"
3. Use custom events: `form_abandon`, `form_starter`
4. Create remarketing campaigns targeting form abandoners

---

## 2. Remarketing Audiences

### What It Does

Automatically categorizes users into remarketing audiences based on their behavior. These audiences can be used in Google Ads for retargeting campaigns.

### Audiences Created

1. **page_visitor** - Anyone who visits your site
2. **quote_page_visitor** - Users who visit `/quote` page (high intent)
3. **contact_page_visitor** - Users who visit `/contact` page
4. **form_starter** - Users who start filling a form
5. **form_abandoner** - Users who start but don't complete forms
6. **phone_clicker** - Users who click phone buttons
7. **high_intent_visitor** - Users showing high engagement (quote page, phone clicks, form starts)
8. **returning_visitor** - Users who visit multiple times

### How It Works

- Automatically initialized on page load
- Tracks page visits, form interactions, phone clicks
- Sets user properties in Google Analytics
- Stores audiences in localStorage for persistence
- Sends events to Google Ads for audience building

### Implementation

**Already integrated:**
- ✅ Automatically initialized in `AnalyticsInitializer` component
- ✅ Tracks all page visits
- ✅ Tracks form starts and abandons
- ✅ Tracks phone button clicks

### Using in Google Ads

1. Go to Google Ads → Tools & Settings → Audience Manager
2. Create audiences based on:
   - **Website visitors** who triggered `remarketing_audience` event
   - Filter by `audience_type` parameter
3. Create remarketing campaigns:
   - **Form Abandoners Campaign** - Target users who started but didn't complete forms
   - **Quote Page Visitors** - Target users who visited quote page but didn't convert
   - **High Intent Visitors** - Target users showing high engagement

### Expected ROI

Remarketing typically has **2-3x better ROI** than cold traffic because:
- Users already know your brand
- They've shown intent (visited quote page, started form)
- Lower cost per click
- Higher conversion rates

---

## 3. A/B Testing Framework

### What It Does

Provides a framework for running A/B tests on your website. Test different variations of:
- Form length (short vs long)
- CTA button text
- Headlines
- Landing page layouts
- Any other element

### How It Works

- Randomly assigns users to variants (A, B, C, D)
- Persists variant assignment in localStorage
- Tracks conversions and interactions per variant
- Sends data to Google Analytics for analysis

### Usage Example

```tsx
import { useABTest, AB_TEST_CONFIGS } from "@/hooks/useABTest";

function MyComponent() {
  const { variant, trackConversion } = useABTest(AB_TEST_CONFIGS.FORM_LENGTH);

  return (
    <div>
      {variant === "A" ? (
        <ShortForm onComplete={() => trackConversion("form_submit")} />
      ) : (
        <LongForm onComplete={() => trackConversion("form_submit")} />
      )}
    </div>
  );
}
```

### Predefined Tests

- `FORM_LENGTH` - Test short vs long forms
- `CTA_BUTTON` - Test different CTA button text
- `HEADLINE` - Test different headlines

### Creating New Tests

```tsx
import { abTesting } from "@/utils/analytics/abTesting";

const myTest = {
  testName: "My Custom Test",
  variants: ["A", "B"],
  defaultVariant: "A",
  storageKey: "ab_test_my_custom_test",
};

const variant = abTesting.initTest(myTest);
```

### Analyzing Results

1. Go to Google Analytics → Events
2. Filter by `ab_test_conversion` event
3. Compare conversion rates by variant
4. Use statistical significance calculator to determine winner

---

## 4. Detailed Analytics Tracking

### What It Does

Tracks comprehensive user engagement metrics:
- **Scroll depth** - How far users scroll (25%, 50%, 75%, 90%, 100%)
- **Time on page** - Actual visible time (excludes tab switches)
- **Click tracking** - Tracks clicks on buttons, links, forms
- **Engagement score** - Calculated score based on all interactions

### Metrics Tracked

1. **Scroll Depth**
   - Milestones: 25%, 50%, 75%, 90%, 100%
   - Tracks when each milestone is reached
   - Sends `scroll_depth` event

2. **Time on Page**
   - Only counts time when page is visible
   - Tracks milestones: 30s, 1min, 2min, 5min
   - Sends `time_on_page` event

3. **Click Tracking**
   - Tracks clicks on buttons, links, form elements
   - Captures element type, text, href
   - Sends `element_click` event

4. **Engagement Score**
   - Calculated on page leave
   - Formula: Time score + Scroll score + Interaction score
   - Max score: 15 points
   - Sends `engagement_score` event

### Implementation

**Already integrated:**
- ✅ Automatically initialized in `AnalyticsInitializer` component
- ✅ Tracks all pages automatically
- ✅ Cleans up on page navigation

### Using the Data

1. **Identify High-Engagement Pages**
   - Filter by `engagement_score` > 10
   - These pages are working well - optimize similar pages

2. **Identify Low-Engagement Pages**
   - Filter by `engagement_score` < 5
   - These pages need improvement

3. **Optimize Based on Scroll Depth**
   - If most users only scroll 25%, move important content higher
   - If users scroll 100%, page is engaging

4. **Optimize Based on Time**
   - Short time (< 30s) = content not engaging
   - Long time (> 2min) = content is engaging

---

## 📊 Viewing Analytics Data

### Google Ads (Primary - You Have This!)

**Conversion Events:**
1. Go to Google Ads → Tools & Settings → Conversions
2. See all conversion events (form submissions, phone clicks)
3. View conversion rates, costs, ROI

**Remarketing Audiences:**
1. Go to Google Ads → Tools & Settings → Audience Manager
2. Create audiences based on events:
   - `form_starter` - Users who started forms
   - `form_abandoner` - Users who abandoned forms
   - `quote_page_visitor` - Users who visited quote page
   - `phone_clicker` - Users who clicked phone buttons
3. Use audiences in campaigns for retargeting

**Note:** All events are sent via `gtag` and work with Google Ads. You don't need Google Analytics for remarketing audiences to work!

### Google Analytics (Optional - For Detailed Reports)

If you set up Google Analytics (free), you can view:
1. Go to Google Analytics → Events
2. Filter by event category:
   - **Form** - Form abandonment tracking
   - **Remarketing** - Remarketing audience events
   - **A/B Testing** - A/B test events
   - **Engagement** - Detailed analytics events

**But:** Google Analytics is optional - your Google Ads account can use all the events for remarketing!

1. Go to Google Ads → Tools & Settings → Audience Manager
2. View audiences based on events
3. Create remarketing campaigns

### Key Metrics to Monitor

**Form Abandonment:**
- `form_abandon` events / `form_start` events = Abandonment rate
- Target: < 50% abandonment rate

**Remarketing:**
- Audience sizes (need 1,000+ for Google Ads)
- Conversion rates by audience

**A/B Tests:**
- Conversion rates by variant
- Statistical significance

**Engagement:**
- Average engagement score
- Scroll depth distribution
- Time on page distribution

---

## 🚀 Next Steps

### Immediate Actions

1. **Set Up Remarketing Campaigns**
   - Create audiences in Google Ads
   - Set up remarketing campaigns
   - Allocate 20-30% of budget to remarketing

2. **Monitor Form Abandonment**
   - Check which forms have high abandonment
   - Identify which step causes most abandonments
   - Optimize those steps

3. **Run A/B Tests**
   - Start with form length test
   - Test CTA button text
   - Test headlines

4. **Analyze Engagement Data**
   - Identify low-engagement pages
   - Optimize based on scroll depth
   - Improve content for better time on page

### Long-term Optimization

1. **Continuous A/B Testing**
   - Always be testing something
   - Test one element at a time
   - Use statistical significance

2. **Remarketing Optimization**
   - Test different ad copy for different audiences
   - Adjust bids based on audience performance
   - Create lookalike audiences

3. **Form Optimization**
   - Reduce fields based on abandonment data
   - Add progress indicators
   - Improve validation messages

---

## 📝 Technical Details

### Files Created

- `src/utils/analytics/formAbandonment.ts` - Form abandonment tracking
- `src/utils/analytics/remarketing.ts` - Remarketing audience management
- `src/utils/analytics/abTesting.ts` - A/B testing framework
- `src/utils/analytics/detailedTracking.ts` - Detailed analytics tracking
- `src/hooks/useFormAbandonmentTracking.ts` - React hook for form tracking
- `src/hooks/useABTest.ts` - React hook for A/B testing
- `src/components/Analytics/AnalyticsInitializer.tsx` - Initializes all tracking

### Integration Points

- `src/app/layout.tsx` - AnalyticsInitializer component added
- `src/features/quote/components/Quote/QuoteStep3/index.tsx` - Form tracking added
- `src/components/HeroQuickQuote/index.tsx` - Form tracking added
- `src/features/quote/components/QuickQuote/index.tsx` - Form tracking added
- `src/features/contact/components/Contact/index.tsx` - Form tracking added

---

## ✅ Summary

All four analytics features are now implemented and active:

1. ✅ **Form Abandonment Tracking** - Tracking all forms
2. ✅ **Remarketing Audiences** - Automatically categorizing users
3. ✅ **A/B Testing Framework** - Ready to use for testing
4. ✅ **Detailed Analytics** - Tracking engagement on all pages

**Next:** Set up remarketing campaigns in Google Ads and start running A/B tests!
