-- Review fixes for CISSP (ISC2 2024) content, Scope A.
-- Files reviewed:
--   20260711000009_seed_cissp.sql           (96 flashcards: 68 core, 20 acronym, 8 feynman)
--   20260711000010_seed_cissp_questions.sql (55 questions)
--   20260714000009_expand_cissp.sql         (60 flashcards, 95 questions)

-- ============ 20260711000009_seed_cissp.sql ============

-- ci-f-029 [W4]: front named the answer ("(CPTED)") that the back expands, so the card had no retrieval value; rewritten as an acronym-expansion prompt.
update public.flashcards set front = $$What is CPTED and what are its main design principles?$$ where id = 'ci-f-029';

-- ci-f-031 [E4]: fire suppression is site/facility physical security - objective 3.4 under this bank's own convention (ci-f-029 CPTED and ci-q-021 fire suppression are both 3.4), not 3.3 (TCB/architecture items).
update public.flashcards set objective = '3.4' where id = 'ci-f-031';

-- ci-f-017 [E6]: true duplicate of ci-f-082 (identical front "What is the difference between scoping and tailoring a control baseline?"); ci-f-082 kept as stronger (concrete impact-level example and parameter-tailoring detail).
delete from public.flashcards where id = 'ci-f-017';

-- ci-f-019 [E6]: true duplicate of ci-f-080 (same clear/purge/destroy fact); ci-f-080 kept as stronger (anchored to NIST SP 800-88 with recovery-resistance criteria).
delete from public.flashcards where id = 'ci-f-019';

-- ci-f-022 [E6]: true duplicate of ci-f-086 (identical front "What does the Clark-Wilson model enforce?"); ci-f-086 kept as stronger (adds the subject-program-object access triple).
delete from public.flashcards where id = 'ci-f-022';

-- ci-f-034 [E6]: true duplicate of ci-f-094 (identical front "What is the difference between IPsec AH and ESP?"); its tunnel/transport tail is separately covered by ci-f-093, so the single-fact expansion pair is kept.
delete from public.flashcards where id = 'ci-f-034';

-- ci-f-039 [E6]: true duplicate of ci-f-100 (same IAAA-components fact, near-identical front); ci-f-100 kept as stronger (explains each component rather than one-word glosses).
delete from public.flashcards where id = 'ci-f-039';

-- ci-f-041 [E6]: true duplicate of ci-f-101 (same DAC/MAC/RBAC/ABAC fact, near-identical front); ci-f-101 kept as stronger (adds request-time attribute evaluation detail).
delete from public.flashcards where id = 'ci-f-041';

-- ci-f-049 [E6]: true duplicate of ci-f-108 (same black/white/gray-box fact, near-identical front); ci-f-108 kept as stronger (concrete examples of what knowledge each level includes).
delete from public.flashcards where id = 'ci-f-049';

-- ci-f-053 [E6]: true duplicate of ci-f-116 (same (ISC)2 incident phases list); ci-f-116 kept as its front explicitly names the (ISC)2 phase model being asked for.
delete from public.flashcards where id = 'ci-f-053';

-- ci-f-063 [E6]: true duplicate of ci-f-113 (identical front "What is the difference between SAST and DAST?"); ci-f-113 kept as stronger (expands both acronyms and adds SDLC-timing detail).
delete from public.flashcards where id = 'ci-f-063';

-- ci-a-020 [E1]: "Service Organization Control" is the pre-2017 name; AICPA renamed the reports "System and Organization Controls"; back updated with current name and Trust Services Criteria.
update public.flashcards set back = $$System and Organization Controls 2 - AICPA attestation report on a service organization's controls against the Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy); restricted distribution.$$ where id = 'ci-a-020';

-- ============ 20260711000010_seed_cissp_questions.sql ============

-- ci-q-055 [E4]: TCB is an architecture/trusted-computing item - objective 3.3 under this bank's convention (ci-f-026 TCB and ci-q-018 reference monitor are 3.3), not 3.1 (security models).
update public.questions set objective = '3.3' where id = 'ci-q-055';

-- ============ 20260714000009_expand_cissp.sql ============

-- ci-f-069 [E1]: "Protect society, the commonwealth, and the infrastructure" is the retired pre-revision wording; the current (ISC)2 Canon I is "Protect society, the common good, necessary public trust and confidence, and the infrastructure" (matching ci-f-006).
update public.flashcards set back = $$1) Protect society, the common good, necessary public trust and confidence, and the infrastructure. 2) Act honorably, honestly, justly, responsibly, and legally. 3) Provide diligent and competent service to principals. 4) Advance and protect the profession. The canons are ranked - Canon 1 (society/public trust) outranks duty to principals when they conflict.$$ where id = 'ci-f-069';

-- ci-f-073 [E6]: true duplicate of ci-f-002 (same due diligence vs due care fact, near-identical front); ci-f-002 kept as stronger (includes the "diligence = detect, care = act" memory hook).
delete from public.flashcards where id = 'ci-f-073';

-- ci-f-076 [E1]: card presented "six functional types" as the complete list but omitted Recovery, which the CISSP canon includes (seven categories: preventive, deterrent, detective, compensating, corrective, recovery, directive); front and back corrected.
update public.flashcards set front = $$What are the seven categories of security controls by function?$$, back = $$Preventive (stops an incident), Deterrent (discourages an attempt), Detective (identifies one occurring), Corrective (limits damage and fixes the immediate cause), Recovery (restores full capability after an incident, e.g., backups/DR), Compensating (alternative when the primary control is not feasible), and Directive (policy/procedure directing behavior).$$ where id = 'ci-f-076';

-- ci-f-081 [E6]: true duplicate of ci-f-015 (same three-data-states fact, near-identical front); ci-f-015 kept as stronger (adds the exam-tested "data in use is hardest to protect" discriminator, which ci-q-011 tests).
delete from public.flashcards where id = 'ci-f-081';

-- ci-f-089 [E6]: true duplicate of ci-f-027 (same reference-monitor-properties fact); ci-f-027 kept as stronger (also names the security kernel as the implementation, and does not misgloss tamperproof as "cannot be bypassed" - non-bypassability is the complete-mediation property).
delete from public.flashcards where id = 'ci-f-089';

-- ci-f-097 [E1]: KRACK is a key-reinstallation (nonce-reuse) attack, not an offline dictionary attack - SAE does not target the KRACK class; the weakness SAE closes is offline passphrase guessing against a captured WPA2-PSK handshake.
update public.flashcards set back = $$Simultaneous Authentication of Equals (SAE, a Dragonfly password-authenticated key exchange) makes a captured handshake useless for offline dictionary/brute-force attacks - each password guess requires a live exchange - and adds forward secrecy. With WPA2-PSK, a captured four-way handshake could be brute-forced offline against the passphrase. (KRACK was a separate WPA2 key-reinstallation flaw, fixed by patches rather than by SAE.)$$ where id = 'ci-f-097';

-- ci-f-109 [E6]: true duplicate of ci-f-047 (same vulnerability-assessment vs penetration-test fact, near-identical front); ci-f-047 kept as stronger (adds chained exploitation and rules of engagement).
delete from public.flashcards where id = 'ci-f-109';
