-- Coverage-certification re-audit fixes for A+ Core 2 (220-1102) content bank.
-- Scope: 20260711000012_seed_aplus2.sql and 20260714000011_expand_aplus2.sql,
-- effective state AFTER 20260715000102_review_fixes_aplus2.sql was applied.
-- This file adds ONLY newly-found objective mistags that 000102 missed; every
-- other row was reviewed and found already-correct or already-fixed by 000102.

-- a2-a-003 [E4]: UAC is a Windows OS security setting (domain 2, obj 2.5), not a
-- domain 1 / 1.5 Windows setting; 000102 already moved the parallel UAC card
-- a2-f-045 and question a2-q-051 to 2.5 but missed this acronym card.
update public.flashcards set domain = 2, objective = '2.5' where id = 'a2-a-003';

-- a2-q-030 [E4]: "why the user is educated as the LAST malware-removal step" is a
-- 3.3 malware-removal best-practice item, not 3.2 PC security issues; 000102 moved
-- the sibling process items (a2-q-025, a2-q-060, a2-q-061) to 3.3 but missed this one.
update public.questions set objective = '3.3' where id = 'a2-q-030';
