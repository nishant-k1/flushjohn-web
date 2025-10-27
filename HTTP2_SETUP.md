# HTTP/2 Setup Guide for flushjohn-web

## Overview
This guide explains how to enable HTTP/2 protocol for your Next.js application deployed on EC2 with PM2.

## Why HTTP/2?
- **Multiplexing**: Multiple requests over a single TCP connection
- **Server Push**: Proactively send resources to clients
- **Header Compression**: Reduces overhead
- **Better Performance**: Especially for mobile networks

## Prerequisites
- Ubuntu/Debian server on EC2
- Domain name pointing to your EC2 instance
- Root or sudo access

## Installation Steps

### 1. Install Nginx (if not already installed)
```bash
sudo apt update
sudo apt install nginx -y
```

### 2. Install SSL Certificate using Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d flushjohn.com -d www.flushjohn.com
```

### 3. Configure Nginx for HTTP/2

Copy the nginx configuration:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/flushjohn-web
sudo ln -s /etc/nginx/sites-available/flushjohn-web /etc/nginx/sites-enabled/
```

Update SSL certificate paths in nginx.conf:
```bash
sudo nano /etc/nginx/sites-available/flushjohn-web
# Update these lines with your actual certificate paths:
# ssl_certificate /etc/letsencrypt/live/flushjohn.com/fullchain.pem;
# ssl_certificate_key /etc/letsencrypt/live/flushjohn.com/privkey.pem;
```

### 4. Update PM2 Configuration

Make sure your Next.js app runs on port 3000 (not 80 or 443). Update ecosystem.config.js:

```javascript
module.exports = {
  apps: [{
    name: 'flushjohn-web',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

### 5. Test and Restart Services

```bash
# Test nginx configuration
sudo nginx -t

# If test passes, restart nginx
sudo systemctl restart nginx

# Restart PM2 application
pm2 restart flushjohn-web

# Check status
pm2 status
sudo systemctl status nginx
```

### 6. Verify HTTP/2 is Enabled

Check with curl:
```bash
curl -I --http2 https://flushjohn.com
```

You should see `HTTP/2 200` in the response.

Or use online tools:
- https://tools.keycdn.com/http2-test
- https://http2.pro/check

## Troubleshooting

### Check Nginx Version
HTTP/2 requires Nginx 1.9.5+:
```bash
nginx -v
```

### Check if HTTP/2 is enabled
```bash
sudo nginx -T | grep http2
```

### Restart Services
```bash
sudo systemctl restart nginx
pm2 restart all
```

### Check Logs
```bash
# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# PM2 logs
pm2 logs flushjohn-web
```

## Alternative: Deploy on Vercel

If you prefer managed hosting with automatic HTTP/2:
1. Connect your GitHub repo to Vercel
2. Vercel automatically enables HTTP/2 and HTTP/3
3. No additional configuration needed

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Performance Benefits

With HTTP/2 enabled, you should see:
- 20-30% improvement in page load times
- Better Time to First Byte (TTFB)
- Reduced server overhead
- Better mobile performance

## Next Steps

1. Set up Auto-renewal for SSL certificates:
```bash
sudo certbot renew --dry-run
```

2. Enable automatic renewal (already configured with certbot):
```bash
sudo systemctl status certbot.timer
```

3. Monitor performance with:
   - Google PageSpeed Insights
   - GTmetrix
   - WebPageTest

## Security Headers

The nginx configuration includes security headers for:
- HSTS (HTTP Strict Transport Security)
- XSS Protection
- Content Type Options
- Frame Options

## Resources

- [Nginx HTTP/2 Documentation](https://nginx.org/en/docs/http/ngx_http_v2_module.html)
- [Let's Encrypt Documentation](https://letsencrypt.org/getting-started/)
- [HTTP/2 Explained](https://daniel.haxx.se/http2/)

