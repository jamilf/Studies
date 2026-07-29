-- A+ Core 1 (220-1101) Domain 2 expansion, part B: objectives 2.5-2.8.
-- Adds questions a1-q-400..454 (55) and flashcards a1-f-400..466 (67), topping
-- each objective up to 33 total items:
--   2.5 Install & configure a SOHO network  -> 12 questions, 14 flashcards
--   2.6 Network configuration concepts      -> 14 questions, 17 flashcards
--   2.7 Internet & network types            -> 14 questions, 18 flashcards
--   2.8 Networking tools                    -> 15 questions, 18 flashcards
-- 2.6 and 2.7 previously had flashcards but no questions, and 2.8 had no
-- content at all, so this file gives all three a full question bank.
-- Acronym-deck note: DHCP, DNS, NAT, PoE and SSID already exist as pure
-- expansion cards, so the five acronym cards here are APIPA, DSL, ONT, WISP
-- and PAN.

insert into public.questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ============ 2.5 Install and configure basic wired/wireless SOHO networks ============

('a1-q-400','aplus1',2,'2.5','mcq',1,
 $q$A technician is installing a new SOHO network. The ISP has left a cable modem with a single Ethernet port. Where should that Ethernet cable be connected on the customer router?$q$,
 $q$["The WAN (internet) port","Any one of the numbered LAN ports","The USB port used for shared storage","The uplink port on the wireless access point"]$q$::jsonb,
 '0'::jsonb,
 $q$The WAN port is the router interface that faces the provider, obtains the public address, and forms the NAT boundary between the ISP and the internal network. Plugging the modem into a numbered LAN port is the classic mistake because the link light still comes on, but the WAN interface never gets an address, so NAT and the router firewall are bypassed and clients usually end up with no working configuration. The USB port shares printers or storage and does nothing for internet access.$q$),

('a1-q-401','aplus1',2,'2.5','mcq',2,
 $q$A café owner wants customers to have Wi-Fi but must keep them away from the point-of-sale terminal and the office printer on the same router. What is the best configuration?$q$,
 $q$["Give customers the main wireless passphrase and change it every month","Enable the guest SSID with client and LAN isolation so guest traffic can only reach the internet","Stop broadcasting the main SSID so customers cannot see it","Turn on MAC address filtering for the staff devices"]$q$::jsonb,
 '1'::jsonb,
 $q$A guest network places visitors on a separate subnet with isolation enabled, so their traffic is forwarded to the internet but not to the POS terminal or printer. Sharing the main passphrase is the tempting answer because rotating it feels secure, but any device that knows it is on the same Layer 2 network as the POS, so rotation changes nothing about reachability. Hiding the SSID only removes it from the beacon and is trivially recovered from client probe traffic, and MAC filtering protects the staff devices rather than separating the guests.$q$),

('a1-q-402','aplus1',2,'2.5','mcq',2,
 $q$Every wireless client at a small office was purchased in the last two years. Which wireless security setting should the technician configure on the new router?$q$,
 $q$["WPA3-Personal","WPA2-Personal with TKIP for maximum compatibility","WEP with a 128-bit key","An open network with MAC address filtering"]$q$::jsonb,
 '0'::jsonb,
 $q$WPA3-Personal replaces the WPA2 pre-shared key handshake with SAE, so an attacker who captures the association cannot run an offline dictionary attack against it, and modern clients all support it. WPA2 with TKIP is the plausible fallback, but TKIP is a deprecated legacy cipher and selecting it also forces the radio down to legacy data rates; if WPA3 were unavailable, the correct choice would be WPA2 with AES/CCMP, not TKIP. WEP is broken and recoverable in minutes, and MAC filtering is defeated by spoofing a MAC seen in the clear.$q$),

('a1-q-403','aplus1',2,'2.5','mcq',2,
 $q$Three access points on one office floor were all installed on 2.4 GHz channel 6. Users report slow, unstable wireless everywhere on the floor. What should the technician do?$q$,
 $q$["Increase the transmit power on all three access points","Assign the three access points to channels 1, 6, and 11","Move all three access points to channel 11","Set all three access points to a 40 MHz channel width"]$q$::jsonb,
 '1'::jsonb,
 $q$Access points on the same 2.4 GHz channel must take turns on the medium, so co-channel interference grows with every added radio; spreading them across 1, 6, and 11 is the only way to give them non-overlapping 20 MHz channels in that band. Raising transmit power is the intuitive fix but it makes the problem worse, because each AP then hears and defers to the others across a wider area. A 40 MHz width in 2.4 GHz consumes most of the band and increases the collision, rather than reducing it.$q$),

('a1-q-404','aplus1',2,'2.5','mcq',3,
 $q$A SOHO access point was mounted inside a metal supply cabinet in the corner of the office. Users at the far end report weak signal and dropped connections. What is the best first action?$q$,
 $q$["Relocate the access point to a central, elevated position clear of the metal enclosure","Switch the network to the 5 GHz band so the signal reaches farther","Disable SSID broadcast to reduce airtime used by beacons","Shorten the DHCP lease time so clients reconnect more often"]$q$::jsonb,
 '0'::jsonb,
 $q$A metal enclosure reflects and absorbs RF, and a corner mount wastes half the radiation pattern on the parking lot, so relocating the AP to a central, high, unobstructed spot addresses the actual cause. Moving to 5 GHz is the seductive distractor because 5 GHz is faster, but it has shorter range and worse wall penetration than 2.4 GHz, so it would shrink coverage further. Beacon airtime and DHCP lease length have no bearing on signal strength.$q$),

('a1-q-405','aplus1',2,'2.5','mcq',2,
 $q$A homeowner cannot add a new smart thermostat and video doorbell to the wireless network, although phones and laptops connect without trouble. What is the most likely cause?$q$,
 $q$["The IoT devices support only 2.4 GHz and are not seeing the 5 GHz SSID the phone is using","The IoT devices require WPA3-Enterprise authentication","The router needs a static IP address on its WAN interface","The IoT devices must be given a DHCP reservation before they can associate"]$q$::jsonb,
 '0'::jsonb,
 $q$Most smart-home radios are 2.4 GHz only for range and cost reasons, so onboarding fails when the setup app is running on a phone joined to a 5 GHz SSID, or when band steering keeps hiding the 2.4 GHz network. Requiring a DHCP reservation is the tempting answer, but reservations affect which address a device receives after it associates, not whether it can associate at all. Consumer IoT devices use a pre-shared key, not enterprise authentication, and the WAN addressing is unrelated.$q$),

('a1-q-406','aplus1',2,'2.5','multi',2,
 $q$A technician is finishing the installation of a SOHO router. Select the TWO changes that most directly reduce the risk of the router being taken over from the internet.$q$,
 $q$["Replace the default administrator password with a strong unique one","Disable remote (WAN-side) management of the administration interface","Change the SSID from the vendor default to a custom name","Enable UPnP so applications can open their own inbound ports","Extend the DHCP lease time from 8 hours to 24 hours"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Default credentials are published per model, and WAN-side management exposes that login to the entire internet, so fixing both closes the path an internet-based attacker would use. Renaming the SSID is worth doing because vendor default names advertise the model, but it is a local wireless cosmetic change and does not stop a remote login attempt. UPnP moves in the wrong direction by letting internal software punch inbound holes without review, and lease time is unrelated to exposure.$q$),

('a1-q-407','aplus1',2,'2.5','multi',1,
 $q$A technician has created a new wireless network on a SOHO router. Select the TWO settings that must match on a client device for it to join that network.$q$,
 $q$["The SSID (network name)","The wireless security passphrase","The channel number the access point is using","The MAC address of the access point","The transmit power level of the access point"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$A client joins by selecting the SSID and supplying the matching pre-shared key; those are the only two values the user configures. The channel is the tempting third option, but the client scans and follows whatever channel the AP announces, so it is never entered manually. The AP MAC (BSSID) is learned automatically during association, and transmit power is an AP-side radio setting.$q$),

('a1-q-408','aplus1',2,'2.5','mcq',2,
 $q$A ceiling-mounted access point must be installed in a room with no power outlet nearby, and the only available switch does not support PoE. What is the correct solution?$q$,
 $q$["Insert a PoE injector inline between the switch port and the access point","Use a PoE splitter at the switch end of the run","Run a second Ethernet cable to double the available current","Connect the access point to a nearby workstation USB port"]$q$::jsonb,
 '0'::jsonb,
 $q$A PoE injector sits between a non-PoE switch port and the device, adding power onto the unused or data pairs so a single Ethernet run carries both. A splitter is the near-miss: it does the opposite job, taking a PoE feed at the far end and separating it into data plus a low-voltage barrel connector for a device that is not PoE-capable, so placing one at the switch end powers nothing. Ethernet does not aggregate power across cables, and USB cannot supply or carry an AP uplink.$q$),

('a1-q-409','aplus1',2,'2.5','multi',2,
 $q$A user reports weak Wi-Fi in a back bedroom of a two-storey house; the router sits on the floor of a downstairs utility room next to a washing machine. Select the TWO changes most likely to improve coverage in that bedroom.$q$,
 $q$["Move the router to a central, elevated location away from large appliances","Add a mesh node or second access point with a wired connection back to the router","Stop broadcasting the SSID","Increase the length of the wireless passphrase","Enable MAC address filtering on the router"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Coverage is a physics problem: raising the router, centring it, and getting it away from a metal appliance improves the radiation path, and a second AP or mesh node with a wired backhaul puts fresh signal where the client is. Hiding the SSID is the usual trap; it does not raise signal strength, and it can actually make roaming and reconnection less reliable. Passphrase length and MAC filtering are access controls with no effect on RF coverage.$q$),

('a1-q-410','aplus1',2,'2.5','mcq',2,
 $q$An ISP technician has just replaced the cable modem at a small office. The router now shows no address on its WAN interface, although the modem reports it is online. What should the technician do first?$q$,
 $q$["Assign an arbitrary static public IP address to the router WAN interface","Change the LAN subnet on the router from 192.168.1.0 to 192.168.2.0","Power the modem off and on, wait for its online light to go solid, then reboot the router","Perform a factory reset of the router and reconfigure it from scratch"]$q$::jsonb,
 '2'::jsonb,
 $q$Provider modems commonly bind to the MAC address of the first device they see after coming online, so a power cycle in order (modem to sync first, then the router) lets the modem hand the lease to the new router. A factory reset is the tempting sledgehammer, but it destroys the working wireless and LAN configuration while doing nothing about the modem binding. Public WAN addresses are issued by the ISP and cannot be invented, and the internal LAN subnet has no relationship to the WAN lease.$q$),

('a1-q-411','aplus1',2,'2.5','ordering',2,
 $q$Place the steps for bringing up a new SOHO wired and wireless network in the correct order.$q$,
 $q$["Configure the wireless SSID and the WPA3-Personal passphrase","Connect the ISP modem to the router WAN port and power the modem on until its sync light is solid","Connect a wireless client and verify it receives a DHCP lease and can browse the internet","Sign in to the router administration page and replace the default administrator password"]$q$::jsonb,
 '[1,3,0,2]'::jsonb,
 $q$Physical connectivity comes first, because the router cannot obtain a WAN lease until the modem has synchronised with the provider. The administrator password is changed before any other configuration so that the device is never left reachable on defaults while it is being set up, then the wireless network is created, and verification from a real client is last. Configuring the SSID before securing the admin account is the common shortcut, and it leaves a live network protected by a published default login.$q$),

-- ============ 2.6 Common network configuration concepts ============

('a1-q-412','aplus1',2,'2.6','mcq',2,
 $q$On Monday morning every workstation on the second floor reports an address in the 169.254.0.0 range and cannot reach anything. Workstations on other floors are working normally. What is the most likely cause?$q$,
 $q$["The DHCP service for that subnet is unreachable or its address pool is exhausted","Each of those workstations was manually given a bad static address over the weekend","The DNS server for the domain has failed","The default gateway for that floor was changed to a different address"]$q$::jsonb,
 '0'::jsonb,
 $q$A 169.254 address is APIPA: the host asked for a lease, received no offer, and self-assigned. When an entire subnet does it at once, the fault is in the DHCP path for that subnet, such as a failed server, an exhausted scope, or a broken relay on that VLAN. A DNS failure is the tempting distractor because it also breaks browsing, but hosts would still hold their DHCP-assigned addresses and could still reach resources by IP. A wrong gateway or bad statics would show the misconfigured values, not 169.254.$q$),

('a1-q-413','aplus1',2,'2.6','mcq',2,
 $q$Two Windows PCs plugged into the same unmanaged switch both show 169.254 addresses. They can ping each other and open each other file shares, but neither can reach the internet. Why?$q$,
 $q$["APIPA provides an address and mask valid only on the local link, with no default gateway or DNS server","The unmanaged switch is blocking all routed traffic between VLANs","The two PCs must be placed in the same workgroup before internet access will work","Windows Firewall blocks all outbound traffic when APIPA is in use"]$q$::jsonb,
 '0'::jsonb,
 $q$APIPA assigns a 169.254.x.x address with a 255.255.0.0 mask and nothing else, so two hosts on the same link can talk to each other while having no gateway to send off-link traffic to and no DNS server to resolve names. Blaming the switch is tempting because it sits between them, but an unmanaged switch simply forwards frames and has no routing role at all. Workgroup membership affects file sharing browsing, not IP routing, and the firewall is not APIPA-aware.$q$),

('a1-q-414','aplus1',2,'2.6','mcq',3,
 $q$One PC in an office shows a 169.254 address while the PC on the next desk, plugged into the same wall plate bank and the same switch, holds a valid lease. Which cause should the technician investigate first?$q$,
 $q$["A faulty patch cable, dead switch port, or bad NIC on that one drop","A failed DHCP server","An exhausted DHCP scope","A misconfigured default gateway on the router"]$q$::jsonb,
 '0'::jsonb,
 $q$Scope the fault by what still works: if the DHCP server or its pool were the problem, the neighbouring PC would have failed too, so a single failing host points at that host physical path, its NIC, or its switch port. Scope exhaustion is the plausible distractor and does produce APIPA on the machine that asks last, but it would then affect each new device that joins rather than one fixed desk while its neighbour renews normally. A wrong gateway would produce a valid address that cannot route, not a self-assigned one.$q$),

('a1-q-415','aplus1',2,'2.6','multi',1,
 $q$Select the TWO statements that correctly describe an APIPA address.$q$,
 $q$["It comes from the 169.254.0.0/16 range","The host assigns it to itself when no DHCP server responds","It is issued by the ISP for temporary guest access","It includes a default gateway and DNS server address","It is routable across the public internet"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Automatic Private IP Addressing is a client-side fallback: with no DHCP offer, the host picks an unused address from 169.254.0.0/16 so link-local communication still works. The gateway option is the one that catches people out, because the address looks like a complete configuration in ipconfig, but APIPA supplies only an address and mask, which is precisely why an APIPA host cannot leave its own segment. Nothing about APIPA involves the ISP, and the range is never routed on the internet.$q$),

('a1-q-416','aplus1',2,'2.6','mcq',2,
 $q$A small office uses DHCP for all devices. Which device is the best candidate for a DHCP reservation?$q$,
 $q$["A network printer that workstations and scripts connect to by IP address","A visitor laptop on the guest wireless network","A smartphone that moves between the office and the user home","A conference-room streaming device used once a month"]$q$::jsonb,
 '0'::jsonb,
 $q$A reservation ties a MAC address to one address in the scope, so a shared resource such as a printer always answers at the same IP while its configuration still comes from the DHCP server. The roaming smartphone is the distractor that sounds reasonable because it changes networks often, but nothing needs to initiate connections to it, so a predictable address buys nothing. Guest and occasional devices are exactly the case dynamic leases exist for.$q$),

('a1-q-417','aplus1',2,'2.6','mcq',2,
 $q$A server was manually configured with a static address that falls inside the router DHCP range. A week later a laptop reports an IP address conflict. What is the correct fix?$q$,
 $q$["Reserve that address for the server MAC address, or move the static address outside the DHCP scope","Shorten the DHCP lease time so conflicting leases expire sooner","Disable DHCP on the router and configure every device statically","Add a second network adapter to the server"]$q$::jsonb,
 '0'::jsonb,
 $q$The DHCP server does not know about addresses configured by hand inside its own pool, so it eventually hands one out twice; either reserving it or moving the static address out of the pool range removes the overlap permanently. Shortening the lease is the tempting quick change, but it only makes the collision recur sooner, because the pool still contains the server address. Disabling DHCP fixes the conflict at the cost of manually maintaining every host.$q$),

('a1-q-418','aplus1',2,'2.6','mcq',2,
 $q$A workstation can open file shares on servers in its own subnet but cannot reach any host on another subnet or on the internet, by name or by IP address. Which setting should the technician check first?$q$,
 $q$["The default gateway","The DNS server address","The DHCP lease duration","The NIC duplex setting"]$q$::jsonb,
 '0'::jsonb,
 $q$Local traffic is delivered directly on the link, so a host with a missing or wrong default gateway behaves exactly like this: everything on its own subnet works and nothing beyond it does. DNS is the distractor most technicians reach for, but a DNS fault leaves connections by IP address working, and here even IP addresses fail off-subnet. Lease duration and duplex would affect the link or the address itself, not the routing boundary.$q$),

('a1-q-419','aplus1',2,'2.6','mcq',3,
 $q$A PC is configured with the address 192.168.1.40, mask 255.255.255.0, and default gateway 192.168.2.1. It reaches other hosts in its office but nothing outside. What is wrong?$q$,
 $q$["The gateway address is not inside the subnet the mask defines, so the PC cannot deliver traffic to it","The mask must be 255.255.0.0 whenever a 192.168 address is used","192.168.1.40 is a public address and requires NAT before it will route","The PC needs a second DNS server entry"]$q$::jsonb,
 '0'::jsonb,
 $q$With a 255.255.255.0 mask the host treats only 192.168.1.0 through 192.168.1.255 as local, so a gateway at 192.168.2.1 is off-link and unreachable, and every off-subnet packet is dropped for want of a next hop. The mask option is the seductive one because /16 does cover both addresses, but widening the mask on one host without changing the rest of the network creates a mismatch instead of a fix; the right answer is a gateway on the local subnet. 192.168.1.40 is private, not public, and DNS is unrelated because IP-based traffic fails too.$q$),

('a1-q-420','aplus1',2,'2.6','mcq',3,
 $q$While troubleshooting, a technician sees that a laptop interface has an IPv6 address beginning with fe80. What does that indicate?$q$,
 $q$["A link-local address the interface configured automatically, usable only on that segment","A public IPv6 address delegated by the ISP","An IPv6 multicast group address","The IPv6 equivalent of the loopback address"]$q$::jsonb,
 '0'::jsonb,
 $q$Every IPv6 interface configures an fe80::/10 link-local address by itself, which is why one appears even when no router or DHCPv6 server is present; it is never forwarded off the local link. Reading it as an ISP-delegated address is the common error, since IPv6 hosts often hold several addresses at once, but a globally routable one comes from the provider prefix rather than fe80. IPv6 multicast uses ff00::/8, and the loopback is ::1.$q$),

('a1-q-421','aplus1',2,'2.6','mcq',2,
 $q$Which statement correctly contrasts IPv4 and IPv6 addressing?$q$,
 $q$["IPv4 uses 32-bit addresses in dotted decimal; IPv6 uses 128-bit addresses written as groups of hexadecimal digits","IPv4 uses 64-bit addresses; IPv6 doubles that to 128 bits","IPv6 addresses are shorter than IPv4 addresses, which is why they are written in hexadecimal","IPv6 replaces MAC addressing, so switches no longer forward by hardware address"]$q$::jsonb,
 '0'::jsonb,
 $q$IPv4 has 32 bits shown as four decimal octets; IPv6 has 128 bits shown as eight groups of four hexadecimal digits, with a double colon compressing one run of zero groups. The 64-bit option is the trap because 64 does appear in IPv6 discussions as the usual interface-identifier and prefix boundary, but that is half of the address, not the whole of it. IPv6 changes Layer 3 addressing only; switches still forward frames using MAC addresses.$q$),

('a1-q-422','aplus1',2,'2.6','multi',2,
 $q$A small business has one managed switch and wants to keep guest, VoIP, and office traffic apart. Select the TWO accurate reasons to use VLANs here.$q$,
 $q$["They create separate broadcast domains on shared switch hardware","They separate traffic types for security and quality of service without running new cabling","They increase the raw port speed of the switch","They remove the need for any routing between the separated groups","They assign IP addresses to clients automatically"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$A VLAN is a logically separate network on the same physical switch, so each VLAN is its own broadcast domain and traffic classes stay isolated without a second switch or extra cable runs. The routing option is the one that trips people up: separation is exactly the point, so anything that must cross between VLANs has to pass through a router or Layer 3 switch. VLANs do not change link speed, and address assignment is still the job of DHCP.$q$),

('a1-q-423','aplus1',2,'2.6','mcq',2,
 $q$A sales employee working from a hotel needs to open files on an internal server that is not published to the internet. What should be configured?$q$,
 $q$["A client-to-site VPN on the laptop","Port forwarding on the hotel router","A web proxy on the laptop browser","A second DNS server entry pointing at the internal DNS server"]$q$::jsonb,
 '0'::jsonb,
 $q$A client-to-site VPN builds an encrypted tunnel over the untrusted hotel network and gives the laptop an address on the corporate network, so internal-only resources become reachable and the traffic is protected from anyone on the hotel Wi-Fi. Pointing the laptop at the internal DNS server is the tempting half-answer, because names would then resolve, but resolving a private address does not make it routable from outside. Port forwarding would have to be done at the company edge rather than the hotel, and it would expose the server publicly; a proxy only relays web traffic.$q$),

('a1-q-424','aplus1',2,'2.6','multi',1,
 $q$Select the TWO statements that describe private IPv4 addressing.$q$,
 $q$["Internet routers do not forward traffic to or from these addresses","Hosts using them need NAT at the network edge to communicate with internet hosts","Each organisation is allocated its own unique private range by IANA","They are globally unique, so two networks can never use the same one","They can only be assigned statically, never by DHCP"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Private ranges are reserved for internal use and are dropped by internet routers, so every home and office can reuse the same addresses, and NAT at the router rewrites them to a routable public address on the way out. The uniqueness options are the plausible-sounding pair, but reusability is the entire point of the design; nothing is allocated per organisation and nothing is globally unique. Private addresses are handed out by DHCP constantly, which is what a SOHO router does by default.$q$),

('a1-q-425','aplus1',2,'2.6','matching',2,
 $q$Match each item of IP configuration on the left to what it does on the right.$q$,
 $q${"left":["Subnet mask","Default gateway","DNS server","DHCP server"],"right":["Resolves host names into IP addresses","Tells a host which part of its address identifies the local network","Leases IP configuration to clients automatically","The router address a host uses to reach other networks"]}$q$::jsonb,
 '[1,3,0,2]'::jsonb,
 $q$The mask defines what is local, which is how the host decides whether to deliver a packet directly or hand it to the gateway; the gateway is the router used for everything off-subnet; DNS turns names into addresses; DHCP supplies all of these values automatically. The pairing people invert most often is mask and gateway, because both are involved in reaching remote networks, but only the mask does the local-versus-remote calculation.$q$),

-- ============ 2.7 Internet connection types and network types ============

('a1-q-426','aplus1',2,'2.7','mcq',2,
 $q$A customer in a remote area uses geostationary satellite internet. Downloads are acceptable, but video calls and online games feel sluggish and out of step. What explains this?$q$,
 $q$["The round trip to a satellite in high orbit and back adds substantial latency to every packet","Satellite modems deliver only half of the advertised download speed","The satellite dish shares a neighbourhood coax node with other subscribers","Satellite service is capped at 1.5 Mbps by standard"]$q$::jsonb,
 '0'::jsonb,
 $q$Every packet on a geostationary link travels tens of thousands of kilometres up and back, and that propagation delay is a property of the distance, so no amount of bandwidth removes it; interactive applications feel it immediately while a download simply streams. Node sharing is the tempting cause because congestion also creates lag, but shared coax nodes are the characteristic of cable service, not satellite. The bandwidth claims are invented limits; the defining weakness of satellite is latency, along with rain fade and data caps.$q$),

('a1-q-427','aplus1',2,'2.7','mcq',2,
 $q$A fiber provider installs service at a home. On the wall the technician finds a small powered box where the provider fiber terminates and a copper Ethernet cable leaves for the customer router. What is this device?$q$,
 $q$["An optical network terminal (ONT)","A DOCSIS cable modem","A DSL filter and splitter","A fiber patch panel"]$q$::jsonb,
 '0'::jsonb,
 $q$The ONT is the demarcation device for fiber to the premises: it converts the optical signal to Ethernet and hands off to the customer router, and it needs power and often a battery backup. Calling it a cable modem is the natural guess because it occupies the same place in the topology, but a DOCSIS modem terminates coax from a cable plant, not glass. A DSL filter belongs to telephone-line service, and a patch panel is passive with no conversion.$q$),

('a1-q-428','aplus1',2,'2.7','mcq',2,
 $q$Several neighbours with the same cable internet provider all notice that speeds drop sharply between 7 pm and 10 pm and recover overnight. What is the most likely reason?$q$,
 $q$["Cable is a shared medium, so subscribers on the same node contend for capacity at peak hours","Coaxial cable attenuates more at night as temperatures fall","Each subscriber modem is throttled after a fixed number of hours online","Distance from the provider central office limits speed on cable service"]$q$::jsonb,
 '0'::jsonb,
 $q$Cable subscribers share the capacity of a neighbourhood node, so the whole street slows at the same time as usage peaks and recovers when it drops. Distance from the central office is the strong distractor, because it is a real and frequently tested effect, but it belongs to DSL, where speed falls with loop length, and it would not vary by time of day. Temperature and per-modem hour limits are not how the service works.$q$),

('a1-q-429','aplus1',2,'2.7','mcq',2,
 $q$Two customers order the same DSL package. The one a few streets from the provider central office gets close to the advertised speed; the one several kilometres away syncs far lower. Why?$q$,
 $q$["DSL performance falls as the copper loop length from the central office increases","DSL bandwidth is shared with everyone connected to the same node","The distant customer needs a line-of-sight antenna","DSL requires fiber for the final segment of the run"]$q$::jsonb,
 '0'::jsonb,
 $q$DSL runs high frequencies over ordinary telephone copper, and signal attenuation over that pair is the limiting factor, so the achievable sync rate drops with distance from the DSLAM in the central office. Shared node contention is the tempting answer since both customers use the same provider, but a DSL pair is a dedicated local loop; contention on a shared segment is a cable characteristic. Line-of-sight antennas belong to fixed wireless, and DSL by definition uses the existing copper.$q$),

('a1-q-430','aplus1',2,'2.7','mcq',1,
 $q$A field technician needs internet access for a laptop at temporary job sites that have no installed telephone, coax, or fiber service. Which connection type is the most practical?$q$,
 $q$["Cellular, using a mobile hotspot or phone tethering","DSL over the nearest telephone line","Cable broadband","Fiber to the premises"]$q$::jsonb,
 '0'::jsonb,
 $q$Cellular data needs no installed infrastructure at the site, so a hotspot or tethered phone can be working within a minute anywhere the carrier has coverage. DSL is the tempting fallback because telephone copper is widespread, but it still requires a provisioned line and an installed modem at that address. Cable and fiber require an installed drop and a service order, which is exactly what a temporary site does not have.$q$),

('a1-q-431','aplus1',2,'2.7','mcq',2,
 $q$A rural business has no cable or fiber service. A provider installs a small directional antenna on the roof, aimed at a tower on a hill several kilometres away, and reports lower latency than satellite. What type of service is this?$q$,
 $q$["Fixed wireless from a wireless internet service provider (WISP)","Geostationary satellite internet","Cellular 5G home internet using an indoor modem","Digital subscriber line over a leased copper pair"]$q$::jsonb,
 '0'::jsonb,
 $q$A WISP delivers fixed wireless from ground-based towers to a directional customer antenna, so the radio path is a few kilometres rather than a trip to orbit, and latency is far lower than satellite; the trade-off is that it needs clear line of sight and can be disrupted by new growth or terrain. Satellite is the natural confusion because both use a dish-like antenna, but its high orbit is what creates the latency the scenario says is absent. Cellular home internet uses carrier macro networks with an indoor unit rather than an aimed roof antenna, and DSL is not wireless at all.$q$),

('a1-q-432','aplus1',2,'2.7','multi',2,
 $q$Select the TWO characteristics that distinguish fiber to the premises from typical cable or DSL service.$q$,
 $q$["Upload speeds are often symmetric with download speeds","The medium is immune to electromagnetic interference","A splitter or filter must be fitted to every telephone jack","Capacity is shared with the neighbours on the same coax node","A clear line of sight to the provider tower is required"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Fiber plans commonly offer matching upload and download rates, which is why they suit video conferencing and cloud backup, and because the signal is light in glass it is unaffected by motors, ballasts, or radio noise. The shared-node option is the strong distractor since congestion is a real broadband issue, but node sharing describes cable. Filters belong to DSL, and line of sight belongs to fixed wireless.$q$),

('a1-q-433','aplus1',2,'2.7','mcq',1,
 $q$A user pairs a smartphone with wireless earbuds, a smartwatch, and a portable keyboard, all within arm reach. What type of network is this?$q$,
 $q$["PAN","WLAN","MAN","SAN"]$q$::jsonb,
 '0'::jsonb,
 $q$A personal area network covers the space immediately around one person and is typically built with Bluetooth links between a phone and its accessories. WLAN is the tempting answer because these are all wireless devices, but a WLAN is infrastructure wireless served by access points over a building or campus, not a handful of peer devices within a few metres. MAN and SAN describe metropolitan links and dedicated storage networks respectively.$q$),

('a1-q-434','aplus1',2,'2.7','mcq',2,
 $q$A city government owns fiber that links its town hall, three fire stations, and the public library, all within the same metropolitan area, into one network. Which network type best describes it?$q$,
 $q$["MAN","LAN","PAN","SAN"]$q$::jsonb,
 '0'::jsonb,
 $q$A metropolitan area network spans a city or campus-sized region and links multiple sites belonging to one organisation, which is exactly the described deployment. Calling it a WAN-scale problem or a LAN is the usual split: a LAN is confined to a single building or site, while the WAN label is normally reserved for links that cross regions and are leased from a carrier. PAN and SAN are far smaller and purpose-specific.$q$),

('a1-q-435','aplus1',2,'2.7','mcq',2,
 $q$A data centre connects its servers to a shared disk array over dedicated high-speed switches so the storage traffic never touches the production user network. What is this network called?$q$,
 $q$["A SAN","A MAN","A WLAN","A PAN"]$q$::jsonb,
 '0'::jsonb,
 $q$A storage area network is a separate high-speed network that presents block-level storage to servers, typically over Fibre Channel or iSCSI, and keeping it off the production LAN is one of its main design goals. Confusing it with network-attached storage is the common error: a NAS is a single appliance serving files over the existing LAN, whereas a SAN is a network that makes remote volumes look like local disks. The other options describe metropolitan, wireless, and personal-scale networks.$q$),

('a1-q-436','aplus1',2,'2.7','mcq',2,
 $q$A company connects its head office network to two branch office networks in other cities using circuits from a telecommunications provider. What type of network do those links create?$q$,
 $q$["A WAN","A LAN","A WLAN","A PAN"]$q$::jsonb,
 '0'::jsonb,
 $q$A wide area network joins networks that are geographically separated, and it almost always rides on infrastructure leased from a service provider rather than cable the company owns. Each individual office remains a LAN; calling the whole thing a LAN is the usual slip, because a LAN is bounded by a single site and typically uses cabling the organisation owns and maintains. WLAN and PAN describe wireless access within a site and around a person.$q$),

('a1-q-437','aplus1',2,'2.7','multi',1,
 $q$Select the TWO statements that correctly describe a WAN.$q$,
 $q$["It connects networks that are in different geographic locations","It commonly uses circuits or services leased from a provider","It is confined to a single building or floor","It provides block-level storage to servers","It is created by pairing Bluetooth devices"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Distance and provider-supplied transport are the two defining traits of a WAN, because no organisation can run its own cable between cities. The single-building option is the direct contrast with a LAN and is the wrong end of the scale. Block storage describes a SAN, and Bluetooth pairing describes a PAN.$q$),

('a1-q-438','aplus1',2,'2.7','multi',2,
 $q$A new office in a remote area has no telephone, coax, or fiber infrastructure and no clear line of sight to any provider tower, but carrier mobile coverage is good. Select the TWO service types that could still deliver internet access.$q$,
 $q$["Cellular service using a fixed wireless modem or hotspot","Geostationary satellite service","Cable broadband","DSL over the existing telephone pair","Fixed wireless from a WISP"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Cellular works wherever carrier coverage reaches, and satellite needs only a clear view of the sky rather than any ground infrastructure, so both remain options at a site with nothing installed. WISP fixed wireless is the trap: it is otherwise ideal for rural sites and has much better latency than satellite, but the scenario explicitly removes the line of sight it depends on. Cable and DSL both require installed wireline plant that this site does not have.$q$),

('a1-q-439','aplus1',2,'2.7','matching',2,
 $q$Match each network type on the left to its description on the right.$q$,
 $q${"left":["PAN","MAN","SAN","WLAN"],"right":["Wireless coverage across a building or campus provided by access points","A dedicated high-speed network presenting block storage to servers","A network spanning a city or metropolitan area, often linking one organisation sites","A very short-range network around one person, such as a phone paired to earbuds"]}$q$::jsonb,
 '[3,2,1,0]'::jsonb,
 $q$Scale and purpose separate these: PAN is the few metres around a person, WLAN is access-point wireless across a site, MAN covers a city-sized area, and SAN is defined by function rather than distance because it carries block storage. PAN and WLAN are the pair most often swapped, since both are wireless, but only the WLAN involves infrastructure access points bridging clients onto the wired network.$q$),

-- ============ 2.8 Networking tools ============

('a1-q-440','aplus1',2,'2.8','mcq',1,
 $q$A technician must find which cable in an unlabelled bundle at the patch panel terminates at the wall jack in room 214. Which tool should be used?$q$,
 $q$["A tone generator and probe","A cable tester","A loopback plug","A Wi-Fi analyzer"]$q$::jsonb,
 '0'::jsonb,
 $q$The tone generator is clipped to the cable at the known end and injects an audio signal onto the pair; the inductive probe is then swept over the bundle until the tone is loudest, identifying the matching cable without disturbing the others. A cable tester is the tempting choice because it also has two units, but it verifies a run whose two ends you have already identified, which is the opposite of the problem here. A loopback plug tests a port, and a Wi-Fi analyzer works on radio, not copper.$q$),

('a1-q-441','aplus1',2,'2.8','mcq',2,
 $q$A newly terminated wall jack gives no link light. The technician wants to confirm that all eight conductors are connected end to end and in the correct pin positions. Which tool does that?$q$,
 $q$["A cable tester","A cable crimper","A tone generator and probe","A loopback plug"]$q$::jsonb,
 '0'::jsonb,
 $q$A cable tester with a remote unit checks each conductor for continuity and reports the wiremap, revealing opens, shorts, and reversed or crossed pairs, which is precisely the question being asked about a fresh termination. A toner is the near-miss: it identifies which cable is which, but it says nothing about whether all eight conductors landed on the right pins. A crimper makes terminations rather than testing them, and a loopback plug tests a device port.$q$),

('a1-q-442','aplus1',2,'2.8','mcq',2,
 $q$A technician is terminating the horizontal cable run into a keystone jack at the wall plate and into the patch panel in the closet. Which tool is required?$q$,
 $q$["A punchdown tool","A cable crimper","A loopback plug","A network tap"]$q$::jsonb,
 '0'::jsonb,
 $q$Jacks and patch panels use insulation displacement contacts, and a punchdown tool seats each conductor into its slot and cuts off the excess in one motion. A crimper is the answer most people reach for because both tools terminate copper, but a crimper attaches an RJ45 plug to a cable end and cannot seat a conductor into an IDC. A loopback plug and a tap are diagnostic devices, not termination tools.$q$),

('a1-q-443','aplus1',2,'2.8','mcq',1,
 $q$A technician needs several custom-length patch cables and has a spool of bulk cable and a bag of RJ45 plugs. Which tool completes the job?$q$,
 $q$["A cable crimper","A punchdown tool","A tone generator","A Wi-Fi analyzer"]$q$::jsonb,
 '0'::jsonb,
 $q$The crimper presses the RJ45 plug contacts down through the conductor insulation and closes the strain relief onto the jacket, which is how a plug is attached to a cable end. The punchdown tool is the tempting sibling answer, but it terminates into jacks and panels, not into plugs. The other two tools have nothing to do with building a cable.$q$),

('a1-q-444','aplus1',2,'2.8','mcq',2,
 $q$A desktop has no link on its onboard Ethernet port. There is no spare switch port, cable, or second machine available to test against. Which tool lets the technician test the port itself?$q$,
 $q$["A loopback plug","A tone generator and probe","A punchdown tool","A cable tester"]$q$::jsonb,
 '0'::jsonb,
 $q$A loopback plug wires the transmit pins back to the receive pins so the interface receives its own signal, letting diagnostics confirm whether the port can transmit and receive with no external equipment at all. A cable tester is the tempting alternative, but it tests cable, and the scenario has already removed the cable and switch from the equation. A toner traces cable paths and a punchdown tool terminates them.$q$),

('a1-q-445','aplus1',2,'2.8','mcq',2,
 $q$Users near one end of an office report slow, unstable Wi-Fi while the wired network is fine. The technician suspects other networks in the building are using the same channels. Which tool confirms this?$q$,
 $q$["A Wi-Fi analyzer","A cable certifier","A loopback plug","A punchdown tool"]$q$::jsonb,
 '0'::jsonb,
 $q$A Wi-Fi analyzer lists the networks in range with their channels, widths, and signal levels, and shows channel utilisation, so the technician can see the overlap and move the access point to a cleaner channel. A cable certifier is the plausible-sounding distractor because it is also a measurement instrument, but it evaluates copper or fiber performance and can say nothing about the radio environment. The other two tools are for terminating and testing physical ports.$q$),

('a1-q-446','aplus1',2,'2.8','mcq',3,
 $q$A security team must capture every frame passing between the firewall and the core switch during an investigation, including errors, with no risk of dropped packets while the link is saturated. What should the technician install?$q$,
 $q$["A network tap on the link","A port mirror (SPAN session) on the core switch","A loopback plug on the firewall port","A second cable tester in monitor mode"]$q$::jsonb,
 '0'::jsonb,
 $q$A tap is placed inline and passively copies everything on the wire to a monitoring port, so it forwards malformed frames and cannot be oversubscribed by the traffic it is copying. Port mirroring is the genuinely tempting option and is often good enough, but the mirror port is a normal switch port that can be oversubscribed when it must carry both directions of a busy link, so frames are dropped exactly when the capture matters most, and the switch itself may discard errored frames before they reach the mirror. A loopback plug and a cable tester do not capture traffic.$q$),

('a1-q-447','aplus1',2,'2.8','mcq',3,
 $q$A patch cable passes a basic continuity and wiremap test, yet the gigabit link built with it is unstable and the switch logs a rising CRC error count. What is the most likely explanation?$q$,
 $q$["The conductors were terminated in an order that splits the twisted pairs, so continuity is correct but crosstalk is high","The cable tester batteries are low and produced a false pass","The switch port was left at half duplex","The cable needs a loopback plug installed at the far end"]$q$::jsonb,
 '0'::jsonb,
 $q$Noise rejection in twisted-pair cabling comes from keeping each signal on its own twisted pair, so a split-pair termination puts pin-to-pin continuity in the right place while destroying the pairing; a simple wiremap tester reports a pass because it only checks pin to pin, and the damage shows up as crosstalk and CRC errors at gigabit rates. Blaming the tester is the tempting shortcut, but a low battery would generally produce inconsistent or failed readings rather than a clean pass on a genuinely defective cable. The fix is to re-terminate both ends following the same standard pinout so pairs stay intact.$q$),

('a1-q-448','aplus1',2,'2.8','mcq',2,
 $q$Before clipping a tone generator to a cable that is currently patched into a live switch port, what should a technician do?$q$,
 $q$["Unplug that cable from the switch port first","Set the switch port to half duplex","Power down the entire switch","Attach a loopback plug to the far end of the run"]$q$::jsonb,
 '0'::jsonb,
 $q$The generator injects a signal onto the conductors, so the cable should be disconnected from the switch before toning to keep that signal away from live port electronics and to avoid disrupting the traffic of an in-service link. Powering down the whole switch is the overreaching version of the same instinct, and it takes every other user offline to trace one cable. Duplex settings are unrelated, and a loopback at the far end would defeat the trace rather than help it.$q$),

('a1-q-449','aplus1',2,'2.8','mcq',3,
 $q$An in-wall cable run has gone dead and the technician suspects a break somewhere inside the wall. Which tool identifies both that a conductor is open and roughly how far along the run the break is?$q$,
 $q$["A cable tester with a time-domain reflectometer function","A tone generator and probe","A loopback plug","A Wi-Fi analyzer"]$q$::jsonb,
 '0'::jsonb,
 $q$A TDR-capable tester sends a pulse and times the reflection from the fault, so it reports both the failure and its approximate distance, letting the technician open the wall in one place instead of several. The toner is the tempting answer because it also works on a run hidden in a wall, but it traces the path of the cable rather than measuring where the conductor stops. A loopback plug tests a port, and a Wi-Fi analyzer only sees radio.$q$),

('a1-q-450','aplus1',2,'2.8','multi',2,
 $q$A technician is installing a new drop from the patch panel in the closet to a keystone jack at the desk, then verifying it. Select the TWO tools needed.$q$,
 $q$["A punchdown tool","A cable tester","A cable crimper","A loopback plug","A network tap"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Both ends of a structured horizontal run terminate into insulation displacement contacts, the patch panel in the closet and the keystone jack at the desk, so the punchdown tool does the terminating and the cable tester proves the wiremap before the drop is handed over. The crimper is the seductive third tool, because it is the one most associated with Ethernet, but it attaches plugs to patch cords and no plug is being fitted here. A loopback plug and a tap are diagnostic devices used after the cabling is in service.$q$),

('a1-q-451','aplus1',2,'2.8','multi',2,
 $q$Select the TWO things a basic wiremap cable tester can confirm about a finished copper run.$q$,
 $q$["That each conductor is continuous end to end, with no opens","That the conductors land on matching pin positions, with no shorts or crossed pairs","The actual throughput the link will deliver in Mbps","Whether the switch port is assigned to the correct VLAN","Which channel the nearby access point is using"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$A wiremap tester answers physical questions: is every conductor connected, and is it connected to the right pin at the other end. Throughput is the answer people expect it to give, because a passing cable feels like a fast cable, but measuring performance parameters such as crosstalk and attenuation requires a certifier, and actual throughput also depends on the switches and hosts. VLAN membership is switch configuration, and channel selection is a wireless matter for a Wi-Fi analyzer.$q$),

('a1-q-452','aplus1',2,'2.8','ordering',2,
 $q$Place the steps for making and verifying a patch cable in the correct order.$q$,
 $q$["Crimp the plug so the contacts pierce the conductors and the strain relief grips the jacket","Strip roughly an inch of the outer jacket without nicking the insulation of the pairs","Verify the finished cable end to end with a cable tester","Untwist and arrange the eight conductors in the chosen standard order, then trim them straight and even","Slide the conductors fully into the RJ45 plug until they reach the front of the connector"]$q$::jsonb,
 '[1,3,4,0,2]'::jsonb,
 $q$Strip, arrange and trim, insert, crimp, then test. Trimming the conductors even before insertion is what allows all eight to reach the front of the plug so the contacts can pierce them; technicians who crimp first and inspect afterwards cannot correct the order without cutting the plug off and starting again. Testing last is what catches a conductor that failed to seat, which is the most common defect in a hand-made cable.$q$),

('a1-q-453','aplus1',2,'2.8','ordering',2,
 $q$Place the steps for tracing an unlabelled cable run with a tone generator and probe in the correct order.$q$,
 $q$["Sweep the probe across the bundle in the closet until the tone is loudest on one cable","Disconnect the suspect cable from the switch port so tone is not injected into live equipment","Label the identified cable and reconnect it to its switch port","Attach the tone generator to the cable at the wall jack and switch the tone on"]$q$::jsonb,
 '[1,3,0,2]'::jsonb,
 $q$Take the cable out of the live switch first, then apply tone at the known end, then probe the bundle at the unknown end, and finally label and restore service. Applying tone before disconnecting is the step technicians skip when they are in a hurry, and it puts the generator signal into an in-service port. Labelling at the end is what stops the same cable being traced again next quarter.$q$),

('a1-q-454','aplus1',2,'2.8','matching',2,
 $q$Match each networking tool on the left to the job it does on the right.$q$,
 $q${"left":["Cable crimper","Punchdown tool","Loopback plug","Wi-Fi analyzer","Network tap"],"right":["Seats conductors into the IDC contacts of a patch panel or keystone jack and trims the excess","Shows channels, signal levels, and utilisation so an access point can be retuned","Attaches an RJ45 plug to the end of a bulk cable","Passively copies the traffic on a link to a monitoring port","Loops transmit back to receive so a port can be tested with nothing else attached"]}$q$::jsonb,
 '[2,0,4,1,3]'::jsonb,
 $q$Crimper and punchdown tool are both terminating tools but land on different hardware, plugs versus jacks and panels, and that is the pair the exam most often tests together. The loopback plug proves a port rather than a cable, the Wi-Fi analyzer works entirely in the radio domain, and the tap is a monitoring device inserted into a live link.$q$);

insert into public.flashcards (id, cert, domain, objective, deck, front, back) values

-- ============ 2.5 Install and configure basic wired/wireless SOHO networks ============

('a1-f-400','aplus1',2,'2.5','core',
 $$On a SOHO router, what connects to the WAN port and what happens if you use a LAN port instead?$$,
 $$The ISP modem connects to the WAN (internet) port; that interface takes the provider address and is the NAT and firewall boundary. Plugging the modem into a numbered LAN port bridges the provider straight onto the internal switch, so the router never gets a WAN lease and clients are left without a usable configuration.$$),

('a1-f-401','aplus1',2,'2.5','core',
 $$What does a guest SSID with client isolation give you that sharing the main passphrase does not?$$,
 $$Guests land on a separate subnet that is permitted to reach the internet but not the internal LAN, and isolation also stops guest devices seeing each other. Sharing the main key puts visitors on the same network as printers, NAS boxes, and point-of-sale systems no matter how often you rotate it.$$),

('a1-f-402','aplus1',2,'2.5','core',
 $$Which wireless security setting should you choose on a modern SOHO network, and what is the acceptable fallback?$$,
 $$WPA3-Personal, which uses SAE so a captured handshake cannot be attacked offline. If a legacy client blocks it, fall back to WPA2-Personal with AES/CCMP. Avoid TKIP (deprecated and forces legacy rates), and never use WEP, which is broken.$$),

('a1-f-403','aplus1',2,'2.5','core',
 $$Why is disabling WPS part of a standard SOHO router build?$$,
 $$The WPS PIN is validated in two halves, which reduces the search space enough that the PIN, and therefore the wireless passphrase, can be recovered by brute force. Turning WPS off removes that path; onboarding is done by typing the passphrase or scanning a QR code instead.$$),

('a1-f-404','aplus1',2,'2.5','core',
 $$How should channels be planned when several access points share the 2.4 GHz band, and why not just turn the power up?$$,
 $$Use 1, 6, and 11 so neighbouring APs occupy non-overlapping 20 MHz channels. Raising transmit power does not fix co-channel interference; it widens the area in which each AP hears the others and defers to them, so throughput usually falls.$$),

('a1-f-405','aplus1',2,'2.5','core',
 $$Where should a SOHO access point be placed for the best coverage?$$,
 $$Central to the area it serves, elevated, and in the open. Keep it clear of metal cabinets and appliances, mirrors, water tanks, and thick masonry, which reflect or absorb RF. A corner or floor-level position wastes much of the radiation pattern outside the building.$$),

('a1-f-406','aplus1',2,'2.5','core',
 $$Why do smart-home devices often fail to join a wireless network that phones and laptops use without trouble?$$,
 $$Most IoT radios are 2.4 GHz only. If the setup phone is on a 5 GHz SSID, or band steering hides the 2.4 GHz network, onboarding fails. Fix it by joining the phone to a 2.4 GHz SSID, or by publishing a separate 2.4 GHz network for IoT devices.$$),

('a1-f-407','aplus1',2,'2.5','core',
 $$Which IoT device categories should you expect in a SOHO installation scenario?$$,
 $$Thermostats, light switches and plugs, security cameras and video doorbells, smart door locks, and voice-enabled speakers or digital assistants. They are usually 2.4 GHz Wi-Fi or hub-based, and are good candidates for a separate SSID or VLAN because they are rarely patched.$$),

('a1-f-408','aplus1',2,'2.5','core',
 $$How do Zigbee and Z-Wave differ as smart-home protocols?$$,
 $$Both are low-power mesh protocols that need a hub to bridge onto the IP network. Zigbee shares the crowded 2.4 GHz band with Wi-Fi; Z-Wave runs in a sub-1 GHz band, so it avoids Wi-Fi interference and travels through walls well, at lower data rates.$$),

('a1-f-409','aplus1',2,'2.5','core',
 $$When do you use a PoE injector rather than a PoE switch, and what does a PoE splitter do?$$,
 $$An injector adds power to a run from a non-PoE switch port, which suits one or two devices such as a single ceiling AP; a PoE switch is better once several devices need power. A splitter does the reverse job at the far end, separating a PoE feed into data plus low-voltage power for a device that is not PoE-capable.$$),

('a1-f-410','aplus1',2,'2.5','core',
 $$What is the drawback of a wireless repeater or extender compared with a wired access point?$$,
 $$A repeater receives and retransmits on the same radio, so it roughly halves throughput for clients behind it and adds latency. A second AP or mesh node with a wired (or dedicated backhaul) link back to the router avoids that penalty and gives cleaner roaming.$$),

('a1-f-411','aplus1',2,'2.5','core',
 $$Why change the default SSID and default administrator password on a new router?$$,
 $$Default SSIDs advertise the vendor and often the model, which tells an attacker which published default credentials and known firmware flaws to try. A unique SSID and a strong unique admin password remove the two easiest ways in, and firmware should be updated at the same time.$$),

('a1-f-412','aplus1',2,'2.5','core',
 $$Why is remote (WAN-side) management normally disabled on a SOHO router?$$,
 $$It publishes the administration interface to the entire internet, where it is found by automated scanning within hours and attacked with default credentials and known exploits. Administer the router from the LAN, or reach the LAN first over a VPN.$$),

('a1-f-413','aplus1',2,'2.5','core',
 $$After the ISP swaps a modem, what is the correct power-up order and why?$$,
 $$Power the modem first and wait for its online or sync light to go solid, then the router, then clients. Provider modems often bind to the MAC address of the first device they see, so a modem that came up before the new router was attached will not hand it a lease until it is cycled.$$),

-- ============ 2.6 Common network configuration concepts ============

('a1-f-414','aplus1',2,'2.6','acronym',
 $$APIPA$$,
 $$Automatic Private IP Addressing - a host self-assigns a 169.254.x.x address when no DHCP server answers, so seeing one is a diagnostic signal that the DHCP lease failed.$$),

('a1-f-415','aplus1',2,'2.6','core',
 $$What exactly does APIPA configure on the interface, and what does it leave out?$$,
 $$It assigns an address from 169.254.0.0/16 with a 255.255.0.0 mask, and nothing else - no default gateway and no DNS server. That is why an APIPA host can talk to others on its own link but cannot leave the segment or resolve names.$$),

('a1-f-416','aplus1',2,'2.6','core',
 $$Two PCs on the same switch both hold 169.254 addresses. What will work and what will not?$$,
 $$They can ping each other and reach each other file shares, because 169.254.0.0/16 is link-local and both are on the same segment. Nothing off the segment works: no internet, no remote subnets, no name resolution, because APIPA supplies no gateway and no DNS.$$),

('a1-f-417','aplus1',2,'2.6','core',
 $$One workstation has an APIPA address while its neighbours have valid leases. What does that narrow the fault to?$$,
 $$Something specific to that one path: patch cable, wall jack termination, switch port, NIC, or that port VLAN assignment. If the DHCP server or scope were at fault, the neighbours would be failing too, so a single-host failure points at the physical path first.$$),

('a1-f-418','aplus1',2,'2.6','core',
 $$An entire subnet comes up with APIPA addresses. What are the likely causes?$$,
 $$The DHCP service is down, the scope for that subnet is exhausted, the DHCP relay or helper address on that VLAN is missing or wrong, or the uplink carrying DHCP traffic has failed. Existing hosts often keep working until their leases expire, which masks the start of the outage.$$),

('a1-f-419','aplus1',2,'2.6','core',
 $$What configuration does a client normally receive from DHCP?$$,
 $$IP address, subnet mask, default gateway, and DNS server addresses, plus a lease time that controls when the client tries to renew. That is the same set of values a technician would otherwise type by hand for a static configuration.$$),

('a1-f-420','aplus1',2,'2.6','core',
 $$What is a DHCP reservation and why prefer it over a manual static address?$$,
 $$A reservation maps a MAC address to a fixed address inside the scope, so the device always gets the same IP while its mask, gateway, and DNS still come from the server. Manual statics inside the pool are invisible to the DHCP server and eventually cause address conflicts.$$),

('a1-f-421','aplus1',2,'2.6','core',
 $$What is a DHCP scope, and what is the symptom when one is exhausted?$$,
 $$A scope is the range of addresses a server may lease on a subnet, with its mask, gateway, DNS, and lease time. When every address is leased, existing clients keep working while each new device falls back to APIPA - which is why the failure looks intermittent and hits guests and new arrivals first.$$),

('a1-f-422','aplus1',2,'2.6','core',
 $$What does the subnet mask actually tell a host?$$,
 $$Which bits of its address identify the network. The host compares a destination against its own address using the mask: if the destination is on the same network, the host delivers directly on the link; if not, it hands the packet to the default gateway.$$),

('a1-f-423','aplus1',2,'2.6','core',
 $$What symptom points to a missing or wrong default gateway?$$,
 $$Everything on the local subnet works, and everything beyond it fails - by name and by IP address alike. The host has no next hop for off-subnet destinations, so those packets are simply dropped before they leave.$$),

('a1-f-424','aplus1',2,'2.6','core',
 $$How do you tell a DNS problem from a gateway problem?$$,
 $$Ping by IP address. If IP addresses work but names fail, DNS is at fault. If even IP addresses fail once you leave the local subnet, suspect the gateway or the mask that defines what local means.$$),

('a1-f-425','aplus1',2,'2.6','core',
 $$How are IPv4 and IPv6 addresses formatted?$$,
 $$IPv4 is 32 bits shown as four decimal octets, such as 192.168.1.10. IPv6 is 128 bits shown as eight groups of four hexadecimal digits separated by colons, where leading zeros can be dropped and one run of all-zero groups can be compressed to a double colon.$$),

('a1-f-426','aplus1',2,'2.6','core',
 $$What is an IPv6 link-local address and where does it come from?$$,
 $$An address in fe80::/10 that every IPv6 interface configures for itself with no router or server involved. It is valid only on that link and is never routed, so it appears even on an isolated segment - which is why seeing one is not proof of working connectivity.$$),

('a1-f-427','aplus1',2,'2.6','core',
 $$What does dual stack mean?$$,
 $$Running IPv4 and IPv6 at the same time on the same interfaces, so a host has addresses in both and uses whichever the destination supports. It is the usual migration approach, because it needs no translation gateway and nothing breaks while IPv4 remains in use.$$),

('a1-f-428','aplus1',2,'2.6','core',
 $$What does a VLAN do, and what is needed for two VLANs to communicate?$$,
 $$A VLAN splits one physical switch into separate logical networks, each its own broadcast domain, so traffic in one cannot be seen in another. Because they are separate networks, traffic between them must pass through a router or a Layer 3 switch, where policy can be applied.$$),

('a1-f-429','aplus1',2,'2.6','core',
 $$What problem do VLANs solve in an office with one switch and mixed traffic?$$,
 $$They keep voice, guest, and office traffic apart without buying a second switch or pulling new cable - limiting broadcast traffic, isolating untrusted devices, and allowing different quality-of-service treatment for voice.$$),

('a1-f-430','aplus1',2,'2.6','core',
 $$What does a client-to-site VPN give a remote user, and what is split tunnelling?$$,
 $$An encrypted tunnel across the untrusted internet plus an address on the corporate network, so internal-only resources become reachable and hotel or café Wi-Fi cannot read the traffic. With split tunnelling, only corporate-bound traffic enters the tunnel and general browsing goes out locally; a full tunnel sends everything through the company edge for inspection.$$),

-- ============ 2.7 Internet connection types and network types ============

('a1-f-431','aplus1',2,'2.7','acronym',
 $$DSL$$,
 $$Digital Subscriber Line - broadband carried over existing telephone copper; sync speed falls as the loop distance from the provider central office increases.$$),

('a1-f-432','aplus1',2,'2.7','acronym',
 $$ONT$$,
 $$Optical Network Terminal - the powered box that terminates the provider fiber at the premises and hands off Ethernet to the customer router.$$),

('a1-f-433','aplus1',2,'2.7','acronym',
 $$WISP$$,
 $$Wireless Internet Service Provider - delivers fixed wireless broadband from a ground tower to a directional antenna at the customer site, so it needs clear line of sight.$$),

('a1-f-434','aplus1',2,'2.7','acronym',
 $$PAN$$,
 $$Personal Area Network - the very short-range network around one person, typically Bluetooth links from a phone to earbuds, a watch, or a keyboard.$$),

('a1-f-435','aplus1',2,'2.7','core',
 $$Why is geostationary satellite internet a poor fit for voice, video calls, and gaming?$$,
 $$Every packet travels to high orbit and back, and that propagation delay adds latency that no amount of bandwidth removes, so interactive traffic feels out of step. Heavy rain can also cause signal fade, and plans often carry data caps.$$),

('a1-f-436','aplus1',2,'2.7','core',
 $$When is satellite still the right recommendation?$$,
 $$When there is no wired infrastructure, no cellular coverage, and no line of sight to a WISP tower - it needs only a clear view of the sky. It suits browsing, email, and streaming, where added latency matters far less than having service at all.$$),

('a1-f-437','aplus1',2,'2.7','core',
 $$Why does cable internet slow down in the evening?$$,
 $$Cable subscribers share the capacity of a neighbourhood node over the coax plant, so speeds fall for everyone on that node as usage peaks and recover overnight. Service is also asymmetric, with upload much lower than download.$$),

('a1-f-438','aplus1',2,'2.7','core',
 $$What limits DSL speed, and how is it installed in the home?$$,
 $$Attenuation over the copper pair, so the achievable rate drops as the loop length from the central office DSLAM grows; line quality matters too. Filters or splitters are fitted at telephone jacks so voice and the DSL frequencies coexist, and consumer service is asymmetric.$$),

('a1-f-439','aplus1',2,'2.7','core',
 $$What makes fiber to the premises different from cable and DSL?$$,
 $$Data travels as light in glass, so it is immune to electromagnetic interference and does not suffer the copper distance penalty over normal residential runs. Plans are often symmetric, the highest speeds available, and an ONT at the wall converts the optical signal to Ethernet.$$),

('a1-f-440','aplus1',2,'2.7','core',
 $$How do technicians use cellular service for connectivity?$$,
 $$Through a mobile hotspot, phone tethering, a cellular modem in a router, or fixed wireless home internet over 4G LTE or 5G. It needs no installed wireline, which suits temporary sites, field work, and failover for a fixed circuit; watch data caps and coverage.$$),

('a1-f-441','aplus1',2,'2.7','core',
 $$How does WISP fixed wireless differ from satellite and cellular?$$,
 $$The signal goes to a ground tower a few kilometres away rather than to orbit, so latency is far lower than satellite, and it uses a directional antenna aimed at that tower rather than a carrier macro network. The cost is a hard requirement for clear line of sight, which terrain, buildings, and tree growth can break.$$),

('a1-f-442','aplus1',2,'2.7','core',
 $$What defines a LAN?$$,
 $$A network confined to one site - a home, floor, or building - built on cabling and switches the organisation owns, with high speeds and no provider circuit in the middle. It is the baseline the other network types are contrasted against.$$),

('a1-f-443','aplus1',2,'2.7','core',
 $$What defines a WAN?$$,
 $$A network that links sites in different geographic locations, almost always over circuits or services leased from a telecommunications provider, because no organisation can run its own cable between cities. Each connected site remains a LAN in its own right.$$),

('a1-f-444','aplus1',2,'2.7','core',
 $$What is a MAN?$$,
 $$A metropolitan area network spanning a city or campus-sized area, typically linking several sites of one organisation - for example a city government joining its town hall, fire stations, and library over fiber it owns or leases locally.$$),

('a1-f-445','aplus1',2,'2.7','core',
 $$What is a SAN, and how does it differ from a NAS?$$,
 $$A storage area network is a dedicated high-speed network (Fibre Channel or iSCSI) that presents block-level storage to servers, so remote volumes appear as local disks and the traffic stays off the production LAN. A NAS is a single appliance serving files over the existing LAN.$$),

('a1-f-446','aplus1',2,'2.7','core',
 $$How does a WLAN differ from a wired LAN?$$,
 $$Clients associate to access points instead of plugging into switch ports, and they share the airtime of a channel rather than getting a dedicated full-duplex link, so throughput falls as clients and interference increase. Roaming works when several APs advertise the same SSID and security settings.$$),

('a1-f-447','aplus1',2,'2.7','core',
 $$What is a wireless mesh network?$$,
 $$A network in which nodes relay traffic for each other rather than each needing a wired uplink, so coverage extends around obstacles and the mesh reroutes if a node fails. Consumer mesh Wi-Fi kits and many IoT protocols work this way; nodes with a wired backhaul perform best.$$),

('a1-f-448','aplus1',2,'2.7','core',
 $$Which services should you consider for a site with no wired infrastructure, and how do you choose?$$,
 $$Cellular, WISP fixed wireless, and satellite. Prefer cellular where carrier coverage is good, WISP where there is line of sight to a tower and lower latency is needed, and satellite as the fallback when neither is available and the latency can be tolerated.$$),

-- ============ 2.8 Networking tools ============

('a1-f-449','aplus1',2,'2.8','core',
 $$What does a cable crimper do?$$,
 $$It attaches a modular plug such as RJ45 to the end of a cable, pressing the plug contacts through the conductor insulation and closing the strain relief onto the jacket. It is the tool for making patch cords, not for terminating jacks or patch panels.$$),

('a1-f-450','aplus1',2,'2.8','core',
 $$What does a punchdown tool do, and where is it used?$$,
 $$It seats a conductor into an insulation displacement contact and cuts off the excess in one stroke. It is used at keystone jacks, patch panels, and 110 blocks - the two ends of a structured horizontal cable run.$$),

('a1-f-451','aplus1',2,'2.8','core',
 $$Crimper or punchdown tool - how do you choose?$$,
 $$Plug on a cable end means crimper; conductor into a jack, patch panel, or 110 block means punchdown tool. A patch cord needs a crimper at each end; a wall drop needs a punchdown tool at both the panel and the jack.$$),

('a1-f-452','aplus1',2,'2.8','core',
 $$What does a basic cable tester confirm, and what can it not tell you?$$,
 $$It checks continuity on each conductor and reports the wiremap, revealing opens, shorts, and reversed or crossed pairs. It does not measure performance - crosstalk, attenuation, and category compliance need a cable certifier - and it says nothing about switch configuration or actual throughput.$$),

('a1-f-453','aplus1',2,'2.8','core',
 $$What do the terms open, short, and reversed pair mean on a cable tester report?$$,
 $$Open: a conductor is not continuous end to end, often a broken wire or one that failed to seat. Short: two conductors are touching. Reversed or crossed pair: the conductors are continuous but land on the wrong pins at one end, so the wiremap does not match the standard.$$),

('a1-f-454','aplus1',2,'2.8','core',
 $$What is a loopback plug and what does it prove?$$,
 $$A plug that connects the transmit pins back to the receive pins so an interface receives its own signal. It tests whether a NIC or switch port can transmit and receive with no cable, switch, or second machine involved, which isolates the port from the rest of the path.$$),

('a1-f-455','aplus1',2,'2.8','core',
 $$How does a tone generator and probe work?$$,
 $$The generator clips onto a cable at a known end and injects an audio-frequency signal onto the conductors. The technician then sweeps the inductive probe over the bundle at the other end; the tone grows loudest over the matching cable, identifying it without disturbing the rest.$$),

('a1-f-456','aplus1',2,'2.8','core',
 $$Why disconnect a cable from the switch before applying tone to it?$$,
 $$The generator drives a signal onto the conductors, which you do not want feeding into a live port, and toning an in-service cable disturbs a working link. Unplug that one patch cord, trace, then label the cable and reconnect it.$$),

('a1-f-457','aplus1',2,'2.8','core',
 $$What does a Wi-Fi analyzer show you, and what do you do with the result?$$,
 $$Nearby networks with their SSIDs, channels, channel widths, signal strength, and channel utilisation, often with a survey or heat map. Use it to move an access point onto a cleaner channel, to size coverage overlap, and to find the dead zones behind a complaint.$$),

('a1-f-458','aplus1',2,'2.8','core',
 $$What is a network tap, and how does it differ from a switch port mirror?$$,
 $$A tap is inserted inline on a link and passively copies everything crossing it to a monitoring port, including errored frames, so it cannot be oversubscribed by the traffic it copies. A port mirror (SPAN) needs no extra hardware and no link interruption to set up, but the mirror port can drop frames when it must carry both directions of a busy link.$$),

('a1-f-459','aplus1',2,'2.8','core',
 $$Which tool identifies which cable in an unlabelled bundle serves a particular wall jack?$$,
 $$A tone generator and probe. A cable tester is the wrong instrument here because it verifies a run whose two ends you have already found, while the toner is what finds the far end in the first place.$$),

('a1-f-460','aplus1',2,'2.8','core',
 $$A newly punched-down jack gives no link light. Which tool comes out first?$$,
 $$A cable tester, to check continuity and the wiremap on that run. Terminations fail as opens where a conductor did not seat, or as crossed pairs where the colour order slipped, and both show up immediately on the wiremap.$$),

('a1-f-461','aplus1',2,'2.8','core',
 $$How do you test a suspect NIC when no spare cable, switch port, or second machine is available?$$,
 $$Use a loopback plug. It feeds the port transmit signal back into its own receive pins so diagnostics can confirm the interface works, proving whether the fault is in the port or somewhere else in the path.$$),

('a1-f-462','aplus1',2,'2.8','core',
 $$Users in one area report slow Wi-Fi while the wired network is fine. Which tool do you reach for?$$,
 $$A Wi-Fi analyzer, to see which channels the neighbouring networks occupy, how busy the channel is, and how strong the signal is at the complaint location. Cable tools cannot see the radio environment where the problem actually is.$$),

('a1-f-463','aplus1',2,'2.8','core',
 $$What is a split pair, and why does a basic tester miss it?$$,
 $$A termination where the pin order is continuous end to end but the signals no longer travel on their own twisted pairs. A wiremap tester only checks pin to pin, so it passes, while the lost noise cancellation shows up as crosstalk, CRC errors, and unstable gigabit links.$$),

('a1-f-464','aplus1',2,'2.8','core',
 $$What is the difference between a cable tester and a cable certifier?$$,
 $$A tester answers whether the conductors are connected correctly - continuity and wiremap. A certifier measures performance against a category standard, including crosstalk, attenuation, and length, and produces the pass or fail documentation an installer hands over.$$),

('a1-f-465','aplus1',2,'2.8','core',
 $$Which tool tells you roughly how far along a run a break is?$$,
 $$A cable tester with a time-domain reflectometer function. It sends a pulse and times the reflection from the fault, reporting an approximate distance so the wall is opened in one place instead of several.$$),

('a1-f-466','aplus1',2,'2.8','core',
 $$What is the order of work for installing and verifying a new cable drop?$$,
 $$Pull the run, punch down the patch panel end and the keystone jack end, test the run with a cable tester and correct any wiremap fault, label both ends, then patch it to a switch port and confirm the client gets a link and a DHCP lease.$$);
