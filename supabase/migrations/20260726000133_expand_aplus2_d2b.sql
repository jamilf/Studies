-- A+ Core 2 (220-1102) Domain 2 (Security) expansion, part B: objectives 2.5-2.8.
-- Adds questions a2-q-800..850 (51) and flashcards a2-f-800..862 (63):
--   2.5 Windows OS security settings (NTFS/share, BitLocker, EFS, UAC,
--       Windows Defender Firewall, Group Policy security)   -> 11 questions, 13 flashcards
--   2.6 Workstation security best practices (password policy,
--       account management, screen locks, encryption, autorun) -> 13 questions, 16 flashcards
--   2.7 Mobile/embedded device security (screen locks, remote
--       wipe, locator apps, OS updates, failed-login wipe)     -> 13 questions, 17 flashcards
--   2.8 Data destruction and disposal methods                  -> 14 questions, 17 flashcards
-- Acronym-deck note: NTFS and UAC already exist as domain-2 acronym cards, so the
-- new acronym cards here are EFS, TPM (2.5), MDM, IMEI, OTA (2.7) and SED (2.8).

insert into public.questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ===================== 2.5 Windows OS security settings =====================

($q$a2-q-800$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$mcq$q$,1,
 $q$A finance analyst right-clicks a single spreadsheet, opens Properties > Advanced, and selects "Encrypt contents to secure data" on an NTFS volume, without ever enabling BitLocker anywhere on the machine. Which Windows feature is being used, and at what level does it operate?$q$,
 $q$["Encrypting File System (EFS), which encrypts individual files/folders tied to the user's certificate", "BitLocker, which encrypts the entire volume", "Windows Defender Firewall, which filters network traffic", "A Group Policy Object that manages domain-wide settings"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$EFS is file/folder-level encryption on NTFS, tied to the current user's personal certificate and key - distinct from BitLocker's whole-volume encryption, which isn't tied to any individual user. The right-click "Encrypt contents to secure data" checkbox is the classic EFS entry point.$q$),

($q$a2-q-801$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$mcq$q$,2,
 $q$An employee copies an EFS-encrypted file from their NTFS-formatted work laptop onto a USB drive formatted as FAT32. What happens to the file's encryption?$q$,
 $q$["It remains encrypted, because EFS protection travels with the file regardless of file system", "It is decrypted automatically as part of the copy, because FAT32 has no equivalent structure to carry EFS protection", "The copy silently fails because FAT32 rejects encrypted files", "BitLocker automatically re-encrypts the file once it lands on the FAT32 drive"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$EFS encryption is implemented as NTFS-specific metadata; FAT32 has no concept of per-file encryption, so Windows decrypts the file as part of the copy (assuming the user has read access) and only the plaintext version ends up on the removable drive - a common oversight when moving "protected" files off a machine.$q$),

($q$a2-q-802$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$mcq$q$,2,
 $q$A user belongs to both the "Sales" group, which has NTFS Modify access to a folder, and the "Contractors" group, which has an explicit NTFS Deny on that same folder. What is the user's effective NTFS permission?$q$,
 $q$["Modify, because Allow permissions from any group membership are combined", "No access, because an explicit Deny always overrides an Allow from any group", "Read-only, as an automatic compromise between the two", "Full Control, since Deny only ever applies to share permissions"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Within NTFS, Allow permissions from different group memberships are normally cumulative, but an explicit Deny takes precedence over any Allow no matter which group grants it - the user is blocked from the folder entirely.$q$),

($q$a2-q-803$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$mcq$q$,2,
 $q$A file with custom NTFS permissions is moved (cut and paste) to a different folder on the same NTFS volume. What happens to its permissions?$q$,
 $q$["The file keeps its original permissions, since a move within the same volume is really just a pointer change", "The file inherits the destination folder's permissions, exactly as if it were a brand-new file", "All permissions are stripped and the file becomes accessible to everyone", "The file's permissions are merged with the destination folder's permissions"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Moving a file within the same NTFS volume doesn't physically relocate the data - it changes the file system's pointer to it - so Windows keeps the file's existing permissions intact. Copying a file (or moving it to a different volume, which is really a copy-then-delete) instead makes it inherit the destination folder's permissions as a new object.$q$),

($q$a2-q-804$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$mcq$q$,1,
 $q$A laptop that normally uses the Private network profile at the office connects to open Wi-Fi at a coffee shop, and Windows automatically switches it to the Public network profile. What does this change primarily do?$q$,
 $q$["Applies a stricter Windows Defender Firewall profile that blocks network discovery and file/printer sharing by default", "Disables the firewall entirely so browsing feels faster", "Automatically enables BitLocker on every drive", "Forces all traffic through a VPN tunnel"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The Public profile assumes the network is untrusted and applies stricter default Windows Defender Firewall rules, blocking discovery and sharing, while Private/Domain profiles relax those defaults for networks considered trustworthy. It doesn't touch disk encryption or route traffic anywhere.$q$),

($q$a2-q-805$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$mcq$q$,2,
 $q$A desktop without a TPM chip needs BitLocker enabled using a USB flash drive as the startup key instead. What must be changed before BitLocker will allow this configuration?$q$,
 $q$["The Require additional authentication at startup Group Policy setting must be enabled to allow BitLocker without a compatible TPM", "The drive must first be converted from NTFS to FAT32", "User Account Control must be disabled", "Windows Defender Firewall must be turned off"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$By default, BitLocker requires a TPM. Enabling it on hardware without one requires changing the relevant Group Policy setting to permit BitLocker without a compatible TPM, after which a USB startup key substitutes for the missing chip.$q$),

($q$a2-q-806$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$mcq$q$,3,
 $q$After a motherboard replacement, a BitLocker-encrypted laptop no longer boots normally and instead prompts for a 48-digit recovery key. Why did this happen?$q$,
 $q$["The replacement motherboard changed the TPM, so BitLocker can no longer automatically unlock using the old TPM-sealed key", "BitLocker detected a virus and locked the drive as a precaution", "The Windows license became invalid after the hardware change", "The hard drive itself was physically damaged during the repair"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$BitLocker's TPM-based unlock is sealed to the specific TPM (and boot configuration) present when the drive was encrypted. A motherboard swap changes that TPM, so automatic unlock fails and the recovery key becomes the only way back in until BitLocker is reconfigured for the new hardware.$q$),

($q$a2-q-807$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$mcq$q$,2,
 $q$On the same PC, an administrator account performing a privileged action sees a simple Yes/No consent prompt, while a standard user attempting the same action is instead prompted to enter an administrator's username and password. Why does UAC behave differently for the two accounts?$q$,
 $q$["An administrator already holds elevated rights and just confirms intent; a standard user holds no such rights and must supply actual admin credentials to proceed", "UAC is malfunctioning and needs to be reinstalled", "Only administrator accounts have UAC enabled at all", "Standard users are always blocked outright with no way to continue"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$UAC's prompt type reflects what's actually needed: an admin account already has the rights and just confirms the action with a consent prompt, while a standard user account has no elevated rights of its own and must supply valid administrator credentials, producing a credential prompt instead.$q$),

($q$a2-q-808$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$multi$q$,2,
 $q$Which of the following statements about NTFS and share permissions are true? (Select all that apply.)$q$,
 $q$["NTFS permissions apply whether the resource is accessed locally or over the network, while share permissions apply only over the network", "When NTFS and share permissions differ, the effective network access is the more restrictive of the two", "A share permission can restrict network access to a folder that a local user could otherwise fully access when logged on directly to that machine", "NTFS permissions can only be applied to entire folders, never to individual files", "An explicit NTFS Deny overrides an NTFS Allow granted through a different group"]$q$::jsonb,
 $q$[0, 1, 2, 4]$q$::jsonb,
 $q$NTFS governs access always, locally or remotely, while share permissions only gate the network path; combined network access takes the more restrictive of the two. A share Deny doesn't limit a user logged on directly at the machine, since share permissions don't apply locally. NTFS permissions absolutely can be set per file, and an explicit Deny always overrides an Allow.$q$),

($q$a2-q-809$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$matching$q$,2,
 $q$Match each Windows security feature to the description that defines it.$q$,
 $q${"left": ["BitLocker", "EFS", "UAC", "Windows Defender Firewall"], "right": ["Filters inbound and outbound network traffic according to per-profile rules", "Encrypts individual files or folders on NTFS using the current user's certificate", "Encrypts an entire drive/volume, typically backed by a TPM chip", "Prompts for confirmation or admin credentials before a privileged action executes"]}$q$::jsonb,
 $q$[2, 1, 3, 0]$q$::jsonb,
 $q$BitLocker encrypts a whole volume and typically relies on a TPM; EFS encrypts individual files tied to a user's certificate; UAC gates privileged actions with a consent or credential prompt; and Windows Defender Firewall filters traffic based on the active network profile's rule set.$q$),

($q$a2-q-810$q$,$q$aplus2$q$,2,$q$2.5$q$,$q$ordering$q$,3,
 $q$A technician is enabling BitLocker with a TPM+PIN protector on a laptop that already has a working TPM. Order the steps from first to last.$q$,
 $q$["Save or print the 48-digit recovery key to a safe location", "Confirm the TPM is enabled and initialized in UEFI firmware", "Choose the encryption scope and start encrypting the drive", "Select the option to require a PIN at startup in addition to the TPM", "Launch BitLocker from Control Panel and choose to turn it on for the drive"]$q$::jsonb,
 $q$[1, 4, 3, 0, 2]$q$::jsonb,
 $q$The TPM must already be enabled before BitLocker setup begins; BitLocker is then launched and turned on for the drive, the PIN protector is selected as additional startup authentication, the recovery key is saved somewhere safe (BitLocker won't proceed until it is), and only then does encryption actually start.$q$),

-- ===================== 2.6 Workstation security best practices =====================

($q$a2-q-811$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,1,
 $q$IT policy requires that every workstation password contain at least three of four character categories (uppercase, lowercase, number, symbol) and be at least 12 characters long. Which best practice does this describe?$q$,
 $q$["Password complexity and length requirements as part of a password policy", "Account lockout policy", "The principle of least privilege", "Screen lock timeout"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Requiring a mix of character categories and a minimum length are the two classic components of a password complexity/length policy, distinct from lockout behavior, privilege assignment, or session timeout settings.$q$),

($q$a2-q-812$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,2,
 $q$A company requires that passwords be changed every 90 days and that none of the last 10 previously used passwords can be reused. Which two password-policy settings are being enforced?$q$,
 $q$["Maximum password age and password history", "Account lockout threshold and lockout duration", "Minimum password length and complexity", "Screen lock timeout and UAC prompt behavior"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The 90-day rotation requirement is the maximum password age; blocking reuse of the last 10 passwords is password history. Neither setting has anything to do with lockout thresholds, complexity rules, or session/UAC behavior.$q$),

($q$a2-q-813$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,2,
 $q$After 5 failed login attempts within 15 minutes, a user's domain account locks for 30 minutes before another attempt is allowed. Which setting is responsible for triggering the lock after exactly 5 attempts?$q$,
 $q$["Account lockout threshold", "Account lockout duration", "Password history", "Minimum password age"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The lockout threshold sets the number of consecutive failed attempts allowed before the account locks; lockout duration separately controls how long that lock lasts (here, 30 minutes). Password history and minimum password age govern password reuse, not failed logons.$q$),

($q$a2-q-814$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,1,
 $q$A hardening checklist calls for renaming the built-in local Administrator account and disabling the built-in Guest account on every workstation. What is the primary security benefit?$q$,
 $q$["It removes well-known default account names/targets that attackers commonly try first when brute-forcing local logins", "It speeds up the login process for everyday users", "It automatically encrypts every file the account owns", "It satisfies a mandatory backup requirement"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The built-in Administrator and Guest accounts have predictable, well-known names that attackers commonly target first. Renaming or disabling them removes an easy, guessable target without reducing any legitimate functionality for actual users.$q$),

($q$a2-q-815$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,2,
 $q$A workstation is set to lock the screen after 10 minutes of inactivity rather than fully logging the user off. What is preserved by locking instead of logging off, and why might an organization still prefer locking?$q$,
 $q$["Open applications and unsaved work keep running in the background, and the user returns to exactly where they left off after re-authenticating", "All open applications are closed to save memory, and the user must relaunch everything", "The account is deleted and recreated automatically for security", "Locking disables the network adapter until the user physically returns"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Locking keeps the session and every open program running behind an authentication gate, so the user resumes instantly after unlocking - unlike logging off, which closes everything and forces a full sign-in and relaunch. Both stop an unattended session from being misused, but locking is far less disruptive for short absences.$q$),

($q$a2-q-816$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,2,
 $q$Which Group Policy setting, when enabled, stops Windows from automatically launching a program listed in an autorun.inf file on any inserted removable media?$q$,
 $q$["A setting such as Turn off Autoplay under Administrative Templates", "The Require additional authentication at startup setting", "The Minimum password length setting", "The Interactive logon: Do not display last user name setting"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Autoplay/AutoRun-related Administrative Templates settings ("Turn off Autoplay" and similar) prevent Windows from automatically launching autorun.inf-listed programs the instant removable media is inserted. The other settings listed govern BitLocker startup authentication, password length, and logon-screen display, none of which touch autorun behavior.$q$),

($q$a2-q-817$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$multi$q$,2,
 $q$Which of the following are recommended best practices for securing an individual workstation? (Select all that apply.)$q$,
 $q$["Removing unnecessary or unused local user accounts", "Disabling AutoRun/AutoPlay for removable media", "Sharing one administrator login among the whole team for convenience", "Enforcing a password-protected screen lock after a short idle period", "Leaving the built-in Guest account enabled in case a visitor needs quick access"]$q$::jsonb,
 $q$[0, 1, 3]$q$::jsonb,
 $q$Removing unused accounts, disabling autorun, and enforcing a screen lock all reduce attack surface and are standard hardening steps. Sharing one admin login destroys accountability, and leaving Guest enabled provides an unnecessary anonymous entry point - both are anti-patterns, not best practices.$q$),

($q$a2-q-818$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,3,
 $q$A company forces users to change their password every 30 days. Users respond by choosing passwords like Summer2026! then Summer2027!, and some write the current one on a sticky note. What does this illustrate about overly aggressive password expiration policies?$q$,
 $q$["They can backfire, pushing users toward weaker, predictable passwords or insecure storage; modern guidance favors longer passphrases with rotation mainly triggered by suspected compromise", "They are always effective regardless of how users respond to them", "They eliminate the need for any account lockout policy", "They automatically enable multifactor authentication for the account"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Overly frequent mandatory rotation encourages predictable, incremented passwords and insecure workarounds like sticky notes - the opposite of the policy's intent. Current best-practice guidance favors longer, unique passphrases with rotation prompted by an actual suspected compromise rather than an arbitrary calendar.$q$),

($q$a2-q-819$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,2,
 $q$An organization removes local administrator rights from everyday user accounts on all workstations, requiring users to request temporary elevation through an approved process when installing software. What workstation security best practice does this enforce?$q$,
 $q$["Restricting user permissions (least privilege) at the endpoint level", "Password complexity requirements", "Screen lock enforcement", "Disabling AutoRun/AutoPlay"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Limiting everyday accounts to standard-user rights, and requiring a separate elevation step for administrative tasks, is exactly what "restrict user permissions" / least privilege means applied to individual workstations.$q$),

($q$a2-q-820$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,2,
 $q$A company configures Active Directory so that call-center employee accounts can only log on to their workstations between 6 AM and 10 PM, automatically blocking logons outside that window regardless of whether the correct password is used. Which workstation/account security best practice is this?$q$,
 $q$["Restricting login times", "Password history", "Account lockout duration", "Screen lock timeout"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Restricting login times limits the hours during which an account can authenticate at all, narrowing the window in which a valid or stolen credential could be used - a distinct control from password history, lockout duration, or screen timeout settings.$q$),

($q$a2-q-821$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$matching$q$,2,
 $q$Match each account/password security term to the setting it describes.$q$,
 $q${"left": ["Account lockout threshold", "Password history", "Minimum password age", "Password complexity requirements"], "right": ["Number of previous passwords remembered so they cannot be immediately reused", "Number of failed logon attempts allowed before the account locks", "Minimum time that must pass before a password can be changed again", "A rule requiring a mix of character types and a minimum length"]}$q$::jsonb,
 $q$[1, 0, 2, 3]$q$::jsonb,
 $q$Lockout threshold counts failed attempts before locking; password history blocks reuse of recent passwords; minimum password age stops a user from quickly cycling back to an old password; and complexity requirements mandate a character-type mix and minimum length.$q$),

($q$a2-q-822$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$ordering$q$,3,
 $q$Order the steps a technician would follow to configure an account lockout policy using the Local Security Policy console, from first to last.$q$,
 $q$["Set the Account Lockout Duration for how long the account stays locked", "Apply the settings and test with a deliberate failed-login attempt", "Open the Local Security Policy console (secpol.msc)", "Set the Account Lockout Threshold to the desired number of failed attempts", "Navigate to Account Policies > Account Lockout Policy"]$q$::jsonb,
 $q$[2, 4, 3, 0, 1]$q$::jsonb,
 $q$The console is opened first, then the technician navigates to the Account Lockout Policy node, sets the threshold (how many failures trigger a lock), sets the duration (how long the lock lasts), and finally applies and verifies the settings with a deliberate failed login.$q$),

($q$a2-q-823$q$,$q$aplus2$q$,2,$q$2.6$q$,$q$mcq$q$,3,
 $q$A shared front-desk workstation logged in as a single generic "Reception" account is used by multiple staff throughout the day. Management wants accountability for who did what without disrupting workflow. Which best practice most directly addresses this gap?$q$,
 $q$["Replace the shared account with individual named accounts for each staff member so actions can be attributed to a specific person", "Increase the password length on the shared account only", "Enable BitLocker on the workstation's drive", "Disable the screen lock so staff don't have to log in repeatedly"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A shared/generic account makes it impossible to trace an action back to the individual who performed it, destroying accountability. Giving each employee their own named account restores traceability without materially slowing daily work; the other options don't address the attribution problem at all.$q$),

-- ===================== 2.7 Mobile/embedded device security =====================

($q$a2-q-824$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,1,
 $q$A company laptop containing sensitive files is reported stolen. IT immediately issues a command that will erase all data on the device the next time it connects to the internet. Which mobile/embedded device security feature was used?$q$,
 $q$["Remote wipe", "A locator app", "A screen lock", "OS patching"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Remote wipe is a command, typically sent through an MDM console or device-finder service, that erases device data the next time the device connects to a network - exactly the action described here.$q$),

($q$a2-q-825$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,1,
 $q$An employee misplaces their phone at a conference. Using a web portal, they view the phone's last known location on a map and trigger it to play a loud sound. Which feature are they using?$q$,
 $q$["A locator/find-my-device app", "Remote wipe", "Full-device encryption", "A failed-login wipe policy"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Showing last known location on a map and triggering a sound to help locate a nearby device are the defining capabilities of a locator app such as Find My iPhone or Find My Device - a non-destructive first response, unlike remote wipe.$q$),

($q$a2-q-826$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,2,
 $q$A company's mobile device policy automatically erases all data on a phone after 10 consecutive incorrect passcode attempts. What is this control called, and what does it primarily defend against?$q$,
 $q$["A failed-login wipe policy, defending against brute-force PIN guessing on a lost or stolen device", "A locator app, defending against theft in the first place", "BitLocker, defending against offline removal of the storage chip", "A screen lock, defending only against shoulder surfing"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Automatically erasing data after too many failed unlock attempts is a failed-login (erase-after-attempts) wipe policy, specifically designed to make brute-forcing the passcode on a device already in someone else's hands impossible.$q$),

($q$a2-q-827$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,2,
 $q$A fleet of point-of-sale terminals runs an embedded OS version that reached end-of-life two years ago and no longer receives security patches. What is the primary security risk this creates?$q$,
 $q$["Newly discovered vulnerabilities in the OS will never be patched, leaving the devices permanently exposed to any exploit targeting them", "The terminals will simply run more slowly over time", "The terminals will automatically lose their manufacturer warranty", "The terminals will stop being able to accept any form of payment"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Once an OS version stops receiving updates, any vulnerability discovered in it afterward has no official fix, so the exposure is permanent rather than a temporary gap that a future patch will close - a serious risk for devices handling payment data.$q$),

($q$a2-q-828$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,1,
 $q$An IT department uses a central console to push screen-lock requirements, remotely wipe lost devices, and enforce OS update compliance across every company-owned phone and tablet. What class of tool is this?$q$,
 $q$["Mobile Device Management (MDM) software", "A locator app", "A firewall appliance", "An antivirus signature database"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Centrally enforcing policy - screen lock, remote wipe, patch compliance - across a fleet of managed mobile devices from one console is exactly what MDM software is built to do.$q$),

($q$a2-q-829$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,2,
 $q$A stolen phone is reported to the carrier, which adds its unique hardware identifier to a shared blacklist so the device cannot register on any participating carrier's network, even with a different SIM card. Which identifier is being blacklisted?$q$,
 $q$["IMEI (International Mobile Equipment Identity)", "MAC address", "IP address", "SSID"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The IMEI is a unique hardware identifier tied to the device itself rather than the SIM, so blacklisting it prevents the physical device from registering on participating carrier networks no matter which SIM is inserted.$q$),

($q$a2-q-830$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,2,
 $q$A security review finds that a company's smart thermostats and IP cameras are still using their factory-default administrator usernames and passwords, and are reachable from the general office network. What is the most direct fix?$q$,
 $q$["Change the default credentials on every device and place them on an isolated/segmented network", "Replace all the devices with newer models", "Permanently disable Wi-Fi on all the devices", "Leave them as-is, since embedded devices can't be exploited"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Default credentials are widely published and are one of the most common ways embedded/IoT devices are compromised; changing them and isolating the devices on their own network segment directly closes that gap without requiring new hardware.$q$),

($q$a2-q-831$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,2,
 $q$A phone is configured to unlock with facial recognition, but after a restart or several failed face-recognition attempts, it falls back to requiring the PIN. Why do mobile OSes require this fallback?$q$,
 $q$["Biometric matching can fail or be spoofed under some conditions, so a knowledge-factor fallback ensures the device can still be unlocked and biometrics remain only one layer of defense", "Biometric authentication is purely cosmetic and never actually restricts access", "The PIN fallback exists only to slow down the legitimate owner", "Facial recognition is disabled by default on all mobile operating systems"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Biometric sensors can fail to read correctly (lighting, injury, a mask) and are treated as a single, potentially spoofable factor, so mobile OSes require a PIN/passcode fallback to guarantee the legitimate owner always has a way in and to keep a knowledge-factor option in the mix.$q$),

($q$a2-q-832$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,3,
 $q$A company allows employees to access corporate email and files from personal phones (BYOD) but wants the ability to remotely wipe corporate data without touching personal photos or apps if a device is lost. What approach addresses this?$q$,
 $q$["Containerization/work-profile separation through MDM that isolates corporate data so it can be selectively wiped", "Wiping the entire personal device on any loss report", "Refusing to allow BYOD under any circumstances", "Disabling screen locks to simplify daily access"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Containerization creates a separate, encrypted corporate work profile on the personal device, isolated from personal data, so IT can enforce policy on and selectively wipe just that container - resolving the tension between corporate control and employee-owned data.$q$),

($q$a2-q-833$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$multi$q$,2,
 $q$Which of the following are recommended security controls for company-managed mobile devices? (Select all that apply.)$q$,
 $q$["Requiring a screen lock (PIN, pattern, or biometric)", "Enabling remote wipe capability", "Leaving devices on outdated OS versions to avoid compatibility issues", "Keeping the OS and apps updated with current security patches", "Disabling any form of passcode to speed up daily use"]$q$::jsonb,
 $q$[0, 1, 3]$q$::jsonb,
 $q$A screen lock, remote wipe capability, and current OS/app patching are core mobile security controls. Deliberately staying on outdated OS versions and removing passcodes both work directly against security rather than supporting it.$q$),

($q$a2-q-834$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$matching$q$,2,
 $q$Match each mobile security term to the description that defines it.$q$,
 $q${"left": ["Remote wipe", "Locator app", "Failed-login wipe", "Full-device encryption"], "right": ["Erases device data automatically after too many incorrect unlock attempts", "Renders all stored data unreadable without the correct key even if the storage chip is removed", "Shows a device's last known location and can trigger a sound or lock message remotely", "Erases device data on command, typically the next time the device connects to a network"]}$q$::jsonb,
 $q$[3, 2, 0, 1]$q$::jsonb,
 $q$Remote wipe erases on command once connected; a locator app shows location and can remotely lock/alert; a failed-login wipe triggers automatically after too many wrong passcode attempts; and full-device encryption protects data at rest regardless of whether the storage is later removed.$q$),

($q$a2-q-835$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$ordering$q$,3,
 $q$A company phone with corporate data is reported lost by its user. Order the response steps a technician/IT security team should typically take, from first to last.$q$,
 $q$["Change the passwords for any accounts that were logged into the device", "Document the incident and review whether policy should be adjusted", "Use the locator app to attempt to find the device's last known location", "Trigger a remote wipe if the device cannot be recovered within a reasonable time", "Remotely lock the device and display a contact message"]$q$::jsonb,
 $q$[2, 4, 0, 3, 1]$q$::jsonb,
 $q$Attempt to locate the device first, since it may still be recoverable intact; lock it with a contact message to deter casual access while deciding next steps; change passwords for any exposed accounts to limit damage; wipe only if it truly can't be recovered; then document the incident and review whether policy should change.$q$),

($q$a2-q-836$q$,$q$aplus2$q$,2,$q$2.7$q$,$q$mcq$q$,3,
 $q$A hospital's embedded infusion pump controller cannot be immediately patched for a newly disclosed vulnerability because the manufacturer hasn't certified an update yet. What compensating control best reduces risk in the meantime?$q$,
 $q$["Network segmentation/isolation to limit the device's exposure to only the traffic it needs", "Ignoring the vulnerability, since embedded devices are inherently safe", "Full-disk encryption of the device's firmware", "Disabling the device entirely, regardless of patient care impact"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$When immediate patching isn't possible - common with certified medical/embedded devices - isolating the device on a segmented network limits which systems can reach it, reducing exploitability until an approved patch exists. Disabling critical care equipment isn't realistic, and encryption doesn't address a runtime vulnerability.$q$),

-- ===================== 2.8 Data destruction and disposal methods =====================

($q$a2-q-837$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,1,
 $q$A retired backup tape and an old HDD are both degaussed using a strong magnetic field. What is the actual effect of this on each device?$q$,
 $q$["Both the tape's and the HDD's magnetically stored data are scrambled (and the HDD is typically rendered unusable as a drive too); an SSD would be unaffected since it stores data electronically, not magnetically", "Only the tape is affected; the HDD is immune to magnetic fields", "Only the HDD is affected; magnetic tape is immune to degaussing", "Neither is affected, since degaussing only works on paper documents"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Degaussing exposes magnetic media to a powerful field that scrambles the magnetic domains storing data, effective on both tape and HDD platters (though it typically also destroys the HDD's servo data, ending its usefulness as a drive). It has no effect on SSDs, which store data electronically rather than magnetically - a classic trap on this topic.$q$),

($q$a2-q-838$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,2,
 $q$A company tries to securely erase old SSDs by running a standard multi-pass overwrite tool originally designed for hard drives. Why might this fail to guarantee that all data is destroyed?$q$,
 $q$["SSD wear-leveling can remap logical addresses to different physical flash cells, so overwriting a logical address may never touch every physical cell that once held the data; a proper ATA Secure Erase or crypto-erase should be used instead", "Overwriting always works identically on SSDs and HDDs with no meaningful difference", "SSDs cannot be erased under any circumstances by any method", "Overwrite tools always corrupt an SSD's firmware and permanently brick the device"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Wear-leveling means the logical address an overwrite tool writes to may not correspond to the same physical cell every time, so old data can persist in physical cells the tool never revisits. A drive-native secure-erase command, or crypto-erase on a self-encrypting SSD, is the recommended approach instead.$q$),

($q$a2-q-839$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,2,
 $q$A company contracts a third-party vendor to physically shred a batch of retired hard drives containing regulated financial data. What should the company obtain from the vendor afterward to demonstrate compliance during an audit?$q$,
 $q$["A certificate of destruction documenting what was destroyed, when, and by what method", "A warranty extension on the shredding equipment", "A refund for the drives' scrap metal value", "Nothing further is needed once the drives are handed over"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A certificate of destruction is the auditable record proving what media was destroyed, by what method, and when - without it, the company has no documented evidence of compliance if later asked to prove the data was actually destroyed.$q$),

($q$a2-q-840$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,1,
 $q$A batch of old drives contained no sensitive data and was already verified as securely wiped using a certified overwrite tool. What is an appropriate disposal path?$q$,
 $q$["Recycling the drives through an e-waste/electronics recycling program, since they are already sanitized", "They must still be physically shredded regardless of the prior wipe", "They must be degaussed even though they were already overwritten", "They should be placed in general office trash"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Once data has been verified as securely erased, standard e-waste recycling is appropriate and environmentally responsible. Physical destruction is reserved for cases needing a higher assurance level or where sanitization can't be verified, and general trash ignores required electronics-disposal handling.$q$),

($q$a2-q-841$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,2,
 $q$Which of the following provides the strongest assurance that data on a drive cannot be recovered before disposal?$q$,
 $q$["A certified secure-erase/overwrite utility (or physical destruction) rather than a standard quick or full format", "A standard quick format", "A single full format performed once", "Simply deleting all visible files and emptying the recycle bin"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Deleting files or quick-formatting leaves data largely recoverable with common tools, and even a full format mainly checks for bad sectors without guaranteeing a destruction-grade overwrite of every sector. A certified secure-erase utility (or physical destruction) provides the strongest assurance against recovery.$q$),

($q$a2-q-842$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,3,
 $q$Between the time drives are pulled from decommissioned servers and the time they are shredded by an outside vendor three weeks later, a company wants to be able to prove exactly who had custody of each drive. What should be maintained throughout that period?$q$,
 $q$["A documented chain of custody log tracking each drive's location, handler, and transfer", "A single shared spreadsheet with no dates or names recorded", "Nothing, since only the final shredding step matters", "A verbal agreement with the vendor is sufficient on its own"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A documented chain of custody records who held each drive, when, and what happened to it, closing the gap between decommissioning and final destruction so no drive can go missing or be accessed improperly without it being noticed.$q$),

($q$a2-q-843$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,2,
 $q$Ranked purely by assurance that data cannot later be recovered, which ordering is most accurate, from lowest to highest assurance?$q$,
 $q$["Quick format < single-pass overwrite < certified multi-pass overwrite/crypto-erase < physical destruction (shredding/incineration)", "Physical destruction < overwrite < quick format", "All four methods provide identical assurance against recovery", "Quick format provides the highest assurance because it completes the fastest"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Assurance scales with how thoroughly a method prevents any recovery attempt: a quick format barely touches existing data, overwriting reduces recoverability further with more passes and certification, and physical destruction leaves no coherent media to analyze at all, giving it the highest assurance.$q$),

($q$a2-q-844$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,2,
 $q$A defense contractor requires that hard drives which held top-secret data be destroyed to the point where no forensic recovery is conceivable, even by a well-funded adversary with lab equipment. Which method meets this requirement, beyond typical commercial shredding?$q$,
 $q$["Incineration or pulverization to a specified particle size, per an approved destruction standard", "A single-pass overwrite of the drive", "Degaussing the drive only", "Reformatting the drive and reselling it"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$For the highest sensitivity requirements, incineration or pulverization to a certified minimum particle size goes beyond standard commercial shredding, eliminating any coherent physical remnant that could be forensically reconstructed.$q$),

($q$a2-q-845$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$multi$q$,2,
 $q$Which of the following are legitimate considerations when planning how to dispose of drives that once held sensitive data? (Select all that apply.)$q$,
 $q$["Whether a certificate of destruction is required for compliance/audit purposes", "Whether the media is magnetic (HDD/tape) or flash-based (SSD), since that changes which destruction methods are effective", "Whether recycling is appropriate once the data has been verified as securely erased", "Whether simply deleting the files and emptying the recycle bin is sufficient on its own", "Whether a chain of custody needs to be documented if a third-party vendor is involved"]$q$::jsonb,
 $q$[0, 1, 2, 4]$q$::jsonb,
 $q$Certificate requirements, media type, post-verification recycling eligibility, and chain-of-custody needs are all genuine planning considerations. Simple file deletion and emptying the recycle bin is explicitly not sufficient sanitization on its own.$q$),

($q$a2-q-846$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,3,
 $q$A technician degausses a pile of retired SSDs alongside some old HDDs, assuming the strong magnetic field will erase both types equally. What is wrong with this approach?$q$,
 $q$["Degaussing has no effect on SSDs because they store data electronically in flash memory rather than magnetically, so the SSDs remain fully readable afterward", "Degaussing works identically on both types and the technician's approach is correct", "Degaussing destroys HDDs but leaves SSDs newly encrypted as a side effect", "SSDs are actually more vulnerable to degaussing than HDDs are"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Degaussing only affects magnetically stored data; SSDs use flash memory with no magnetic storage element, so the field does nothing to them and the data remains fully intact and readable, unlike the HDDs in the same batch.$q$),

($q$a2-q-847$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$matching$q$,2,
 $q$Match each data destruction/sanitization method to the description that best fits it.$q$,
 $q${"left": ["Degaussing", "Certified multi-pass overwrite", "Physical shredding", "Crypto-erase"], "right": ["Discards or replaces the encryption key of a self-encrypting drive so previously encrypted data becomes practically unrecoverable, without physically touching the media", "Exposes magnetic media to a strong field that scrambles stored data, ineffective against flash-based SSDs", "Writes patterned data over every sector one or more times to a recognized sanitization standard, verifiable but slower than destruction", "Physically cuts or breaks the media into fragments too small to reassemble or read, providing very high assurance"]}$q$::jsonb,
 $q$[1, 2, 3, 0]$q$::jsonb,
 $q$Degaussing scrambles magnetic data but misses SSDs entirely; a certified multi-pass overwrite methodically writes over every sector to a recognized standard; physical shredding fragments the media beyond reassembly; and crypto-erase discards the encryption key of a self-encrypting drive instead of touching the stored bits at all.$q$),

($q$a2-q-848$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$ordering$q$,3,
 $q$Order the steps a technician should follow to securely decommission a hard drive containing sensitive data before it leaves the building, from first to last.$q$,
 $q$["Physically destroy the drive if wiping isn't sufficient or isn't verifiable", "Obtain and file a certificate of destruction or sanitization record", "Confirm what data classification/policy applies to the drive", "Perform a certified wipe, or determine that physical destruction is required instead", "Back up any data that must be retained elsewhere before it is destroyed"]$q$::jsonb,
 $q$[2, 4, 3, 0, 1]$q$::jsonb,
 $q$First determine what policy or data classification requires; back up anything that still needs to be retained before it's gone for good; attempt a certified wipe or determine destruction is mandated; physically destroy the drive if wiping is insufficient or can't be verified; and finally file the certificate/record documenting the outcome.$q$),

($q$a2-q-849$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,1,
 $q$A company disposes of an empty server chassis, some old cables, and a broken monitor that never stored any data. What disposal consideration applies here that does NOT apply to a drive that held sensitive data?$q$,
 $q$["There's no need for data sanitization at all, though environmental/e-waste recycling regulations may still apply to the materials themselves", "They must still be shredded exactly like a hard drive would be", "They require a certificate of destruction for data sanitization purposes", "Degaussing is required before they can be recycled"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Equipment that never stored data carries no sanitization requirement, but general electronics-recycling and environmental regulations covering batteries or hazardous materials can still apply - a separate concern from data-destruction assurance.$q$),

($q$a2-q-850$q$,$q$aplus2$q$,2,$q$2.8$q$,$q$mcq$q$,2,
 $q$A company outsources drive shredding to a vendor. What should the company do to have confidence the destruction actually happened as claimed, beyond simply trusting the vendor's invoice?$q$,
 $q$["Request a certificate of destruction and, where feasible, witness or audit the destruction process as documented proof", "Assume the invoice alone is sufficient proof of destruction", "Skip verification entirely, since vendors are always trustworthy", "Ask the vendor to email a photo of a delivery truck"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$An invoice only proves a transaction occurred, not that destruction actually happened as described. A certificate of destruction, plus witnessing or auditing the process where feasible, gives real evidence the company can rely on for compliance.$q$);


insert into public.flashcards (id, cert, deck, domain, objective, front, back) values

-- ===================== 2.5 Windows OS security settings =====================

($q$a2-f-800$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$What is the Encrypting File System (EFS), and what is it tied to?$q$,
 $q$EFS is a Windows/NTFS feature that encrypts individual files or folders using a certificate/key pair tied to the specific user account that encrypted them. Only that user (or a designated recovery agent) can decrypt the file by default; if the user's certificate and private key are lost - for example, a profile is deleted without exporting the key - the encrypted data becomes permanently unrecoverable, which is why exporting and safely storing the EFS recovery certificate matters.$q$),

($q$a2-f-801$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$Why does an EFS-encrypted file lose its encryption when copied to a FAT32 or exFAT drive?$q$,
 $q$EFS encryption is implemented as NTFS-specific metadata; FAT32 and exFAT have no equivalent structure to carry that encryption. When the file is copied off an NTFS volume onto one of these file systems, Windows decrypts it as part of the copy operation (assuming the user has read access), so plaintext - not the encrypted original - ends up on the removable media.$q$),

($q$a2-f-802$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.5$q$,
 $q$EFS$q$,
 $q$Encrypting File System - Windows' NTFS-level feature that encrypts individual files or folders using the current user's certificate, as opposed to BitLocker's whole-volume encryption.$q$),

($q$a2-f-803$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$What is the difference in scope between EFS and BitLocker?$q$,
 $q$EFS encrypts specific files or folders and is tied to an individual user's certificate, so different users on the same machine can have their own separately encrypted data. BitLocker instead encrypts an entire volume regardless of which user is logged in, protecting all data on the drive equally - the two are complementary rather than substitutes for each other.$q$),

($q$a2-f-804$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.5$q$,
 $q$TPM$q$,
 $q$Trusted Platform Module - a dedicated hardware chip that securely generates and stores cryptographic keys. BitLocker uses the TPM to seal the drive's encryption key to the specific hardware and boot configuration present when encryption was turned on, so it can unlock automatically only when that trusted state hasn't changed.$q$),

($q$a2-f-805$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$What happens to BitLocker's automatic unlock if the underlying hardware (e.g., the motherboard/TPM) changes?$q$,
 $q$BitLocker's TPM-based unlock is sealed to the exact TPM and boot configuration present when the drive was encrypted. Replacing the motherboard (and therefore the TPM) or making other significant boot-configuration changes breaks that seal, so Windows falls back to prompting for the 48-digit recovery key instead of unlocking automatically - a reason to keep that recovery key backed up somewhere safe before such changes.$q$),

($q$a2-f-806$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$What is BitLocker To Go?$q$,
 $q$BitLocker To Go extends BitLocker's volume encryption to removable drives, such as USB flash drives and external hard disks, protecting data that leaves the building on portable media - closing a gap that whole-disk BitLocker on the internal drive alone wouldn't cover.$q$),

($q$a2-f-807$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$What's the difference between UAC's consent prompt and its credential prompt?$q$,
 $q$A consent prompt (a simple Yes/No dialog) appears when an administrator account itself performs a privileged action, since that account already holds the necessary rights and just needs to confirm intent. A credential prompt, asking for a username and password, appears when a standard user account attempts the same action, because that account has no elevated rights of its own and must supply an actual administrator's credentials to proceed.$q$),

($q$a2-f-808$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$What are the Windows Defender Firewall network profiles, and why does the distinction matter?$q$,
 $q$Windows classifies each network connection as Domain, Private, or Public, and applies a different default rule set to each. Public applies the strictest rules (blocking network discovery and file/printer sharing by default) since the network is assumed untrusted, while Private and Domain profiles relax those defaults for networks the user or organization trusts - so the same laptop can behave very differently on home Wi-Fi versus a coffee shop hotspot.$q$),

($q$a2-f-809$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$How can Group Policy centrally enforce BitLocker requirements across an organization's machines?$q$,
 $q$GPO settings under Administrative Templates > Windows Components > BitLocker Drive Encryption can require encryption on OS and fixed drives, specify the encryption method and cipher strength, enforce PIN complexity for pre-boot authentication, and require that recovery keys be automatically backed up to Active Directory - turning an inconsistent per-machine setting into an enforced, auditable organization-wide policy.$q$),

($q$a2-f-810$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$What does "effective permissions" mean when a user's NTFS access comes from multiple group memberships?$q$,
 $q$Within NTFS, permissions granted by different groups a user belongs to are normally cumulative - the user gets the most permissive combination of all the Allow permissions across their groups. The one exception is an explicit Deny, which overrides any Allow from any group, no matter how permissive; that combined result is the user's "effective" NTFS permission.$q$),

($q$a2-f-811$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.5$q$,
 $q$Why might a technician need to manually add an inbound rule to Windows Defender Firewall?$q$,
 $q$Some legitimate services - such as enabling Remote Desktop, a custom line-of-business application, or a peer-to-peer collaboration tool - listen on ports that the firewall's default rule set doesn't allow through. A technician adds a specific inbound rule, ideally scoped to the exact port, protocol, and program, so that traffic is permitted without simply disabling the firewall altogether.$q$),

($q$a2-f-812$q$,$q$aplus2$q$,$q$feynman$q$,2,$q$2.5$q$,
 $q$Explain why BitLocker and EFS are not redundant with each other and why an organization might want to use both.$q$,
 $q$Model answer: BitLocker and EFS solve different problems at different layers. BitLocker encrypts the entire volume as a block device - it protects against someone removing the drive and reading it on another machine, but once Windows has booted and unlocked the volume, any process or user with normal file access can read files on it in the clear. EFS instead encrypts specific files per-user, so even another logged-in account (or a compromised process running as a different user) on the same unlocked machine can't read another user's EFS-protected files without their key. Using both means a stolen laptop is protected by BitLocker before boot, and even after a legitimate login, sensitive per-user files stay protected by EFS from anyone else who might be using or has compromised that same running system.$q$),

-- ===================== 2.6 Workstation security best practices =====================

($q$a2-f-813$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$What is the difference between password complexity and password length requirements, and why do modern best practices emphasize length?$q$,
 $q$Complexity requirements mandate a mix of character types (uppercase, lowercase, numbers, symbols); length requirements set a minimum number of characters regardless of mix. A long passphrase is often far harder to brute-force than a short, complex-looking password, which is why current guidance increasingly favors longer minimum lengths over forcing complicated character substitutions that users tend to make predictable, like "P@ssw0rd1".$q$),

($q$a2-f-814$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$What do account lockout threshold and account lockout duration each control?$q$,
 $q$Account lockout threshold sets how many consecutive failed logon attempts are allowed before the account locks; account lockout duration sets how long that lockout lasts before the account can be tried again (or requires an administrator to unlock it manually). Together they throttle brute-force password guessing without permanently disabling the account after an accidental typo.$q$),

($q$a2-f-815$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$Why is renaming or disabling the built-in local Administrator account considered a workstation hardening best practice?$q$,
 $q$The built-in Administrator account has a well-known name (and, on older systems, a predictable SID) that attackers commonly target first when attempting local brute-force or credential-stuffing attacks. Renaming it, or disabling it in favor of individually named admin accounts, removes that easy, guessable target without reducing any legitimate functionality.$q$),

($q$a2-f-816$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$Why should the built-in Guest account be disabled rather than left available on a workstation?$q$,
 $q$The Guest account is designed for anonymous, low-privilege access and typically requires no password, making it an easy entry point for unauthorized use if left enabled. Since virtually no modern organization needs walk-up anonymous logons, disabling Guest removes a standing vulnerability with no functional cost.$q$),

($q$a2-f-817$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$What is the difference between locking a workstation screen and logging off, from a security and usability standpoint?$q$,
 $q$Locking the screen keeps the user's session, open applications, and unsaved work running in the background behind a password-protected lock screen - the user re-authenticates and returns exactly where they left off. Logging off ends the session entirely, closing all open programs and requiring a full sign-in and app relaunch. Both prevent an unattended session from being used by someone else, but locking is far less disruptive, which is why it's the standard recommendation for short absences.$q$),

($q$a2-f-818$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$Why does forcing very frequent mandatory password changes sometimes weaken security rather than improve it?$q$,
 $q$When users are forced to change passwords too often, many respond by choosing weak, predictable variations (incrementing a number or season/year) or by writing the new password down somewhere insecure, both of which are easier for an attacker to exploit than a strong password changed less frequently. Current guidance favors a longer, unique password or passphrase with rotation triggered mainly by a suspected compromise, rather than an arbitrary calendar schedule.$q$),

($q$a2-f-819$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$What does "restricting user permissions" mean as a workstation security best practice?$q$,
 $q$It means giving each end-user account only the access and privilege level it actually needs for daily work - typically running as a standard user rather than a local administrator - so that everyday tasks, and any malware that runs under that account, can't make system-wide changes without a separate elevation step. Users who occasionally need administrative tasks use a separate admin credential or a controlled elevation process instead of working as admin all the time.$q$),

($q$a2-f-820$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$Which Group Policy setting disables AutoRun/AutoPlay, and why does disabling it matter?$q$,
 $q$Settings such as "Turn off Autoplay" (and related AutoRun policies) under Administrative Templates prevent Windows from automatically launching a program listed in an autorun.inf file the moment removable media is inserted. Without it, plugging in an infected USB drive can silently execute malware with no action from the user beyond inserting the device; disabling it removes that automatic-execution path, though a user could still manually run a malicious file if tricked into it.$q$),

($q$a2-f-821$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$Why should a shared/generic login (e.g., one "Reception" account used by several employees) be avoided on a workstation?$q$,
 $q$A shared account makes it impossible to attribute a specific action - a file change, a login at a certain time, a security incident - to the individual who actually performed it, destroying accountability and complicating any audit or investigation. Giving each person their own named account preserves that traceability without meaningfully slowing down daily work.$q$),

($q$a2-f-822$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$What is password history, and what problem does it prevent?$q$,
 $q$Password history remembers a configured number of a user's previous passwords and blocks reusing any of them when the password is changed. It prevents users from defeating a password-expiration policy by simply cycling back and forth between two familiar passwords instead of genuinely rotating to something new.$q$),

($q$a2-f-823$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$What is the purpose of setting a minimum password age?$q$,
 $q$Minimum password age is the shortest amount of time that must pass before a password can be changed again. Without it, a user could change their password the required number of times in rapid succession just to cycle back to an old, familiar password immediately, defeating the intent of the password history setting.$q$),

($q$a2-f-824$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$Why should unnecessary local services and preinstalled software be removed or disabled as part of workstation hardening?$q$,
 $q$Every running service or installed application is a potential attack surface - a piece of software that could contain a vulnerability, misconfiguration, or unwanted default behavior. Removing or disabling what isn't actually needed for business use reduces the number of things that can go wrong or be exploited, without affecting the tasks the workstation is actually used for.$q$),

($q$a2-f-825$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$What does a BIOS/UEFI supervisor (power-on) password add to a workstation's security, beyond the Windows login?$q$,
 $q$A supervisor or power-on password set in firmware must be entered before the operating system even begins to load, preventing someone from booting an alternate OS from removable media, changing boot order, or accessing firmware settings to bypass Windows-level protections entirely. It protects a layer that a Windows password alone can't reach, since Windows hasn't started yet at that point.$q$),

($q$a2-f-826$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$How does "restrict login times" differ from an account lockout policy as a security control?$q$,
 $q$Restricting login times limits the hours or days during which an account is allowed to authenticate at all - for example, blocking logons outside a call center's shift hours - regardless of whether the correct password is entered. Account lockout instead reacts to repeated failed password attempts by temporarily disabling the account. The two address different risks: one narrows the window of opportunity for any use of the account, the other specifically throttles brute-force guessing.$q$),

($q$a2-f-827$q$,$q$aplus2$q$,$q$feynman$q$,2,$q$2.6$q$,
 $q$Explain how password policy, account lockout policy, and screen lock settings work together as layered defenses for a single workstation login.$q$,
 $q$Model answer: Password policy (length, complexity, history, minimum age) raises the cost of guessing or reusing a weak credential in the first place. Account lockout policy assumes an attacker might still try anyway, and throttles that by locking the account after a small number of failed attempts, making rapid automated guessing impractical. Screen lock settings address a completely different risk - not a remote attacker guessing a password, but someone physically walking up to an already-authenticated, unattended session - by re-requiring authentication after a short idle period. None of the three overlaps entirely with the others: a strong password does nothing if the screen is left unlocked, and a screen lock does nothing against a remote brute-force attempt against the login page. Layering all three closes distinct gaps that no single control covers alone.$q$),

($q$a2-f-828$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.6$q$,
 $q$Why is it good practice to periodically review and remove unused or stale local user accounts on a workstation?$q$,
 $q$Accounts left behind after an employee departs, a contractor's project ends, or a test account is forgotten remain valid credentials that nobody is actively monitoring, making them an attractive and often-overlooked target for unauthorized access. Regularly auditing and removing accounts that are no longer needed shrinks that unmonitored attack surface.$q$),

-- ===================== 2.7 Mobile/embedded device security =====================

($q$a2-f-829$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$What is remote wipe on a mobile device, and when is it typically used?$q$,
 $q$Remote wipe is a command, usually issued through an MDM console or a built-in device-finder service, that erases some or all of a mobile device's data the next time it connects to a network. It's typically used as a last resort when a lost or stolen device can't be recovered and there's a real risk that stored corporate or personal data could be accessed.$q$),

($q$a2-f-830$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$What does a locator app (e.g., Find My iPhone, Find My Device) let an owner or IT admin do?$q$,
 $q$A locator app shows a device's last known (or live, if still connected) location on a map, and usually offers additional actions like playing a sound to help find a nearby misplaced device, remotely locking it with a custom message, or triggering a remote wipe if it truly can't be recovered - it's often the first step tried before resorting to a destructive wipe.$q$),

($q$a2-f-831$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$What is a failed-login (erase-after-attempts) wipe policy, and what does it protect against?$q$,
 $q$It's a device setting that automatically erases all data on the device after a configured number of consecutive incorrect passcode attempts. It specifically protects against an attacker who has physical possession of a lost or stolen device trying to brute-force the screen-lock passcode, by making unlimited guessing impossible.$q$),

($q$a2-f-832$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$Why are timely OS and security updates especially important for mobile and embedded devices?$q$,
 $q$Mobile and embedded devices are frequently carried outside controlled networks, connect to untrusted Wi-Fi, and run apps or firmware that can contain newly discovered vulnerabilities; unlike a server behind layers of network defenses, they're often directly exposed. Once a device's OS reaches end-of-life and stops receiving patches, any newly found vulnerability in it remains permanently exploitable, which is why update cadence and device lifecycle planning matter as much as any other mobile security control.$q$),

($q$a2-f-833$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.7$q$,
 $q$MDM$q$,
 $q$Mobile Device Management - a centralized platform that lets an organization enforce security policy (screen lock, encryption, remote wipe, patch compliance, app restrictions) across all managed phones and tablets from a single console.$q$),

($q$a2-f-834$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.7$q$,
 $q$IMEI$q$,
 $q$International Mobile Equipment Identity - a unique hardware identifier assigned to a cellular device. Carriers can add a reported-stolen phone's IMEI to a shared blacklist, preventing that specific device from registering on participating networks even if the SIM card is swapped.$q$),

($q$a2-f-835$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$What is the difference between remote wipe and full-device encryption as protections for a lost mobile device?$q$,
 $q$Full-device encryption protects data immediately and passively - the moment the device is lost, its storage is already unreadable without the correct key, with no action required. Remote wipe instead requires the device to connect to a network after being reported lost so the wipe command can reach it, and an attacker who keeps the device offline can delay or prevent it entirely - which is why encryption is the more reliable baseline and wipe is a valuable but conditional backstop.$q$),

($q$a2-f-836$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$Why do most mobile OSes require a PIN/passcode fallback even when biometric unlock (fingerprint/face) is enabled?$q$,
 $q$Biometric sensors can fail to read correctly (wet or injured fingers, poor lighting, a face mask) or, in some implementations, be spoofed more easily than a strong passcode, and biometric matching is disabled after a reboot or too many failed attempts as an added safeguard. The PIN/passcode fallback guarantees the legitimate owner can always get back in, and keeps a knowledge-factor option available as a second line of defense.$q$),

($q$a2-f-837$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$What is containerization (a work profile) in a BYOD mobile device management context, and what problem does it solve?$q$,
 $q$Containerization creates a separate, encrypted partition on a personal device that holds only corporate apps and data, isolated from the user's personal apps and photos. It lets an organization enforce policy on - and if necessary, remotely wipe - just the corporate container without touching or deleting anything personal, resolving the core tension in BYOD between corporate security needs and employee privacy/ownership.$q$),

($q$a2-f-838$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$Why are default credentials on embedded/IoT devices (cameras, thermostats, smart TVs) a common security risk?$q$,
 $q$Manufacturers frequently ship devices with the same default administrator username and password across an entire product line, and those defaults are widely published online. A device left on its factory credentials and reachable from a network can be logged into by anyone who looks up the default, making it one of the easiest and most common ways embedded devices are compromised.$q$),

($q$a2-f-839$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$What compensating control is commonly used when an embedded or specialized device can't be immediately patched?$q$,
 $q$Network segmentation/isolation - placing the device on its own restricted network segment or VLAN so it can only communicate with the specific systems it actually needs to - limits how much an attacker could reach even if they exploited the unpatched vulnerability, buying time until an approved patch becomes available.$q$),

($q$a2-f-840$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$What is the security risk of a mobile or embedded device running an operating system that has reached end-of-life?$q$,
 $q$Once a vendor stops releasing security updates for an OS version, any vulnerability discovered in it afterward has no official fix and remains exploitable indefinitely on every device still running that version - turning normal patch-management defenses into a permanent gap rather than a temporary one.$q$),

($q$a2-f-841$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$What is the difference between a screen lock and full-device encryption on a mobile device?$q$,
 $q$A screen lock (PIN, pattern, or biometric) gates access to the device's user interface while it's running - it stops casual access but can potentially be bypassed by someone who removes the storage chip directly. Full-device encryption protects the data itself at rest, so even removing and reading the physical storage yields only unreadable ciphertext without the decryption key. The two work together: the screen lock is the everyday gate, encryption is the fallback if that gate is physically circumvented.$q$),

($q$a2-f-842$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$Why should a locator app be tried before triggering a remote wipe when a device is merely lost rather than confirmed stolen?$q$,
 $q$A remote wipe is irreversible and destroys everything on the device, including anything not backed up; if the device is simply misplaced nearby, a locator app - which can also remotely lock and display a contact message - may recover it intact without any data loss. Wiping is best reserved for cases where recovery genuinely isn't likely or the device is confirmed in someone else's possession.$q$),

($q$a2-f-843$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.7$q$,
 $q$OTA$q$,
 $q$Over-The-Air (update) - the method by which mobile and embedded devices download and install OS, firmware, or security updates wirelessly, without a physical cable or connection to a PC, making prompt patching far more practical at scale.$q$),

($q$a2-f-844$q$,$q$aplus2$q$,$q$feynman$q$,2,$q$2.7$q$,
 $q$Explain why "lost" and "stolen" mobile device scenarios might call for different first responses from IT/security, even though both may eventually require a remote wipe.$q$,
 $q$Model answer: A lost device is presumed to still be somewhere recoverable and not yet in a malicious actor's hands, so the first response favors non-destructive options - a locator app to find it, a remote lock with a contact message, maybe even just waiting a short while for someone to return it. A stolen device is presumed to be in an adversary's possession, so the priority shifts toward limiting damage quickly: changing passwords for accounts that were logged in, and moving to a remote wipe sooner rather than trying to recover the hardware itself, since recovery is far less likely and the higher risk is data exposure while attackers work to access what's on it. Both may end at the same wipe command, but treating every loss as an immediate wipe risks unnecessarily destroying an otherwise-recoverable device and its data.$q$),

($q$a2-f-845$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.7$q$,
 $q$Why should a company require MDM enrollment before granting a device access to corporate email or files?$q$,
 $q$Enrollment is what lets the organization actually apply and verify its security policies - screen lock, encryption, OS patch level, remote wipe capability - on that specific device before it's trusted with corporate data. Granting access to an unenrolled device means none of those controls can be confirmed or enforced if the device is later lost, compromised, or simply out of compliance.$q$),

-- ===================== 2.8 Data destruction and disposal methods =====================

($q$a2-f-846$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$Why is degaussing ineffective against SSDs, even though it destroys data on HDDs and magnetic tape?$q$,
 $q$Degaussing works by exposing magnetic media to a powerful field that scrambles the magnetic domains storing data - effective against HDD platters and magnetic tape, which both store data magnetically. SSDs store data electronically in flash memory cells with no magnetic storage medium at all, so a degausser has no effect on them whatsoever; they need a method appropriate to flash storage instead, such as a certified overwrite, crypto-erase, or physical destruction.$q$),

($q$a2-f-847$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$Why can a standard overwrite tool fail to fully sanitize an SSD, and what should be used instead?$q$,
 $q$SSD controllers use wear-leveling, which can silently remap a logical address to a different physical flash cell over the drive's life to spread out write wear. Overwriting the logical address a tool can see may never actually touch every physical cell that once held sensitive data, leaving remnants in cells the OS-level tool can't address directly. A drive-native ATA Secure Erase command, or crypto-erase on a self-encrypting drive, is the recommended approach instead, since it operates at the level the controller itself manages.$q$),

($q$a2-f-848$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$What is a certificate of destruction, and why does an organization need one?$q$,
 $q$It's a document, typically issued by whoever performed the destruction (in-house or a vendor), recording what media was destroyed, by what method, and when - serving as auditable proof of compliance with data-handling policy or regulation. Without it, an organization has no evidence that regulated data-bearing media was actually destroyed rather than merely discarded.$q$),

($q$a2-f-849$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$When is it appropriate to recycle a drive rather than physically destroy it?$q$,
 $q$Once a drive's data has been verified as securely erased - via a certified overwrite or crypto-erase appropriate to its storage type - there's no remaining data risk, and routing it through a standard e-waste/electronics recycling program is both appropriate and more environmentally responsible than unnecessary physical destruction. Destruction is reserved for cases needing a higher assurance level or where sanitization can't be verified.$q$),

($q$a2-f-850$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$Why does simply deleting files and emptying the recycle bin fail as a data sanitization method?$q$,
 $q$Deleting a file, even from the recycle bin, typically just removes the file system's pointer/reference to the data and marks that space as available for reuse - the actual bits generally remain on the storage medium until something else happens to overwrite them, and are often recoverable with common, freely available undelete or forensic tools.$q$),

($q$a2-f-851$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$What is crypto-erase, and how does it differ from overwriting?$q$,
 $q$Crypto-erase discards or replaces the encryption key of a self-encrypting drive, instantly rendering all the data it protected practically unrecoverable, since the data was never stored in plaintext to begin with. Overwriting instead has to physically write new data across every relevant sector or cell, which takes considerably longer and, on an SSD, may not reliably reach every physical location due to wear-leveling.$q$),

($q$a2-f-852$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$Rank drive sanitization/destruction methods from lowest to highest data-recovery assurance.$q$,
 $q$Roughly, from weakest to strongest: deleting files/emptying the recycle bin, a quick format, a single-pass overwrite, a certified multi-pass overwrite or crypto-erase, and finally physical destruction (shredding, pulverizing, or incinerating) at the top, since there's no longer any media left to analyze at all.$q$),

($q$a2-f-853$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$What is a chain of custody in the context of drive disposal, and when is it especially important?$q$,
 $q$It's a documented, unbroken record of who had physical possession of a drive, when, and what happened to it, from the moment it's pulled out of service until it's finally destroyed or verified sanitized. It's especially important when time passes between decommissioning and destruction, or when a third-party vendor is involved, since it's the evidence that no drive went missing or was accessed improperly in between.$q$),

($q$a2-f-854$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$What physical destruction methods exist for drives beyond shredding, and when might they be required?$q$,
 $q$Options include degaussing followed by physical deformation, drilling through the platters, or incineration/pulverization to a specified particle size. The most extreme methods (incineration/pulverization to a fine particle size) are typically reserved for the most sensitive data - such as classified government information - where the requirement is that recovery must be inconceivable even to a well-resourced adversary with forensic lab equipment, beyond what standard commercial shredding guarantees.$q$),

($q$a2-f-855$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$Why should a company verify or audit a third-party destruction vendor rather than only trusting their invoice?$q$,
 $q$An invoice only proves that a transaction happened, not that the destruction was actually performed as described - requesting a certificate of destruction, and where feasible witnessing or auditing the process (or reviewing the vendor's own compliance certifications), gives the company real evidence to rely on if it's later asked to prove compliance during an audit or after an incident.$q$),

($q$a2-f-856$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$What environmental/e-waste consideration applies to equipment disposal even when no sensitive data was ever stored on the device?$q$,
 $q$Electronics often contain materials - batteries, heavy metals, capacitors - that are regulated for disposal regardless of whether any data was involved. Even a device that never held sensitive information, like a broken monitor or empty server chassis, should go through an appropriate e-waste/recycling channel rather than general trash, to comply with environmental regulations.$q$),

($q$a2-f-857$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$What is the difference between a full format and a certified secure-erase utility in terms of data destruction assurance?$q$,
 $q$A full format mainly scans the drive for bad sectors and, depending on the OS/version, may or may not overwrite existing data as part of that process - it isn't designed or certified as a sanitization method. A certified secure-erase utility is specifically built and validated to overwrite data to a recognized standard (or invoke the drive's native secure-erase/crypto-erase command), providing verifiable assurance that a full format was never intended to offer.$q$),

($q$a2-f-858$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$Why is magnetic tape handled somewhat differently from HDDs and SSDs during data destruction planning?$q$,
 $q$Tape stores data magnetically like an HDD's platters, so degaussing is effective against it the same way, but its physical form factor - long reels of tape, not a rigid disk - means standard hard-drive shredders often can't handle it. Dedicated tape shredders or incineration are typically needed for physical destruction, so a destruction plan has to account for tape as a distinct media type rather than assuming one destruction method fits all media.$q$),

($q$a2-f-859$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$What should a data destruction/disposal policy specify before any drives are decommissioned?$q$,
 $q$At minimum: the data classification levels covered and which destruction/sanitization method is required for each, who is authorized to perform or approve destruction, whether a chain of custody must be documented, what proof (such as a certificate of destruction) must be retained, and how long that documentation must be kept for audit purposes.$q$),

($q$a2-f-860$q$,$q$aplus2$q$,$q$acronym$q$,2,$q$2.8$q$,
 $q$SED$q$,
 $q$Self-Encrypting Drive - a drive with built-in hardware encryption that automatically encrypts all data written to it. Because the drive controls its own encryption key, an SED can be sanitized almost instantly via crypto-erase (discarding the key) instead of requiring a full overwrite pass.$q$),

($q$a2-f-861$q$,$q$aplus2$q$,$q$feynman$q$,2,$q$2.8$q$,
 $q$Explain why physical destruction is generally considered the highest-assurance data sanitization method, and why an organization might still choose overwriting or crypto-erase instead in many cases.$q$,
 $q$Model answer: Physical destruction is the highest-assurance method because it doesn't rely on trusting that a wipe algorithm actually reached every bit - once the media is shredded, pulverized, or incinerated, there's no coherent storage medium left to attempt recovery from at all, regardless of any firmware quirks or wear-leveling. But that certainty comes at a cost: the drive is permanently unusable and unsellable/unreusable afterward, generates more e-waste, and often costs more (especially via a certified vendor) than an in-house overwrite or crypto-erase, which can sanitize a drive in place and still leave it usable for reissue, resale, or donation. For most non-regulated or moderately sensitive data, a certified overwrite or crypto-erase is considered sufficient assurance, and organizations reserve physical destruction for the highest-sensitivity data or specific regulatory/contractual requirements where that extra certainty is worth the cost.$q$),

($q$a2-f-862$q$,$q$aplus2$q$,$q$core$q$,2,$q$2.8$q$,
 $q$Why must a company confirm which data classification/regulatory requirements apply to a drive before choosing its destruction method?$q$,
 $q$Different data types carry different mandated handling requirements - health records, financial data, and classified information, for instance, may each require a specific sanitization standard, documentation level, or even a particular destruction method by policy or law. Choosing a destruction method before confirming those requirements risks either under-protecting regulated data (using a method that doesn't meet the mandated standard) or wasting resources over-destroying data that didn't need that level of assurance.$q$);
