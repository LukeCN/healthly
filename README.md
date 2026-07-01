# Healthly

An Australian health directory — find trusted providers and clear, medically-reviewed
health information. Built with Next.js 14 (App Router), server-rendered for SEO and
AI-crawler visibility.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Import this repo at [vercel.com](https://vercel.com) → New Project, or run `npx vercel`.
Then add the domain `healthly.au` under Project → Settings → Domains and point DNS
(at VentraIP) to Vercel. See `DEPLOY.md` for details.

## Structure
- `app/` — routes (home, specialty hubs, specialty×city pages, condition guides, provider profiles)
- `lib/data.js` — seed data (specialties, locations, providers, conditions)
- `app/sitemap.js`, `app/robots.js` — auto-generated SEO files
- JSON-LD schema on every page (MedicalOrganization, Physician, MedicalWebPage, FAQPage)

Provider listings are marked **Sample** until verified profiles replace them.
