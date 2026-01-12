# Google Ads Setup Guide - Required Actions

## ✅ What's Already Working (No Action Needed)

These are **automatically working** - no Google Ads setup required:

1. ✅ **Conversion Tracking** - Already set up and working
   - Form submissions tracked
   - Phone clicks tracked
   - All conversions firing correctly

2. ✅ **Event Tracking** - Events are being sent automatically
   - Form start events
   - Form abandonment events
   - Page visit events
   - Engagement events

---

## 🎯 What You NEED to Do in Google Ads

### Step 1: Create Remarketing Audiences (Required for Remarketing)

**Time: 10-15 minutes**

1. **Go to Google Ads**
   - Navigate to **Tools & Settings** (wrench icon)
   - Click **Audience Manager** under "Shared Library"

2. **Create Your First Audience: Form Abandoners**
   - Click the **"+"** button
   - Select **"Website visitors"**
   - Choose **"Custom combination"**
   - Add condition:
     - **Event** = `form_abandon`
     - **Event category** = `Form`
   - Name it: "Form Abandoners"
   - Click **"Create"**

3. **Create Audience: Form Starters**
   - Click **"+"** again
   - Select **"Website visitors"**
   - Choose **"Custom combination"**
   - Add condition:
     - **Event** = `form_start`
     - **Event category** = `Form`
   - Name it: "Form Starters"
   - Click **"Create"**

4. **Create Audience: Quote Page Visitors**
   - Click **"+"** again
   - Select **"Website visitors"**
   - Choose **"URL contains"**
   - Enter: `/quote`
   - Name it: "Quote Page Visitors"
   - Click **"Create"**

5. **Create Audience: Phone Clickers**
   - Click **"+"** again
   - Select **"Website visitors"**
   - Choose **"Custom combination"**
   - Add condition:
     - **Event** = `remarketing_audience`
     - **Event label** contains `phone_clicker`
   - Name it: "Phone Clickers"
   - Click **"Create"**

6. **Create Audience: High Intent Visitors**
   - Click **"+"** again
   - Select **"Website visitors"**
   - Choose **"Custom combination"**
   - Add condition:
     - **Event** = `remarketing_audience`
     - **Event label** contains `high_intent_visitor`
   - Name it: "High Intent Visitors"
   - Click **"Create"**

**Note:** Audiences need at least **1,000 active users** before they can be used in campaigns. This may take a few days to a week depending on your traffic.

---

### Step 2: Link Google Analytics (Optional but Recommended)

**Time: 5 minutes**

**Why:** While not required, linking Google Analytics gives you:
- Better event reports
- User behavior insights
- Easier audience creation

**Steps:**

1. **Set Up Google Analytics** (if you haven't)
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create account (free)
   - Get your Measurement ID (G-XXXXXXXXXX)
   - Add to `.env` file:
     ```bash
     NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
     ```

2. **Link to Google Ads**
   - In Google Ads, go to **Tools & Settings**
   - Click **Linked accounts**
   - Find **Google Analytics** and click **Details**
   - Click **Link** and select your Analytics account
   - Click **Link**

**Note:** This is optional - your remarketing will work without it, but you'll get better insights with it.

---

### Step 3: Create Remarketing Campaigns (After Audiences Reach 1,000+ Users)

**Time: 15-20 minutes per campaign**

**Wait until:** Your audiences have at least 1,000 active users (check in Audience Manager)

1. **Create Campaign: Form Abandoners**
   - Go to **Campaigns** → Click **"+"** → **New campaign**
   - Select **"Website traffic"** or **"Leads"**
   - Choose **"Search"** or **"Display"** network
   - Campaign name: "Remarketing - Form Abandoners"
   - Set daily budget
   - In **Audiences** section:
     - Add "Form Abandoners" audience
     - Set bid adjustment: **+20%** (higher intent)
   - Create ad groups with messaging like:
     - "Complete your quote in 30 seconds"
     - "Finish your quote request"
     - "Get your free quote now"

2. **Create Campaign: Quote Page Visitors**
   - Similar setup
   - Target: "Quote Page Visitors" audience
   - Messaging: "Get your free quote today"
   - Bid adjustment: **+15%**

3. **Create Campaign: High Intent Visitors**
   - Target: "High Intent Visitors" audience
   - Messaging: "Ready to get started? Get your quote now"
   - Bid adjustment: **+25%** (highest intent)

---

### Step 4: Verify Events Are Being Received (Optional Check)

**Time: 5 minutes**

1. **In Google Ads:**
   - Go to **Tools & Settings** → **Conversions**
   - Check that your conversion actions show recent conversions
   - This confirms events are being received

2. **In Browser (Development Check):**
   - Open your website
   - Open **DevTools** (F12)
   - Go to **Network** tab
   - Filter by **"collect"** or **"google-analytics"**
   - Submit a form or click a phone button
   - You should see requests to `google-analytics.com/collect`
   - This confirms events are being sent

---

## 📋 Quick Checklist

### Immediate (Do Now)
- [ ] Create remarketing audiences in Google Ads (Step 1)
- [ ] Wait for audiences to reach 1,000+ users (may take days/weeks)

### After Audiences Are Ready
- [ ] Create remarketing campaigns (Step 3)
- [ ] Set appropriate bid adjustments
- [ ] Monitor performance

### Optional (But Recommended)
- [ ] Set up Google Analytics account
- [ ] Link Google Analytics to Google Ads
- [ ] Verify events are being received (Step 4)

---

## ⏱️ Timeline

**Week 1:**
- ✅ Code is already working (events being sent)
- ✅ Create audiences in Google Ads
- ⏳ Wait for audiences to populate (need 1,000+ users)

**Week 2-3:**
- ✅ Audiences should have enough users
- ✅ Create remarketing campaigns
- ✅ Start seeing results

**Ongoing:**
- Monitor campaign performance
- Adjust bids based on performance
- Create new audiences as needed

---

## 🎯 Expected Results

**After Setup:**
- Remarketing campaigns targeting high-intent users
- 2-3x better ROI than cold traffic campaigns
- Lower cost per lead
- Higher conversion rates

**Key Metrics to Watch:**
- Audience sizes (need 1,000+)
- Conversion rates by audience
- Cost per conversion
- ROI by campaign

---

## ❓ Common Questions

**Q: Do I need to wait for audiences to populate?**
A: Yes, Google Ads needs at least 1,000 active users in an audience before you can use it in campaigns. This usually takes a few days to a week.

**Q: Can I use audiences before they reach 1,000 users?**
A: No, Google Ads requires minimum audience size for privacy and effectiveness reasons.

**Q: Will events work without Google Analytics?**
A: Yes! Events are sent via `gtag` which works with Google Ads directly. Google Analytics is optional for better insights.

**Q: How do I know if events are working?**
A: Check Google Ads → Conversions to see if conversion events are being received. Also check Audience Manager to see if audiences are growing.

**Q: What if my audiences aren't growing?**
A: Make sure:
- Your website is getting traffic
- Events are being sent (check browser DevTools)
- Google Ads tag is properly installed (it is - we verified this)

---

## 📞 Need Help?

If you need help with any step:
1. Check the [Google Ads Help Center](https://support.google.com/google-ads)
2. Review the [Audience Manager Guide](https://support.google.com/google-ads/answer/2476688)
3. Contact Google Ads support

---

## ✅ Summary

**What You MUST Do:**
1. ✅ Create remarketing audiences in Google Ads (Step 1)
2. ✅ Wait for audiences to reach 1,000+ users
3. ✅ Create remarketing campaigns (Step 3)

**What's Already Working:**
- ✅ Conversion tracking (no setup needed)
- ✅ Event tracking (no setup needed)
- ✅ All code is implemented and working

**What's Optional:**
- ⚪ Link Google Analytics (for better insights)
- ⚪ Verify events (for peace of mind)

**Bottom Line:** The code is working. You just need to create the audiences and campaigns in Google Ads to start using the data for remarketing!
