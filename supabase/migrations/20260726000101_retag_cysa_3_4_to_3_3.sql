-- Close the last CySA+ objective mis-tag: 3.4 does not exist in CS0-003.
--
-- 20260715000113_retag_cysa_objectives.sql realigned the CySA+ bank to the
-- official blueprint and documents Domain 3 as exactly three objectives:
--   3.1 attack methodology frameworks
--   3.2 perform IR activities
--   3.3 preparation & post-incident
-- but 13 rows were left on a non-existent 3.4 and that pass did not catch them.
--
-- Every one of the 13 is post-incident material -- root cause analysis,
-- lessons-learned / after-action review, corrective-action tracking, blameless
-- review culture, MTTD, and post-breach regulatory obligation -- which is 3.3's
-- scope precisely. Retagged, not deleted: the content is good, only the tag was
-- wrong. Only the `objective` column changes; domain and content are untouched.

update questions
   set objective = '3.3'
 where cert = 'cysa'
   and objective = '3.4';

update flashcards
   set objective = '3.3'
 where cert = 'cysa'
   and objective = '3.4';
