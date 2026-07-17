-- Review fixes: CySA+ (CS0-003) flashcards and questions.
-- Scope: 20260711000002_seed_cysa_flashcards.sql, 20260711000003_seed_cysa_questions_a.sql,
--        20260711000004_seed_cysa_questions_b.sql, 20260714000006_expand_cysa.sql

-- cy-f-037 [E3]: front asked what the BASE score's metric groups are, but the back lists CVSS's three metric groups (Base/Temporal/Environmental); reword front to match the back
update public.flashcards set front = $$What does a CVSS Base score measure, and what are the three CVSS metric groups?$$ where id = 'cy-f-037';

-- cy-f-048 [E6]: true duplicate of cy-f-094 - both fronts ask for remediation inhibitors and the backs list the same five factors nearly verbatim; keeping cy-f-094 (inhibitors sit under the Reporting domain in CS0-003)
delete from public.flashcards where id = 'cy-f-048';

-- cy-f-127 [W1]: back said MD5 is "a real, avoidable weakness" without stating the actual discriminating fact; name the collision weakness and its evidentiary consequence
update public.flashcards set back = $$MD5 has known collision attacks (two different inputs can produce the same hash), so opposing counsel can challenge integrity claims built on it. SHA-256 has no practical collisions - use it for imaging and evidence hashes, and flag MD5-only procedures for update.$$ where id = 'cy-f-127';

-- cy-q-039 [E3]: stem said the risk owner "documents acceptance" while the explanation (and cy-q-054's own taxonomy) frames segmentation+monitoring as a compensating control, a distinct treatment from acceptance; reword stem to remove the contradiction
update public.questions set stem = $q$A critical patch cannot be applied for 90 days due to a vendor dependency, so the team adds monitoring and network segmentation in the interim. What is the segmentation?$q$ where id = 'cy-q-039';

-- cy-q-040 [E6]: true duplicate of cy-q-090 - same tested fact (business-critical breakage is a remediation inhibitor) with a near-identical stem and an identical distractor set (CVE ID / credentialed scanner / inventoried asset); keeping cy-q-090
delete from public.questions where id = 'cy-q-040';

-- cy-q-049 [W2]: three distractors were jokes (dashboard color, programming language, office location); replace with same-category vulnerability-management concepts and refute the most tempting one
update public.questions set choices = $q$["The CVSS base score a finding receives","Scan frequency, prioritization, and acceptable scan intrusiveness","The vendor's patch release schedule","Which CVE identifier is assigned to a flaw"]$q$::jsonb, explanation = $q$How essential an asset is determines how often it is scanned, how its findings are prioritized, and whether disruptive active scanning is tolerable. It does not change the CVSS base score - that is intrinsic to the flaw (criticality feeds the Environmental adjustment instead) - and vendor patch schedules and CVE assignment are external to the organization.$q$ where id = 'cy-q-049';

-- cy-q-080 [W2]: distractors (SOC monitors, square footage, coffee machines) were absurd; replace with plausible raw metrics that are measurements but not goal-linked KPIs
update public.questions set choices = $q$["Total number of scans run per month","Mean time to remediate (MTTR) against SLA","Number of security tools deployed","Total count of vulnerabilities ever detected"]$q$::jsonb, explanation = $q$MTTR measured against SLA ties a measurement to a committed goal - a true performance indicator. The others are raw activity or inventory counts: they are metrics, but with no target attached they indicate nothing about how well remediation is performing.$q$ where id = 'cy-q-080';

-- cy-q-081 [W2]: distractors (scanner brand, programming language, office hours) were off-category; replace with plausible SLA-adjacent operational details
update public.questions set choices = $q$["The scanner's maximum allowed scan duration","The timeframe to remediate by severity (e.g., criticals within 15 days)","The number of findings a team must close each week","The uptime guarantee for the scanning platform"]$q$::jsonb, explanation = $q$A remediation SLA sets committed timeframes to fix findings by severity, and reporting tracks compliance against it. Scan duration limits, weekly closure quotas, and platform uptime are operational details - none of them is the severity-based remediation commitment an SLA defines.$q$ where id = 'cy-q-081';

-- cy-q-087 [W2]: "Attackers" and "Marketing only" were throwaway options; replace with plausible security-adjacent audiences who consume other report types
update public.questions set choices = $q$["The SOC analysts tuning detection rules","Auditors, regulators, and customers verifying controls meet a standard","The marketing team drafting promotional material","Threat intelligence sharing communities"]$q$::jsonb, explanation = $q$Compliance reports provide evidence that controls meet a standard (PCI DSS, HIPAA, SOC 2) for auditors, regulators, and customers. SOC analysts consume operational reports, marketing has no need for control evidence, and intel-sharing communities exchange indicators, not compliance attestations.$q$ where id = 'cy-q-087';

-- cy-q-089 [W2]: "A metric is always red" was a joke option; replace distractors with plausible misconceptions about the metric/KPI distinction
update public.questions set choices = $q$["They are interchangeable terms in security reporting","A metric is any measurement; a KPI is a goal-linked metric indicating performance","A KPI is always a financial measurement","A metric counts events while a KPI only measures time"]$q$::jsonb where id = 'cy-q-089';

-- cy-q-092 [W2]: distractors (fills disk space, speeds up the network, never needed) were absurd; replace with plausible misconceptions and refute the most tempting one
update public.questions set choices = $q$["It reduces storage costs over time","It keeps reports defensible and lets investigations be revisited or used in court","It removes the need for chain-of-custody documentation","It guarantees no similar incident will recur"]$q$::jsonb, explanation = $q$Retaining logs, images, and artifacts per policy or legal hold keeps reports defensible and supports later reinvestigation or legal use - premature deletion destroys that capability. Retention complements chain-of-custody documentation rather than replacing it, and it prevents nothing by itself.$q$ where id = 'cy-q-092';

-- cy-q-099 [W2]: "Never" was a non-option; replace weak distractors with plausible routine/mistimed triggers that still contrast with criminal activity
update public.questions set choices = $q$["For every failed login on an internet-facing server","When an incident involves criminal activity such as major data theft or extortion","Only after the cyber-insurance claim is settled","Whenever a single phishing email is reported"]$q$::jsonb where id = 'cy-q-099';

-- cy-q-113 [W2]: distractors "There is no such thing as playbook maturity" and "Undefined" were throwaways; use the actual earlier maturity stages as same-category distractors (answer remains index 1, Optimized)
update public.questions set choices = $q$["Ad hoc","Optimized","Documented","Standardized"]$q$::jsonb where id = 'cy-q-113';

-- cy-q-114 [E6]: true duplicate of cy-q-101 - both test that JA3/JA3S fingerprints the TLS handshake to identify the generating application without decryption; keeping cy-q-101 (stronger scenario and distractors)
delete from public.questions where id = 'cy-q-114';

-- cy-q-116 [W1]: stem's only clue was "random, non-repeating intervals to the same IP", which also describes ordinary browsing; add the persistence discriminator that makes jittered beaconing the defensible answer
update public.questions set stem = $q$Over several days, a host maintains connections to the same external IP at randomized, non-repeating intervals - continuing around the clock, including nights and weekends when no user is logged on. What should the analyst suspect?$q$ where id = 'cy-q-116';

-- cy-q-118 [W2]: distractors "The SOC should be shut down" and "fabricate a finding" were absurd; replace with plausible misinterpretations of a negative hunt result and refute the over-claim
update public.questions set choices = $q$["The hypothesis was worthless and the hunt failed","A negative result still has value - it increases confidence that this specific TTP is not present, and the hypothesis can be documented for future reference","The absence of evidence proves the environment has never been compromised","The hunt should be rerun against the same telemetry until evidence is found"]$q$::jsonb, explanation = $q$A well-formed hunt that finds nothing is not a failure - it provides genuine (if negative) evidence and documents ground already covered for future hunts. It does not prove the environment is clean, only that this TTP left no trace in the telemetry examined, and rerunning the same queries against the same data adds nothing.$q$ where id = 'cy-q-118';

-- cy-q-122 [E6]: true duplicate of cy-q-108 - both test that native API integration (CloudTrail) avoids deploying agents on ephemeral cloud resources; keeping cy-q-108 (more concrete distractors)
delete from public.questions where id = 'cy-q-122';

-- cy-q-123 [E6]: true duplicate of cy-q-111 - both test the false-negative vs false-positive cost asymmetry in rule tuning with near-identical correct options; keeping cy-q-111 (crisper stem)
delete from public.questions where id = 'cy-q-123';

-- cy-q-136 [E6]: true duplicate of cy-q-030 - both test that passive scanning avoids disrupting fragile legacy devices (ICS/medical); keeping cy-q-030 (cleaner scenario format)
delete from public.questions where id = 'cy-q-136';

-- cy-q-143 [E6]: true duplicate of cy-q-043 - both are identify-SSRF-from-a-user-supplied-URL-fetch stems with the same distractor category; keeping cy-q-043 (adds the cloud metadata/IAM credential consequence)
delete from public.questions where id = 'cy-q-143';

-- cy-q-154 [E6]: true duplicate of cy-q-058 - both test immediate isolation as the first step for actively spreading ransomware with near-identical stems; keeping cy-q-058 (stronger distractors)
delete from public.questions where id = 'cy-q-154';

-- cy-q-085 [E6]: true duplicate of cy-q-168 - both test that severity+exposure+asset value combined into one number is a (composite) risk score; keeping cy-q-168 (harder, better same-category distractors vs. "A hash"/"A subnet mask")
delete from public.questions where id = 'cy-q-085';

-- cy-q-091 [E6]: true duplicate of cy-q-170 - correct options restate the same fact nearly verbatim (assign owners and due dates, follow findings to closure), and cy-q-166 already covers the applied version; keeping cy-q-170
delete from public.questions where id = 'cy-q-091';

-- cy-q-169 [E6]: true duplicate of cy-q-078 - both test that fear of blame suppresses honest reporting and hides root causes, with near-identical correct options and explanations; keeping cy-q-078
delete from public.questions where id = 'cy-q-169';
