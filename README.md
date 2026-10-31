# TeddyPups U.A.E. — Website Clone

A production-grade, pixel-faithful clone of [puppy.instabizweb.com](https://puppy.instabizweb.com/) (TeddyPups U.A.E., a premium teacup-puppy brand in Dubai), built as a technical assignment for Insta Biz Web.

> **Attribution note** — The original design, brand and content belong to **TeddyPups U.A.E. / Insta Biz Web**. This repository reproduces their publicly available website solely as the technical assessment they commissioned. It is not a commercial product and no rights over the brand or media are claimed.

---

## Live demo

| Deliverable | Link |
| --- | --- |
| Live URL | _deployed on Vercel — see `DEPLOYMENT.md`_ |
| Loom walkthrough | _link added after recording_ |

## Tech stack

- **Next.js 16** (App Router, React Server Components, `generateStaticParams` + `generateMetadata`)
- **TypeScript 5** (strict)
- **Tailwind CSS 4** with a custom design-token layer (`@theme`, `@layer components`)
- **Prisma ORM + SQLite** — stores enquiries from the puppy-profile and contact forms
- **Zod** — request validation on the API route
- **next/font/local** — the site's three variable fonts (Fraunces, Figtree, Shantell Sans) self-hosted for zero layout shift
- **next/image** — responsive, lazy-loaded imagery with priority hints on above-the-fold shots

## Feature map

| Area | Details |
| --- | --- |
| Pages | `/`, `/puppies`, `/puppies/[slug]` (42 profiles), `/happy-families`, `/how-it-works`, `/faq`, `/gone-home`, `/contact`, custom 404 |
| Filtering | Server-side filtering driven by URL search params (`?origin=`, `?breed=`, `?sex=`, `?korean=1`) with accessible chip UI — links are shareable & SEO-friendly |
| Detail pages | Photo/video carousel with thumbnails & keyboard nav, spec grid, "what comes with" checklist, 4-step import journey, enquiry form, prev/next puppy navigation |
| Forms | `POST /api/enquiry` → Zod validation → Prisma/SQLite; friendly success + error states (graceful WhatsApp fallback if DB is unavailable) |
| Happy families | 64 polaroid cards with captions and a keyboard-accessible lightbox (Esc / ← / →) |
| Design system | Palette (milk, honey, toffee, cocoa, blush, sky), three-font type scale, hand-drawn SVG doodles (paws, rings, signpost, book, door, basket), scalloped/wavy section edges, scroll-reveal animations |
| Responsive | Mobile-first; sticky header, full-screen mobile menu, fixed WhatsApp/Call bottom bar with safe-area insets, floating WhatsApp bubble on desktop |
| SEO | Per-page metadata + OG tags, `sitemap.xml`, `robots.txt`, JSON-LD (`Product`, `FAQPage`), semantic landmarks, skip-link |
| Accessibility | ARIA on tabs/accordions/dialogs, focus-visible styles, alt text everywhere, `prefers-reduced-motion` support, 44px touch targets |

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, header/footer, floating actions, metadata
│   ├── page.tsx              # home (hero → pups → two ways → journey → trust → families → FAQ → CTA)
│   ├── globals.css           # design tokens + tp-* component library
│   ├── puppies/page.tsx      # listing + URL-driven filters
│   ├── puppies/[slug]/       # static-generated puppy profiles
│   ├── happy-families/       # polaroid wall + lightbox
│   ├── how-it-works/         # 4 anchored sections
│   ├── faq/                  # accordion + FAQPage JSON-LD
│   ├── contact/              # "letter" form + contact cards + map
│   ├── gone-home/            # 27 ticket cards
│   ├── api/enquiry/route.ts  # Zod-validated lead capture
│   ├── sitemap.ts / robots.ts
├── components/               # header, footer, cards, carousel, lightbox, forms, doodles…
├── lib/data.ts               # typed content model (puppies, families, FAQs, site config)
└── fonts/                    # variable woff2 (Fraunces, Figtree, Shantell Sans)
prisma/schema.prisma          # Enquiry model
public/media                  # site imagery (from the reference site, per the assignment)
```

## Getting started

```bash
# 1. install
bun install        # or: npm install

# 2. environment
cp .env.example .env

# 3. database (creates db/custom.db and the Enquiry table)
bun run db:push

# 4. develop
bun run dev        # http://localhost:3000

# 5. quality
bun run lint
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | SQLite connection (e.g. `file:../db/custom.db`). Swap to any Postgres/Neon/Turso URL when moving to serverless hosting. |

## Key implementation decisions

1. **Content as a typed data layer** (`src/lib/data.ts`) rather than hard-coded JSX — 42 puppy profiles, 64 family moments and FAQs are rendered from one source of truth, mirroring how a real deployment would wire a CMS.
2. **URL-driven filters** instead of local state — the reference site uses `?breed=`/`?origin=` query params; matching that keeps deep links working and keeps filtering server-rendered.
3. **CSS component layer** — all bespoke classes (`tp-sketch`, `tp-btn`, `tp-acc`…) live in `@layer components` so Tailwind utilities always win the cascade (e.g. responsive `hidden`/`flex` overrides).
4. **Self-hosted variable fonts** — identical typography to the reference with no external font requests.
5. **Graceful form degradation** — if the database is unreachable the API returns a friendly 503 and the UI points users to WhatsApp, so lead capture never dead-ends.

## Testing performed

- `eslint` clean across the repo
- API contract tests: valid payload → `201 {ok:true}`, invalid → `422` with a human-readable message, DB-down → `503`
- Browser (desktop 1440px & mobile 390px): navigation, filters (`origin`/`breed`/`sex`/`korean`), carousel (arrows, thumbnails, keyboard), accordion, lightbox (open/Esc/←/→), both forms end-to-end incl. DB row creation
- Cross-checked rendered pages against the live reference at each breakpoint
