-- Fix a pre-existing A+ Core 1 defect surfaced while reviewing the wave-2
-- expansion for duplicates: the original seed card a1-a-010 (APIPA) has
-- always carried domain=5 even though APIPA is domain-2 networking content
-- (self-assigned 169.254.x.x addressing when DHCP fails) -- an earlier
-- review pass (20260715000101_review_fixes_aplus1.sql) retagged its
-- objective to 5.7 without correcting the domain, so the mistag persisted.
--
-- The new wave-2 card a1-f-414 (20260726000112_expand_aplus1_d2b.sql)
-- already teaches the identical fact, correctly tagged domain=2,
-- objective=2.6, with a more complete back (adds the diagnostic-signal
-- framing). Rather than retag a1-a-010 into a true duplicate of a1-f-414,
-- delete the redundant, mistagged original.

-- a1-a-010 [E4/E6]: domain-5-tagged APIPA card duplicates the correctly-tagged
-- a1-f-414 (domain 2, objective 2.6). Superseded, not merely mistagged.
delete from public.flashcards where id = 'a1-a-010';
