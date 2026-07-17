-- Review fixes for CISSP (ISC2 2024) content, Scope A.
-- Files reviewed:
--   20260711000009_seed_cissp.sql           (96 flashcards: 68 core, 20 acronym, 8 feynman)
--   20260711000010_seed_cissp_questions.sql (55 questions)
--   20260714000009_expand_cissp.sql         (60 flashcards, 95 questions)

-- ============ 20260711000009_seed_cissp.sql ============

-- ci-f-029 [W4]: front named the answer ("(CPTED)") that the back expands, so the card had no retrieval value; rewritten as an acronym-expansion prompt.
update public.flashcards set front = $$What is CPTED and what are its main design principles?$$ where id = 'ci-f-029';

-- ci-f-031 [E4]: fire suppression is site/facility physical security - objective 3.4 under this bank's own convention (ci-f-029 CPTED and ci-q-021 fire suppression are both 3.4), not 3.3 (TCB/architecture items).
update public.flashcards set objective = '3.4' where id = 'ci-f-031';

-- ci-f-017 [E6]: true duplicate of ci-f-082 (identical front "What is the difference between scoping and tailoring a control baseline?"); ci-f-082 kept as stronger (concrete impact-level example and parameter-tailoring detail).
delete from public.flashcards where id = 'ci-f-017';

-- ci-f-019 [E6]: true duplicate of ci-f-080 (same clear/purge/destroy fact); ci-f-080 kept as stronger (anchored to NIST SP 800-88 with recovery-resistance criteria).
delete from public.flashcards where id = 'ci-f-019';

-- ci-f-022 [E6]: true duplicate of ci-f-086 (identical front "What does the Clark-Wilson model enforce?"); ci-f-086 kept as stronger (adds the subject-program-object access triple).
delete from public.flashcards where id = 'ci-f-022';

-- ci-f-034 [E6]: true duplicate of ci-f-094 (identical front "What is the difference between IPsec AH and ESP?"); its tunnel/transport tail is separately covered by ci-f-093, so the single-fact expansion pair is kept.
delete from public.flashcards where id = 'ci-f-034';

-- ci-f-039 [E6]: true duplicate of ci-f-100 (same IAAA-components fact, near-identical front); ci-f-100 kept as stronger (explains each component rather than one-word glosses).
delete from public.flashcards where id = 'ci-f-039';

-- ci-f-041 [E6]: true duplicate of ci-f-101 (same DAC/MAC/RBAC/ABAC fact, near-identical front); ci-f-101 kept as stronger (adds request-time attribute evaluation detail).
delete from public.flashcards where id = 'ci-f-041';

-- ci-f-049 [E6]: true duplicate of ci-f-108 (same black/white/gray-box fact, near-identical front); ci-f-108 kept as stronger (concrete examples of what knowledge each level includes).
delete from public.flashcards where id = 'ci-f-049';

-- ci-f-053 [E6]: true duplicate of ci-f-116 (same (ISC)2 incident phases list); ci-f-116 kept as its front explicitly names the (ISC)2 phase model being asked for.
delete from public.flashcards where id = 'ci-f-053';

-- ci-f-063 [E6]: true duplicate of ci-f-113 (identical front "What is the difference between SAST and DAST?"); ci-f-113 kept as stronger (expands both acronyms and adds SDLC-timing detail).
delete from public.flashcards where id = 'ci-f-063';

-- ci-a-020 [E1]: "Service Organization Control" is the pre-2017 name; AICPA renamed the reports "System and Organization Controls"; back updated with current name and Trust Services Criteria.
update public.flashcards set back = $$System and Organization Controls 2 - AICPA attestation report on a service organization's controls against the Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy); restricted distribution.$$ where id = 'ci-a-020';

-- ============ 20260711000010_seed_cissp_questions.sql ============

-- ci-q-055 [E4]: TCB is an architecture/trusted-computing item - objective 3.3 under this bank's convention (ci-f-026 TCB and ci-q-018 reference monitor are 3.3), not 3.1 (security models).
update public.questions set objective = '3.3' where id = 'ci-q-055';

-- ============ 20260714000009_expand_cissp.sql ============

-- ci-f-069 [E1]: "Protect society, the commonwealth, and the infrastructure" is the retired pre-revision wording; the current (ISC)2 Canon I is "Protect society, the common good, necessary public trust and confidence, and the infrastructure" (matching ci-f-006).
update public.flashcards set back = $$1) Protect society, the common good, necessary public trust and confidence, and the infrastructure. 2) Act honorably, honestly, justly, responsibly, and legally. 3) Provide diligent and competent service to principals. 4) Advance and protect the profession. The canons are ranked - Canon 1 (society/public trust) outranks duty to principals when they conflict.$$ where id = 'ci-f-069';

-- ci-f-073 [E6]: true duplicate of ci-f-002 (same due diligence vs due care fact, near-identical front); ci-f-002 kept as stronger (includes the "diligence = detect, care = act" memory hook).
delete from public.flashcards where id = 'ci-f-073';

-- ci-f-076 [E1]: card presented "six functional types" as the complete list but omitted Recovery, which the CISSP canon includes (seven categories: preventive, deterrent, detective, compensating, corrective, recovery, directive); front and back corrected.
update public.flashcards set front = $$What are the seven categories of security controls by function?$$, back = $$Preventive (stops an incident), Deterrent (discourages an attempt), Detective (identifies one occurring), Corrective (limits damage and fixes the immediate cause), Recovery (restores full capability after an incident, e.g., backups/DR), Compensating (alternative when the primary control is not feasible), and Directive (policy/procedure directing behavior).$$ where id = 'ci-f-076';

-- ci-f-081 [E6]: true duplicate of ci-f-015 (same three-data-states fact, near-identical front); ci-f-015 kept as stronger (adds the exam-tested "data in use is hardest to protect" discriminator, which ci-q-011 tests).
delete from public.flashcards where id = 'ci-f-081';

-- ci-f-089 [E6]: true duplicate of ci-f-027 (same reference-monitor-properties fact); ci-f-027 kept as stronger (also names the security kernel as the implementation, and does not misgloss tamperproof as "cannot be bypassed" - non-bypassability is the complete-mediation property).
delete from public.flashcards where id = 'ci-f-089';

-- ci-f-097 [E1]: KRACK is a key-reinstallation (nonce-reuse) attack, not an offline dictionary attack - SAE does not target the KRACK class; the weakness SAE closes is offline passphrase guessing against a captured WPA2-PSK handshake.
update public.flashcards set back = $$Simultaneous Authentication of Equals (SAE, a Dragonfly password-authenticated key exchange) makes a captured handshake useless for offline dictionary/brute-force attacks - each password guess requires a live exchange - and adds forward secrecy. With WPA2-PSK, a captured four-way handshake could be brute-forced offline against the passphrase. (KRACK was a separate WPA2 key-reinstallation flaw, fixed by patches rather than by SAE.)$$ where id = 'ci-f-097';

-- ci-f-109 [E6]: true duplicate of ci-f-047 (same vulnerability-assessment vs penetration-test fact, near-identical front); ci-f-047 kept as stronger (adds chained exploitation and rules of engagement).
delete from public.flashcards where id = 'ci-f-109';

-- ci-q-056 [W2]: throwaway distractor "There is no ethical obligation to report a friend" replaced with the remaining real canon so all four options are drawn from the actual (ISC)2 canons; explanation updated to refute each.
update public.questions set
  choices = $q$["Act honorably, honestly, justly, responsibly, and legally","Advance and protect the profession","Provide diligent and competent service to principals","Protect society, the common good, necessary public trust and confidence, and the infrastructure"]$q$::jsonb,
  explanation = $q$Looking the other way to preserve a friendship is a personal-integrity failure - acting honorably, honestly, justly, responsibly, and legally. Canon 1 (protect society) concerns harm to the public and infrastructure, not internal policy enforcement; "diligent and competent service to principals" is about the quality of work delivered to employers/clients; and "advance and protect the profession" concerns the profession's collective reputation, not day-to-day reporting duties.$q$
where id = 'ci-q-056';

-- ci-q-059 [W2]: three absurd distractors ("Ignore the residual risk", "Delete the risk register entry", "Refuse to deploy any further mitigating controls ever again") replaced with plausible governance mistakes; explanation updated to refute each.
update public.questions set
  choices = $q$["Formally transfer the remaining risk (e.g., cyber insurance) or obtain documented executive acceptance","Have the security team accept the risk internally and close the register entry","Re-score the risk downward so it falls within the documented risk appetite","Defer the risk assessment until further mitigation becomes economically feasible"]$q$::jsonb,
  explanation = $q$When further mitigation is not cost-justified, the remaining legitimate treatments are transference or formal acceptance at the right level of authority. The security team cannot accept business risk - only management accountable for the consequences can; re-scoring a risk to fit the appetite falsifies the register rather than treating the exposure; and deferring assessment leaves a known above-appetite risk undocumented and unowned.$q$
where id = 'ci-q-059';

-- ci-q-061 [W2]: junk distractors ("Failure to obtain a patent", "Failure to conduct a penetration test specifically") replaced - most importantly adding the genuinely tempting due-diligence confusion; explanation updated to refute it.
update public.questions set
  choices = $q$["Failure to exercise due care","Failure to exercise due diligence","Failure to purchase cyber insurance","Strict liability, which applies regardless of any precautions taken"]$q$::jsonb,
  explanation = $q$Due care is the reasonable, prudent action a similarly situated organization would take; knowing about industry threats for years while implementing nothing is the textbook due care failure. Due diligence (investigating and understanding the risk) is not the deficiency the suit turns on - the threats were known; the failure was not acting on that knowledge. Insurance is an optional risk transfer, not a legal duty, and negligence liability rests on unreasonable conduct, not strict liability.$q$
where id = 'ci-q-061';

-- ci-q-066 [W2]: all three distractors were absurd negations ("Vendor risk never changes", "Regulations prohibit reassessing", "Initial assessments are always sufficient forever"); replaced with plausible-but-wrong rationales; explanation updated to refute each.
update public.questions set
  choices = $q$["A vendor's security posture, subcontractors, and risk profile can change materially after onboarding","Periodic reassessment shifts legal liability for a vendor breach onto the vendor","The initial assessment covers only technical controls, never contractual protections","Cyber-insurance policies require annual reassessment of every vendor before renewal"]$q$::jsonb,
  explanation = $q$Ownership changes, new subcontractors, breaches, or degraded controls can all occur after signing, so third-party risk management must be ongoing (helped by a right-to-audit clause). Reassessment informs the customer's risk decisions but does not move legal liability by itself; initial assessments routinely cover contractual terms as well as technical controls; and no universal insurance rule mandates annual reassessment of every vendor.$q$
where id = 'ci-q-066';

-- ci-q-068 [W2]: distractors "identical in every respect" and "Neither model considers attacker behavior" were throwaway; replaced with an inversion and a sibling-framework confusion; explanation updated to refute each.
update public.questions set
  choices = $q$["PASTA is risk-centric, aligning threats to business impact and attacker motivation; STRIDE categorizes threats by the security property violated","STRIDE is the risk-centric, business-focused methodology; PASTA categorizes threats by security property","PASTA is a scoring system for ranking individual vulnerabilities; STRIDE is a staged attack-simulation process","STRIDE models only network-level threats, while PASTA models only application code"]$q$::jsonb,
  explanation = $q$PASTA (Process for Attack Simulation and Threat Analysis) is a seven-stage, risk-centric methodology tying technical threats to business impact and attacker motivation; STRIDE is a developer-oriented categorization of threats by the property violated (spoofing, tampering, repudiation, information disclosure, DoS, elevation of privilege). The second option simply inverts the two; scoring/ranking describes DREAD or CVSS rather than either model; and neither framework is restricted to network-only or code-only threats.$q$
where id = 'ci-q-068';

-- ci-q-069 [E6]: true duplicate of ci-q-009 (same fact - the data owner is accountable for classification - with near-identical stem and the same owner/custodian/user distractor set); ci-q-009 kept.
delete from public.questions where id = 'ci-q-069';

-- ci-q-075 [E6]: true duplicate of ci-q-007 (same GDPR controller definition with near-identical stem and the same controller/processor/custodian/subject choice set); ci-q-007 kept.
delete from public.questions where id = 'ci-q-075';

-- ci-q-076 [W2]: junk distractors ("Improved customer service quality with no downside", "Reduced storage costs", "Guaranteed regulatory compliance") replaced with plausible privacy-sibling claims; explanation updated to refute each.
update public.questions set
  choices = $q$["Breach liability and legal exposure from retaining data longer than necessary","No additional risk, provided the records remain encrypted at rest","A violation of data sovereignty, since the records outlived their jurisdiction","Loss of the ability to restore backups made during the retention period"]$q$::jsonb,
  explanation = $q$Data held past its required retention with no business justification enlarges breach impact and legal exposure (it remains discoverable in litigation and violates storage-limitation/minimization principles in privacy law). Encryption reduces but does not remove that liability - the data is still regulated personal data held without purpose; data sovereignty concerns where data resides, not how long it is kept; and retention schedules do not break backup restores.$q$
where id = 'ci-q-076';

-- ci-q-082 [W2]: distractors "EAL2 cannot be used in any regulated environment" and "EAL ratings measure encryption key length only" were junk; replaced with plausible Common Criteria confusions (vulnerability-free certification, Target of Evaluation scope); explanation updated to refute each.
update public.questions set
  choices = $q$["The EAL4 product underwent a more rigorous and thorough evaluation and testing process, not necessarily that it is inherently more secure in practice","The EAL4 product is certified free of exploitable vulnerabilities","The EAL4 product's Target of Evaluation covers a broader set of security functions","The EAL4 product uses stronger cryptographic algorithms than the EAL2 product"]$q$::jsonb,
  explanation = $q$Evaluation Assurance Levels measure the rigor and depth of the assurance process applied to the vendor's claimed Security Target - EAL4 means "methodically designed, tested and reviewed," not vulnerability-free. No EAL guarantees the absence of flaws; the scope of functions evaluated is defined by the Target of Evaluation, which is independent of the EAL number; and EALs say nothing about which cryptographic algorithms a product uses.$q$
where id = 'ci-q-082';

-- ci-q-088 [W2]: all three distractors were absurd ("Confidentiality is never relevant in any ICS", "ICS systems have no legacy or patching constraints", "Availability is only a concern for standard IT"); replaced with plausible inverted-fact claims; explanation updated to refute each.
update public.questions set
  choices = $q$["Disrupting a physical process (e.g., halting a power grid or water treatment system) can cause immediate safety and operational harm, making uptime the paramount concern","Legacy ICS protocols already provide strong built-in encryption, leaving little confidentiality risk to manage","ICS components can be patched and rebooted freely, so any outage is quick to recover from","Process telemetry is classified as public information under most regulatory regimes"]$q$::jsonb,
  explanation = $q$In ICS/SCADA environments an outage can directly endanger physical safety and critical infrastructure, so availability outweighs confidentiality in the trade-off. The distractors invert reality: legacy protocols like Modbus and DNP3 were designed without encryption or authentication, patch windows are rare precisely because reboots interrupt the physical process, and telemetry is sensitive operational data, not public by regulation.$q$
where id = 'ci-q-088';

-- ci-q-097 [E1]: the marked-correct option and explanation cited KRACK as the offline-dictionary weakness SAE closes - KRACK is a key-reinstallation (nonce-reuse) attack, not an offline dictionary attack; choices rebuilt with the KRACK confusion as a refutable distractor.
update public.questions set
  choices = $q$["Offline dictionary/brute-force attacks against a captured handshake","Key-reinstallation (KRACK) nonce-reuse attacks","Evil-twin access points impersonating the legitimate SSID","RC4 keystream/IV weaknesses carried over from WEP"]$q$::jsonb,
  explanation = $q$With WPA2-PSK, capturing the four-way handshake enables offline passphrase guessing at unlimited speed; SAE's Dragonfly password-authenticated key exchange makes a captured exchange useless offline - each guess requires a live interaction - and adds forward secrecy. KRACK was a distinct key-reinstallation implementation flaw addressed by client/AP patches, not by SAE itself; SAE does not stop evil-twin impersonation; and WEP's RC4/IV flaws were eliminated back in WPA/WPA2.$q$
where id = 'ci-q-097';

-- ci-q-101 [W2]: distractors ("iSCSI cannot function on a shared network", "no additional risk", "iSCSI automatically encrypts itself") were junk; replaced with plausible storage-networking confusions; explanation updated to refute each.
update public.questions set
  choices = $q$["Storage traffic becomes exposed to interception or interference by any compromised host on the same broad network segment","iSCSI initiators cannot authenticate targets unless a dedicated storage network is used","Storage sessions will fail because iSCSI requires lossless Ethernet to operate","The design violates Fibre Channel zoning requirements for block storage"]$q$::jsonb,
  explanation = $q$Converging iSCSI onto a flat general-purpose network puts storage sessions within reach of any compromised host on the segment (sniffing, spoofing, denial of service); the standard mitigations are dedicated VLANs/segments plus CHAP authentication and, where needed, IPsec. CHAP is a protocol feature that works on any network topology; iSCSI runs over ordinary TCP/IP and does not need lossless Ethernet (that constraint applies to FCoE); and Fibre Channel zoning does not govern iSCSI.$q$
where id = 'ci-q-101';

-- ci-q-103 [W2]: distractor set mixed junk with mislabeled facts ("Static NAT, which duplicates internet traffic"); rebuilt so every option pairs a real term with a plausible claim, forcing discrimination of both name and risk; explanation updated.
update public.questions set
  choices = $q$["Split tunneling, which lets non-corporate internet traffic bypass corporate security inspection","Split tunneling, which forces all traffic through the corporate proxy and adds latency","Full tunneling, which sends only corporate-destined traffic through the VPN","Full tunneling, which exposes the corporate network to the employee's local LAN"]$q$::jsonb,
  explanation = $q$Routing only corporate-destined traffic through the tunnel is split tunneling; its trade-off is that general internet traffic escapes corporate proxies, filtering, and monitoring, and the device is simultaneously connected to an uninspected network. Full tunneling is the opposite configuration - all traffic traverses the VPN and inspection stack at the cost of bandwidth and latency - so both "full tunneling" options mislabel the scenario, and the second option describes full tunneling's drawback, not split tunneling's.$q$
where id = 'ci-q-103';

-- ci-q-112 [W2]: distractors were direct negations of the stem ("Kerberos is unaffected by system clock settings", "does not use time-based tickets at all"); replaced with plausible authentication-troubleshooting confusions; explanation updated to refute each.
update public.questions set
  choices = $q$["Kerberos authentication depends on tightly synchronized clocks to validate ticket timestamps and prevent replay","The KDC's certificate has expired, so ticket-granting tickets can no longer be signed","NTLM fallback was disabled, which blocks all Kerberos logons at the branch","The workstation lost its LDAP connection, which Kerberos uses to issue tickets"]$q$::jsonb,
  explanation = $q$Kerberos tickets and authenticators carry timestamps checked against an allowed clock skew (5 minutes by default) specifically to defeat replay; drift beyond it produces skew errors until time is resynchronized via NTP. X.509 certificates are not what sign standard Kerberos tickets (the KDC uses symmetric keys); NTLM is a separate fallback protocol, not a Kerberos dependency; and tickets are issued over the Kerberos protocol by the KDC, not over LDAP.$q$
where id = 'ci-q-112';

-- ci-q-114 [W2]: distractors ("No risk, since the employee no longer has a badge", "Improved security", "A compliance benefit") were junk; replaced with plausible partial-truth claims; explanation updated to refute each.
update public.questions set
  choices = $q$["An extended window in which a disgruntled former employee (or anyone with their credentials) could access systems without authorization","Minimal risk, since building-access badges are collected on the employee's last day","License overspend on the unused accounts, a financial rather than security exposure","Audit-log gaps, since accounts pending deletion stop generating log entries"]$q$::jsonb,
  explanation = $q$Valid-but-unowned credentials are a prime insider/ex-insider attack vector, and remote access does not require a badge - physical offboarding does not close the logical window. Stale-account license cost is real but secondary to the security exposure, and active accounts keep generating logs; the problem is that activity on them may be malicious, not that logging stops.$q$
where id = 'ci-q-114';

-- ci-q-117 [E6]: true duplicate of ci-q-036 (same fact - zero-knowledge testing is black box - with a near-identical "no prior knowledge, external attacker" stem); ci-q-036 kept as its distractor set (white/gray/clear-box) is all same-category.
delete from public.questions where id = 'ci-q-117';

-- ci-q-118 [W2]: throwaway distractor "This is not a form of penetration testing" replaced with a red-team sibling; options rebalanced so each pairs a test type with its actual defining trait; explanation updated to refute each.
update public.questions set
  choices = $q$["White box test - full knowledge gives the most thorough coverage, reaching areas an outside attacker might never discover","Black box test - the tester starts with zero internal knowledge","Gray box test - the tester holds partial knowledge such as standard user credentials","Red team engagement - covert and objective-based, with internal knowledge deliberately withheld"]$q$::jsonb,
  explanation = $q$Source code, architecture diagrams, and administrative documentation constitute full knowledge - a white box test, whose advantage is depth and completeness of coverage. Black box and gray box start from zero and partial knowledge respectively, so both mislabel this engagement, and a red team exercise is defined by covert, objective-driven emulation, typically without source-level disclosure.$q$
where id = 'ci-q-118';

-- ci-q-129 [W2]: distractors were self-evidently false ("always finds every vulnerability", "always faster and cheaper", "no additional value"); replaced with plausible inverted-capability claims; explanation updated to refute each.
update public.questions set
  choices = $q$["Automated scanning provides broad, frequent coverage of known issues, while manual testing finds business-logic flaws and chains of exploitation automated tools typically miss","Manual testing validates only the network layer, while scanners cover the application layer","Scanners discover unknown zero-day flaws, while manual testers can only confirm known CVEs","Combining the two mainly reduces the licensing cost of running either alone"]$q$::jsonb,
  explanation = $q$Scanners excel at repeatable, signature-driven coverage of known weaknesses, while skilled humans find logic flaws and multi-step attack chains no signature describes. The distractors invert the capabilities: manual testers work at any layer and are precisely who uncovers novel (zero-day-like) issues, scanners are limited to patterns they already know, and the rationale for combining them is coverage, not cost.$q$
where id = 'ci-q-129';

-- ci-q-135 [W2]: distractors ("Deploying every patch directly to production immediately", "Skipping patch management entirely", "Only patching systems that have already been compromised") were absurd; replaced with plausible patch-management mistakes; explanation updated to refute each.
update public.questions set
  choices = $q$["Testing patches in a representative environment before production deployment, even under time pressure","Applying compensating controls instead of deploying the vendor patch at all","Holding the fix for the next scheduled monthly maintenance window","Deploying to production first, since lab environments rarely match production exactly"]$q$::jsonb,
  explanation = $q$Emergency fixes still follow an accelerated change process with validation, because an untested patch can itself cause an outage - trading one incident for another. Compensating controls (e.g., disabling the vulnerable service) are a stopgap while testing proceeds, not a substitute for patching; an actively exploited zero-day cannot wait for a routine window; and the team's mirrored lab exists precisely to be representative, which is cheaper than discovering breakage in production.$q$
where id = 'ci-q-135';

-- ci-q-143 [W2]: distractors ("Waterfall development, which forbids any automated testing", "Zero trust networking") were junk/off-category; replaced with plausible SDLC-security siblings; explanation updated to refute each.
update public.questions set
  choices = $q$["Shift-left security - moving security testing earlier in the SDLC, where defects are cheapest to fix","Shift-right security - relying on production monitoring and chaos testing to surface vulnerabilities","Defense in depth - layering multiple scanning tools at the release gate","Separation of duties - isolating security review from the development team"]$q$::jsonb,
  explanation = $q$Flagging vulnerabilities at every commit moves detection to the earliest, cheapest point in the lifecycle - the definition of shift-left. Shift-right refers to production-side testing and monitoring (the opposite end of the pipeline); defense in depth describes layered controls, not the timing of testing; and this practice integrates security into the developer workflow rather than separating it out.$q$
where id = 'ci-q-143';

-- ci-q-144 [W2]: distractors ("legally binding international law", "replaces the need for any code review", "only applies to mobile") were junk; replaced with plausible AppSec-resource confusions; explanation updated to refute each.
update public.questions set
  choices = $q$["It provides a standardized, widely recognized awareness baseline of the most critical and common web application security risks","It is a certification engineers must earn before committing production code","It is a complete secure-coding standard whose adoption guarantees application security","It enumerates every known web vulnerability, replacing the need to track CVEs"]$q$::jsonb,
  explanation = $q$The OWASP Top 10 is an awareness and prioritization document, not a certification or a legal mandate. It is deliberately not exhaustive - OWASP's ASVS is the fuller verification standard - and it lists broad risk categories (e.g., injection, broken access control) rather than individual vulnerabilities, so it complements rather than replaces CVE tracking, code review, and testing.$q$
where id = 'ci-q-144';

-- ci-q-148 [W2]: distractors ("Peer review only checks code style, never security issues", "Hardcoded API keys are always safe to commit", "only applies to open-source") were absurd; replaced with plausible repo-security misconceptions; explanation updated to refute each.
update public.questions set
  choices = $q$["Code review and secrets scanning practices prevent sensitive credentials from being committed into shared source control","Branch protection encrypts any committed secrets, so a merged key would be harmless","Version-control systems automatically expire committed API keys after a set period","The control only matters pre-release, since private repository history cannot leak"]$q$::jsonb,
  explanation = $q$Once merged, a secret persists in version history even after later deletion, so blocking it pre-merge - mandatory review plus automated secrets scanning - is the effective control. Branch protection gates merging but encrypts nothing; repositories never expire or rotate committed credentials (the cloud provider key stays valid until revoked); and private repo history leaks routinely via cloned copies, compromised accounts, and accidental publication.$q$
where id = 'ci-q-148';
