-- Retag CISSP (ISC2 2024) study-bank `objective` tags to the OFFICIAL exam outline.
-- Scope A, objective-column only. The pre-existing tags were an invented, internally
-- inconsistent scheme (same topic tagged differently across seed vs. expand, plus
-- non-existent sub-objectives 4.4-4.7, 5.5-5.7, 6.6-6.7, 8.6). This migration realigns
-- every non-deleted item to the real 2024 sub-objective for its topic. domain, front,
-- back, stem, choices, answer, explanation are NOT touched.
--
-- Official 2024 sub-objective ranges used:
--   D1 1.1-1.13  D2 2.1-2.6  D3 3.1-3.9  D4 4.1-4.3
--   D5 5.1-5.6   D6 6.1-6.5  D7 7.1-7.15 D8 8.1-8.5
--
-- Canonical topic -> official objective map (applied consistently across all files):
--   D1: ethics 1.1 | CIA/security concepts 1.2 | governance & due care/diligence 1.3 |
--       legal/regulatory/IP/privacy(GDPR) 1.5 | policy/standards/procedures/guidelines 1.7 |
--       BIA/BC requirements 1.8 | risk mgmt (SLE/ARO/ALE, treatment, residual, control types) 1.10 |
--       threat modeling (STRIDE/PASTA) 1.11 | supply-chain/third-party risk 1.12 | awareness/training 1.13
--   D2: classify assets/levels 2.1 | data roles & lifecycle/remanence/sanitization/retention 2.4 |
--       data states/scoping-tailoring/DLP/sovereignty(controls & compliance) 2.6
--   D3: secure design principles (defense-in-depth, fail-secure) 3.1 | security models 3.2 |
--       security capabilities of IS (TCB/reference monitor/EAL) 3.4 | architecture vulns (ICS) 3.5 |
--       cryptographic solutions 3.6 | cryptanalytic attacks 3.7 | site/facility design (CPTED) 3.8 |
--       facility controls (fire suppression) 3.9
--   D4: secure network architecture/protocols (OSI, TCP/IP, IPsec, segmentation, wireless, iSCSI, SDN, secure-protocol replacements) 4.1 |
--       secure network components (firewalls, IDS/IPS) 4.2 | secure comm channels (VoIP/SRTP, VPN split-tunnel) 4.3
--   D5: control access to assets (least privilege/need-to-know) 5.1 | identity & authentication mgmt (IAAA, MFA, biometrics, credential attacks) 5.2 |
--       authorization mechanisms (DAC/MAC/RBAC/ABAC) 5.4 | identity provisioning lifecycle 5.5 |
--       implement authentication systems (SAML/OAuth/OIDC/Kerberos) 5.6
--   D6: control testing (vuln assessment/pentest/box types, code review, SAST/DAST, synthetic txn, log review, 800-53A methods) 6.2 |
--       collect process data (KPI/KRI) 6.3 | conduct/facilitate audits (SOC reports, audit types) 6.5
--   D7: investigations/evidence/chain-of-custody/volatility 7.1 | logging/monitoring/egress(DLP) 7.2 |
--       configuration mgmt 7.3 | foundational ops (SoD/job rotation) 7.4 | incident mgmt phases 7.6 |
--       patch/vuln mgmt 7.8 | change mgmt 7.9 | recovery strategies (RAID, backups, sites, RTO/RPO) 7.10 |
--       DR processes 7.11 | test DRP 7.12 | BC planning 7.13 | physical security (mantrap) 7.14
--   D8: SDLC/shift-left 8.1 | dev ecosystem (SCM, code repos/secrets, SAST/DAST) 8.2 |
--       software security risk (aggregation/inference, malware) 8.3 | acquired software (SCA) 8.4 |
--       secure coding guidelines & standards (injection, deserialization, OWASP, API/rate-limit) 8.5
--
-- Skips ids deleted by 20260715000108: flashcards ci-f-017/019/022/034/039/041/049/053/063/073/081/089/109;
-- questions ci-q-069/075/117. Current objective reflects 000108 (ci-f-031->3.4, ci-q-055->3.3).

-- ============ 20260711000009_seed_cissp.sql (flashcards) ============

-- ci-f-001 [E4]: CIA triad / security concepts -> 1.2
update public.flashcards set objective = '1.2' where id = 'ci-f-001';
-- ci-f-002 [E4]: due care vs due diligence (governance) -> 1.3
update public.flashcards set objective = '1.3' where id = 'ci-f-002';
-- ci-f-003 [E4]: quantitative risk analysis SLE/ARO/ALE -> 1.10
update public.flashcards set objective = '1.10' where id = 'ci-f-003';
-- ci-f-004 [E4]: four risk treatment options -> 1.10
update public.flashcards set objective = '1.10' where id = 'ci-f-004';
-- ci-f-005 [E4]: residual risk -> 1.10
update public.flashcards set objective = '1.10' where id = 'ci-f-005';
-- ci-f-007 [E4]: policy/standard/procedure/guideline -> 1.7
update public.flashcards set objective = '1.7' where id = 'ci-f-007';
-- ci-f-009 [E4]: Business Impact Analysis (BC requirements) -> 1.8
update public.flashcards set objective = '1.8' where id = 'ci-f-009';
-- ci-f-010 [E4]: MTD/RTO (BIA output) -> 1.8
update public.flashcards set objective = '1.8' where id = 'ci-f-010';
-- ci-f-011 [E4]: threat/vulnerability/exposure/risk (risk concepts) -> 1.10
update public.flashcards set objective = '1.10' where id = 'ci-f-011';
-- ci-f-013 [E4]: data lifecycle roles -> 2.4
update public.flashcards set objective = '2.4' where id = 'ci-f-013';
-- ci-f-014 [E4]: data classification levels -> 2.1
update public.flashcards set objective = '2.1' where id = 'ci-f-014';
-- ci-f-015 [E4]: three data states (data security controls) -> 2.6
update public.flashcards set objective = '2.6' where id = 'ci-f-015';
-- ci-f-018 [E4]: DLP (data protection methods) -> 2.6
update public.flashcards set objective = '2.6' where id = 'ci-f-018';
-- ci-f-020 [E4]: data sovereignty (controls & compliance) -> 2.6
update public.flashcards set objective = '2.6' where id = 'ci-f-020';
-- ci-f-021 [E4]: Bell-LaPadula vs Biba (security models) -> 3.2
update public.flashcards set objective = '3.2' where id = 'ci-f-021';
-- ci-f-023 [E4]: symmetric vs asymmetric cryptography -> 3.6
update public.flashcards set objective = '3.6' where id = 'ci-f-023';
-- ci-f-024 [E4]: digital signature -> 3.6
update public.flashcards set objective = '3.6' where id = 'ci-f-024';
-- ci-f-025 [E4]: encryption vs hashing -> 3.6
update public.flashcards set objective = '3.6' where id = 'ci-f-025';
-- ci-f-026 [E4]: TCB (security capabilities of IS) -> 3.4
update public.flashcards set objective = '3.4' where id = 'ci-f-026';
-- ci-f-027 [E4]: reference monitor (security capabilities of IS) -> 3.4
update public.flashcards set objective = '3.4' where id = 'ci-f-027';
-- ci-f-029 [E4]: CPTED (site/facility design) -> 3.8
update public.flashcards set objective = '3.8' where id = 'ci-f-029';
-- ci-f-030 [E4]: perfect forward secrecy (cryptographic solutions) -> 3.6
update public.flashcards set objective = '3.6' where id = 'ci-f-030';
-- ci-f-031 [E4]: fire suppression (facility security controls) -> 3.9
update public.flashcards set objective = '3.9' where id = 'ci-f-031';
-- ci-f-033 [E4]: TCP vs UDP (TCP/IP model, network architecture) -> 4.1
update public.flashcards set objective = '4.1' where id = 'ci-f-033';
-- ci-f-037 [E4]: secure protocol replacements -> 4.1
update public.flashcards set objective = '4.1' where id = 'ci-f-037';
-- ci-f-043 [E4]: SAML federated SSO (authentication systems) -> 5.6
update public.flashcards set objective = '5.6' where id = 'ci-f-043';
-- ci-f-044 [E4]: least privilege vs need to know (control access to assets) -> 5.1
update public.flashcards set objective = '5.1' where id = 'ci-f-044';
-- ci-f-045 [E4]: identity lifecycle (provisioning/deprovisioning) -> 5.5
update public.flashcards set objective = '5.5' where id = 'ci-f-045';
-- ci-f-046 [E4]: OAuth vs OIDC (authentication systems) -> 5.6
update public.flashcards set objective = '5.6' where id = 'ci-f-046';
-- ci-f-047 [E4]: vulnerability assessment vs penetration test (control testing) -> 6.2
update public.flashcards set objective = '6.2' where id = 'ci-f-047';
-- ci-f-048 [E4]: SOC 1/2/3 reports (audits) -> 6.5
update public.flashcards set objective = '6.5' where id = 'ci-f-048';
-- ci-f-051 [E4]: synthetic vs real user monitoring (control testing) -> 6.2
update public.flashcards set objective = '6.2' where id = 'ci-f-051';
-- ci-f-052 [E4]: internal/external/third-party audit -> 6.5
update public.flashcards set objective = '6.5' where id = 'ci-f-052';
-- ci-f-054 [E4]: RAID levels (recovery strategies/fault tolerance) -> 7.10
update public.flashcards set objective = '7.10' where id = 'ci-f-054';
-- ci-f-055 [E4]: backup types (recovery strategies) -> 7.10
update public.flashcards set objective = '7.10' where id = 'ci-f-055';
-- ci-f-056 [E4]: BCP vs DRP (BC planning) -> 7.13
update public.flashcards set objective = '7.13' where id = 'ci-f-056';
-- ci-f-057 [E4]: hot/warm/cold recovery sites (recovery site strategies) -> 7.10
update public.flashcards set objective = '7.10' where id = 'ci-f-057';
-- ci-f-058 [E4]: event/incident/breach (incident management) -> 7.6
update public.flashcards set objective = '7.6' where id = 'ci-f-058';
-- ci-f-059 [E4]: order of volatility (investigations/evidence) -> 7.1
update public.flashcards set objective = '7.1' where id = 'ci-f-059';
-- ci-f-060 [E4]: separation of duties & job rotation (foundational ops) -> 7.4
update public.flashcards set objective = '7.4' where id = 'ci-f-060';
-- ci-f-061 [E4]: law categories relevant to investigations -> 7.1
update public.flashcards set objective = '7.1' where id = 'ci-f-061';
-- ci-f-064 [E4]: injection secure-coding defenses -> 8.5
update public.flashcards set objective = '8.5' where id = 'ci-f-064';
-- ci-f-066 [E4]: software configuration management (dev ecosystem) -> 8.2
update public.flashcards set objective = '8.2' where id = 'ci-f-066';
-- ci-f-067 [E4]: insecure deserialization (source-code vulnerability) -> 8.5
update public.flashcards set objective = '8.5' where id = 'ci-f-067';
-- ci-f-068 [E4]: SCA tool (acquired/third-party software) -> 8.4
update public.flashcards set objective = '8.4' where id = 'ci-f-068';
