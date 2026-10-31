# AI Tools & Prompt Log

**Policy compliance:** the assignment allows any AI tools, provided you understand and can explain the full workflow. This log documents exactly how AI was used so you can present it confidently (and honestly) in the Loom video.

**Tools used**

| Tool | Role |
| --- | --- |
| Z.ai (GLM coding agent) | Pair-programmer: analysis, scaffolding, component code, debugging |
| Agent-browser (Playwright CLI) | Automated QA: rendered both sites, exercised every interaction |
| Prisma Studio / curl | API + DB verification |

**The actual working loop** (say this in the video — it's what they want to hear):

> 1. I inspected the reference site first (rendered pages, CSS tokens, fonts, embedded data).
> 2. I prompted the AI agent with a specific, bounded task.
> 3. I reviewed every file it produced, ran ESLint, and verified the result in a real browser.
> 4. When something was wrong I debugged the root cause myself with the agent as a sparring partner.

---

## Prompt log (representative, in order)

### Phase 1 — Recon & design system
1. "Describe this website in full detail: purpose, every nav item, every section top to bottom with headings and text, color scheme, fonts, forms, buttons, sliders, footer."
2. "Fetch the homepage HTML and extract every href, every image source, the CSS chunks; pull out the `:root` design tokens and `@font-face` rules so I know the exact palette and fonts."
3. "The puppy listings are rendered from Next.js RSC flight payloads — write a parser that extracts each card's aria-label, href, wash color and tilt into a JSON dataset."

### Phase 2 — Architecture & data layer
4. "Generate a typed TypeScript data module from this dataset: `Puppy` interface (slug, name, breed, sex, age, origin, koreanTeacup, video, images, wash, tilt, status, metaDesc), plus `FAMILIES`, `FAQS`, `TESTIMONIALS`, `SITE` config and `puppyNeighbors()` helper."
5. "Decode HTML entities in the extracted strings — 'Maltipoo &amp; Cavapoo' must become 'Maltipoo & Cavapoo'."

### Phase 3 — Design system
6. "Build a Tailwind 4 globals.css for this clone: theme tokens for milk/honey/toffee/cocoa/blush/sky, three self-hosted variable fonts (Fraunces, Figtree, Shantell Sans), a `tp-*` component library (buttons, chips, sketch cards, stickers, polaroids, tickets, accordion, phone mockup, scalloped dividers, scroll-reveal), respecting `prefers-reduced-motion`."

### Phase 4 — Components & pages
7. "Build the sketch-style puppy card: circular photo, hand-drawn double ellipse SVG ring, rotated paint-blob wash behind, 'Available' sticker, '▶ video' pill, tilt that straightens on hover."
8. "Build the home page sections in order: hero with arch photo strip + name marquee, meet-the-pups grid, two-ways with a signpost SVG, journey steps with a WhatsApp phone mockup, passport/trust section, happy-families teaser, FAQ teaser, final CTA with a door illustration."
9. "Build the puppies listing with URL-driven filters (?origin=, ?breed=, ?sex=, ?korean=1) — chips push router params, the server component filters by searchParams."
10. "Build the puppy detail page: carousel with thumbnails + video support + keyboard arrows, spec grid, checklist card, 4-step timeline, enquiry form with the reference's default message, prev/next navigation."

### Phase 5 — Bugs I made the agent fix (root causes I verified)
11. "The desktop header shows the Menu button despite `lg:hidden` — why?" → **Root cause:** my custom classes were unlayered, so they beat Tailwind's layered utilities in the cascade. Fix: move all component classes into `@layer components`.
12. "Card name and meta render on one line" → spans needed `display:block`.
13. "next/image warns 'fill and parent with invalid position'" → parent needed `relative`.
14. "`?breed=shih-tzu` returns 0 results" → normalize hyphens to spaces before matching the breed names.
15. "ESLint: setState inside useEffect for closing the mobile menu" → close via onClick on the links instead.

### Phase 6 — QA & API
16. "Write a Zod-validated `/api/enquiry` route: valid → 201 + Prisma insert; invalid → 422 with the first issue's message; DB failure → 503 with a WhatsApp fallback message."
17. "Verify in the browser at 1440px and 390px: every page, every filter combination, carousel, accordion, lightbox keyboard support, both forms end-to-end."

### Phase 7 — Detail pass: animations, doors, the fork (pixel-matching the reference)
18. "The kennel doors never swing open. Dump the reference's door DOM and CSS." → **Root cause:** in my markup the door leaf was a *sibling* of `.tp-door__way`, but the reference nests the leaf *inside* it — `--door-open: 78deg` and the `perspective: 700px` live on `__way`, so outside that subtree `rotateY(var(--door-open))` resolves to nothing and computes to `transform: none`. Fix: nest the leaf like the reference; doors now open as the pinned treadmill scrolls them past 36% of the viewport.
19. "The 'Two ways' section is wrong — the reference has no cards. Extract its real DOM." → dumped the section HTML (`tp-paths / tp-fork / tp-way / tp-window / tp-flight`) plus its exact CSS rules and rebuilt it: signpost pole down the middle, striped-awning showroom window over a city-skyline line SVG on the left, and a cartoon plane on the right.
20. "The reference's plane moves — find out how." → sampled the SVG group's transform at different scroll offsets: static over time, but changes with scroll — it's **scroll-driven**: the plane rides the Bézier route (`M40 250 C 170 40, 470 20, 620 168`), rotates to the path tangent via `getPointAtLength`, and fades in on take-off. I reimplemented it with a rAF lerp (~0.09) and verified my mid-flight values match theirs (≈487,90 rot 17° vs ≈484,89 rot 17°).
21. "Every page is blank when you navigate to it from the home page." → **Root cause:** my `Reveal` component ran its `IntersectionObserver` setup in a `useEffect` with an empty dependency array — on client-side navigation the DOM is swapped but the observer never re-scans, so every `data-reveal` element stays at `opacity: 0`. Fix: key the effect on `usePathname()`, re-scan on route change, add a `MutationObserver` (rAF-debounced) for late-mounted nodes, and a `<noscript>` CSS fallback so content is never permanently hidden.
22. "Buttons look slightly off" → the reference's `.btn-primary` is solid `toffee-deep` with **no border**; mine had a 2px border and a lighter fill. Aligned tokens (`min-height: 3.25rem`, `font-weight: 650`, hover `translateY(-2px) rotate(-1deg)`, press `scale(.96)`).

---

## What I can explain without notes

If you open any file, I can explain: why `@layer components` matters, how the server/client component split is drawn, how `generateStaticParams` pre-renders the 15 available profiles, how the filter state flows (URL → searchParams → server filter), how the carousel/lightbox keyboard handlers work, and what happens to a form submission from click to SQLite row.
