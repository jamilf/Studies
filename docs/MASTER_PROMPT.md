# Master Prompt: Security+ (SY0-701) Accelerated Study Platform

> Paste everything below the divider into a fresh Claude Code session to (re)generate or extend
> the study platform in this repo. It is written to be self-contained: exam blueprint, learning
> science requirements, data model, content-generation rules, and acceptance criteria are all
> inline so the agent never has to guess.

---

## ROLE

You are a senior full-stack engineer AND an evidence-based learning scientist AND a CompTIA
Security+ (SY0-701) subject-matter expert. Your job is to build (or extend) a personal
web application whose single purpose is to get one user — an early-career security learner —
to a passing score (750+/900) on the SY0-701 exam in the shortest possible calendar time,
with durable retention.

Optimize every design decision for **time-to-pass** and **retention**, not for visual polish
or feature breadth. When in doubt, choose the option that produces more retrieval practice
per minute of study.

## EXAM CONTEXT (ground truth — do not deviate)

CompTIA Security+ SY0-701:

- Max 90 questions, 90 minutes. Multiple-choice + performance-based questions (PBQs).
- Scaled score 100–900; **750 to pass**.
- Five domains and official blueprint weights:
  1. **General Security Concepts — 12%** (controls; CIA; non-repudiation; AAA; zero trust;
     physical security; deception tech; change management; cryptographic solutions: PKI,
     encryption levels, obfuscation, hashing, salting, digital signatures, key stretching,
     blockchain, certificates)
  2. **Threats, Vulnerabilities & Mitigations — 22%** (threat actors and motivations; attack
     surfaces and vectors; social engineering; malware types; app/network/cryptographic/
     password attacks; indicators; vulnerability classes incl. cloud, mobile, IoT/OT;
     mitigation techniques: segmentation, ACLs, hardening, least privilege)
  3. **Security Architecture — 18%** (cloud, IaC, serverless, microservices, network infra,
     virtualization, containers, IoT/ICS/SCADA/RTOS/embedded; high availability; secure
     comms: VPN, TLS, IPSec, SD-WAN, SASE; data types/classifications/states and protection
     methods; resilience: backups, RAID, multi-region, CO-OP, capacity planning, testing)
  4. **Security Operations — 28%** (secure baselines, hardening, wireless, mobile solutions;
     asset management; vulnerability management: scans, CVSS, CVE, remediation; monitoring:
     SIEM, SCAP, NetFlow, DLP, SNMP traps; firewalls, IDS/IPS, web filtering, OS policy,
     secure protocols, email security, EDR/XDR, NAC; IAM: provisioning, SSO, LDAP, OAuth,
     SAML, MFA, password concepts, PAM; automation/orchestration; incident response process;
     digital forensics; log data sources)
  5. **Security Program Management & Oversight — 20%** (governance: policies, standards,
     procedures; risk management: assessment, analysis, register, tolerance/appetite, BIA —
     RTO/RPO/MTTR/MTBF; third-party risk; compliance and privacy; audits and assessments;
     pen testing concepts; security awareness)

## MULTI-CERTIFICATION MODEL

The platform is not Security+-only. It hosts multiple certifications side by side, selected by
a header dropdown, each with its own content, domains, blueprint weights, and exam-simulator
parameters. Currently seeded: **A+ Core 1 (220-1101)**, **A+ Core 2 (220-1102)**,
**Network+ (N10-009)**, **Security+ (SY0-701)**, **CySA+ (CS0-003)**,
**AWS Solutions Architect Associate (SAA-C03)**, **AWS Security Specialty (SCS-C02)**, and
**CISSP (ISC2)**.

How it works:
- Every `flashcards` / `questions` / `exam_attempts` row carries a `cert` text column.
  The `domain` check allows 1–8 (CISSP has 8 domains).
- `app/src/lib/certs.ts` is the **cert registry**: each entry defines `id`, `label`,
  `examCode`, `domains` (number→name), `weights` (blueprint fractions summing to 1), and
  `exam` params (`questions`, `minutes`, `pass`, `scaleMin`, `scaleMax`). `domainCounts()`
  apportions an exam form across domains by weight (largest-remainder).
- `app/src/cert/CertContext.tsx` holds the active cert (persisted in `localStorage`); every
  page reads `useCert()` and filters all queries by `cert.id`, and the exam simulator uses the
  per-cert exam params and `scaledScore()`.

**To add another certification:** (1) add a registry entry to `CERTS`/`CERT_ORDER` in
`certs.ts`; (2) generate a seed migration `supabase/migrations/<ts>_seed_<cert>.sql` following
the content rules below, tagging every row with the new `cert` id and blueprint-weighted
domains; (3) apply it to Postgres and verify answer-index integrity; (4) no schema or app
framework change is needed — the registry drives everything.

**Content ethics rule:** every question and flashcard must be ORIGINAL, written from the
public exam objectives. Never reproduce real/leaked exam items ("brain dumps"). This is both
an integrity requirement and a legal one.

## LEARNING SCIENCE REQUIREMENTS (each maps to a concrete feature)

Implement ALL of these. They are the point of the app.

1. **Spaced repetition (SM-2).** Flashcards scheduled by an SM-2 algorithm: grades
   Again/Hard/Good/Easy; ease factor floor 1.3; graduated intervals; due queue computed
   daily. Failing a card resets its interval. The dashboard leads with "N cards due today."
2. **Active recall over recognition.** Never show answer before the learner commits.
   Flashcards flip only on demand; quiz questions lock in an answer before feedback.
3. **Elaborative feedback.** Every quiz question carries an explanation that says why the
   right answer is right AND why each distractor is wrong. Wrong answers are teaching
   moments; make the explanation the best part of the app.
4. **Interleaving.** "Mixed quiz" mode draws across all five domains in a single session.
   Blocked-by-domain practice exists but is not the default.
5. **Adaptive weak-area targeting.** Track rolling accuracy per exam objective. The quiz
   picker over-samples the learner's weakest objectives (weighted random, never pure
   drilling of one topic — keep some interleaving).
6. **Deliberate exam simulation.** Full mock exam: 90 questions in 90 minutes, composed to
   blueprint weights, countdown timer, flag-for-review, no feedback until submission, then
   a scaled 100–900 score (750 pass line) and a full post-exam review of every question.
7. **PBQ-style items.** Include ordering questions (e.g., incident response steps) and
   matching questions (e.g., attack → control) to mirror the PBQ format.
8. **Feynman technique.** "Explain it back" mode: show a concept prompt, learner writes a
   free-text explanation, then reveal a model answer and self-grade (feeds the SRS state).
9. **Acronym drills.** Security+ is acronym-dense; a dedicated acronym deck (SIEM, SOAR,
   CVSS, RTO, RPO, SASE, …) with its own SRS state.
10. **Metacognition dashboard.** Per-domain mastery bars, an overall readiness score
    (blueprint-weighted accuracy blended with SRS maturity), study streak, and review
    forecast. The learner should always know exactly what to do next.

## ARCHITECTURE

- `app/`: Vite + React + TypeScript + Tailwind CSS + react-router. SPA, no server of our own.
- Backend: Supabase (Postgres + auth). Client via `@supabase/supabase-js`.
  Env vars `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` in `app/.env` (gitignored),
  with a committed `app/.env.example`.
- Auth: email + password, single user, no sign-up UI beyond first-run.
- `supabase/migrations/`: SQL migrations for schema, RLS, and seed content, applied via the
  Supabase MCP tools or CLI.

### Data model

Content (read-only to authenticated users):

- `flashcards(id, deck, domain, objective, front, back, created_at)` — deck ∈ {core, acronym, feynman}
- `questions(id, domain, objective, qtype, difficulty, stem, choices jsonb, answer jsonb, explanation, created_at)`
  — qtype ∈ {mcq, multi, ordering, matching}; `choices`/`answer` shapes depend on qtype;
  difficulty 1–3.

User state (RLS: `auth.uid() = user_id` on ALL operations):

- `card_states(user_id, card_id, ease, interval_days, reps, lapses, due_at, last_grade, updated_at)`
- `answer_events(id, user_id, question_id, quiz_kind, correct, chosen jsonb, answered_at)` — the
  atom for all analytics; per-objective accuracy is computed from it.
- `exam_attempts(id, user_id, started_at, submitted_at, question_ids jsonb, responses jsonb, raw_correct, scaled_score, passed)`
- `study_days(user_id, day, reviews, questions_answered)` — streak + activity.

### SM-2 (exact spec)

grade ∈ {0 Again, 3 Hard, 4 Good, 5 Easy}. On review:
- Again: `lapses+1`, `reps=0`, `interval=0` (relearn today), ease `-0.2` (floor 1.3).
- Hard/Good/Easy: `reps+1`; interval: rep1→1d, rep2→6d, else `round(interval*ease)`;
  Hard multiplies interval by 1.2 instead and ease `-0.15`; Easy adds ease `+0.15` and a 1.3×
  interval bonus; Good leaves ease unchanged... standard SM-2 with these deltas:
  `ease' = ease + (0.1 - (5-q)*(0.08+(5-q)*0.02))`, floor 1.3. `due_at = now + interval` days.

### Readiness score

`readiness = Σ_domain weight_d × accuracy_d` over the last 100 answer_events per domain,
blended 70/30 with SRS maturity (fraction of cards with interval ≥ 7d). Display as
"Exam readiness: NN%" with the honest caveat that ≥85% sustained + a passed mock ≈ book the exam.

## CONTENT GENERATION RULES

- Volume targets: ≥300 core flashcards, ≥100 acronym cards, ≥250 questions, ≥25 Feynman
  prompts. Distribute by blueprint weight (e.g., ~28% of questions in Domain 4).
- Every item tagged with `domain` (1–5) and `objective` (e.g., "2.4") from the official
  objectives list.
- Question style: scenario-first stems where possible ("A security analyst notices…"),
  one unambiguously best answer, plausible distractors drawn from sibling concepts,
  explanation covering every choice. Difficulty mix ≈ 30% easy / 50% medium / 20% hard.
- Flashcard style: atomic (one fact per card), front is a question not a topic name
  ("What control type is a security guard?" not "Security guards").
- Seed via SQL migration files so content is versioned in git.

## ACCEPTANCE CRITERIA

- `npm run build` passes clean; app runs with `npm run dev`.
- Auth works; all user-state tables have RLS verified by Supabase security advisors (zero findings).
- Flashcard review persists SM-2 state and tomorrow's due queue is correct.
- Mixed quiz oversamples weak objectives (verify by inspecting picker weights after seeding
  deliberately-wrong answers).
- Mock exam: 90 blueprint-weighted questions, hard 90-minute timer, scaled score, full review.
- Dashboard shows due count, per-domain mastery, readiness, streak.

## ITERATION PROMPTS (use these after the first build)

- "Generate 50 additional Domain 4 questions at difficulty 3, focused on objectives 4.6–4.9,
  and seed them as a new migration."
- "My mock exam scores are weakest in Domain 5 — build me a 3-day remediation plan and a
  targeted 40-question drill."
- "Add a 'why I missed it' journal: after each wrong exam answer, prompt me to classify the
  miss (didn't know / misread / second-guessed) and chart it."
- "Harden the exam simulator: add a PBQ section at the start like the real exam."
- "Export my weakest 50 flashcards to a printable one-page cram sheet."
