# Vercel Environment Variables Setup for Live Chat

## Quick Setup

Run these commands to add environment variables to Vercel:

```bash
# Make sure you're logged in to Vercel CLI
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_LIVE_CHAT_PROVIDER production
# When prompted, enter: tawk

vercel env add NEXT_PUBLIC_TAWK_PROPERTY_ID production
# When prompted, enter: 6950203e0bf7cd197db9d0b8

vercel env add NEXT_PUBLIC_TAWK_WIDGET_ID production
# When prompted, enter: 1jdgfrtoi

# Also add for preview and development environments
vercel env add NEXT_PUBLIC_LIVE_CHAT_PROVIDER preview
vercel env add NEXT_PUBLIC_LIVE_CHAT_PROVIDER development

vercel env add NEXT_PUBLIC_TAWK_PROPERTY_ID preview
vercel env add NEXT_PUBLIC_TAWK_PROPERTY_ID development

vercel env add NEXT_PUBLIC_TAWK_WIDGET_ID preview
vercel env add NEXT_PUBLIC_TAWK_WIDGET_ID development

# Redeploy
vercel --prod
```

## Verify Variables Are Set

```bash
# List all environment variables
vercel env ls
```

## Important Notes

- `NEXT_PUBLIC_*` variables are embedded at **build time**
- After adding variables, you **must redeploy** for them to take effect
- Variables are case-sensitive
- Make sure to add to all environments (Production, Preview, Development)

## Troubleshooting

If chat widget still doesn't appear after adding variables:

1. **Check browser console** for errors
2. **Verify variables are set**: `vercel env ls`
3. **Redeploy**: Push a new commit or manually redeploy
4. **Clear browser cache** and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
5. **Check network tab** to see if Tawk.to script is loading

