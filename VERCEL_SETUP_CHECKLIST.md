# Vercel Deployment Checklist

## ✅ Automatic Deployment

If your GitHub repo is connected to Vercel, **it deploys automatically** on every push to `main` branch. You don't need to do anything on the Vercel website!

### What Happens Automatically:
1. ✅ Git push to `main` branch
2. ✅ Vercel detects the push
3. ✅ Build starts automatically
4. ✅ Deploys to production
5. ✅ HTTP/2 is automatically enabled
6. ✅ SSL certificate is automatically provisioned

---

## 🔍 One-Time Setup (If Not Done Already)

### Step 1: Connect GitHub to Vercel

**Only needed if this is a new project:**

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Click **"Deploy"**

That's it! Now every push auto-deploys.

---

## 🔑 Environment Variables Setup

You **DO need to set** environment variables in Vercel Dashboard:

### Required Environment Variables:

Based on your code, you need to set these in Vercel Dashboard:

```
NEXT_PUBLIC_G_TAG_ID
NEXT_PUBLIC_CRM_BASE_URL
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_PHONE_URL
NEXT_PUBLIC_PHONE_NUMBER
```

### How to Set Environment Variables:

1. Go to your project on [vercel.com](https://vercel.com)
2. Click **Settings** → **Environment Variables**
3. Add each variable with its value
4. Click **Save**

**Important:** After adding new environment variables, you need to **redeploy** (or it will auto-redeploy on next push).

---

## 🚀 After Pushing to GitHub

### What Happens:
- ✅ Vercel automatically builds and deploys
- ✅ You get a deployment URL in the Vercel dashboard
- ✅ Build logs show in real-time
- ✅ You'll get a deployment notification when complete

### No Action Needed:
- ❌ Don't need to manually deploy
- ❌ Don't need to click "Deploy" button
- ❌ Don't need to trigger builds

Just **git push** and it deploys automatically!

---

## 📊 Monitoring Deployments

### Check Deployment Status:

1. Go to your project on [vercel.com](https://vercel.com)
2. Click **"Deployments"** tab
3. You'll see:
   - ✅ Current deployment status
   - ✅ Build logs
   - ✅ Preview URLs
   - ✅ Domain configuration

### Recent Changes:

Your latest commits should show in the deployments list:
- `f0efb0c` - feat: add HTTP/2 support configuration
- `901cbea` - refactor: remove inline styles
- `bdd0d27` - perf: optimize page load performance

---

## 🔧 Troubleshooting

### If deployment fails:

1. Check build logs in Vercel Dashboard
2. Look for error messages
3. Common issues:
   - Missing environment variables
   - Build timeout
   - Dependency installation errors

### If changes don't appear:

1. Clear browser cache
2. Check if you pushed to correct branch (`main`)
3. Verify deployment succeeded in Vercel dashboard
4. Check browser console for errors

---

## 🎯 Quick Summary

**Do I need to do anything on Vercel website?**

### For New Projects:
- ✅ Yes - Connect GitHub repo once
- ✅ Yes - Set environment variables once

### For Existing Projects:
- ❌ No - Just push to GitHub
- ✅ Optional - View deployment status/dashboard

**Everything else is automatic!** 🎉

---

## 📱 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Deployment Documentation](https://vercel.com/docs/deployments/overview)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

---

## Next Steps:

1. ✅ Your code is already pushed
2. ✅ Vercel will deploy automatically
3. 🔍 Check Vercel dashboard for deployment status
4. 🔑 **IMPORTANT:** Make sure environment variables are set!

If environment variables are missing, the site might not work correctly!

