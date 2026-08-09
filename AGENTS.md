# AGENTS.md — flushjohn-web

Public marketing website for Flush John — portable restroom rental brokerage. Lead generation site with city/service pages for SEO, quote forms, and blog content.

## Commands

```bash
npm run dev                 # next dev -p 3000
npm run build               # NODE_OPTIONS='--max-old-space-size=8096' next build --webpack
npm start                   # next start
npm run lint                # eslint
npm run format              # prettier
```

Use `next build --webpack` (not Turbopack) — Next.js 16 has a Turbopack crash bug on Vercel.

## Architecture

- **Next.js 16 (App Router)** with Webpack bundler
- **React 19** + TypeScript
- **Formik + Yup** for form handling
- **react-ga4** + Facebook Pixel for analytics
- **CSS Modules** for styling
- Deployed on **Vercel** at `flushjohn.com` and `www.flushjohn.com`

### Key Files

```
src/
  app/
    layout.tsx                    Root layout — security headers, providers, QuickQuote modal
    loading.tsx                   Root loading spinner
    page.tsx                      Homepage — metadata, structured data, FAQ schema
    quote/page.tsx                Quote form page
    contact/page.tsx               Contact form page
    about/page.tsx                 About page
    how-it-works/page.tsx          How It Works page (7-step process)
    rental-products/page.tsx       Product catalog listing
    rental-products/[slug]/        Individual product detail page
    porta-potty-rental/page.tsx    City directory hub page
    porta-potty-rental/[city]/      City-specific landing page (25+ cities)
    porta-potty-rental/[city]/[service]/  City+Service combo page (75 pages)
    service-areas/page.tsx          State listing
    blog/page.tsx                   Blog listing (SSR, 5min revalidate)
    blog/[slug]/page.tsx           Blog post (SSR)
    blog/dashboard/page.tsx        Blog SEO dashboard (public — SEO content, not admin)
    reviews/page.tsx               Customer reviews
    faq/page.tsx                    FAQ page
    sitemap.ts                     Dynamic sitemap
  features/
    home/                          Homepage components (Hero, Services, CTA, TrustSignals, Testimonials)
    quote/                         Quote form components + QuickQuote modal + context
    contact/                       Contact form
    locations/                     City pages, city content generators, headings
    products/                      Product display components
    blog/                          Blog components
    legal/                         FAQ data (comprehensiveFaq.ts)
  components/
    Navbar/                        Desktop navigation
    MobileMenu/                    Mobile hamburger menu
    Sidebar/                       Slide-out sidebar nav
    StickyCTA/                     Desktop sticky CTA bar (scroll trigger)
    MobileStickyBar/               Mobile fixed bottom bar
    HeroQuickQuote/                Quick quote modal (hero variant)
    SEO/                           ContentMarketing, FacebookPixel
    Footer/                        Footer + data
```

## Business Context

Flush John is a **brokerage** — customers request quotes, staff coordinate with local vendors, FlushJohn adds margin. This should NOT be explicitly revealed to customers. The website messaging uses:
- "We compare rates from our network to get you the best price"
- "Get a quote in 60 seconds"
- "Starting from $150" (no specific ranges — vendor prices vary)
- "Best Price Guarantee" (not "Competitive Pricing" or "Transparent Pricing")

## Copy Rules

1. Never use "Free Quote" — use "Get a Quote" or "Get a Quote in 60 Seconds"
2. Never use "Competitive Pricing" / "Transparent Pricing" — use "Best Price Guarantee"
3. Never use "Request Quote" — use "Get a Quote"
4. Never hardcode price ranges — use "Starting from $150"
5. Always mention network comparison language near pricing sections
6. The word "broker" or "brokerage" must never appear

## SEO

- Structured data: Organization, ServiceAreaBusiness, FAQPage, HowTo, Service, Review, BreadcrumbList, ItemList, WebSite, CollectionPage, Blog, BlogPosting
- Dynamic sitemap with all city+service combos
- City pages have `geo.region`, `geo.placename`, `geo.position`, `ICBM` meta tags
- Dynamic `generateMetadata()` on city/service pages
- Canonical URLs on all pages
- No keyword stuffing in meta tags (removed from homepage)
- robots.txt allows AI crawlers (GPTBot, Claude, PerplexityBot)
- OG image: `og-image-flushjonn-web.png` (note: has typo "jonn" — intentional)

## Performance

- Aggressive bundle splitting in `next.config.js`
- `next/image` with AVIF/WebP, responsive sizes
- Long cache TTLs on static assets
- Fonts use `font-display: optional` with `size-adjust`
- Hero image preloaded with `fetchPriority="high"`
- Scroll handlers throttled with `requestAnimationFrame` + `{ passive: true }`
- Console logs stripped in production

## Conventions

- `"use client"` directive on interactive components
- Formik + Yup for all forms
- CSS Modules for component styles
- Dynamic imports for heavy components (Footer, Testimonial, Hamburger)
- `src/anmations/` directory (note: typo in "animations")
- All CTAs: square buttons (`borderRadius: "0"`) — intentional design choice

## Critical Rules

1. **Never remove blog dashboard** — it's public SEO content, not an admin panel
2. **QuoteStep1 had useEffect infinite loop** — was fixed by removing self-referencing `setFormValues(formValues)` in `useEffect([formValues])`
3. **Review count: 6** — homepage and reviews page must match
4. **Scroll handlers are throttled** — don't add raw scroll listeners
5. **Contact form shows loading during submit** — no optimistic success/rollback
6. **Quote form uses console.error not alert()** — no raw browser alerts
7. **Two icon libraries both used**: `lucide-react` AND `react-icons` — both are needed (different components use different ones)
8. **Dead deps removed**: `axios`, `socket.io-client` — don't re-add them
9. **Root `loading.tsx` exists** — shows spinner during page transitions
10. **`vercel.json` exists** — Next.js framework, webpack build command, security headers

## Build Gotcha

Next.js 16 Turbopack crashes on Vercel with "Dependency tracking is disabled" error. The `vercel.json` build command uses `next build --webpack` explicitly. Do NOT change this back to plain `next build` without verifying Turbopack is fixed.

## Integrations

- Backend API: `https://api.flushjohn.com`
- CDN: `https://cdn.flushjohn.com`
- Google Analytics + Google Ads conversion tracking
- Facebook Pixel
- No Stripe.js client-side (payments only in CRM)

## Upcoming Tasks

### Cleanup
- Delete `global-error.tsx` from project root — wrong location, never used (should be in `src/app/`)
- Delete empty `src/config/` directory
- Fix `src/anmations/` directory name typo ("animations")
- Remove `next-env.d.tsx` from root — stale duplicate of `next-env.d.ts`

### Product
- Add exit-intent popup for quote capture (code exists but commented out in QuickQuoteContext)
- Add unique OG images per city/service page instead of same image everywhere
- Fix breadcrumbs — `path=""` is always empty string, breadcrumbs don't render
- Add `loading.tsx` files for blog and product detail routes

### SEO
- OG image filename has typo: `og-image-flushjonn-web.png` (double "n") — fix or update CDN asset
- Review author schema says "Customer Reviews" — not a real person, violates schema.org guidelines
