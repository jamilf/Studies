-- Review fixes for A+ Core 2 (220-1102) content bank.
-- Scope: 20260711000012_seed_aplus2.sql and 20260714000011_expand_aplus2.sql.
-- Objective tags corrected against the official CompTIA 220-1102 exam objectives:
-- 1.1 Windows editions / 1.2 command-line tools / 1.3 Windows 10 OS features & tools /
-- 1.4 Control Panel / 1.5 Windows settings / 1.6 Windows networking / 1.7 app install
-- concepts / 1.8 common OS & filesystem types / 1.9 OS installations & upgrades /
-- 1.10 macOS / 1.11 Linux; 2.1 security measures (physical, logical, AD, MFA) /
-- 2.2 wireless security & auth / 2.3 malware / 2.4 social engineering / 2.5 Windows OS
-- security settings / 2.6 workstation security best practices / 2.7 mobile & embedded /
-- 2.8 data destruction / 2.9 SOHO networks / 2.10 browsers; 3.1 Windows OS problems /
-- 3.2 PC security issues / 3.3 malware-removal best practices / 3.4 mobile OS issues /
-- 3.5 mobile security issues; 4.1 documentation / 4.2 change management / 4.3 backup /
-- 4.4 safety / 4.5 environmental / 4.6 prohibited content, privacy & licensing /
-- 4.7 communication & professionalism / 4.8 scripting / 4.9 remote access.

-- ==== seed_aplus2: flashcards ====

-- a2-f-002 [E4]: Task Manager/services.msc/Computer Management are 1.3 OS tools, not 1.2 command-line tools.
update public.flashcards set objective = '1.3' where id = 'a2-f-002';

-- a2-f-003 [E4]: gpupdate/sfc/chkdsk are 1.2 command-line tools, not 1.3 GUI tools.
update public.flashcards set objective = '1.2' where id = 'a2-f-003';

-- a2-f-004 [E4]: quick vs full format is drive formatting under 1.9 OS installations, not a 1.4 Control Panel utility.
update public.flashcards set objective = '1.9' where id = 'a2-f-004';

-- a2-f-005 [E4]: domain join / DNS / time sync is 1.6 Windows networking, not 1.5 Windows settings.
update public.flashcards set objective = '1.6' where id = 'a2-f-005';

-- a2-f-006 [E4]: GPT vs MBR partitioning is listed under 1.9 OS installations, not 1.7 app installation.
update public.flashcards set objective = '1.9' where id = 'a2-f-006';

-- a2-f-007 [E4]: apt/Homebrew package managers belong to 1.11 Linux (and 1.10 macOS), not 1.8 OS types.
update public.flashcards set objective = '1.11' where id = 'a2-f-007';

-- a2-f-008 [E4]: Linux commands (ls, chmod, chown...) are 1.11, not 1.9 OS installations.
update public.flashcards set objective = '1.11' where id = 'a2-f-008';

-- a2-f-013 [E4]: Active Directory (domain/OU/GPO/home folder) is 2.1, not 2.6 workstation best practices.
update public.flashcards set objective = '2.1' where id = 'a2-f-013';

-- a2-f-014 [E4]: WPA2/WPA3, PSK vs Enterprise is 2.2 wireless security, not 2.4 social engineering.
update public.flashcards set objective = '2.2' where id = 'a2-f-014';

-- a2-f-017 [E4]: data destruction methods are 2.8, not 2.7 mobile/embedded security.
update public.flashcards set objective = '2.8' where id = 'a2-f-017';

-- a2-f-018 [E4]: SOHO router hardening is 2.9, not 2.8 data destruction.
update public.flashcards set objective = '2.9' where id = 'a2-f-018';

-- a2-f-021 [E6]: duplicate of a2-f-052 (identical 7-step malware-removal order card; a2-f-052 uses the official step wording and is kept).
delete from public.flashcards where id = 'a2-f-021';

-- a2-f-022 [E4]: phone battery drain is 3.4 mobile OS issues, not 3.3 malware removal.
update public.flashcards set objective = '3.4' where id = 'a2-f-022';

-- a2-f-023 [E4]: browser redirects/pop-ups are 3.2 PC security issue symptoms, not 3.4 mobile issues.
update public.flashcards set objective = '3.2' where id = 'a2-f-023';

-- a2-f-028 [E4]: PII/PHI/GDPR regulated data is 4.6 privacy/licensing, not 4.5 environmental.
update public.flashcards set objective = '4.6' where id = 'a2-f-028';

-- a2-f-029 [E4]: communication and professionalism is 4.7, not 4.6 prohibited content.
update public.flashcards set objective = '4.7' where id = 'a2-f-029';

-- a2-f-030 [E4]: chain of custody / incident response is 4.6, not 4.7 communication.
update public.flashcards set objective = '4.6' where id = 'a2-f-030';

-- a2-f-031 [E4]: Windows Update lives in Settings > Update & Security (1.5), not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-031';

-- a2-f-032 [E4]: mobile screen-lock policy is 2.7 mobile device security, not 2.2 wireless protocols.
update public.flashcards set objective = '2.7' where id = 'a2-f-032';

-- a2-a-001 [E4]: sfc is a 1.2 command-line tool, not 1.3.
update public.flashcards set objective = '1.2' where id = 'a2-a-001';

-- a2-a-002 [E4]: GPT partitioning is 1.9 OS installations, not 1.7 app installation.
update public.flashcards set objective = '1.9' where id = 'a2-a-002';

-- a2-a-004 [E4]: GPO belongs to 2.1 Active Directory, not 2.6.
update public.flashcards set objective = '2.1' where id = 'a2-a-004';

-- a2-a-005 [E4]: OU belongs to 2.1 Active Directory, not 2.6.
update public.flashcards set objective = '2.1' where id = 'a2-a-005';

-- a2-a-007 [E4]: WPA3 is 2.2 wireless security protocols, not 2.4 social engineering.
update public.flashcards set objective = '2.2' where id = 'a2-a-007';

-- a2-a-011 [E4]: PII is 4.6 regulated data, not 4.5 environmental.
update public.flashcards set objective = '4.6' where id = 'a2-a-011';

-- a2-a-012 [E4]: EULA/licensing is 4.6, not 4.5 environmental.
update public.flashcards set objective = '4.6' where id = 'a2-a-012';

-- a2-y-001 [E4]: the 7-step malware-removal process is 3.3, not 3.2 PC security issues.
update public.flashcards set objective = '3.3' where id = 'a2-y-001';

-- ==== seed_aplus2: questions ====

-- a2-q-001 [W2]: "Windows Media Edition"/"Windows Starter" are not real Windows 10/11 editions; replaced with real editions that make "minimum" discriminating.
update public.questions set
  choices = $q$["Windows Home","Windows Pro","Windows Pro for Workstations","Windows Enterprise"]$q$::jsonb,
  explanation = $q$Pro is the lowest edition adding BitLocker, domain/Azure AD join, Group Policy, and RDP hosting. Enterprise and Pro for Workstations also include these features but exceed the minimum; Home lacks them all.$q$
  where id = 'a2-q-001';

-- a2-q-002 [E4]: sfc is a 1.2 command-line tool, not 1.3.
update public.questions set objective = '1.2' where id = 'a2-q-002';

-- a2-q-003 [E4]: GPT partitioning is 1.9 OS installations, not 1.7 app installation.
update public.questions set objective = '1.9' where id = 'a2-q-003';

-- a2-q-004 [E4]: chmod is a 1.11 Linux command, not 1.9 OS installations.
update public.questions set objective = '1.11' where id = 'a2-q-004';

-- a2-q-005 [E4]: disposal/donation data sanitization is domain 2 objective 2.8, not 1.4 Control Panel.
update public.questions set domain = 2, objective = '2.8' where id = 'a2-q-005';

-- a2-q-006 [E4+W2]: domain-join networking is 1.6 not 1.5; mouse/monitor/spooler distractors replaced with plausible network settings.
update public.questions set objective = '1.6',
  choices = $q$["The DNS server address the client uses","Clock synchronization - Kerberos fails if time skew exceeds ~5 minutes","The DHCP lease duration","The browser proxy settings"]$q$::jsonb,
  explanation = $q$Kerberos depends on synchronized clocks; drift beyond the default 5-minute tolerance breaks domain authentication - fix NTP/time settings first. Wrong DNS also breaks domain joins, but an error naming time points at clock skew, not name resolution; DHCP leases and proxy settings do not affect Kerberos.$q$
  where id = 'a2-q-006';

-- a2-q-007 [E4]: Task Manager Startup tab is a 1.3 OS tool, not 1.2 command-line.
update public.questions set objective = '1.3' where id = 'a2-q-007';

-- a2-q-008 [E4]: apt is 1.11 Linux, not 1.8 OS types.
update public.questions set objective = '1.11' where id = 'a2-q-008';

-- a2-q-010 [E4]: bootrec/BCD repair is domain 3 boot-problem troubleshooting (3.1), not 1.3.
update public.questions set domain = 3, objective = '3.1' where id = 'a2-q-010';

-- a2-q-011 [E4+W2]: Windows Update is 1.5 Settings not 1.6 networking; joke distractors ("optional games","change wallpaper") replaced with the reversed-definition trap.
update public.questions set objective = '1.5',
  choices = $q$["There is no difference - the terms are interchangeable","Quality: monthly cumulative fixes; Feature: annual version upgrades","Quality updates deliver new Windows versions; feature updates are the monthly patches","Quality updates ship only drivers; feature updates ship only firmware"]$q$::jsonb,
  explanation = $q$Quality updates are the monthly cumulative security/reliability patches; feature updates are the yearly Windows version upgrades with new capabilities. The reversed pairing is the classic trap, and while drivers and firmware can arrive via Windows Update, they define neither category.$q$
  where id = 'a2-q-011';

-- a2-q-012 [E4]: ls is 1.11 Linux, not 1.9 OS installations.
update public.questions set objective = '1.11' where id = 'a2-q-012';

-- a2-q-016 [E4]: WPA2/WPA3 Enterprise with RADIUS is 2.2 wireless security, not 2.4 social engineering.
update public.questions set objective = '2.2' where id = 'a2-q-016';

-- a2-q-019 [E4]: physical destruction with certificate is 2.8 data destruction, not 2.7 mobile security.
update public.questions set objective = '2.8' where id = 'a2-q-019';

-- a2-q-020 [E4]: SOHO router hardening is 2.9, not 2.8 data destruction.
update public.questions set objective = '2.9' where id = 'a2-q-020';

-- a2-q-021 [E4]: GPO linked to an OU is 2.1 Active Directory, not 2.6.
update public.questions set objective = '2.1' where id = 'a2-q-021';

-- a2-q-024 [W2]: monitor/GPU distractors were off-topic for a no-boot scenario; replaced with plausible-but-unreachable in-Windows actions.
update public.questions set
  choices = $q$["Reinstall Windows immediately","Boot order/BIOS sees the drive, then repair the bootloader","Run System Restore from the Windows desktop","Update the storage driver in Device Manager"]$q$::jsonb,
  explanation = $q$Confirm firmware detects the disk and boot order targets it, then repair boot records (bootrec) from Windows RE. Reinstalling first destroys data unnecessarily, and desktop tools like System Restore or Device Manager cannot be reached when the OS will not load - use the recovery environment instead.$q$
  where id = 'a2-q-024';

-- a2-q-025 [E4]: malware-removal ordering item is 3.3 best-practice malware removal, not 3.2. (Answer array [0-6] verified correct: it matches the official 7-step order.)
update public.questions set objective = '3.3' where id = 'a2-q-025';

-- a2-q-026 [W2]: "Buy a new PC"/"Change the wallpaper" joke distractors replaced with plausible wrong first-steps.
update public.questions set
  choices = $q$["Reinstall Windows without further diagnosis","Review startup programs and disk health (Task Manager, S.M.A.R.T.)","Add more RAM before diagnosing anything","Defragment the SSD"]$q$::jsonb,
  explanation = $q$Slow boots usually trace to bloated startup lists or a failing/full disk - check Task Manager's Startup tab and drive health (S.M.A.R.T.) first. Reinstalling or buying hardware before diagnosis wastes effort, and defragmenting an SSD adds wear without improving boot time.$q$
  where id = 'a2-q-026';

-- a2-q-027 [E4+W2]: browser redirection is 3.2 PC security issues not 3.4 mobile; keyboard/ISP joke distractors replaced.
update public.questions set objective = '3.2',
  choices = $q$["Reinstall the operating system","Remove suspicious extensions/programs and run an anti-malware scan","Clear the browser history only","Switch to a different browser and keep working"]$q$::jsonb,
  explanation = $q$Redirects and new toolbars indicate adware/PUPs or malicious extensions: uninstall them, reset browser settings, scan with anti-malware, and verify proxy/DNS settings. Clearing history or switching browsers leaves the infection in place; reinstalling the OS is a last resort.$q$
  where id = 'a2-q-027';

-- a2-q-028 [E4+W2]: mobile battery drain is 3.4 not 3.3 malware removal; screen/lock-screen distractors replaced with plausible wrong actions.
update public.questions set objective = '3.4',
  choices = $q$["Replace the battery immediately","Battery usage stats for a rogue app, then close/remove it","Factory reset immediately","Permanently disable Bluetooth, Wi-Fi, and GPS"]$q$::jsonb,
  explanation = $q$Battery statistics reveal which app is burning power (often a stuck, outdated, or malicious one); remove or update it. Replacing the battery or disabling radios treats symptoms without a diagnosis, and a factory reset is a last resort.$q$
  where id = 'a2-q-028';

-- a2-q-029 [W2]: "Ignore it" replaced with a plausible-but-irrelevant maintenance action.
update public.questions set
  choices = $q$["Format the disk and reinstall Windows","Boot safe mode and roll back the driver (or use System Restore)","Replace the RAM first","Run Disk Cleanup and defragment the drive"]$q$::jsonb,
  explanation = $q$A crash starting right after a driver install points at that driver: safe mode loads minimal drivers so you can roll back, or System Restore returns to the pre-install state. Disk maintenance does not touch a faulty driver, and formatting or hardware swaps come only if rollback fails.$q$
  where id = 'a2-q-029';

-- a2-q-031 [W2]: "Emoji ratings" joke distractor replaced with realistic-but-insufficient documentation habits.
update public.questions set
  choices = $q$["A brief note saying the issue was fixed","Clear problem description, steps already tried, and the resolution","Only the user's name and a callback number","The resolution alone, omitting the steps that were attempted"]$q$::jsonb
  where id = 'a2-q-031';

-- a2-q-032 [W2]: "A marketing plan"/"A new logo" replaced with same-category change-management artifacts that don't provide a way back.
update public.questions set
  choices = $q$["A completed request form alone","A rollback plan","End-user acceptance sign-off","A post-implementation review"]$q$::jsonb,
  explanation = $q$The rollback plan documents how to revert if the change fails - required before implementation. Request forms, end-user acceptance, and post-implementation reviews are all part of change management, but none of them provides the way back out of a broken deployment.$q$
  where id = 'a2-q-032';

-- a2-q-035 [E4]: prohibited content / chain of custody is 4.6, not 4.7 communication.
update public.questions set objective = '4.6' where id = 'a2-q-035';

-- a2-q-036 [E4+W2]: professionalism/communication is 4.7 not 4.6; "Leave" replaced with a plausible unprofessional response.
update public.questions set objective = '4.7',
  choices = $q$["Interrupt with the fix as soon as you spot it","Listen without interrupting, restate the problem, and set clear expectations","Match their frustration so they feel heard","Transfer the ticket to another technician without explanation"]$q$::jsonb
  where id = 'a2-q-036';

-- a2-q-037 [E4]: PII sanitization before donation is 4.6 regulated data, not 4.5 environmental.
update public.questions set objective = '4.6' where id = 'a2-q-037';

-- a2-q-038 [E4+W2]: Event Viewer is a 1.3 OS tool not 1.2 command-line; Paint/Snipping Tool/Character Map replaced with plausible admin tools.
update public.questions set objective = '1.3',
  choices = $q$["Event Viewer","Device Manager","Task Scheduler","Performance Monitor"]$q$::jsonb,
  explanation = $q$Event Viewer records the System, Application, and Security logs, including service failures with error details - the first stop for boot-time service issues. Device Manager shows hardware/driver state, Task Scheduler runs jobs, and Performance Monitor charts live counters, not logged events.$q$
  where id = 'a2-q-038';

-- a2-q-040 [E4+W2]: mobile storage issue is 3.4 not 3.3 malware removal; battery/Wi-Fi distractors replaced with the RAM-vs-storage trap.
update public.questions set objective = '3.4',
  choices = $q$["Factory reset the phone","Clear cache/unused apps and offload media, then retry","Close background apps to free up memory","Connect to Wi-Fi and retry the download"]$q$::jsonb,
  explanation = $q$Free storage by clearing caches, removing unused apps, and offloading photos/videos. Closing background apps frees RAM, not storage; Wi-Fi affects download speed, not space; a factory reset is disproportionate as a first step.$q$
  where id = 'a2-q-040';

-- ==== expand_aplus2: flashcards ====

-- a2-f-036 [E6]: duplicate of a2-f-001 (same Home-vs-Pro front, near-identical wording; a2-f-001 lists more differentiators and is kept).
delete from public.flashcards where id = 'a2-f-036';

-- a2-f-039 [E4]: exFAT/FAT32/NTFS filesystem-type comparison is 1.8, not 1.3.
update public.flashcards set objective = '1.8' where id = 'a2-f-039';

-- a2-f-040 [E4]: Task Manager vs Device Manager are 1.3 OS tools, not 1.1 Windows editions.
update public.flashcards set objective = '1.3' where id = 'a2-f-040';

-- a2-f-041 [E4]: Time Machine is 1.10 macOS, not 1.4 Windows Control Panel.
update public.flashcards set objective = '1.10' where id = 'a2-f-041';

-- a2-f-042 [E4]: chmod is 1.11 Linux, not 1.5 Windows settings.
update public.flashcards set objective = '1.11' where id = 'a2-f-042';

-- a2-f-043 [E4]: in-place upgrade / clean install / image deployment are 1.9 installation types, not 1.1.
update public.flashcards set objective = '1.9' where id = 'a2-f-043';

-- a2-f-044 [E4]: BitLocker is a 2.5 Windows OS security setting, not 2.1.
update public.flashcards set objective = '2.5' where id = 'a2-f-044';

-- a2-f-045 [E4]: UAC is a 2.5 Windows OS security setting, not 2.2 wireless security.
update public.flashcards set objective = '2.5' where id = 'a2-f-045';

-- a2-f-049 [E4]: inactivity screen lock is a 2.6 workstation best practice (use timeout/screen lock), not 2.5.
update public.flashcards set objective = '2.6' where id = 'a2-f-049';

-- a2-f-050 [E4]: disabling AutoRun/AutoPlay is listed under 2.6 workstation best practices, not 2.1.
update public.flashcards set objective = '2.6' where id = 'a2-f-050';

-- a2-f-051 [E4]: mobile device encryption is 2.7 mobile/embedded security, not 2.6.
update public.flashcards set objective = '2.7' where id = 'a2-f-051';

-- a2-f-052 [E4]: the 7-step malware-removal process is 3.3, not 3.1.
update public.flashcards set objective = '3.3' where id = 'a2-f-052';

-- a2-f-053 [E4]: Safe Mode for isolating driver/startup conflicts is 3.1 Windows troubleshooting, not 3.2 security issues.
update public.flashcards set objective = '3.1' where id = 'a2-f-053';

-- a2-f-055 [E4]: applications crashing after an update is a 3.1 Windows OS problem, not 3.3 malware removal.
update public.flashcards set objective = '3.1' where id = 'a2-f-055';

-- a2-f-057 [E4]: browser certificate warnings are a 3.2 PC security-issue symptom, not 3.5 mobile security.
update public.flashcards set objective = '3.2' where id = 'a2-f-057';

-- a2-f-060 [E6]: duplicate of a2-f-026 (same 3-2-1 rule front/back; a2-f-026 adds the test-your-restores point and is kept).
delete from public.flashcards where id = 'a2-f-060';

-- a2-f-062 [E4]: active listening / avoiding jargon is 4.7 communication, not 4.5 environmental.
update public.flashcards set objective = '4.7' where id = 'a2-f-062';

-- ==== expand_aplus2: questions ====

-- a2-q-044 [E4]: exFAT vs FAT32/NTFS filesystem types are 1.8, not 1.3.
update public.questions set objective = '1.8' where id = 'a2-q-044';

-- a2-q-045 [E4]: Task Manager is a 1.3 OS tool, not 1.1 Windows editions.
update public.questions set objective = '1.3' where id = 'a2-q-045';

-- a2-q-046 [E4]: Device Manager is a 1.3 OS tool, not 1.1 Windows editions.
update public.questions set objective = '1.3' where id = 'a2-q-046';

-- a2-q-047 [E4]: Time Machine is 1.10 macOS, not 1.4 Windows Control Panel.
update public.questions set objective = '1.10' where id = 'a2-q-047';

-- a2-q-048 [E4]: chmod 755 is 1.11 Linux, not 1.5 Windows settings.
update public.questions set objective = '1.11' where id = 'a2-q-048';

-- a2-q-049 [E4]: installation types (in-place vs clean vs image) are 1.9, not 1.1.
update public.questions set objective = '1.9' where id = 'a2-q-049';

-- a2-q-050 [E4]: BitLocker is a 2.5 Windows OS security setting, not 2.1.
update public.questions set objective = '2.5' where id = 'a2-q-050';

-- a2-q-051 [E4]: UAC is a 2.5 Windows OS security setting, not 2.2 wireless security.
update public.questions set objective = '2.5' where id = 'a2-q-051';

-- a2-q-056 [E4]: inactivity auto-lock is a 2.6 workstation best practice, not 2.5.
update public.questions set objective = '2.6' where id = 'a2-q-056';

-- a2-q-057 [E4]: disabling AutoPlay/Autorun is a 2.6 workstation best practice, not 2.1.
update public.questions set objective = '2.6' where id = 'a2-q-057';

-- a2-q-058 [E4]: mobile device encryption is 2.7, not 2.6.
update public.questions set objective = '2.7' where id = 'a2-q-058';

-- a2-q-059 [E4]: phishing is a 2.4 social-engineering attack, not 2.3 malware.
update public.questions set objective = '2.4' where id = 'a2-q-059';

-- a2-q-060 [E4]: the 7-step malware-removal sequence is 3.3, not 3.1. (Answer key verified: option A is the correct official order.)
update public.questions set objective = '3.3' where id = 'a2-q-060';

-- a2-q-061 [E4]: why System Restore is disabled during malware removal is 3.3, not 3.1.
update public.questions set objective = '3.3' where id = 'a2-q-061';

-- a2-q-062 [E4+W2]: Safe Mode driver isolation is 3.1 not 3.2; "Sleep mode" replaced with the tempting clean-boot distractor.
update public.questions set objective = '3.1',
  choices = $q$["Safe Mode","Windows Recovery Environment","A clean boot using msconfig","BIOS setup mode"]$q$::jsonb,
  explanation = $q$Safe Mode loads only essential drivers and services, isolating whether a third-party driver or startup program is at fault. A clean boot (msconfig) disables startup items but still loads standard drivers; Windows RE is a repair environment rather than a diagnostic boot of the installed OS; BIOS setup never loads Windows at all.$q$
  where id = 'a2-q-062';

-- a2-q-064 [E4]: application crashing after a Windows update is a 3.1 Windows OS problem, not 3.3 malware removal.
update public.questions set objective = '3.1' where id = 'a2-q-064';

-- a2-q-065 [W2]: brightness/phone-case/ringtone joke distractors replaced with plausible wrong first-steps.
update public.questions set
  choices = $q$["That the account credentials are still valid and the device has active network connectivity","Whether the phone needs a factory reset","Whether the app should be reinstalled immediately","Whether the SIM card needs replacing"]$q$::jsonb,
  explanation = $q$Invalid/expired credentials and lost network connectivity are the two most common root causes of mobile sync failures, so verify them first. Reinstalling the app or factory resetting are disruptive later steps, and the SIM affects cellular service, not account sync, which fails over Wi-Fi too.$q$
  where id = 'a2-q-065';

-- a2-q-066 [E4]: browser certificate warnings are a 3.2 PC security-issue symptom, not 3.5 mobile security.
update public.questions set objective = '3.2' where id = 'a2-q-066';

-- a2-q-068 [E4]: verifying an antivirus false positive falls under 3.2 PC security issues (false AV alerts), not 3.1.
update public.questions set objective = '3.2' where id = 'a2-q-068';

-- a2-q-074 [E4]: audience-tailored communication is 4.7, not 4.5 environmental.
update public.questions set objective = '4.7' where id = 'a2-q-074';

-- a2-q-075 [E4]: toner disposal per SDS is 4.5 environmental, not 4.6 licensing/privacy.
update public.questions set objective = '4.5' where id = 'a2-q-075';

-- a2-q-077 [E4]: active listening / clarifying questions is 4.7 communication, not 4.5 environmental.
update public.questions set objective = '4.7' where id = 'a2-q-077';
