-- Review fixes for AWS SCS-C02 wave 2 expansion (20260726000170-175_expand_awsscs_d1..d6.sql).
-- Full-manifest review per docs/CONTENT_OPTIMISATION_PROMPT.md Scope A: all 391
-- new items across d1..d6 (76+71+68+36+64+76, see chat manifest for the per-file
-- flashcard/acronym/feynman/question breakdown) were read for E1/E2/E3,
-- tag-checked for E4 (none found: no row in the six expand
-- files uses the nonexistent 2.2/2.4 objectives, and no domain/objective falls
-- outside the official 17-objective map), and cross-file-scanned for E6 duplicates.
-- No E1 (factual), E2 (answer-key), E3 (contradiction), or W1-W4 (strengthening)
-- issues were found anywhere in the six files - the generated content is unusually
-- accurate and specific throughout. Two genuine E6 duplicate pairs were found,
-- both caused by the same fact being independently added under two different
-- objectives across two different expand files (D2 objective 2.1 and D6
-- objective 6.3 each explicitly targeted "AWS Config aggregators" content per
-- their own migration header, without awareness of the other file).

-- sc-f-723 [E6]: near-duplicate of sc-f-304 (20260726000171_expand_awsscs_d2.sql,
-- objective 2.1) - both define "AWS Config aggregator" with near-identical
-- wording (single consolidated view of config/compliance data across many
-- accounts/regions, no per-account login needed). sc-f-304 is kept: it has
-- the more complete definition (names the two enrollment mechanisms - via an
-- Organization or individual authorizations).
delete from public.flashcards where id = 'sc-f-723';

-- sc-q-723 [E6]: near-duplicate of sc-q-304 (20260726000171_expand_awsscs_d2.sql,
-- objective 2.1) - both pose the identical scenario (a security team managing
-- many accounts wants one centralized Config compliance view without logging
-- into each account) with the same correct answer (Config aggregator) and the
-- same distractor shape (per-account checking, unrelated service, manual
-- role-assumption). sc-q-304 is kept: it specifies both an account count and a
-- region count, making the scenario slightly more concrete.
delete from public.questions where id = 'sc-q-723';

-- sc-f-727 [E6]: near-duplicate of sc-f-306 (20260726000171_expand_awsscs_d2.sql,
-- objective 2.1) - both describe the identical AWS Config auto-remediation
-- mechanism (a remediation action, typically an SSM Automation document,
-- attached to the rule, firing when a resource evaluates as NON_COMPLIANT).
-- sc-f-306 is kept: it includes a concrete worked example (re-enabling S3
-- Block Public Access) that sc-f-727 lacks.
delete from public.flashcards where id = 'sc-f-727';
