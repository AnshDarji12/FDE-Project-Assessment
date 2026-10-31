# Loom Video Script — TeddyPups Clone Walkthrough

**Target length:** 10–14 minutes. Record at 1080p. Do one dry run, then record.
Open with the **live site on the left half** of your screen and the **repo in VS Code on the right half**.

> The assignment asks you to cover: development process, project structure, technologies used, AI tools, exact prompts, implementation decisions, challenges, testing, and deployment. Every section below maps to one of those requirements.

---

### 0. Intro (0:00–0:40)
- "Hi, I'm \<name\> — this is my submission for the Insta Biz Web technical assignment: a full clone of the TeddyPups U.A.E. website."
- Show both tabs: live clone + original reference, briefly switch between them to show fidelity.

### 1. Live walkthrough (0:40–3:00)
- Home: hero, arch photo strip, sketch cards, two-ways signpost, journey + WhatsApp phone mockup, passport section, happy families, FAQ teaser, CTA.
- Puppies page: use the **filters** (Imported, Korean Teacup, Shih Tzu, Boys) — point out the **URL updates** (`?origin=imported&breed=shih-tzu`) and that filtering is server-rendered from search params.
- Open **Max's profile**: carousel with photo + video tab, spec card, checklist, 4-step journey, enquiry form → submit it live and show the success state.
- Happy families → open the lightbox, arrow-key through it. FAQ → accordion. Gone home → 27 tickets. Contact → the "letter" form.
- Resize the window to mobile width: sticky header → hamburger menu → bottom WhatsApp/Call bar.

### 2. Tech stack & why (3:00–4:00)
- **Next.js 16 App Router + TypeScript** — server components for data, client components only where interactivity is needed (carousel, filters, forms, lightbox).
- **Tailwind CSS 4** — custom design tokens in `@theme`; all bespoke styles in `@layer components` so utilities always win the cascade.
- **Prisma + SQLite** for enquiries, **Zod** for validation.
- **next/font/local** — the three variable fonts (Fraunces / Figtree / Shantell Sans) self-hosted.
- **next/image** everywhere with `sizes`, priority hints on hero shots.

### 3. Project structure (4:00–5:30)
- `src/lib/data.ts` — the typed content model: 42 puppies, 64 family moments, FAQs, site config. "One source of truth — pages just render it, like a CMS would."
- `src/app/` — file-based routes; show `puppies/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata` (static, SEO-friendly profile pages).
- `src/components/` — header, footer, `puppy-card`, `puppy-carousel`, `polaroid-wall`, `enquiry-form`, `doodles` (all the hand-drawn SVGs are hand-authored, not extracted).
- `src/app/api/enquiry/route.ts` — the one API route.
- `prisma/schema.prisma` — the Enquiry model.
- `globals.css` — design tokens + the `tp-*` component library.

### 4. AI tools & exact prompts (5:30–7:30) — be transparent, it's allowed
- State which tools you used (e.g. Z.ai GLM agent as the coding assistant) and that every decision was reviewed by you.
- Show `docs/AI_PROMPTS_LOG.md` in the repo — walk through 3–4 representative prompts:
  1. "Analyze the reference site and extract its design system (colors, fonts, component inventory)."
  2. "Generate a typed data layer from the extracted content model (puppies, families, FAQs)."
  3. "Build the sketch-style puppy card with hand-drawn ring, wash blob and stickers."
  4. "Debug: Tailwind utilities are losing to my custom classes — why?" (→ `@layer components` fix)
- Explain the loop you actually used: **inspect → prompt → review the diff → run ESLint → verify in the browser → fix**. Emphasise that you can explain any file they open.

### 5. Implementation decisions (7:30–9:00)
Pick four, keep each to ~20 seconds:
1. **URL-driven filters** (matches the reference's query-param behaviour, shareable links, server-rendered).
2. **`@layer components`** for the design system (cascade correctness).
3. **Typed data layer instead of hard-coded JSX** (single source of truth, CMS-ready).
4. **Graceful form degradation** (API validates → DB write; if DB is unreachable it returns a friendly 503 pointing to WhatsApp — never a dead end).

### 6. Challenges & how you solved them (9:00–10:30)
1. The reference is a **scroll-animated illustrated site** — no ready-made components; solved by writing an original SVG doodle set + CSS-only reveal system.
2. **Cascade bug**: custom classes beat Tailwind utilities → moved everything into `@layer components`.
3. **Fonts**: matched exactly by self-hosting the same variable woff2 files.
4. **Data extraction**: the source content lives in RSC payloads → wrote a parser to build a clean typed dataset.

### 7. Testing (10:30–11:30)
- ESLint clean; API tested with curl (valid → 201, invalid → 422 with readable message).
- Browser-tested at 1440px and 390px: filters, carousel keyboard nav, accordion, lightbox, both forms end-to-end (rows land in SQLite — open Prisma Studio if you want to show it).
- `prefers-reduced-motion`, focus states, ARIA — accessibility matters to them.

### 8. Deployment (11:30–12:30)
- Pushed to GitHub → imported to Vercel → env var `DATABASE_URL` → live URL.
- Explain the SQLite-on-serverless trade-off and the one-line swap to Neon/Postgres for persistence.

### 9. Close (12:30–13:00)
- Recap deliverables (live URL, repo, this video), thank them, state availability.

---

**Recording tips**
- Keep the cursor moving purposefully; zoom (⌘/Ctrl +) on code you discuss.
- If something breaks live, narrate the fix calmly — debugging on camera is a plus, not a minus.
- End screen: show the repo README with links.
