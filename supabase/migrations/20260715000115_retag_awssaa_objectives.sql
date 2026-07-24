-- Retag AWS SAA-C03 (awssaa) study-bank `objective` tags to the OFFICIAL
-- SAA-C03 exam guide task statements. The seeds used an internally-consistent
-- two-sub-objective-per-domain scheme; the official blueprint has 1.1-1.3,
-- 2.1-2.2, 3.1-3.5, 4.1-4.4. Only the `objective` column is changed here;
-- `domain` (already correct, including sa-q-086's domain=3 set by 000106),
-- fronts/backs/stems/choices/answers are untouched. Deleted ids from
-- 20260715000106 (sa-q-094, sa-q-097) are skipped.
--
-- Official task statements applied:
--   1.1 secure access (IAM/roles/policies/SCPs/federation)
--   1.2 secure workloads & applications (VPC security, SG/NACL, encryption in transit)
--   1.3 data security controls (encryption at rest, KMS, secrets)
--   2.1 scalable & loosely coupled (SQS/SNS, decoupling, auto scaling, load balancers)
--   2.2 highly available / fault-tolerant (Multi-AZ, multi-region, DR, RTO/RPO, backups)
--   3.1 high-performing storage        3.2 high-performing/elastic compute
--   3.3 high-performing database        3.4 high-performing/scalable network
--   3.5 high-performing data ingestion/transformation
--   4.1 cost-optimized storage          4.2 cost-optimized compute
--   4.3 cost-optimized database         4.4 cost-optimized network

-- ============ 20260711000005_seed_awssaa.sql ============

-- --- flashcards, Domain 1 (secure) ---
-- sa-f-005 [E4]: security group vs NACL (VPC network filtering) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sa-f-005';
-- sa-f-006 [E4]: stateful security group behavior (VPC security) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sa-f-006';
-- sa-f-007 [E4]: encrypt data at rest in S3 (SSE) -> 1.3
update public.flashcards set objective = '1.3' where id = 'sa-f-007';
-- sa-f-008 [E4]: AWS KMS key management (data at rest) -> 1.3
update public.flashcards set objective = '1.3' where id = 'sa-f-008';
-- sa-f-009 [E4]: envelope encryption (KMS / data at rest) -> 1.3
update public.flashcards set objective = '1.3' where id = 'sa-f-009';
-- sa-f-012 [E4]: keep RDS private with private subnets + security groups (VPC security) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sa-f-012';
-- sa-f-013 [E4]: Secrets Manager (data / credential protection) -> 1.3
update public.flashcards set objective = '1.3' where id = 'sa-f-013';
-- sa-f-014 [E4]: VPC endpoint for private service access (secure workloads/VPC) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sa-f-014';
-- sa-f-015 [E4]: AWS WAF L7 protection (secure workloads/apps) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sa-f-015';
-- sa-f-016 [E4]: AWS Shield DDoS protection (secure workloads/infra protection) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sa-f-016';

-- --- flashcards, Domain 2 (resilient) ---
-- sa-f-023 [E4]: AZ vs Region for high availability -> 2.2
update public.flashcards set objective = '2.2' where id = 'sa-f-023';
-- sa-f-024 [E4]: Multi-AZ RDS synchronous failover (HA) -> 2.2
update public.flashcards set objective = '2.2' where id = 'sa-f-024';
-- sa-f-025 [E4]: Multi-AZ vs read replicas (availability/failover/DR) -> 2.2
update public.flashcards set objective = '2.2' where id = 'sa-f-025';
-- sa-f-031 [E4]: Route 53 health-check failover routing (HA) -> 2.2
update public.flashcards set objective = '2.2' where id = 'sa-f-031';

-- --- flashcards, Domain 3 (high-performing) ---
-- sa-f-039 [E4]: CloudFront CDN edge caching (network) -> 3.4
update public.flashcards set objective = '3.4' where id = 'sa-f-039';
-- sa-f-040 [E4]: ElastiCache in-memory DB caching (database) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sa-f-040';
-- sa-f-041 [E4]: DynamoDB vs RDS choice (database) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sa-f-041';
-- sa-f-043 [E4]: read replicas for read scaling (database) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sa-f-043';
-- sa-f-044 [E4]: EC2 placement groups (compute) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sa-f-044';
-- sa-f-045 [E4]: Kinesis real-time streaming ingestion -> 3.5
update public.flashcards set objective = '3.5' where id = 'sa-f-045';
-- sa-f-046 [E4]: Auto Scaling for consistent performance (compute) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sa-f-046';
-- sa-f-047 [E4]: EBS volume types high IOPS (storage) -> 3.1
update public.flashcards set objective = '3.1' where id = 'sa-f-047';
-- sa-f-048 [E4]: Aurora performance (database) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sa-f-048';
-- sa-f-050 [E4]: ALB vs NLB load balancers (network) -> 3.4
update public.flashcards set objective = '3.4' where id = 'sa-f-050';

-- --- flashcards, Domain 4 (cost-optimized) ---
-- sa-f-051 [E4]: EC2 purchasing options (compute pricing) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sa-f-051';
-- sa-f-052 [E4]: Spot Instances (compute pricing) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sa-f-052';
-- sa-f-055 [E4]: S3 Lifecycle policy (storage cost) -> 4.1
update public.flashcards set objective = '4.1' where id = 'sa-f-055';
-- sa-f-056 [E4]: Savings Plans vs RIs (compute pricing) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sa-f-056';
-- sa-f-058 [E4]: NAT Gateway cost + VPC endpoints (network cost) -> 4.4
update public.flashcards set objective = '4.4' where id = 'sa-f-058';
-- sa-f-060 [E4]: serverless (Lambda/Fargate) cost for spiky workloads (compute) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sa-f-060';

-- --- acronyms ---
-- sa-a-002 [E4]: VPC isolated virtual network (secure workloads/VPC) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sa-a-002';
-- sa-a-003 [E4]: KMS encryption key management (data at rest) -> 1.3
update public.flashcards set objective = '1.3' where id = 'sa-a-003';
-- sa-a-007 [E4]: WAF L7 web filtering (secure workloads/apps) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sa-a-007';
-- sa-a-008 [E4]: AZ availability zone (high availability) -> 2.2
update public.flashcards set objective = '2.2' where id = 'sa-a-008';
-- sa-a-015 [E4]: CDN / CloudFront edge caching (network) -> 3.4
update public.flashcards set objective = '3.4' where id = 'sa-a-015';
-- sa-a-016 [E4]: IOPS storage performance measure (storage) -> 3.1
update public.flashcards set objective = '3.1' where id = 'sa-a-016';
-- sa-a-017 [E4]: ALB Layer 7 load balancing (network) -> 3.4
update public.flashcards set objective = '3.4' where id = 'sa-a-017';
-- sa-a-018 [E4]: NLB Layer 4 load balancing (network) -> 3.4
update public.flashcards set objective = '3.4' where id = 'sa-a-018';
-- sa-a-019 [E4]: RI reserved instance (compute pricing) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sa-a-019';

-- --- feynman ---
-- sa-y-002 [E4]: spreading instances across AZs for resilience (HA) -> 2.2
update public.flashcards set objective = '2.2' where id = 'sa-y-002';
-- sa-y-005 [E4]: Spot Instances cost trade-offs (compute pricing) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sa-y-005';

-- ============ 20260711000006_seed_awssaa_questions.sql ============

-- --- Domain 1 (secure) ---
-- sa-q-002 [E4]: security group properties (VPC security) -> 1.2
update public.questions set objective = '1.2' where id = 'sa-q-002';
-- sa-q-004 [E4]: SSE-KMS encryption at rest enforcement (data at rest) -> 1.3
update public.questions set objective = '1.3' where id = 'sa-q-004';
-- sa-q-006 [E4]: envelope encryption via KMS (data at rest) -> 1.3
update public.questions set objective = '1.3' where id = 'sa-q-006';
-- sa-q-008 [E4]: RDS in private subnet + security group (VPC security) -> 1.2
update public.questions set objective = '1.2' where id = 'sa-q-008';
-- sa-q-009 [E4]: Secrets Manager credential storage/rotation (data protection) -> 1.3
update public.questions set objective = '1.3' where id = 'sa-q-009';
-- sa-q-010 [E4]: S3 Gateway VPC endpoint for private access (secure workloads/VPC) -> 1.2
update public.questions set objective = '1.2' where id = 'sa-q-010';
-- sa-q-011 [E4]: AWS WAF L7 exploit filtering (secure workloads/apps) -> 1.2
update public.questions set objective = '1.2' where id = 'sa-q-011';
-- sa-q-015 [E4]: security groups + NACLs layered filtering (VPC security) -> 1.2
update public.questions set objective = '1.2' where id = 'sa-q-015';
-- sa-q-017 [E4]: SSE-S3 vs SSE-KMS (encryption at rest / KMS) -> 1.3
update public.questions set objective = '1.3' where id = 'sa-q-017';
-- sa-q-018 [E4]: Shield Standard DDoS protection (secure workloads/infra) -> 1.2
update public.questions set objective = '1.2' where id = 'sa-q-018';
-- sa-q-020 [E4]: CloudTrail auditing of KMS key use (data security/KMS) -> 1.3
update public.questions set objective = '1.3' where id = 'sa-q-020';

-- --- Domain 2 (resilient) ---
-- sa-q-022 [E4]: multi-AZ web tier for high availability -> 2.2
update public.questions set objective = '2.2' where id = 'sa-q-022';
-- sa-q-023 [E4]: RDS Multi-AZ automatic failover (HA) -> 2.2
update public.questions set objective = '2.2' where id = 'sa-q-023';
-- sa-q-029 [E4]: Route 53 health-check failover routing (HA) -> 2.2
update public.questions set objective = '2.2' where id = 'sa-q-029';
-- sa-q-033 [E4]: DynamoDB Global Tables multi-region + failover (HA) -> 2.2
update public.questions set objective = '2.2' where id = 'sa-q-033';

-- --- Domain 3 (high-performing) ---
-- sa-q-036 [E4]: CloudFront CDN for global static content (network) -> 3.4
update public.questions set objective = '3.4' where id = 'sa-q-036';
-- sa-q-037 [E4]: ElastiCache to offload repeated reads (database caching) -> 3.3
update public.questions set objective = '3.3' where id = 'sa-q-037';
-- sa-q-038 [E4]: DynamoDB key-value at scale (database) -> 3.3
update public.questions set objective = '3.3' where id = 'sa-q-038';
-- sa-q-039 [E4]: RDS read replicas for read scaling (database) -> 3.3
update public.questions set objective = '3.3' where id = 'sa-q-039';
-- sa-q-040 [E4]: Lambda event-driven serverless (compute) -> 3.2
update public.questions set objective = '3.2' where id = 'sa-q-040';
-- sa-q-041 [E4]: Provisioned IOPS SSD EBS volume (storage) -> 3.1
update public.questions set objective = '3.1' where id = 'sa-q-041';
-- sa-q-042 [E4]: ALB Layer 7 path routing (network) -> 3.4
update public.questions set objective = '3.4' where id = 'sa-q-042';
-- sa-q-043 [E4]: Kinesis clickstream ingestion (data ingestion) -> 3.5
update public.questions set objective = '3.5' where id = 'sa-q-043';
-- sa-q-044 [E4]: cluster placement group for HPC (compute) -> 3.2
update public.questions set objective = '3.2' where id = 'sa-q-044';
-- sa-q-046 [E4]: Aurora performance vs RDS (database) -> 3.3
update public.questions set objective = '3.3' where id = 'sa-q-046';
-- sa-q-047 [E4]: Auto Scaling for consistent performance (compute) -> 3.2
update public.questions set objective = '3.2' where id = 'sa-q-047';
-- sa-q-048 [E4]: NLB Layer 4 high-throughput (network) -> 3.4
update public.questions set objective = '3.4' where id = 'sa-q-048';

-- --- Domain 4 (cost-optimized) ---
-- sa-q-049 [E4]: Spot for interruptible batch (compute pricing) -> 4.2
update public.questions set objective = '4.2' where id = 'sa-q-049';
-- sa-q-050 [E4]: Savings Plan/RI for steady 24/7 workload (compute pricing) -> 4.2
update public.questions set objective = '4.2' where id = 'sa-q-050';
-- sa-q-053 [E4]: S3 Lifecycle policy to cheaper classes (storage cost) -> 4.1
update public.questions set objective = '4.1' where id = 'sa-q-053';
-- sa-q-054 [E4]: NAT Gateway cost cut via S3 Gateway endpoint (network cost) -> 4.4
update public.questions set objective = '4.4' where id = 'sa-q-054';
-- sa-q-056 [E4]: right-sizing to match utilization (compute cost) -> 4.2
update public.questions set objective = '4.2' where id = 'sa-q-056';
-- sa-q-057 [E4]: Lambda pay-per-invocation for spiky API (compute cost) -> 4.2
update public.questions set objective = '4.2' where id = 'sa-q-057';
-- sa-q-059 [E4]: Savings Plan vs Reserved Instance (compute pricing) -> 4.2
update public.questions set objective = '4.2' where id = 'sa-q-059';

-- ============ 20260714000007_expand_awssaa.sql ============

-- --- flashcards, Domain 1 (secure) ---
-- sa-f-065 [E4]: Secrets Manager automatic rotation (data protection) -> 1.3
update public.flashcards set objective = '1.3' where id = 'sa-f-065';
-- sa-f-066 [E4]: KMS multi-region key replication (data at rest / KMS) -> 1.3
update public.flashcards set objective = '1.3' where id = 'sa-f-066';
-- sa-f-070 [E4]: VPC flow log filtering (VPC security monitoring) -> 1.2
update public.flashcards set objective = '1.2' where id = 'sa-f-070';
-- sa-f-071 [E4]: envelope encryption for large S3 objects (KMS / data at rest) -> 1.3
update public.flashcards set objective = '1.3' where id = 'sa-f-071';

-- --- flashcards, Domain 2 (resilient) ---
-- sa-f-073 [E4]: Route 53 failover routing policy (HA) -> 2.2
update public.flashcards set objective = '2.2' where id = 'sa-f-073';
-- sa-f-077 [E4]: NAT Gateway per-AZ to avoid single point of failure (fault tolerance) -> 2.2
update public.flashcards set objective = '2.2' where id = 'sa-f-077';

-- --- flashcards, Domain 3 (high-performing) ---
-- sa-f-080 [E4]: DynamoDB DAX in-memory caching (database) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sa-f-080';
-- sa-f-081 [E4]: Global Accelerator vs CloudFront (network) -> 3.4
update public.flashcards set objective = '3.4' where id = 'sa-f-081';
-- sa-f-082 [E4]: DynamoDB auto scaling / on-demand capacity (database) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sa-f-082';
-- sa-f-083 [E4]: ECS Fargate vs ECS on EC2 (compute) -> 3.2
update public.flashcards set objective = '3.2' where id = 'sa-f-083';
-- sa-f-084 [E4]: Aurora Serverless v2 capacity scaling (database) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sa-f-084';
-- sa-f-086 [E4]: ElastiCache Redis cluster mode (database caching) -> 3.3
update public.flashcards set objective = '3.3' where id = 'sa-f-086';

-- --- flashcards, Domain 4 (cost-optimized) ---
-- sa-f-087 [E4]: Compute Optimizer right-sizing recommendations (compute cost) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sa-f-087';
-- sa-f-088 [E4]: S3 Requester Pays (storage/transfer cost) -> 4.1
update public.flashcards set objective = '4.1' where id = 'sa-f-088';
-- sa-f-089 [E4]: Compute vs EC2 Instance Savings Plan (compute pricing) -> 4.2
update public.flashcards set objective = '4.2' where id = 'sa-f-089';
-- sa-f-091 [E4]: Aurora Serverless cost-efficiency (database cost) -> 4.3
update public.flashcards set objective = '4.3' where id = 'sa-f-091';
-- sa-f-092 [E4]: S3 Intelligent-Tiering monitoring-fee trade-off (storage cost) -> 4.1
update public.flashcards set objective = '4.1' where id = 'sa-f-092';

-- --- questions, Domain 1 (secure) ---
-- sa-q-063 [E4]: Secrets Manager automatic rotation (data protection) -> 1.3
update public.questions set objective = '1.3' where id = 'sa-q-063';
-- sa-q-064 [E4]: KMS multi-region keys (data at rest / KMS) -> 1.3
update public.questions set objective = '1.3' where id = 'sa-q-064';
-- sa-q-068 [E4]: VPC Flow Logs REJECT filtering (VPC security monitoring) -> 1.2
update public.questions set objective = '1.2' where id = 'sa-q-068';
-- sa-q-069 [E4]: envelope encryption for large S3 objects (KMS / data at rest) -> 1.3
update public.questions set objective = '1.3' where id = 'sa-q-069';
-- sa-q-070 [E4]: DynamoDB Gateway VPC endpoint for private access (secure workloads/VPC) -> 1.2
update public.questions set objective = '1.2' where id = 'sa-q-070';
-- sa-q-071 [E4]: enforce KMS-key encryption on PutObject (data at rest / KMS) -> 1.3
update public.questions set objective = '1.3' where id = 'sa-q-071';

-- --- questions, Domain 2 (resilient) ---
-- sa-q-076 [E4]: Route 53 failover routing to healthy standby (HA) -> 2.2
update public.questions set objective = '2.2' where id = 'sa-q-076';
-- sa-q-080 [E4]: single NAT Gateway as VPC-wide single point of failure (fault tolerance) -> 2.2
update public.questions set objective = '2.2' where id = 'sa-q-080';

-- --- questions, Domain 3 (high-performing) ---
-- sa-q-086 [E4]: DynamoDB DAX in-memory caching (database; domain already 3 per 000106) -> 3.3
update public.questions set objective = '3.3' where id = 'sa-q-086';
-- sa-q-087 [E4]: Global Accelerator for UDP over AWS backbone (network) -> 3.4
update public.questions set objective = '3.4' where id = 'sa-q-087';
-- sa-q-088 [E4]: Aurora Serverless v2 capacity scaling (database) -> 3.3
update public.questions set objective = '3.3' where id = 'sa-q-088';
-- sa-q-089 [E4]: ECS Fargate serverless containers (compute) -> 3.2
update public.questions set objective = '3.2' where id = 'sa-q-089';
-- sa-q-090 [E4]: DynamoDB on-demand capacity mode (database) -> 3.3
update public.questions set objective = '3.3' where id = 'sa-q-090';
-- sa-q-092 [E4]: ElastiCache Redis cluster mode sharding (database caching) -> 3.3
update public.questions set objective = '3.3' where id = 'sa-q-092';
-- sa-q-093 [E4]: CloudFront + Global Accelerator (network) -> 3.4
update public.questions set objective = '3.4' where id = 'sa-q-093';
-- sa-q-095 [E4]: ECS EC2 launch type instance control (compute) -> 3.2
update public.questions set objective = '3.2' where id = 'sa-q-095';
-- sa-q-096 [E4]: st1 throughput-optimized HDD EBS volume (storage) -> 3.1
update public.questions set objective = '3.1' where id = 'sa-q-096';

-- --- questions, Domain 4 (cost-optimized) ---
-- sa-q-098 [E4]: Compute Optimizer right-sizing EC2/EBS (compute cost) -> 4.2
update public.questions set objective = '4.2' where id = 'sa-q-098';
-- sa-q-099 [E4]: S3 Requester Pays for public dataset (storage/transfer cost) -> 4.1
update public.questions set objective = '4.1' where id = 'sa-q-099';
-- sa-q-100 [E4]: Compute Savings Plan flexibility (compute pricing) -> 4.2
update public.questions set objective = '4.2' where id = 'sa-q-100';
-- sa-q-102 [E4]: Aurora Serverless cost-efficiency (database cost) -> 4.3
update public.questions set objective = '4.3' where id = 'sa-q-102';
-- sa-q-103 [E4]: S3 Intelligent-Tiering for unpredictable access (storage cost) -> 4.1
update public.questions set objective = '4.1' where id = 'sa-q-103';
