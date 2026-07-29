-- Network+ (N10-009) Domain 4 (Network Security) expansion.
-- Adds questions n-q-600..n-q-649 (50) and flashcards n-f-600..n-f-660 (61),
-- topping up objectives 4.1-4.4 to 33 items each.
--   4.1 Logical security concepts .............. 13 q + 15 f
--   4.2 Physical security ...................... 12 q + 15 f
--   4.3 Common attack types .................... 10 q + 13 f
--   4.4 Network security features, defense
--       techniques and solutions ............... 15 q + 18 f  (previously empty)
-- Objective 4.4 had no content at all and so could never be drawn by a quiz or
-- exam form; it is built out here around device hardening, NAC/802.1X, port
-- security, key management, security rules (ACL/URL/content filtering), zones
-- and the IDS/IPS-versus-firewall distinction, with scenarios deliberately tied
-- back to the attacks covered in 4.3.

insert into questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ===================================================================
-- 4.1  Logical security concepts
-- ===================================================================
('n-q-600','netplus',4,'4.1','mcq',1,
 $q$An auditor asks the network team to produce evidence showing which administrator changed the edge firewall rule set last Tuesday and at what time. Which component of the AAA framework produces that evidence?$q$,
 $q$["Authentication","Authorization","Accounting","Availability"]$q$::jsonb,'2'::jsonb,
 $q$Accounting is the record-keeping leg of AAA: it logs session start/stop, commands issued and resources touched, which is exactly what an auditor needs. Authentication is the tempting pick because it is the part of AAA that deals with identity, but it only proves who someone is at the moment of login - it produces no ongoing record of what that identity subsequently did. Availability is a CIA element, not part of AAA.$q$),

('n-q-601','netplus',4,'4.1','mcq',2,
 $q$A user signs in successfully with their password and hardware token - no error, no lockout - but when they open the finance department file share they immediately receive "access denied". Which AAA function rejected the request?$q$,
 $q$["Authentication failed because the token was out of sync","Authorization denied the request because the identity lacks rights to that resource","Accounting stopped recording the session","Identification failed because the username was not found"]$q$::jsonb,'1'::jsonb,
 $q$Authentication clearly succeeded - the sign-in completed. Authorization is the separate decision about what a proven identity is permitted to reach, and that is what refused the share. Choosing authentication is the classic error: people treat "access denied" as a login problem, but a failed authentication would have stopped the user at the sign-in prompt, not at the share.$q$),

('n-q-602','netplus',4,'4.1','mcq',2,
 $q$Which of the following pairs genuinely satisfies multifactor authentication?$q$,
 $q$["A password and a security question","A smart card and a fingerprint","A PIN and a network password","A username and a password"]$q$::jsonb,'1'::jsonb,
 $q$MFA requires factors from two different categories. A smart card is something you have and a fingerprint is something you are - two categories, so it qualifies. A PIN plus a password looks like two credentials and is the most tempting distractor, but both are something you know, so a single shoulder-surf or phishing page can harvest both; that is two-step, not multifactor. A username is an identifier, not a factor at all.$q$),

('n-q-603','netplus',4,'4.1','multi',2,
 $q$Select the TWO items that belong to the "something you have" authentication factor category.$q$,
 $q$["A hardware TOTP token fob","A retina scan","The master password for a password manager","A push-approval prompt on an enrolled smartphone","A memorized passphrase"]$q$::jsonb,'[0,3]'::jsonb,
 $q$A hardware token fob and an enrolled smartphone are physical possessions the user must hold, so both are "something you have". A retina scan is "something you are". The password manager master password is tempting because the manager holds the tokens, but the master password itself is still knowledge - possession of the phone is the factor, not the secret used to unlock it. A memorized passphrase is knowledge.$q$),

('n-q-604','netplus',4,'4.1','mcq',2,
 $q$A helpdesk technician needs only to reset user passwords and unlock accounts, but their account is a member of Domain Admins because that was the quickest way to make the reset tool work. Which security principle is being violated?$q$,
 $q$["Least privilege","Separation of duties","Defense in depth","Implicit deny"]$q$::jsonb,'0'::jsonb,
 $q$Least privilege says an account gets only the rights its job requires; granting domain-wide administrative rights for a password-reset task is a textbook violation, and it means one phished helpdesk account owns the directory. Separation of duties is the tempting alternative, but it addresses a different problem - splitting one sensitive process across two people so no single person can complete it alone. Here the task is legitimately one person's; the rights attached to it are simply too broad.$q$),

('n-q-605','netplus',4,'4.1','mcq',3,
 $q$Which statement best captures the operating rule of a zero trust architecture?$q$,
 $q$["Devices that have passed the perimeter firewall are treated as trusted for the rest of the session","Every request is authenticated and authorized on its own merits, regardless of where it originates","Encrypting all data at rest removes the need for per-resource access decisions","Trust is assigned according to the source IP subnet the request came from"]$q$::jsonb,'1'::jsonb,
 $q$Zero trust removes implicit trust based on network location: identity, device posture and policy are evaluated per request, whether the request comes from a desk in headquarters or a hotel Wi-Fi. Options that grant trust after the perimeter or by source subnet describe the traditional castle-and-moat model that zero trust was created to replace - subnet-based trust is the most tempting distractor because segmentation is genuinely part of a zero trust design, but segmentation is used to enforce policy, not to confer trust.$q$),

('n-q-606','netplus',4,'4.1','mcq',2,
 $q$An organization of 400 staff assigns share and application permissions individually to each user. Over time, staff who change jobs accumulate rights they no longer need. Which access control model best resolves this?$q$,
 $q$["Role-based access control","Mandatory access control","Discretionary access control","Rule-based access control"]$q$::jsonb,'0'::jsonb,
 $q$RBAC attaches permissions to job roles rather than to individuals; moving someone between departments swaps their role and the old rights disappear, which is precisely the permission-drift problem described. Discretionary access control is the tempting distractor because it is the model most organizations drift into by default - resource owners granting access ad hoc - but that is the cause of the drift, not the cure. Mandatory access control uses system-enforced classification labels and is far too rigid for ordinary file shares.$q$),

('n-q-607','netplus',4,'4.1','mcq',3,
 $q$In one government system, files carry classification labels, users carry clearances, and the operating system - not the file owner - decides access. A user who creates a file cannot grant another user access to it. Which access control model is in use?$q$,
 $q$["Discretionary access control","Mandatory access control","Role-based access control","Rule-based access control"]$q$::jsonb,'1'::jsonb,
 $q$The defining trait of mandatory access control is that the system enforces label-versus-clearance comparisons and the owner has no discretion. Discretionary access control is the direct opposite - the owner grants access - which is why it is the tempting inverse. RBAC would still let an administrator grant a role; rule-based control makes decisions from conditions such as time of day or source address.$q$),

('n-q-608','netplus',4,'4.1','mcq',1,
 $q$A hospital deploys dual internet circuits from different carriers, an active/passive firewall pair and generator-backed power for the network core. Which element of the CIA triad are these controls chiefly protecting?$q$,
 $q$["Confidentiality","Integrity","Availability","Accountability"]$q$::jsonb,'2'::jsonb,
 $q$Redundant circuits, a high-availability device pair and backup power all exist to keep systems reachable through a component or utility failure - that is availability. Integrity is the tempting near-miss because redundancy is often loosely described as "protecting the data", but integrity concerns whether data has been altered, which is addressed by hashing and digital signatures rather than by spare hardware. Accountability is not part of the triad.$q$),

('n-q-609','netplus',4,'4.1','multi',2,
 $q$An organization deploys single sign-on across its cloud applications. Select the TWO accurate statements about the result.$q$,
 $q$["Users authenticate once and reach multiple federated services without re-entering credentials","SSO removes the need for multifactor authentication","Compromise of the single credential can expose every federated service at once","SSO encrypts application traffic end to end","SSO is a form of accounting rather than authentication"]$q$::jsonb,'[0,2]'::jsonb,
 $q$SSO federates one authentication event to many services, which is its benefit, and concentrating access into one credential is its corresponding risk - which is exactly why SSO should be paired with MFA and short session lifetimes. The claim that SSO removes the need for MFA is the most tempting distractor and is the reverse of the truth: consolidating access raises the value of the single credential. SSO is an authentication scheme and says nothing about transport encryption.$q$),

('n-q-610','netplus',4,'4.1','multi',3,
 $q$Select the TWO measures that directly implement the principle of least privilege.$q$,
 $q$["Granting the backup service account read-only access to the file shares it copies","Requiring a second administrator to approve every firewall change before it is applied","Removing local administrator rights from standard user workstations","Placing public web servers in a screened subnet","Enabling full-disk encryption on laptops"]$q$::jsonb,'[0,2]'::jsonb,
 $q$Both correct options shrink the rights held by an account to the minimum its function requires. Requiring a second approver is the strongest distractor - it is a genuine security control, but it is separation of duties: it splits a process across two people rather than reducing anyone's privileges. A screened subnet is network segmentation and full-disk encryption protects data at rest; neither changes what an account is permitted to do.$q$),

('n-q-611','netplus',4,'4.1','mcq',3,
 $q$A change management process must be able to prove that a specific engineer approved a configuration change, in a way the engineer cannot later credibly deny. Which control provides this?$q$,
 $q$["Encrypting the change record with a symmetric key shared by the change board","A digital signature applied with the engineer's private key","Storing a SHA-256 hash of the change record","Recording the change under a shared departmental service account"]$q$::jsonb,'1'::jsonb,
 $q$Non-repudiation requires binding an action to one identity in a way only that identity could have produced - a signature made with a private key that only the engineer holds. Hashing is the tempting answer because it is the usual integrity control, but a hash proves only that the record has not changed; anyone can compute it, so it identifies no one. A shared symmetric key or shared service account is worse still: any holder could have produced the record, which destroys attribution.$q$),

('n-q-612','netplus',4,'4.1','matching',3,
 $q$Match each security concept on the left to the statement that defines it.$q$,
 $q${"left":["Authentication","Authorization","Accounting","Least privilege"],"right":["Grants an account only the minimum rights its job requires","Records what an identity did, and when, for later review","Proves that a subject is who it claims to be","Decides which resources a proven identity may use"]}$q$::jsonb,
 '[2,3,1,0]'::jsonb,
 $q$Authentication proves identity (right index 2); authorization decides what that proven identity may reach (3); accounting records what was actually done (1); least privilege constrains how much any identity is entitled to in the first place (0). The pairing people most often invert is authentication and authorization - remember that authentication happens once at the door, while authorization is consulted every time a resource is requested.$q$),

-- ===================================================================
-- 4.2  Physical security
-- ===================================================================
('n-q-613','netplus',4,'4.2','mcq',1,
 $q$Employees badge in one at a time at the main entrance, but contractors and delivery staff routinely walk in behind them before the door closes. Which control most directly stops this?$q$,
 $q$["An access control vestibule (mantrap) at the entrance","A CCTV camera aimed at the entrance","A visitor sign-in sheet at the reception desk","A cipher lock on the entrance door"]$q$::jsonb,'0'::jsonb,
 $q$An access control vestibule uses two interlocking doors - the inner door will not open until the outer one has closed - so only an authenticated person can proceed and tailgating is physically prevented. A camera is the tempting choice, but it is detective: it records the tailgater for later review without stopping the entry. A cipher lock still opens once, and anyone standing behind the authorized person walks through with them.$q$),

('n-q-614','netplus',4,'4.2','mcq',2,
 $q$Which of these physical controls is detective rather than preventive?$q$,
 $q$["A badge reader on the data centre door","Continuously recording video surveillance","A locking equipment cabinet","An access control vestibule"]$q$::jsonb,'1'::jsonb,
 $q$Recording surveillance does not stop anyone from entering; it produces evidence after the fact, which makes it detective (and, when visible, deterrent). The badge reader, locking cabinet and vestibule all physically block unauthorized access, so they are preventive. Candidates commonly label cameras as preventive because a visible camera discourages intruders - that effect is deterrence, and it is not the same as preventing entry.$q$),

('n-q-615','netplus',4,'4.2','mcq',2,
 $q$A batch of decommissioned SSDs held regulated customer data. The drives will not be reused or resold. Which disposal method gives the strongest assurance the data cannot be recovered?$q$,
 $q$["A single-pass overwrite of every addressable sector","A quick format followed by donation to a school","Physical destruction (shredding or disintegration) with a certificate of destruction","Deleting the partitions and rebuilding the partition table"]$q$::jsonb,'2'::jsonb,
 $q$When the media will not be reused, physical destruction is definitive and the certificate of destruction supplies the audit evidence regulators expect. The overwrite is the tempting answer because sector overwriting is a legitimate sanitization technique on magnetic disks, but SSD wear levelling and over-provisioning mean the controller may write to different physical cells, leaving copies of the old data in retired blocks the overwrite never reaches. Formatting and repartitioning only touch file system metadata.$q$),

('n-q-616','netplus',4,'4.2','mcq',2,
 $q$Which media sanitization method works on traditional magnetic hard drives but has no effect whatsoever on solid-state drives?$q$,
 $q$["Degaussing","Cryptographic erase","Shredding","Overwriting with random data"]$q$::jsonb,'0'::jsonb,
 $q$Degaussing destroys data by scrambling magnetic domains on platters or tape; SSDs store charge in NAND flash cells, which a magnetic field does not disturb, so a degaussed SSD keeps its data. Overwriting is the tempting distractor because it is unreliable on SSDs, but unreliable is not the same as useless - it does write to flash. Shredding and cryptographic erase both work on solid-state media.$q$),

('n-q-617','netplus',4,'4.2','mcq',3,
 $q$A self-encrypting drive is being moved from the finance department to a lab workstation. The existing data must be unrecoverable, but the drive must remain usable. Which method is both fastest and defensible?$q$,
 $q$["Degauss the drive before reissuing it","Cryptographic erase - destroy the drive's internal media encryption key","Delete all files and empty the recycle bin","Send the drive for physical shredding"]$q$::jsonb,'1'::jsonb,
 $q$A self-encrypting drive stores everything as ciphertext; destroying the media encryption key renders all of it unrecoverable in seconds while leaving the drive fully functional for reuse. Shredding is the tempting answer because it is the most thorough option, but it fails the stated requirement that the drive stay usable. Degaussing would destroy the drive electronics without reliably erasing flash, and deleting files removes only directory entries.$q$),

('n-q-618','netplus',4,'4.2','mcq',1,
 $q$Staff need to open the data centre door themselves, and management must be able to say exactly which person entered and at what time. Which access control hardware meets both requirements?$q$,
 $q$["A keyed cylinder lock with a copy issued to each staff member","A proximity badge reader tied to a logged access control system","A cipher lock using one shared numeric code","A padlock and hasp with the key held at reception"]$q$::jsonb,'1'::jsonb,
 $q$A badge reader authenticates an individual credential and writes an entry record with identity and timestamp, and a lost badge can be revoked without affecting anyone else. The cipher lock is the tempting choice because it also opens without a physical key, but a single shared code yields no per-person attribution, cannot be revoked for one leaver, and survives indefinitely once shoulder-surfed. Metal keys give no log at all and are easily duplicated.$q$),

('n-q-619','netplus',4,'4.2','mcq',2,
 $q$The server room already has a badge reader that logs every entry. What does adding a camera covering that door primarily provide?$q$,
 $q$["It prevents entry by anyone whose badge is not enrolled","It verifies that the person who entered is the badge holder, exposing shared or stolen badges","It removes the need for door lighting","It secures the access control database against tampering"]$q$::jsonb,'1'::jsonb,
 $q$A badge log records which credential was used, not which human used it; video ties the credential to a face, which is how badge sharing, lending and use of a stolen badge are caught. The prevention option is the tempting one, but cameras stop nobody - the badge reader is the preventive control here, and the camera is the detective layer that validates it.$q$),

('n-q-620','netplus',4,'4.2','mcq',3,
 $q$Your equipment sits in a shared colocation suite alongside several other tenants who all hold access to the same floor. What most directly prevents another tenant from reaching your switch console ports?$q$,
 $q$["Locking equipment racks and cabinets","A stronger lock on the building's main entrance","Port security configured on the switches","A camera covering the aisle"]$q$::jsonb,'0'::jsonb,
 $q$Once someone is already inside the shared space, only an enclosure-level control keeps them away from your hardware; a locked cabinet blocks console access, USB ports and drive removal. Port security is the tempting technical answer, but it governs which MAC addresses may pass on a network port - it does nothing against someone with a console cable, a screwdriver and physical access. Building entry controls and cameras do not restrict tenants who legitimately hold floor access.$q$),

('n-q-621','netplus',4,'4.2','mcq',2,
 $q$Couriers deliver replacement optics after hours, when the stockroom is unstaffed. Management needs the parts secured on arrival and needs a record of who later collected them. Which control fits?$q$,
 $q$["A smart locker that logs the badge or code used to open each compartment","An unmonitored drop box beside the loading dock","A camera aimed at the loading dock","A paper visitor sign-in sheet at reception"]$q$::jsonb,'0'::jsonb,
 $q$Smart lockers hold items in individually secured compartments and record which credential opened which door and when, giving both custody and attribution with no staff present. The camera is the tempting alternative because it records the collection, but footage does not secure the parts and identifying a person from video is far weaker evidence than a credential log. A drop box secures nothing and a sign-in sheet is self-reported.$q$),

('n-q-622','netplus',4,'4.2','ordering',3,
 $q$Place the steps of a compliant hardware decommissioning process in the correct order, from first to last.$q$,
 $q$["Sanitize or destroy the storage media according to the data classification","Record the disposal in the asset register and file the certificate of destruction","Identify the asset and classify the data it holds","Remove the device from the network and revoke its accounts and certificates"]$q$::jsonb,
 '[2,3,0,1]'::jsonb,
 $q$Classification comes first because it determines everything after it - whether clearing suffices or destruction is mandatory. Next, disconnect the device and revoke its credentials and certificates so a machine sitting on a disposal pallet cannot still authenticate to the network. Only then sanitize or destroy the media, and finally close the loop in the asset register with the certificate of destruction. Sanitizing before revoking credentials is the common ordering error: the account and certificate would survive the drive.$q$),

('n-q-623','netplus',4,'4.2','multi',2,
 $q$Select the TWO controls that prevent unauthorized physical entry rather than merely recording it.$q$,
 $q$["Video surveillance with 30-day retention","An access control vestibule","A motion sensor that raises an alarm and writes a log entry","A biometric palm-vein reader on the data centre door","An RFID asset tag attached to each server"]$q$::jsonb,'[1,3]'::jsonb,
 $q$The vestibule physically restricts passage to one authenticated person, and the palm-vein reader refuses to release the lock without a valid biometric - both stop entry. Surveillance and motion sensors are detective: they observe and alert, but the door still opens. Asset tags support inventory and recovery, not entry control. Motion sensors are the most tempting wrong pick because an audible alarm feels preventive, yet the intruder is already inside when it sounds.$q$),

('n-q-624','netplus',4,'4.2','multi',3,
 $q$Select the TWO statements that are accurate about media sanitization.$q$,
 $q$["A quick format removes the data itself from the drive platters","Purging methods such as cryptographic erase or degaussing make recovery infeasible even with laboratory techniques","Destruction is the appropriate choice when media held regulated data and will not be reused","Emptying the recycle bin overwrites the sectors the files occupied","Deleting the partition table erases the contents of the partitions"]$q$::jsonb,'[1,2]'::jsonb,
 $q$Purging is defined by resistance to laboratory-grade recovery, and destruction is the right answer when reuse is not planned and the data was regulated. A quick format is the strongest distractor because it visibly empties the drive, but it only rewrites file system metadata - the file data remains until it is overwritten, and ordinary recovery tools retrieve it. Emptying the recycle bin and removing the partition table likewise change pointers, not contents.$q$),

-- ===================================================================
-- 4.3  Common attack types
-- ===================================================================
('n-q-625','netplus',4,'4.3','mcq',3,
 $q$Users on one VLAN report that their sessions are being intercepted. Name resolution is returning the correct addresses, but "arp -a" on several hosts shows the default gateway's IP address bound to a MAC address that does not belong to the router. Hosts on other VLANs are unaffected. What is occurring?$q$,
 $q$["DNS poisoning","ARP poisoning","VLAN hopping","A rogue access point"]$q$::jsonb,'1'::jsonb,
 $q$Forged ARP replies rebind the gateway's IP to the attacker's MAC so traffic bound for the router is delivered to the attacker instead - and because ARP is link-local, the damage is confined to a single broadcast domain, matching the "one VLAN only" symptom. DNS poisoning is the tempting alternative, but it corrupts name-to-IP resolution; here resolution is correct and only the IP-to-MAC binding is wrong. VLAN hopping moves an attacker between VLANs rather than rewriting ARP caches.$q$),

('n-q-626','netplus',4,'4.3','mcq',3,
 $q$Users at three separate sites report that intranet.example.com now resolves to an unfamiliar public address. The page looks authentic but the browser flags an untrusted certificate. ARP caches on the affected LANs are clean and correct. What is the most likely attack?$q$,
 $q$["ARP poisoning","DNS poisoning","MAC flooding","An evil twin access point"]$q$::jsonb,'1'::jsonb,
 $q$A hostname resolving to an attacker-controlled address across multiple sites, with clean ARP caches, points to corrupted resolver cache or record data - DNS poisoning - and the certificate warning is the giveaway that the impersonator cannot present a valid certificate for the real name. ARP poisoning is the tempting choice because both attacks produce interception, but ARP poisoning cannot cross a routed boundary and would show a wrong gateway MAC. MAC flooding causes traffic flooding on a switch, not wrong DNS answers.$q$),

('n-q-627','netplus',4,'4.3','mcq',3,
 $q$A switch suddenly begins forwarding unicast frames out every port in a VLAN, and a laptop running a packet capture starts seeing conversations between other hosts. The CAM table shows thousands of distinct source MAC addresses learned on a single access port. Which attack is this?$q$,
 $q$["ARP poisoning","MAC flooding (CAM table overflow)","VLAN hopping via double tagging","A broadcast storm caused by a switching loop"]$q$::jsonb,'1'::jsonb,
 $q$Filling the CAM table with bogus source MACs leaves no room to learn legitimate entries, so the switch fails open and floods unknown unicast out every port - which is exactly what turns an ordinary port into a sniffing position. A switching loop is the tempting distractor because it also produces flooding, but a loop floods broadcasts, causes MAC addresses to flap between ports and drives interface utilization to saturation; thousands of unique MACs on one port is the specific signature of a CAM overflow.$q$),

('n-q-628','netplus',4,'4.3','mcq',2,
 $q$An employee plugs a personal wireless router into an office wall jack so their phone gets better signal. Separately, an attacker in the car park broadcasts an access point advertising the company's SSID to capture credentials. What are these two things, respectively?$q$,
 $q$["Both are evil twins","A rogue access point and an evil twin","An evil twin and a rogue access point","Both are simply rogue access points"]$q$::jsonb,'1'::jsonb,
 $q$A rogue AP is any unauthorized access point attached to the network - frequently well-intentioned employee equipment, dangerous because it bypasses the wireless security policy. An evil twin is deliberately configured to impersonate a legitimate SSID and lure clients. Calling both rogue APs is the tempting simplification, and it is not entirely wrong in the loose sense, but the exam distinguishes them by intent and impersonation: the car park AP is masquerading, which the employee's router is not.$q$),

('n-q-629','netplus',4,'4.3','mcq',2,
 $q$An attacker sends small DNS queries with the victim's address forged as the source to thousands of open resolvers on the internet. Each resolver replies to the victim with a response many times larger than the query. What is this attack called?$q$,
 $q$["A SYN flood","A reflective, amplified DDoS attack","An on-path attack","A logic bomb"]$q$::jsonb,'1'::jsonb,
 $q$It is reflective because the traffic arrives from innocent third-party resolvers rather than the attacker, and amplified because each small query generates a much larger response, multiplying the volume delivered to the victim. A SYN flood is the tempting distractor since it is the other classic flooding attack, but a SYN flood exhausts a server's connection table with half-open TCP sessions and does not use reflectors or amplification. An on-path attack intercepts traffic rather than drowning it.$q$),

('n-q-630','netplus',4,'4.3','mcq',2,
 $q$A caller identifying themselves as an engineer from the ISP tells the receptionist there is an outage and asks her to read out the admin password from the label on the office router. Which attack is this, and what is the best countermeasure?$q$,
 $q$["Phishing; deploy an email attachment sandbox","Vishing; security awareness training plus a policy of calling back on a published number","Tailgating; install an access control vestibule","Shoulder surfing; fit privacy screens to monitors"]$q$::jsonb,'1'::jsonb,
 $q$Voice-based social engineering is vishing, and because the attack exploits a person rather than a system, the defenses are procedural: train staff that credentials are never given out by phone, and require verification by calling back a number the organization already holds. Phishing is the tempting answer because it is the umbrella term most people reach for, but phishing is delivered by email and an attachment sandbox would never have seen this call.$q$),

('n-q-631','netplus',4,'4.3','multi',2,
 $q$A user suspects their traffic is being intercepted. Select the TWO observations that point to an on-path attack rather than an ordinary outage.$q$,
 $q$["Certificate warnings appearing on sites that previously loaded cleanly","Complete loss of connectivity to every destination","The default gateway's MAC address changing with no hardware replacement","Higher-than-usual CPU utilization on the core switch","A DHCP lease renewing normally at the scheduled time"]$q$::jsonb,'[0,2]'::jsonb,
 $q$An interceptor must terminate TLS to read the traffic, so it presents a certificate the client does not trust - hence warnings on sites that previously worked. A gateway MAC that changes without a hardware swap is the second tell: traffic is being steered to a new next hop. Total loss of connectivity is the tempting pick because it feels like an attack, but an on-path attacker needs the traffic to keep flowing and works hard to stay invisible. High switch CPU and normal DHCP renewals have many benign causes.$q$),

('n-q-632','netplus',4,'4.3','multi',3,
 $q$Select the THREE statements that correctly describe password attacks and their defenses.$q$,
 $q$["A brute-force attack is defeated by salting the stored password hashes","A dictionary attack tries a curated list of likely words and is defeated by long, uncommon passphrases","Password spraying tries one or two very common passwords across many accounts specifically to avoid triggering per-account lockout","Rainbow table attacks are defeated by adding a unique random salt to each stored password hash","Credential stuffing works by guessing a password one character at a time"]$q$::jsonb,'[1,2,3]'::jsonb,
 $q$Dictionary attacks exploit predictable words, so length and unpredictability beat them; password spraying deliberately keeps attempts per account low to stay under the lockout threshold; and unique salts force an attacker to rebuild any precomputed table per password, which is what breaks rainbow tables. Salting is the tempting answer for brute force too, but salt does not slow an attacker guessing one password at a time - length, slow hashing functions and lockout do that. Credential stuffing replays username and password pairs stolen from other breaches; it does no character-by-character guessing.$q$),

('n-q-633','netplus',4,'4.3','matching',3,
 $q$Match each attack on the left to the characteristic that defines it.$q$,
 $q${"left":["ARP poisoning","DNS poisoning","MAC flooding","VLAN hopping"],"right":["Overflows the switch CAM table so frames are flooded out every port","Corrupts resolver cache or record data so a hostname returns the attacker's address","Uses double-tagged frames or a negotiated trunk to reach a VLAN the port should not access","Sends forged replies binding the gateway's IP address to the attacker's MAC address"]}$q$::jsonb,
 '[3,1,0,2]'::jsonb,
 $q$ARP poisoning rewrites IP-to-MAC bindings (right index 3); DNS poisoning corrupts name-to-IP data (1); MAC flooding overflows the CAM table to force fail-open flooding (0); VLAN hopping crosses a segmentation boundary using double tagging or trunk negotiation (2). The pair most often confused is ARP and DNS poisoning - both redirect victims, but ARP operates on Layer 2 within one broadcast domain while DNS operates on names and can affect users anywhere.$q$),

('n-q-634','netplus',4,'4.3','ordering',2,
 $q$Place the stages of a typical evil twin credential-harvesting attack in the order they occur.$q$,
 $q$["The attacker reuses the harvested credentials to authenticate to the genuine corporate network","The attacker surveys the site and records the corporate SSID, channel and security settings","Victims associate with the stronger signal and are presented with a spoofed captive portal or login page","The attacker broadcasts a matching SSID from a higher-powered access point, optionally deauthenticating existing clients"]$q$::jsonb,
 '[1,3,2,0]'::jsonb,
 $q$Reconnaissance comes first - the attacker cannot impersonate an SSID they have not observed. The impersonating AP is then broadcast, often with deauthentication frames to push clients off the legitimate AP. Victims associate with the stronger signal and submit credentials to the fake portal, and only afterwards can those credentials be replayed against the real network. Placing the credential reuse earlier is the common error; it is the payoff, not the setup.$q$),

-- ===================================================================
-- 4.4  Network security features, defense techniques and solutions
-- ===================================================================
('n-q-635','netplus',4,'4.4','mcq',1,
 $q$A newly racked managed switch is reachable on its factory IP address using the username and password printed in the vendor's publicly available quick-start guide. Which hardening action is most urgent?$q$,
 $q$["Enable jumbo frames on the uplinks","Change the default administrative credentials and disable or rename the default account","Set the interface MTU to 1500","Enable neighbor discovery protocols on all ports"]$q$::jsonb,'1'::jsonb,
 $q$Default credentials are documented publicly and are among the first things scanned for, so anyone who can reach the management address owns the switch until they are changed. Enabling neighbor discovery is the tempting distractor because it sounds like configuration work a technician does at install time, but advertising device details to every attached port increases the attack surface rather than reducing it. MTU and jumbo frame settings are performance parameters with no security effect.$q$),

('n-q-636','netplus',4,'4.4','mcq',2,
 $q$An access switch in an unstaffed lobby has twelve unused ports. Which hardening action best prevents a visitor from gaining network access by plugging into one?$q$,
 $q$["Administratively shut down the unused ports and assign them to an unused, non-routed VLAN","Configure the unused ports for full duplex operation","Configure the unused ports as trunk ports","Assign the unused ports to the native VLAN"]$q$::jsonb,'0'::jsonb,
 $q$Shutting a port means it never comes up regardless of what is plugged in, and parking it in an unused VLAN means an accidental re-enable still leads nowhere. Assigning them to the native VLAN is the tempting answer because the native VLAN feels like a neutral default, but it is the worst option here: the native VLAN carries untagged traffic on trunks and is precisely the VLAN a double-tagging attack targets. Making the ports trunks would hand an attacker access to every VLAN.$q$),

('n-q-637','netplus',4,'4.4','mcq',2,
 $q$In an 802.1X deployment, which device acts as the authenticator?$q$,
 $q$["The client operating system's supplicant software","The switch port or wireless controller that holds the port closed until authentication succeeds","The RADIUS server that validates the credentials","The directory server that stores user group memberships"]$q$::jsonb,'1'::jsonb,
 $q$The authenticator is the network device enforcing the port state - it passes only EAPOL frames until authentication completes, then relays the exchange to the authentication server and opens the port on success. The RADIUS server is the most tempting distractor because it is the component that actually decides whether the credentials are valid, but in 802.1X terminology that role is the authentication server; the authenticator is the gatekeeper, not the judge. The supplicant is the client requesting access.$q$),

('n-q-638','netplus',4,'4.4','mcq',3,
 $q$An attacker unplugs an IP phone in an unattended conference room and connects their own laptop to the jack. Which control most effectively prevents that laptop from reaching the network?$q$,
 $q$["MAC filtering configured on the switch port","802.1X with certificate-based device authentication","A longer wireless pre-shared key","An outbound ACL on the internet edge router"]$q$::jsonb,'1'::jsonb,
 $q$802.1X requires a credential the attacker does not possess - here a device certificate - before the port forwards any traffic, so copying hardware does not help. MAC filtering is the tempting answer because it is the obvious port-level restriction, but MAC addresses appear in the clear in every frame; the attacker simply reads the phone's MAC off its label or off the wire and spoofs it in seconds. Wireless keys and edge ACLs are irrelevant to a wired jack inside the building.$q$),

('n-q-639','netplus',4,'4.4','mcq',2,
 $q$Which access-layer feature directly defeats a CAM table overflow (MAC flooding) attack?$q$,
 $q$["Port security with a maximum learned MAC address limit per port","DHCP snooping with trusted server ports","An inbound ACL applied on the distribution router","802.1Q trunk encapsulation"]$q$::jsonb,'0'::jsonb,
 $q$MAC flooding works by exhausting the CAM table with bogus source addresses; capping how many MAC addresses a port may learn - and dropping, restricting or err-disabling on violation - stops the flood at the first port. DHCP snooping is the tempting distractor because it is the other well-known access-layer defense, but it validates DHCP messages against trusted ports and has no visibility into how many MAC addresses a port is learning. A router ACL never sees intra-VLAN switched frames at all.$q$),

('n-q-640','netplus',4,'4.4','mcq',2,
 $q$How is a traffic-filtering ACL evaluated when a packet arrives?$q$,
 $q$["Top to bottom, the first matching entry is applied and processing stops, with an implicit deny at the end","Every entry is evaluated and the most specific match wins","Bottom to top until the first permit statement is reached","Most permissive entries are applied first, then restrictions are subtracted"]$q$::jsonb,'0'::jsonb,
 $q$ACLs are ordered lists processed top-down with first-match-wins semantics, and anything not explicitly permitted is dropped by the implicit deny at the end - which is why a broad permit placed above a specific deny makes that deny unreachable. "Most specific match wins" is the tempting answer because that is how routing tables behave, and candidates carry the habit across; ACLs do not reorder or rank entries, they simply take the first hit.$q$),

('n-q-641','netplus',4,'4.4','mcq',2,
 $q$Management wants to stop staff from reaching gambling sites and known malware distribution sites by category, on both HTTP and HTTPS, while leaving normal web browsing untouched. Which control fits?$q$,
 $q$["A URL and content filter (secure web gateway) driven by category and reputation feeds","A stateless packet filter that denies outbound TCP 443","Port security on the access switches","A rate limit applied to all outbound web traffic"]$q$::jsonb,'0'::jsonb,
 $q$Category-based URL and content filtering is designed for exactly this: it classifies destinations from a maintained feed and permits or blocks per category, working on HTTPS through TLS inspection or SNI and DNS-based enforcement. Denying TCP 443 is the tempting "just block the port" answer, but it would break every HTTPS site in the organization, which contradicts the requirement. Port security governs MAC addresses on switch ports and never inspects destinations.$q$),

('n-q-642','netplus',4,'4.4','mcq',1,
 $q$A security sensor is connected out-of-band to a switch SPAN port. It inspects a copy of network traffic and raises alerts on malicious patterns, but it cannot stop the traffic. What is it?$q$,
 $q$["An intrusion prevention system","An intrusion detection system","A stateful firewall","A forward proxy"]$q$::jsonb,'1'::jsonb,
 $q$Receiving a copy of traffic out-of-band means the sensor is not in the forwarding path, so it can only observe and alert - that is an IDS. An IPS is the tempting distractor and is the same detection technology, but it is deployed inline so it can drop, reset or rate-limit the offending session. A firewall and a proxy are both inline policy devices as well.$q$),

('n-q-643','netplus',4,'4.4','mcq',3,
 $q$A stateful firewall already permits inbound TCP 443 to the company web server, as it must. Which device is best placed to detect and block a SQL injection payload carried inside one of those permitted HTTPS sessions?$q$,
 $q$["The same stateful firewall, by adding a deny rule for TCP 443","An inline IPS or web application firewall that inspects the application-layer payload","A router ACL denying the attacker's source address","Port security on the screened subnet switch"]$q$::jsonb,'1'::jsonb,
 $q$A stateful firewall decides on addresses, ports and connection state; once port 443 is permitted, the contents of the session are not its concern, so the malicious payload rides straight through an allowed connection. An inline IPS or WAF inspects the payload itself and can drop the session. Adding a deny rule for 443 is the tempting quick fix, but it takes the public website offline - blocking the service you are trying to protect. Source-address ACLs only help until the attacker changes address.$q$),

('n-q-644','netplus',4,'4.4','mcq',2,
 $q$A firewall has three zones: the internal LAN, the internet, and a screened subnet hosting the public web and mail relay servers. Which rule set correctly reflects sound zone design?$q$,
 $q$["The screened subnet may open connections into the internal LAN whenever an application requires it","Untrusted hosts may reach only published services in the screened subnet, and the screened subnet may not initiate sessions into the internal LAN","All three zones should share a single VLAN so that troubleshooting is simpler","The internal LAN must be prevented from reaching the internet at all"]$q$::jsonb,'1'::jsonb,
 $q$The entire point of a screened subnet is to be a sacrificial zone: the internet reaches only the specific published ports, and a compromised server there has no path to pivot inward. Allowing the screened subnet to open sessions into the LAN is the tempting option because real applications do need database access, but that requirement is met with tightly scoped, LAN-initiated or narrowly published flows - a general permit destroys the containment the design exists to provide.$q$),

('n-q-645','netplus',4,'4.4','mcq',3,
 $q$A hospital operates infusion pumps running an embedded operating system the vendor no longer patches. They must remain reachable by their management server. Which approach reduces risk most while keeping them in service?$q$,
 $q$["Place the pumps in a dedicated VLAN with an ACL permitting only the management server, and monitor that segment","Install endpoint antivirus on each pump","Assign each pump a public IP address behind a strong firewall password","Disable the pumps' network interfaces entirely"]$q$::jsonb,'0'::jsonb,
 $q$When a device cannot be patched, the remaining lever is exposure: segmenting it into its own VLAN and permitting only the one flow it genuinely needs shrinks the reachable attack surface to a single peer, and monitoring that small segment makes anomalies obvious. Installing antivirus is the tempting answer because it is the reflex for an unpatchable host, but embedded medical devices generally cannot accept third-party agents and doing so may void certification. Disabling the interfaces would take the pumps out of clinical service.$q$),

('n-q-646','netplus',4,'4.4','multi',3,
 $q$Select the TWO practices that reflect sound key management for an organization's VPN and TLS private keys.$q$,
 $q$["Store private keys in a hardware security module or key vault with role-based access control","Email a copy of each private key to every administrator so a spare always exists","Define a rotation schedule and a documented revocation path such as CRL or OCSP","Reuse one key pair across all devices so that rotation only has to be done once","Publish the private key alongside the certificate so that peers can verify signatures"]$q$::jsonb,'[0,2]'::jsonb,
 $q$Private keys belong in protected storage with controlled access, and every key needs a planned rotation interval and a working way to revoke it before its natural expiry. Reusing one key pair everywhere is the most tempting wrong answer because it genuinely does simplify operations, but it means a single compromise invalidates every device at once and rotation becomes an all-or-nothing outage. Emailing or publishing a private key destroys the asymmetry the whole system depends on - only the public key is ever distributed.$q$),

('n-q-647','netplus',4,'4.4','multi',2,
 $q$Select the THREE actions that harden a newly deployed managed switch.$q$,
 $q$["Change the default credentials and remove or disable unused local accounts","Disable unused management services such as Telnet and HTTP in favor of SSH and HTTPS","Leave all unused ports enabled so that future desk moves are quicker","Shut down unused ports and restrict management access to a dedicated management VLAN protected by an ACL","Enable dynamic trunking negotiation on every access port so uplinks form automatically"]$q$::jsonb,'[0,1,3]'::jsonb,
 $q$Hardening is attack-surface reduction: remove known credentials, remove cleartext management protocols, and remove reachability that is not needed. Leaving ports enabled for convenience is the tempting operational trade-off, but it leaves live jacks in unsupervised areas. Enabling dynamic trunking on access ports is worse - it lets an attached device negotiate a trunk and reach every VLAN, which is one of the two standard VLAN hopping techniques.$q$),

('n-q-648','netplus',4,'4.4','multi',3,
 $q$Select the TWO capabilities that network access control (NAC) adds beyond plain 802.1X authentication.$q$,
 $q$["It assesses device posture such as patch level, disk encryption and whether antivirus is running and current","It defines the EAPOL frame exchange used to authenticate on the port","It can place a non-compliant device into a quarantine or remediation VLAN with restricted access","It removes the requirement for a RADIUS server","It encrypts all traffic transmitted on the access port"]$q$::jsonb,'[0,2]'::jsonb,
 $q$802.1X answers only "is this identity valid?"; NAC additionally asks "is this device fit to be admitted?" and then acts on the answer by steering the device to production, quarantine or a guest portal. Defining the EAPOL exchange is the tempting option because NAC deployments are built on 802.1X, but that frame exchange is 802.1X itself, not the NAC layer above it. NAC typically relies on RADIUS rather than replacing it, and it does not encrypt link traffic.$q$),

('n-q-649','netplus',4,'4.4','matching',3,
 $q$Match each Layer 2 threat on the left to the control that most directly prevents it.$q$,
 $q${"left":["MAC flooding of the CAM table","A rogue DHCP server handing out a malicious gateway","ARP poisoning of the default gateway entry","An unauthorized laptop plugged into a live wall jack"],"right":["Dynamic ARP Inspection, which validates ARP messages against the DHCP snooping bindings","802.1X authentication, which keeps the port closed until a valid credential is presented","Port security, which limits how many MAC addresses a port may learn","DHCP snooping, which accepts DHCP server messages only from designated trusted ports"]}$q$::jsonb,
 '[2,3,0,1]'::jsonb,
 $q$Port security caps learned MAC addresses and so stops CAM overflow (right index 2); DHCP snooping restricts which ports may originate DHCP offers (3); Dynamic ARP Inspection checks ARP messages against the snooping binding table and drops forged ones (0); 802.1X authenticates before the port forwards anything, which is what defeats an unauthorized device on a live jack (1). Note the dependency candidates miss: DAI relies on the binding table that DHCP snooping builds, so DHCP snooping must be enabled first.$q$);

insert into flashcards (id, cert, domain, objective, deck, front, back) values

-- ===================================================================
-- 4.1  Logical security concepts
-- ===================================================================
('n-f-600','netplus',4,'4.1','acronym',$q$AAA$q$,
 $q$Authentication, Authorization and Accounting. Authentication proves identity, authorization decides what that identity may reach, accounting logs what it actually did. Delivered on networks by RADIUS and TACACS+.$q$),

('n-f-601','netplus',4,'4.1','acronym',$q$MFA$q$,
 $q$Multifactor Authentication. Requires credentials from two or more different factor categories - know, have, are - so that a stolen or phished password alone is not enough to sign in.$q$),

('n-f-602','netplus',4,'4.1','core',$q$A login succeeds but the file share still says "access denied". Which AAA function rejected the request?$q$,
 $q$Authorization. Authentication happened once, successfully, at sign-in; authorization is the separate check made every time a resource is requested, comparing the proven identity against the permissions on that resource.$q$),

('n-f-603','netplus',4,'4.1','core',$q$What are the three authentication factor categories, with an example of each?$q$,
 $q$Something you know - password, PIN, security question. Something you have - smart card, hardware TOTP fob, enrolled phone receiving a push. Something you are - fingerprint, iris, palm vein. Location and behavior are sometimes added as supporting attributes rather than true factors.$q$),

('n-f-604','netplus',4,'4.1','core',$q$Why is a password plus a security question NOT multifactor authentication?$q$,
 $q$Both are "something you know", so they come from the same category. One phishing page, one shoulder-surf or one breach of a password database can harvest both. Multifactor requires the second credential to come from a different category, which is why possession-based and biometric factors are used.$q$),

('n-f-605','netplus',4,'4.1','core',$q$What implicit assumption does zero trust remove, and what replaces it?$q$,
 $q$It removes the assumption that anything inside the perimeter is trustworthy. Every request is authenticated and authorized on its own merits - identity, device posture and policy evaluated per session, regardless of source network - and microsegmentation limits what a compromised host can reach. "Never trust, always verify."$q$),

('n-f-606','netplus',4,'4.1','core',$q$State the principle of least privilege and give one common real-world violation.$q$,
 $q$Every user, service and process gets only the rights its function requires, for only as long as it needs them. Common violations: helpdesk staff holding Domain Admin so a reset tool works, service accounts running with full administrative rights, and departing staff retaining rights from previous roles.$q$),

('n-f-607','netplus',4,'4.1','core',$q$How does defense in depth differ from simply buying a better firewall?$q$,
 $q$It layers independent controls so no single failure is fatal: perimeter firewall, VLAN segmentation, 802.1X/NAC at the access layer, ACLs between zones, endpoint protection, logging and monitoring, plus physical controls. The design assumes each layer will eventually be bypassed, so another must be waiting behind it.$q$),

('n-f-608','netplus',4,'4.1','core',$q$In RBAC, what are permissions attached to, and what problem does that solve?$q$,
 $q$Permissions attach to roles; users are then granted roles. Onboarding assigns a role instead of dozens of individual grants, and a job change swaps the role so old rights disappear - which eliminates the permission drift that per-user grants accumulate over the years.$q$),

('n-f-609','netplus',4,'4.1','core',$q$Distinguish MAC, DAC, RBAC and rule-based access control in one line each.$q$,
 $q$MAC - the system enforces classification labels against user clearances; the owner has no discretion. DAC - the resource owner decides who gets access. RBAC - permissions follow job roles. Rule-based - access is decided by conditions such as time of day, source address or device posture, as in an ACL.$q$),

('n-f-610','netplus',4,'4.1','core',$q$Which CIA element does each of these protect: TLS on a session, hashing a downloaded file, an active/passive firewall pair?$q$,
 $q$TLS - confidentiality of data in transit (with integrity as a bonus). Hashing - integrity, proving the content was not altered. The HA firewall pair - availability, keeping the service reachable through a device failure.$q$),

('n-f-611','netplus',4,'4.1','core',$q$What does single sign-on give you, and what is its principal risk?$q$,
 $q$One authentication event grants access to many federated services, typically via SAML, OIDC or Kerberos - fewer passwords, central revocation, better user experience. The risk is concentration: one compromised credential opens everything, so SSO should always be paired with MFA and short session lifetimes.$q$),

('n-f-612','netplus',4,'4.1','core',$q$What does a digital signature provide that a hash alone does not?$q$,
 $q$Non-repudiation. A hash proves only that the data has not changed - anyone can compute it, so it identifies nobody. Signing the hash with a private key that only one identity holds binds the action to that identity, so the signer cannot credibly deny having produced it.$q$),

('n-f-613','netplus',4,'4.1','core',$q$How is separation of duties different from least privilege?$q$,
 $q$Least privilege shrinks how much any single account can do. Separation of duties splits one sensitive process across two people so no individual can complete it alone - one engineer requests a firewall change, another approves it. They complement each other; neither substitutes for the other.$q$),

('n-f-614','netplus',4,'4.1','core',$q$Where do RADIUS, TACACS+, LDAP and SAML each fit in an identity design?$q$,
 $q$RADIUS and TACACS+ are AAA protocols - RADIUS for network access such as 802.1X and VPN, TACACS+ commonly for administrative access to network devices. LDAP is the directory protocol used to look up user and group objects. SAML federates authentication to web applications by passing a signed assertion from an identity provider to a service provider.$q$),

-- ===================================================================
-- 4.2  Physical security
-- ===================================================================
('n-f-615','netplus',4,'4.2','core',$q$Which physical control actually stops tailgating, and how does it work?$q$,
 $q$An access control vestibule (mantrap): two interlocking doors where the inner door will not open until the outer one has closed, admitting one authenticated person at a time. Some designs add weight or occupancy sensors. A camera does not stop tailgating - it only records it.$q$),

('n-f-616','netplus',4,'4.2','core',$q$Give an example each of a preventive, a detective and a deterrent physical control.$q$,
 $q$Preventive - access control vestibule, locking cabinet, biometric door reader; it blocks the action. Detective - recording surveillance, motion sensor, tamper seal; it reveals that the action happened. Deterrent - a visible camera dome, warning signage, lighting, fencing; it discourages an attempt without physically stopping it.$q$),

('n-f-617','netplus',4,'4.2','core',$q$Why is a cipher lock with one shared code weaker than a badge reader?$q$,
 $q$A shared secret gives no per-person attribution, cannot be revoked for one leaver without reissuing it to everyone, and once shoulder-surfed it stays compromised indefinitely. A badge reader authenticates an individual credential, logs identity and timestamp, and revokes a single lost card.$q$),

('n-f-618','netplus',4,'4.2','core',$q$What does a proximity badge reader provide that a mechanical key does not?$q$,
 $q$A per-credential audit trail of who opened which door and when, instant revocation when a badge is lost or an employee leaves, and per-door and time-of-day restrictions. Metal keys are silently duplicated and leave no record of use, so a missing key means rekeying the lock.$q$),

('n-f-619','netplus',4,'4.2','core',$q$What are the trade-offs of using biometric readers on entry doors?$q$,
 $q$Strong "something you are" factor - nothing to lose, lend or copy - and it defeats badge sharing. Against that: false accept and false reject rates must be tuned against each other, enrollment takes staff time, environmental conditions affect readings, and a compromised biometric template cannot be reissued. Often deployed as a second factor alongside a badge.$q$),

('n-f-620','netplus',4,'4.2','core',$q$What problem does a smart locker solve?$q$,
 $q$Secure, attributable handover of equipment or deliveries when no staff are present. Each compartment opens only to a valid badge or code and records which credential opened it and when, giving both custody of the item and an audit trail - which an unmonitored drop box cannot provide.$q$),

('n-f-621','netplus',4,'4.2','core',$q$Why lock individual racks and cabinets when the room itself is already access-controlled?$q$,
 $q$Because everyone admitted to the room is not equally trusted - shared colocation suites, contractors and cleaners all get floor access. Console ports, USB ports and removable drives are physical bypasses of every logical control, so the enclosure is the last layer of defense in depth inside the room.$q$),

('n-f-622','netplus',4,'4.2','core',$q$What do asset tags and tamper detection each give you?$q$,
 $q$Asset tags (barcode or RFID) identify and track equipment for inventory, audit and recovery, and paired with door sensors they can flag an asset leaving the floor. Tamper seals and chassis switches reveal that a device was opened. Both are detective controls - they tell you something happened, they do not prevent it.$q$),

('n-f-623','netplus',4,'4.2','core',$q$Clear, purge, destroy - what does each sanitization level mean and when do you choose it?$q$,
 $q$Clear - overwrite or factory reset; defeats ordinary file recovery software; suitable for low-sensitivity media staying in the organization. Purge - cryptographic erase, ATA secure erase, degaussing; resists laboratory recovery; suitable for reuse of sensitive media. Destroy - shred, disintegrate, incinerate; the media is unusable afterwards; required for regulated data that will not be reused.$q$),

('n-f-624','netplus',4,'4.2','core',$q$Why does degaussing do nothing to a solid-state drive?$q$,
 $q$Degaussing works by scrambling magnetic domains, which only exist on hard drive platters and tape. SSDs store charge in NAND flash cells, and a magnetic field does not alter stored charge - so a degaussed SSD keeps all its data. Use ATA secure erase, cryptographic erase, or physical destruction instead.$q$),

('n-f-625','netplus',4,'4.2','core',$q$Why can a full sector overwrite still leave recoverable data on an SSD?$q$,
 $q$Wear levelling and over-provisioning: the controller maps logical sectors to whichever physical cells are least worn, so an overwrite of a logical sector may land on a different cell and leave the original data intact in a retired or spare block that the host cannot address. Use the drive's own secure-erase or crypto-erase command, or destroy it.$q$),

('n-f-626','netplus',4,'4.2','core',$q$What is a cryptographic erase and when is it the right choice?$q$,
 $q$On a self-encrypting drive, all data is already stored as ciphertext; destroying the drive's internal media encryption key makes every block unrecoverable in seconds while the drive stays fully usable. Ideal when hardware is being redeployed. It is only valid if the drive was encrypted from first use - encrypting after the fact leaves earlier plaintext behind.$q$),

('n-f-627','netplus',4,'4.2','core',$q$What is a certificate of destruction, and why does an auditor ask for it?$q$,
 $q$A document from the disposal vendor listing the serial numbers destroyed, the method used and the date. It is the audit evidence that regulated data was actually destroyed rather than resold, and it closes a documented chain of custody running from removal in the rack to destruction.$q$),

('n-f-628','netplus',4,'4.2','core',$q$Name the physical control for each exposure: tailgating, badge sharing, after-hours delivery of spares, an exposed console port.$q$,
 $q$Tailgating - access control vestibule or turnstile. Badge sharing - camera footage correlated against the badge log, since the log records the credential, not the face. After-hours delivery - smart locker with credential logging. Exposed console port - locking rack or cabinet, plus console authentication on the device itself.$q$),

('n-f-629','netplus',4,'4.2','core',$q$Which physical controls counter shoulder surfing and dumpster diving?$q$,
 $q$Shoulder surfing - privacy filters, positioning monitors away from windows and walkways, short screen-lock timeouts, and clean desk practice. Dumpster diving - cross-cut shredders, locked shred consoles for paper awaiting collection, and a disposal policy that covers printed output and labelled media, not just drives.$q$),

-- ===================================================================
-- 4.3  Common attack types
-- ===================================================================
('n-f-630','netplus',4,'4.3','acronym',$q$DDoS$q$,
 $q$Distributed Denial of Service. Many compromised hosts - a botnet, or unwitting reflectors - exhaust a target's bandwidth, connection table or CPU simultaneously. The distributed sourcing is exactly what makes blocking a single source address ineffective.$q$),

('n-f-631','netplus',4,'4.3','core',$q$ARP poisoning versus DNS poisoning - what does each corrupt, and how far does the damage spread?$q$,
 $q$ARP poisoning corrupts the IP-to-MAC binding in host ARP caches; because ARP is link-local it cannot cross a routed boundary, so only the attacker's own VLAN is affected. DNS poisoning corrupts name-to-IP data in a resolver cache or hosts file and can misdirect users at many sites. Diagnose with "arp -a" for the first and nslookup or dig for the second.$q$),

('n-f-632','netplus',4,'4.3','core',$q$What is an on-path attack, and which underlying attacks enable it?$q$,
 $q$The attacker positions themselves between two parties who believe they are talking directly, relaying and optionally altering traffic. It is enabled by ARP poisoning, a rogue DHCP server handing out a malicious gateway, a rogue AP or evil twin, or DNS poisoning. Tells: unexpected certificate warnings, a changed gateway MAC, and added latency.$q$),

('n-f-633','netplus',4,'4.3','core',$q$What is MAC flooding and why does it succeed?$q$,
 $q$The attacker floods a switch with frames bearing thousands of bogus source MAC addresses until the CAM table is full and legitimate entries can no longer be learned. The switch then fails open, flooding unknown unicast out every port in the VLAN, which turns any attached port into a sniffing position. Port security with a per-port MAC limit stops it.$q$),

('n-f-634','netplus',4,'4.3','core',$q$What are the two ways VLAN hopping is carried out, and how is each prevented?$q$,
 $q$Switch spoofing - the attacker's port negotiates a trunk via dynamic trunking, granting access to every VLAN; prevented by disabling trunk negotiation and hard-setting access ports. Double tagging - an outer tag matching the native VLAN is stripped by the first switch, leaving an inner tag that delivers the frame into the target VLAN; prevented by changing the native VLAN to an unused one and not carrying user data on it.$q$),

('n-f-635','netplus',4,'4.3','core',$q$Rogue access point versus evil twin - what is the distinction?$q$,
 $q$A rogue AP is any unauthorized access point attached to the network, very often an employee's own equipment installed for convenience; it is dangerous because it bypasses the wireless security policy, not because it is malicious. An evil twin is deliberately configured to impersonate a legitimate SSID (often the BSSID too) in order to lure clients and harvest credentials.$q$),

('n-f-636','netplus',4,'4.3','core',$q$What separates a DoS from a DDoS, and what does amplification add?$q$,
 $q$A DoS originates from one source, which makes it comparatively easy to filter. A DDoS comes from many sources at once. Reflective, amplified attacks spoof the victim's address toward services that answer with far more data than they receive - DNS, NTP, memcached - which multiplies the volume delivered while hiding the true origin behind innocent third parties.$q$),

('n-f-637','netplus',4,'4.3','core',$q$What is a SYN flood, and how is it mitigated?$q$,
 $q$The attacker sends a stream of TCP SYN packets and never completes the handshake, filling the server's half-open connection table so legitimate connections are refused. Mitigations include SYN cookies, shorter half-open timeouts, per-source connection rate limiting, and upstream scrubbing when volumes exceed the circuit.$q$),

('n-f-638','netplus',4,'4.3','core',$q$Name four social engineering techniques and one control that addresses each.$q$,
 $q$Phishing and spear phishing - mail filtering plus awareness training and an easy reporting path. Vishing - policy of calling back on a number the organization already holds. Tailgating - access control vestibule. Shoulder surfing - privacy filters and screen placement. Dumpster diving - cross-cut shredding and locked shred bins. All of these exploit people, so training is the common thread.$q$),

('n-f-639','netplus',4,'4.3','core',$q$Distinguish brute force, dictionary, password spraying, credential stuffing and rainbow table attacks.$q$,
 $q$Brute force - tries every combination; beaten by length, slow hashing and lockout. Dictionary - tries a curated word list; beaten by uncommon passphrases. Password spraying - one or two common passwords against many accounts, kept below the lockout threshold. Credential stuffing - replays username/password pairs stolen from other breaches, which is why password reuse is fatal. Rainbow table - looks up precomputed hashes; beaten by salting.$q$),

('n-f-640','netplus',4,'4.3','core',$q$Why does salting defeat rainbow tables but not brute force?$q$,
 $q$A unique random salt per password means an attacker would have to precompute a separate table for every salt, which destroys the economics of a lookup table. Brute force still proceeds one guess at a time against the salted hash, so what limits it is password length, a deliberately slow hashing function such as bcrypt, PBKDF2 or Argon2, and account lockout.$q$),

('n-f-641','netplus',4,'4.3','core',$q$Define virus, worm, ransomware, trojan, rootkit and keylogger in one line each.$q$,
 $q$Virus - attaches to a file or program and needs a user to run it. Worm - self-replicates across the network with no user action, so it spreads fastest. Ransomware - encrypts data and demands payment; tested offline backups are the real defense. Trojan - useful-looking software carrying a hidden payload. Rootkit - hides itself and other malware, often below the OS, so detection may require booting from clean media. Keylogger - records keystrokes to capture credentials.$q$),

('n-f-642','netplus',4,'4.3','core',$q$A user's gateway MAC has changed with no hardware swap, DNS answers are correct, and only that user's VLAN is affected. What is happening?$q$,
 $q$ARP poisoning being used to establish an on-path position. Correct DNS answers rule out DNS poisoning; confinement to one VLAN matches ARP's link-local scope. Confirm with "arp -a", and prevent it with DHCP snooping plus Dynamic ARP Inspection on the access switches.$q$),

-- ===================================================================
-- 4.4  Network security features, defense techniques and solutions
-- ===================================================================
('n-f-643','netplus',4,'4.4','acronym',$q$ACL$q$,
 $q$Access Control List. An ordered list of permit and deny entries matched top-down, first match wins, ending in an implicit deny. Applied to a router or firewall interface to filter by source, destination, protocol and port.$q$),

('n-f-644','netplus',4,'4.4','acronym',$q$IDS$q$,
 $q$Intrusion Detection System. A passive sensor, usually fed a copy of traffic from a SPAN port or TAP, that inspects for malicious patterns and raises alerts. It detects and logs - being out of band, it cannot block.$q$),

('n-f-645','netplus',4,'4.4','acronym',$q$IPS$q$,
 $q$Intrusion Prevention System. The same detection capability deployed inline, so it can drop, reset or rate-limit a malicious session in real time. Because it sits in the forwarding path, a false positive or device failure can interrupt production traffic.$q$),

('n-f-646','netplus',4,'4.4','acronym',$q$EAP$q$,
 $q$Extensible Authentication Protocol. The authentication framework carried inside 802.1X (as EAPOL on a LAN). Methods include EAP-TLS using certificates on both sides, and PEAP or EAP-TTLS, which tunnel credentials inside a server-authenticated TLS session.$q$),

('n-f-647','netplus',4,'4.4','core',$q$Name five hardening steps to apply to a new switch or router before it goes into production.$q$,
 $q$Change the default credentials and remove or rename default accounts. Disable unused services - Telnet, HTTP, TFTP and unnecessary discovery protocols - and use SSH and HTTPS instead. Administratively shut unused ports. Restrict management access to a dedicated management VLAN with an ACL on the management interface. Patch the firmware and back up the configuration to a controlled location.$q$),

('n-f-648','netplus',4,'4.4','core',$q$What are the three roles in an 802.1X exchange, and what does the port do before authentication succeeds?$q$,
 $q$Supplicant - the client software requesting access. Authenticator - the switch port, access point or wireless controller enforcing the port state and relaying the exchange. Authentication server - the RADIUS server that validates the credential. Until authentication succeeds the port is in an unauthorized state and forwards only EAPOL frames, so no data traffic passes.$q$),

('n-f-649','netplus',4,'4.4','core',$q$Why is MAC filtering weak, and what is it still useful for?$q$,
 $q$Every frame carries its source MAC in cleartext, so an attacker captures a permitted address and spoofs it in seconds - it is a speed bump, not authentication. It remains useful for devices that cannot run an 802.1X supplicant, such as printers, cameras and IoT sensors, ideally via MAC authentication bypass into a restricted VLAN with monitoring.$q$),

('n-f-650','netplus',4,'4.4','core',$q$What does switch port security do, and what are its violation actions?$q$,
 $q$It limits how many - and optionally which - MAC addresses a port may learn, with sticky learning able to record the first addresses seen into the configuration. On violation the port can protect (silently drop offending frames), restrict (drop, log and increment counters) or shut down (err-disable the port until cleared). It is the direct defense against MAC flooding.$q$),

('n-f-651','netplus',4,'4.4','core',$q$Agent-based versus agentless NAC - what is the trade-off?$q$,
 $q$A persistent agent is installed on managed devices and reports detailed posture continuously. A dissolvable agent runs once from a captive portal and removes itself, which suits BYOD and guests. Agentless NAC infers posture from active scans, directory data and device fingerprinting - nothing to install, but far less visibility into patch level and endpoint protection state.$q$),

('n-f-652','netplus',4,'4.4','core',$q$How is an ACL evaluated, and what trap catches people at the end of the list?$q$,
 $q$Top-down, first match wins, and processing stops at the first hit - so ordering is everything, and a broad permit above a specific deny makes that deny unreachable. The trap is the implicit deny at the end: anything not explicitly permitted is dropped, so an ACL made only of permit statements silently blocks all other traffic.$q$),

('n-f-653','netplus',4,'4.4','core',$q$URL filtering, content filtering and a packet-filtering firewall - what does each actually inspect?$q$,
 $q$A packet filter sees only IP addresses, protocol and ports. URL filtering evaluates the destination address or domain against category and reputation feeds, permitting or blocking whole classes of site. Content filtering inspects the payload - file types, keywords, malware signatures, data-loss patterns. On HTTPS, category enforcement needs TLS inspection, or SNI and DNS-based control.$q$),

('n-f-654','netplus',4,'4.4','core',$q$Define trusted zone, untrusted zone and screened subnet, and state the traffic rule that binds them.$q$,
 $q$Trusted - the internal LAN. Untrusted - the internet. Screened subnet - a separate zone hosting services that must be reachable from outside. The rule: untrusted may reach only the specific published services in the screened subnet, and the screened subnet must not initiate sessions into the trusted zone, so a compromised public server has nowhere to pivot.$q$),

('n-f-655','netplus',4,'4.4','core',$q$Why is VLAN segmentation a security control and not only a performance measure?$q$,
 $q$It shrinks the broadcast domain, so link-local attacks such as ARP poisoning and MAC flooding cannot reach hosts in other VLANs, and it forces all inter-VLAN traffic through a router or firewall where an ACL can be applied. That is what makes it the standard way to isolate guest Wi-Fi, IoT and OT devices, payment systems and management interfaces.$q$),

('n-f-656','netplus',4,'4.4','core',$q$Firewall versus IDS versus IPS - what does each decide, and where does the firewall stop being enough?$q$,
 $q$A firewall permits or denies by policy on addresses, ports and connection state - applications too on a next-generation firewall. An IDS passively inspects a copy of traffic and alerts. An IPS sits inline and can drop or reset. Once a firewall has permitted TCP 443 to a web server, it does not police what rides inside that session; catching an exploit in permitted traffic is the job of an IPS or web application firewall.$q$),

('n-f-657','netplus',4,'4.4','core',$q$Signature-based versus anomaly-based detection - what is the trade-off?$q$,
 $q$Signature-based matches known attack patterns: accurate with few false positives, but blind to anything novel and dependent on constant signature updates. Anomaly or behavior-based baselines what normal looks like and flags deviation: it can catch previously unseen attacks, but it generates more false positives and needs a clean, representative baseline period first.$q$),

('n-f-658','netplus',4,'4.4','core',$q$What does sound key management cover, from generation to end of life?$q$,
 $q$Generation with sufficient entropy; storage in an HSM or key vault rather than in source control, shared drives or email; access restricted by role; a defined rotation interval; a working revocation path via CRL or OCSP; escrow or backup so encrypted data survives a lost key; and destruction at end of life. A key that cannot be revoked is a permanent liability.$q$),

('n-f-659','netplus',4,'4.4','core',$q$Which control stops each of: MAC flooding, a rogue DHCP server, ARP poisoning, an unauthorized device on a live jack?$q$,
 $q$MAC flooding - port security with a per-port MAC limit. Rogue DHCP - DHCP snooping, accepting server messages only from trusted ports. ARP poisoning - Dynamic ARP Inspection, validating ARP against the snooping binding table (so DHCP snooping must be enabled first). Unauthorized device - 802.1X, which keeps the port closed until a valid credential is presented.$q$),

('n-f-660','netplus',4,'4.4','core',$q$Why disable unused ports and services rather than relying on the firewall to cover them?$q$,
 $q$The firewall only filters traffic that crosses it. A live wall jack in a lobby, a Telnet daemon on a switch, or an untouched default account is reachable from inside the perimeter where the firewall never sees the traffic at all. Hardening removes the target; the firewall only controls one path to it.$q$);
