# How to Find Google Ads Conversion Label Suffixes

## Step-by-Step Instructions

### Method 1: From Google Ads Dashboard (Recommended)

1. **Log in to Google Ads**
   - Go to https://ads.google.com
   - Sign in with your account

2. **Navigate to Conversions**
   - Click on **Tools & Settings** (wrench icon) in the top right
   - Under "Measurement", click **Conversions**

3. **Find Your Conversion Actions**
   - You'll see a list of all your conversion actions
   - Based on your dashboard, you should see:
     - "Web Lead"
     - "Web Hero Quick Lead"
     - "Web Quick Lead"
     - "Hero Phone Call"
     - "Quick Phone Call"

4. **Get the Conversion Label for Each**
   - **Click on each conversion action** (e.g., click "Web Lead")
   - Look for the **"Tag setup"** or **"Tag details"** section
   - You'll see something like:
     ```
     Conversion ID: AW-11248564671
     Conversion Label: EhUQCLz8kKoaEL_z3fMp
     ```
   - **Copy the Conversion Label** (this is the suffix you need)

5. **Alternative: Check the Tag Code**
   - In the conversion action details, look for **"Tag setup"**
   - You might see code like:
     ```javascript
     gtag('event', 'conversion', {
       'send_to': 'AW-11248564671/EhUQCLz8kKoaEL_z3fMp'
     });
     ```
   - The full label is: `AW-11248564671/EhUQCLz8kKoaEL_z3fMp`
   - You only need the part after the slash: `EhUQCLz8kKoaEL_z3fMp`

### Method 2: From Google Tag Manager (If You Use GTM)

1. **Open Google Tag Manager**
2. **Go to Tags** → Find your Google Ads conversion tags
3. **Click on a conversion tag**
4. **Look for the Conversion Label** field
5. **Copy the label** (suffix only, without the account ID)

### Method 3: From Your Existing Code (If Already Set Up)

If you had these set up before, you might find them in:
- Old environment variables
- Previous code commits
- Google Ads API responses

## Mapping Your Conversions

Based on your Google Ads dashboard, here's what to look for:

| Google Ads Conversion Name | Environment Variable | What to Find |
|---------------------------|---------------------|--------------|
| **Web Lead** | `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX` | Conversion label for "Web Lead" |
| **Web Hero Quick Lead** | `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_HERO_QUOTE_SUFFIX` | Conversion label for "Web Hero Quick Lead" |
| **Web Quick Lead** | `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_SUFFIX` | Conversion label for "Web Quick Lead" |
| **Hero Phone Call** | `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PHONE_CALL_SUFFIX` | Conversion label for "Hero Phone Call" |
| **Quick Phone Call** | `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUICK_QUOTE_PHONE_SUFFIX` | Conversion label for "Quick Phone Call" |

## Example

If you see in Google Ads:
- **Conversion ID**: `AW-11248564671`
- **Conversion Label**: `EhUQCLz8kKoaEL_z3fMp`

Then in your `.env` file:
```bash
NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID=AW-11248564671
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_FORM_SUFFIX=EhUQCLz8kKoaEL_z3fMp
```

## If You Can't Find the Labels

If the conversion actions show "Needs attention" or you can't find the labels:

1. **Create New Conversion Actions**
   - In Google Ads → Conversions → Click the **+** button
   - Choose "Website" as the source
   - Set up each conversion type
   - Google will generate new conversion labels

2. **Check Conversion Settings**
   - Make sure the conversion actions are set to "Website"
   - Check if they're using "Google tag" or "Google Tag Manager"
   - The label should be visible in the tag setup section

3. **Contact Google Ads Support**
   - If you still can't find them, contact Google Ads support
   - They can help you locate or regenerate conversion labels

## Quick Checklist

- [ ] Logged into Google Ads
- [ ] Navigated to Tools & Settings → Conversions
- [ ] Found all 5 conversion actions
- [ ] Clicked on each conversion action
- [ ] Found the "Conversion Label" or "Tag setup" section
- [ ] Copied the label (suffix only, without AW-XXXXXXXXX/)
- [ ] Added to .env file with correct variable names

## Visual Guide Locations

In Google Ads, the conversion label is typically found in:
- **Conversion action details page** → "Tag setup" section
- **Tag details** → Shows the full `AW-XXXXXXXXX/LABEL` format
- **Installation instructions** → Code snippet shows the label

Look for text that says:
- "Conversion Label:"
- "send_to: 'AW-XXXXXXXXX/LABEL'"
- Or in the tag installation code
