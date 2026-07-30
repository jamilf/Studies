-- Close the last four CISSP objective mis-tags: 5.7, 6.6, 6.7, and 8.6 do not
-- exist in the ISC2 2024 outline (D5 is 5.1-5.6, D6 is 5.1-6.5, D8 is 8.1-8.5;
-- 20260715000114_retag_cissp_objectives.sql's header already flags 6.6-6.7 and
-- 8.6 as invented sub-objectives it meant to fix, but four rows were missed and
-- one further pair (5.7) slipped through the same way.
--
-- Every row's content matches an existing official objective precisely:
--   5.7 (pass-the-hash, credential stuffing) -> 5.2 identity & authentication
--       mgmt, which explicitly covers credential attacks
--   6.6 (SAST vs DAST) -> 6.2 control testing, which explicitly covers SAST/DAST
--   6.7 (KPI vs KRI, KPI/KRI trend metrics) -> 6.3 collect process data (KPI/KRI)
--   8.6 (worm vs trojan) -> 8.3 software security risk, which covers malware
--
-- Retagged, not deleted: only the `objective` column changes.

update questions set objective = '5.2' where cert = 'cissp' and objective = '5.7';
update flashcards set objective = '5.2' where cert = 'cissp' and objective = '5.7';

update questions set objective = '6.2' where cert = 'cissp' and objective = '6.6';
update flashcards set objective = '6.2' where cert = 'cissp' and objective = '6.6';

update questions set objective = '6.3' where cert = 'cissp' and objective = '6.7';
update flashcards set objective = '6.3' where cert = 'cissp' and objective = '6.7';

update questions set objective = '8.3' where cert = 'cissp' and objective = '8.6';
update flashcards set objective = '8.3' where cert = 'cissp' and objective = '8.6';
