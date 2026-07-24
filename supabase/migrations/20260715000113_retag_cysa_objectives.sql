-- Retag CySA+ (CS0-003) study-bank objectives to the OFFICIAL CompTIA blueprint.
-- Scope: 20260711000002_seed_cysa_flashcards.sql, 20260711000003_seed_cysa_questions_a.sql,
--        20260711000004_seed_cysa_questions_b.sql, 20260714000006_expand_cysa.sql
-- Only the `objective` column changes; domain and content are untouched. Items
-- deleted by 20260715000105_review_fixes_cysa.sql are skipped.
-- Official CS0-003 objectives:
--   1.1 system/network architecture | 1.2 analyze indicators of malicious activity |
--   1.3 tools/techniques to determine malicious activity | 1.4 threat intel & hunting |
--   1.5 efficiency/process improvement
--   2.1 scanning methods/concepts | 2.2 analyze vuln-tool output | 2.3 prioritize vulns |
--   2.4 controls for attacks/software vulns | 2.5 vuln response/handling/management
--   3.1 attack methodology frameworks | 3.2 perform IR activities | 3.3 preparation & post-incident
--   4.1 vuln-management reporting | 4.2 incident-response reporting

-- ============================================================
-- DOMAIN 1: Security Operations
-- ============================================================

-- Flashcards (core deck)
-- cy-f-002 [E4]: EDR vs antivirus (detection tooling) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-002';
-- cy-f-003 [E4]: UEBA behavioral analytics (detection technique) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-003';
-- cy-f-004 [E4]: SIEM log aggregation/correlation (detection tool) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-004';
-- cy-f-005 [E4]: IOC vs IOA (indicators of malicious activity) -> 1.2
update public.flashcards set objective = '1.2' where id = 'cy-f-005';
-- cy-f-006 [E4]: beaconing (network indicator) -> 1.2
update public.flashcards set objective = '1.2' where id = 'cy-f-006';
-- cy-f-007 [E4]: MITRE ATT&CK (threat-intel framework) -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-007';
-- cy-f-008 [E4]: Cyber Kill Chain (threat-intel framework) -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-008';
-- cy-f-009 [E4]: Diamond Model (threat-intel framework) -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-009';
-- cy-f-010 [E4]: TTP (threat-intel concept) -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-010';
-- cy-f-011 [E4]: pyramid of pain (threat-intel concept) -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-011';
-- cy-f-012 [E4]: proactive threat hunting -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-012';
-- cy-f-013 [E4]: threat intelligence feeds -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-013';
-- cy-f-014 [E4]: STIX/TAXII (threat-intel sharing) -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-014';
-- cy-f-015 [E4]: PCAP analysis (packet-capture tool) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-015';
-- cy-f-017 [E4]: DNS sinkholing (technique to identify infected hosts) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-017';
-- cy-f-020 [E4]: sandbox malware analysis (tool) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-020';
-- cy-f-021 [E4]: honeypot (detection/deception technique) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-021';
-- cy-f-022 [E4]: structured vs unstructured threat data -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-022';
-- cy-f-023 [E4]: endpoint isolation/quarantine via EDR (tool) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-023';
-- cy-f-024 [E4]: email-header phishing analysis (technique) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-024';
-- cy-f-025 [E4]: false positive vs false negative (detection tuning) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-025';
-- cy-f-026 [E4]: intelligence cycle (threat intel) -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-026';
-- cy-f-027 [E4]: deception technology (detection technique) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-027';
-- cy-f-028 [E4]: tactic vs technique in ATT&CK -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-028';
-- cy-f-029 [E4]: SOAR orchestration/automation (efficiency) -> 1.5
update public.flashcards set objective = '1.5' where id = 'cy-f-029';
-- cy-f-031 [E4]: NetFlow (flow-analysis detection data source) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-031';
-- cy-f-032 [E4]: log correlation across sources (SIEM technique) -> 1.3
update public.flashcards set objective = '1.3' where id = 'cy-f-032';
-- cy-f-033 [E4]: OSINT (threat-intel collection source) -> 1.4
update public.flashcards set objective = '1.4' where id = 'cy-f-033';
