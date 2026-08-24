# SaaSConnect — Programmatic B2B SaaS Integrations & Automation Directory

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Static Pages](https://img.shields.io/badge/Static%20Routes-195%20Pages-success?style=flat-square)](#architecture)
[![Partner](https://img.shields.io/badge/Monetization-Make.com%20Partner-6366f1?style=flat-square)](https://www.make.com)

**SaaSConnect** is an automated, programmatic SEO directory and B2B workflow hub built with [Astro](https://astro.build). It captures high-intent organic search traffic for B2B software connections (*"How to connect Stripe to QuickBooks"*, *"HubSpot to Slack integration guide"*, *"Shopify to Klaviyo automated sync"*) and monetizes 100% passively via Make.com scenario automation commissions.

---

## ⚡ Key Capabilities

* **100 Rich B2B Integrations:** Detailed guides covering triggers, field mappings, rate limits, common pitfalls, and step-by-step setup guides across CRM, ERP, billing, data warehouse, and communication stacks.
* **195 Programmatic Static Routes:**
  * 100 Integration Detail Pages (`/integrations/[slug]`)
  * 60+ Tool Hub Silos (`/tools/[tool]`)
  * 22 Category Hub Silos (`/category/[category]`)
  * 100 Dynamic Open Graph Preview Cards (`/og/[slug].png`) generated on-the-fly at build time via `sharp`.
* **Direct SaaS Partner & Referral Engine:** Automated trial and account sign-up links for 28+ leading B2B SaaS platforms (HubSpot, Shopify, QuickBooks, Airtable, ClickUp, Monday, Notion, etc.) with Sub-ID and UTM parameterization.
* **Visual Data Pipeline Architecture:** Interactive responsive topology cards displaying *Trigger &rarr; Transform &rarr; Action &rarr; Error Queue Resilience* on every integration guide.
* **Implementation Economics & ROI Comparison:** On-page cost comparison contrasting $5,000+ custom in-house dev vs. instant $0–$9/mo Make scenarios.
* **Downloadable Blueprint Lead Magnet:** Real-time generation of Make `.json` scenario definitions (`/blueprints/[slug].json`) with gated work email capture modal (`DownloadBlueprintModal.astro`).
* **Universal Outbound Click Telemetry:** Dynamic sub-ID tracking (`affiliate.ts`) and multi-provider analytics dispatcher (`telemetry.ts`) across GA4, Plausible, PostHog, and GTM.
* **Full Search Engine Optimization:** Schema.org `HowTo`, `DataCatalog`, and `CollectionPage` structured data with automated XML sitemaps (`sitemap-index.xml`) and canonical URL enforcement.

---

## 🛠️ Tech Stack

* **Framework:** [Astro 5.x](https://astro.build) (Static Site Generation / SSG)
* **Styling:** Vanilla CSS with custom design token system (Dark/Light mode support, CSS custom properties)
* **Image Generation:** [Sharp](https://sharp.pixelplumbing.com/) (Programmatic 1200x630 OpenGraph social previews)
* **SEO & Sitemaps:** `@astrojs/sitemap` + Schema.org JSON-LD
* **Analytics & Attribution:** Custom TypeScript telemetry engine with dynamic sub-tracking parameterization

---

## 🚀 Getting Started

### Prerequisites
* Node.js `18.x` or `20.x`+
* npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/joeaexpress/b2b-integrations.git
cd b2b-integrations

# Install dependencies
npm install
```

### Environment Configuration
Copy `.env.example` to `.env` and fill in your partner IDs:

```bash
cp .env.example .env
```

| Variable | Description |
| :--- | :--- |
| `PUBLIC_MAKE_AFFILIATE_URL` | Base Make.com partner referral URL (`https://www.make.com/en/register?pc=jamlung`) |
| `PUBLIC_HUBSPOT_AFFILIATE_URL` | Optional direct HubSpot partner referral link (Impact / PartnerStack) |
| `PUBLIC_SHOPIFY_AFFILIATE_URL` | Optional direct Shopify partner referral link |
| `PUBLIC_QUICKBOOKS_AFFILIATE_URL` | Optional direct QuickBooks partner referral link |
| `PUBLIC_AIRTABLE_AFFILIATE_URL` | Optional direct Airtable partner referral link |
| `PUBLIC_CLICKUP_AFFILIATE_URL` | Optional direct ClickUp partner referral link |
| `PUBLIC_MONDAY_AFFILIATE_URL` | Optional direct Monday.com partner referral link |
| `PUBLIC_SITE_URL` | Canonical production site URL (`https://b2b-integrations.vercel.app`) |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification meta tag token |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Optional Plausible Analytics domain (`b2b-integrations.vercel.app`) |

---

## 🧞 Available Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start local development server at `http://localhost:4321` |
| `npm run build` | Compile all 195 static pages, sitemaps, and OG images to `./dist/` |
| `npm run preview` | Serve the built `./dist/` directory locally for pre-flight testing |
| `npm run astro check` | Run Astro TypeScript and schema diagnostics |

---

## 📁 Repository Structure

```text
/
├── internal/
│   └── PROJECT_TRACKER.md        # Private roadmap, KPI targets, & monetization tracking (gitignored)
├── public/                       # Favicon and static assets
├── src/
│   ├── components/
│   │   └── DownloadBlueprintModal.astro  # Email gated JSON scenario exporter
│   ├── data/
│   │   └── integrations.json     # Master dataset containing 100 enterprise integrations
│   ├── layouts/
│   │   └── Layout.astro          # Root layout, meta tags, schema, header/footer, telemetry
│   ├── pages/
│   │   ├── blueprints/           # Downloadable JSON endpoint (/blueprints/[slug].json)
│   │   ├── category/             # Category silo landing pages (/category/[category])
│   │   ├── integrations/         # Rich integration setup guides (/integrations/[slug])
│   │   ├── og/                   # Programmatic Sharp OG image generators (/og/[slug].png)
│   │   ├── tools/                # Dedicated tool hubs (/tools/[tool])
│   │   └── index.astro           # Directory search, filtering, and showcase homepage
│   ├── scripts/
│   │   └── telemetry.ts          # Universal click telemetry & event dispatcher
│   ├── types/
│   │   └── integration.ts        # TypeScript data schema contracts
│   └── utils/
│       ├── affiliate.ts          # Parameterized affiliate URL generator with dynamic Sub-IDs
│       ├── og-template.ts        # SVG markup renderer for Sharp preview cards
│       └── slugs.ts              # Slugging and category aggregation helpers
├── astro.config.mjs              # Astro configuration with sitemap integration
└── package.json
```

---

## 🗺️ Roadmap & Next Steps

* [x] **Phase 1–10:** Core programmatic engine (100 integration pairs, 195 static pages, dynamic OG images, Make.com partner Sub-ID tracking, gated scenario downloads).
* [x] **Phase 11:** Direct SaaS Partner & Referral Engine for 28+ B2B tools across integration detail and hub pages.
* [ ] **Phase 12:** "All-in-One Enterprise Scenario Vault" digital pack ($29–$49) with 100% automated LemonSqueezy/Polar checkout.
* [ ] **Phase 13:** Custom domain transition (`saasconnect.io`) & full Google Search Console / Bing indexing submission.
* [ ] **Phase 14:** Automated email autoresponder sequence (via Loops.so or Resend) delivering weekly workflow templates.
* [ ] **Phase 15:** Self-serve SaaS sponsor placements with automated recurring Stripe payment links.

---

## 📄 License
MIT License. Built for zero-touch passive affiliate monetization.


