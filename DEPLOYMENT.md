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

## 2. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. **Import** the `teddypups-clone` repository.
3. Framework preset is auto-detected as **Next.js** — leave build settings as-is.
4. Create a hosted PostgreSQL database (for example, on [Neon](https://neon.tech)) and add its pooled and direct connection strings in **Project Settings → Environment Variables**:
   - Key: `DATABASE_URL`
   - Value: the provider's pooled PostgreSQL connection string
   - Key: `DIRECT_URL`
   - Value: the provider's direct PostgreSQL connection string (keep both private; do not commit them)
5. Before accepting enquiries, set both values in local `.env` and run `bun run db:push` against the new, empty database.
6. Click **Deploy** and wait for the build. The build generates the Prisma client automatically.
7. Your live URL appears in the Vercel project dashboard.

For local development, copy `.env.example` to `.env`, set both connection strings, then run `bun run db:push`.

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
| `PrismaClientInitializationError` | Check that `DATABASE_URL` points to the pooled database endpoint and that the schema was pushed using `DIRECT_URL`. |
| Form returns "could not save" | Check the database connection string and confirm the schema has been pushed with `bun run db:push`. |
| Fonts look wrong | Ensure `src/fonts/*.woff2` exist and `bun run dev` was restarted after adding them. |
| Images 404 | `public/media/**` must be present — it ships with the repo. |
