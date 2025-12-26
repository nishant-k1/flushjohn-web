# CDN Cache Configuration

## Issue ⚠️ CRITICAL PERFORMANCE ISSUE

Lighthouse reports that assets from `cdn.flushjohn.com` lack efficient cache lifetimes:

- `hero-img-1.webp` (96 KiB) - No cache TTL
- `Merriweather-Regular.ttf` (73 KiB) - No cache TTL
- `Poppins-Regular.ttf` (66 KiB) - No cache TTL

**Total potential savings: 235 KiB**

**Status**: This must be configured at the CDN level. Next.js application cannot control cache headers for external CDN resources.

## Solution

The CDN server (`cdn.flushjohn.com`) needs to send proper `Cache-Control` headers for static assets.

### Required Cache Headers

For fonts and images, the CDN should send:

```
Cache-Control: public, max-age=31536000, immutable
```

Or more specifically:

```
Cache-Control: public, max-age=31536000, immutable, stale-while-revalidate=31536000
```

### CDN Configuration

#### Cloudflare

If using Cloudflare, add a Page Rule or configure in Rules -> Transform Rules -> HTTP Response Header Modification:

- **URL Pattern**: `cdn.flushjohn.com/fonts/*` OR `cdn.flushjohn.com/images/*`
- **Header**: `Cache-Control`
- **Value**: `public, max-age=31536000, immutable`

#### AWS CloudFront

Add a Cache Policy or Response Headers Policy:

1. Go to CloudFront Distributions
2. Select your distribution for `cdn.flushjohn.com`
3. Create or edit a Response Headers Policy
4. Add custom header:
   - Header: `Cache-Control`
   - Value: `public, max-age=31536000, immutable`
   - Override: Yes

#### S3 + CloudFront

If assets are stored in S3 and served via CloudFront:

1. Configure S3 bucket CORS (if needed)
2. Set CloudFront Cache Behaviors:
   - Default TTL: 31536000 (1 year)
   - Forward Headers: None (use CloudFront cache behavior)
   - Add Response Headers Policy as above

#### Nginx (if CDN is self-hosted)

Add to nginx configuration:

```nginx
location ~* \.(webp|jpg|jpeg|png|gif|ttf|woff|woff2|eot|svg)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
    access_log off;
}
```

#### Apache (if CDN is self-hosted)

Add to `.htaccess` or Apache config:

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType font/truetype "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\.(webp|jpg|jpeg|png|gif|ttf|woff|woff2|eot|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
```

### Affected Files

1. **Fonts:**

   - `https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.ttf`
   - `https://cdn.flushjohn.com/fonts/Merriweather/Merriweather-Regular.ttf`

2. **Images:**
   - `https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp`
   - (And other hero images if they have the same issue)

### Verification

After configuring the CDN:

1. Clear browser cache
2. Load the page and check Network tab in DevTools
3. Verify that these resources have `Cache-Control` headers in the response
4. Run Lighthouse again - the warning should be resolved

### Alternative: Proxy Through Next.js

If CDN configuration is not possible, we could create Next.js API routes to proxy these assets and add cache headers. However, this adds latency and is not recommended. The CDN should handle caching properly.
