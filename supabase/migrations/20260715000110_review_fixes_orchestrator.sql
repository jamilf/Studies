-- Orchestrator-level content fixes surfaced by the Wave 1 bank reviews.
-- These cross a cert boundary or touch currency of a framework, so they were
-- deferred from the per-cert fix migrations (Scope A forbids cross-cert moves).

-- a1-q-085 [E4/cross-cert]: the ESD anti-static wrist strap question is a CompTIA
-- 220-1102 (A+ Core 2) safety-procedures topic (objective 4.4), with no valid
-- 220-1101 (Core 1) objective. The aplus1 reviewer flagged it for an orchestrator
-- cert move. Relocate it to A+ Core 2 so it is served in the correct exam bank.
update public.questions set cert = 'aplus2', domain = 4, objective = '4.4' where id = 'a1-q-085';

-- f5-052 [W1/currency]: the NIST CSF flashcard lists five functions (Identify,
-- Protect, Detect, Respond, Recover), accurate for SY0-701's timeframe. CSF 2.0
-- (2024) added a sixth function, Govern; append a parenthetical so the card stays
-- current without changing the exam-tested five-function core.
update public.flashcards set back = $$A voluntary framework organizing cybersecurity activities into functions (Identify, Protect, Detect, Respond, Recover) - used to assess and communicate security posture maturity. (CSF 2.0, released 2024, adds a sixth function, Govern, covering cybersecurity risk-management strategy and oversight.)$$ where id = 'f5-052';
