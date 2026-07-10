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

### 1. Connect your Supabase project (one time, ~5 minutes)

1. Create a free project at [supabase.com](https://supabase.com) (any region).
2. Apply the database schema and study content: open the project's **SQL Editor** and run each
   file in `supabase/migrations/` **in filename order** (paste + run), or use the CLI:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```
3. In **Project Settings → API**, copy the Project URL and the anon/publishable key.

### 2. Run the app

```bash
cd app
cp .env.example .env   # paste your Supabase URL + anon key
npm install
npm run dev            # http://localhost:5173
```

First run: create your account on the sign-in screen (email + password), then start with
the **Flashcards** due queue. Your progress lives in Supabase, so any browser on any device
picks up where you left off.

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
