-- Review fixes for AWS Security Specialty SCS-C02 (awsscs) content, Scope A.
-- Files reviewed:
--   20260711000007_seed_awsscs.sql           (53 core + 15 acronym + 5 feynman flashcards)
--   20260711000008_seed_awsscs_questions.sql (50 questions)
--   20260714000008_expand_awsscs.sql         (25 flashcards, 45 questions)

-- ============ 20260711000007_seed_awsscs.sql ============

-- sc-f-002 [W1]: SQL-style doubled apostrophe ("doesn''t") stored literally inside dollar quotes; corrected.
update public.flashcards set back = $$Investigating and visualizing the root cause of security findings by building linked graphs from CloudTrail, VPC Flow Logs, and GuardDuty - it analyzes, it doesn't detect.$$ where id = 'sc-f-002';

-- sc-f-007 [W1]: literal doubled apostrophe ("Don''t") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$Deactivate/delete the key immediately, then review CloudTrail for unauthorized use, rotate credentials, and revoke any active sessions. Don't just create a new key alongside it.$$ where id = 'sc-f-007';

-- sc-f-016 [W1]: literal doubled apostrophe ("account''s") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$Aggregate CloudTrail, Config, and CloudWatch Logs into a dedicated logging account's S3 bucket / log destination, with cross-account permissions and SCP protection.$$ where id = 'sc-f-016';

-- sc-f-027 [W1]: literal doubled apostrophe ("Gateway''s") stored inside dollar-quoted front text; corrected.
update public.flashcards set front = $$What is a NAT Gateway's security role?$$ where id = 'sc-f-027';

-- sc-f-029 [W1]: literal doubled apostrophe ("doesn''t") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$A managed policy that sets the MAXIMUM permissions an IAM user/role can have - it caps, but doesn't grant. Useful for safely delegating role creation.$$ where id = 'sc-f-029';

-- sc-f-030 [W1]: two literal doubled apostrophes ("OU''s", "identity''s") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$SCP caps an account/OU's permissions; permission boundary caps a single identity's; the identity policy grants. Effective access is the intersection of all applicable caps and grants.$$ where id = 'sc-f-030';

-- sc-f-047 [W1]: literal doubled apostrophe ("can''t") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$Org-wide guardrails that cap what accounts can do (e.g., deny disabling CloudTrail, restrict regions) - preventive controls that even account admins can't override.$$ where id = 'sc-f-047';

-- sc-f-051 [W1]: literal doubled apostrophe ("Advisor''s") stored inside dollar-quoted front text; corrected.
update public.flashcards set front = $$What is AWS Trusted Advisor's security role?$$ where id = 'sc-f-051';

-- ============ 20260711000008_seed_awsscs_questions.sql ============

-- sc-q-002 [W2]: off-category junk distractor "AWS Budgets" replaced with AWS Security Hub (the plausible aggregator sibling); explanation updated to refute it.
update public.questions set
  choices = $q$["Amazon Detective","AWS Shield","Amazon Macie","AWS Security Hub"]$q$::jsonb,
  explanation = $q$Amazon Detective builds linked graphs from CloudTrail, VPC Flow Logs, and GuardDuty to investigate root cause and scope. Security Hub aggregates and prioritizes findings but doesn't build an investigation graph; Shield is DDoS protection; Macie classifies S3 data.$q$
where id = 'sc-q-002';

-- sc-q-009 [W2]: absurd distractors ("Email logs daily", "Disable the trail during incidents") replaced with plausible partial protections; explanation updated to refute them.
update public.questions set
  choices = $q$["Store them in the same account with default settings","Deliver to a dedicated logging account bucket with log file validation and Object Lock, protected by SCPs","Enable S3 versioning on the log bucket in the same account","Encrypt the trail with an AWS managed KMS key"]$q$::jsonb,
  explanation = $q$Isolating logs in a separate logging account with integrity validation, Object Lock/MFA delete, and SCP protection puts them beyond a compromised workload account's reach and makes tampering detectable. Same-account versioning still lets a compromised admin delete the versions and the bucket, and encryption protects confidentiality - it doesn't stop deletion by a principal with access.$q$
where id = 'sc-q-009';

-- sc-q-011 [W2]: off-category junk distractors ("A Route 53 record", "An S3 event") replaced with plausible monitoring siblings; explanation updated to refute each.
update public.questions set
  choices = $q$["An AWS Config rule, which evaluates sign-in events in real time","A CloudWatch Logs metric filter on CloudTrail for root sign-in, with an alarm and SNS","AWS Trusted Advisor, which notifies on every root sign-in","An S3 event notification on the CloudTrail log bucket"]$q$::jsonb,
  explanation = $q$A metric filter on the CloudTrail log group matching root console sign-in, tied to a CloudWatch alarm and SNS, delivers the alert (a CIS benchmark control). Config rules evaluate resource configuration, not individual sign-in events; Trusted Advisor checks root MFA status but doesn't alert on sign-ins; an S3 notification fires on every log file delivery, not on a specific event inside the logs.$q$
where id = 'sc-q-011';

-- sc-q-015 [W2]: absurd distractors ("Email logs to the team", "Store logs on EC2 instance disks") replaced with plausible-but-flawed multi-account designs; explanation updated to refute them.
update public.questions set
  choices = $q$["Query each account's logs individually using cross-account IAM roles","Aggregate CloudTrail/Config/CloudWatch Logs into a dedicated logging account with cross-account permissions and SCP protection","Stream every account's logs into each analyst's own account","Keep logs in each account and rely on Trusted Advisor for analysis"]$q$::jsonb,
  explanation = $q$A dedicated logging account with aggregated, SCP-protected log storage gives the security team centralized, tamper-resistant visibility. Per-account querying doesn't scale to 50 accounts and leaves logs deletable by each account's admins; duplicating streams per analyst multiplies cost and sprawl; Trusted Advisor checks best practices - it doesn't analyze logs.$q$
where id = 'sc-q-015';

-- sc-q-030 [W2]: off-category junk distractors ("AWS Budgets", "Route 53") replaced with plausible security-service siblings; explanation updated to refute each.
update public.questions set
  choices = $q$["IAM Access Analyzer","AWS CloudTrail","Amazon Macie","AWS Config"]$q$::jsonb,
  explanation = $q$IAM Access Analyzer flags resources (S3 buckets, KMS keys, roles) shared with external or public principals and can generate least-privilege policies from CloudTrail activity. CloudTrail records API calls but doesn't analyze policies for external access; Macie classifies sensitive S3 data, not sharing; Config tracks configuration state and needs a specific rule per check.$q$
where id = 'sc-q-030';

-- sc-q-038 [W2]: junk distractors ("For S3 lifecycle management", "For DNS resolution") replaced with reasons that actually describe KMS - the plausible inverse; explanation updated to refute them.
update public.questions set
  choices = $q$["When you want cheaper, fully managed multi-tenant keys","When regulations require single-tenant, FIPS 140-2 Level 3 hardware control of keys","When you need automatic annual key rotation managed by AWS","When you need seamless native integration with the widest range of AWS services"]$q$::jsonb,
  explanation = $q$CloudHSM provides dedicated single-tenant HSMs with full key control and FIPS 140-2 Level 3 compliance - used when multi-tenant KMS isn't permitted. The other options all describe reasons to stay on KMS: it is cheaper, natively integrated with AWS services, and offers managed automatic rotation - none of which CloudHSM improves on.$q$
where id = 'sc-q-038';

-- sc-q-046 [W2]: junk distractors ("A KMS key", "A load balancer") replaced with plausible governance-tooling siblings; explanation updated to refute each.
update public.questions set
  choices = $q$["A single Config rule you enable in one account","A packaged set of Config rules and remediations mapped to a compliance framework, deployable across accounts","A Security Hub standard that only aggregates existing findings","A set of SCPs that prevents noncompliant API calls"]$q$::jsonb,
  explanation = $q$Conformance packs bundle Config rules and remediation actions aligned to frameworks (e.g., PCI, CIS) for consistent multi-account governance. A single rule lacks the packaged, framework-mapped scope; Security Hub standards run their own checks rather than packaging Config rules; SCPs are preventive Organizations policies, not Config content.$q$
where id = 'sc-q-046';

-- sc-q-047 [W2]: off-category junk distractors (Kinesis, Batch, SQS) replaced with plausible account-assessment siblings; explanation updated to refute each.
update public.questions set
  choices = $q$["AWS Trusted Advisor","AWS Artifact","Amazon Inspector","AWS Cost Explorer"]$q$::jsonb,
  explanation = $q$Trusted Advisor evaluates the account against best practices (security, cost, performance) and flags issues like exposed access keys, open security groups, and missing root MFA. Artifact only provides AWS compliance reports for download; Inspector scans workloads for CVEs, not account-level practices; Cost Explorer analyzes spend.$q$
where id = 'sc-q-047';

-- ============ 20260714000008_expand_awsscs.sql ============

-- sc-f-060 [E6]: true duplicate of sc-f-040 (both teach "Macie scans S3 for sensitive data and alerts on exposure/unusual access" in near-identical words); sc-f-040 kept as the fuller card.
delete from public.flashcards where id = 'sc-f-060';

-- sc-q-054 [E6]: true duplicate of sc-q-002 (same fact - Detective builds linked graphs to investigate/scope a GuardDuty finding, near-identical stem); sc-q-002 kept (its distractor set is repaired above).
delete from public.questions where id = 'sc-q-054';

-- sc-q-060 [E6]: true duplicate of sc-q-035 (same fact - Macie ML discovery/classification of PII in S3 with alerts); sc-q-035 kept with its stronger same-category distractors.
delete from public.questions where id = 'sc-q-060';

-- sc-q-068 [E6]: true duplicate of sc-q-018 (same fact - Session Manager gives shell access with zero inbound ports, near-identical stem and answer); sc-q-018 kept.
delete from public.questions where id = 'sc-q-068';

-- sc-q-071 [E6]: true duplicate of sc-q-021 (same fact - Firewall Manager centrally enforces WAF/Shield Advanced/security-group policy across the Organization); sc-q-021 kept with same-category distractors.
delete from public.questions where id = 'sc-q-071';

-- sc-q-073 [E6]: true duplicate of sc-q-066 (same fact - security-group referencing stays correct as instances scale, unlike static IPs; explanations nearly identical); sc-q-066 kept and repaired below.
delete from public.questions where id = 'sc-q-073';

-- sc-q-051 [W3]: explanation never refuted Amazon Inspector, the genuinely tempting distractor; added the discriminating clause.
update public.questions set
  explanation = $q$GuardDuty Malware Protection triggers agentless scanning of the flagged instance's EBS volumes (via snapshots) without requiring software on the instance. Amazon Inspector is the tempting distractor, but it scans for CVEs and software vulnerabilities continuously - it doesn't run on-demand malware scans in response to a GuardDuty finding; Config records configuration and CloudTrail records API calls.$q$
where id = 'sc-q-051';

-- sc-q-052 [W2]: junk distractors (S3, Direct Connect, Route 53) replaced with plausible response-tooling siblings; correct option moved to index 2 to break the file's answer-position bias; explanation updated to refute each.
update public.questions set
  choices = $q$["Amazon EventBridge with an SNS topic","AWS Systems Manager Automation alone","AWS Systems Manager Incident Manager","AWS Security Hub"]$q$::jsonb,
  answer = '2'::jsonb,
  explanation = $q$Incident Manager automates the operational side of incident response: paging on-call contacts, launching runbooks, and tracking a structured incident timeline from an alarm or manual trigger. EventBridge plus SNS can notify but has no paging escalation or timeline; SSM Automation runs runbooks but doesn't page responders or track incidents; Security Hub aggregates findings rather than managing response.$q$
where id = 'sc-q-052';

-- sc-q-053 [W2]: junk distractors ("A new AWS account", "A CloudFront distribution", "A Route 53 record") replaced with plausible finding-management siblings; correct option moved to index 1; explanation updated to refute each.
update public.questions set
  choices = $q$["A Security Hub custom action","A custom insight","A GuardDuty suppression rule","An EventBridge rule forwarding findings to S3"]$q$::jsonb,
  answer = '1'::jsonb,
  explanation = $q$Custom insights save a reusable, grouped filter over Security Hub findings (e.g., high-severity findings on EC2 resources) so analysts return to the same triage view without rebuilding it. A custom action sends selected findings to EventBridge for processing - it isn't a saved view; a GuardDuty suppression rule hides findings instead of viewing them; exporting to S3 moves data out rather than creating a console view.$q$
where id = 'sc-q-053';

-- sc-q-055 [W2]: junk distractors ("Manual ticketing only", "A one-time script with no automation", "A CloudFormation template") replaced with plausible response-pattern names; explanation updated to refute each.
update public.questions set
  choices = $q$["Automated remediation via event-driven response","Scheduled batch remediation on a maintenance window","Manual runbook execution by the on-call analyst","Configuration drift remediation via AWS Config"]$q$::jsonb,
  explanation = $q$Chaining a GuardDuty finding through an EventBridge rule to a Lambda that revokes sessions is event-driven automated remediation - containment happens in seconds with no human in the loop. It isn't scheduled (it fires on the event), isn't manual, and isn't Config drift remediation, which corrects resource configuration rather than responding to threat findings.$q$
where id = 'sc-q-055';

-- sc-q-056 [W2]: self-negating distractors ("It cannot detect malware at all", "this scenario is impossible", "EBS volumes cannot be scanned") replaced with plausible mechanism claims; explanation updated to refute each.
update public.questions set
  choices = $q$["It streams live memory from the running instance to GuardDuty","Agentless scanning inspects a snapshot of the volume, avoiding deployment and maintenance of software on every instance","It requires the SSM Agent to already be running on the instance","It routes the instance's traffic through an inline inspection appliance"]$q$::jsonb,
  explanation = $q$GuardDuty Malware Protection snapshots the attached EBS volumes and scans the snapshot off-instance, so nothing has to be installed or maintained fleet-wide. It doesn't capture live memory, doesn't depend on the SSM Agent, and doesn't touch network traffic - the inspection is storage-based and out-of-band.$q$
where id = 'sc-q-056';

-- sc-q-058 [W2]: junk distractors (Budgets, Route 53, Direct Connect) replaced with plausible log-analysis siblings; correct option moved to index 2; explanation updated to refute each.
update public.questions set
  choices = $q$["Amazon Athena over logs exported to S3","CloudWatch metric filters","CloudWatch Logs Insights","Amazon OpenSearch Service"]$q$::jsonb,
  answer = '2'::jsonb,
  explanation = $q$CloudWatch Logs Insights provides a purpose-built query language for interactive, ad hoc analysis directly against data already in CloudWatch Logs. Athena and OpenSearch both require exporting or streaming the logs out of CloudWatch first, and metric filters produce metrics and alarms, not interactive queries.$q$
where id = 'sc-q-058';

-- sc-q-061 [W2]: junk distractor "Deleting the instance" replaced; distractor set rebuilt from plausible visibility tools; explanation updated to refute each.
update public.questions set
  choices = $q$["VPC Traffic Mirroring to a monitoring appliance","VPC Flow Logs on the instance's ENI","Amazon GuardDuty on the account","CloudTrail data events for the instance's activity"]$q$::jsonb,
  explanation = $q$Traffic Mirroring copies live packets from the ENI to an inspection target without interrupting the original flow - the only option that yields full packet payloads. Flow Logs capture only metadata (IPs, ports, bytes), GuardDuty analyzes logs rather than exposing packets, and CloudTrail records API calls, not network traffic.$q$
where id = 'sc-q-061';

-- sc-q-062 [W2]: self-negating distractors ("Data events are free", "replace the need for management events", "mandatory for all accounts") replaced with plausible inverted-fact claims; explanation updated to refute them.
update public.questions set
  choices = $q$["Data events are captured by default once a trail exists","Object-level access (reads/writes) is invisible in management events alone, and may be required for forensic reconstruction of a data breach","Management events already record S3 GetObject calls at no charge","Data events lower CloudTrail cost by replacing management events"]$q$::jsonb,
  explanation = $q$Investigating a suspected breach often requires knowing exactly which objects were read or written - visibility only data events provide. They are opt-in and billed separately (not on by default), they complement rather than replace management events, and management events never record object-level actions like GetObject.$q$
where id = 'sc-q-062';

-- sc-q-063 [W2]: junk distractor "AWS Budgets alone" replaced; set rebuilt from plausible partial-visibility options; explanation updated to refute each.
update public.questions set
  choices = $q$["CloudTrail data events plus Amazon Macie classification","S3 server access logs alone","VPC Flow Logs alone","Amazon Macie alone"]$q$::jsonb,
  explanation = $q$Data events show who accessed which objects, and Macie classification tells you whether that data was sensitive - together they answer the full exfiltration question. Server access logs show requests but say nothing about data sensitivity, Flow Logs show only network metadata with no object detail, and Macie alone knows what is sensitive but not who read it.$q$
where id = 'sc-q-063';

-- sc-q-064 [W2]: junk distractors ("Disabling CloudTrail to reduce cost", "VPC Flow Logs instead of CloudTrail") replaced with plausible incomplete designs; explanation updated to refute each.
update public.questions set
  choices = $q$["An organization trail delivering to a locked-down logging account bucket with log file validation enabled","Per-account trails that each account admin manages independently","A single trail in the management account logging only that account's activity","CloudWatch Logs retention settings applied in every account"]$q$::jsonb,
  explanation = $q$An organization trail centralizes logging for every member account beyond any single account's control, and log file validation provides cryptographic tamper-evidence. Independent per-account trails can be disabled by each admin, a management-account-only trail misses the other 29 accounts, and retention settings control lifespan, not aggregation or integrity.$q$
where id = 'sc-q-064';

-- sc-q-066 [W2]: junk distractor "Disabling the security group" replaced; set rebuilt from plausible-but-flawed alternatives; explanation updated to refute each.
update public.questions set
  choices = $q$["Referencing the load balancer's security group as the source in the inbound rule","Listing the load balancer's current IP addresses in the rule","Allowing 0.0.0.0/0 and relying on the load balancer to filter traffic","A Lambda function that rewrites the rule's IP list on a schedule"]$q$::jsonb,
  explanation = $q$Referencing the load balancer's security group means the rule follows group membership, staying correct automatically as the balancer's nodes and addresses change. Listed IPs go stale as soon as the balancer scales, 0.0.0.0/0 exposes the instances to everything (a load balancer is not a security boundary), and a scheduled Lambda rewrite is fragile custom plumbing for a problem group referencing solves natively.$q$
where id = 'sc-q-066';

-- sc-q-067 [W2]: self-negating distractors ("There is no such protection", "AWS Budgets prevents the attack") replaced with plausible siblings; correct option moved to index 3; explanation updated to refute each.
update public.questions set
  choices = $q$["AWS Shield Standard's automatic always-on mitigation","An AWS Budgets action that stops resources when spend spikes","WAF rate-based rules, which refund the cost of blocked requests","Shield Advanced cost protection, crediting scaling costs incurred due to the attack"]$q$::jsonb,
  answer = '3'::jsonb,
  explanation = $q$Shield Advanced cost protection credits back CloudFront, ELB, Route 53, and EC2 scaling charges directly attributable to a DDoS attack. Shield Standard mitigates common attacks but includes no billing protection, a Budgets action that stops resources would take the workload offline (completing the attacker's goal), and WAF blocks requests but refunds nothing.$q$
where id = 'sc-q-067';

-- sc-q-072 [W2]: absurd distractors ("Disabling the web server during business hours", "Removing DNS records permanently") replaced with plausible-but-insufficient defenses; explanation updated to refute each.
update public.questions set
  choices = $q$["WAF rate-based rules plus Shield Advanced plus CloudFront caching","NACL rules denying the attacking IP addresses at each subnet","Shield Standard alone, since it automatically covers Layer 7 floods","Vertically scaling the web servers for the duration of the attack"]$q$::jsonb,
  explanation = $q$Layered Layer 7 defense combines WAF rate limiting, Shield Advanced managed mitigation and response, and CloudFront absorbing requests at the edge. NACL entries can't keep up with a distributed flood's rotating sources, Shield Standard focuses on Layer 3/4 (Layer 7 protection needs WAF/Shield Advanced), and simply scaling up absorbs cost without stopping the flood.$q$
where id = 'sc-q-072';

-- sc-q-074 [W2]: junk distractors ("Deleting the analytics bucket", "Ignoring all future findings") replaced with plausible noise-handling alternatives; explanation updated to refute each.
update public.questions set
  choices = $q$["An archive rule matching that known pattern","Suppressing all S3 findings in Access Analyzer","Removing the cross-account bucket policy","Manually archiving each finding as it appears"]$q$::jsonb,
  explanation = $q$Archive rules automatically mark findings matching a known, intentional access pattern as expected, silencing the noise while leaving Access Analyzer active for genuinely unexpected exposure. Suppressing all S3 findings would blind the team to real leaks, removing the bucket policy breaks the legitimate analytics share, and manual archiving repeats the toil the rule automates.$q$
where id = 'sc-q-074';

-- sc-q-075 [W2]: junk distractors ("Sharing one admin account", "Disabling permission sets") replaced with plausible per-hire provisioning approaches; correct option moved to index 1; explanation updated to refute each.
update public.questions set
  choices = $q$["A permission set manually assigned to each new hire","Attribute-based access control (ABAC) using the synced department attribute","An IAM user created per employee in each account","Role-based groups rebuilt whenever a department changes"]$q$::jsonb,
  answer = '1'::jsonb,
  explanation = $q$ABAC ties permissions to attributes synced from the identity source, so a new hire's department automatically grants the right access with no per-hire assignment. Manually assigned permission sets and per-account IAM users are exactly the per-hire toil being avoided, and rebuilding role groups on every org change is the role-sprawl problem ABAC eliminates.$q$
where id = 'sc-q-075';

-- sc-q-076 [W2]: junk distractors ("No control - developers should have full freedom", "A NAT Gateway") replaced with plausible IAM-control siblings; explanation updated to refute each and to state the CreateRole boundary-condition mechanism precisely.
update public.questions set
  choices = $q$["A permissions boundary","An SCP attached directly to each developer's IAM user","A resource-based policy on every role they create","Membership in an IAM group with AdministratorAccess"]$q$::jsonb,
  explanation = $q$A permissions boundary caps the developers' maximum permissions and - via an iam:CreateRole condition requiring the boundary on new roles - caps every role they create, making self-service delegation safe. SCPs attach to accounts and OUs, never to individual IAM users; resource-based policies grant rather than cap; and an admin group is the opposite of a maximum-permission control.$q$
where id = 'sc-q-076';

-- sc-q-077 [W2]: junk distractors ("A resource-based policy only", "There is no way to express this") replaced with plausible policy-element siblings; explanation updated to refute each.
update public.questions set
  choices = $q$["NotAction combined with Deny","Action combined with Deny, listing every other AWS action explicitly","NotResource combined with Allow","Two Allow statements with a StringNotEquals condition"]$q$::jsonb,
  explanation = $q$Deny with NotAction denies everything except the listed actions in a single compact statement. Enumerating every other action under Action is unmaintainable, NotResource inverts the resource list rather than the action list, and Allow statements cannot express a broad deny - IAM is default-deny and only an explicit Deny overrides other grants.$q$
where id = 'sc-q-077';

-- sc-q-079 [W2]: junk distractors ("Deleting all roles immediately", "Ignoring the finding", "Recreating the roles") replaced with plausible tooling claims; explanation updated to refute each.
update public.questions set
  choices = $q$["IAM Access Analyzer unused access findings plus CloudTrail last-accessed data","AWS Config's resource inventory, which flags unused roles","GuardDuty IAM findings, which list roles with no recent activity","Deleting any role older than one year"]$q$::jsonb,
  explanation = $q$Access Analyzer's unused access findings plus last-accessed data give evidence-based confidence about which roles are genuinely dormant before removal. Config inventories resources but doesn't judge whether a role is used, GuardDuty flags threat behavior rather than inactivity, and age alone is a dangerous deletion criterion - an old role can still be in daily use.$q$
where id = 'sc-q-079';

-- sc-q-080 [W2]: self-negating distractors ("It can only detect external access, nothing else", "It replaces the need for IAM entirely") replaced with plausible false capability claims; explanation updated to refute each.
update public.questions set
  choices = $q$["It can also generate least-privilege policies based on actual CloudTrail activity","It can rotate credentials that it finds unused","It automatically removes public access from flagged buckets","It enforces MFA on externally shared roles"]$q$::jsonb,
  explanation = $q$Access Analyzer's policy generation feature proposes least-privilege policies derived from activity CloudTrail actually recorded. It is analysis-only: it doesn't rotate credentials, doesn't remediate public buckets, and doesn't enforce MFA - remediation stays with the operator or an automation you build around its findings.$q$
where id = 'sc-q-080';

-- sc-q-081 [W2]: junk distractors ("A fully open key policy", "Disabling the key", "A public S3 bucket") replaced with plausible KMS access mechanisms that lack the constraint; explanation updated to refute each.
update public.questions set
  choices = $q$["A grant with an encryption context constraint","A key policy statement allowing the Lambda role kms:Decrypt","An IAM policy on the Lambda role allowing kms:*","A grant with no constraints"]$q$::jsonb,
  explanation = $q$KMS grants support encryption context constraints, so the delegated permission works only when the request's encryption context matches the expected value. A key policy or IAM statement allowing Decrypt (let alone kms:*) permits any context, and an unconstrained grant delegates the operation for every context - none of them scope to the specific use.$q$
where id = 'sc-q-081';

-- sc-q-083 [W2]: junk distractor "No KMS key is needed" replaced; set rebuilt from plausible key-distribution approaches; explanation updated to refute each.
update public.questions set
  choices = $q$["An asymmetric KMS key pair","A symmetric KMS key","An exported data key shared with each partner","A Secrets Manager secret distributed to partners"]$q$::jsonb,
  explanation = $q$Asymmetric KMS keys let you download and share the public key for external signature verification while the private key never leaves KMS. A symmetric key cannot be shared without exposing the whole secret, and exporting data keys or distributing a Secrets Manager secret hands partners material that must then be protected and rotated - exactly what public-key cryptography avoids.$q$
where id = 'sc-q-083';

-- sc-q-084 [W2]: non-responsive distractors ("Full scanning regardless of cost", "Disabling Macie", "Manual review of every file") replaced with plausible cost-control alternatives; explanation updated to refute each.
update public.questions set
  choices = $q$["A sensitive data discovery job with a defined sampling percentage","A discovery job scoped to scan every object in every bucket","An S3 Inventory report reviewed by the security team","GuardDuty S3 Protection findings"]$q$::jsonb,
  explanation = $q$Macie discovery jobs accept a sampling depth, letting the company scan a percentage of objects to balance cost against coverage on a massive data lake. Scanning every object is precisely the cost problem being avoided, S3 Inventory lists objects without classifying their contents, and GuardDuty S3 Protection detects suspicious access, not sensitive data.$q$
where id = 'sc-q-084';

-- sc-q-086 [W2]: junk distractors ("No protection needed", "Deleting old versions immediately", "A public bucket policy") replaced with plausible partial protections; explanation updated to refute each.
update public.questions set
  choices = $q$["Versioning plus Object Lock in compliance mode","Versioning alone","Cross-region replication alone","Lifecycle rules that expire noncurrent versions quickly"]$q$::jsonb,
  explanation = $q$Versioning preserves prior object states and Object Lock in compliance mode prevents any deletion or overwrite for the retention period - together covering both accidental and malicious loss. Versioning alone still lets a privileged user permanently delete versions, cross-region replication addresses regional disaster rather than deletion and provides no immutability, and aggressive lifecycle expiry actively destroys the history you need.$q$
where id = 'sc-q-086';

-- sc-q-087 [W2]: self-negating distractors ("Asymmetric keys are always required", "Symmetric keys cannot be used with AWS services", "There is no difference") replaced with plausible inverted-fact claims; explanation updated to refute each.
update public.questions set
  choices = $q$["Symmetric keys are the standard, simpler choice for this same-party encrypt/decrypt pattern and integrate natively with most AWS services","Asymmetric encryption is faster and supports larger payloads","Symmetric KMS keys can be exported for offline use, while asymmetric keys cannot","Only asymmetric KMS keys support automatic rotation"]$q$::jsonb,
  explanation = $q$When one party both encrypts and decrypts, a symmetric key is simpler and is what AWS service integrations (S3, EBS, RDS) use natively. Asymmetric operations are slower with strict payload size limits, symmetric KMS keys can never be exported (only the public half of an asymmetric pair can be downloaded), and automatic rotation is supported for symmetric keys, not asymmetric ones.$q$
where id = 'sc-q-087';

-- sc-q-089 [W2]: junk distractors ("A manual spreadsheet review", "An SCP with no tag logic", "Deleting untagged resources with no warning") replaced with plausible tagging-tooling siblings; explanation updated to refute each.
update public.questions set
  choices = $q$["An AWS Organizations tag policy","AWS Config's required-tags rule in a single account","Cost allocation tags activated in the billing console","An IAM policy in each account asking users to tag resources"]$q$::jsonb,
  explanation = $q$Tag policies enforce consistent tag keys and allowed values across every account in the Organization. A single-account Config rule only detects noncompliance in that one account, activating cost allocation tags merely surfaces tags in billing reports without enforcing anything, and per-account IAM conventions depend on every admin cooperating.$q$
where id = 'sc-q-089';

-- sc-q-090 [W2]: junk distractors (Budgets, Route 53, Direct Connect) replaced with plausible compliance-tooling siblings; explanation updated to refute AWS Artifact, the classic confusion.
update public.questions set
  choices = $q$["AWS Audit Manager","AWS Artifact","AWS Config conformance packs","AWS Trusted Advisor"]$q$::jsonb,
  explanation = $q$Audit Manager continuously collects evidence mapped to a chosen compliance framework, automating audit preparation. AWS Artifact is the tempting distractor, but it only provides AWS's own compliance reports for download - it gathers no evidence about your workloads; conformance packs evaluate rules without assembling audit evidence, and Trusted Advisor checks best practices, not frameworks.$q$
where id = 'sc-q-090';

-- sc-q-091 [W2]: junk absolute distractors ("required by AWS", "no security benefit", "cannot be stored in the same account under any circumstances") replaced with plausible false rationales; explanation updated to refute each.
update public.questions set
  choices = $q$["To isolate blast radius - a compromised workload account cannot tamper with centralized logs or audit tooling in a separate, locked-down account","Because CloudTrail cannot deliver logs to a bucket in the same account","Because consolidated billing discounts require a dedicated logging account","To let the security team share the workload accounts' root credentials safely"]$q$::jsonb,
  explanation = $q$Separating log-archive and audit accounts means a workload compromise cannot reach or alter the evidence needed to investigate that very compromise. CloudTrail delivers to same-account buckets perfectly well - the separation is a security choice, not a technical requirement; billing discounts don't depend on account layout; and root credentials should never be shared regardless of structure.$q$
where id = 'sc-q-091';

-- sc-q-092 [W2]: junk distractor "Nothing can prevent this" replaced with a permissions boundary (the plausible in-account control that fails); explanation updated to refute each option.
update public.questions set
  choices = $q$["An SCP explicitly denying guardduty:DisassociateFromMasterAccount and similar disable actions, applied at the OU level","An IAM policy in that same account","A permissions boundary attached to the administrator's role","A CloudWatch alarm on GuardDuty configuration changes"]$q$::jsonb,
  explanation = $q$Only an SCP applied above the account (OU or root) binds even a full-admin principal, because SCPs are evaluated outside the account's own IAM control. An in-account IAM policy or permissions boundary can be edited or detached by an administrator with full IAM rights, and a CloudWatch alarm merely detects the change after GuardDuty is already off.$q$
where id = 'sc-q-092';

-- sc-q-094 [W2]: junk distractors ("It reduces AWS billing", "only for cosmetic organization", "Root accounts cannot host any resources") replaced with plausible false claims; explanation updated to refute each and add the SCPs-don't-apply fact.
update public.questions set
  choices = $q$["The root/management account has organization-wide power (billing, SCPs, member account management) that should never be mixed with day-to-day workload risk","Member accounts cannot be created while workloads run in the management account","Workloads in the management account are exempt from security groups","Consolidated billing only works if the management account is empty"]$q$::jsonb,
  explanation = $q$The management account controls the organization itself - billing, SCP administration, and member-account lifecycle - and SCPs do not even apply to it, so exposing it to routine workload risk is unacceptable. AWS imposes no technical block on creating accounts or running workloads there, and security groups work normally - the separation is about limiting what a compromise can reach.$q$
where id = 'sc-q-094';

-- sc-q-095 [W2]: junk distractors ("Neither is necessary", "A single spreadsheet", "Manual screenshots only") replaced with plausible single-service and wrong-pair claims; explanation updated to refute each.
update public.questions set
  choices = $q$["AWS Trusted Advisor plus AWS Audit Manager","AWS Audit Manager alone, which also runs best-practice checks","AWS Trusted Advisor alone, which maps evidence to compliance frameworks","AWS Artifact plus AWS Cost Explorer"]$q$::jsonb,
  explanation = $q$Trusted Advisor supplies continuous best-practice checks and Audit Manager supplies framework-mapped evidence collection - each covers what the other doesn't. Audit Manager doesn't perform general best-practice checks, Trusted Advisor doesn't map evidence to audit frameworks, and Artifact/Cost Explorer provide AWS's own reports and spend analysis, neither of which addresses the requirement.$q$
where id = 'sc-q-095';
