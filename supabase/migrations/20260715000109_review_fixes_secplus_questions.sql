-- Review fixes: Security+ (SY0-701) questions rows only (flashcards handled separately).
-- Scope: seed files 20260709000009..14 and question INSERTs in 20260714000001..05.
-- All answer keys were verified by counting into choices arrays; no E1/E2/E3 found.
-- Fixes below are E6 duplicates (expansion items re-testing seed facts) and W1/W2 strengthening.

-- q1-054 [E6]: duplicate of q3-023 (partially hidden card number "4821" on a support screen -> masking); q3-023 kept
delete from public.questions where id = 'q1-054';

-- q2-066 [E6]: duplicate of q2-009 (compromising an industry site the target's staff frequent -> watering hole); q2-009 kept (stronger distractor refutation)
delete from public.questions where id = 'q2-066';

-- q2-071 [E6]: duplicate of q2-014 (permission check then symlink swap to /etc/shadow -> TOCTOU race); q2-014 kept
delete from public.questions where id = 'q2-071';

-- q2-072 [E6]: duplicate of q2-016 (publicly readable cloud storage bucket -> cloud misconfiguration); q2-016 kept
delete from public.questions where id = 'q2-072';

-- q2-079 [E6]: duplicate of q2-031 (breached username/password pairs replayed against another service -> credential stuffing); q2-031 kept
delete from public.questions where id = 'q2-079';

-- q2-081 [E6]: duplicate of q2-038 (high-volume unique long subdomains of one external domain -> DNS tunneling); q2-038 kept (same-category distractors vs q2-081's "misconfigured printer")
delete from public.questions where id = 'q2-081';

-- q3-052 [E6]: duplicate of q3-005 (containers share the host kernel, so one kernel exploit threatens all co-located containers); q3-005 kept
delete from public.questions where id = 'q3-052';

-- q3-073 [E6]: duplicate of q3-032 (full interruption/failover test = most realistic validation, highest operational risk); q3-032 kept - q3-073's stem gave the answer away ("because production is actually stopped")
delete from public.questions where id = 'q3-073';

-- q4-071 [E6]: duplicate of q2-055 (deauth flood forcing clients onto an identical-SSID evil twin); q2-055 kept, and q4-072 still covers the 802.11w/PMF defense angle in domain 4
delete from public.questions where id = 'q4-071';

-- q4-075 [E6]: duplicate of q4-005 (per-user, individually revocable Wi-Fi credentials -> WPA Enterprise with 802.1X/RADIUS); q4-005 kept (scenario-based, stronger distractors)
delete from public.questions where id = 'q4-075';

-- q4-076 [E6]: duplicate of q4-007 (critical flaw on an un-inventoried, ownerless device -> asset management failure); q4-007 kept, q4-077 keeps the CMDB-specific angle
delete from public.questions where id = 'q4-076';

-- q5-082 [E6]: duplicate of q5-032 (document defining pen-test scope, permitted techniques, and timing -> rules of engagement); q5-032 kept
delete from public.questions where id = 'q5-082';

-- q3-079 [W2]: distractors (RAID 5, full-disk encryption, port security) were not plausible siblings for a provider-outage resilience item; replaced with same-category options including the tempting multi-AZ-same-region trap
update public.questions set
  choices = $q$["Deploying across multiple availability zones within the same region","Multi-region or multi-cloud deployment","RAID 6 storage within the primary data center","An on-premises UPS and standby generator"]$q$::jsonb,
  explanation = $q$Only spreading workloads across regions (or a second provider) survives a region-wide or platform-wide outage. Multiple availability zones still sit inside the same region and can fail together in a regional event - the most tempting wrong answer. RAID and UPS/generator redundancy protect single-site hardware and power, not against a cloud provider's regional failure.$q$
where id = 'q3-079';

-- q4-077 [W2]: distractors (marketing materials, payroll, company website) were throwaways; replaced with plausible IR-adjacent functions a CMDB does not provide
update public.questions set
  choices = $q$["Aggregating and correlating security event logs from all sources","Providing accurate asset relationships and ownership so responders can quickly scope what's affected and who to contact","Storing incident response playbooks and runbooks","Recording the chain of custody for collected evidence"]$q$::jsonb,
  explanation = $q$A CMDB's asset relationships and ownership data let responders rapidly determine blast radius and the right contacts during an incident. Log aggregation and correlation are the SIEM's job; playbooks live in IR documentation or SOAR tooling; chain-of-custody records are forensic documentation - none of these are what a CMDB stores.$q$
where id = 'q4-077';

-- q1-035 [W1]: SQL-doubled apostrophe stored literally inside dollar quotes ("company''s"); corrected text
update public.questions set
  stem = $q$A company's public status page falsely shows "All systems operational" during a real outage because the monitoring feed was tampered with. Which CIA element was violated by the tampering itself, separate from the outage?$q$
where id = 'q1-035';

-- q1-036 [W1]: SQL-doubled apostrophe stored literally inside dollar quotes ("employee''s"); corrected text
update public.questions set
  stem = $q$An employee's laptop is fully patched, off the corporate network, and connecting via VPN from home. Under Zero Trust, should it receive more trust because it is a known corporate asset?$q$
where id = 'q1-036';

-- q1-044 [W1]: SQL-doubled apostrophe stored literally inside dollar quotes ("employee''s"); corrected text
update public.questions set
  stem = $q$A law firm needs the ability to recover an employee's encrypted files if that employee becomes unreachable, without weakening the encryption used day to day. Which capability supports this?$q$
where id = 'q1-044';

-- q1-047 [W1]: two SQL-doubled apostrophes stored literally inside dollar quotes ("server''s", "year''s"); corrected text
update public.questions set
  stem = $q$Which property ensures that even if a server's long-term private key is stolen next year, an attacker cannot decrypt THIS year's already-recorded TLS sessions?$q$
where id = 'q1-047';

-- q1-050 [W1]: SQL-doubled apostrophe stored literally inside dollar-quoted choices ("sender''s"); corrected text, order unchanged
update public.questions set
  choices = $q$["Receiver decrypts the signature with the sender's public key to recover the original hash","Receiver independently hashes the received message","Receiver compares the two hash values","If the hashes match, the message is verified as authentic and unaltered"]$q$::jsonb
where id = 'q1-050';

-- q1-051 [W1]: SQL-doubled apostrophe stored literally inside dollar quotes ("bank''s"); corrected text
update public.questions set
  stem = $q$A mobile banking app must verify it is talking to the real bank server even if a compromised CA issues a fraudulent certificate for the bank's domain. What should the app implement?$q$
where id = 'q1-051';

-- q1-052 [W1]: SQL-doubled apostrophe stored literally inside dollar quotes ("website''s"); corrected text
update public.questions set
  stem = $q$A browser trusts a website's certificate because it was signed by an intermediate CA, which was itself signed by a root CA already trusted by the operating system. What is this called?$q$
where id = 'q1-052';

-- q1-055 [W1]: SQL-doubled apostrophe stored literally inside dollar-quoted choices ("won''t"); corrected text, order unchanged
update public.questions set
  choices = $q$["It cannot encrypt traffic at all","Browsers won't trust it by default since no recognized CA vouches for its identity, triggering warnings that erode customer confidence","Self-signed certificates expire immediately","It requires OCSP stapling to function"]$q$::jsonb
where id = 'q1-055';

-- q2-056 [W1]: SQL-doubled apostrophe stored literally inside dollar quotes ("didn''t"); corrected text
update public.questions set
  stem = $q$An employee accidentally emails a spreadsheet containing customer SSNs to the wrong recipient because they didn't double-check the auto-complete address. What type of insider threat is this?$q$
where id = 'q2-056';

-- q2-063 [W1]: SQL-doubled apostrophe stored literally inside dollar quotes ("company''s"); corrected text
update public.questions set
  stem = $q$An attacker calls pretending to be a company's CFO, using an invented story to convince an employee to skip verification and process a wire transfer. Which persuasion principle is being exploited, and what is the invented story called?$q$
where id = 'q2-063';

-- q3-047 [W1]: SQL-doubled apostrophe stored literally inside dollar quotes ("tenant''s"); corrected text
update public.questions set
  stem = $q$A cloud customer worries that a vulnerability in the hypervisor could let another tenant's workload interfere with theirs. What is this concern called?$q$
where id = 'q3-047';

-- q4-085 [W1]: stem contained the answer verbatim ("storage costs and breach-impact surface both grow...what must they balance?") and distractors were nonsense pairs; rewritten to test the same retention trade-off without the giveaway
update public.questions set
  stem = $q$A compliance team proposes retaining ALL security logs for seven years "to be safe," well beyond what any regulation requires. Beyond storage cost, what security concern should the architect raise?$q$,
  choices = $q$["The log archive itself becomes a growing privacy and breach-impact liability, so retention should match actual requirements","Logs older than 90 days lose all forensic value anyway","Long retention progressively weakens the encryption applied to the logs","Auditors reject any retention period longer than one year"]$q$::jsonb,
  answer = '0'::jsonb,
  explanation = $q$Logs are full of sensitive data (account names, IPs, URLs, sometimes payload fragments); the longer and larger the archive, the bigger the privacy exposure and breach-impact surface if that store is ever compromised or swept into legal discovery - so retention should be driven by real requirements, not "keep everything forever." Old logs retain genuine forensic value (slow-burn intrusions are exactly why retention helps), encryption strength is independent of retention length, and auditors enforce retention minimums, not one-year maximums.$q$
where id = 'q4-085';
