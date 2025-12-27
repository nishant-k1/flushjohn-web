# Live Chat Support Setup Guide

This guide explains how to set up live chat support on the FlushJohn website.

## Supported Providers

The LiveChat component supports multiple chat providers:

1. **Tawk.to** (Recommended - Free) ✅
2. **Intercom** (Paid)
3. **Crisp** (Free tier available)
4. **Custom** (Your own implementation)

## Quick Setup - Tawk.to (Recommended)

Tawk.to is free and provides excellent features for customer support.

### Step 1: Create Tawk.to Account

1. Go to [https://www.tawk.to/](https://www.tawk.to/)
2. Sign up for a free account
3. Create a new property for your website
4. You'll receive:
   - **Property ID** (e.g., `1234567890abcdef1234567890abcdef`)
   - **Widget ID** (e.g., `1abcdefgh`)

### Step 2: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Live Chat Configuration
NEXT_PUBLIC_LIVE_CHAT_PROVIDER=tawk
NEXT_PUBLIC_TAWK_PROPERTY_ID=6950203e0bf7cd197db9d0b8
NEXT_PUBLIC_TAWK_WIDGET_ID=1jdgfrtoi
```

**Note:** These are your actual Tawk.to credentials. Make sure `.env.local` is in your `.gitignore` file to keep credentials secure.

### Step 3: Restart Your Development Server

```bash
npm run dev
```

The chat widget will now appear on your website!

## Alternative Providers

### Intercom Setup

1. Sign up at [https://www.intercom.com/](https://www.intercom.com/)
2. Get your App ID from Intercom settings
3. Add to `.env.local`:

```bash
NEXT_PUBLIC_LIVE_CHAT_PROVIDER=intercom
NEXT_PUBLIC_INTERCOM_APP_ID=your_app_id_here
```

### Crisp Setup

1. Sign up at [https://crisp.chat/](https://crisp.chat/)
2. Get your Website ID from Crisp dashboard
3. Add to `.env.local`:

```bash
NEXT_PUBLIC_LIVE_CHAT_PROVIDER=crisp
NEXT_PUBLIC_CRISP_WEBSITE_ID=your_website_id_here
```

## Disable Live Chat

To disable live chat, set:

```bash
NEXT_PUBLIC_LIVE_CHAT_PROVIDER=none
```

Or simply don't set the environment variable.

## Features

- ✅ **Lazy Loading**: Chat widget loads after page is interactive (doesn't block page load)
- ✅ **Multiple Providers**: Easy to switch between providers
- ✅ **Environment-Based**: Configure via environment variables
- ✅ **Production Ready**: Only loads in production if configured

## Customization

### Tawk.to Customization

After setup, you can customize:

- Widget appearance (colors, position, size)
- Welcome messages
- Operating hours
- Auto-responses
- Chat routing rules

All customization is done in the Tawk.to dashboard.

### Custom Implementation

To add your own chat provider:

1. Edit `/src/components/LiveChat/index.tsx`
2. Add your provider logic in the `custom` case
3. Set `NEXT_PUBLIC_LIVE_CHAT_PROVIDER=custom`

## Testing

1. Set up your chosen provider
2. Configure environment variables
3. Restart your dev server
4. Visit your website - chat widget should appear in bottom-right corner
5. Test sending a message

## Troubleshooting

### Chat widget not appearing?

1. Check environment variables are set correctly
2. Verify provider IDs are correct
3. Check browser console for errors
4. Ensure you're not in development mode (some providers require production)
5. Clear browser cache and reload

### Widget loads but doesn't connect?

1. Verify your provider account is active
2. Check provider dashboard for any errors
3. Ensure your domain is whitelisted (if required by provider)

## Performance Notes

- Chat scripts load with `lazyOnload` strategy (after page is interactive)
- No impact on Core Web Vitals
- Minimal bundle size increase
- Third-party scripts are loaded asynchronously

## Support

For provider-specific issues:

- **Tawk.to**: [https://help.tawk.to/](https://help.tawk.to/)
- **Intercom**: [https://www.intercom.com/help/](https://www.intercom.com/help/)
- **Crisp**: [https://docs.crisp.chat/](https://docs.crisp.chat/)
