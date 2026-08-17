-- Review fixes for CySA+ (CS0-003) wave-2 expansion migrations:
--   20260726000150_expand_cysa_d1.sql, 20260726000151_expand_cysa_d2.sql,
--   20260726000152_expand_cysa_d3.sql, 20260726000153_expand_cysa_d4.sql
-- Per docs/CONTENT_OPTIMISATION_PROMPT.md Scope A fix rules. All 407 new items
-- were reviewed; only the items below needed a fix.

-- ============================================================
-- E4: feynman-card `domain` field mistagged (generator apparently leaked a
-- difficulty-like value into the `domain` column for higher-tier prompts;
-- the `objective` column was correct throughout, only `domain` drifted).
-- Confirmed via full mechanical scan: every flashcard/question row's domain
-- was checked against its objective's leading digit; these 8 were the only
-- mismatches found across all 407 items.
-- ============================================================

-- cy-y-051 [E4]: domain=2 but objective 1.3 is domain 1
update public.flashcards set domain = 1 where id = 'cy-y-051';
-- cy-y-052 [E4]: domain=2 but objective 1.4 is domain 1
update public.flashcards set domain = 1 where id = 'cy-y-052';
-- cy-y-053 [E4]: domain=3 but objective 1.4 is domain 1
update public.flashcards set domain = 1 where id = 'cy-y-053';
-- cy-y-054 [E4]: domain=2 but objective 1.5 is domain 1
update public.flashcards set domain = 1 where id = 'cy-y-054';
-- cy-y-055 [E4]: domain=2 but objective 1.5 is domain 1
update public.flashcards set domain = 1 where id = 'cy-y-055';
-- cy-y-057 [E4]: domain=2 but objective 1.5 is domain 1
update public.flashcards set domain = 1 where id = 'cy-y-057';
-- cy-y-063 [E4]: domain=3 but objective 2.2 is domain 2
update public.flashcards set domain = 2 where id = 'cy-y-063';
-- cy-y-065 [E4]: domain=3 but objective 2.3 is domain 2
update public.flashcards set domain = 2 where id = 'cy-y-065';

-- ============================================================
-- E1: factual error
-- ============================================================

-- cy-a-107 [E1]: TLP's official levels under TLP 2.0 (FIRST, Aug 2022 - the
-- current standard) are RED/AMBER/AMBER+STRICT/GREEN/CLEAR; "WHITE" was
-- retired and renamed to CLEAR. The card listed only the outdated WHITE
-- label. (cy-f-222 in the same file already correctly says "WHITE/CLEAR",
-- so only this acronym card needed the fix.)
update public.flashcards set back = $$Traffic Light Protocol - a labeling scheme (RED/AMBER/GREEN/CLEAR under the current TLP 2.0 standard, which retired the older "WHITE" label) that tells recipients how widely shared threat intelligence may be redistributed.$$ where id = 'cy-a-107';

-- ============================================================
-- E6: true duplicates (same acronym, near-identical definition, tested
-- twice across the wave-2 files). Keeping the stronger/earlier copy in
-- each pair and deleting the later duplicate.
-- ============================================================

-- cy-a-141 [E6]: duplicate of cy-a-108 - both define "ISAC" with near-identical
-- wording ("sector/industry-specific community... share threat intelligence
-- and best practices..."). Kept cy-a-108 (1.4, threat-intel sharing, matches
-- the blueprint's primary placement of ISAC); this later 3.1 copy is a
-- redundant re-teach of the identical fact.
delete from public.flashcards where id = 'cy-a-141';

-- cy-a-164 [E6]: duplicate of cy-a-107 - both define "TLP" with the identical
-- RED/AMBER/GREEN/... color-scheme fact. Kept cy-a-107 (1.4, TLP's primary
-- blueprint placement, now corrected to current TLP 2.0 terminology above);
-- this later 4.2 copy re-taught the same fact (and used the now-inconsistent
-- CLEAR-only wording).
delete from public.flashcards where id = 'cy-a-164';
