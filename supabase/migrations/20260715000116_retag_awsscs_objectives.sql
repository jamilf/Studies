-- Retag AWS Security Specialty (SCS-C02) objective tags to the OFFICIAL exam-guide
-- task statements. Scope A, objective column ONLY (domain integers already correct).
-- Deleted ids skipped (per 20260715000107): sc-f-060, sc-q-054, sc-q-060, sc-q-068,
-- sc-q-071, sc-q-073.
--
-- Official task-statement mapping applied:
--   D1: 1.1 IR plan (Incident Manager, runbooks) | 1.2 detect (GuardDuty, Detective,
--       Security Hub, Macie, Inspector) | 1.3 respond/remediate (EventBridge+Lambda,
--       containment, credential compromise)
--   D2: 2.1 monitoring/alerting (CloudWatch metric filters/alarms, Config drift,
--       CloudTrail Insights, Traffic Mirroring) | 2.3 logging (CloudTrail, Flow Logs,
--       log validation, org trails, data events, session logs) | 2.5 log analysis
--       (CloudWatch Logs Insights)
--   D3: 3.1 edge (WAF, Shield, Firewall Manager) | 3.2 network (SG, NACL, Network
--       Firewall, endpoints, PrivateLink, NAT) | 3.3 compute (SSM Session Manager)
--   D4: 4.1 authentication (federation, IAM Identity Center, ABAC, MFA, STS) |
--       4.2 authorization (policies, boundaries, SCPs, grants, resource policies,
--       Access Analyzer, condition keys)
--   D5: 5.1 data at rest (encryption at rest, Macie classification, Block Public
--       Access) | 5.2 data in transit (TLS) | 5.3 key management + immutability
--       (KMS, CloudHSM, rotation, grants, envelope, Object Lock/versioning WORM)
--   D6: 6.1 central account mgmt (Organizations, Control Tower, SCPs, tag policies) |
--       6.2 multi-account strategy (blast-radius isolation, landing-zone structure) |
--       6.3 evaluate compliance (Config conformance packs, Trusted Advisor, Audit
--       Manager, Security Hub standards)

-- ============ 20260711000007_seed_awsscs.sql (flashcards) ============

-- core: Domain 1
-- sc-f-001 [E4]: GuardDuty threat detection -> 1.2
update public.flashcards set objective = '1.2' where id = 'sc-f-001';
-- sc-f-002 [E4]: Detective investigation -> 1.2
update public.flashcards set objective = '1.2' where id = 'sc-f-002';
-- sc-f-003 [E4]: Security Hub finding aggregation -> 1.2
update public.flashcards set objective = '1.2' where id = 'sc-f-003';
-- sc-f-004 [E4]: automated GuardDuty response (EventBridge/Lambda) -> 1.3
update public.flashcards set objective = '1.3' where id = 'sc-f-004';
-- sc-f-005 [E4]: contain compromised EC2 instance -> 1.3
update public.flashcards set objective = '1.3' where id = 'sc-f-005';
-- sc-f-006 [E4]: Inspector vulnerability detection -> 1.2
update public.flashcards set objective = '1.2' where id = 'sc-f-006';
-- sc-f-007 [E4]: leaked access key response -> 1.3
update public.flashcards set objective = '1.3' where id = 'sc-f-007';
-- sc-f-008 [E4]: GuardDuty cryptomining/C2 detection -> 1.2
update public.flashcards set objective = '1.2' where id = 'sc-f-008';

-- core: Domain 2
-- sc-f-009 [E4]: CloudTrail API logging -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-f-009';
-- sc-f-010 [E4]: protect CloudTrail logs (logging solution) -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-f-010';
-- sc-f-011 [E4]: CloudWatch Logs metric filters/alarms -> 2.1
update public.flashcards set objective = '2.1' where id = 'sc-f-011';
-- sc-f-012 [E4]: VPC Flow Logs -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-f-012';
-- sc-f-013 [E4]: Config drift monitoring/alerting -> 2.1
update public.flashcards set objective = '2.1' where id = 'sc-f-013';
-- sc-f-014 [E4]: root sign-in alerting -> 2.1
update public.flashcards set objective = '2.1' where id = 'sc-f-014';
-- sc-f-015 [E4]: CloudTrail organization trail -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-f-015';
-- sc-f-016 [E4]: centralize logs across accounts -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-f-016';
-- sc-f-017 [E4]: CloudTrail log file validation -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-f-017';

-- core: Domain 3
-- sc-f-018 [E4]: Network Firewall (network) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sc-f-018';
-- sc-f-019 [E4]: SG/NACL/Network Firewall layering (network) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sc-f-019';
-- sc-f-020 [E4]: WAF (edge) -> 3.1
update public.flashcards set objective = '3.1' where id = 'sc-f-020';
-- sc-f-021 [E4]: VPC endpoints (network) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sc-f-021';
-- sc-f-022 [E4]: endpoint policy (network) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sc-f-022';
-- sc-f-023 [E4]: Shield Advanced (edge) -> 3.1
update public.flashcards set objective = '3.1' where id = 'sc-f-023';
-- sc-f-024 [E4]: bastion/Session Manager (compute) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sc-f-024';
-- sc-f-025 [E4]: Session Manager vs SSH (compute) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sc-f-025';
-- sc-f-026 [E4]: Firewall Manager (edge policy mgmt) -> 3.1
update public.flashcards set objective = '3.1' where id = 'sc-f-026';
-- sc-f-027 [E4]: NAT Gateway (network) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sc-f-027';

-- core: Domain 4
-- sc-f-028 [E4]: IAM policy evaluation (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-f-028';
-- sc-f-029 [E4]: permission boundary (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-f-029';
-- sc-f-030 [E4]: SCP/boundary/policy (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-f-030';
-- sc-f-031 [E4]: IAM Identity Center (authentication) -> 4.1
update public.flashcards set objective = '4.1' where id = 'sc-f-031';
-- sc-f-033 [E4]: STS AssumeRole (authentication) -> 4.1
update public.flashcards set objective = '4.1' where id = 'sc-f-033';
-- sc-f-034 [E4]: resource-based policy (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-f-034';
-- sc-f-035 [E4]: IAM Access Analyzer (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-f-035';

-- core: Domain 5
-- sc-f-037 [E4]: KMS managed vs customer key (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-037';
-- sc-f-038 [E4]: key policy vs grant (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-038';
-- sc-f-039 [E4]: KMS automatic key rotation (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-039';
-- sc-f-040 [E4]: Macie sensitive-data discovery (data at rest) -> 5.1
update public.flashcards set objective = '5.1' where id = 'sc-f-040';
-- sc-f-042 [E4]: envelope encryption (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-042';
-- sc-f-043 [E4]: S3 Block Public Access (data at rest) -> 5.1
update public.flashcards set objective = '5.1' where id = 'sc-f-043';
-- sc-f-044 [E4]: CloudHSM (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-044';
-- sc-f-046 [E4]: KMS key grant (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-046';

-- core: Domain 6
-- sc-f-049 [E4]: Config conformance pack (compliance eval) -> 6.3
update public.flashcards set objective = '6.3' where id = 'sc-f-049';
-- sc-f-051 [E4]: Trusted Advisor (compliance eval) -> 6.3
update public.flashcards set objective = '6.3' where id = 'sc-f-051';
-- sc-f-052 [E4]: multi-account strategy value -> 6.2
update public.flashcards set objective = '6.2' where id = 'sc-f-052';
-- sc-f-053 [E4]: Security Hub compliance-standard checks -> 6.3
update public.flashcards set objective = '6.3' where id = 'sc-f-053';

-- acronym deck
-- sc-a-002 [E4]: VPC Flow Logs (logging) -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-a-002';
-- sc-a-003 [E4]: SCP (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-a-003';
-- sc-a-005 [E4]: KMS (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-a-005';
-- sc-a-006 [E4]: CMK/KMS key (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-a-006';
-- sc-a-007 [E4]: HSM/CloudHSM (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-a-007';
-- sc-a-008 [E4]: WAF (edge) -> 3.1
update public.flashcards set objective = '3.1' where id = 'sc-a-008';
-- sc-a-009 [E4]: Security Group (network) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sc-a-009';
-- sc-a-010 [E4]: NACL (network) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sc-a-010';
-- sc-a-011 [E4]: FSBP Security Hub standard (detection) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sc-a-011';
-- sc-a-012 [E4]: SSM Session Manager session logging (logging) -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-a-012';
-- sc-a-014 [E4]: FIPS crypto compliance (key mgmt hardware) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-a-014';
-- sc-a-015 [E4]: IdP federated authentication -> 4.1
update public.flashcards set objective = '4.1' where id = 'sc-a-015';

-- feynman deck
-- sc-y-001 [E4]: GuardDuty/Security Hub/Detective (detection) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sc-y-001';
-- sc-y-002 [E4]: SCP/boundary/policy (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-y-002';
-- sc-y-003 [E4]: envelope encryption (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-y-003';
-- sc-y-004 [E4]: Session Manager vs bastion (compute) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sc-y-004';
-- sc-y-005 [E4]: protect CloudTrail logs (logging) -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-y-005';

-- ============ 20260711000008_seed_awsscs_questions.sql ============

-- Domain 1
-- sc-q-001 [E4]: GuardDuty threat detection -> 1.2
update public.questions set objective = '1.2' where id = 'sc-q-001';
-- sc-q-002 [E4]: Detective investigation -> 1.2
update public.questions set objective = '1.2' where id = 'sc-q-002';
-- sc-q-003 [E4]: automated EC2 isolation (EventBridge/Lambda) -> 1.3
update public.questions set objective = '1.3' where id = 'sc-q-003';
-- sc-q-004 [E4]: containment ordering -> 1.3
update public.questions set objective = '1.3' where id = 'sc-q-004';
-- sc-q-005 [E4]: Security Hub aggregation (detection) -> 1.2
update public.questions set objective = '1.2' where id = 'sc-q-005';
-- sc-q-006 [E4]: leaked key first action (remediation) -> 1.3
update public.questions set objective = '1.3' where id = 'sc-q-006';
-- sc-q-007 [E4]: Inspector vulnerability detection -> 1.2
update public.questions set objective = '1.2' where id = 'sc-q-007';

-- Domain 2
-- sc-q-008 [E4]: CloudTrail API logging -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-008';
-- sc-q-009 [E4]: protect CloudTrail logs (logging) -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-009';
-- sc-q-010 [E4]: VPC Flow Logs -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-010';
-- sc-q-011 [E4]: root sign-in alerting -> 2.1
update public.questions set objective = '2.1' where id = 'sc-q-011';
-- sc-q-013 [E4]: CloudTrail log file validation -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-013';
-- sc-q-014 [E4]: organization trail -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-014';
-- sc-q-015 [E4]: centralize logs across accounts -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-015';

-- Domain 3
-- sc-q-016 [E4]: Network Firewall (network) -> 3.2
update public.questions set objective = '3.2' where id = 'sc-q-016';
-- sc-q-017 [E4]: network control scopes (network) -> 3.2
update public.questions set objective = '3.2' where id = 'sc-q-017';
-- sc-q-018 [E4]: Session Manager shell (compute) -> 3.3
update public.questions set objective = '3.3' where id = 'sc-q-018';
-- sc-q-019 [E4]: S3 Gateway endpoint (network) -> 3.2
update public.questions set objective = '3.2' where id = 'sc-q-019';
-- sc-q-020 [E4]: endpoint policy (network) -> 3.2
update public.questions set objective = '3.2' where id = 'sc-q-020';
-- sc-q-021 [E4]: Firewall Manager (edge policy mgmt) -> 3.1
update public.questions set objective = '3.1' where id = 'sc-q-021';
-- sc-q-022 [E4]: Shield Advanced (edge) -> 3.1
update public.questions set objective = '3.1' where id = 'sc-q-022';
-- sc-q-023 [E4]: NAT Gateway (network) -> 3.2
update public.questions set objective = '3.2' where id = 'sc-q-023';
-- sc-q-024 [E4]: WAF deployment (edge) -> 3.1
update public.questions set objective = '3.1' where id = 'sc-q-024';

-- Domain 4
-- sc-q-025 [E4]: IAM policy evaluation (authorization) -> 4.2
update public.questions set objective = '4.2' where id = 'sc-q-025';
-- sc-q-026 [E4]: permission boundary (authorization) -> 4.2
update public.questions set objective = '4.2' where id = 'sc-q-026';
-- sc-q-027 [E4]: SCP intersection (authorization) -> 4.2
update public.questions set objective = '4.2' where id = 'sc-q-027';
-- sc-q-028 [E4]: IAM Identity Center (authentication) -> 4.1
update public.questions set objective = '4.1' where id = 'sc-q-028';
-- sc-q-030 [E4]: IAM Access Analyzer (authorization) -> 4.2
update public.questions set objective = '4.2' where id = 'sc-q-030';

-- Domain 5
-- sc-q-033 [E4]: customer-managed vs AWS-managed key (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-033';
-- sc-q-034 [E4]: envelope encryption (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-034';
-- sc-q-035 [E4]: Macie PII classification (data at rest) -> 5.1
update public.questions set objective = '5.1' where id = 'sc-q-035';
-- sc-q-036 [E4]: S3 Block Public Access (data at rest) -> 5.1
update public.questions set objective = '5.1' where id = 'sc-q-036';
-- sc-q-038 [E4]: CloudHSM (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-038';
-- sc-q-039 [E4]: KMS grant (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-039';
-- sc-q-041 [E4]: automatic key rotation (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-041';
-- sc-q-042 [E4]: key policy vs grant (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-042';

-- Domain 6
-- sc-q-046 [E4]: Config conformance pack (compliance eval) -> 6.3
update public.questions set objective = '6.3' where id = 'sc-q-046';
-- sc-q-047 [E4]: Trusted Advisor best-practice checks (compliance eval) -> 6.3
update public.questions set objective = '6.3' where id = 'sc-q-047';
-- sc-q-048 [E4]: multi-account strategy benefit -> 6.2
update public.questions set objective = '6.2' where id = 'sc-q-048';
-- sc-q-049 [E4]: Security Hub compliance-standard checks -> 6.3
update public.questions set objective = '6.3' where id = 'sc-q-049';

-- ============ 20260714000008_expand_awsscs.sql (flashcards) ============

-- sc-f-054 [E4]: GuardDuty Malware Protection (detection) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sc-f-054';
-- sc-f-055 [E4]: SSM Incident Manager (IR plan/runbooks) -> 1.1
update public.flashcards set objective = '1.1' where id = 'sc-f-055';
-- sc-f-056 [E4]: Security Hub custom insight (detection/triage) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sc-f-056';
-- sc-f-058 [E4]: CloudWatch Logs Insights (log analysis) -> 2.5
update public.flashcards set objective = '2.5' where id = 'sc-f-058';
-- sc-f-059 [E4]: CloudTrail data vs management events (logging) -> 2.3
update public.flashcards set objective = '2.3' where id = 'sc-f-059';
-- sc-f-062 [E4]: PrivateLink (network) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sc-f-062';
-- sc-f-063 [E4]: security group referencing (network) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sc-f-063';
-- sc-f-064 [E4]: Shield Advanced cost protection (edge) -> 3.1
update public.flashcards set objective = '3.1' where id = 'sc-f-064';
-- sc-f-065 [E4]: bastion-free Session Manager (compute) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sc-f-065';
-- sc-f-066 [E4]: WAF geo-match blocking (edge) -> 3.1
update public.flashcards set objective = '3.1' where id = 'sc-f-066';
-- sc-f-067 [E4]: Access Analyzer archive rule (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-f-067';
-- sc-f-068 [E4]: ABAC (authentication per exam scheme) -> 4.1
update public.flashcards set objective = '4.1' where id = 'sc-f-068';
-- sc-f-069 [E4]: permissions boundary self-service (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-f-069';
-- sc-f-070 [E4]: NotAction vs Action policy element (authorization) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sc-f-070';
-- sc-f-071 [E4]: KMS grant constraint (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-071';
-- sc-f-072 [E4]: S3 Object Lock WORM immutability -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-072';
-- sc-f-073 [E4]: KMS symmetric vs asymmetric (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-073';
-- sc-f-074 [E4]: Macie discovery job scope (data at rest) -> 5.1
update public.flashcards set objective = '5.1' where id = 'sc-f-074';
-- sc-f-075 [E4]: KMS custom key store (key mgmt) -> 5.3
update public.flashcards set objective = '5.3' where id = 'sc-f-075';
-- sc-f-077 [E4]: Audit Manager (compliance eval) -> 6.3
update public.flashcards set objective = '6.3' where id = 'sc-f-077';
-- sc-f-078 [E4]: landing-zone account structure (multi-account strategy) -> 6.2
update public.flashcards set objective = '6.2' where id = 'sc-f-078';

-- ============ 20260714000008_expand_awsscs.sql (questions) ============

-- sc-q-051 [E4]: GuardDuty Malware Protection (detection) -> 1.2
update public.questions set objective = '1.2' where id = 'sc-q-051';
-- sc-q-052 [E4]: SSM Incident Manager (IR plan/runbooks) -> 1.1
update public.questions set objective = '1.1' where id = 'sc-q-052';
-- sc-q-053 [E4]: Security Hub custom insight (detection/triage) -> 1.2
update public.questions set objective = '1.2' where id = 'sc-q-053';
-- sc-q-055 [E4]: EventBridge->Lambda automated remediation -> 1.3
update public.questions set objective = '1.3' where id = 'sc-q-055';
-- sc-q-056 [E4]: GuardDuty Malware Protection agentless (detection) -> 1.2
update public.questions set objective = '1.2' where id = 'sc-q-056';
-- sc-q-058 [E4]: CloudWatch Logs Insights (log analysis) -> 2.5
update public.questions set objective = '2.5' where id = 'sc-q-058';
-- sc-q-059 [E4]: CloudTrail S3 data events (logging) -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-059';
-- sc-q-062 [E4]: CloudTrail data events for forensics (logging) -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-062';
-- sc-q-063 [E4]: data events + Macie exfiltration visibility (logging) -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-063';
-- sc-q-064 [E4]: org trail + log validation (logging) -> 2.3
update public.questions set objective = '2.3' where id = 'sc-q-064';
-- sc-q-065 [E4]: PrivateLink (network) -> 3.2
update public.questions set objective = '3.2' where id = 'sc-q-065';
-- sc-q-066 [E4]: security group referencing (network) -> 3.2
update public.questions set objective = '3.2' where id = 'sc-q-066';
-- sc-q-067 [E4]: Shield Advanced cost protection (edge) -> 3.1
update public.questions set objective = '3.1' where id = 'sc-q-067';
-- sc-q-069 [E4]: WAF geo-match blocking (edge) -> 3.1
update public.questions set objective = '3.1' where id = 'sc-q-069';
-- sc-q-070 [E4]: PrivateLink interface endpoint (network) -> 3.2
update public.questions set objective = '3.2' where id = 'sc-q-070';
-- sc-q-072 [E4]: WAF+Shield+CloudFront L7 defense (edge) -> 3.1
update public.questions set objective = '3.1' where id = 'sc-q-072';
-- sc-q-074 [E4]: Access Analyzer archive rule (authorization) -> 4.2
update public.questions set objective = '4.2' where id = 'sc-q-074';
-- sc-q-075 [E4]: ABAC (authentication per exam scheme) -> 4.1
update public.questions set objective = '4.1' where id = 'sc-q-075';
-- sc-q-076 [E4]: permissions boundary (authorization) -> 4.2
update public.questions set objective = '4.2' where id = 'sc-q-076';
-- sc-q-077 [E4]: NotAction/Deny policy element (authorization) -> 4.2
update public.questions set objective = '4.2' where id = 'sc-q-077';
-- sc-q-078 [E4]: ABAC vs RBAC (authentication per exam scheme) -> 4.1
update public.questions set objective = '4.1' where id = 'sc-q-078';
-- sc-q-079 [E4]: Access Analyzer unused access (authorization) -> 4.2
update public.questions set objective = '4.2' where id = 'sc-q-079';
-- sc-q-081 [E4]: KMS grant encryption context (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-081';
-- sc-q-082 [E4]: S3 Object Lock compliance mode immutability -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-082';
-- sc-q-083 [E4]: asymmetric KMS key pair (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-083';
-- sc-q-084 [E4]: Macie sampling discovery (data at rest) -> 5.1
update public.questions set objective = '5.1' where id = 'sc-q-084';
-- sc-q-085 [E4]: KMS custom key store (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-085';
-- sc-q-086 [E4]: versioning + Object Lock immutability -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-086';
-- sc-q-087 [E4]: symmetric vs asymmetric key (key mgmt) -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-087';
-- sc-q-088 [E4]: Object Lock governance vs compliance immutability -> 5.3
update public.questions set objective = '5.3' where id = 'sc-q-088';
-- sc-q-090 [E4]: Audit Manager (compliance eval) -> 6.3
update public.questions set objective = '6.3' where id = 'sc-q-090';
-- sc-q-091 [E4]: landing-zone account separation (multi-account strategy) -> 6.2
update public.questions set objective = '6.2' where id = 'sc-q-091';
-- sc-q-093 [E4]: Trusted Advisor best-practice checks (compliance eval) -> 6.3
update public.questions set objective = '6.3' where id = 'sc-q-093';
-- sc-q-094 [E4]: management-account separation (multi-account strategy) -> 6.2
update public.questions set objective = '6.2' where id = 'sc-q-094';
-- sc-q-095 [E4]: Trusted Advisor + Audit Manager (compliance eval) -> 6.3
update public.questions set objective = '6.3' where id = 'sc-q-095';
