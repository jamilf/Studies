-- A+ Core 2 (220-1102) Domain 2 (Security) expansion, part A: objectives 2.1-2.4.
-- Adds questions a2-q-700..745 (46) and flashcards a2-f-700..755 (56):
--   2.1 Physical security & logical security concepts -> 11 questions, 14 flashcards
--   2.2 Wireless/authentication security             -> 13 questions, 15 flashcards
--   2.3 Malware types and detection/removal          -> 11 questions, 14 flashcards
--   2.4 Social engineering, threats, vulnerabilities -> 11 questions, 13 flashcards
-- Acronym-deck note: GPO, OU, WPA3 and MFA already exist as domain-2 acronym cards,
-- so the new acronym cards here are RBAC, SSO, RADIUS, PKI, TOTP, RAT and DDoS.

insert into public.questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ===================== 2.1 Physical security & logical security concepts =====================

($q$a2-q-700$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$mcq$q$,1,
 $q$A warehouse wants to stop a vehicle from being deliberately driven into its loading-dock entrance, separate from any concern about people walking in. Which physical control addresses this specific threat?$q$,
 $q$["Bollards", "An access control vestibule", "A cable lock", "A badge reader"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Bollards are sturdy posts that physically block vehicles from reaching an entrance, addressing a vehicle-borne threat that door-based controls like vestibules and badge readers don't address at all; cable locks secure individual devices, not entrances.$q$),

($q$a2-q-701$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$mcq$q$,1,
 $q$Security cameras recorded an intruder entering a locked equipment closet last night, but nobody was alerted until the footage was reviewed the next morning. What does this scenario illustrate about video surveillance?$q$,
 $q$["It is a preventive control that stops intrusions as they happen", "It is primarily a detective control, useful for investigation rather than stopping access in real time", "It replaces the need for door locks entirely", "It automatically calls the police when it detects motion"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Cameras mainly document and deter; without a real-time monitoring response, they record evidence for after-the-fact investigation rather than stopping the intrusion in progress. Locks, guards, and access control still carry the preventive load.$q$),

($q$a2-q-702$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$mcq$q$,2,
 $q$A fingerprint scanner protecting a lab is tuned very strictly, and now several authorized employees are being denied entry and must use a backup PIN instead. Which trade-off does this describe?$q$,
 $q$["A rising false rejection rate as the scanner is tuned to minimize false acceptance", "A rising false acceptance rate as the scanner is tuned to minimize false rejection", "A hardware failure unrelated to sensor tuning", "An expired digital certificate on the badge reader"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Biometric sensors trade off false acceptance (letting in the wrong person) against false rejection (denying the right person); tightening the match threshold to cut false acceptances predictably increases false rejections for legitimate users, which is what's happening here.$q$),

($q$a2-q-703$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$mcq$q$,2,
 $q$An attacker uses a handheld RFID reader to covertly capture the signal from an employee's proximity badge while standing near them in an elevator, then uses the copied data to enter a restricted floor. Which additional control would have prevented the cloned badge from being enough on its own?$q$,
 $q$["Requiring a PIN or biometric check in addition to the badge at that door", "Increasing the badge reader's read range", "Switching to a louder door alarm", "Adding more security cameras in the elevator"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Pairing the badge (something you have) with a PIN or biometric (something you know/are) turns entry into multifactor authentication, so a cloned badge alone is no longer sufficient. A longer read range would make cloning easier, not harder, and cameras/alarms are detective, not preventive.$q$),

($q$a2-q-704$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$multi$q$,2,
 $q$Which of the following are physical security controls, as opposed to logical security controls? (Select all that apply.)$q$,
 $q$["A cable lock securing a laptop to a desk", "An access control list restricting a shared folder", "Bollards outside a building entrance", "The principle of least privilege applied to user accounts", "A security guard stationed at the lobby desk"]$q$::jsonb,
 $q$[0, 2, 4]$q$::jsonb,
 $q$Cable locks, bollards, and guards act on the physical world - devices, vehicles, and people at a location. ACLs and least privilege are logical controls enforced by software/permissions rather than by anything you can touch, so they belong to the logical side of security measures.$q$),

($q$a2-q-705$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$multi$q$,2,
 $q$Which of the following are examples of logical security concepts rather than physical controls? (Select all that apply.)$q$,
 $q$["Access control lists on a file server", "The principle of least privilege", "A mantrap at a data center entrance", "Role-based access control (RBAC)", "A cable lock on a desktop tower"]$q$::jsonb,
 $q$[0, 1, 3]$q$::jsonb,
 $q$ACLs, least privilege, and RBAC all govern who may access a digital resource and are enforced in software - logical security. A mantrap and a cable lock are physical mechanisms that control entry to a space or secure a physical object.$q$),

($q$a2-q-706$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$matching$q$,2,
 $q$Match each control to the trait that best defines it.$q$,
 $q${"left": ["Mantrap (access control vestibule)", "Cable lock", "Biometric scanner", "Access control list (ACL)"], "right": ["Restricts which users or groups may access a specific digital resource", "Verifies identity using a measurable physical trait such as a fingerprint", "Admits only one authenticated person at a time between two interlocked doors", "Physically tethers a device to a fixed object to deter opportunistic theft"]}$q$::jsonb,
 $q$[2, 3, 1, 0]$q$::jsonb,
 $q$A mantrap's paired doors let in one verified person at a time, defeating tailgating; a cable lock deters theft of the device itself; a biometric scanner authenticates by physical trait; and an ACL is the logical mechanism that limits who can touch a given resource. Each control operates at a different layer of security.$q$),

($q$a2-q-707$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$ordering$q$,3,
 $q$A visitor badge must pass through every layer of a company's layered physical security before reaching a server rack inside the data center. Order the layers from the outermost (first encountered) to the innermost.$q$,
 $q$["Guard desk verifying the visitor's badge and escort", "Badge reader unlocking the building's main entrance", "Bollards and perimeter fencing around the property", "Locked server rack inside the data center", "Access control vestibule (mantrap) into the secure data center floor"]$q$::jsonb,
 $q$[2, 1, 0, 4, 3]$q$::jsonb,
 $q$A visitor first passes bollards and perimeter fencing, then badges into the building's main entrance, is verified in person at the guard desk, passes through the mantrap that admits one authenticated person at a time onto the secure floor, and finally reaches the locked server rack - each layer independent of the ones before it.$q$),

($q$a2-q-708$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$mcq$q$,2,
 $q$A company's IT policy states that a temporary contractor should be granted access only to the two shared folders needed for their specific project, not the full company file server. Which security principle does this policy enforce?$q$,
 $q$["Least privilege", "Single sign-on", "Defense in depth", "Role reversal"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Granting only the access required for the task at hand - and nothing broader - is the principle of least privilege. It limits the damage if the contractor's account is compromised or misused, since it never had access to anything beyond its narrow need.$q$),

($q$a2-q-709$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$mcq$q$,3,
 $q$A laptop secured to a desk with a cable lock is stolen anyway after a thief simply removes the four screws holding the security-slot bracket to the laptop's chassis. What does this reveal about cable locks?$q$,
 $q$["They are effective against every threat model, so this should not be possible", "They deter casual/opportunistic theft but cannot stop a prepared attacker with tools and time", "They only work on desktop towers, never laptops", "They are a form of encryption protecting the data if the laptop is taken"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$A cable lock raises the effort and time required for casual theft but is not built to resist a determined attacker with basic tools - it's a deterrent, not a vault. It also does nothing for the data on the drive, which still needs disk encryption regardless of whether the laptop itself is physically secured.$q$),

($q$a2-q-710$q$,$q$aplus2$q$,2,$q$2.1$q$,$q$mcq$q$,1,
 $q$A warehouse installs motion-activated exterior lighting and an alarm that triggers if a door is forced open after hours. At what point in an intrusion does this layer of security take effect?$q$,
 $q$["Before any perimeter barrier is reached", "Only after a barrier such as a locked door has already been bypassed", "Only during business hours", "Only when a badge reader also fails"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Motion lighting and door alarms are detective controls that activate once someone has already breached an earlier barrier (a locked door, a fence). They don't prevent the initial entry - they alert staff or a monitoring service so a response can follow quickly.$q$),

-- ===================== 2.2 Wireless/authentication security =====================

($q$a2-q-711$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$mcq$q$,1,
 $q$An organization wants each employee to authenticate to the corporate Wi-Fi with their own individual, centrally managed credentials rather than one shared passphrase everyone knows. Which combination of technologies accomplishes this?$q$,
 $q$["WPA2/WPA3-Personal with a strong shared passphrase", "WPA2/WPA3-Enterprise using 802.1X authentication against a RADIUS server", "An open network with MAC address filtering", "WEP with a rotating key schedule"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Enterprise mode authenticates each user individually through 802.1X against a RADIUS/AAA server, so credentials are per-person and revocable without affecting anyone else. A shared passphrase (Personal mode) can't be revoked for one person without re-keying every device; MAC filtering is trivially spoofed, and WEP is cryptographically broken.$q$),

($q$a2-q-712$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$mcq$q$,2,
 $q$Several employees' MFA codes are being stolen through SIM-swap attacks that redirect their phone number to an attacker's SIM before an OTP text arrives. Which MFA method would most directly close this specific gap?$q$,
 $q$["Continue using SMS codes but require a longer code", "A hardware security key (e.g., FIDO2) or authenticator app that doesn't rely on the phone number", "A second SMS code sent to the same phone number", "A security question in addition to the SMS code"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$SIM-swapping specifically defeats SMS-based MFA by hijacking the phone number itself, so any fix that still depends on that number (a longer code, a second SMS, or a knowledge-based question) leaves the same hole open. A hardware key or authenticator app generates or holds its credential independently of the phone number, so a SIM swap has no effect on it.$q$),

($q$a2-q-713$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$mcq$q$,2,
 $q$A workstation that has been offline for several months now fails to log in with a domain account, showing an error about the trust relationship between the workstation and the domain failing. What is the most direct fix?$q$,
 $q$["Reset or rejoin the computer account in Active Directory to reestablish its secure channel", "Change the user's domain password", "Disable the built-in Administrator account", "Increase the DHCP lease time"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The trust-relationship error means the computer account's own password (which AD rotates automatically) no longer matches what the domain controller has on record - common after long offline periods or a restored snapshot. Resetting the computer account (or removing and rejoining the domain) reestablishes that secure channel; the user's own password is unrelated to the machine's identity.$q$),

($q$a2-q-714$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$mcq$q$,3,
 $q$Why is WPA3's SAE handshake considered more resistant to offline password-guessing attacks than WPA2-PSK's four-way handshake?$q$,
 $q$["SAE never exposes information that would let a captured exchange be brute-forced offline, and it adds forward secrecy", "SAE uses a longer passphrase length requirement only", "SAE disables encryption entirely to simplify the exchange", "SAE only works on 6 GHz Wi-Fi, which is inherently more secure"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$WPA2's four-way handshake can be captured and attacked offline with a fast dictionary/brute-force attempt against a weak passphrase. SAE's dragonfly key exchange doesn't leak material usable for that kind of offline attack, and it provides forward secrecy so a later-compromised passphrase doesn't retroactively expose previously captured sessions.$q$),

($q$a2-q-715$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$mcq$q$,2,
 $q$A network team wants administrators' full login sessions to network switches encrypted (not just the password) and wants to authorize individual commands separately from the initial login. Which protocol fits best?$q$,
 $q$["RADIUS", "TACACS+", "Kerberos", "LDAP"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$TACACS+ encrypts the entire packet and separates authentication, authorization, and accounting, which is what allows per-command authorization on network devices. RADIUS encrypts only the password and bundles authentication with authorization, which is why it's more common for general network/Wi-Fi access than device administration.$q$),

($q$a2-q-716$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$mcq$q$,1,
 $q$To log into a company portal, a user opens an app on their phone that displays a six-digit code changing every 30 seconds and types it in alongside their password. What best describes the second factor being used?$q$,
 $q$["A time-based one-time password (TOTP) from an authenticator app - something the user has", "A biometric factor - something the user is", "A knowledge factor identical in category to the password", "An SMS-delivered code"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$An authenticator app generating a rotating code locally is a TOTP token, a 'something you have' factor tied to the device holding the app - distinct from the password itself (something you know) and from SMS, which is a different delivery mechanism with different risks.$q$),

($q$a2-q-717$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$mcq$q$,2,
 $q$A hospital wants to eliminate a shared Wi-Fi passphrase that any departing contractor could still remember, and instead issue each managed device its own revocable credential for network access. Which approach fits best?$q$,
 $q$["Certificate-based authentication (EAP-TLS) issuing each device its own certificate", "A longer WPA2-Personal passphrase changed quarterly", "Hiding the SSID from broadcast", "Enabling MAC address filtering only"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$EAP-TLS authenticates each device with its own certificate issued by a trusted CA, so a single device's access is revoked by revoking its certificate - nothing shared has to change for everyone else. A shared passphrase, hidden SSID, and MAC filtering all still depend on one secret or list that any leaver could carry or bypass.$q$),

($q$a2-q-718$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$mcq$q$,2,
 $q$A company replaces password logins with Windows Hello for Business tied to each laptop's TPM. Which specific attack does this primarily defeat that passwords remain vulnerable to?$q$,
 $q$["Credential phishing, since there is no reusable secret to type into a fake login page", "Physical theft of the laptop", "Power outages during login", "Slow Wi-Fi authentication"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Passwordless credentials are cryptographic keys bound to the specific device and site, unlocked locally by a PIN or biometric - there's no shared secret for a phishing page to capture and replay elsewhere. It doesn't make the laptop theft-proof or immune to unrelated availability issues.$q$),

($q$a2-q-719$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$mcq$q$,2,
 $q$After a user logs in once, subsequent requests to access different network resources happen without the user retyping their password each time, using tickets that expire after a set period. What authentication system is this describing?$q$,
 $q$["Kerberos", "RADIUS", "TACACS+", "LDAP"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Kerberos issues a ticket-granting ticket at initial login and short-lived service tickets for each resource afterward, so the password itself is never resent - and the tickets' expiration limits how long a stolen ticket remains useful. RADIUS/TACACS+ are AAA protocols for network device/service logins, and LDAP is a directory-query protocol, not a ticketing system.$q$),

($q$a2-q-720$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$multi$q$,2,
 $q$Which of the following are true about a WPA2/WPA3-Enterprise wireless deployment using 802.1X and a RADIUS server? (Select all that apply.)$q$,
 $q$["Each user authenticates with individually revocable credentials", "The access point enforces port-based access control until authentication succeeds", "One shared passphrase is distributed to every employee", "A RADIUS server evaluates the authentication request and returns an accept or reject decision", "No server infrastructure is required beyond the access point"]$q$::jsonb,
 $q$[0, 1, 3]$q$::jsonb,
 $q$Enterprise/802.1X deployments give each user their own revocable credential, the access point enforces 802.1X port control until RADIUS approves the login, and RADIUS itself is the server making that accept/reject decision. A shared passphrase describes Personal (PSK) mode instead, and Enterprise mode specifically requires a RADIUS/AAA server - it isn't server-free.$q$),

($q$a2-q-721$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$multi$q$,2,
 $q$Which of the following are true statements about certificate-based network authentication? (Select all that apply.)$q$,
 $q$["It removes the need for a shared secret that could be phished or guessed", "A trusted certificate authority issues and can revoke each certificate", "Access can be revoked per device without changing every other device's credential", "It is functionally identical to a shared WPA2-Personal passphrase", "It requires no supporting infrastructure at all"]$q$::jsonb,
 $q$[0, 1, 2]$q$::jsonb,
 $q$Certificate-based authentication replaces a shared secret with a per-device key pair validated by a trusted CA, so one device can be revoked independently of the rest - the opposite of a shared PSK, which changes for everyone at once. It does require supporting infrastructure (a CA and certificate management), not none.$q$),

($q$a2-q-722$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$matching$q$,2,
 $q$Match each authentication-related protocol or term to the trait that defines it.$q$,
 $q${"left": ["RADIUS", "TACACS+", "Kerberos", "LDAP"], "right": ["Queries a directory service for user, group, and computer objects", "Encrypts the entire session and separates authorization from authentication, common for device administration", "Issues time-limited tickets so a password is never resent for each resource request", "Centralizes authentication, authorization, and accounting for network/Wi-Fi logins, typically paired with 802.1X"]}$q$::jsonb,
 $q$[3, 1, 2, 0]$q$::jsonb,
 $q$RADIUS centralizes AAA for network/Wi-Fi access and pairs naturally with 802.1X; TACACS+ encrypts the full session and separates authorization for device administration; Kerberos avoids resending passwords by issuing expiring tickets; and LDAP is the protocol used to query directory objects like users and groups that these other systems often authenticate against.$q$),

($q$a2-q-723$q$,$q$aplus2$q$,2,$q$2.2$q$,$q$ordering$q$,3,
 $q$Order the steps of what happens, from the client's perspective, when a certificate-authenticated laptop connects to an 802.1X-secured enterprise Wi-Fi network.$q$,
 $q$["RADIUS validates the certificate against the trusted CA and directory", "The access point restricts the port to EAP traffic only, blocking normal network access", "The laptop associates with the access point's SSID", "RADIUS returns an accept, and the access point opens the port for normal traffic", "The laptop presents its certificate through EAP-TLS, relayed by the access point to RADIUS"]$q$::jsonb,
 $q$[2, 1, 4, 0, 3]$q$::jsonb,
 $q$Association happens first, but 802.1X immediately restricts the port to EAP traffic only; the laptop's EAP-TLS exchange carrying its certificate is relayed to RADIUS, which validates it against the trusted CA and directory, and only after an accept does the access point open the port to ordinary traffic.$q$),

-- ===================== 2.3 Malware types and detection/removal =====================

($q$a2-q-724$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$mcq$q$,1,
 $q$A user's antivirus is fully up to date and shows no detections, yet their laptop's fan runs constantly at full speed and Task Manager shows an unfamiliar process pinning the CPU near 100% even while the laptop sits idle. Which malware type best fits this pattern?$q$,
 $q$["Cryptomining malware (cryptojacking)", "A boot sector virus", "A phishing email", "A cable lock bypass"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Sustained high CPU/GPU usage with no obvious cause, especially from an unfamiliar background process, is the classic signature of cryptojacking - malware quietly using the device's processing power to mine cryptocurrency for someone else. Boot sector viruses affect startup, not steady-state CPU load, and the last two options aren't malware types at all.$q$),

($q$a2-q-725$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$mcq$q$,2,
 $q$An employee downloads a free 'PDF converter' tool from an unofficial site. The converter appears to work normally, but weeks later the company discovers an attacker has been remotely browsing files and enabling the webcam on that machine without the employee noticing anything unusual day-to-day. What best describes what was installed?$q$,
 $q$["A trojan carrying a remote access tool (RAT)", "A boot sector virus", "A worm", "A dictionary attack"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The fake converter is the trojan - software disguised as something desirable to get the user to install it voluntarily - and the hidden remote-control capability it delivered is a RAT. There's no self-propagation described (ruling out a worm), no boot-time symptom (ruling out boot sector virus), and a dictionary attack is a password-guessing technique, not something installed on a machine.$q$),

($q$a2-q-726$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$mcq$q$,2,
 $q$For several weeks, a shared kiosk PC quietly recorded every character typed by anyone who used it, including usernames and passwords later used fraudulently. Which malware type matches this behavior?$q$,
 $q$["A keylogger", "A boot sector virus", "Cryptomining malware", "A worm"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Recording every keystroke to harvest credentials is the defining behavior of a keylogger, a specialized form of spyware. The other options describe malware with entirely different symptoms - boot-time infection, CPU mining load, and network self-propagation, respectively.$q$),

($q$a2-q-727$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$mcq$q$,3,
 $q$After a technician reformats and reinstalls Windows on an infected PC, the same infection reappears the very next time the machine boots, and a scan immediately after reinstall again flags a compromised system. What is the most likely explanation?$q$,
 $q$["The malware lives in the Master Boot Record outside the reformatted OS partition and needs its own repair", "The reinstall media itself is corrupted", "The user's monitor needs to be replaced", "The network cable is faulty"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A boot sector virus infects the MBR/boot code, which sits outside the OS partition that a standard reinstall reformats - so the infection survives and reinfects the clean install on the next boot. Repairing or overwriting the boot sector (from rescue media, before the drive boots normally) is required in addition to reinstalling the OS.$q$),

($q$a2-q-728$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$mcq$q$,2,
 $q$Which statement correctly distinguishes a worm from a virus?$q$,
 $q$["A worm self-propagates across a network without needing a host file or user action; a virus needs a host file and a user to execute it", "A worm needs a host file to spread; a virus spreads on its own across a network", "They are two names for the same type of malware", "A worm only affects mobile devices while a virus only affects desktops"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The key distinction is self-sufficiency: a worm can spread on its own by exploiting a vulnerability or weak credential across a network, while a virus is dependent on a host file and typically needs a user to open or run something for it to activate and replicate.$q$),

($q$a2-q-729$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$multi$q$,2,
 $q$Which of the following are commonly recognized signs of a ransomware infection? (Select all that apply.)$q$,
 $q$["Files renamed with an unfamiliar extension", "A ransom note file appearing in affected folders", "Inability to open documents that opened fine yesterday", "The keyboard layout switching to a different language", "Deleted or inaccessible shadow copies/backups"]$q$::jsonb,
 $q$[0, 1, 2, 4]$q$::jsonb,
 $q$Renamed/encrypted files, a ransom note, sudden inability to open documents, and the attacker removing shadow copies or backups to block easy recovery are all textbook ransomware indicators. A keyboard layout change is an unrelated, harmless setting and isn't a malware symptom.$q$),

($q$a2-q-730$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$multi$q$,2,
 $q$Which of the following are appropriate first actions when ransomware is discovered actively encrypting files on a workstation? (Select all that apply.)$q$,
 $q$["Disconnect the workstation from the network immediately to stop it spreading", "Check whether clean, tested backups exist before deciding on next steps", "Continue using the workstation normally while investigating later", "Pay the ransom immediately without consulting anyone", "Preserve the system state for review rather than immediately wiping it"]$q$::jsonb,
 $q$[0, 1, 4]$q$::jsonb,
 $q$Isolating the host stops the ransomware from reaching other systems over the network, checking backups informs whether recovery without paying is possible, and preserving the system state supports investigation and recovery planning. Continuing to use the infected machine lets encryption keep spreading, and paying immediately without any policy or backup check skips the steps that might make payment unnecessary.$q$),

($q$a2-q-731$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$matching$q$,2,
 $q$Match each malware type to the trait that defines it.$q$,
 $q${"left": ["Trojan", "Rootkit", "Boot sector virus", "Cryptomining malware"], "right": ["Uses the infected device's processing power to mine cryptocurrency without consent", "Hides at the OS/kernel level to conceal itself and other malware from detection", "Disguises itself as legitimate software to trick a user into installing it", "Infects the Master Boot Record so it loads before the operating system does"]}$q$::jsonb,
 $q$[2, 1, 3, 0]$q$::jsonb,
 $q$Each malware type is defined by a distinct mechanism: a trojan relies on deception to get installed, a rootkit hides at the kernel level, a boot sector virus loads ahead of the OS from the MBR, and cryptomining malware silently consumes processing power for the attacker's benefit.$q$),

($q$a2-q-732$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$ordering$q$,3,
 $q$A technician suspects a workstation is actively infected with malware that is spreading across the network. Order the containment and remediation steps that should follow, from first to last.$q$,
 $q$["Run an updated, offline (rescue-media) anti-malware scan", "Quarantine or remove any threats the scan detects", "Isolate the workstation from the network", "Restore any corrupted or encrypted files from a clean backup", "Monitor the system afterward for signs of recurrence"]$q$::jsonb,
 $q$[2, 0, 1, 3, 4]$q$::jsonb,
 $q$Isolating the host first stops further spread before anything else is attempted; scanning with updated/offline tools then detects the threats, which are quarantined or removed; only after the system is clean should corrupted files be restored from backup, followed by ongoing monitoring to catch any recurrence.$q$),

($q$a2-q-733$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$mcq$q$,2,
 $q$A newly discovered piece of malware has no published signature yet because no vendor has analyzed a sample. Which detection approach is most likely to still catch it?$q$,
 $q$["Heuristic/behavior-based detection watching for suspicious actions", "Signature-based detection alone", "Waiting for the vendor to release a definition update before scanning", "Disabling the antivirus until a signature exists"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Heuristic/behavior-based detection flags suspicious activity patterns (like rapid mass file encryption) rather than matching a known fingerprint, so it can catch malware that has no signature yet. Pure signature-based detection is blind to anything not already in its database, and waiting for or disabling protection leaves the system exposed in the meantime.$q$),

($q$a2-q-734$q$,$q$aplus2$q$,2,$q$2.3$q$,$q$mcq$q$,1,
 $q$A technician wants to examine a file flagged as suspicious without letting it run or spread to other files, while still keeping it available in case the detection turns out to be a false positive. Which antivirus action accomplishes this?$q$,
 $q$["Quarantine the file", "Permanently delete the file immediately", "Rename the file's extension to .txt", "Move the file to a shared network folder for others to check"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Quarantining isolates the file in a restricted location where it cannot execute, without immediately destroying it - preserving the option to restore it if it's a false positive or examine it further. Deleting it removes that option, renaming the extension doesn't neutralize an executable payload, and sharing it risks spreading the infection.$q$),

-- ===================== 2.4 Social engineering, threats, vulnerabilities =====================

($q$a2-q-735$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$mcq$q$,1,
 $q$The company's CFO receives a highly personalized email, referencing a real acquisition deal by name and the actual outside law firm involved, urgently requesting a wire transfer before end of day. What specific type of attack is this?$q$,
 $q$["Whaling", "Smishing", "Dumpster diving", "Tailgating"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Whaling is phishing precisely targeted at a high-value individual like a CFO, using researched, specific details to make the urgent request convincing. Smishing is text-message phishing, dumpster diving is trash-based information gathering, and tailgating is a physical entry technique - none match an email targeting an executive.$q$),

($q$a2-q-736$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$mcq$q$,2,
 $q$An employee gets a phone call from someone claiming to be from 'corporate IT,' who sounds knowledgeable, references a real recent outage, and asks the employee to read back a one-time code to 'verify their identity' before it expires. Which channel-defined social engineering technique is this?$q$,
 $q$["Vishing", "Smishing", "Pharming", "Dumpster diving"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A phone call used to extract sensitive information under a false pretext is vishing (voice phishing). Smishing is the text-message equivalent, pharming redirects web traffic without any call or message at all, and dumpster diving involves physically searching discarded materials.$q$),

($q$a2-q-737$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$mcq$q$,1,
 $q$An employee receives a text message that appears to be from their bank, warning of suspicious account activity and providing a link to 'verify' their login. Which term specifically describes this SMS-based attack?$q$,
 $q$["Smishing", "Vishing", "Whaling", "Pretexting"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Smishing specifically refers to phishing delivered via SMS text message. Vishing is voice-call-based, whaling targets executives regardless of channel, and pretexting describes fabricating a false scenario rather than the delivery channel itself.$q$),

($q$a2-q-738$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$mcq$q$,2,
 $q$A user types their bank's URL directly into the browser's address bar - no email, no link, no text message involved - yet lands on a fraudulent site that captures their login credentials. What attack does this describe?$q$,
 $q$["Pharming", "Phishing", "Smishing", "Tailgating"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Pharming redirects even a correctly typed request to a fraudulent site, typically through DNS poisoning or a tampered hosts file, requiring no deceptive message at all. Phishing and smishing both rely on a deceptive email or text to lure the click, and tailgating is a physical-access technique, unrelated to web traffic.$q$),

($q$a2-q-739$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$mcq$q$,1,
 $q$Sensitive customer account printouts were later recovered, unshredded, from the office's public recycling bin and used for identity theft. What social engineering technique exploited this?$q$,
 $q$["Dumpster diving", "Shoulder surfing", "Evil twin", "Whaling"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Dumpster diving is retrieving sensitive information from discarded trash or recycling - exactly what happened here. Shoulder surfing involves visually observing input in real time, an evil twin is a rogue Wi-Fi network, and whaling is executive-targeted phishing - none involve searching discarded materials.$q$),

($q$a2-q-740$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$multi$q$,2,
 $q$Which of the following describe an on-path (man-in-the-middle) attack scenario? (Select all that apply.)$q$,
 $q$["An attacker sets up a rogue Wi-Fi access point that relays and inspects victims' traffic", "An attacker uses ARP spoofing on the LAN to route a victim's traffic through the attacker's machine", "An attacker watches a coworker type their PIN from across the room", "An attacker searches an office dumpster for discarded documents", "An attacker intercepts and relays a login session between a user and a server without either noticing"]$q$::jsonb,
 $q$[0, 1, 4]$q$::jsonb,
 $q$A rogue AP relaying traffic, ARP spoofing that reroutes LAN traffic through an attacker, and intercepting/relaying a session between two parties are all on-path/man-in-the-middle scenarios - the attacker sits on the communication path. Watching someone type a PIN is shoulder surfing, and searching a dumpster is dumpster diving; neither involves intercepting a communication channel.$q$),

($q$a2-q-741$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$mcq$q$,3,
 $q$An online retailer's site becomes completely unreachable after a sudden flood of traffic arrives simultaneously from thousands of different IP addresses belonging to compromised IoT devices around the world. Why is this harder to stop than blocking traffic from a single misbehaving IP address?$q$,
 $q$["Because it's a distributed denial of service (DDoS) attack, and there's no single source to block", "Because it's a zero-day exploit that antivirus can't detect", "Because it's a brute-force password attack against the web server", "Because it's a case of DNS pharming affecting only a few users"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The defining feature of a DDoS attack is that traffic arrives from many distributed sources at once (often a botnet), so blocking one IP address does almost nothing - there's no single point to filter. This scenario has nothing to do with an unpatched vulnerability, password guessing, or DNS redirection.$q$),

($q$a2-q-742$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$multi$q$,2,
 $q$Which of the following are effective defenses against a brute-force login attack? (Select all that apply.)$q$,
 $q$["Locking an account after a small number of failed attempts", "Rate-limiting login attempts from a given source", "Requiring multifactor authentication in addition to a password", "Disabling the login page's firewall to speed up legitimate logins", "Publishing the password policy publicly so users know the rules"]$q$::jsonb,
 $q$[0, 1, 2]$q$::jsonb,
 $q$Account lockouts, rate limiting, and MFA all directly blunt a brute-force attack by making rapid, repeated guessing impractical or insufficient on its own. Disabling a firewall removes a protective control rather than adding one, and publishing the password policy doesn't stop an attacker from simply trying combinations.$q$),

($q$a2-q-743$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$mcq$q$,3,
 $q$A vendor discloses that attackers have been actively exploiting a flaw in widely used software for weeks before the vendor even knew the flaw existed, meaning no patch was available during that window. What is this flaw called?$q$,
 $q$["A zero-day vulnerability", "A brute-force vulnerability", "A pharming vulnerability", "A tailgating vulnerability"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A zero-day vulnerability is one being exploited before the vendor is aware of it or has released a patch - the vendor has had zero days to respond. The other terms describe unrelated attack techniques (password guessing, DNS-based redirection, and physical entry), not a class of unpatched software flaw.$q$),

($q$a2-q-744$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$matching$q$,2,
 $q$Match each social engineering technique to the trait that defines it.$q$,
 $q${"left": ["Vishing", "Smishing", "Whaling", "Pharming"], "right": ["Redirects a victim to a fraudulent site without any deceptive email or link at all", "Phishing delivered over a phone call", "Phishing narrowly targeted at senior executives using tailored, researched detail", "Phishing delivered by SMS text message"]}$q$::jsonb,
 $q$[1, 3, 2, 0]$q$::jsonb,
 $q$Each technique is distinguished by its channel or target: vishing is phone-based, smishing is SMS-based, whaling is phishing aimed specifically at executives, and pharming needs no deceptive message at all since it redirects even a correctly typed request.$q$),

($q$a2-q-745$q$,$q$aplus2$q$,2,$q$2.4$q$,$q$ordering$q$,2,
 $q$An employee realizes, right after entering their password, that the email and link they just clicked were a phishing attempt. Order the steps they and the security team should take, from first to last.$q$,
 $q$["Report the phishing email and the compromised account to the security/IT team", "Change the compromised account's password immediately", "Monitor the account for any unauthorized activity", "Verify or enable multifactor authentication on the account"]$q$::jsonb,
 $q$[1, 3, 0, 2]$q$::jsonb,
 $q$Changing the compromised password first limits how long the stolen credential remains useful, confirming MFA is active adds a second barrier immediately afterward, reporting to security/IT ensures the organization can respond (block the sender, check other targets), and ongoing monitoring catches any activity that already slipped through before the password was changed.$q$);


insert into public.flashcards (id, cert, deck, domain, objective, front, back) values

-- ===================== 2.1 Physical security & logical security concepts =====================

($q$a2-f-700$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$How do electronic/smart door locks improve on a traditional keyed deadbolt for a server room?$q$,
 $q$They authenticate with a PIN code, badge, or biometric read instead of a physical key, so access can be logged per user, granted or revoked instantly without rekeying, and scheduled by time of day; a lost key on a mechanical deadbolt requires rekeying the whole lock to stay secure.$q$),

($q$a2-f-701$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$What is a cable lock (Kensington-style lock) used for, and what does it not protect against?$q$,
 $q$It threads through a laptop's or desktop's security slot and around a fixed object to deter opportunistic theft in a shared space like a lab or lobby. It does not stop a determined attacker with cutting tools, nor does it protect the data on the device - that still needs disk encryption.$q$),

($q$a2-f-702$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$What trade-off do biometric locks (fingerprint, iris, facial recognition) balance, and what are the two error types called?$q$,
 $q$They balance the false acceptance rate (an unauthorized person is wrongly let in) against the false rejection rate (an authorized person is wrongly denied). Tightening the sensor to cut false acceptances usually raises false rejections, and vice versa - there's no setting that eliminates both.$q$),

($q$a2-f-703$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$What security risk do proximity badges and key fobs share, and how is it usually mitigated?$q$,
 $q$Their RFID signal can potentially be captured and cloned by a nearby skimmer, letting an attacker impersonate the badge. Pairing the badge with a second factor, such as a PIN pad or a guard visually checking the badge photo, prevents a cloned credential alone from granting access.$q$),

($q$a2-f-704$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$What are bollards, and what threat are they designed to stop?$q$,
 $q$Short, sturdy posts installed in front of an entrance or sensitive area. They stop a vehicle from being driven into a building - either an accident or a deliberate ramming attack - a threat that badge readers and mantraps do nothing about.$q$),

($q$a2-f-705$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$How does a security guard's value differ from a camera's for physical security?$q$,
 $q$A guard can challenge a suspicious person, verify identity in real time, and physically intervene or call for help. A camera is mainly a detective control - useful for recording evidence and deterring by its visible presence, but it does not stop anything from happening as it happens.$q$),

($q$a2-f-706$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$Is video surveillance (CCTV) a preventive or a detective control, and why does that matter?$q$,
 $q$It's primarily detective: it records what happened for later review and investigation, and its visible presence has some deterrent effect, but it does not physically stop an intrusion in progress. That's why cameras are paired with preventive controls like locks, guards, and mantraps.$q$),

($q$a2-f-707$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$What do motion sensors and alarm systems add to a facility's physical security once a barrier is bypassed?$q$,
 $q$They detect movement or an opened door/window after the perimeter has already been breached and trigger an alert (local siren, lighting, or a notification to a monitoring service), buying time for a guard or police response - a layer that activates precisely where locks and fences have already failed.$q$),

($q$a2-f-708$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$What does the principle of least privilege mean when assigning access to a shared network resource?$q$,
 $q$Every account gets only the access it needs to do its job, and nothing more - a marketing user isn't granted write access to the finance share just because it's convenient. This limits how much damage a compromised or careless account can cause.$q$),

($q$a2-f-709$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$What is an access control list (ACL) in the context of logical security, and what does it restrict?$q$,
 $q$A list attached to a resource (a file, folder, or network device) that specifies which users or groups may access it and what they may do - read, write, execute, or full control. It's the logical-security counterpart to a physical door lock, enforced by the operating system or device rather than a mechanism you can touch.$q$),

($q$a2-f-710$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.1$q$,
 $q$RBAC$q$,
 $q$Role-Based Access Control - permissions are assigned to job roles rather than individual users, so access changes automatically when someone changes roles instead of requiring per-user reconfiguration.$q$),

($q$a2-f-711$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.1$q$,
 $q$SSO$q$,
 $q$Single Sign-On - one authentication grants access to multiple independent systems/applications without re-entering credentials for each, reducing password fatigue but making that one credential a higher-value target.$q$),

($q$a2-f-712$q$,$q$aplus2$q$,$q$feynman$q$,2,$q$2.1$q$,
 $q$Explain why layering multiple physical security controls (defense in depth) protects a data center better than relying on any single strong control.$q$,
 $q$Model answer: No single control is perfect - a lock can be picked, a badge can be cloned, a guard can be distracted. Layering means an attacker who defeats one control still has to get past the next: a fence and bollards stop vehicles, a badge reader and mantrap limit entry to one authenticated person at a time, a guard verifies identity visually, cameras record everything for accountability, and a locked server cabinet protects the equipment even if someone reaches the room. Because the layers use different mechanisms, one flaw (a stolen badge, say) doesn't cascade into full access - the attacker still faces the guard and the cabinet lock.$q$),

($q$a2-f-713$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.1$q$,
 $q$Why might a company still lock individual server racks/cabinets inside an already access-controlled server room?$q$,
 $q$Badges and mantraps control who enters the room, but anyone who legitimately gets in - a cleaner, a delivery person, an escorted visitor, or even an insider - could otherwise touch every machine. A rack lock adds a second, independent barrier around the equipment itself, so entering the room isn't the same as being able to open a chassis or unplug a drive.$q$),

-- ===================== 2.2 Wireless/authentication security =====================

($q$a2-f-714$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$What does WPA3's SAE (Simultaneous Authentication of Equals) handshake improve over WPA2-PSK's four-way handshake?$q$,
 $q$SAE (also called the dragonfly handshake) prevents an attacker from capturing a handshake and brute-forcing the passphrase offline, and it provides forward secrecy so that even if the passphrase is later discovered, previously captured traffic still can't be decrypted. WPA2's four-way handshake exposed data that made offline dictionary attacks and the KRACK replay attack possible.$q$),

($q$a2-f-715$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$What role does a RADIUS server play in enterprise Wi-Fi authentication (WPA2/WPA3-Enterprise)?$q$,
 $q$RADIUS acts as the AAA server: it authenticates each user's individual credentials (rather than a single shared passphrase), authorizes what they're allowed to access, and logs accounting data about the session. Because credentials are per-user, revoking one employee's access never requires re-keying everyone else's devices.$q$),

($q$a2-f-716$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$What is 802.1X, and what does it block until authentication succeeds?$q$,
 $q$802.1X is port-based network access control: a switch port or wireless association stays in an unauthenticated state, passing only EAP authentication traffic, until the client's credentials are validated (typically against a RADIUS server). Only after that does the port or association open up to normal network traffic.$q$),

($q$a2-f-717$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$What is EAP, and how does it relate to protocols like EAP-TLS?$q$,
 $q$EAP (Extensible Authentication Protocol) is a framework, not a single method - it defines how authentication conversations are carried, and specific methods plug into it. EAP-TLS, for example, authenticates using digital certificates instead of a password, making it one of the strongest EAP methods used with 802.1X.$q$),

($q$a2-f-718$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$How does TACACS+ differ from RADIUS for authenticating administrators to network devices?$q$,
 $q$TACACS+ encrypts the entire packet (RADIUS encrypts only the password), and it separates authentication, authorization, and accounting into distinct steps rather than bundling them, which lets it authorize individual commands on a device. That granularity is why TACACS+ is typically used for administrative logins to routers and switches, while RADIUS is more common for general network/Wi-Fi access.$q$),

($q$a2-f-719$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$What actually happens, from an authentication perspective, when a Windows computer joins an Active Directory domain?$q$,
 $q$The computer is issued its own computer account object in AD with its own password (rotated automatically, typically every 30 days), establishing a secure channel between the machine and a domain controller. This machine identity - separate from any user's identity - is what allows Kerberos and Group Policy to trust the computer itself, not just whoever happens to be logged into it.$q$),

($q$a2-f-720$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$How does Kerberos authentication avoid sending a user's password across the network every time they access a resource?$q$,
 $q$After an initial login, Kerberos issues the user a time-limited ticket-granting ticket (TGT) from a key distribution center. That ticket - not the password - is presented to request access to individual services, and each service ticket expires, which limits how long a stolen ticket remains useful.$q$),

($q$a2-f-721$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$What does LDAP let a domain-joined application or client do?$q$,
 $q$LDAP (Lightweight Directory Access Protocol) lets clients query and authenticate against a directory service like Active Directory - looking up users, groups, and computer objects - which is the underlying mechanism many single sign-on and centralized authentication systems rely on.$q$),

($q$a2-f-722$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$Why is an SMS-delivered one-time code considered a weaker MFA factor than an authenticator app or hardware security key?$q$,
 $q$SMS codes can be intercepted through SIM-swapping (an attacker convinces a carrier to port the victim's number) or SS7 network weaknesses, neither of which requires touching the victim's phone. Authenticator apps generate codes locally on the device, and hardware security keys (like FIDO2 keys) never transmit a reusable secret at all, making both harder to intercept remotely.$q$),

($q$a2-f-723$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$What makes passwordless authentication (Windows Hello, FIDO2 passkeys) resistant to phishing in a way passwords aren't?$q$,
 $q$There's no shared secret typed into a login page for an attacker to capture - the credential is a cryptographic key pair tied to the specific device and unlocked locally by a PIN or biometric, and it's bound to the legitimate site's domain so it won't authenticate to a look-alike phishing page at all.$q$),

($q$a2-f-724$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.2$q$,
 $q$What does certificate-based Wi-Fi/network authentication (EAP-TLS) provide that a shared PSK cannot?$q$,
 $q$Each device presents its own certificate issued by a trusted certificate authority, so access can be revoked for one device without changing a passphrase shared by everyone else, and there's no passphrase to leak, guess, or phish in the first place.$q$),

($q$a2-f-725$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.2$q$,
 $q$RADIUS$q$,
 $q$Remote Authentication Dial-In User Service - an AAA protocol that centralizes authentication, authorization, and accounting for network/Wi-Fi logins, commonly paired with 802.1X.$q$),

($q$a2-f-726$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.2$q$,
 $q$PKI$q$,
 $q$Public Key Infrastructure - the certificates, certificate authorities, and key-management processes that let systems authenticate each other and encrypt traffic using public/private key pairs instead of shared secrets.$q$),

($q$a2-f-727$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.2$q$,
 $q$TOTP$q$,
 $q$Time-based One-Time Password - a code generated locally by an authenticator app from a shared secret and the current time, changing every 30-60 seconds; a stronger MFA factor than SMS since nothing is transmitted for an attacker to intercept.$q$),

($q$a2-f-728$q$,$q$aplus2$q$,$q$feynman$q$,2,$q$2.2$q$,
 $q$Explain step-by-step what happens when a laptop connects to an enterprise Wi-Fi network secured with WPA2/WPA3-Enterprise, 802.1X, and a RADIUS server.$q$,
 $q$Model answer: The laptop associates with the access point, but 802.1X keeps the port 'unauthorized' so only EAP traffic passes. The access point acts as the go-between, forwarding the laptop's EAP conversation (e.g., EAP-TLS with a certificate, or a username/password method) to a RADIUS server. RADIUS validates the credential or certificate against the directory, and if it succeeds, sends an Access-Accept back through the access point, which then opens the port to normal traffic and encrypts the session using per-user keys derived during that exchange. If it fails, the port stays closed and the client never reaches the network beyond the authentication exchange.$q$),

-- ===================== 2.3 Malware types and detection/removal =====================

($q$a2-f-729$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$How does a virus differ from a worm in how it spreads?$q$,
 $q$A virus attaches to a host file or program and needs a user to run/open that host (an infected attachment, a cracked executable) to activate and replicate. A worm is self-contained and self-propagating - it can spread across a network on its own, exploiting a vulnerability or weak credential, without any user action or host file.$q$),

($q$a2-f-730$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$What defines a trojan, and why doesn't it self-replicate like a virus or worm?$q$,
 $q$A trojan disguises itself as legitimate or desirable software (a free utility, a cracked game, a fake invoice attachment) to trick the user into installing it voluntarily. It relies entirely on that deception to spread from user to user - it has no built-in mechanism to copy itself the way a virus or worm does.$q$),

($q$a2-f-731$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$What does spyware do, and how does a keylogger relate to it?$q$,
 $q$Spyware covertly monitors a user's activity - browsing habits, screenshots, even camera/microphone access - and quietly sends that data to an attacker without consent. A keylogger is a specialized form of spyware focused specifically on capturing every keystroke typed, which is how it harvests usernames, passwords, and other sensitive input.$q$),

($q$a2-f-732$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$Why is a boot sector virus especially hard to remove using antivirus software running normally inside the infected operating system?$q$,
 $q$It infects the Master Boot Record (or the equivalent boot code on GPT/UEFI systems), so it loads and can take control before the operating system - and its antivirus - ever starts. Removing it typically requires booting from external rescue media or a boot-repair tool that can access and repair the boot sector from outside the compromised OS.$q$),

($q$a2-f-733$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$What is cryptomining malware (cryptojacking), and what symptom usually gives it away?$q$,
 $q$It secretly uses the infected device's CPU/GPU cycles to mine cryptocurrency for the attacker, without the owner's knowledge or consent. The telltale symptom is sustained high CPU/GPU usage and system slowdown or heat with no obvious cause - often traced to an unfamiliar background process.$q$),

($q$a2-f-734$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$What makes fileless malware harder for traditional antivirus to catch?$q$,
 $q$It operates in memory and abuses legitimate, already-trusted tools on the system (such as PowerShell or Windows Management Instrumentation) instead of writing a malicious executable file to disk. Because there's no new file to scan or match against a signature, it can evade purely signature-based detection.$q$),

($q$a2-f-735$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$What's the difference between signature-based and heuristic/behavior-based malware detection?$q$,
 $q$Signature-based detection matches a file against a database of known malware fingerprints - fast and accurate for known threats, but blind to anything brand-new. Heuristic/behavior-based detection instead watches for suspicious actions (a program trying to encrypt many files rapidly, for example), which can catch unknown or zero-day malware at the cost of more false positives.$q$),

($q$a2-f-736$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$What are the common signs that a system has been hit by ransomware?$q$,
 $q$Files suddenly renamed with an unfamiliar extension, a ransom note file appearing in affected folders demanding payment (often in cryptocurrency), an inability to open documents that worked fine before, and deleted or inaccessible shadow copies/backups the attacker removed to block easy recovery.$q$),

($q$a2-f-737$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$What is Windows Defender Offline (or similar bootable rescue media) used for, and why would a technician reach for it?$q$,
 $q$It boots a minimal, trusted scanning environment from outside the installed Windows OS, so it can detect and remove malware - like rootkits or boot sector viruses - that actively hides from or disables antivirus while the infected OS is running normally.$q$),

($q$a2-f-738$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$What does 'quarantine' mean when antivirus software flags a suspicious file?$q$,
 $q$The file is isolated into a restricted location where it can't execute or spread, but it isn't immediately deleted - preserving it for review in case it's a false positive, or for later forensic analysis, while still neutralizing the immediate risk.$q$),

($q$a2-f-739$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$How does antivirus scope typically differ from a broader anti-malware/endpoint protection product?$q$,
 $q$Traditional antivirus historically focused on signature-matching known viruses. Modern anti-malware/endpoint protection suites extend that to spyware, ransomware, PUPs, and often add heuristic/behavioral monitoring and cloud-based reputation checks, covering a much wider range of threats than virus signatures alone.$q$),

($q$a2-f-740$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.3$q$,
 $q$RAT$q$,
 $q$Remote Access Trojan - a trojan that, once installed, gives an attacker hidden remote control of the infected machine (files, camera, keystrokes) while appearing to be legitimate software.$q$),

($q$a2-f-741$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.3$q$,
 $q$Why can't a full OS reinstall alone guarantee removal of a boot sector infection?$q$,
 $q$Reinstalling the operating system typically reformats the OS partition, but a boot sector virus lives in the Master Boot Record or boot code outside that partition, so it can survive the reinstall and reinfect the freshly installed system the next time the drive boots - the boot record itself has to be repaired or overwritten separately (e.g., with a boot-repair tool from rescue media).$q$),

($q$a2-f-742$q$,$q$aplus2$q$,$q$feynman$q$,2,$q$2.3$q$,
 $q$Explain why a rootkit or boot sector virus often can't be reliably detected or removed by antivirus software running normally inside the infected operating system, and what approach actually works.$q$,
 $q$Model answer: A rootkit embeds itself at the kernel/OS level and can intercept the very system calls antivirus software uses to list files and processes, effectively lying to the scanner about what's really running. A boot sector virus goes a step further and loads before the OS - and its antivirus - even starts. In both cases, the infection has more control over the operating environment than the security software trying to inspect it, so a scan from inside that same compromised OS can't be trusted. The fix is to scan from a position of higher trust than the infection: booting from external rescue media or an offline scanning tool that never lets the compromised OS (or its kernel-level rootkit) load and interfere in the first place.$q$),

-- ===================== 2.4 Social engineering, threats, vulnerabilities =====================

($q$a2-f-743$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What is whaling, and how does it differ from ordinary phishing?$q$,
 $q$Whaling is phishing specifically targeted at high-value individuals - typically executives or senior finance staff - using research-driven, highly tailored pretexts (real deal names, vendor relationships, urgent wire-transfer requests). Ordinary phishing casts a wide net with generic bait; whaling is narrow and personalized to make the deception far more convincing.$q$),

($q$a2-f-744$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What is vishing?$q$,
 $q$Voice phishing - a social engineering attack carried out over a phone call, where the caller impersonates a trusted party (IT support, a bank, a government agency) to pressure the victim into revealing information or taking an action, such as resetting a password or making a payment.$q$),

($q$a2-f-745$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What is smishing?$q$,
 $q$SMS phishing - a phishing attack delivered by text message, typically containing a malicious link or a request to reply with sensitive information, often impersonating a bank, delivery service, or other trusted sender.$q$),

($q$a2-f-746$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What is pharming, and how does it differ from a typical phishing email?$q$,
 $q$Pharming redirects a victim from a legitimate, correctly typed URL to a fraudulent look-alike site - often through DNS poisoning or a tampered hosts file - without needing any deceptive email or link at all. Ordinary phishing relies on tricking the victim into clicking a bad link; pharming intercepts even a correctly typed request.$q$),

($q$a2-f-747$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What is pretexting?$q$,
 $q$Inventing a fabricated scenario or false identity - posing as a new remote employee, an auditor, or IT support with a plausible backstory - to manipulate a target into divulging information or granting access they otherwise wouldn't. It's the story/setup that makes many other social engineering techniques (vishing calls, in-person impersonation) convincing.$q$),

($q$a2-f-748$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What is dumpster diving, and what does it protect against ignoring?$q$,
 $q$Searching through discarded trash or recycling for sensitive information - printed records, old invoices, sticky notes with passwords, or improperly wiped hardware. It's a reminder that document shredding and secure disposal policies matter just as much as digital security controls.$q$),

($q$a2-f-749$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What is an on-path (man-in-the-middle) attack?$q$,
 $q$An attacker secretly positions themselves between two communicating parties - for example, via a rogue Wi-Fi access point or ARP spoofing on a LAN - and can intercept, read, or alter traffic while both legitimate parties believe they're communicating directly with each other.$q$),

($q$a2-f-750$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$How does a DDoS attack differ from a plain DoS attack, and why does that matter for defense?$q$,
 $q$A DoS attack overwhelms a target's resources or availability from a single source, which can usually be blocked by filtering that one source. A DDoS attack floods the target from many distributed sources at once - often a botnet of compromised devices - making simple IP-based blocking far less effective since there's no single address to block.$q$),

($q$a2-f-751$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What's the difference between a brute-force attack and a dictionary attack on a password?$q$,
 $q$A brute-force attack tries every possible character combination until one works - effective but slow against long/complex passwords. A dictionary attack instead tries a curated list of likely or previously leaked passwords, which is much faster when the actual password is a common word or reused credential. Account lockouts, rate limiting, and MFA blunt both.$q$),

($q$a2-f-752$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What is a zero-day vulnerability, and why does it matter that no patch exists yet?$q$,
 $q$A zero-day is a software flaw that is unknown to (or unpatched by) the vendor at the time it's being actively exploited - the vendor has had 'zero days' to fix it. Because no official patch is available, standard patch-management defenses don't help yet, which is why layered controls like network segmentation and behavior-based detection matter as a stopgap.$q$),

($q$a2-f-753$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.4$q$,
 $q$What common psychological tactics do most social engineering attacks rely on, regardless of the delivery channel (email, phone, in person)?$q$,
 $q$A manufactured sense of urgency, impersonation of authority or a trusted brand, appeals to fear or threatened consequences, and requests to bypass normal verification 'just this once.' Recognizing these tactics is often more reliable defense than trying to spot every specific technique by name.$q$),

($q$a2-f-754$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.4$q$,
 $q$DDoS$q$,
 $q$Distributed Denial of Service - an attack that floods a target with traffic from many distributed sources (often a botnet), overwhelming its availability in a way that's much harder to block than a single-source attack.$q$),

($q$a2-f-755$q$,$q$aplus2$q$,$q$feynman$q$,2,$q$2.4$q$,
 $q$Explain why an on-path (man-in-the-middle) attack can succeed even when a victim is logging into a website that shows a valid-looking login page, and what technical control helps detect it.$q$,
 $q$Model answer: An on-path attacker doesn't need to fake the whole website convincingly - they just need to sit on the communication path (a rogue Wi-Fi AP, ARP spoofing on the LAN, or a compromised DNS response) and relay or subtly alter traffic between the victim and the real (or a near-identical) site. The victim can be looking at a page that appears completely normal because, in some variants, the attacker is simply forwarding the real site's content while capturing credentials as they pass through, or serving a certificate that isn't actually the site's own. Verifying that the browser shows a valid TLS certificate issued to the correct domain (not just 'a padlock') and that the address bar shows the expected hostname helps detect the tampering, since a genuine certificate for the real domain is very hard for an on-path attacker to forge without also compromising a certificate authority.$q$);
