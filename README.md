# Studies — Security+ (SY0-701) Accelerated Study Platform

A personal study platform built to pass CompTIA Security+ as fast as possible, using
evidence-based learning techniques: spaced repetition (SM-2), active recall, interleaving,
elaborative feedback, adaptive weak-area targeting, and full exam simulation.

## What's here

| Path | What it is |
|---|---|
| `app/` | The study web app — Vite + React + TypeScript + Tailwind + Supabase |
| `supabase/migrations/` | Database schema, row-level security, and seeded study content |
| `docs/MASTER_PROMPT.md` | The engineered Claude Code prompt that generates/extends this platform |
| `docs/CAREER_ROADMAP.md` | AI security vs OT security analysis, 12-month plan, portfolio projects |

## Quick start

The Supabase project (`web`, ref `tbaiekqecfqdgeppxmst`) is **already provisioned**: schema,
row-level security, and all study content are applied, and `.env.example` is pre-filled with
its URL and public anon key.

```bash
cd app
cp .env.example .env
npm install
npm run dev            # http://localhost:5173
```

First run: create your account on the sign-in screen (email + password), then start with
the **Flashcards** due queue. Your progress lives in Supabase, so any browser on any device
picks up where you left off.

Notes:
- If signup says to confirm your email, click the link Supabase sends you — or disable
  **Confirm email** under *Authentication → Sign In / Providers* in the Supabase dashboard
  for instant signup (single-user personal project, so this is fine).
- Recommended one-click hardening: enable **Leaked password protection** under
  *Authentication → Passwords* (flagged by the Supabase security advisor).
- To rebuild on a fresh Supabase project instead: run the files in `supabase/migrations/`
  in filename order via the SQL Editor, then point `app/.env` at the new project.

## How to study with this (the short version)

1. **Every day**: clear the flashcard due queue (SRS), then one 15-question mixed quiz.
2. **From week 2**: one full 90-question mock exam per week.
3. **Watch the dashboard**: it tells you your weakest objectives — the quiz picker already
   over-samples them, but hit "Weak areas" mode when a domain lags.
4. **Book the real exam now** for 5–6 weeks out. Sustained 85%+ readiness plus one passed
   mock means you're ready.

## Study features → learning science

- **Flashcards** — SM-2 spaced repetition, incl. a dedicated acronym deck
- **Quiz** — active recall with per-choice explanations; mixed (interleaved), by-domain, or weak-area adaptive modes
- **Exam simulator** — 90 questions / 90 minutes, blueprint-weighted, scaled 100–900 score, 750 pass line, full review
- **Explain-it-back (Feynman)** — write the concept in your own words, compare to a model answer, self-grade
- **Dashboard** — due cards, per-domain mastery, blueprint-weighted readiness score, streak
