-- Review fixes: Network+ (N10-009) flashcards and questions.
-- Scope: 20260711000013_seed_netplus.sql, 20260714000012_expand_netplus.sql
-- N10-009 blueprint used for tag checks: 1.1 OSI, 1.2 appliances/functions (VPN/QoS/TTL),
-- 1.3 cloud, 1.4 ports/protocols/traffic types, 1.5 media/transceivers, 1.6 topologies/types,
-- 1.7 IPv4 addressing, 1.8 evolving (SDN/SD-WAN, IPv6); 2.1 routing (incl. NAT/PAT, FHRP),
-- 2.2 switching, 2.3 wireless, 2.4 physical installations; 3.1 processes/documentation,
-- 3.2 monitoring (SNMP/flow/baseline/log aggregation), 3.3 DR/HA, 3.4 network services
-- (DHCP/DNS/NTP), 3.5 network access/management (VPN/SSH); 4.1 concepts (IAM/RADIUS/TACACS+),
-- 4.2 attacks, 4.3 defense features (hardening/NAC/ACL/screened subnet); 5.1 methodology,
-- 5.2 cabling/physical-interface issues, 5.3 network-services issues, 5.4 performance issues,
-- 5.5 tools.

-- ============ seed flashcards ============

-- n-f-011 [E4]: star/mesh/hybrid topologies tagged 1.3 (cloud concepts); topologies are objective 1.6
update public.flashcards set objective = '1.6' where id = 'n-f-011';

-- n-f-012 [E4]: VLAN tagged domain 1 obj 1.5 (transmission media); VLANs are switching technologies, objective 2.2
update public.flashcards set domain = 2, objective = '2.2' where id = 'n-f-012';

-- n-f-013 [E1+E4]: back lumped Cat7 with Cat8 as "short-run data-center" - Cat7 is a 100 m class cable (Cat8 is the 30 m short-run one); also copper categories are media (1.5), not routing (2.1)
update public.flashcards set domain = 1, objective = '1.5', back = $$Cat5e 1 Gbps/100 m; Cat6 1 Gbps (10 Gbps only to ~55 m); Cat6a 10 Gbps to 100 m; Cat7 shielded 10 Gbps/100 m (GG45/TERA connectors, rare); Cat8 25/40 Gbps to 30 m for data-center switch-to-server runs (RJ45).$$ where id = 'n-f-013';

-- n-f-014 [E4]: T568A/B pin-outs tagged 2.1 (routing); copper termination belongs with transmission media, objective 1.5
update public.flashcards set domain = 1, objective = '1.5' where id = 'n-f-014';

-- n-f-017 [E4]: DHCP DORA tagged 2.3 (wireless); DHCP is an IPv4/IPv6 network service, objective 3.4
update public.flashcards set domain = 3, objective = '3.4' where id = 'n-f-017';

-- n-f-018 [E4]: DHCP relay tagged 2.3 (wireless); DHCP relay/IP helper is a network service, objective 3.4
update public.flashcards set domain = 3, objective = '3.4' where id = 'n-f-018';

-- n-f-019 [E4]: Wi-Fi generations/bands tagged 2.4 (physical installations); wireless technologies are objective 2.3
update public.flashcards set objective = '2.3' where id = 'n-f-019';

-- n-f-020 [E4]: 2.4 GHz channels tagged 2.4 (physical installations); wireless channels are objective 2.3
update public.flashcards set objective = '2.3' where id = 'n-f-020';

-- n-f-021 [E4]: SNMP tagged 3.1 (org processes/documentation); network monitoring technologies are objective 3.2
update public.flashcards set objective = '3.2' where id = 'n-f-021';

-- n-f-022 [E4]: syslog tagged 3.1 (org processes/documentation); log aggregation is monitoring, objective 3.2
update public.flashcards set objective = '3.2' where id = 'n-f-022';

-- n-f-024 [E4]: QoS tagged 3.3 (disaster recovery); QoS is a networking function under objective 1.2
update public.flashcards set domain = 1, objective = '1.2' where id = 'n-f-024';

-- n-f-025 [E4]: active-active/active-passive HA tagged 3.4 (network services); HA approaches sit under DR concepts, objective 3.3
update public.flashcards set objective = '3.3' where id = 'n-f-025';

-- n-f-026 [E4]: cloud connectivity (VPN/direct connect/NFV) tagged 3.5; cloud concepts and connectivity options are objective 1.3
update public.flashcards set domain = 1, objective = '1.3' where id = 'n-f-026';

-- n-f-030 [E4]: 802.1X/NAC tagged 4.2 (attacks); NAC is a security feature/defense, objective 4.3
update public.flashcards set objective = '4.3' where id = 'n-f-030';

-- n-f-034 [E4]: VPN types tagged 4.2 (attacks); site-to-site vs client VPN and IPsec/TLS sit under network access methods, objective 3.5
update public.flashcards set domain = 3, objective = '3.5' where id = 'n-f-034';

-- n-f-036 [E4]: ping/traceroute/pathping tagged 5.2 (cabling issues); troubleshooting tools are objective 5.5
update public.flashcards set objective = '5.5' where id = 'n-f-036';

-- n-f-037 [E4]: ipconfig/nslookup/netstat/arp tagged 5.2 (cabling issues); command-line tools are objective 5.5
update public.flashcards set objective = '5.5' where id = 'n-f-037';

-- n-f-038 [E4]: cable tester/toner/OTDR/loopback tagged 5.3 (network-services issues); hardware tools are objective 5.5
update public.flashcards set objective = '5.5' where id = 'n-f-038';

-- n-f-039 [E4]: attenuation/crosstalk/EMI tagged 5.4 (performance issues); physical-layer cabling issues are objective 5.2
update public.flashcards set objective = '5.2' where id = 'n-f-039';

-- n-f-040 [E4]: duplex/speed mismatch tagged 5.5 (tools); it is a physical-interface issue, objective 5.2
update public.flashcards set objective = '5.2' where id = 'n-f-040';

-- ============ seed acronym + feynman decks ============

-- n-a-002 [E4]: VLAN acronym tagged domain 1 obj 1.5 (transmission media); VLANs are switching, objective 2.2
update public.flashcards set domain = 2, objective = '2.2' where id = 'n-a-002';

-- n-a-004 [E4]: DHCP acronym tagged 2.3 (wireless); DHCP is a network service, objective 3.4
update public.flashcards set domain = 3, objective = '3.4' where id = 'n-a-004';

-- n-a-005 [E4]: QoS acronym tagged 3.3 (disaster recovery); QoS is a networking function under objective 1.2
update public.flashcards set domain = 1, objective = '1.2' where id = 'n-a-005';

-- n-a-006 [E4]: SNMP acronym tagged 3.1 (org processes); monitoring technologies are objective 3.2
update public.flashcards set objective = '3.2' where id = 'n-a-006';

-- n-a-007 [E4]: NAC acronym tagged 4.2 (attacks); NAC is a defense feature, objective 4.3
update public.flashcards set objective = '4.3' where id = 'n-a-007';

-- n-a-010 [E4]: SD-WAN acronym tagged 3.5; SD-WAN sits under evolving use cases, objective 1.8
update public.flashcards set domain = 1, objective = '1.8' where id = 'n-a-010';

-- n-a-012 [E4]: ICMP acronym tagged 5.2 (cabling issues); ICMP is listed under ports/protocols/traffic types, objective 1.4
update public.flashcards set domain = 1, objective = '1.4' where id = 'n-a-012';

-- n-y-003 [E4]: ping+traceroute feynman tagged 5.2 (cabling issues); tool usage is objective 5.5
update public.flashcards set objective = '5.5' where id = 'n-y-003';

-- n-y-005 [E4]: QoS feynman tagged 3.3 (disaster recovery); QoS is a networking function under objective 1.2
update public.flashcards set domain = 1, objective = '1.2' where id = 'n-y-005';

-- ============ seed questions ============

-- n-q-010 [E6]: true duplicate of n-q-054 - both test that a VLAN logically segments one switch into separate broadcast domains without new hardware; keeping n-q-054 (scenario-based stem, correct 2.2 tag)
delete from public.questions where id = 'n-q-010';

-- n-q-013 [E4]: Cat6a question tagged 2.1 (routing); copper cable categories are transmission media, objective 1.5
update public.questions set domain = 1, objective = '1.5' where id = 'n-q-013';

-- n-q-016 [E4]: DHCP DORA ordering tagged 2.3 (wireless); DHCP is a network service, objective 3.4
update public.questions set domain = 3, objective = '3.4' where id = 'n-q-016';

-- n-q-017 [E4]: DHCP relay question tagged 2.3 (wireless); DHCP relay is a network service, objective 3.4
update public.questions set domain = 3, objective = '3.4' where id = 'n-q-017';

-- n-q-018 [E4]: Wi-Fi 6E question tagged 2.4 (physical installations); wireless frequency options are objective 2.3
update public.questions set objective = '2.3' where id = 'n-q-018';

-- n-q-019 [E4]: 1/6/11 channels question tagged 2.4 (physical installations); wireless channels are objective 2.3
update public.questions set objective = '2.3' where id = 'n-q-019';

-- n-q-020 [E4]: 400 m fiber-vs-copper question tagged 2.1 (routing); media selection is objective 1.5
update public.questions set domain = 1, objective = '1.5' where id = 'n-q-020';

-- n-q-022 [E4]: SNMPv3 question tagged 3.1 (org processes); SNMP monitoring is objective 3.2
update public.questions set objective = '3.2' where id = 'n-q-022';

-- n-q-023 [E6]: true duplicate of n-q-061 - both test that syslog is the protocol for central log collection; keeping n-q-061 (stronger same-category distractors: SNMP/NetFlow vs HTTP/FTP)
delete from public.questions where id = 'n-q-023';

-- n-q-024 [E6]: true duplicate of n-q-064 - same scenario (choppy real-time audio during downloads, configure QoS) with near-identical keyed option; keeping n-q-064 (more plausible distractor set: NAT/VLAN/static route vs subnet/SSID/STP)
delete from public.questions where id = 'n-q-024';

-- n-q-025 [E6]: true duplicate of n-q-063 - both test that a baseline records normal behavior so deviations reveal problems; keeping n-q-063 (scenario stem and plausible distractors vs "To slow the network"/"To encrypt logs")
delete from public.questions where id = 'n-q-025';

-- n-q-026 [E4]: active-passive HA question tagged 3.4 (network services); HA approaches are DR concepts, objective 3.3
update public.questions set objective = '3.3' where id = 'n-q-026';

-- n-q-027 [E4]: SD-WAN question tagged 3.5; SD-WAN sits under evolving use cases, objective 1.8
update public.questions set domain = 1, objective = '1.8' where id = 'n-q-027';

-- n-q-028 [E4]: SNMP trap question tagged 3.1 (org processes); SNMP monitoring is objective 3.2
update public.questions set objective = '3.2' where id = 'n-q-028';

-- n-q-029 [E4]: 802.1X question tagged 4.2 (attacks); port-based network access control is a defense feature, objective 4.3
update public.questions set objective = '4.3' where id = 'n-q-029';

-- n-q-033 [E4]: site-to-site VPN question tagged 4.2 (attacks); VPN types sit under network access methods, objective 3.5
update public.questions set domain = 3, objective = '3.5' where id = 'n-q-033';

-- n-q-036 [E4]: traceroute question tagged 5.2 (cabling issues); command-line tools are objective 5.5
update public.questions set objective = '5.5' where id = 'n-q-036';

-- n-q-037 [E4]: nslookup/dig question tagged 5.2 (cabling issues); command-line tools are objective 5.5
update public.questions set objective = '5.5' where id = 'n-q-037';

-- n-q-038 [E4]: toner probe question tagged 5.3 (network-services issues); hardware tools are objective 5.5
update public.questions set objective = '5.5' where id = 'n-q-038';

-- n-q-039 [E4+W2]: "The switch is too fast"/"Too little RAM" were throwaway distractors - replace with same-category causes and refute the tempting duplex mismatch; also cabling issues are 5.2, not 5.4 (answer stays index 1)
update public.questions set objective = '5.2', choices = $q$["A duplex mismatch on the switch port","Attenuation - the run exceeds the 100 m copper limit","An exhausted DHCP scope","A wrong DNS server"]$q$::jsonb, explanation = $q$Twisted-pair Ethernet is rated to 100 m; at 130 m attenuation causes intermittent errors and degraded throughput - shorten the run, add an intermediate switch/repeater, or use fiber. A duplex mismatch causes similar errors at any length, but the out-of-spec run length in the stem points to attenuation; DHCP and DNS problems affect addressing and name resolution, not link-level errors.$q$ where id = 'n-q-039';

-- n-q-040 [E4+W2]: "An unplugged monitor"/"A weak Wi-Fi signal" were throwaway distractors on a wired-link item - replace with plausible wired-link faults and refute each; also interface issues are 5.2, not 5.5 (answer stays index 0)
update public.questions set objective = '5.2', choices = $q$["A duplex mismatch between the two ends","An MTU mismatch on the link","A damaged patch cable","A misconfigured native VLAN"]$q$::jsonb, explanation = $q$Late collisions with poor throughput are the classic duplex-mismatch signature (one side half-duplex, the other full). Set both ends to the same speed/duplex or both to auto-negotiate - never one auto, one fixed. A damaged cable produces CRC errors rather than late collisions, an MTU mismatch drops or fragments oversized frames, and a native-VLAN mismatch misdirects untagged traffic - none of them cause late collisions.$q$ where id = 'n-q-040';

-- n-q-041 [E4]: APIPA/DHCP-failure question tagged 5.2 (cabling issues); address-assignment failures are network-services issues, objective 5.3
update public.questions set objective = '5.3' where id = 'n-q-041';

-- n-q-042 [E4]: star topology question tagged 1.3 (cloud concepts); topologies are objective 1.6
update public.questions set objective = '1.6' where id = 'n-q-042';

-- n-q-044 [E4]: NAC posture question tagged 4.2 (attacks); NAC is a defense feature, objective 4.3
update public.questions set objective = '4.3' where id = 'n-q-044';

-- ============ expand flashcards ============

-- n-f-041 [E4]: TCP vs UDP behavior tagged 1.1 (OSI model); TCP/UDP are listed under protocols/traffic types, objective 1.4
update public.flashcards set objective = '1.4' where id = 'n-f-041';

-- n-f-042 [E4]: /26 CIDR-to-mask card tagged 1.2 (appliances); IPv4 addressing/subnetting is objective 1.7
update public.flashcards set objective = '1.7' where id = 'n-f-042';

-- n-f-043 [E4]: DNS record types tagged 1.3 (cloud concepts); DNS record types sit under network services, objective 3.4
update public.flashcards set domain = 3, objective = '3.4' where id = 'n-f-043';

-- n-f-044 [E4]: IPv6 shorthand rules tagged 1.2 (appliances); IPv6 addressing sits under objective 1.8
update public.flashcards set objective = '1.8' where id = 'n-f-044';

-- n-f-045 [E4]: star vs full mesh tagged 1.4 (ports/protocols); topologies are objective 1.6
update public.flashcards set objective = '1.6' where id = 'n-f-045';

-- n-f-046 [E4]: SDN control/data plane tagged 1.1 (OSI model); SDN sits under evolving use cases, objective 1.8
update public.flashcards set objective = '1.8' where id = 'n-f-046';

-- n-f-047 [E4]: NFV tagged 1.1 (OSI model); NFV is listed under cloud concepts, objective 1.3
update public.flashcards set objective = '1.3' where id = 'n-f-047';

-- n-f-050 [E6]: true duplicate of n-f-012 - both ask what a VLAN is for and answer "logical broadcast-domain segmentation for security/performance without extra hardware"; keeping n-f-012 (adds the 802.1Q tagging fact)
delete from public.flashcards where id = 'n-f-050';

-- n-f-052 [E4]: NAT vs PAT tagged 2.4 (physical installations); address translation sits under routing technologies, objective 2.1
update public.flashcards set objective = '2.1' where id = 'n-f-052';

-- n-f-053 [E4]: tagged objective 2.5, which does not exist in N10-009 (domain 2 has 2.1-2.4); WAN service comparison fits network types/architectures, objective 1.6
update public.flashcards set domain = 1, objective = '1.6' where id = 'n-f-053';

-- n-f-054 [E4]: SNMP purpose tagged 3.1 (org processes); monitoring technologies are objective 3.2
update public.flashcards set objective = '3.2' where id = 'n-f-054';

-- n-f-055 [E6]: true duplicate of n-f-022 - both ask what syslog is/is used for; keeping n-f-022 (adds UDP 514, the 0-7 severity scale, and SIEM aggregation)
delete from public.flashcards where id = 'n-f-055';

-- n-f-056 [E4]: NetFlow purpose tagged 3.1 (org processes); flow-data monitoring is objective 3.2
update public.flashcards set objective = '3.2' where id = 'n-f-056';

-- n-f-057 [E6]: true duplicate of n-f-027 - both ask why a performance baseline matters with near-identical backs (know normal so deviations stand out); keeping n-f-027 (names the concrete metrics)
delete from public.flashcards where id = 'n-f-057';

-- n-f-058 [E6]: true duplicate of n-f-024 - both ask the purpose of QoS and answer "prioritize latency-sensitive traffic over bulk on congested links"; keeping n-f-024
delete from public.flashcards where id = 'n-f-058';

-- n-f-062 [E4]: rogue DHCP server risk tagged 4.3 (defense features); rogue services are an attack type, objective 4.2
update public.flashcards set objective = '4.2' where id = 'n-f-062';

-- n-f-063 [E6]: true duplicate of n-f-034 - site-to-site vs client VPN distinction is a strict subset of n-f-034, which also covers IPsec vs SSL/TLS; keeping n-f-034
delete from public.flashcards where id = 'n-f-063';

-- n-f-064 [E4]: tone generator/probe tagged 5.1 (methodology); hardware tools are objective 5.5
update public.flashcards set objective = '5.5' where id = 'n-f-064';

-- n-f-065 [E4]: cable tester vs TDR tagged 5.1 (methodology); hardware tools are objective 5.5
update public.flashcards set objective = '5.5' where id = 'n-f-065';

-- n-f-066 [E4]: duplicate IP conflict tagged 5.2 (cabling issues); IP addressing issues are network-services issues, objective 5.3
update public.flashcards set objective = '5.3' where id = 'n-f-066';

-- n-f-067 [E4]: DHCP scope exhaustion tagged 5.2 (cabling issues); address pool exhaustion is explicitly objective 5.3
update public.flashcards set objective = '5.3' where id = 'n-f-067';

-- n-f-068 [E4]: nslookup/dig tagged 5.3 (services issues); command-line tools are objective 5.5
update public.flashcards set objective = '5.5' where id = 'n-f-068';

-- n-f-069 [E4]: arp -a tagged 5.3 (services issues); command-line tools are objective 5.5
update public.flashcards set objective = '5.5' where id = 'n-f-069';

-- n-f-070 [E4]: netstat tagged 5.3 (services issues); command-line tools are objective 5.5
update public.flashcards set objective = '5.5' where id = 'n-f-070';

-- ============ expand questions ============

-- n-q-046 [E4]: TCP reliability question tagged 1.1 (OSI model); TCP/UDP protocol selection sits under objective 1.4
update public.questions set objective = '1.4' where id = 'n-q-046';

-- n-q-047 [E4]: /26 mask question tagged 1.2 (appliances); IPv4 subnetting is objective 1.7
update public.questions set objective = '1.7' where id = 'n-q-047';

-- n-q-048 [E4]: AAAA record question tagged 1.3 (cloud concepts); DNS record configuration is a network service, objective 3.4
update public.questions set domain = 3, objective = '3.4' where id = 'n-q-048';

-- n-q-049 [E4]: MX record question tagged 1.3 (cloud concepts); DNS record configuration is a network service, objective 3.4
update public.questions set domain = 3, objective = '3.4' where id = 'n-q-049';

-- n-q-050 [E4]: full mesh question tagged 1.4 (ports/protocols); topologies are objective 1.6
update public.questions set objective = '1.6' where id = 'n-q-050';

-- n-q-051 [E4+W2+W3]: hedge wording "SDN exclusively" weakened the key distractor and the explanation never refuted SDN, the likeliest confusion; NFV is also a cloud-concepts item (1.3), not 1.1 (answer stays index 0)
update public.questions set objective = '1.3', choices = $q$["Network Functions Virtualization (NFV)","Software-Defined Networking (SDN)","VLAN tagging","Port mirroring"]$q$::jsonb, explanation = $q$NFV replaces dedicated hardware appliances with software equivalents running on standard servers. SDN is the related but distinct concept of separating the control plane from the data plane for centralized programmability - it changes how forwarding decisions are made, not where appliances run. VLAN tagging and port mirroring are switch features unrelated to appliance virtualization.$q$ where id = 'n-q-051';

-- n-q-055 [W2+W3]: distractors "more secure but slower" and "identical security" were throwaways; replace with plausible WEP misconceptions and refute them (answer stays index 0)
update public.questions set choices = $q$["WEP has well-known, practically exploitable cryptographic weaknesses that allow attackers to recover the key relatively easily","WEP is cryptographically sound but too slow for modern access points","WEP provides authentication but leaves data frames unencrypted","WEP requires a RADIUS server that small networks typically lack"]$q$::jsonb, explanation = $q$WEP's RC4/IV design flaws are well documented and practically exploitable - free tools recover the key in minutes - which is why WPA2/WPA3 must always be used instead. Speed is not the problem, WEP does encrypt data frames (just breakably), and it uses a simple shared key with no RADIUS requirement.$q$ where id = 'n-q-055';

-- n-q-056 [E4]: PAT question tagged 2.4 (physical installations); NAT/PAT sit under routing technologies, objective 2.1
update public.questions set objective = '2.1' where id = 'n-q-056';

-- n-q-057 [E4]: tagged objective 2.5, which does not exist in N10-009 (domain 2 has 2.1-2.4); WAN service comparison fits network types/architectures, objective 1.6
update public.questions set domain = 1, objective = '1.6' where id = 'n-q-057';

-- n-q-058 [E6]: true duplicate of n-q-019 - both test that 1/6/11 are the non-overlapping 2.4 GHz channels; keeping n-q-019 (its distractors 2/4/6 and 5/10/15 are more plausible than "any channel above 20")
delete from public.questions where id = 'n-q-058';

-- n-q-060 [E4]: SNMP polling question tagged 3.1 (org processes); monitoring technologies are objective 3.2
update public.questions set objective = '3.2' where id = 'n-q-060';

-- n-q-061 [E4]: syslog central-collection question tagged 3.1 (org processes); log aggregation is monitoring, objective 3.2
update public.questions set objective = '3.2' where id = 'n-q-061';

-- n-q-062 [E4+W2]: hedge wording "SNMP alone, without flow data" telegraphed the wrong answer - plain SNMP is the honest distractor (its counters show volume, not conversations); flow analysis is monitoring 3.2, not 3.1 (answer stays index 0)
update public.questions set objective = '3.2', choices = $q$["NetFlow","Syslog","SNMP","ARP"]$q$::jsonb, explanation = $q$NetFlow records per-conversation flow data (source, destination, ports, bytes) through the router, making it purpose-built for identifying which applications and destinations consume bandwidth. SNMP interface counters show how much traffic an interface carries but not which conversations make it up; syslog carries event messages; ARP resolves IPs to MACs.$q$ where id = 'n-q-062';

-- n-q-064 [E4]: QoS-fix scenario tagged 3.3 (disaster recovery); troubleshooting congestion/jitter for real-time traffic is a performance issue, objective 5.4
update public.questions set domain = 5, objective = '5.4' where id = 'n-q-064';

-- n-q-067 [E4]: FHRP/redundancy design question tagged 3.1 (org processes); eliminating single points of failure is an HA/DR concept, objective 3.3
update public.questions set objective = '3.3' where id = 'n-q-067';

-- n-q-070 [E4]: rogue DHCP identification tagged 4.3 (defense features); identifying a rogue service/on-path attack is objective 4.2
update public.questions set objective = '4.2' where id = 'n-q-070';

-- n-q-071 [E6]: true duplicate of n-q-033 - both test that permanently linking two office networks is a site-to-site VPN; keeping n-q-033 (split-tunnel client VPN is the more exam-plausible distractor); n-q-072 already covers the client-to-site contrast
delete from public.questions where id = 'n-q-071';

-- n-q-072 [E4]: tagged objective 4.4, which does not exist in N10-009 (domain 4 has 4.1-4.3); client-to-site VPN sits under network access methods, objective 3.5
update public.questions set domain = 3, objective = '3.5' where id = 'n-q-072';

-- n-q-073 [E6]: true duplicate of n-q-038 - both test that a tone generator and probe locates one cable among dozens; keeping n-q-038 (explanation refutes each distractor)
delete from public.questions where id = 'n-q-073';

-- n-q-074 [E4]: TDR question tagged 5.1 (methodology); hardware tools are objective 5.5
update public.questions set objective = '5.5' where id = 'n-q-074';

-- n-q-075 [E4]: duplicate-IP question tagged 5.2 (cabling issues); IP addressing conflicts are network-services issues, objective 5.3
update public.questions set objective = '5.3' where id = 'n-q-075';

-- n-q-076 [E4]: DHCP scope exhaustion tagged 5.2 (cabling issues); address pool exhaustion is explicitly objective 5.3
update public.questions set objective = '5.3' where id = 'n-q-076';

-- n-q-077 [E4]: nslookup question tagged 5.3 (services issues); the item asks which tool to use, objective 5.5
update public.questions set objective = '5.5' where id = 'n-q-077';

-- n-q-078 [E4]: arp -a question tagged 5.3 (services issues); the item asks which tool to use, objective 5.5
update public.questions set objective = '5.5' where id = 'n-q-078';

-- n-q-079 [E4]: netstat question tagged 5.3 (services issues); the item asks which tool to use, objective 5.5
update public.questions set objective = '5.5' where id = 'n-q-079';

-- n-q-080 [E4]: VLAN-assignment mismatch tagged 5.2 (cabling issues); incorrect VLAN assignment is a network-services issue, objective 5.3
update public.questions set objective = '5.3' where id = 'n-q-080';

-- n-q-081 [E4]: Wi-Fi coverage-edge disconnects tagged 5.2 (cabling issues); insufficient wireless coverage/signal loss is a performance issue, objective 5.4
update public.questions set objective = '5.4' where id = 'n-q-081';

-- n-q-083 [E4]: trunk misconfiguration after firmware update tagged 5.2 (cabling issues); switching/VLAN configuration problems are objective 5.3
update public.questions set objective = '5.3' where id = 'n-q-083';

-- n-q-084 [E1+E4]: keyed option blamed a "switching/loop issue" for symptoms a loop would not produce (a loop/broadcast storm would also break external browsing); rekey the wording to the defensible claim (local fault, e.g. VLAN/ACL) and fix the tag (5.2 cabling -> 5.3 services; answer stays index 0)
update public.questions set objective = '5.3', choices = $q$["A problem inside the local network rather than the ISP or internet","The ISP connection is completely down","DNS servers are unreachable","The default gateway's public IP has changed"]$q$::jsonb, explanation = $q$External browsing still works while internal device-to-device traffic fails, so the fault is inside the local network - for example an incorrect VLAN assignment, an ACL, or client-isolation settings - not the ISP link. An ISP outage would break external access, DNS failure would break name-based browsing rather than internal pings, and a full switching loop would typically disrupt external traffic as well.$q$ where id = 'n-q-084';

-- n-q-085 [W2+W3]: distractors were non-options ("required by standards with no diagnostic benefit", "irrelevant"); replace with plausible misconceptions about gateway pings and refute them (answer stays index 0)
update public.questions set choices = $q$["It quickly determines whether the problem is local to the network or further upstream, narrowing the scope of investigation","The gateway caches DNS records, so pinging it verifies name resolution","A reachable gateway proves the entire path to the internet is healthy","It renews the client's DHCP lease before further testing"]$q$::jsonb, explanation = $q$Pinging the default gateway first splits the problem space: success means the local segment, cabling, and IP configuration are sound and the fault is likely upstream; failure localizes it to the LAN. A reachable gateway proves nothing beyond the first hop, ping does not exercise DNS resolution, and it has no effect on DHCP leases.$q$ where id = 'n-q-085';
