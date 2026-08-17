-- Review fixes (wave 2) for A+ Core 2 (220-1102) content bank.
-- Scope: 20260726000130_expand_aplus2_d1a.sql through
--        20260726000137_expand_aplus2_gaps.sql (8 files, ~995 items).
-- Objective tags corrected against the official CompTIA 220-1102 exam objectives
-- (same authoritative list documented in 20260715000102_review_fixes_aplus2.sql):
-- 1.1 Windows editions / 1.2 command-line tools / 1.3 Windows 10/11 OS features & tools /
-- 1.4 Control Panel / 1.5 Windows settings / 1.6 Windows networking / 1.7 app install
-- concepts / 1.8 common OS & filesystem types / 1.9 OS installations & upgrades /
-- 1.10 macOS / 1.11 Linux; 2.1 security measures / 2.2 wireless security & auth /
-- 2.3 malware / 2.4 social engineering / 2.5 Windows OS security settings /
-- 2.6 workstation security best practices / 2.7 mobile & embedded / 2.8 data
-- destruction / 2.9 SOHO networks / 2.10 browsers; 3.1-3.5; 4.1 documentation /
-- 4.2 change management / 4.3 backup / 4.4 safety / 4.5 environmental /
-- 4.6 prohibited content/privacy/licensing / 4.7 communication & professionalism /
-- 4.8 scripting / 4.9 remote access.

-- ==== d1a (20260726000130): no fixes. All 63 questions and 78 flashcards were ====
-- ==== verified for E1-E6/W1-W4; content, answer indexes, and objective tags   ====
-- ==== were all correct and specific. Nothing to fix.                         ====

-- ==== d1b (20260726000131): systemic E4 objective mistagging.               ====
-- The file's header claims "1.6 Windows Settings, 1.7 app install, 1.8 Windows
-- networking, 1.9 macOS/Linux/Windows tools" - none of which matches the real
-- 220-1102 blueprint numbering. Retagging every affected row below:
--   items actually about the Settings app (Accounts/Update/Privacy/Apps/Devices
--   pages), mistagged 1.6, are really 1.5 Windows settings.
--   items actually about IP/DNS/domain networking concepts, mistagged 1.8, are
--   really 1.6 Windows networking.
--   items about macOS/Linux/remote-access tools, mistagged 1.9 (OS installs &
--   upgrades, which none of these are), are retagged individually to whichever
--   objective their actual content covers (1.2, 1.3, 1.6, 1.10, or 1.11).

-- a2-q-600 [E4]: Accounts sign-in method is a Settings app page (1.5), not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-600';
-- a2-q-601 [E4]: Active hours (Windows Update) is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-601';
-- a2-q-602 [E4]: Apps & features uninstall page is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-602';
-- a2-q-603 [E4]: Privacy camera/mic permissions page is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-603';
-- a2-q-604 [E4]: Power & battery screen timeout page is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-604';
-- a2-q-605 [E4]: Remote Desktop toggle in Settings is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-605';
-- a2-q-606 [E4]: Bluetooth pairing page is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-606';
-- a2-q-607 [E4]: Printers & scanners Settings wizard is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-607';
-- a2-q-608 [E4]: System > About page is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-608';
-- a2-q-609 [E4]: Diagnostic data setting is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-609';
-- a2-q-610 [E4]: Storage Sense/Focus assist/Default apps/Find My Device matching is 1.5, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-610';
-- a2-q-611 [E4]: Per-app microphone permission page is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-611';
-- a2-q-612 [E4]: Metered connection toggle is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-612';
-- a2-q-613 [E4]: Apps & features actions (uninstall/modify/move) is 1.5 Windows settings, not 1.6 networking.
update public.questions set objective = '1.5' where id = 'a2-q-613';
-- a2-f-600 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-600';
-- a2-f-601 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-601';
-- a2-f-602 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-602';
-- a2-f-603 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-603';
-- a2-f-604 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-604';
-- a2-f-605 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-605';
-- a2-f-606 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-606';
-- a2-f-607 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-607';
-- a2-f-608 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-608';
-- a2-f-609 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-609';
-- a2-f-610 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-610';
-- a2-f-611 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-611';
-- a2-f-612 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-612';
-- a2-f-613 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-613';
-- a2-f-614 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-614';
-- a2-f-615 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-615';
-- a2-f-616 [E4]: Settings app page content is 1.5 Windows settings, not 1.6 networking.
update public.flashcards set objective = '1.5' where id = 'a2-f-616';

-- Networking-concept items mistagged 1.8 (common OS & filesystem types) that are really 1.6 Windows networking:
-- a2-q-628 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-628';
-- a2-q-629 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-629';
-- a2-q-630 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-630';
-- a2-q-631 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-631';
-- a2-q-632 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-632';
-- a2-q-633 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-633';
-- a2-q-634 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-634';
-- a2-q-635 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-635';
-- a2-q-636 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-636';
-- a2-q-637 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-637';
-- a2-q-638 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-638';
-- a2-q-639 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-639';
-- a2-q-640 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-640';
-- a2-q-641 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.questions set objective = '1.6' where id = 'a2-q-641';
-- a2-f-633 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-633';
-- a2-f-634 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-634';
-- a2-f-635 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-635';
-- a2-f-636 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-636';
-- a2-f-637 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-637';
-- a2-f-638 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-638';
-- a2-f-639 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-639';
-- a2-f-640 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-640';
-- a2-f-641 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-641';
-- a2-f-642 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-642';
-- a2-f-643 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-643';
-- a2-f-644 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-644';
-- a2-f-645 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-645';
-- a2-f-646 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-646';
-- a2-f-647 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-647';
-- a2-f-648 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-648';
-- a2-f-649 [E4]: IP/DNS/domain-networking content is 1.6 Windows networking, not 1.8 (common OS/filesystem types).
update public.flashcards set objective = '1.6' where id = 'a2-f-649';

-- Cross-platform/remote-access items mistagged 1.9 (OS installations & upgrades,
-- which none of these are) - retagged individually per actual content:
-- a2-q-642 [E4]: RDP (Windows remote-desktop networking feature) is 1.6 networking, not 1.9 OS installs.
update public.questions set objective = '1.6' where id = 'a2-q-642';
-- a2-q-643 [E4]: Time Machine is macOS content (1.10), not 1.9 OS installs.
update public.questions set objective = '1.10' where id = 'a2-q-643';
-- a2-q-644 [E4]: macOS/Linux-vs-Windows tool matching is macOS/Linux content (1.10), not 1.9 OS installs.
update public.questions set objective = '1.10' where id = 'a2-q-644';
-- a2-q-645 [E4]: macOS default shell (zsh) is macOS content (1.10), not 1.9 OS installs.
update public.questions set objective = '1.10' where id = 'a2-q-645';
-- a2-q-646 [E4]: apt update/upgrade is Linux content (1.11), not 1.9 OS installs.
update public.questions set objective = '1.11' where id = 'a2-q-646';
-- a2-q-647 [E4]: Microsoft Defender is a Windows 10/11 OS feature/tool (1.3), not 1.9 OS installs.
update public.questions set objective = '1.3' where id = 'a2-q-647';
-- a2-q-648 [E4]: Gatekeeper/XProtect are macOS content (1.10), not 1.9 OS installs.
update public.questions set objective = '1.10' where id = 'a2-q-648';
-- a2-q-649 [E4]: SSH on headless Ubuntu is Linux content (1.11), not 1.9 OS installs.
update public.questions set objective = '1.11' where id = 'a2-q-649';
-- a2-q-650 [E4]: Time Machine/File History restore workflow is macOS content (1.10), not 1.9 OS installs.
update public.questions set objective = '1.10' where id = 'a2-q-650';
-- a2-q-651 [E4]: PowerShell is a Windows command-line tool (1.2), not 1.9 OS installs.
update public.questions set objective = '1.2' where id = 'a2-q-651';
-- a2-q-652 [E4]: macOS Screen Sharing is macOS content (1.10), not 1.9 OS installs.
update public.questions set objective = '1.10' where id = 'a2-q-652';
-- a2-q-653 [E4]: SSH vs RDP for headless Linux is Linux content (1.11), not 1.9 OS installs.
update public.questions set objective = '1.11' where id = 'a2-q-653';
-- a2-q-654 [E4]: VNC as a cross-platform RDP alternative is 1.6 networking, not 1.9 OS installs.
update public.questions set objective = '1.6' where id = 'a2-q-654';
-- a2-f-650 [E4]: Time Machine/File History comparison is macOS content (1.10), not 1.9 OS installs.
update public.flashcards set objective = '1.10' where id = 'a2-f-650';
-- a2-f-651 [E4]: Microsoft Defender is a Windows 10/11 OS feature/tool (1.3), not 1.9 OS installs.
update public.flashcards set objective = '1.3' where id = 'a2-f-651';
-- a2-f-652 [E4]: Gatekeeper/XProtect are macOS content (1.10), not 1.9 OS installs.
update public.flashcards set objective = '1.10' where id = 'a2-f-652';
-- a2-f-653 [E4]: macOS default shell history is macOS content (1.10), not 1.9 OS installs.
update public.flashcards set objective = '1.10' where id = 'a2-f-653';
-- a2-f-654 [E4]: apt update/upgrade is Linux content (1.11), not 1.9 OS installs.
update public.flashcards set objective = '1.11' where id = 'a2-f-654';
-- a2-f-655 [E4]: RDP is 1.6 networking content, not 1.9 OS installs.
update public.flashcards set objective = '1.6' where id = 'a2-f-655';
-- a2-f-656 [E4]: macOS Screen Sharing is macOS content (1.10), not 1.9 OS installs.
update public.flashcards set objective = '1.10' where id = 'a2-f-656';
-- a2-f-657 [E4]: SSH vs RDP for headless Linux is Linux content (1.11), not 1.9 OS installs.
update public.flashcards set objective = '1.11' where id = 'a2-f-657';
-- a2-f-658 [E4]: PowerShell is a Windows command-line tool (1.2), not 1.9 OS installs.
update public.flashcards set objective = '1.2' where id = 'a2-f-658';
-- a2-f-659 [E4]: VNC as cross-platform RDP alternative is 1.6 networking, not 1.9 OS installs.
update public.flashcards set objective = '1.6' where id = 'a2-f-659';
-- a2-f-660 [E4]: Headless-server remote access is Linux content (1.11), not 1.9 OS installs.
update public.flashcards set objective = '1.11' where id = 'a2-f-660';
-- a2-f-661 [E4]: rsync is a Linux command-line tool (1.11), not 1.9 OS installs.
update public.flashcards set objective = '1.11' where id = 'a2-f-661';
-- a2-f-662 [E4]: SSH acronym, standard on Linux/macOS, is 1.11 Linux content, not 1.9 OS installs.
update public.flashcards set objective = '1.11' where id = 'a2-f-662';
-- a2-f-663 [E4]: VNC acronym (underlies macOS Screen Sharing) is 1.6 networking, not 1.9 OS installs.
update public.flashcards set objective = '1.6' where id = 'a2-f-663';
-- a2-f-664 [E4]: Windows-vs-macOS AV comparison is macOS content (1.10), not 1.9 OS installs.
update public.flashcards set objective = '1.10' where id = 'a2-f-664';
-- a2-f-665 [E4]: PowerShell/bash literacy is Linux shell content (1.11), not 1.9 OS installs.
update public.flashcards set objective = '1.11' where id = 'a2-f-665';
-- a2-f-666 [E4]: Full backup vs cloud sync (Time Machine/File History/rsync) is macOS content (1.10), not 1.9 OS installs.
update public.flashcards set objective = '1.10' where id = 'a2-f-666';

-- ==== d2a (20260726000132): no fixes. All 46 questions and 56 flashcards were ====
-- ==== verified for E1-E6/W1-W4, including the E4 objective check called for  ====
-- ==== this file; the 2.1-2.4 tags all correctly match the authoritative map. ====

-- ==== d2b (20260726000133): no fixes. All 51 questions and 63 flashcards were ====
-- ==== verified for E1-E6/W1-W4; the 2.5-2.8 tags, answer-key indexes, and     ====
-- ==== content were all correct. Nothing to fix.                              ====

-- ==== d3 (20260726000134): no fixes to individual items. All 60 questions and ====
-- ==== 73 flashcards verified correct for E1-E6/W1-W4; 3.1-3.5 objective tags  ====
-- ==== all match content. Systemic pattern noted in manifest (unshuffled       ====
-- ==== ordering/matching choice arrays) but that is not a defined error class  ====
-- ==== and the answer keys are still correct, so no edit is made.             ====

-- ==== d4a (20260726000135): systemic E4 objective mistagging.               ====
-- The file's own header merges "4.3 Backup/recovery, safety procedures" (two
-- distinct real objectives combined under one wrong number) and mislabels
-- "4.4 Environmental impacts and controls" (the real 4.5 objective title,
-- almost verbatim) - confirming an off-by-one shift. Fix: safety-procedure rows
-- filed under 4.3 move to 4.4; environmental rows filed under 4.4 move to 4.5,
-- except toxic-waste-handling rows (battery/toner/CRT disposal, e-waste), which
-- the real 220-1102 blueprint places under 4.4 safety, not 4.5 environmental -
-- those were already correctly tagged 4.4 and are left as-is.

-- a2-q-1031 [E4]: ESD wrist strap is 4.4 safety (ESD straps), not 4.3 backup.
update public.questions set objective = '4.4' where id = 'a2-q-1031';
-- a2-q-1032 [E4]: Carpet/low-humidity ESD risk is 4.4 safety, not 4.3 backup.
update public.questions set objective = '4.4' where id = 'a2-q-1032';
-- a2-q-1033 [E4]: Class C fire extinguisher (electrical fire safety) is 4.4 safety, not 4.3 backup.
update public.questions set objective = '4.4' where id = 'a2-q-1033';
-- a2-q-1034 [E4]: Clipped ground prong (equipment grounding) is 4.4 safety, not 4.3 backup.
update public.questions set objective = '4.4' where id = 'a2-q-1034';
-- a2-q-1035 [E4]: ESD strap/mat prevention practices are 4.4 safety, not 4.3 backup.
update public.questions set objective = '4.4' where id = 'a2-q-1035';
-- a2-q-1038 [E4]: SDS documentation is 4.5 environmental, not 4.4 safety.
update public.questions set objective = '4.5' where id = 'a2-q-1038';
-- a2-q-1039 [E4]: HVAC/temperature control is 4.5 environmental, not 4.4 safety.
update public.questions set objective = '4.5' where id = 'a2-q-1039';
-- a2-q-1040 [E4]: Humidity awareness is 4.5 environmental, not 4.4 safety.
update public.questions set objective = '4.5' where id = 'a2-q-1040';
-- a2-q-1041 [E4]: UPS/battery-backup power protection is 4.5 environmental, not 4.4 safety.
update public.questions set objective = '4.5' where id = 'a2-q-1041';
-- a2-q-1042 [E4]: UPS surge protection is 4.5 environmental, not 4.4 safety.
update public.questions set objective = '4.5' where id = 'a2-q-1042';
-- a2-q-1045 [E4]: SDS documentation for chemical compatibility/PPE is 4.5 environmental, not 4.4 safety.
update public.questions set objective = '4.5' where id = 'a2-q-1045';
-- a2-q-1046 [E4]: Brownout (under-voltage event) is 4.5 environmental, not 4.4 safety.
update public.questions set objective = '4.5' where id = 'a2-q-1046';
-- a2-q-1048 [E4]: SDS-driven spill response is 4.5 environmental, not 4.4 safety.
update public.questions set objective = '4.5' where id = 'a2-q-1048';
-- a2-q-1049 [E4]: Matching is predominantly SDS/UPS/humidity content (4.5 environmental), not 4.4 safety.
update public.questions set objective = '4.5' where id = 'a2-q-1049';
-- a2-f-1035 [E4]: Anti-static mat is 4.4 safety (ESD mats), not 4.3 backup.
update public.flashcards set objective = '4.4' where id = 'a2-f-1035';
-- a2-f-1036 [E4]: Equipment grounding is 4.4 safety, not 4.3 backup.
update public.flashcards set objective = '4.4' where id = 'a2-f-1036';
-- a2-f-1037 [E4]: Jewelry/ESD precautions before opening a case are 4.4 safety, not 4.3 backup.
update public.flashcards set objective = '4.4' where id = 'a2-f-1037';
-- a2-f-1039 [E4]: Electrical fire response is 4.4 safety, not 4.3 backup.
update public.flashcards set objective = '4.4' where id = 'a2-f-1039';
-- a2-f-1041 [E4]: Ground prong safety is 4.4 safety, not 4.3 backup.
update public.flashcards set objective = '4.4' where id = 'a2-f-1041';
-- a2-f-1042 [E4]: ESD acronym card is 4.4 safety, not 4.3 backup.
update public.flashcards set objective = '4.4' where id = 'a2-f-1042';
-- a2-f-1045 [E4]: Carpet/doorknob ESD analogy is 4.4 safety, not 4.3 backup.
update public.flashcards set objective = '4.4' where id = 'a2-f-1045';
-- a2-f-1046 [E4]: MSDS/SDS documentation is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1046';
-- a2-f-1047 [E4]: Temperature/humidity control is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1047';
-- a2-f-1048 [E4]: UPS vs power strip is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1048';
-- a2-f-1049 [E4]: Surge vs sag (power events) is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1049';
-- a2-f-1051 [E4]: SDS content is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1051';
-- a2-f-1052 [E4]: SDS chemical-compatibility check is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1052';
-- a2-f-1053 [E4]: High-humidity risk is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1053';
-- a2-f-1054 [E4]: UPS battery testing is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1054';
-- a2-f-1055 [E4]: SDS binder accessibility is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1055';
-- a2-f-1057 [E4]: SDS acronym card is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1057';
-- a2-f-1058 [E4]: UPS acronym card is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1058';
-- a2-f-1059 [E4]: UPS runtime explanation is 4.5 environmental, not 4.4 safety.
update public.flashcards set objective = '4.5' where id = 'a2-f-1059';

-- ==== d4b (20260726000136): systemic E4 objective mistagging.               ====
-- The whole file is shifted by exactly one objective number: its licensing/
-- prohibited-content/chain-of-custody content is tagged 4.5 (should be 4.6),
-- its communication/professionalism content is tagged 4.6 (should be 4.7),
-- and its scripting content is tagged 4.7 (should be 4.8), per the real
-- 220-1102 blueprint (4.6 prohibited content/privacy/licensing, 4.7
-- communication & professionalism, 4.8 scripting). Every row in this file
-- gets a uniform +1 objective-number correction; content/answer keys are
-- otherwise accurate and unchanged.

-- a2-q-1100 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1100';
-- a2-q-1101 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1101';
-- a2-q-1102 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1102';
-- a2-q-1103 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1103';
-- a2-q-1104 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1104';
-- a2-q-1105 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1105';
-- a2-q-1106 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1106';
-- a2-q-1107 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1107';
-- a2-q-1108 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1108';
-- a2-q-1109 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1109';
-- a2-q-1110 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1110';
-- a2-q-1111 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.questions set objective = '4.6' where id = 'a2-q-1111';
-- a2-q-1112 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1112';
-- a2-q-1113 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1113';
-- a2-q-1114 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1114';
-- a2-q-1115 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1115';
-- a2-q-1116 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1116';
-- a2-q-1117 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1117';
-- a2-q-1118 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1118';
-- a2-q-1119 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1119';
-- a2-q-1120 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1120';
-- a2-q-1121 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1121';
-- a2-q-1122 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1122';
-- a2-q-1123 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1123';
-- a2-q-1124 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.questions set objective = '4.7' where id = 'a2-q-1124';
-- a2-q-1125 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1125';
-- a2-q-1126 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1126';
-- a2-q-1127 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1127';
-- a2-q-1128 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1128';
-- a2-q-1129 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1129';
-- a2-q-1130 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1130';
-- a2-q-1131 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1131';
-- a2-q-1132 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1132';
-- a2-q-1133 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1133';
-- a2-q-1134 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1134';
-- a2-q-1135 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1135';
-- a2-q-1136 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1136';
-- a2-q-1137 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.questions set objective = '4.8' where id = 'a2-q-1137';
-- a2-f-1100 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1100';
-- a2-f-1101 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1101';
-- a2-f-1102 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1102';
-- a2-f-1103 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1103';
-- a2-f-1104 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1104';
-- a2-f-1105 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1105';
-- a2-f-1106 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1106';
-- a2-f-1107 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1107';
-- a2-f-1108 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1108';
-- a2-f-1109 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1109';
-- a2-f-1110 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1110';
-- a2-f-1111 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1111';
-- a2-f-1112 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1112';
-- a2-f-1113 [E4]: Licensing/prohibited-content/chain-of-custody content is 4.6, not 4.5 (file is shifted by one objective number).
update public.flashcards set objective = '4.6' where id = 'a2-f-1113';
-- a2-f-1114 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1114';
-- a2-f-1115 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1115';
-- a2-f-1116 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1116';
-- a2-f-1117 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1117';
-- a2-f-1118 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1118';
-- a2-f-1119 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1119';
-- a2-f-1120 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1120';
-- a2-f-1121 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1121';
-- a2-f-1122 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1122';
-- a2-f-1123 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1123';
-- a2-f-1124 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1124';
-- a2-f-1125 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1125';
-- a2-f-1126 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1126';
-- a2-f-1127 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1127';
-- a2-f-1128 [E4]: Communication/professionalism content is 4.7, not 4.6 (file is shifted by one objective number).
update public.flashcards set objective = '4.7' where id = 'a2-f-1128';
-- a2-f-1129 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1129';
-- a2-f-1130 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1130';
-- a2-f-1131 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1131';
-- a2-f-1132 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1132';
-- a2-f-1133 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1133';
-- a2-f-1134 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1134';
-- a2-f-1135 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1135';
-- a2-f-1136 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1136';
-- a2-f-1137 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1137';
-- a2-f-1138 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1138';
-- a2-f-1139 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1139';
-- a2-f-1140 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1140';
-- a2-f-1141 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1141';
-- a2-f-1142 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1142';
-- a2-f-1143 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1143';
-- a2-f-1144 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1144';
-- a2-f-1145 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1145';
-- a2-f-1146 [E4]: Scripting content is 4.8, not 4.7 (file is shifted by one objective number).
update public.flashcards set objective = '4.8' where id = 'a2-f-1146';

-- ==== gaps (20260726000137): no fixes. All 84 questions and 103 flashcards  ====
-- ==== verified for E1-E6/W1-W4, including an E4 check; the 1.10/1.11/2.9/    ====
-- ==== 2.10/4.8/4.9 objective tags all correctly match the authoritative map, ====
-- ==== answer-key indexes were recounted and correct, and no duplicates were  ====
-- ==== found against the rest of the aplus2 bank. Nothing to fix.            ====
