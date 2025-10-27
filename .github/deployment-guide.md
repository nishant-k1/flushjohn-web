# HTTP/2 Deployment Guide

## Quick Start

### Option 1: Quick Setup (Recommended)
If you want to enable HTTP/2 immediately, use these commands on your EC2 instance:

```bash
# 1. Install Nginx (if not installed)
sudo apt install nginx -y

# 2. Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# 3. Get SSL certificate
sudo certbot --nginx -d flushjohn.com -d www.flushjohn.com

# 4. Copy nginx config
sudo cp /home/ec2-user/flushjohn-web/nginx.conf /etc/nginx/sites-available/flushjohn-web
sudo ln -sf /etc/nginx/sites-available/flushjohn-web /etc/nginx/sites-enabled/

# 5. Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

### Option 2: Deploy on Vercel (Zero Config)
For automatic HTTP/2/3 support without server configuration:
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Current Deployment
- **Platform**: AWS EC2
- **Server**: Nginx + PM2
- **Status**: Requires nginx configuration for HTTP/2
- **Action Required**: Follow steps in `HTTP2_SETUP.md`

## Files Added
1. `nginx.conf` - Nginx configuration with HTTP/2
2. `HTTP2_SETUP.md` - Detailed setup instructions
3. `next.config.js` - Updated with HTTP/2 comments

## Verification
After setup, verify with:
```bash
curl -I --http2 https://flushjohn.com
```

