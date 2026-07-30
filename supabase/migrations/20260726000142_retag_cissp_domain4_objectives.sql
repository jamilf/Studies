-- Retag CISSP domain 4 objectives 4.4-4.7, which do not exist in the ISC2
-- 2024 outline (D4 is 4.1-4.3 per 20260715000114's header comment, which
-- explicitly names 4.4-4.7 as invented). That earlier retag only covered
-- ~68 flashcards from the original seed file; it never touched
-- 20260714000009_expand_cissp.sql, whose domain-4 rows still carry the
-- invented 4.4-4.7 numbering untouched.
--
-- Each topic maps cleanly onto an existing official objective:
--   4.4 (IDS vs IPS)                    -> 4.2 secure network components
--   4.5 (WPA3 SAE wireless security)    -> 4.1 secure network architecture/protocols
--   4.6 (SRTP for VoIP)                 -> 4.3 secure comm channels
--   4.7 (VLAN segmentation, iSCSI)      -> 4.1 secure network architecture/protocols
--
-- Retagged, not deleted: only the `objective` column changes.

update questions set objective = '4.2' where cert = 'cissp' and objective = '4.4';
update flashcards set objective = '4.2' where cert = 'cissp' and objective = '4.4';

update questions set objective = '4.1' where cert = 'cissp' and objective = '4.5';
update flashcards set objective = '4.1' where cert = 'cissp' and objective = '4.5';

update questions set objective = '4.3' where cert = 'cissp' and objective = '4.6';
update flashcards set objective = '4.3' where cert = 'cissp' and objective = '4.6';

update questions set objective = '4.1' where cert = 'cissp' and objective = '4.7';
update flashcards set objective = '4.1' where cert = 'cissp' and objective = '4.7';
