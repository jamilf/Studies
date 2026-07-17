-- Review fixes for A+ Core 1 (220-1101) content bank, Scope A.
-- Files reviewed:
--   20260711000011_seed_aplus1.sql   (35 core + 12 acronym + 3 feynman flashcards, 45 questions)
--   20260714000010_expand_aplus1.sql (30 flashcards, 40 questions)
-- Objective tags corrected against the official CompTIA 220-1101 objectives:
-- 1.1 laptop hardware / 1.2 mobile display components / 1.3 mobile accessories & ports /
-- 1.4 mobile network connectivity & app support (incl. location services, MDM/MAM);
-- 2.1 TCP/UDP ports & protocols / 2.2 networking hardware (incl. PoE) / 2.3 wireless
-- protocols (802.11, frequencies, channels, NFC) / 2.4 services provided by networked
-- hosts / 2.5 SOHO networks & IP addressing (incl. APIPA, private ranges) / 2.6 network
-- configuration concepts (DNS records, DHCP, VLAN, VPN) / 2.7 internet & network types /
-- 2.8 networking tools; 3.1 cables & connectors / 3.2 RAM / 3.3 storage (incl. RAID) /
-- 3.4 motherboards, CPUs, add-on cards (incl. CMOS, PCIe, form factors) / 3.5 power
-- supplies / 3.6 printer deployment / 3.7 printer consumables & types; 4.1 cloud
-- concepts / 4.2 client-side virtualization; 5.1 methodology / 5.2 motherboard-RAM-CPU-
-- power issues / 5.3 storage issues / 5.4 video-display issues / 5.5 mobile issues /
-- 5.6 printer issues / 5.7 network issues.

-- ==== 20260711000011_seed_aplus1.sql: flashcards ====

-- a1-f-001 [E4]: laptop display panel types (IPS/TN/VA) are objective 1.2 (mobile display components), not 1.1 (laptop hardware install).
update public.flashcards set objective = '1.2' where id = 'a1-f-001';

-- a1-f-003 [E6]: duplicate of a1-f-039 (identical "docking station vs port replicator" front); a1-f-039 kept because its back actually defines what a port replicator is.
delete from public.flashcards where id = 'a1-f-003';

-- a1-f-006 [E4]: MDM/MAM is listed under objective 1.4 (mobile connectivity and application support), not 1.3 (accessories/ports).
update public.flashcards set objective = '1.4' where id = 'a1-f-006';

-- a1-f-009 [E4]: DHCP/dynamic addressing and APIPA sit under 2.5 (SOHO network IP addressing), not 2.2 (networking hardware).
update public.flashcards set objective = '2.5' where id = 'a1-f-009';

-- a1-f-010 [E4]: DNS record types (A/AAAA/MX/CNAME/TXT) are objective 2.6 (network configuration concepts), not 2.2 (networking hardware).
update public.flashcards set objective = '2.6' where id = 'a1-f-010';

-- a1-f-011 [E4+W4]: private IPv4 ranges belong to 2.5 (IP addressing), not 2.3 (wireless protocols); label-style front rewritten as a retrieval question.
update public.flashcards set objective = '2.5', front = $$What are the three private (RFC 1918) IPv4 address ranges?$$ where id = 'a1-f-011';

-- a1-f-012 [E4]: switch/router/AP comparison is 2.2 (networking hardware), not 2.4 (networked host services).
update public.flashcards set objective = '2.2' where id = 'a1-f-012';

-- a1-f-013 [E4]: 802.11n/ac/ax standards are 2.3 (wireless networking protocols), not 2.7 (internet/network types).
update public.flashcards set objective = '2.3' where id = 'a1-f-013';

-- a1-f-014 [E4]: 2.4 GHz vs 5 GHz frequencies/channels are 2.3 (wireless networking protocols), not 2.7.
update public.flashcards set objective = '2.3' where id = 'a1-f-014';

-- a1-f-015 [E4]: PoE (802.3af/at/bt, injectors/switches) is listed under 2.2 (networking hardware), not 2.6.
update public.flashcards set objective = '2.2' where id = 'a1-f-015';

-- a1-f-020 [E4]: RAID 0/1/5/10 drive configurations are objective 3.3 (storage devices), not 3.4 (motherboards/CPUs).
update public.flashcards set objective = '3.3' where id = 'a1-f-020';

-- a1-f-022 [E4]: CPU-to-motherboard compatibility (socket/chipset/BIOS) is 3.4 (motherboards/CPUs/add-on cards), not 3.5 (power supplies).
update public.flashcards set objective = '3.4' where id = 'a1-f-022';

-- a1-f-024 [E4]: hypervisor types are 4.2 (client-side virtualization); 4.1 is cloud-computing concepts.
update public.flashcards set objective = '4.2' where id = 'a1-f-024';

-- a1-f-025 [E4]: VM sandbox/test-development purposes are 4.2 (client-side virtualization), not 4.1.
update public.flashcards set objective = '4.2' where id = 'a1-f-025';

-- a1-f-026 [E4]: IaaS/PaaS/SaaS service models are 4.1 (cloud-computing concepts), not 4.2.
update public.flashcards set objective = '4.1' where id = 'a1-f-026';

-- a1-f-027 [E4]: public/private/hybrid/community deployment models are 4.1, not 4.2.
update public.flashcards set objective = '4.1' where id = 'a1-f-027';

-- a1-f-028 [E4]: cloud characteristics (elasticity, metered utilization...) are 4.1, not 4.2.
update public.flashcards set objective = '4.1' where id = 'a1-f-028';

-- a1-f-033 [E4]: faded/streaked laser output is 5.6 (troubleshoot printers); 5.4 is video/display issues.
update public.flashcards set objective = '5.6' where id = 'a1-f-033';

-- a1-f-034 [E4]: office Wi-Fi drops are 5.7 (troubleshoot wired/wireless networks); 5.5 is mobile-device issues.
update public.flashcards set objective = '5.7' where id = 'a1-f-034';

-- a1-f-035 [E4]: APIPA/no-internet diagnosis is 5.7 (network troubleshooting), not 5.5 (mobile devices).
update public.flashcards set objective = '5.7' where id = 'a1-f-035';

-- a1-a-003 [E4]: NAT is a SOHO router/addressing topic under 2.5, not 2.3 (wireless protocols).
update public.flashcards set objective = '2.5' where id = 'a1-a-003';

-- a1-a-004 [E4]: PoE is 2.2 (networking hardware), not 2.6.
update public.flashcards set objective = '2.2' where id = 'a1-a-004';

-- a1-a-008 [E4]: VM is 4.2 (client-side virtualization); 4.1 is cloud concepts.
update public.flashcards set objective = '4.2' where id = 'a1-a-008';

-- a1-a-009 [E4]: SaaS is 4.1 (cloud concepts), not 4.2.
update public.flashcards set objective = '4.1' where id = 'a1-a-009';

-- a1-a-010 [E4]: APIPA in the troubleshooting domain maps to 5.7 (network issues), not 5.5 (mobile devices).
update public.flashcards set objective = '5.7' where id = 'a1-a-010';

-- a1-a-011 [E4]: MDM is listed under 1.4 (mobile connectivity/app support), not 1.3.
update public.flashcards set objective = '1.4' where id = 'a1-a-011';

-- a1-y-002 [E4]: DHCP/DNS/gateway walkthrough maps to 2.6 (network configuration concepts), not 2.2 (hardware).
update public.flashcards set objective = '2.6' where id = 'a1-y-002';

-- a1-y-003 [E4]: IaaS/PaaS/SaaS pizza analogy is 4.1 (cloud concepts), not 4.2.
update public.flashcards set objective = '4.1' where id = 'a1-y-003';

-- ==== 20260711000011_seed_aplus1.sql: questions ====

-- a1-q-001 [E4]: display panel selection is 1.2 (mobile display components), not 1.1.
update public.questions set objective = '1.2' where id = 'a1-q-001';

-- a1-q-004 [E6]: duplicate of a1-q-047 (identical NFC tap-to-pay fact); scenario-style a1-q-047 kept.
delete from public.questions where id = 'a1-q-004';

-- a1-q-005 [E4]: MDM/MAM BYOD controls are objective 1.4, not 1.3.
update public.questions set objective = '1.4' where id = 'a1-q-005';

-- a1-q-009 [E6]: duplicate of a1-q-050 (same 169.254.x.x APIPA-diagnosis stem); a1-q-050 kept for its stronger "valid RFC 1918 address" distractor.
delete from public.questions where id = 'a1-q-009';

-- a1-q-010 [E4]: identifying the failing DNS service maps to 2.4 (services provided by networked hosts), not 2.2 (hardware).
update public.questions set objective = '2.4' where id = 'a1-q-010';

-- a1-q-011 [E4]: private-range identification is 2.5 (IP addressing), not 2.3 (wireless protocols).
update public.questions set objective = '2.5' where id = 'a1-q-011';

-- a1-q-012 [E4]: the switch as a Layer-2 device is 2.2 (networking hardware), not 2.4 (host services).
update public.questions set objective = '2.2' where id = 'a1-q-012';

-- a1-q-013 [E4]: 2.4 GHz channel planning (1/6/11) is 2.3 (wireless protocols), not 2.7.
update public.questions set objective = '2.3' where id = 'a1-q-013';

-- a1-q-014 [E4]: band selection (2.4 vs 5 GHz range/penetration) is 2.3, not 2.7.
update public.questions set objective = '2.3' where id = 'a1-q-014';

-- a1-q-015 [E4]: PoE is 2.2 (networking hardware), not 2.6.
update public.questions set objective = '2.2' where id = 'a1-q-015';

-- a1-q-019 [E6]: duplicate of a1-q-058 (same DDR4/DDR5 cross-generation incompatibility fact); scenario-style a1-q-058 with the notch-position detail kept.
delete from public.questions where id = 'a1-q-019';

-- a1-q-021 [E4]: RAID level selection is 3.3 (storage devices), not 3.4.
update public.questions set objective = '3.3' where id = 'a1-q-021';

-- a1-q-023 [E4]: CPU/motherboard matching (socket/chipset/BIOS) is 3.4, not 3.5 (power supplies).
update public.questions set objective = '3.4' where id = 'a1-q-023';

-- a1-q-026 [E4]: hypervisor types are 4.2 (client-side virtualization), not 4.1 (cloud).
update public.questions set objective = '4.2' where id = 'a1-q-026';

-- a1-q-027 [E4]: sandbox-VM purpose is 4.2 (client-side virtualization), not 4.1.
update public.questions set objective = '4.2' where id = 'a1-q-027';

-- a1-q-028 [E4]: SaaS adoption is 4.1 (cloud concepts), not 4.2.
update public.questions set objective = '4.1' where id = 'a1-q-028';

-- a1-q-029 [E4]: rapid elasticity is a 4.1 cloud characteristic, not 4.2.
update public.questions set objective = '4.1' where id = 'a1-q-029';

-- a1-q-030 [E4]: hybrid deployment model is 4.1, not 4.2.
update public.questions set objective = '4.1' where id = 'a1-q-030';

-- a1-q-035 [E4]: repeating vertical line on laser prints is 5.6 (printer troubleshooting), not 5.4 (video/display).
update public.questions set objective = '5.6' where id = 'a1-q-035';

-- a1-q-036 [E4+W2]: localized Wi-Fi problems are 5.7 (network troubleshooting), not 5.5 (mobile); joke distractor "Shorten the office" replaced with a plausible-but-irrelevant network change.
update public.questions set objective = '5.7', choices = $q$["Replace the router","Check signal strength/interference in that area (site survey) and adjust channel or AP placement","Reinstall Windows on their laptops","Increase the DHCP lease duration"]$q$::jsonb where id = 'a1-q-036';

-- a1-q-037 [E4+W1]: ipconfig question is 5.7 (network troubleshooting), not 5.5; stem stored a literal doubled apostrophe ("PC''s") inside dollar quotes.
update public.questions set objective = '5.7', stem = $q$Which command shows a Windows PC's IP address, gateway, and DNS servers?$q$ where id = 'a1-q-037';

-- a1-q-038 [E4]: ping-by-IP-but-not-name diagnosis is 5.7, not 5.5 (mobile devices).
update public.questions set objective = '5.7' where id = 'a1-q-038';

-- a1-q-039 [E4]: docking stations are objective 1.3 (accessories/ports), not 1.2 (display components).
update public.questions set objective = '1.3' where id = 'a1-q-039';

-- a1-q-041 [E4+W1]: the modem is 2.2 networking hardware, not 2.4 (host services); stem stored a literal doubled apostrophe ("ISP''s").
update public.questions set objective = '2.2', stem = $q$Which device translates between an ISP's coax/fiber signal and your home Ethernet network?$q$ where id = 'a1-q-041';

-- a1-q-043 [W1+W2]: stem stored a literal doubled apostrophe ("phone''s"); joke distractor "The flashlight" replaced with a same-category wireless technology.
update public.questions set stem = $q$A phone's GPS works outdoors but location is poor inside a mall. Which technology helps phones locate indoors?$q$, choices = $q$["More GPS satellites","Wi-Fi positioning from known access points","NFC","An IR blaster"]$q$::jsonb where id = 'a1-q-043';

-- a1-q-044 [E4]: VM snapshots are 4.2 (client-side virtualization), not 4.1.
update public.questions set objective = '4.2' where id = 'a1-q-044';

-- a1-q-045 [E6]: duplicate of a1-q-076 (dust-caked heatsink -> thermal shutdown); a1-q-076 kept - its distractors are plausible while this one's ("full recycle bin - empty it") are throwaways.
delete from public.questions where id = 'a1-q-045';

-- ==== 20260714000010_expand_aplus1.sql: flashcards ====

-- a1-f-036 [E6]: duplicate of a1-f-001 (IPS = best color accuracy/viewing angles); a1-f-001 kept - it also contrasts VA.
delete from public.flashcards where id = 'a1-f-036';

-- a1-f-037 [E4]: NFC vs Bluetooth connection methods are 1.3 (accessories/ports), not 1.2 (display components).
update public.flashcards set objective = '1.3' where id = 'a1-f-037';

-- a1-f-038 [E4]: MDM remote wipe is 1.4 (MDM/MAM), not 1.3.
update public.flashcards set objective = '1.4' where id = 'a1-f-038';

-- a1-f-039 [E4]: docking station vs port replicator is 1.3 (accessories/ports), not 1.1 (laptop hardware).
update public.flashcards set objective = '1.3' where id = 'a1-f-039';

-- a1-f-040 [E6]: duplicate APIPA card - a1-f-009 (kept) and a1-f-035 already cover the DHCP-failure meaning of 169.254.x.x.
delete from public.flashcards where id = 'a1-f-040';

-- a1-f-041 [E6]: duplicate of a1-f-011 (identical three RFC 1918 private ranges).
delete from public.flashcards where id = 'a1-f-041';

-- a1-f-042 [E6]: strict subset of a1-f-007 (ports 80/443/25/3389 are all covered there along with more).
delete from public.flashcards where id = 'a1-f-042';

-- a1-f-043 [E4]: NAT on a SOHO router is 2.5 (SOHO network configuration/addressing), not 2.1 (ports/protocols).
update public.flashcards set objective = '2.5' where id = 'a1-f-043';

-- a1-f-045 [E6]: duplicate of a1-f-016 (Cat5e vs Cat6 speeds); a1-f-016 kept - it adds Cat6a and the ~55 m 10-Gbps limit.
delete from public.flashcards where id = 'a1-f-045';

-- a1-f-046 [E6]: duplicate of a1-f-012 (switch = MAC within LAN vs router = IP between networks).
delete from public.flashcards where id = 'a1-f-046';

-- a1-f-047 [E6]: duplicate of a1-f-018 (DDR4 vs DDR5 differences); a1-f-018 kept - it adds voltage, on-module power management, and SO-DIMM specifics.
delete from public.flashcards where id = 'a1-f-047';

-- a1-f-048 [E6]: duplicate of a1-f-019 (NVMe vs SATA SSD); a1-f-019 kept - it has the real throughput numbers.
delete from public.flashcards where id = 'a1-f-048';

-- a1-f-049 [E6]: duplicate of a1-f-022 (CPU/motherboard matching); a1-f-022 kept - it also covers chipset support and BIOS version.
delete from public.flashcards where id = 'a1-f-049';

-- a1-f-050 [E4]: motherboard form factors (ATX/microATX/Mini-ITX) are 3.4 (motherboards), not 3.3 (storage).
update public.flashcards set objective = '3.4' where id = 'a1-f-050';

-- a1-f-052 [E4]: a fuser failure SYMPTOM is troubleshooting content - domain 5, objective 5.6 (printer issues), not 3.5 (power supplies).
update public.flashcards set domain = 5, objective = '5.6' where id = 'a1-f-052';

-- a1-f-053 [E4]: thermal printer characteristics are 3.7 (printer consumables/types), not 3.5 (power supplies).
update public.flashcards set objective = '3.7' where id = 'a1-f-053';

-- a1-f-054 [E4]: PCIe expansion slots are motherboard connector types under 3.4, not 3.1 (cables).
update public.flashcards set objective = '3.4' where id = 'a1-f-054';

-- a1-f-055 [E6]: duplicate of a1-f-024 (Type 1 vs Type 2 hypervisor, near-identical front); a1-f-024 kept - it names concrete products (ESXi, VirtualBox).
delete from public.flashcards where id = 'a1-f-055';

-- a1-f-056 [E6]: duplicate of a1-f-026 (IaaS/PaaS/SaaS); a1-f-026 kept - concrete product examples aid recall and a1-y-003 already teaches the responsibility split.
delete from public.flashcards where id = 'a1-f-056';

-- a1-f-057 [E4]: objective 4.3 does not exist in 220-1101; elasticity and resource pooling are 4.1 cloud characteristics.
update public.flashcards set objective = '4.1' where id = 'a1-f-057';

-- a1-f-058 [E6]: duplicate of a1-f-029 (identical six-step troubleshooting methodology card).
delete from public.flashcards where id = 'a1-f-058';

-- a1-f-060 [E6]: duplicate of a1-f-030 (power-on/no-display first checks); a1-f-030 kept - it lists the fuller check sequence (reseat RAM/GPU, beep codes, onboard video).
delete from public.flashcards where id = 'a1-f-060';

-- a1-f-062 [E4]: ipconfig/ping/tracert are 5.7 (network troubleshooting), not 5.4 (video/display).
update public.flashcards set objective = '5.7' where id = 'a1-f-062';

-- a1-f-064 [E4]: printer symptom triage is 5.6 (printer troubleshooting), not 5.5 (mobile devices).
update public.flashcards set objective = '5.6' where id = 'a1-f-064';

-- a1-f-065 [E6]: duplicate of a1-f-034 (intermittent Wi-Fi drop causes: interference/channel overlap/coverage).
delete from public.flashcards where id = 'a1-f-065';

-- ==== 20260714000010_expand_aplus1.sql: questions ====

-- a1-q-046 [E6]: duplicate of a1-q-001 (IPS for photo/design editing) with throwaway distractors ("Any panel, since they are all equivalent"); a1-q-001 kept.
delete from public.questions where id = 'a1-q-046';

-- a1-q-047 [E4]: NFC as a connection method is 1.3 (accessories/ports), not 1.2 (display components).
update public.questions set objective = '1.3' where id = 'a1-q-047';

-- a1-q-048 [E4]: MDM remote wipe is 1.4 (MDM/MAM), not 1.3.
update public.questions set objective = '1.4' where id = 'a1-q-048';

-- a1-q-049 [E4+W2]: docking stations are 1.3, not 1.1; off-category distractors (USB flash drive, wireless AP) replaced with plausible desk accessories, explanation refutes them.
update public.questions set objective = '1.3', choices = $q$["A docking station","A port replicator","A powered USB hub","An HDMI splitter"]$q$::jsonb, explanation = $q$A docking station provides expanded, desktop-class connectivity (multiple displays, USB, Ethernet) over one connection. A port replicator mainly duplicates the laptop's existing ports, a powered USB hub adds only USB ports, and an HDMI splitter mirrors a single video signal to multiple screens.$q$ where id = 'a1-q-049';

-- a1-q-050 [E4]: APIPA diagnosis is 2.5 (IP addressing), not 2.1 (ports/protocols).
update public.questions set objective = '2.5' where id = 'a1-q-050';

-- a1-q-051 [E6]: duplicate of a1-q-011 (identify the private IPv4 address); a1-q-011 kept for its stronger 172.32.0.1 boundary-trap distractor.
delete from public.questions where id = 'a1-q-051';

-- a1-q-052 [E4]: default-port recall (RDP 3389) is 2.1 (ports/protocols), not 2.2 (hardware).
update public.questions set objective = '2.1' where id = 'a1-q-052';

-- a1-q-053 [E4]: NAT on a SOHO router is 2.5 (SOHO configuration), not 2.1 (ports/protocols).
update public.questions set objective = '2.5' where id = 'a1-q-053';

-- a1-q-055 [E4]: network cable selection (Cat6 vs Cat5e) is domain 3, objective 3.1 (cables), not domain 2 objective 2.4.
update public.questions set domain = 3, objective = '3.1' where id = 'a1-q-055';

-- a1-q-056 [E6]: duplicate of a1-q-012 (switch forwards frames by MAC within one LAN); a1-q-012 kept - cleaner distractor set (router/modem/repeater).
delete from public.questions where id = 'a1-q-056';

-- a1-q-057 [E4]: HTTPS port 443 firewall rule is 2.1 (ports/protocols), not 2.2.
update public.questions set objective = '2.1' where id = 'a1-q-057';

-- a1-q-058 [E4]: RAM generation compatibility is 3.2 (RAM), not 3.1 (cables).
update public.questions set objective = '3.2' where id = 'a1-q-058';

-- a1-q-059 [E4]: storage device selection (NVMe fastest) is 3.3 (storage devices), not 3.2 (RAM).
update public.questions set objective = '3.3' where id = 'a1-q-059';

-- a1-q-060 [E4+W2]: CPU socket matching is 3.4 (motherboards/CPUs), not 3.1 (cables); hedged distractor "The CPU's marketing name only" replaced with clock speed - a plausible spec that does NOT have to match.
update public.questions set objective = '3.4', choices = $q$["The CPU socket type","The CPU clock speed","The case form factor","The power supply wattage"]$q$::jsonb where id = 'a1-q-060';

-- a1-q-061 [E4]: motherboard form factors are 3.4, not 3.3 (storage).
update public.questions set objective = '3.4' where id = 'a1-q-061';

-- a1-q-063 [E4+W2]: toner-smears/not-fusing symptom is domain 5, objective 5.6 (printer troubleshooting), not 3.5 (power supplies); hedge word "only" removed from the imaging-drum distractor.
update public.questions set domain = 5, objective = '5.6', choices = $q$["The fuser","The imaging drum","The paper tray","The network interface"]$q$::jsonb where id = 'a1-q-063';

-- a1-q-064 [E4]: printer-type selection (thermal for receipts) is 3.7 (printer types/consumables), not 3.5 (power supplies).
update public.questions set objective = '3.7' where id = 'a1-q-064';

-- a1-q-065 [E4]: PCIe x16 slots are a 3.4 motherboard-connector topic, not 3.1 (cables).
update public.questions set objective = '3.4' where id = 'a1-q-065';

-- a1-q-066 [E6]: duplicate of a1-q-020 (swap HDD for NVMe SSD as the biggest performance upgrade) with weak off-category distractors (second monitor, case fans, smaller case).
delete from public.questions where id = 'a1-q-066';

-- a1-q-067 [E4+W2]: PSU wattage sufficiency is 3.5 (power supplies), not 3.4; joke distractor "The color of the PSU cables" replaced with the 80 PLUS efficiency rating and explanation refutes it.
update public.questions set objective = '3.5', choices = $q$["The combined power draw of all installed components, especially the CPU and GPU, under full load","The size of the PSU's physical case","The number of SATA ports on the PSU","The PSU's 80 PLUS efficiency rating"]$q$::jsonb, explanation = $q$PSU wattage must exceed the combined peak power draw of all components (CPU, GPU, drives, fans) with headroom for stability and future upgrades - primarily driven by the CPU and GPU. An 80 PLUS rating describes how efficiently the unit converts AC to DC, not how much power it can deliver.$q$ where id = 'a1-q-067';

-- a1-q-068 [E6]: duplicate of a1-q-021 (two-disk mirror = RAID 1); a1-q-021 kept - four RAID levels as distractors beat JBOD/"single non-redundant drive".
delete from public.questions where id = 'a1-q-068';

-- a1-q-069 [E6]: duplicate of a1-q-026 (bare-metal hypervisor = Type 1); a1-q-026 kept - "firmware-level BIOS hypervisor" here is a fabricated distractor.
delete from public.questions where id = 'a1-q-069';

-- a1-q-070 [E4+W2]: IaaS is 4.1 (cloud concepts), not 4.2; hedge word "exclusively" removed from the DaaS distractor.
update public.questions set objective = '4.1', choices = $q$["IaaS (Infrastructure as a Service)","PaaS (Platform as a Service)","SaaS (Software as a Service)","DaaS (Desktop as a Service)"]$q$::jsonb where id = 'a1-q-070';

-- a1-q-071 [E4]: objective 4.3 does not exist in 220-1101; VM host resource requirements are 4.2 (client-side virtualization).
update public.questions set objective = '4.2' where id = 'a1-q-071';

-- a1-q-075 [E4]: power-on/no-display with fans and drive lights working is 5.4 (video/display troubleshooting), not 5.3 (storage).
update public.questions set objective = '5.4' where id = 'a1-q-075';

-- a1-q-077 [E4+W2]: ping is 5.7 (network troubleshooting), not 5.4; hedge word "exclusively" removed so all four options are plain commands.
update public.questions set objective = '5.7', choices = $q$["ping","ipconfig","tracert","nslookup"]$q$::jsonb where id = 'a1-q-077';

-- a1-q-078 [E4+W2]: tracert is 5.7, not 5.4; hedged/off-category distractors ("ping alone, without any other tool", "attrib") replaced with plain networking commands.
update public.questions set objective = '5.7', choices = $q$["tracert","ipconfig","ping","netstat"]$q$::jsonb where id = 'a1-q-078';

-- a1-q-079 [E4+W2]: ipconfig is 5.7, not 5.4; hedge word "exclusively" removed from the netstat distractor.
update public.questions set objective = '5.7', choices = $q$["ipconfig","ping","tracert","netstat"]$q$::jsonb where id = 'a1-q-079';

-- a1-q-081 [E4]: faded/streaky laser output is 5.6 (printer troubleshooting), not 5.5 (mobile devices).
update public.questions set objective = '5.6' where id = 'a1-q-081';

-- a1-q-082 [E4]: microwave 2.4 GHz interference is 5.7 (wireless network troubleshooting), not 5.4 (video).
update public.questions set objective = '5.7' where id = 'a1-q-082';

-- a1-q-083 [W2]: self-refuting distractor "Escalate the ticket unnecessarily" reworded to a neutral, plausible action.
update public.questions set choices = $q$["Document findings, actions, and outcomes","Re-identify the original problem","Re-test the original theory of probable cause","Escalate the ticket to a senior technician"]$q$::jsonb where id = 'a1-q-083';

-- a1-q-084 [W2]: hedged distractor "Establishing a plan of action, without any testing" trimmed to the plain methodology step.
update public.questions set choices = $q$["Testing the theory to determine cause","Identifying the problem","Documenting findings","Establishing a plan of action"]$q$::jsonb where id = 'a1-q-084';
