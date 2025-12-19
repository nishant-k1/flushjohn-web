# CDN Cache Configuration Guide

## Problem
Resources from `cdn.flushjohn.com` are missing cache headers, causing Lighthouse to flag "Use efficient cache lifetimes" (246 KiB savings potential).

## Affected Resources
- `hero-img-1.webp` (96 KiB)
- `Merriweather-Regular.ttf` (78 KiB)
- `Poppins-Regular.ttf` (70 KiB)
- `hero_bg.svg` (1 KiB)
- All other static assets from `cdn.flushjohn.com`

## Solution: Configure CDN Cache Headers

### Option 1: CloudFront (AWS)

If using AWS CloudFront, configure cache behaviors:

1. **Go to CloudFront Distribution → Behaviors → Edit**
2. **Set Cache Policy** or create custom headers:

**For Images (webp, jpg, png, svg):**
```
Cache-Control: public, max-age=31536000, immutable, stale-while-revalidate=31536000
```

**For Fonts (ttf, woff, woff2):**
```
Cache-Control: public, max-age=31536000, immutable, stale-while-revalidate=31536000
Access-Control-Allow-Origin: *
```

**Custom Response Headers Policy (CloudFront):**
```json
{
  "CustomHeaders": {
    "Quantity": 1,
    "Items": [
      {
        "Header": "Cache-Control",
        "Value": "public, max-age=31536000, immutable, stale-while-revalidate=31536000",
        "Override": true
      }
    ]
  }
}
```

### Option 2: Cloudflare

If using Cloudflare:

1. **Go to Rules → Transform Rules → Modify Response Header**
2. **Create rule:**

**Rule Expression:**
```
(http.host eq "cdn.flushjohn.com") and (http.request.uri.path matches "\.(webp|jpg|jpeg|png|svg|ttf|woff|woff2)$")
```

**Set Header:**
```
Cache-Control: public, max-age=31536000, immutable, stale-while-revalidate=31536000
```

**For Fonts, also add:**
```
Access-Control-Allow-Origin: *
```

### Option 3: S3 + CloudFront (AWS)

If using S3 as origin:

1. **Set S3 bucket metadata:**
   - Go to S3 bucket → Properties → Metadata
   - Add: `Cache-Control: public, max-age=31536000, immutable`

2. **Or use S3 bucket policy with metadata:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket/*"
    }
  ]
}
```

3. **Configure CloudFront to forward headers:**
   - Cache Policy: Use "CachingOptimized" or custom
   - Origin Request Policy: Forward all headers

### Option 4: Nginx (If CDN is Nginx-based)

Add to nginx configuration:

```nginx
location ~* \.(webp|jpg|jpeg|png|svg|ico)$ {
    add_header Cache-Control "public, max-age=31536000, immutable, stale-while-revalidate=31536000";
    expires 1y;
}

location ~* \.(ttf|woff|woff2|eot)$ {
    add_header Cache-Control "public, max-age=31536000, immutable, stale-while-revalidate=31536000";
    add_header Access-Control-Allow-Origin "*";
    expires 1y;
}
```

### Option 5: Generic CDN (Any Provider)

Set these headers for static assets:

**Images:**
- `Cache-Control: public, max-age=31536000, immutable, stale-while-revalidate=31536000`

**Fonts:**
- `Cache-Control: public, max-age=31536000, immutable, stale-while-revalidate=31536000`
- `Access-Control-Allow-Origin: *`

## Verification

After configuring, verify headers using:

```bash
curl -I https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp
curl -I https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.ttf
```

Expected response headers:
```
Cache-Control: public, max-age=31536000, immutable, stale-while-revalidate=31536000
```

## Expected Impact

After configuration:
- ✅ Lighthouse "Use efficient cache lifetimes" audit will pass
- ✅ 246 KiB savings on repeat visits
- ✅ Faster page loads for returning users
- ✅ Reduced CDN bandwidth costs

## Priority

**HIGH** - This directly affects Performance score and user experience on repeat visits.
