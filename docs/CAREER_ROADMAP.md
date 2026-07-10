# Career Roadmap: AI Security vs OT Security

**Bottom line: go AI security.** OT security is a genuinely lucrative field, but it is the
wrong *first* specialization for someone entering security at the Security+ stage. Here's the
full reasoning, an honest look at the OT path, a 12-month plan, the portfolio projects to
build the moment you pass SY0-701, and the certification path (§4) for the years after.

---

## 1. The comparison, honestly

### Why OT security is tempting
- Critical infrastructure (power, water, manufacturing, oil & gas) is under-defended and
  regulators are forcing investment. Demand is real and growing.
- Low competition: few security people understand PLCs, SCADA, Modbus, or safety-instrumented
  systems. Scarcity means senior OT security consultants bill very well.
- Job security is exceptional — plants can't offshore their substations.

### Why OT is a hard cold-start for you
- **OT pays a premium for prior industrial experience, not certs.** The archetypal OT security
  hire is a controls engineer or plant technician who added security later — someone who has
  physically stood on a plant floor and knows why you never scan a live PLC. Breaking in from
  the outside means competing against people with 10 years of ICS experience.
- **Geography and on-site work.** OT work clusters around industrial regions and frequently
  requires travel to sites or relocation. Remote OT security roles exist but skew senior.
- **Slow ladder.** The respected credential (GICSP) and the trust required to touch
  safety-critical systems take years. "Learn ASAP" and OT do not rhyme.
- **Fewer entry-level seats.** Companies rarely hire junior OT security staff; they convert
  experienced engineers. The junior pipeline is thin.

### Why AI security is the right first specialization
- **Demand curve.** Every company shipping an LLM feature needs someone who understands prompt
  injection, data leakage through RAG, model supply-chain risk, and AI governance. The field
  is years younger than its demand — meaning *nobody* has 10 years of experience. Your
  competition's head start is small and shrinking is impossible; the frontier moves monthly.
- **Portfolio-enterable.** Unlike OT (where you can't exactly buy a substation), you can
  demonstrate real AI security skill from a laptop: build attack demos, run eval harnesses,
  contribute to open-source tooling. Hiring managers in AI security actually read GitHub.
- **Remote-friendly and geography-free.** The work is cloud + code, not plant floors.
- **Compounding skills.** The prerequisite stack — Python, cloud, application security,
  identity — makes you more employable in *general* security even if you pivot. OT skills
  (ladder logic, Purdue model plant zoning) transfer far less.
- **Compensation.** AI security engineers at product companies track software-engineer pay
  bands, which generally beat the consulting/industrial bands OT roles sit in until you're
  quite senior.

### When OT *would* be the right call
If you already had controls/electrical/plant experience, lived near an industrial corridor,
or had a direct in (a relative or contact at a utility willing to bring you into an OT-adjacent
role), the calculus flips — scarcity would work for you instead of against you. If any of that
is true, say so and we'll re-plan. Also worth knowing: the two paths converge later — AI is
increasingly deployed *in* OT environments, and someone with both is rare. You can revisit OT
at year 3–5 from a position of strength.

**Verdict: AI security is easier to enter, faster to income, more remote-friendly, and its
skills compound. OT is a fine *second* specialization, not a first.**

---

## 2. The 12-month roadmap (starting now)

### Phase 0 — Pass Security+ (weeks 0–6)
- Use the study app in this repo daily: clear the SRS queue every day, one mixed quiz daily,
  one full mock exam per week from week 2.
- Book the real exam **now** for ~5–6 weeks out. A date on the calendar is the strongest
  forcing function there is. Reschedule only if two consecutive mocks score under 750.
- Target: sustained 85%+ readiness and one passed mock → sit the exam.

### Phase 1 — Foundations that AI security sits on (months 2–4)
- **Python to working fluency.** Not leetcode — automation fluency: requests, parsing,
  small CLIs. You will live in Python.
- **Hands-on security labs**: TryHackMe (Jr Penetration Tester or SOC Level 1 path) or
  HackTheBox Academy. 4–6 hrs/week. This converts Security+ theory into muscle memory and
  gives you interview stories.
- **Cloud fundamentals**: one provider, learn IAM deeply (roles, policies, least privilege).
  AWS free tier + the AWS Security fundamentals learning path is enough; don't chase the cert yet.
- **Ship portfolio project #1** (see below) — start it the week after you pass Security+.

### Phase 2 — AI security specialization (months 4–8)
- Study the canon: **OWASP Top 10 for LLM Applications**, **MITRE ATLAS** (adversarial ML
  tactics matrix), **NIST AI Risk Management Framework** (governance vocabulary that
  enterprises actually use in job postings).
- Learn the tooling by *using* it: **promptfoo** (LLM eval/red-team harness), **garak**
  (LLM vulnerability scanner), guardrails libraries. Run them against models you host or
  cheap API models.
- Build LLM apps so you can break them credibly: a basic RAG pipeline teaches you exactly
  where retrieval poisoning and data exfiltration live.
- Ship portfolio projects #2 and #3.

### Phase 3 — Get hired (months 8–12)
- **Target roles** (in order of accessibility): security analyst/engineer at a company
  shipping AI features (you're the person on the security team who "gets" AI); AI red-team
  associate; trust & safety engineering; GRC analyst with AI-governance focus (if you lean
  less technical); application security with LLM scope.
- **Certs to add, only if needed for resume filters**: see the full certification path in §4
  below — short version: CySA+ first, then one cloud security cert. AI-security certs are
  still immature — your portfolio outweighs all of them.
- Write up every project as a blog post or detailed README. In a field this young, visible
  work is the credential. Engage where practitioners are: OWASP GenAI Slack, AI-security
  CTFs (e.g., prompt-injection challenges like Gandalf, HackAPrompt-style comps).

---

## 3. Portfolio projects (start after the exam, in this order)

1. **Prompt-Injection Playground** *(2–3 weeks)* — A small web app with an LLM assistant that
   has deliberately vulnerable tool access (email-sending stub, document store). Implement
   5–6 classic attacks (direct injection, indirect injection via retrieved documents, tool
   abuse, system-prompt exfiltration), then implement and measure defenses. Deliverable: the
   app + a README table of attack → defense → measured block rate. This single project covers
   half of first-interview conversation topics.

2. **Secure RAG Chatbot with an Eval Harness** *(3–4 weeks)* — Build a RAG chatbot over a
   document set containing planted "canary" secrets. Wire up **promptfoo** with a red-team
   config and CI so every change re-runs the attack suite. Deliverable: repo + a short writeup
   "what leaked, what stopped it." Demonstrates you can do *engineering*, not just attacks.

3. **Model & Supply-Chain Artifact Scanner** *(2 weeks)* — CLI that scans model artifacts and
   AI project dependencies: flags pickle-based model files (arbitrary code execution),
   suspicious `trust_remote_code`, known-bad packages, secrets in configs. Ties classic
   security (your Security+ knowledge) to the AI stack.

4. **LLM-Assisted SOC Triage Assistant** *(3 weeks)* — Feed sample SIEM alerts (public
   datasets) to an LLM pipeline that enriches, deduplicates, and drafts triage notes — with
   guardrails so the model can't be prompt-injected by attacker-controlled log fields (log
   data is untrusted input; almost nobody handles this — great interview material).

5. **Open-source contributions** *(ongoing)* — Small PRs to garak (new probe), promptfoo
   (new plugin), or OWASP GenAI project docs. One merged PR in a known tool is worth more
   than another cert.

6. *(Stretch)* **AI-meets-OT demo** — Prompt-injection attack against an LLM agent that
   controls a simulated ICS process (open-source simulators exist). This is your hedge: it
   keeps the OT door open and is memorable to both audiences.

---

## 4. Certification path after Security+

Certs are HR filters, not skills — collect the ones that unlock doors on the path above, in
this order, and no faster than one at a time.

### Tier 1 — Year 1, right after Security+
- **CompTIA CySA+** — the natural sequel. Blue-team/SOC analytics maps directly to the
  analyst roles you'll apply for in Phase 3, it's DoD 8140-recognized (opens government and
  contractor postings), and CompTIA's CE stacking means passing it **automatically renews
  your Security+** — one exam, two certs maintained.
- **Skip Network+ and A+.** Once Security+ is passed, they're backwards motion on a resume.
  If your networking fundamentals feel shaky, fix that free in labs (TryHackMe networking
  rooms), not with a $370 exam.

### Tier 2 — Year 1–2: one cloud provider, done properly
Every AI-security role is a cloud role; this tier matters more than Tier 3.
- **AWS track (matches the roadmap's Phase 1 choice):** AWS **Solutions Architect Associate**
  first (the vocabulary cert — IAM, VPC, KMS in depth), then AWS **Security – Specialty**
  (the actual door-opener for cloud security roles).
- **Azure alternative** if your first job lands you Azure-side: **SC-200** (security
  operations analyst) or **AZ-500** (security engineering). Don't do both clouds — depth in
  one beats badges in two.

### Tier 3 — AI-specific certs (clear eyes required)
The field's certifications are years behind its demand; your portfolio projects remain the
real credential. Two exceptions worth knowing:
- **IAPP AIGP (AI Governance Professional)** — only if you lean toward the GRC/AI-governance
  role in Phase 3. It's the one AI cert showing up in real job filters, because it maps to
  the NIST AI RMF and EU AI Act vocabulary compliance teams are hiring for.
- **SANS AI-security courses / ISC2 AI certificates** — take them when an employer pays.
  Never self-fund SANS ($8k+) at this career stage.

### Tier 4 — Year 2–3: offensive certs, only if you go red-team
- **TCM PNPT or HTB CPTS** first — practical, respected by practitioners, a fraction of the
  cost, and better teaching than the brand-name option.
- **OSCP** when (and only when) an employer pays or a specific posting demands it — it's the
  HR filter for pentest roles, not the best education.

### Tier 5 — Year 4–5: seniority filters
- **CISSP** — the gate to senior/management roles and a hard requirement in many postings.
  It needs ~5 years of experience to fully hold; you can pass the exam earlier and hold
  "Associate of ISC2" status until the experience accrues.
- **GICSP** — only if you execute the OT pivot described in §1 at year 3–5. This is where the
  AI+OT combination becomes a genuinely rare profile.

### Rules of thumb
- **One cert in flight at a time.** Parallel cert-chasing is how people spend two years
  studying instead of shipping projects #1–3.
- **Name the door before you pay.** Every cert should correspond to a real job posting you
  want that filters on it. If you can't point to one, build a project instead.
- **Exploit CE stacking.** Each higher CompTIA cert renews everything beneath it — sequence
  CySA+ near your Security+ three-year mark and you never pay renewal CEU fees.
- **Let employers fund the expensive ones.** SANS, OSCP, and CISSP training are standard
  employer-paid benefits; self-funding them early is spending your own money on someone
  else's obligation.

---

## 5. Milestones to hold yourself to

| When | Milestone |
|---|---|
| Week 5–6 | Pass SY0-701 (750+) |
| Month 3 | Python fluent enough to build project #1; TryHackMe path ~50% done |
| Month 4 | Project #1 public with writeup |
| Month 6 | Projects #2–3 public; OWASP LLM Top 10 + ATLAS internalized |
| Month 8 | First open-source PR merged; applying to roles weekly |
| Month 12 | Employed in a security role with AI scope (or interviewing at final rounds) |
