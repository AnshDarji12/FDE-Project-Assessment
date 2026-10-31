# Deployment & Submission Guide

Everything you need to go from this project to the three deliverables: **live URL → GitHub repo → Loom video**.

---

## 1. Push to GitHub

```bash
cd teddypups-clone

# initialise
git init
git add .
git commit -m "feat: TeddyPups U.A.E. website clone (Next.js 16 + Tailwind 4 + Prisma)"

# create an empty repo on github.com first (no README/gitignore), then:
git branch -M main
git remote add origin https://github.com/<your-username>/teddypups-clone.git
git push -u origin main
```

Tips
- Use a descriptive repo name (`teddypups-clone`) and paste the live URL + Loom link into the repo **About** panel and this README.
- Do **not** commit `.env` (it's gitignored already).

## 2. Deploy to Vercel (free, ~3 minutes)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. **Import** the `teddypups-clone` repository.
3. Framework preset is auto-detected as **Next.js** — leave build settings as-is.
4. Add the environment variable:
   - Key: `DATABASE_URL`
   - Value: `file:../db/custom.db`
5. Click **Deploy** and wait for the build.
6. Your live URL: `https://teddypups-clone.vercel.app` (rename in *Settings → Domains* if you like).

### Important: SQLite on Vercel

SQLite writes to a local file, which is **ephemeral on serverless platforms**. The site will deploy and run perfectly; form submissions will show the friendly "message us on WhatsApp" fallback instead of persisting. Two options:

| Option | How |
| --- | --- |
| **Demo mode (fine for the assessment)** | Leave as-is; the enquiry API validates and responds correctly, and the code path is visible in the repo. Mention it in your Loom video — interviewers love hearing you explain the trade-off. |
| **Persistent DB (10 min)** | Create a free Postgres on [Neon](https://neon.tech) → set `DATABASE_URL` to the Neon connection string → change `provider = "postgresql"` in `prisma/schema.prisma` → run `bun run db:push` → redeploy. |

## 3. Record the Loom video

Follow `docs/LOOM_SCRIPT.md` — it walks through the exact flow the assignment asks you to demonstrate, with time-boxed sections (10–14 minutes total).

## 4. Submission checklist

- [ ] Reply to the assignment email confirming acceptance (see `docs/EMAIL_REPLY_DRAFT.txt`)
- [ ] Live URL works on desktop **and** mobile (test filters + a form)
- [ ] GitHub repo is public, README renders, live URL + Loom link added to the About panel
- [ ] Loom video recorded, linked (and set to "anyone with link")
- [ ] AI tools + prompts disclosed (see `docs/AI_PROMPTS_LOG.md`)
- [ ] Submitted before the 48-hour deadline from your acceptance reply

## Local troubleshooting

| Symptom | Fix |
| --- | --- |
| `PrismaClientInitializationError` | Run `bun run db:push` (creates `db/custom.db`). |
| Form returns "could not save" | DB not reachable — check `DATABASE_URL`; on Vercel see the SQLite note above. |
| Fonts look wrong | Ensure `src/fonts/*.woff2` exist and `bun run dev` was restarted after adding them. |
| Images 404 | `public/media/**` must be present — it ships with the repo. |
