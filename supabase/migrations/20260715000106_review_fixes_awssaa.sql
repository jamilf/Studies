-- Review fixes for AWS SAA-C03 (awssaa) content, Scope A.
-- Files reviewed:
--   20260711000005_seed_awssaa.sql        (88 flashcards - no fixes needed)
--   20260711000006_seed_awssaa_questions.sql (60 questions)
--   20260714000007_expand_awssaa.sql      (30 flashcards, 45 questions)

-- ============ 20260711000006_seed_awssaa_questions.sql ============

-- sa-q-017 [W2]: three throwaway distractors ("They are identical", "uses no keys", "does not encrypt at rest") replaced with plausible sibling-concept distractors (SSE-C behavior, client/server-side confusion, inverted CloudTrail fact); explanation updated to refute them.
update public.questions set
  choices = $q$["SSE-S3 requires you to supply the key with every request; SSE-KMS stores keys for you","SSE-S3 uses AWS-managed keys; SSE-KMS uses KMS keys with rotation and audit control","SSE-KMS is client-side encryption, while SSE-S3 encrypts on the server","SSE-S3 logs every key use in CloudTrail, while SSE-KMS does not"]$q$::jsonb,
  explanation = $q$SSE-S3 encrypts with keys AWS fully manages and offers no per-key control; SSE-KMS uses KMS keys, giving you rotation policies, key-level access control, and CloudTrail audit of every key use. Supplying the key on each request describes SSE-C, and both SSE modes are server-side encryption at rest.$q$
where id = 'sa-q-017';

-- sa-q-029 [W2]: junk distractors ("It cannot", "By enabling versioning") replaced with plausible DNS-sibling distractors (low TTL, latency routing without health checks); explanation updated to refute the tempting TTL option.
update public.questions set
  choices = $q$["A simple routing record with a low TTL","Health checks with failover routing","Latency-based routing without health checks","An alias record pointing to a fixed IP address"]$q$::jsonb,
  explanation = $q$Route 53 health checks combined with failover routing detect an unhealthy endpoint and direct DNS responses to the healthy standby automatically. A low TTL only speeds propagation of a change you would still have to make manually, and latency-based routing without health checks keeps sending users to the closest endpoint even when it is down.$q$
where id = 'sa-q-029';

-- sa-q-035 [E4]: decoupling/buffering with SQS is objective 2.1 (scalable, loosely coupled architectures) per the blueprint and the file's own convention (sa-q-025, sa-f-034/035 are 2.1), not 2.2.
update public.questions set objective = '2.1' where id = 'sa-q-035';

-- sa-q-046 [W2]: all three distractors were throwaway ("It cannot scale", "It only supports Oracle", "It has no replicas"); replaced with plausible architecture claims and explanation updated to refute them.
update public.questions set
  choices = $q$["It runs the database engine entirely in memory, eliminating storage I/O","A distributed auto-scaling storage layer and up to 15 read replicas for higher throughput","It attaches provisioned IOPS EBS volumes to each replica by default","Synchronous replication to standby instances in other regions"]$q$::jsonb,
  explanation = $q$Aurora's storage is a purpose-built distributed layer spread across three AZs (six copies of data, not per-instance EBS volumes), shared by up to 15 low-latency read replicas - delivering much higher throughput than standard RDS while staying MySQL/PostgreSQL-compatible. It is not an in-memory engine, and cross-region replication (Aurora Global Database) is asynchronous.$q$
where id = 'sa-q-046';

-- sa-q-059 [W2]: distractors were self-evidently false ("They are identical", "RIs offer no discount", "Savings Plans only apply to S3"); replaced with inverted-fact distractors (SP/RI service coverage, payment options, capacity reservation) and explanation updated.
update public.questions set
  choices = $q$["Savings Plans commit to a dollar/hour spend for flexibility; RIs commit to specific instance attributes","Savings Plans apply only to EC2, while RIs also cover Fargate and Lambda","RIs are billed per second, while Savings Plans require full upfront payment","Savings Plans include a capacity reservation, while RIs never do"]$q$::jsonb,
  explanation = $q$Savings Plans commit to a consistent hourly compute spend and apply flexibly across instance families and regions - Compute Savings Plans even cover Fargate and Lambda, which RIs do not. RIs commit to specific instance attributes, and it is zonal RIs (not Savings Plans) that can include a capacity reservation. Both offer no-, partial-, and all-upfront payment over a 1-3 year term.$q$
where id = 'sa-q-059';

-- ============ 20260714000007_expand_awssaa.sql ============

-- sa-q-061 [W2]: junk distractor "Access determined randomly" replaced with a plausible partial-access distractor; "No access at all" given a plausible rationale; explanation updated to refute them.
update public.questions set
  choices = $q$["Full access to all buckets, since IAM is authoritative","Access limited to the two buckets the endpoint policy allows, since both policies must permit the request","No access at all, because the two policies conflict","Access to the two buckets, plus read-only access to every other bucket"]$q$::jsonb,
  explanation = $q$Both the endpoint policy and the IAM policy are evaluated, and access requires both to permit the request - the endpoint policy caps what is reachable through the endpoint regardless of how broad the IAM grant is. The policies do not "conflict" into a lockout (each simply must allow the action), and there is no partial read-only fallback.$q$
where id = 'sa-q-061';

-- sa-q-065 [W2]: junk distractors ("Deleting the bucket and starting over", "CloudFront only") replaced with plausible S3 access-management alternatives; explanation updated to refute them.
update public.questions set
  choices = $q$["S3 Access Points, each with its own scoped policy","Per-prefix statements added to the single bucket policy for each application","Object ACLs granting each application access to its own objects","A separate IAM group per application sharing the one bucket policy"]$q$::jsonb,
  explanation = $q$Access Points let you create multiple named endpoints on one bucket, each with its own simpler policy scoped to a specific application - exactly the escape from one giant bucket policy. Per-prefix statements keep growing the same unmanageable policy, AWS recommends disabling object ACLs rather than building on them, and IAM groups alone still funnel everything through one bucket policy.$q$
where id = 'sa-q-065';

-- sa-q-066 [W2]: junk distractor "Manual quarterly spreadsheets" replaced; distractor set rebuilt from plausible compliance-tooling siblings; explanation updated to refute them.
update public.questions set
  choices = $q$["Individual AWS Config rules configured by hand in each account","An AWS Config conformance pack deployed across accounts","AWS Trusted Advisor's service checks in each account","S3 server access logging enabled on every bucket"]$q$::jsonb,
  explanation = $q$A conformance pack bundles Config rules mapped to a compliance framework and deploys them consistently across many accounts (e.g., via Organizations) for continuous, automated checking. Hand-configured per-account rules drift and don't scale to 50 accounts, Trusted Advisor checks aren't mapped to a specific framework, and access logs record requests rather than evaluating configuration.$q$
where id = 'sa-q-066';

-- sa-q-071 [E4]: enforcing at-rest encryption with KMS is a data-protection item - objective 1.2 under this bank's convention (matches sa-q-004/005/017), not 1.1.
update public.questions set objective = '1.2' where id = 'sa-q-071';

-- sa-q-074 [E4]: SCPs and IAM permission boundaries are access-management (objective 1.1, matching sa-q-062/064's tagging convention for IAM/SCP items), not 1.2.
update public.questions set objective = '1.1' where id = 'sa-q-074';

-- sa-q-080 [W2]: junk distractors ("NAT Gateways cannot fail", "This is expected and cannot be fixed") replaced with plausible misconfiguration diagnoses; explanation updated to refute them.
update public.questions set
  choices = $q$["Only one NAT Gateway was deployed, with every private subnet routing to it, instead of one per AZ","The NAT Gateway was placed in a private subnet instead of a public subnet","The private subnets should have routed directly through an Internet Gateway","The NAT Gateway ran out of bandwidth capacity"]$q$::jsonb,
  explanation = $q$A NAT Gateway is AZ-scoped; with only one deployed, every private subnet routed through that single AZ, making it a VPC-wide single point of failure - deploy one NAT Gateway per AZ with per-AZ route tables. A wrongly-placed or saturated gateway would cause problems continuously, not specifically on AZ failure, and instances without public IPs cannot use an Internet Gateway directly.$q$
where id = 'sa-q-080';

-- sa-q-084 [E4]: stateless tiers belong to objective 2.1 (scalable, loosely coupled architectures - matches sa-q-031 and sa-f-037), not 2.2.
update public.questions set objective = '2.1' where id = 'sa-q-084';

-- sa-q-086 [E4]: DAX caching to cut read latency/cost is a high-performing data-solution item - Domain 3, objective 3.2 (matching sa-f-080) - not Domain 2 resilience.
update public.questions set domain = 3, objective = '3.2' where id = 'sa-q-086';

-- sa-q-089 [W2]: junk distractor "There is no such option" replaced and "On-premises launch type" corrected to the official External (ECS Anywhere) name; explanation updated to refute the capacity-provider option.
update public.questions set
  choices = $q$["EC2 launch type","Fargate launch type","External (ECS Anywhere) launch type","EC2 launch type with a managed capacity provider"]$q$::jsonb,
  explanation = $q$Fargate is serverless container compute - AWS manages the underlying infrastructure entirely. The EC2 launch type still leaves instance patching to you even when a capacity provider automates the scaling, and External (ECS Anywhere) runs tasks on servers you manage on-premises.$q$
where id = 'sa-q-089';

-- sa-q-093 [W2]: junk distractor "Neither service is needed" replaced; single-service distractors given plausible (false) rationales; explanation updated to refute each.
update public.questions set
  choices = $q$["CloudFront for HTTP content, Global Accelerator for TCP/UDP traffic","CloudFront alone, since it also proxies arbitrary TCP and UDP streams","Global Accelerator alone, since it includes edge content caching","S3 Transfer Acceleration for both traffic types"]$q$::jsonb,
  explanation = $q$Each service specializes: CloudFront caches HTTP(S) content at edge locations but does not handle arbitrary TCP/UDP protocols; Global Accelerator routes TCP/UDP over the AWS backbone via Anycast IPs but performs no content caching; Transfer Acceleration only speeds S3 transfers. Combining CloudFront and Global Accelerator covers both traffic types.$q$
where id = 'sa-q-093';

-- sa-q-094 [E6]: true duplicate of sa-q-039 (same fact - RDS read replicas scale reads without touching the write path - with near-identical stem); sa-q-039 kept as it has the stronger Multi-AZ distractor and refutation.
delete from public.questions where id = 'sa-q-094';

-- sa-q-095 [W2]: distractors "Lambda" (not an ECS launch type) and "There is no such option" replaced with real ECS siblings; explanation updated to refute them.
update public.questions set
  choices = $q$["Fargate","EC2 launch type","External (ECS Anywhere) launch type","Fargate with a custom platform version"]$q$::jsonb,
  explanation = $q$The EC2 launch type gives full control over the underlying instances (custom AMIs, instance types), unlike Fargate, where AWS controls the compute and no custom AMI is possible - platform versions don't change that. External (ECS Anywhere) targets on-premises servers you manage, not EC2 instances.$q$
where id = 'sa-q-095';

-- sa-q-097 [E6]: true duplicate of sa-q-038 (same fact - DynamoDB for single-digit-ms key-value at scale - with near-identical choices: RDS, self-managed on EC2, Redshift); sa-q-038 kept; the on-demand-capacity angle is already tested by sa-q-090.
delete from public.questions where id = 'sa-q-097';

-- sa-q-101 [W2]: junk distractor "A manual spreadsheet" replaced; distractor set rebuilt from plausible cost tools that only notify; explanation updated to refute them.
update public.questions set
  choices = $q$["AWS Budgets Actions","A CloudWatch billing alarm with an SNS email notification","AWS Cost Explorer scheduled reports","AWS Cost Anomaly Detection"]$q$::jsonb,
  explanation = $q$Budgets Actions goes beyond alerting to trigger automated responses - applying a restrictive IAM policy or SCP, or stopping EC2/RDS instances - when spend crosses a threshold. Billing alarms, Cost Explorer reports, and Cost Anomaly Detection can only notify; they take no action themselves.$q$
where id = 'sa-q-101';

-- sa-q-102 [W2]: distractors were self-evidently false ("always more expensive", "requires manual capacity planning", "disables backups"); replaced with plausible mechanism claims; explanation updated to refute them.
update public.questions set
  choices = $q$["It scales capacity down to near-zero when idle and back up on demand, avoiding payment for an always-on fixed-size database","It caches query results so the database rarely has to run","It bills a flat monthly rate regardless of usage","It runs on Spot capacity that AWS reclaims during idle periods"]$q$::jsonb,
  explanation = $q$Aurora Serverless bills for capacity actually consumed (ACUs) and scales toward zero during idle periods - the core advantage over paying for a fixed-size, always-on instance. It is not flat-rate, does not run on interruptible Spot capacity, and executes queries normally rather than caching around the database.$q$
where id = 'sa-q-102';
