# Google Business Profile (GBP) Verification & Setup Guide

## FlushJohn - Action Plan

---

## 🚨 **CRITICAL: GBP NOT VERIFIED**

**Current Status:** Your business is "Not publicly visible" - customers cannot find you on Google Search or Maps.

**Impact:** Until verified, your business will NOT appear in:

- Google Search results
- Google Maps
- Local pack results
- "Near me" searches

---

## ✅ **STEP 1: VERIFY YOUR GBP PROFILE (HIGHEST PRIORITY)**

### **Verification Process:**

1. **Go to Google Business Profile Dashboard**

   - Visit: https://business.google.com
   - Sign in with your Google account

2. **Click "Get verified" button**

   - You should see a prompt: "Get verified to let them find you on Google"

3. **Choose Verification Method:**

   - **Postcard (Recommended):** Google will mail a postcard to your business address
   - **Address:** 8 The Green STE R, Dover, DE 19901
   - **Timeline:** 5-7 business days

4. **Enter Verification Code:**

   - Once postcard arrives, enter the code in GBP dashboard
   - Your business will be verified immediately

5. **Alternative Methods (if available):**
   - Phone verification (if eligible)
   - Email verification (if eligible)
   - Video verification (for some businesses)

### **Important Notes:**

- ✅ Use the exact address: **8 The Green STE R, Dover, DE 19901**
- ✅ Make sure someone can receive mail at this address
- ✅ The postcard will have a unique verification code
- ✅ Code expires after 30 days

---

## ✅ **STEP 2: ADD ALL SERVICE AREAS**

### **Current Status:** Only 4 cities listed (Austin, Dallas + 2 others)

### **Required:** All 25 cities across 6 states

### **How to Add Service Areas:**

1. **Go to GBP Dashboard → Edit profile → Service areas**

2. **Add Each City Individually:**

   **Delaware (1 city):**

   - Dover, DE

   **Texas (5 cities):**

   - Houston, TX
   - Dallas, TX
   - Austin, TX
   - San Antonio, TX
   - Fort Worth, TX

   **Florida (5 cities):**

   - Miami, FL
   - Orlando, FL
   - Tampa, FL
   - Jacksonville, FL
   - Fort Lauderdale, FL

   **California (5 cities):**

   - Los Angeles, CA
   - San Diego, CA
   - Sacramento, CA
   - San Jose, CA
   - Fresno, CA

   **Georgia (5 cities):**

   - Atlanta, GA
   - Savannah, GA
   - Augusta, GA
   - Macon, GA
   - Columbus, GA

   **Illinois (5 cities):**

   - Chicago, IL
   - Springfield, IL
   - Peoria, IL
   - Rockford, IL
   - Naperville, IL

3. **Mark as Service-Area Business:**
   - Enable "Service-area business" option
   - Select "No customer visits" (since you deliver to customers)

---

## ✅ **STEP 3: VERIFY BUSINESS CATEGORY**

### **Current:** "Portable toilet supplier" ✅

### **Status:** This is the correct and only available category in GBP

### **Note:**

- "Portable toilet supplier" is the appropriate category for your business type
- This is the only option available in Google Business Profile
- No changes needed - your category is already correct
- This category correctly identifies you as a supplier of portable toilets

---

## ✅ **STEP 4: ENABLE SERVICE-AREA BUSINESS ATTRIBUTES**

### **Required Attributes:**

1. **Service-area business:** ✅ Enable (see detailed guide below)
2. **No customer visits:** ✅ Enable (you deliver to customers)
3. **Business hours:** ✅ Already set to 08:00-20:00 (keep this)
4. **Phone:** ✅ Already correct (877) 790-7062
5. **Website:** ✅ Already correct https://www.flushjohn.com/

### **How to Enable Service-Area Business Attributes:**

**Quick Steps:**

1. Go to GBP Dashboard → **Edit profile**
2. Find **"Business information"** or **"Attributes"** section
3. Enable **"Service-area business"** checkbox/toggle
4. Enable **"No customer visits"** or **"No storefront"** checkbox/toggle
5. Save changes

**📖 For detailed step-by-step instructions, see:** `GBP_SERVICE_AREA_SETUP.md`

---

## ✅ **STEP 5: MATCH WEBSITE HOURS TO GBP**

### **GBP Hours:** 08:00-20:00

### **Website Hours:** Currently inconsistent (07:00-19:00 vs 00:00-23:59)

**Action:** Update all website schemas to match GBP hours (08:00-20:00)

**Files to Update:**

- `src/app/page.tsx`
- `src/app/contact/page.tsx`
- `src/features/locations/components/Locations/PortaPottyRentalCity/index.tsx`
- `src/components/SEO/EnhancedStructuredData/index.tsx`

---

## ✅ **STEP 6: ADD GBP CONTENT (After Verification)**

### **Photos:**

- Upload at least 10-20 photos of:
  - Your porta potty units
  - Delivery trucks
  - Setup at events/construction sites
  - Team photos
  - Logo/branding

### **Posts:**

- Post regularly (1-2 times per week):
  - Service area announcements
  - Seasonal tips
  - Customer testimonials
  - Special offers

### **Q&A:**

- Monitor and answer questions promptly
- Add common questions proactively

### **Reviews:**

- Respond to all reviews (positive and negative)
- Encourage satisfied customers to leave reviews

---

## 📋 **VERIFICATION CHECKLIST**

- [ ] Clicked "Get verified" in GBP dashboard
- [ ] Chose postcard verification method
- [ ] Confirmed address: 8 The Green STE R, Dover, DE 19901
- [ ] Waiting for postcard (5-7 business days)
- [ ] Entered verification code when received
- [ ] Business is now verified and visible
- [ ] Added all 25 service areas
- [x] Verified business category (Already correct: "Portable toilet supplier")
- [ ] Enabled "Service-area business" attribute
- [ ] Enabled "No customer visits" attribute
- [ ] Verified hours match website (08:00-20:00)
- [ ] Uploaded photos
- [ ] Created first post

---

## ⚠️ **IMPORTANT NOTES**

1. **Verification is Required:** Your business will NOT appear in Google Search or Maps until verified.

2. **Service-Area Business:** Since you deliver to customers, make sure "Service-area business" and "No customer visits" are enabled.

3. **Address Usage:** The Dover, DE address is for verification only. You serve 25 cities but don't have a physical storefront.

4. **Consistency:** Ensure all information matches between GBP and your website:

   - Business name: FlushJohn
   - Phone: (877) 790-7062
   - Website: https://www.flushjohn.com/
   - Hours: 08:00-20:00

5. **After Verification:** Once verified, your business will start appearing in local search results. It may take 1-2 weeks for full visibility.

---

## 🎯 **PRIORITY ORDER**

1. **🚨 VERIFY GBP** (Do this first - nothing else matters until verified)
2. **Add all 25 service areas** (Do immediately after verification)
3. **Verify business category** (Already correct: "Portable toilet supplier")
4. **Match website hours to GBP** (✅ Already done - 08:00-20:00)
5. **Add photos and content** (Do after verification)

---

## 📞 **NEED HELP?**

- Google Business Profile Help: https://support.google.com/business
- Verification Help: https://support.google.com/business/answer/7107242
- Service Area Help: https://support.google.com/business/answer/3038177

---

**Last Updated:** December 2025
**Status:** Waiting for GBP verification
