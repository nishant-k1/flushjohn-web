# Create Custom Audiences - Step by Step Guide

## 🎯 What You're Seeing

You're in **Audience Manager** and seeing automatically created audiences. These are based on conversion tracking, but we need to create **custom audiences** based on the events we're sending (form_start, form_abandon, etc.).

---

## ✅ Step-by-Step: Create Custom Audiences

### Step 1: Click the "+" Button

1. At the top of the Audience Manager page, click the **"+"** button (usually blue, says "Create new" or similar)
2. A dropdown menu will appear

### Step 2: Select "Website visitors"

1. From the dropdown, select **"Website visitors"**
2. This will open the audience creation form

### Step 3: Create "Form Abandoners" Audience

**Audience Name:** `Form Abandoners`

**Audience Type:** Select **"Custom combination"**

**Conditions:**
1. Click **"Add condition"** or **"+"**
2. Select **"Event"** from the dropdown
3. In the event field, you may need to:
   - Select **"Custom event"** or
   - Enter: `form_abandon`
4. Add another condition (if available):
   - **Event category** = `Form`

**Membership Duration:** 30 days (default is fine)

**Description:** "Users who started but didn't complete forms"

Click **"Create"** or **"Save"**

---

### Step 4: Create "Form Starters" Audience

Click **"+"** again to create another audience:

**Audience Name:** `Form Starters`

**Audience Type:** **"Custom combination"**

**Conditions:**
1. **Event** = `form_start`
2. **Event category** = `Form`

**Description:** "Users who started filling out forms"

Click **"Create"**

---

### Step 5: Create "Quote Page Visitors" Audience

Click **"+"** again:

**Audience Name:** `Quote Page Visitors`

**Audience Type:** **"URL contains"** (this is simpler)

**Condition:**
- **URL contains:** `/quote`

**Description:** "Users who visited the quote page"

Click **"Create"**

---

### Step 6: Create "Phone Clickers" Audience

Click **"+"** again:

**Audience Name:** `Phone Clickers`

**Audience Type:** **"Custom combination"**

**Conditions:**
1. **Event** = `remarketing_audience` OR look for phone-related events
2. Alternative: Look for events with label containing `phone`

**Note:** If you don't see the exact event, you can also create this based on:
- **Event category** = `Phone Call`
- OR create it later when you have more data

Click **"Create"**

---

### Step 7: Create "High Intent Visitors" Audience

Click **"+"** again:

**Audience Name:** `High Intent Visitors`

**Audience Type:** **"Custom combination"**

**Conditions:**
- Combine multiple conditions:
  1. **URL contains:** `/quote` OR
  2. **Event** = `form_start` OR
  3. **Event** = `phone_click` (if available)

**Description:** "Users showing high purchase intent"

Click **"Create"**

---

## ⚠️ Important Notes

### If You Don't See Custom Events

Google Ads might not show custom events immediately. Here are alternatives:

**Option 1: Use URL-Based Audiences (Easier)**
- **Quote Page Visitors:** URL contains `/quote`
- **Contact Page Visitors:** URL contains `/contact`
- These work immediately!

**Option 2: Wait for Events to Populate**
- Custom events may take 24-48 hours to appear
- Check back tomorrow
- Events are being sent, Google just needs to process them

**Option 3: Use Conversion-Based Audiences**
- You already have some conversion-based audiences
- These will work once they populate

---

## 📊 What to Expect

### Immediately After Creation

- Audiences will show **"Populating..."** or **"<1,000"**
- This is normal - they need time to collect users

### After 24-48 Hours

- Check audience sizes
- They should start showing numbers
- Still need 1,000+ to be usable

### Weekly Check

- Check audience sizes every week
- When they hit 1,000+, you can use them in campaigns

---

## 🎯 Quick Start (Simplest Approach)

If custom events aren't showing yet, start with **URL-based audiences**:

1. **Quote Page Visitors**
   - Type: URL contains
   - Value: `/quote`

2. **Contact Page Visitors**
   - Type: URL contains
   - Value: `/contact`

3. **All Website Visitors**
   - Type: All visitors
   - (This one already exists - "All visitors (Google Ads)")

These will work immediately and start populating!

---

## ✅ After Creating Audiences

1. **Wait 24-48 hours** for them to start populating
2. **Check weekly** to see audience growth
3. **When they hit 1,000+**, you can:
   - Add them to existing campaigns
   - Create new remarketing campaigns
   - Set bid adjustments

---

## 📝 Checklist

- [ ] Created "Quote Page Visitors" (URL-based - easiest)
- [ ] Created "Contact Page Visitors" (URL-based)
- [ ] Created "Form Abandoners" (if events available)
- [ ] Created "Form Starters" (if events available)
- [ ] Created "Phone Clickers" (if events available)
- [ ] Set reminder to check audience sizes in 1 week

---

## 🚀 Next Steps

1. **This Week:**
   - Create URL-based audiences (they work immediately)
   - Monitor audience growth

2. **Next Week:**
   - Check if custom event audiences are available
   - Create them if they appear
   - Continue monitoring

3. **When Audiences Hit 1,000+:**
   - Create remarketing campaigns
   - Set bid adjustments
   - Start retargeting!

---

## ❓ Troubleshooting

**Q: I don't see "Custom event" option**
A: Use URL-based audiences instead. They work immediately.

**Q: Events aren't showing up**
A: Wait 24-48 hours. Events are being sent, Google needs to process them.

**Q: All audiences show "<1,000"**
A: This is normal. Focus on getting more traffic first.

**Q: Can I use audiences before 1,000 users?**
A: No, Google Ads requires minimum 1,000 users for privacy and effectiveness.

---

## 💡 Pro Tip

Start with **URL-based audiences** - they're simpler and work immediately:
- Quote Page Visitors
- Contact Page Visitors

These will start populating right away as users visit your site!
