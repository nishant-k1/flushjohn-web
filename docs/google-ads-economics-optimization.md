# Google Ads Economics Optimization Guide

## Current Economics Overview

**Your Business Model:**
- 20 leads = 1 booking (5% conversion rate)
- $50 profit per booking
- Expected profit per lead = $2.50 USD

**Current Conversion Values:**
- Quote Page Form: $3.00 USD
- Hero Quick Quote: $2.50 USD
- Modal Quick Quote: $2.50 USD
- Contact Form: $2.00 USD

---

## 🎯 Priority 1: Improve Conversion Rate (Biggest Impact)

### Goal: Increase from 5% to 10%+ conversion rate

**Impact:** If you convert 10% instead of 5%, your expected profit per lead doubles from $2.50 to $5.00!

### 1.1 Form Optimization (Reduce Abandonment)

**Current Issues to Address:**
- Forms may be too long (causing abandonment)
- Too many required fields
- No progress indicators
- No trust signals during form

**Recommendations:**

#### A. Reduce Form Fields (Quick Win)
- **Quote Page Form:** Currently has many fields. Consider:
  - Make some fields optional initially
  - Use progressive disclosure (show more fields as user progresses)
  - Pre-fill city/state from IP geolocation

#### B. Add Progress Indicators
```tsx
// Example: Show "Step 1 of 3" in multi-step forms
// This reduces abandonment by 10-15%
```

#### C. Add Trust Signals
- "We'll call you within 2 hours"
- "Free quotes, no obligation"
- "Serving [X] customers"
- Security badges
- Customer testimonials near form

#### D. Exit-Intent Popups
- When user tries to leave, show: "Wait! Get your free quote in 30 seconds"
- Offer quick quote option

### 1.2 Landing Page Speed Optimization

**Impact:** 1 second delay = 7% conversion drop

**Check:**
- Page load time < 3 seconds
- Form loads immediately (no lazy loading)
- Images optimized (WebP format)
- Scripts loaded asynchronously

**Current Status:** ✅ You have Web Vitals tracking - monitor LCP, FCP, TTFB

### 1.3 Mobile Optimization

**Impact:** 60%+ of traffic is mobile

**Check:**
- Forms are mobile-friendly (large touch targets)
- Phone buttons are easily tappable
- No horizontal scrolling
- Fast mobile load times

---

## 💰 Priority 2: Reduce Cost Per Lead (CPL)

### Goal: Lower your ad spend while maintaining lead quality

### 2.1 Negative Keywords (Immediate Win)

**Impact:** Can reduce wasted spend by 20-30%

**Add negative keywords for:**
- "free" (unless you offer free quotes)
- "cheap" / "discount"
- "DIY" / "how to build"
- Competitor names (if not targeting)
- Unrelated services

**How to find:**
1. Google Ads → Keywords → Search Terms
2. Look for irrelevant clicks
3. Add as negative keywords

### 2.2 Improve Quality Score

**Impact:** Higher Quality Score = Lower CPC (up to 50% reduction)

**Factors:**
- **Click-Through Rate (CTR):** Improve ad copy
- **Landing Page Relevance:** Match ad to landing page
- **Ad Relevance:** Match keywords to ad copy

**Actions:**
- Create specific landing pages for each ad group
- Use keywords in ad headlines
- Improve ad copy (more compelling, clear CTA)

### 2.3 Bid Strategy Optimization

**Current:** Use "Maximize Conversions" initially

**After 30+ conversions:**
- Switch to **Target CPA** with target = your current CPA
- Or **Target ROAS** if you want to optimize for profit

**Example:**
- If current CPA = $10 per lead
- Set Target CPA = $8 (gradually reduce)
- Google will optimize to hit that target

### 2.4 Time/Day Bid Adjustments

**Impact:** Reduce bids during low-converting hours

**Steps:**
1. Google Ads → Reports → Time
2. Identify hours/days with low conversion rates
3. Reduce bids by 20-50% during those times
4. Increase bids during high-converting times

---

## 📊 Priority 3: Better Tracking & Analytics

### 3.1 Track Form Abandonment

**Current:** You track form submissions, but not abandonment

**Add:**
- Track when users start form but don't complete
- Track which step they abandon at
- Send to Google Analytics as events

**Implementation:**
```typescript
// Track form start
window.gtag("event", "form_start", {
  event_category: "Form",
  event_label: "Quote Page Form",
});

// Track form abandonment (on page leave)
window.gtag("event", "form_abandon", {
  event_category: "Form",
  event_label: "Quote Page Form - Step 2",
});
```

### 3.2 Track Lead Quality

**Current:** All leads have same value, but quality varies

**Add Lead Quality Scoring:**
- Track which source/landing page converts better
- Track which keywords bring better leads
- Assign different values based on lead source

**Example:**
- Quote Page Form (high intent) = $3.00
- Contact Form (lower intent) = $2.00
- Phone calls (highest intent) = $5.00

### 3.3 Track Customer Journey

**Add:**
- Track time from first visit to conversion
- Track number of touchpoints before conversion
- Track which pages users visit before converting

**Use for:**
- Remarketing to users who didn't convert
- Understanding customer path
- Optimizing landing pages

---

## 🎨 Priority 4: Landing Page Optimization

### 4.1 A/B Testing

**Test These Elements:**

#### A. Headlines
- "Get Your Free Quote Today" vs "Porta Potty Rental Quotes in [City]"
- Test which gets more conversions

#### B. CTA Buttons
- "Get Free Quote" vs "Request Quote Now" vs "Get Started"
- Test colors, sizes, placement

#### C. Form Length
- Short form (3 fields) vs Full form (6+ fields)
- Short form = more leads, but lower quality
- Full form = fewer leads, but higher quality

#### D. Trust Signals
- Test with/without testimonials
- Test with/without "X customers served"
- Test with/without security badges

### 4.2 Social Proof

**Add:**
- Customer testimonials
- "X customers served this month"
- "Average response time: 2 hours"
- Reviews/ratings

**Impact:** Can increase conversion rate by 15-25%

### 4.3 Urgency/Scarcity

**Add:**
- "Limited availability for [date]"
- "Call now for same-day delivery"
- "Only X units left for this weekend"

**Use sparingly** - only if true

---

## 🔄 Priority 5: Remarketing (High ROI)

### 5.1 Create Remarketing Audiences

**High-Value Audiences:**
1. **Form Starters (Didn't Complete)**
   - Visited quote page, started form, didn't submit
   - High intent, just need a nudge

2. **Quote Page Visitors**
   - Visited quote page but didn't start form
   - Show reminder ads

3. **Homepage Visitors (No Action)**
   - Visited homepage, didn't click anything
   - Show general awareness ads

4. **Phone Clickers (No Call)**
   - Clicked phone button but didn't call
   - Show "Call us now" ads

### 5.2 Remarketing Campaign Strategy

**Campaign 1: Form Abandoners**
- Target: Started form, didn't complete
- Message: "Complete your quote in 30 seconds"
- Bid: Higher (high intent)
- Budget: 20% of total

**Campaign 2: Quote Page Visitors**
- Target: Visited quote page, no action
- Message: "Get your free quote today"
- Bid: Medium
- Budget: 15% of total

**Campaign 3: General Visitors**
- Target: Visited site, no conversion
- Message: "Porta Potty Rentals - Free Quotes"
- Bid: Lower
- Budget: 10% of total

**Expected ROI:** Remarketing typically has 2-3x better ROI than cold traffic

---

## 📱 Priority 6: Phone Call Optimization

### 6.1 Call Tracking

**Current:** You track phone clicks, but not actual calls

**Add:**
- Google Call Tracking (call forwarding numbers)
- Track which ads/keywords generate calls
- Track call duration (longer = better lead)

**Impact:** Phone leads often convert 2-3x better than form leads

### 6.2 Call-Only Campaigns

**For High-Intent Keywords:**
- "porta potty rental phone number"
- "call porta potty rental"
- "porta potty rental near me phone"

**Strategy:**
- Use call-only ads (mobile-focused)
- Higher bids (phone calls = highest value)
- Conversion value: $5.00+ (higher than forms)

---

## 🎯 Priority 7: Campaign Structure Optimization

### 7.1 Separate Campaigns by Intent

**Current Structure (Recommended):**

1. **High-Intent Campaign** (Quote-focused)
   - Keywords: "get quote", "request quote", "porta potty quote"
   - Landing Page: `/quote`
   - Conversion: Quote Page Form ($3.00)
   - Budget: 40% of total

2. **Medium-Intent Campaign** (Service-focused)
   - Keywords: "porta potty rental", "rent porta potty"
   - Landing Page: Homepage (with quick quote)
   - Conversion: Hero Quick Quote ($2.50)
   - Budget: 35% of total

3. **Low-Intent Campaign** (General inquiry)
   - Keywords: "porta potty", "portable toilet"
   - Landing Page: Homepage
   - Conversion: Contact Form ($2.00)
   - Budget: 15% of total

4. **Phone Call Campaign**
   - Keywords: "porta potty phone", "call porta potty"
   - Landing Page: Any (phone button prominent)
   - Conversion: Phone calls ($5.00)
   - Budget: 10% of total

### 7.2 Ad Group Structure

**Best Practice:**
- 5-20 keywords per ad group
- All keywords should be similar
- Create specific ads for each ad group

**Example:**
- Ad Group: "Get Quote Keywords"
  - Keywords: "get porta potty quote", "request quote", "free quote"
  - Ad: "Get Your Free Porta Potty Quote Today"

---

## 💡 Priority 8: Advanced Optimizations

### 8.1 Dynamic Search Ads

**For:**
- Capturing long-tail keywords you haven't thought of
- Lower CPC than exact match
- Broader reach

**Strategy:**
- Use for discovery
- Monitor closely
- Add negative keywords for irrelevant traffic

### 8.2 Smart Bidding

**After 30+ conversions per month:**
- Use **Target CPA** or **Target ROAS**
- Let Google's AI optimize bids
- Can improve ROI by 20-30%

### 8.3 Audience Targeting

**Add:**
- Demographics (age, gender, household income)
- Interests (construction, event planning)
- Custom audiences (similar to converters)

**Test:**
- Add audiences as "Observation" first
- See which perform better
- Then add as "Targeting" for underperforming campaigns

### 8.4 Ad Extensions

**Use All Available:**
- Sitelink extensions (link to quote page, contact, etc.)
- Call extensions (phone number)
- Location extensions (if applicable)
- Callout extensions ("Free Quotes", "Same-Day Delivery")
- Structured snippets ("Services", "Products")

**Impact:** Can increase CTR by 10-20%

---

## 📈 Priority 9: Measurement & Reporting

### 9.1 Track These Metrics Weekly

**Key Metrics:**
- Cost Per Lead (CPL) - Target: < $10
- Conversion Rate - Target: > 5%
- Cost Per Conversion - Target: < $200 (20 leads × $10)
- ROI - Target: > 2x (spend $200, get $500 expected profit)
- Click-Through Rate (CTR) - Target: > 2%
- Quality Score - Target: 7+

### 9.2 Create Custom Reports

**Weekly Report:**
- Leads by source (Quote Page, Hero, Modal, Contact, Phone)
- Cost per lead by source
- Conversion rate by source
- ROI by campaign

**Monthly Report:**
- Trends (improving or declining?)
- Best performing keywords
- Best performing ads
- Recommendations for next month

---

## 🚀 Quick Wins (Do These First)

### Week 1: Immediate Actions
1. ✅ Add negative keywords (reduce wasted spend)
2. ✅ Add ad extensions (increase CTR)
3. ✅ Set up remarketing audiences (start collecting data)
4. ✅ Test form length (A/B test short vs long)

### Week 2-3: Optimization
5. ✅ Analyze search terms report (find new keywords, negative keywords)
6. ✅ Pause low-performing ads (save budget)
7. ✅ Increase bids on high-performing keywords
8. ✅ Add trust signals to landing pages

### Week 4: Advanced
9. ✅ Set up call tracking
10. ✅ Create remarketing campaigns
11. ✅ Implement form abandonment tracking
12. ✅ Switch to Target CPA bidding (if 30+ conversions)

---

## 💰 Expected Impact

**If you implement all recommendations:**

**Current Economics:**
- 100 leads/month
- 5% conversion = 5 bookings
- $50 profit × 5 = $250 profit
- Cost: ~$1,000 (assuming $10/lead)
- Net: -$750 (losing money)

**Optimized Economics (Realistic):**
- 100 leads/month (same traffic)
- 8% conversion = 8 bookings (improved form/landing page)
- $50 profit × 8 = $400 profit
- Cost: ~$700 (better targeting, negative keywords)
- Net: -$300 (still losing, but better)

**Optimized Economics (Aggressive):**
- 120 leads/month (better ads, remarketing)
- 10% conversion = 12 bookings
- $50 profit × 12 = $600 profit
- Cost: ~$800 (optimized campaigns)
- Net: -$200 (close to break-even)

**To Actually Profit:**
- Need to either:
  1. Increase conversion rate to 15%+ (better sales process)
  2. Increase profit margin (charge more or reduce costs)
  3. Reduce cost per lead to < $5 (very difficult)
  4. Get more qualified leads (better targeting)

---

## 🎯 Recommended Focus Areas

**Based on your 5% conversion rate, focus on:**

1. **Improve Conversion Rate** (Biggest ROI)
   - Form optimization
   - Landing page improvements
   - Trust signals
   - A/B testing

2. **Reduce Cost Per Lead**
   - Negative keywords
   - Quality Score improvements
   - Better targeting
   - Bid optimization

3. **Remarketing** (High ROI)
   - Target form abandoners
   - Retarget website visitors
   - Lower cost, higher conversion

4. **Lead Quality** (Long-term)
   - Better keyword targeting
   - Better ad copy (set expectations)
   - Pre-qualify leads in forms

---

## 📝 Implementation Checklist

### Immediate (This Week)
- [ ] Add negative keywords to all campaigns
- [ ] Add all ad extensions
- [ ] Set up remarketing audiences
- [ ] Review and pause low-performing ads

### Short-term (This Month)
- [ ] A/B test form length
- [ ] Add trust signals to landing pages
- [ ] Implement form abandonment tracking
- [ ] Set up call tracking
- [ ] Create remarketing campaigns

### Long-term (Next 3 Months)
- [ ] Implement lead quality scoring
- [ ] Switch to Target CPA bidding
- [ ] Create custom landing pages for each ad group
- [ ] Set up advanced audience targeting
- [ ] Implement customer journey tracking

---

## 🔍 Monitoring & Iteration

**Weekly:**
- Review search terms report
- Check conversion rates by source
- Monitor cost per lead
- Adjust bids on under/over-performing keywords

**Monthly:**
- Review overall ROI
- Identify trends
- Test new ad copy
- Optimize landing pages based on data

**Quarterly:**
- Review campaign structure
- Evaluate new features (Smart Bidding, etc.)
- Plan major changes
- Set new goals

---

**Remember:** Google Ads optimization is an ongoing process. Start with quick wins, then gradually implement more advanced strategies as you gather data.
