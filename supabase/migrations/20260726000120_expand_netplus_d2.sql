-- Network+ (N10-009) Domain 2 (Network Implementation) expansion.
-- Tops up objectives 2.1, 2.2, 2.3 and builds out 2.4 (physical installations),
-- which previously had no content at all.
--   questions:   n-q-200 .. n-q-248  (49 items)
--   flashcards:  n-f-200 .. n-f-258  (59 items)
-- Objective split: 2.1 = 12q/14f, 2.2 = 10q/12f, 2.3 = 12q/15f, 2.4 = 15q/18f.

-- ============================================================================
-- QUESTIONS
-- ============================================================================

insert into questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ---------------------------------------------------------------- 2.1 --------
('n-q-200','netplus',2,'2.1','mcq',2,
 'A router''s table contains 10.0.0.0/8 via Gi0/1, 10.10.0.0/16 via Gi0/2 and 10.10.20.0/24 via Gi0/3, all learned from OSPF with the same cost. Out of which interface is a packet destined for 10.10.20.55 forwarded?',
 '["Gi0/3, because /24 is the longest matching prefix","Gi0/1, because /8 covers the largest block and is therefore the safest match","Gi0/2, because it is the middle-length match and balances specificity against coverage","The router load-balances across all three, because the OSPF cost is identical"]'::jsonb,
 '0'::jsonb,
 'Forwarding is decided by longest prefix match: of the three routes that contain 10.10.20.55, the /24 is the most specific, so Gi0/3 wins regardless of cost. Equal-cost load balancing is tempting here but it only applies between routes to the *same* prefix from the same protocol - three different prefix lengths are never load-balanced against each other.'),

('n-q-201','netplus',2,'2.1','mcq',2,
 'A router learns a route to 192.168.50.0/24 from OSPF (administrative distance 110) and also has a manually configured static route to 192.168.50.0/24 left at its default administrative distance of 1. Which route is installed in the routing table?',
 '["The static route, because a lower administrative distance means a more trusted source","The OSPF route, because dynamically learned routes always supersede manual configuration","The OSPF route, because its cost is calculated from real link bandwidth while a static route has no metric","Both, because the router installs one route per source and alternates between them"]'::jsonb,
 '0'::jsonb,
 'Administrative distance ranks how much a router trusts the *source* of a route, and the lowest AD wins: static (1) beats OSPF (110), so the static route is installed and the OSPF route sits unused in the topology database. The bandwidth-derived cost argument is the common trap - metric is only compared between routes learned from the same protocol, so an OSPF cost never competes against a static route''s AD.'),

('n-q-202','netplus',2,'2.1','mcq',3,
 'A router holds two candidate routes that both contain the destination address 172.16.40.9: a 172.16.40.0/24 learned via RIP (AD 120) and a 172.16.0.0/16 learned via OSPF (AD 110). Which one is used to forward the packet?',
 '["The /24 RIP route, because prefix length is evaluated before administrative distance","The /16 OSPF route, because 110 is a lower administrative distance than 120","The /16 OSPF route, because a link-state protocol always outranks a distance-vector protocol","Neither; the router discards the packet because the two sources disagree"]'::jsonb,
 '0'::jsonb,
 'Both routes are installed - they are different prefixes, so they do not compete - and forwarding picks the most specific match, which is the /24 from RIP. Choosing the OSPF route on AD grounds is the classic error: administrative distance only breaks ties between routes to the *same* prefix, and it never overrides longest prefix match.'),

('n-q-203','netplus',2,'2.1','ordering',3,
 'Place the steps a router performs when selecting a route for an incoming packet into the correct order.',
 '["Prefer the route with the longest prefix length (the most specific mask)","Among routes from the same protocol, prefer the one with the lowest metric","Identify every route in the table whose network contains the destination address","Among routes to the same prefix, prefer the one with the lowest administrative distance"]'::jsonb,
 '[2,0,3,1]'::jsonb,
 'The router first gathers every matching route, then applies longest prefix match, then administrative distance to break ties between identical prefixes from different sources, and only then compares metrics between routes from the same protocol. Reversing the first two steps - checking AD before specificity - is the most common misconception and produces the wrong next hop whenever a less-trusted protocol supplies a more specific route.'),

('n-q-204','netplus',2,'2.1','mcq',2,
 'An enterprise multihomes to two different ISPs, advertises its own public address block to both, and wants to influence which provider inbound traffic prefers. Which routing protocol is designed for this job?',
 '["BGP, a path-vector protocol that exchanges reachability between autonomous systems","OSPF, a link-state protocol that scales to any size network through its area hierarchy","EIGRP, which selects paths using a composite metric of bandwidth and delay","RIPv2, which advertises networks to neighbours using a hop-count metric"]'::jsonb,
 '0'::jsonb,
 'BGP is the exterior gateway protocol of the internet: it peers between autonomous systems, carries the AS path, and exposes the attributes used to steer inbound and outbound preference. OSPF is the tempting pick because it scales well, but it and EIGRP are interior gateway protocols - they run inside a single AS and no ISP will peer with you using them.'),

('n-q-205','netplus',2,'2.1','mcq',2,
 'Which statement correctly describes OSPF''s metric and its area design?',
 '["Cost is derived from interface bandwidth, and area 0 is the backbone that every other area must connect to","Cost is the number of routers crossed, and area 0 is reserved for routes redistributed from outside","Cost is set manually on each route, and area 0 is where static routes are stored","Cost is a composite of bandwidth and delay, and area 0 designates a stub area"]'::jsonb,
 '0'::jsonb,
 'OSPF cost is inversely proportional to interface bandwidth (faster link, lower cost), and area 0 is the backbone through which all inter-area traffic must pass, which is why every other area has to be adjacent to it or reach it by a virtual link. Hop count belongs to RIP and the bandwidth-plus-delay composite belongs to EIGRP - both are offered here because candidates routinely swap the three metrics.'),

('n-q-206','netplus',2,'2.1','multi',2,
 'A small office router uses one public IP address for all 40 internal hosts on 192.168.1.0/24. Select TWO statements that are true of this configuration.',
 '["It is PAT (NAT overload): the router rewrites the source address and tracks a unique source port per session","An inbound connection initiated from the internet needs an explicit port-forwarding rule to reach a specific internal host","Each internal host is issued its own dedicated public address from a pool as it sends traffic","It removes the need for the internal hosts to have a default gateway configured","It works by rewriting the destination MAC address of each outbound frame to the router''s public interface MAC"]'::jsonb,
 '[0,1]'::jsonb,
 'PAT multiplexes many private sources onto a single public address by rewriting the source port and keeping a translation table, and because a table entry only exists after an inside host sends traffic, unsolicited inbound sessions need a static port-forward (destination NAT) to be mapped anywhere. Option 3 describes dynamic NAT with an address pool, not PAT; the hosts still need a default gateway to reach the router at all; and the MAC-rewrite option confuses NAT (layer 3/4 address translation) with the ordinary layer 2 rewriting that happens on every hop regardless of NAT.'),

('n-q-207','netplus',2,'2.1','mcq',2,
 'A site has two routers that can both reach the internet. Hosts are configured with a single default-gateway address, and if the router owning it fails the other must assume that same address with no client-side change. Which technology provides this?',
 '["An FHRP such as HSRP or VRRP, which shares a virtual IP and virtual MAC between the routers","Link aggregation with LACP between the two routers","OSPF running between the two routers so they converge on a new path","DHCP option 3, re-issued to every host when the primary router fails"]'::jsonb,
 '0'::jsonb,
 'A first hop redundancy protocol presents one virtual IP and virtual MAC that either physical router can own, so the failover is invisible to hosts. Running OSPF between the routers is the seductive wrong answer - it converges the routers'' own paths beautifully but does nothing for a host that has one gateway address hard-coded, and re-issuing DHCP option 3 depends on clients renewing, which is far too slow to be called redundancy.'),

('n-q-208','netplus',2,'2.1','multi',3,
 'Select TWO characteristics that distinguish link-state routing protocols from distance-vector routing protocols.',
 '["Each router builds a complete topology database and independently runs a shortest-path algorithm against it","Updates are flooded when the topology changes, rather than sent as periodic full-table advertisements","Each router advertises its entire routing table to directly connected neighbours on a fixed timer","Each router learns routes only from what its neighbours report, with no independent view of the wider topology","The path metric is always expressed as a hop count"]'::jsonb,
 '[0,1]'::jsonb,
 'The two defining traits of link-state operation are a synchronised link-state database on every router plus an SPF (Dijkstra) calculation, and triggered incremental flooding instead of periodic table dumps - together these give the faster convergence link-state is known for. Options 3 and 4 describe distance-vector "routing by rumour", and hop count is specifically RIP''s metric, not a property of either class.'),

('n-q-209','netplus',2,'2.1','mcq',1,
 'A WAN link is configured so that traffic exceeding the contracted rate is held in a queue and released later, smoothing bursts instead of discarding them. Which bandwidth-management technique is this?',
 '["Traffic shaping","Traffic policing","Link aggregation","Port mirroring"]'::jsonb,
 '0'::jsonb,
 'Buffering excess traffic and metering it out to conform to a rate is the definition of shaping - it costs latency but avoids loss. Policing is the tempting near-miss: it enforces the same rate limit but drops or re-marks the excess immediately rather than queueing it.'),

('n-q-210','netplus',2,'2.1','mcq',3,
 'A customer buys a 200 Mbps service delivered on a 1 Gbps physical handoff. Whenever traffic bursts above 200 Mbps the provider discards the excess immediately, and the customer''s monitoring shows packet loss but no increase in latency. Which technique is the provider applying?',
 '["Traffic policing","Traffic shaping","Quality of Service marking with DSCP","Asymmetric routing between the two directions"]'::jsonb,
 '0'::jsonb,
 'The fingerprint of policing is loss without added delay: excess is dropped or re-marked at the instant it arrives, with no buffer involved. Shaping is the distractor to rule out - had the provider shaped, the same overage would have shown up as rising latency and jitter while the queue drained, not as clean packet loss.'),

('n-q-211','netplus',2,'2.1','matching',3,
 'Match each routing protocol on the left to the description that best classifies it.',
 '{"left":["RIPv2","OSPF","BGP","EIGRP"],"right":["Path-vector exterior gateway protocol used to exchange routes between autonomous systems","Distance-vector interior protocol with a maximum of 15 hops","Advanced distance-vector interior protocol using a bandwidth-and-delay composite metric","Link-state interior protocol whose cost is derived from interface bandwidth"]}'::jsonb,
 '[1,3,0,2]'::jsonb,
 'RIPv2 is classic distance-vector and treats anything past 15 hops as unreachable; OSPF is link-state with a bandwidth-derived cost; BGP is the path-vector protocol used between autonomous systems; EIGRP is advanced distance-vector, using DUAL and a composite metric while keeping backup successors in a topology table. The easy slip is filing EIGRP under link-state because it converges quickly - it does not flood LSAs or run SPF.'),

-- ---------------------------------------------------------------- 2.2 --------
('n-q-212','netplus',2,'2.2','mcq',2,
 'On an 802.1Q trunk, how are frames belonging to the native VLAN carried?',
 '["Untagged, while frames for every other VLAN carry a 4-byte 802.1Q tag","Double-tagged, so the receiving switch can tell them apart from data VLANs","Tagged with VLAN ID 4095, the reserved management value","Encapsulated with ISL headers instead of 802.1Q headers"]'::jsonb,
 '0'::jsonb,
 'The native VLAN is by definition the one VLAN whose frames cross the trunk with no tag added, which is why a native VLAN mismatch between the two ends silently merges two VLANs and enables double-tagging VLAN hopping. VLAN 4095 is indeed reserved, but it is never used to carry native traffic - that option exists purely to catch people who remember the reserved IDs without remembering what they are for.'),

('n-q-213','netplus',2,'2.2','mcq',2,
 'An IP phone is connected to a single switch port, with a PC daisy-chained behind the phone. Voice traffic must land in VLAN 20 and the PC''s traffic in VLAN 10. Which switch port configuration achieves this?',
 '["An access port in VLAN 10 with voice VLAN 20 configured on the same port","A trunk port with all VLANs allowed and the native VLAN left at the default of VLAN 1","An access port in VLAN 20, relying on DHCP to place the PC into VLAN 10","Two aggregated access ports bonded with LACP, one assigned to each VLAN"]'::jsonb,
 '0'::jsonb,
 'The voice VLAN feature lets one access port carry the PC''s untagged frames in the data VLAN while the phone tags its own frames for the voice VLAN, giving the required separation on a single cable. Converting the port to a full trunk looks equivalent but leaves the PC''s untagged traffic in VLAN 1 rather than VLAN 10 and needlessly exposes every VLAN to an edge port; DHCP cannot move a host between VLANs, because the switch decides VLAN membership before any DHCP exchange happens.'),

('n-q-214','netplus',2,'2.2','mcq',3,
 'How is the root bridge chosen in a spanning tree topology?',
 '["The switch with the lowest bridge ID wins, where the bridge ID is the priority value followed by the switch MAC address","The switch with the highest number of active ports wins","The first switch powered on claims the role and keeps it until it is rebooted","The switch with the highest-bandwidth uplink wins"]'::jsonb,
 '0'::jsonb,
 'Bridge ID is priority (default 32768, adjustable in steps of 4096) concatenated with the switch MAC address, and the numerically lowest value wins - which is why lowering the priority on your core switch is the supported way to force a deterministic root. Uplink bandwidth is the plausible-sounding trap: link speed sets the *path cost* other switches use to reach the root, but it plays no part in the election itself.'),

('n-q-215','netplus',2,'2.2','multi',3,
 'A technician adds a second cable between two switches for redundancy on a network where spanning tree has been disabled. Select TWO symptoms that will result.',
 '["Broadcast frames circulate endlessly around the loop, saturating the links and the switch CPUs","The switches'' MAC address tables become unstable as the same source MAC is learned alternately on two ports","The switches automatically negotiate an LACP bundle across the two links, preventing the loop","VLAN tags are stripped from frames each time they cross the loop","Each switch elects itself as root bridge and stops forwarding all user traffic"]'::jsonb,
 '[0,1]'::jsonb,
 'Without STP a layer 2 loop produces a broadcast storm plus MAC address table instability (often logged as MAC flapping), because a frame arriving from both directions makes each switch relearn the source on alternating ports. LACP is the attractive distractor - it would indeed prevent the loop, but it must be explicitly configured on both ends and never forms by itself; and a loop neither strips VLAN tags nor causes a graceful shutdown, which is exactly what makes it so damaging.'),

('n-q-216','netplus',2,'2.2','mcq',3,
 'Two switches are joined by four 1 Gbps links configured as a single LACP port channel. Which statement is accurate?',
 '["Member interfaces must match in speed, duplex and VLAN configuration, and any single traffic flow is normally hashed onto just one member link","A single large TCP file transfer will automatically use the full 4 Gbps of aggregate bandwidth","LACP supersedes spanning tree on those links, so STP should be disabled on the bundle","Member links may run at different speeds because LACP normalises throughput across them"]'::jsonb,
 '0'::jsonb,
 'Aggregation requires consistent speed, duplex and VLAN/trunk settings on every member, and load balancing is per-flow: a hash of MAC, IP and/or port values pins each conversation to one member, so aggregate capacity rises but any single flow is still capped at one link''s speed. The 4 Gbps single-transfer answer is the most common misconception; and STP stays enabled, simply treating the whole bundle as one logical link.'),

('n-q-217','netplus',2,'2.2','mcq',1,
 'A security team needs a copy of all traffic crossing the server VLAN''s uplink delivered to an IDS sensor, without interrupting production traffic. Which switch feature provides this?',
 '["Port mirroring (SPAN) from the uplink to the sensor''s port","Link aggregation between the uplink and the sensor port","Port security with a maximum of two learned MAC addresses","Jumbo frames enabled on the sensor''s port"]'::jsonb,
 '0'::jsonb,
 'Port mirroring copies frames from a source port or VLAN to a designated monitor port so an IDS or packet capture can observe passively. Link aggregation is the tempting alternative because it also involves two ports, but it bundles links to share load - wiring the sensor that way would place it in the forwarding path and break production traffic rather than observing it.'),

('n-q-218','netplus',2,'2.2','mcq',3,
 'A storage team enables 9000-byte jumbo frames on their iSCSI servers. Throughput collapses and sessions stall instead of improving. What is the most likely cause?',
 '["At least one switch or interface in the path is still at the default 1500-byte MTU and is silently dropping the oversized frames","Jumbo frames require their own dedicated VLAN, which was never created","Jumbo frames are supported only over fibre, not over copper twisted pair","Jumbo frames must be paired with link aggregation before they take effect"]'::jsonb,
 '0'::jsonb,
 'Jumbo frames only work if every host, switch port and router interface along the path is configured for the same larger MTU - Ethernet has no layer 2 fragmentation, so a single 1500-byte hop discards the frame outright and the symptom is exactly this kind of stall. The media-type answer is plausible-sounding but wrong: jumbo support is a property of the interface and switching ASIC, and has nothing to do with copper versus fibre or with aggregation.'),

('n-q-219','netplus',2,'2.2','mcq',3,
 'An access switch advertises a total PoE budget of 370 W. The design calls for 24 devices, each requiring the full 802.3at (PoE+) allocation of 30 W at the switch port. What is the outcome?',
 '["The budget is exceeded - 24 x 30 W is 720 W - so ports beyond the budget will not be powered and higher-capacity or additional power supplies are needed","All 24 devices power up, because the PoE budget figure is per port rather than a switch-wide total","All 24 devices power up, because 802.3at devices automatically renegotiate down to 15.4 W when the budget is tight","All 24 devices power up, but the switch reduces data throughput on those ports to compensate"]'::jsonb,
 '0'::jsonb,
 'A PoE budget is the total wattage the switch power supplies can deliver across all ports at once; 24 x 30 W = 720 W is roughly double the 370 W available, so the switch will grant power by port priority and leave the remainder unpowered. Reading the budget as a per-port number is the classic planning error, and while classification and LLDP can negotiate a lower allocation, a switch does not silently downgrade Type 2 devices to Type 1 to make the numbers fit.'),

('n-q-220','netplus',2,'2.2','multi',2,
 'Select TWO accurate statements about Power over Ethernet standards.',
 '["802.3af (PoE) supplies up to 15.4 W at the switch port, and 802.3at (PoE+) raises that to 30 W","802.3bt (PoE++) energises all four pairs to deliver substantially more power than PoE+","PoE delivers power over the fibre strands when fibre uplinks are used","PoE requires a separate power conductor bundled alongside the twisted pairs in the same jacket","Only 802.3af devices can be powered through a midspan injector"]'::jsonb,
 '[0,1]'::jsonb,
 '802.3af allocates 15.4 W at the source (about 12.95 W at the device after cable loss) and 802.3at raises the source allocation to 30 W (about 25.5 W at the device), while 802.3bt Types 3 and 4 use all four pairs to reach roughly 60 W and 90 W. Fibre carries light rather than current, so PoE is inherently a copper twisted-pair technology; no extra conductor is involved, since power rides the same pairs as data; and midspan injectors are made for af, at and bt alike depending on the model.'),

('n-q-221','netplus',2,'2.2','ordering',3,
 'Place the classic 802.1D spanning tree port states in the order a port passes through them on its way to carrying user traffic.',
 '["Blocking - the port discards user data and only receives BPDUs","Learning - the port populates its MAC address table but still does not forward user frames","Forwarding - the port sends and receives user data normally","Listening - the port exchanges BPDUs to determine its role but does not yet learn MAC addresses"]'::jsonb,
 '[0,3,1,2]'::jsonb,
 'Classic 802.1D moves a port Blocking, Listening, Learning, Forwarding, spending the forward-delay timer in each of the two transitional states - roughly 30 to 50 seconds in total, which is why edge ports feel dead after a reboot. Swapping Listening and Learning is the usual mistake: MAC learning is the later step, deliberately delayed until the port role is settled. RSTP collapses this to discarding, learning and forwarding with sub-second convergence.'),

-- ---------------------------------------------------------------- 2.3 --------
('n-q-222','netplus',2,'2.3','mcq',2,
 'Beyond raw headline data rate, what is the principal advantage 802.11ax (Wi-Fi 6) offers over 802.11ac (Wi-Fi 5) in a densely populated lecture hall?',
 '["OFDMA and uplink/downlink MU-MIMO let a single transmission serve several clients at once, raising efficiency where many devices contend","It is the first standard able to use the 5 GHz band, so it escapes the crowded 2.4 GHz spectrum","It removes the need for non-overlapping channel planning between neighbouring access points","It doubles the transmit power that regulators allow an access point to use"]'::jsonb,
 '0'::jsonb,
 'Wi-Fi 6''s density gains come from efficiency features - OFDMA subdividing a channel into resource units, multi-user MIMO in both directions, BSS colouring to distinguish overlapping cells, and target wake time - not just a faster PHY rate. The 5 GHz option is the trap for anyone who only remembers generation numbers: 802.11a, n and ac all used 5 GHz long before ax, and transmit power is set by the regulator, never by the standard.'),

('n-q-223','netplus',2,'2.3','mcq',2,
 'Which statement correctly compares the 2.4 GHz and 5 GHz bands for a Wi-Fi deployment?',
 '["2.4 GHz travels further and penetrates walls better but offers only three non-overlapping 20 MHz channels; 5 GHz offers far more channels and less interference at shorter range","5 GHz travels further and penetrates building materials better, which is why it is preferred for long-range links","2.4 GHz supports wider channels than 5 GHz, which gives it the higher maximum throughput","The two bands have identical range and differ only in maximum data rate"]'::jsonb,
 '0'::jsonb,
 'Lower-frequency 2.4 GHz signals attenuate less through walls and so cover more area, but the band is narrow (three non-overlapping 20 MHz channels) and shared with Bluetooth, microwaves and cordless phones; 5 GHz trades range for far more spectrum and cleaner air. Option 2 simply inverts the physics, which is a persistent misconception because 5 GHz is the "better" band in most other respects.'),

('n-q-224','netplus',2,'2.3','mcq',3,
 'An engineer widens the 5 GHz channels in a high-density office from 20 MHz to 80 MHz, and users report worse performance than before. Why?',
 '["Wider channels raise each client''s peak rate but reduce how many non-overlapping channels exist, so nearby access points now share channels and contend with each other","Wider channels lower the maximum data rate any single client can achieve","80 MHz channels are not permitted in the 5 GHz band, so the radios fell back to 802.11a rates","Wider channels force every associated client down to the slowest connected device''s rate"]'::jsonb,
 '0'::jsonb,
 'Channel bonding is a trade: 80 MHz quadruples a single client''s peak rate but cuts the number of usable non-overlapping channels to a handful, so in a dense AP deployment the result is co-channel interference and airtime contention - which is why high-density designs usually stay at 20 or 40 MHz. Bonding does not reduce per-client rate, and 80 MHz is very much a legal 5 GHz width, so the two "not supported" style answers are there to catch guesses.'),

('n-q-225','netplus',2,'2.3','mcq',2,
 'Two access points broadcast the same wireless network name so clients can roam between them. At the frame level, what distinguishes the two access points?',
 '["Each access point radio has its own BSSID (its radio MAC address), while both advertise the same SSID as part of one extended service set","Each access point has a unique SSID, while the BSSID is shared across the whole extended service set","The BSSID is the human-readable network name and the SSID is the access point''s MAC address","Roaming requires each access point to advertise a different SSID so the client can tell them apart"]'::jsonb,
 '0'::jsonb,
 'The SSID is the name users see, the BSSID is the MAC address of an individual AP radio identifying one basic service set, and several BSSIDs advertising one SSID form an extended service set - which is precisely what makes seamless roaming possible. Options 2 and 3 invert or swap the definitions, the single most frequently confused pair in wireless terminology.'),

('n-q-226','netplus',2,'2.3','mcq',1,
 'Two warehouse buildings 300 m apart with clear line of sight need a wireless bridge between them. Which antenna type belongs at each end?',
 '["A directional antenna such as a Yagi or parabolic grid, concentrating the signal along a narrow beam","An omnidirectional dipole antenna, radiating evenly in all horizontal directions","A downtilt ceiling-mount patch antenna aimed at the floor","No external antenna is needed; internal AP antennas are designed for point-to-point links"]'::jsonb,
 '0'::jsonb,
 'A directional antenna concentrates radiated energy into a narrow beam, trading coverage breadth for the gain and distance a point-to-point bridge needs. An omnidirectional antenna is the intuitive but wrong choice here: it spreads the same power over 360 degrees, wasting nearly all of it in directions where there is no receiver, which is why it belongs in the middle of a room rather than at the end of a link.'),

('n-q-227','netplus',2,'2.3','mcq',1,
 'Before installing access points in a new three-floor office, a team walks the building with survey software, recording signal strength, noise and neighbouring networks, and produces a colour-coded coverage map. What is this deliverable, and what is it used for?',
 '["A heat map produced by a site survey, used to decide access point placement, channel plan and transmit power against the building''s real materials and interference","A network baseline, used to track device CPU and interface utilisation over time","A logical network diagram, used to document IP addressing and VLAN assignments","A protocol analyser capture, used to decode individual 802.11 management frames"]'::jsonb,
 '0'::jsonb,
 'A site survey - predictive, passive or active - produces a heat map showing measured or modelled coverage, and that map is what drives AP placement, channel reuse and power settings for the building as built. A baseline is the tempting near-miss because it also involves measuring before a change, but a baseline records performance over time and tells you nothing about where the coverage holes are.'),

('n-q-228','netplus',2,'2.3','mcq',3,
 'Certain 5 GHz channels require an access point to listen for radar and vacate the channel if radar is detected. What is this requirement called?',
 '["Dynamic Frequency Selection (DFS)","Transmit Power Control (TPC)","Band steering","Beamforming"]'::jsonb,
 '0'::jsonb,
 'DFS governs the 5 GHz channels shared with weather and military radar: the AP must detect a radar signature and move off the channel, which can briefly interrupt associated clients, and some client devices refuse DFS channels entirely. TPC is the closely related regulatory requirement often quoted alongside DFS, but it limits radiated power rather than avoiding radar; band steering nudges dual-band clients toward 5 GHz and beamforming shapes the signal toward a client - neither touches radar.'),

('n-q-229','netplus',2,'2.3','mcq',2,
 'A hotel wants guests to join an open wireless network, then be redirected to a page where they accept the terms of use and enter a room number before internet access is granted. Which design element provides this?',
 '["A captive portal on an isolated guest SSID and VLAN, intercepting the client''s first web request","WPA3-Enterprise with 802.1X and a per-user certificate issued at check-in","MAC address filtering with an allow list maintained by the front desk","A pre-shared key printed on each guest keycard"]'::jsonb,
 '0'::jsonb,
 'A captive portal holds a newly associated client in a walled garden and intercepts its first web request until terms are accepted or credentials supplied, and the guest SSID is normally mapped to its own VLAN with client isolation and no route to internal subnets. 802.1X with certificates is genuinely stronger security but is unworkable for transient guests with unmanaged devices, MAC filtering scales badly and is trivially spoofed, and a shared key still provides no per-guest acceptance of terms.'),

('n-q-230','netplus',2,'2.3','multi',3,
 'A dense 2.4 GHz deployment suffers heavy co-channel interference. Select TWO configuration changes that would reduce it.',
 '["Restrict the access point channel plan to 1, 6 and 11 instead of allowing every channel","Reduce access point transmit power so each cell is smaller and channels can be reused at shorter distances","Increase access point transmit power so each access point overpowers its neighbours","Enable 40 MHz channel bonding on 2.4 GHz to give each access point more spectrum","Disable the 5 GHz radios so that all clients share the 2.4 GHz band consistently"]'::jsonb,
 '[0,1]'::jsonb,
 'The standard high-density recipe is a strict 1/6/11 plan with reduced transmit power, because smaller cells let the same three channels be reused more often without overlapping. Raising power is the intuitive but counterproductive move - bigger cells mean more access points hearing each other on the same channel; 40 MHz bonding in 2.4 GHz leaves effectively one usable wide channel; and disabling 5 GHz forces every client into the worst band.'),

('n-q-231','netplus',2,'2.3','multi',2,
 'Select TWO accurate statements about 802.11 generations.',
 '["802.11ac (Wi-Fi 5) operates only in the 5 GHz band","802.11n (Wi-Fi 4) introduced MIMO and can operate in both the 2.4 GHz and 5 GHz bands","802.11g operates in the 5 GHz band at rates up to 54 Mbps","802.11ac was the generation that introduced OFDMA for multi-user efficiency","802.11a and 802.11b are the same standard marketed under two names"]'::jsonb,
 '[0,1]'::jsonb,
 '802.11ac is a 5 GHz-only standard, which is why a dual-band "ac" access point still serves its 2.4 GHz clients using 802.11n, and 802.11n was the generation that brought MIMO plus dual-band operation. 802.11g is 2.4 GHz at up to 54 Mbps (802.11a is the 5 GHz standard at the same rate, which is what makes that option so easy to misread), OFDMA arrived with 802.11ax rather than ac, and 802.11a and b are separate standards ratified for different bands.'),

('n-q-232','netplus',2,'2.3','mcq',3,
 'An engineer plans to extend outdoor coverage by fitting a much higher-gain antenna to an access point while leaving the radio at full transmit power. What must be verified first?',
 '["That the resulting EIRP - transmit power plus antenna gain minus cable and connector loss - stays within the regulatory limit for that band and channel","That the cable length is under the limit, since only cable loss affects regulatory compliance","Nothing, because regulatory power limits apply to 2.4 GHz only and 5 GHz outdoor links are unrestricted","Nothing, because a higher-gain antenna reduces EIRP and therefore cannot breach a limit"]'::jsonb,
 '0'::jsonb,
 'Regulators cap effective isotropic radiated power, not just the radio''s output, so bolting a high-gain antenna onto a legal radio can push the installation over the limit - the fix is to reduce transmit power to compensate. The cable-loss answer is half right and therefore tempting: loss is one term in the EIRP calculation, but antenna gain is the dominant one and is exactly what is changing here.'),

('n-q-233','netplus',2,'2.3','matching',2,
 'Match each wireless term on the left to its correct description.',
 '{"left":["SSID","BSSID","Site survey heat map","Captive portal"],"right":["The human-readable network name broadcast in beacon frames","A page that intercepts a new client''s first web request until it authenticates or accepts terms of use","The MAC address of an individual access point radio, identifying one basic service set","A colour-coded map of measured signal strength used to plan access point placement and channel reuse"]}'::jsonb,
 '[0,2,3,1]'::jsonb,
 'The SSID is the name, the BSSID is the AP radio''s MAC address identifying a single basic service set, the heat map is the visual output of a site survey used for placement and channel decisions, and the captive portal is the interception page used on guest networks. The SSID/BSSID pair is the one to be careful with - both appear in beacon frames, but only the SSID is the name users choose from a list.'),

-- ---------------------------------------------------------------- 2.4 --------
('n-q-234','netplus',2,'2.4','mcq',1,
 'A campus building has one room where the ISP handoff, the core switch and the main cross-connect all terminate, plus a wiring closet on each floor serving that floor''s work areas. What are these two kinds of space called?',
 '["The MDF (main distribution frame) and the IDFs (intermediate distribution frames)","The IDF and the MDFs, respectively","The demarcation point and the entrance facility, respectively","The horizontal cross-connect and the work area, respectively"]'::jsonb,
 '0'::jsonb,
 'The MDF is the single main termination point where the service demarcation and the backbone converge; each IDF is a floor or zone closet fed from the MDF by backbone (vertical) cabling, with horizontal cabling running from the IDF out to the work areas. The demarc/entrance-facility option names the boundary with the service provider and the point where cabling enters the building - real terms, but they describe the edge of the plant, not its internal distribution hierarchy.'),

('n-q-235','netplus',2,'2.4','mcq',2,
 'A 42U rack is to hold two 2U servers, a 1U switch, a 4U UPS and a 1U patch panel. How much mounting space remains, and what does "U" actually measure?',
 '["32U remain; 1U is 1.75 inches (44.45 mm) of vertical mounting height in a standard 19-inch rack","32U remain; 1U is 1.75 inches of rack depth behind the mounting rails","28U remain; 1U is the standard width of a single rack-mounted device","34U remain; 1U expresses the power a device may draw from the rack PDU"]'::jsonb,
 '0'::jsonb,
 'The installed equipment consumes 2+2+1+4+1 = 10U, leaving 32U of the 42U rack, and a rack unit is a measure of vertical height - 1.75 inches or 44.45 mm - in the 19-inch EIA mounting standard. The depth answer is the one that catches people: depth, width and weight capacity are all separate specifications you must check independently, and a shallow wall-mount cabinet with plenty of free U can still be unable to accept a deep server.'),

('n-q-236','netplus',2,'2.4','mcq',3,
 'A rack is fed by a single 20 A, 120 V branch circuit. Continuous load on a branch circuit should not exceed 80 percent of its rating. What continuous load should the rack be planned to?',
 '["About 1,920 W, which is 16 A continuous","About 2,400 W, the full nameplate rating of the circuit","About 1,200 W, since a rack may use only half of its circuit","About 960 W, since only one leg of a 120 V circuit is usable"]'::jsonb,
 '0'::jsonb,
 '20 A x 120 V gives 2,400 VA of nameplate capacity, and the 80 percent derating for continuous load caps the planned draw at 1,920 W or 16 A - the headroom absorbs inrush at power-on and normal measurement error. Planning to the full 2,400 W is exactly how a rack ends up tripping its breaker once every device settles into steady-state load, which is why the nameplate figure is the most dangerous distractor here.'),

('n-q-237','netplus',2,'2.4','mcq',1,
 'A network closet must keep its switches running through brief utility sags and give staff time for an orderly shutdown during a longer outage. Which device provides that?',
 '["A UPS, which supplies battery power and conditions the incoming supply during sags and short outages","A PDU, which distributes the incoming supply to multiple outlets within the rack","A surge protector, which clamps transient over-voltages on the incoming supply","An automatic transfer switch, which selects between two utility feeds"]'::jsonb,
 '0'::jsonb,
 'Only the UPS stores energy, so only the UPS can carry the load when the supply disappears. A PDU is the frequent mix-up: even a metered or switched PDU only distributes and reports power, adding no ride-through capability; a surge protector handles voltage spikes but not loss of supply; and a transfer switch is worthless when the outage takes out both feeds.'),

('n-q-238','netplus',2,'2.4','multi',3,
 'A metered PDU shows a rack drawing 17.5 A on its single 20 A circuit, and more servers are due to be installed. Select TWO appropriate remedies.',
 '["Have an electrician add a second, independently breakered circuit and split the rack load across two PDUs","Consolidate or replace equipment with more power-efficient hardware to reduce the total draw","Replace the 20 A breaker with a 30 A breaker while leaving the existing branch wiring in place","Daisy-chain an additional power strip from a spare PDU outlet to provide more connections","Fit larger UPS batteries so the circuit can support additional load"]'::jsonb,
 '[0,1]'::jsonb,
 'An over-subscribed circuit has exactly two honest fixes: bring in more circuit capacity or reduce the load. Up-sizing the breaker without up-sizing the conductors is the dangerous answer - the breaker exists to protect the wire, so a 30 A device on 20 A wiring lets the cable overheat before anything trips; daisy-chaining strips adds outlets but not a single amp of capacity and is a code violation; and battery capacity only determines how long the UPS runs during an outage, which has no bearing on the branch-circuit limit.'),

('n-q-239','netplus',2,'2.4','mcq',3,
 'In a hot aisle/cold aisle data centre layout, how are the racks oriented and where does the cooling air enter the equipment?',
 '["Rows alternate front-to-front and back-to-back, with cold supply air delivered into the equipment-front aisle and hot exhaust collected from the rear aisle","Every row faces the same direction, so exhaust from one row pre-warms the intake of the next","Cold air is supplied at the rear of the racks so that it flows forward across the components","Rack orientation does not matter because in-rack fans move air regardless of aisle layout"]'::jsonb,
 '0'::jsonb,
 'Alternating rack orientation puts all equipment intakes on one shared cold aisle and all exhausts on one shared hot aisle, so hot air is captured and returned to the cooling units instead of being re-ingested. The "all racks facing the same way" option is precisely the anti-pattern the layout exists to eliminate: each row then breathes the previous row''s exhaust and inlet temperatures climb steadily down the room.'),

('n-q-240','netplus',2,'2.4','multi',2,
 'A data centre row runs hot even though the cooling units have adequate rated capacity. Select TWO physical measures that improve airflow efficiency.',
 '["Fit blanking panels in every unused rack U so cold air cannot bypass the equipment through open slots","Dress and route cables so they do not obstruct rear exhaust paths or block perforated floor tiles","Remove rack doors and side panels so air can circulate freely between the rows","Add perforated floor tiles in the hot aisle so the hot air is cooled directly","Lower the room temperature set point to 15 C (59 F) to compensate for the hot spots"]'::jsonb,
 '[0,1]'::jsonb,
 'Blanking panels stop cold supply air short-circuiting through empty rack space straight back to the intakes, and disciplined cable management keeps exhaust paths and floor-tile openings clear - both attack bypass and recirculation, which is the usual reason a room with enough cooling capacity still has hot spots. Stripping doors and venting cold air into the hot aisle both destroy the hot/cold separation the design depends on, and over-cooling the whole room burns energy while hiding the airflow fault rather than fixing it.'),

('n-q-241','netplus',2,'2.4','mcq',2,
 'Why is humidity in an equipment room held within a range rather than simply kept as low as possible?',
 '["Air that is too dry lets electrostatic charge build up and discharge into components, while air that is too humid risks condensation and corrosion","Air that is too dry causes condensation on cold surfaces, while air that is too humid increases static discharge","Humidity affects only tape and optical media, so the limits exist purely for archival storage","Humidity has no electrical effect; the range exists for the comfort of staff working in the room"]'::jsonb,
 '0'::jsonb,
 'Dry air favours electrostatic discharge, which can damage components during handling, while damp air risks condensation on cool surfaces and long-term corrosion of contacts - hence a controlled band watched by environmental sensors. Option 2 states both effects correctly but attaches each to the wrong end of the range, which is the trap for anyone who remembers the two hazards without remembering which is which.'),

('n-q-242','netplus',2,'2.4','mcq',3,
 'A ground-floor IDF closet with no dedicated cooling reaches 38 C (100 F) each afternoon, and the switch inside begins logging over-temperature alarms and rebooting at random. Which response addresses the root cause?',
 '["Provide dedicated cooling or ducted supply and return for the closet, and fit a temperature sensor that alerts before the alarm threshold is reached","Raise the switch fan speed setting so it exhausts heat more aggressively","Move the switch to the bottom of the rack, since hot air rises to the top","Replace the switch with an identical model, since over-temperature alarms indicate a failing unit"]'::jsonb,
 '0'::jsonb,
 'The closet has no path for removing heat, so the heat has to be taken out of the room; monitoring closes the loop by warning staff before the equipment reaches thermal shutdown. Increasing fan speed is the seductive quick fix - it moves the same heat around inside the same sealed space and actually adds a little more - and repositioning or replacing the switch simply puts hardware back into the environment that is cooking it.'),

('n-q-243','netplus',2,'2.4','mcq',1,
 'Why are horizontal cable runs terminated onto a patch panel rather than having modular plugs crimped directly onto their ends?',
 '["The permanent run is punched down once and never flexed again, while short replaceable patch cords absorb all the movement and wear at the front of the panel","The patch panel regenerates the signal, which extends the run beyond the 100 m copper limit","PoE cannot be delivered over a run unless it passes through a patch panel","The patch panel automatically converts the copper run to fibre for the uplink"]'::jsonb,
 '0'::jsonb,
 'A patch panel gives the in-wall cable a single stable, standards-terminated, documented endpoint; all the plugging, unplugging and flexing then happens on cheap patch leads that can be swapped in seconds. The signal-regeneration answer is the tempting one because panels sit in the middle of the link, but a patch panel is entirely passive - it neither amplifies nor extends distance, and it plays no part in PoE or media conversion.'),

('n-q-244','netplus',2,'2.4','mcq',3,
 'A technician installs a new fibre patch panel and cross-connects two switches, but the link stays down even though both transceivers report optical power present. What should be checked first?',
 '["Transmit/receive polarity - one end''s TX must land on the other end''s RX - along with end-face cleanliness and a matching fibre type","Whether the fibre patch panel has been connected to its own power supply","Whether the fibre run exceeds the 100 m distance limit","Whether jumbo frames have been enabled on both switch interfaces"]'::jsonb,
 '0'::jsonb,
 'Reversed polarity is the classic new-fibre fault: light is present, but each end is transmitting into the other end''s transmitter, so nothing is ever received - and it sits alongside dirty or scratched end faces and single-mode/multimode mismatches as the first three things to check. Fibre patch panels are passive and unpowered, the 100 m figure is the twisted-pair copper limit rather than a fibre one, and an MTU mismatch would never keep the link light down.'),

('n-q-245','netplus',2,'2.4','multi',2,
 'Select TWO practices that make a structured cabling installation maintainable over its lifetime.',
 '["Label both ends of every cable with a unique identifier that matches the patch panel port and the wall outlet","Record the closet, panel, port and destination of each run in a cable map kept current through change control","Rely on colour coding alone, since the colour of a cable identifies which run it is","Label only the patch panel end, because the far end can be identified from the outlet plate","Defer all labelling to the annual audit so it can be completed in a single pass"]'::jsonb,
 '[0,1]'::jsonb,
 'A unique identifier at both ends, matched to a maintained port map under change control, is what lets a technician trace a run from either end without a tone generator. Colour coding is genuinely useful for distinguishing cable roles or types, which is what makes it a plausible answer, but it cannot tell two runs of the same colour apart; labelling one end forces a trace from the other; and deferred labelling guarantees the documentation will never match what was actually installed.'),

('n-q-246','netplus',2,'2.4','mcq',2,
 'Which cable-management practice most directly prevents physical damage to twisted-pair cable during installation?',
 '["Respecting the manufacturer''s minimum bend radius and avoiding over-tightened cable ties","Pulling every bundle as tight as possible so the cables cannot shift within the tray","Running data bundles alongside power conductors and lighting ballasts to share one pathway","Coiling excess cable tightly on itself behind the rack to keep the run tidy"]'::jsonb,
 '0'::jsonb,
 'Exceeding the bend radius or crushing the jacket with over-tightened ties deforms the pair twist and the conductor spacing, degrading near-end crosstalk and return loss - the run may still light up while failing certification and throwing intermittent errors. Tight, tidy bundling looks like good practice, which is why it is the strongest distractor, but the tension and pressure it applies are exactly the mechanism of the damage; running parallel to power and ballasts additionally invites EMI.'),

('n-q-247','netplus',2,'2.4','multi',3,
 'A pair of top-of-rack switches must keep running through the loss of a single power feed. Select TWO design elements that achieve this.',
 '["Fit each switch with dual power supplies and connect one supply to each of two independent PDUs","Feed the two PDUs from separate branch circuits, ideally backed by separate UPS units, rather than chaining one from the other","Connect both power supplies of each switch to the same PDU so that both see identical voltage","Rely on a single UPS, since a UPS removes the need for a second power path","Use longer power cords so that either PDU can be reached quickly in an emergency"]'::jsonb,
 '[0,1]'::jsonb,
 'A/B power design means genuinely independent paths: dual power supplies in each device, each fed from a different PDU, and those PDUs fed from separate circuits and preferably separate UPS units, so no single failure can remove both. Plugging both supplies into one PDU is the mistake that quietly reintroduces the exact single point of failure the second supply was bought to eliminate, and a UPS is itself one component that can fail - redundancy has to span the whole path, not just the battery.'),

('n-q-248','netplus',2,'2.4','ordering',2,
 'Place the stages of building out a new IDF wiring closet into the correct order.',
 '["Mount the rack, install the PDU and UPS, and fit the switch into its planned rack units","Confirm the closet has adequate circuit capacity, cooling and physical security for the intended equipment","Terminate the horizontal runs onto the patch panel and label both ends against the port map","Certify every run with a cable tester and file the results with the as-built documentation"]'::jsonb,
 '[1,0,2,3]'::jsonb,
 'Environment comes first - power, cooling and security determine what the room can actually hold - then the physical build, then termination and labelling, and finally certification with the results filed as as-built documentation. Buying and racking equipment before checking circuit and cooling capacity is the sequence error that produces the over-subscribed, overheating closet, and certifying before termination is simply impossible.');

-- ============================================================================
-- FLASHCARDS
-- ============================================================================

insert into flashcards (id, cert, domain, objective, deck, front, back) values

-- ---------------------------------------------------------------- 2.1 --------
('n-f-200','netplus',2,'2.1','core',
 'When a router has several candidate routes, in what order does it apply prefix length, administrative distance and metric?',
 'Longest prefix match first - the most specific route always wins regardless of source. Administrative distance only breaks ties between routes to the same prefix learned from different protocols. Metric is compared last, and only between routes from the same protocol.'),

('n-f-201','netplus',2,'2.1','core',
 'What does administrative distance measure, and what are the typical default values?',
 'It ranks how much a router trusts the source of a route; lower is more trusted. Typical defaults: directly connected 0, static 1, eBGP 20, EIGRP internal 90, OSPF 110, RIP 120, external EIGRP 170, iBGP 200, unusable 255.'),

('n-f-202','netplus',2,'2.1','core',
 'Why can a routing metric never be compared against an administrative distance?',
 'They answer different questions. Metric ranks paths within one protocol using that protocol''s own units (RIP hops, OSPF cost, EIGRP composite), so the numbers are not comparable across protocols. Administrative distance is the cross-protocol tiebreaker applied before any metric is considered.'),

('n-f-203','netplus',2,'2.1','core',
 'What metric does each of RIP, OSPF and EIGRP use to choose a path?',
 'RIP counts hops, with 15 as the maximum and 16 meaning unreachable. OSPF uses cost, derived inversely from interface bandwidth. EIGRP uses a composite metric built primarily from bandwidth and delay, and keeps feasible successors as pre-computed backup routes.'),

('n-f-204','netplus',2,'2.1','core',
 'What is the difference between an interior gateway protocol and an exterior gateway protocol?',
 'An IGP routes within one autonomous system and optimises for the fastest path - OSPF, EIGRP and RIP. An EGP routes between autonomous systems and optimises for policy and reachability rather than speed; BGP is the only EGP in practical use, and it carries the AS path to prevent loops.'),

('n-f-205','netplus',2,'2.1','acronym',
 'FHRP',
 'First Hop Redundancy Protocol. A family of protocols (HSRP, VRRP, GLBP) that lets two or more routers share one virtual IP and virtual MAC so hosts keep a single default gateway address that survives a router failure.'),

('n-f-206','netplus',2,'2.1','core',
 'How does an FHRP keep hosts reachable when their default-gateway router fails?',
 'The routers negotiate an active/master owner of a shared virtual IP and virtual MAC. Hosts ARP for that virtual address and never learn which physical router answers. If the active router stops sending hello messages, the standby takes ownership of the same virtual IP and MAC, so hosts need no reconfiguration and typically see only a brief pause.'),

('n-f-207','netplus',2,'2.1','core',
 'What is the difference between traffic shaping and traffic policing?',
 'Shaping buffers traffic that exceeds the target rate and releases it later, so bursts are smoothed at the cost of added latency and jitter but with little loss. Policing drops or re-marks the excess immediately with no buffering, so latency stays flat but loss appears. Shaping is typically applied outbound at the customer edge; policing is typically applied inbound by the provider.'),

('n-f-208','netplus',2,'2.1','core',
 'What do DSCP markings do in a QoS design?',
 'DSCP uses the six-bit differentiated services field in the IP header to classify each packet - for example EF for voice and the AF classes for prioritised data. Each hop then applies its configured per-hop behaviour (queue and drop priority) to that marking. Markings should be set as close to the source as possible and trusted end to end, since an unmarked or re-marked packet loses its priority.'),

('n-f-209','netplus',2,'2.1','core',
 'Why does a default route appear as 0.0.0.0/0, and when does a router actually use it?',
 'A /0 prefix has zero significant network bits, so it matches every destination. Because longest prefix match always prefers the most specific entry, the default route is the last one that can ever win - it is used only when nothing more specific exists, which is why it is called the gateway of last resort.'),

('n-f-210','netplus',2,'2.1','core',
 'What is a floating static route and what problem does it solve?',
 'A static route deliberately configured with an administrative distance higher than the dynamic protocol covering the same prefix - for example AD 130 against OSPF''s 110. It stays out of the routing table while the dynamic route exists and installs itself automatically if that route disappears, giving a backup path such as a broadband link behind a primary MPLS circuit.'),

('n-f-211','netplus',2,'2.1','core',
 'Why can an outside host not initiate a connection to a host sitting behind PAT without extra configuration?',
 'PAT builds its translation entries dynamically, and an entry only appears once an inside host sends traffic outbound. An unsolicited inbound packet arrives with no matching entry and nowhere to be sent, so it is dropped. Reaching an internal server requires a static translation - port forwarding or destination NAT - that maps a public IP and port to a fixed internal socket.'),

('n-f-212','netplus',2,'2.1','core',
 'What does convergence mean for a routing protocol, and which class converges faster?',
 'Convergence is the process of every router reaching a consistent, loop-free view of the topology after a change. Link-state protocols converge faster because a change triggers immediate LSA flooding and each router recalculates SPF locally. Distance-vector protocols wait on periodic updates and loop-prevention timers such as hold-down, split horizon and route poisoning, so they settle more slowly.'),

('n-f-213','netplus',2,'2.1','core',
 'How do bandwidth, latency and jitter each affect a VoIP call differently?',
 'Bandwidth determines how many concurrent calls fit; a single call needs relatively little. Latency is one-way delay and becomes conversationally awkward as it climbs, but a steady delay is tolerable. Jitter - variation in that delay - is the most damaging, because the jitter buffer must discard packets that arrive too late, producing dropouts even when average latency looks acceptable.'),

-- ---------------------------------------------------------------- 2.2 --------
('n-f-214','netplus',2,'2.2','acronym',
 'LACP',
 'Link Aggregation Control Protocol (IEEE 802.3ad/802.1AX). Negotiates the bundling of several physical links into one logical link for greater aggregate bandwidth and automatic failover, and verifies that both ends agree before any member is brought into the bundle.'),

('n-f-215','netplus',2,'2.2','acronym',
 'PoE',
 'Power over Ethernet. Delivers DC power to devices such as access points, IP phones and cameras over the same twisted-pair cabling that carries their data, removing the need for a local outlet at the device.'),

('n-f-216','netplus',2,'2.2','core',
 'What is the native VLAN on an 802.1Q trunk, and why does a mismatch matter?',
 'It is the one VLAN whose frames cross the trunk untagged. If the two ends of a trunk are configured with different native VLANs, untagged frames sent by one end are absorbed into a different VLAN by the other, merging two segments. The same untagged behaviour is what makes double-tagging VLAN hopping possible, which is why the native VLAN is usually changed away from VLAN 1 and left unused.'),

('n-f-217','netplus',2,'2.2','core',
 'What does the 802.1Q tag contain, and how does it change the frame?',
 'A four-byte field inserted after the source MAC address, carrying a TPID of 0x8100, a three-bit priority field (802.1p class of service), a drop-eligible bit, and a twelve-bit VLAN ID. Twelve bits allow 4094 usable VLAN IDs, since 0 and 4095 are reserved. The tag pushes the maximum standard frame from 1518 to 1522 bytes.'),

('n-f-218','netplus',2,'2.2','core',
 'What is the difference between an access port and a trunk port?',
 'An access port belongs to exactly one VLAN and sends and receives untagged frames, so the attached device is unaware VLANs exist. A trunk port carries many VLANs between switches, tagging each frame with its VLAN ID except for the native VLAN, and should be restricted with an allowed-VLAN list rather than left open to everything.'),

('n-f-219','netplus',2,'2.2','core',
 'How is the STP root bridge elected, and how do you control the outcome?',
 'Every switch advertises a bridge ID made of a two-byte priority followed by its MAC address, and the lowest bridge ID wins. Default priority is 32768, so with untouched defaults the oldest switch - the one with the lowest MAC - becomes root, which is rarely where you want it. Lower the priority (in steps of 4096) on the intended core switch to make the election deterministic.'),

('n-f-220','netplus',2,'2.2','core',
 'What does RSTP improve over classic 802.1D spanning tree?',
 'RSTP (802.1w) converges in under a second instead of the 30 to 50 seconds 802.1D needs. It reduces five port states to three (discarding, learning, forwarding), adds alternate and backup port roles that are pre-computed standby paths, uses a proposal/agreement handshake on point-to-point links instead of waiting on timers, and lets edge ports go straight to forwarding.'),

('n-f-221','netplus',2,'2.2','core',
 'What must match on every member interface of an LACP bundle?',
 'Speed, duplex, and VLAN configuration - the same access VLAN, or the same trunk mode with the same allowed VLAN list and native VLAN. LACP modes must also be compatible, with at least one side active. A mismatch on any of these leaves the member suspended outside the bundle, which commonly shows up as an aggregate delivering only a fraction of its expected capacity.'),

('n-f-222','netplus',2,'2.2','core',
 'Why does a single file transfer over a 4 x 1 Gbps LACP bundle not reach 4 Gbps?',
 'Load balancing is per flow, not per frame. The switch hashes fields such as source and destination MAC, IP or port to pick one member link for each conversation, so a single flow is pinned to a single 1 Gbps member. Aggregation raises total throughput across many conversations and provides failover; it does not accelerate any one of them.'),

('n-f-223','netplus',2,'2.2','core',
 'What is port mirroring used for, and what is its main limitation?',
 'It copies frames from a source port or VLAN to a monitor port so an IDS, packet analyser or recorder can see traffic without sitting in the forwarding path. The limitation is oversubscription: mirroring several busy gigabit sources onto one gigabit monitor port means frames are dropped from the copy, so the capture is incomplete exactly when the network is busiest. RSPAN extends mirroring across switches via a dedicated VLAN.'),

('n-f-224','netplus',2,'2.2','core',
 'What is a jumbo frame, and what must be true for one to work end to end?',
 'A frame with a payload larger than the standard 1500-byte MTU, commonly configured at 9000 bytes to reduce per-frame overhead on storage and backup networks. Every host NIC, switch port and router interface along the path must be configured for the larger MTU, because Ethernet has no layer 2 fragmentation - one 1500-byte hop silently discards the oversized frames, producing stalls rather than a clean failure.'),

('n-f-225','netplus',2,'2.2','core',
 'What is a PoE power budget, and how do you plan a deployment against it?',
 'The total wattage the switch power supplies can deliver across all ports simultaneously, which is a chassis figure and not a per-port one. Plan using the source-side allocation for each device - about 15.4 W for 802.3af, 30 W for 802.3at, and up to roughly 60 W or 90 W for 802.3bt Types 3 and 4 - and leave headroom. When demand exceeds the budget the switch grants power by port priority and leaves the remaining ports unpowered.'),

-- ---------------------------------------------------------------- 2.3 --------
('n-f-226','netplus',2,'2.3','core',
 'What do OFDMA, MU-MIMO and BSS colouring contribute to Wi-Fi 6?',
 'OFDMA splits a channel into resource units so one transmission can serve several clients at once, which suits the many small frames typical of dense environments. MU-MIMO sends to and receives from multiple clients simultaneously using separate spatial streams. BSS colouring tags frames with a cell identifier so a radio can ignore transmissions from an overlapping cell instead of deferring to them. Together they raise efficiency, not just peak rate.'),

('n-f-227','netplus',2,'2.3','core',
 'Which frequency bands does each major 802.11 generation use?',
 '802.11a: 5 GHz. 802.11b and 802.11g: 2.4 GHz. 802.11n (Wi-Fi 4): both 2.4 and 5 GHz, and the first with MIMO. 802.11ac (Wi-Fi 5): 5 GHz only. 802.11ax (Wi-Fi 6): both 2.4 and 5 GHz, with Wi-Fi 6E extending the same standard into 6 GHz.'),

('n-f-228','netplus',2,'2.3','core',
 'Why does 2.4 GHz reach further through walls than 5 GHz, and what does that cost?',
 'Lower frequencies have longer wavelengths and are absorbed less by building materials, so a 2.4 GHz cell covers more area for the same power. The cost is spectrum: only three non-overlapping 20 MHz channels exist, and the band is shared with Bluetooth, microwave ovens, cordless phones and wireless cameras, so throughput and reliability suffer wherever client density is high.'),

('n-f-229','netplus',2,'2.3','core',
 'What is the trade-off when 20 MHz channels are bonded into 40, 80 or 160 MHz?',
 'Each doubling of width roughly doubles a single client''s peak rate but halves the number of non-overlapping channels available and raises the noise floor. In a dense deployment with many access points, wide channels force neighbouring cells onto the same frequencies and airtime contention outweighs the rate gain - which is why high-density designs usually stay at 20 or 40 MHz and reserve 80 MHz or more for sparse, high-throughput areas.'),

('n-f-230','netplus',2,'2.3','core',
 'What is the difference between an SSID, a BSSID and an ESSID?',
 'The SSID is the human-readable network name advertised in beacon frames. The BSSID is the MAC address of one access point radio, identifying a single basic service set - each radio and often each SSID on that radio has its own. The ESSID is that same network name shared by all the access points forming one extended service set, which is what lets a client roam between them without changing networks.'),

('n-f-231','netplus',2,'2.3','core',
 'When should a directional antenna be used instead of an omnidirectional one?',
 'Use a directional antenna - Yagi, parabolic grid or patch - for point-to-point building-to-building bridges, long corridors, and coverage aimed from one end of a space or from an outside wall inwards. Its gain comes from narrowing the beam, so aiming matters. Use an omnidirectional dipole when the access point sits in the middle of the area it serves and coverage is needed in every horizontal direction.'),

('n-f-232','netplus',2,'2.3','core',
 'What are the three types of wireless site survey?',
 'Predictive, modelled in software from floor plans and wall material attenuation before any hardware exists. Passive, walking the site listening to existing signals without associating, which maps coverage and interference. Active, associated to the network so real throughput, retries and roaming behaviour are measured. Predictive designs are validated by a post-installation passive or active survey.'),

('n-f-233','netplus',2,'2.3','core',
 'What does a wireless heat map show, and what decisions does it drive?',
 'A colour-coded overlay on a floor plan showing measured or predicted signal strength, signal-to-noise ratio, and often data rate or channel utilisation. It drives access point placement, mounting height and orientation, channel assignment for reuse, transmit power levels, and identification of coverage holes and areas of excessive cell overlap before users find them.'),

('n-f-234','netplus',2,'2.3','core',
 'What is DFS, and why do some wireless clients avoid DFS channels?',
 'Dynamic Frequency Selection applies to the 5 GHz channels shared with weather and military radar. An access point must monitor for radar and, on detection, vacate the channel immediately and stay off it for a set period, which interrupts associated clients. Some client devices do not support DFS channels at all, so using them can leave those clients unable to see the network even where coverage is good.'),

('n-f-235','netplus',2,'2.3','core',
 'What is EIRP, and why does antenna gain matter for regulatory compliance?',
 'Effective isotropic radiated power is what actually leaves the antenna: transmit power in dBm plus antenna gain in dBi minus cable and connector loss. Regulators cap EIRP per band and channel, not the radio''s output alone, so fitting a higher-gain antenna to a compliant radio can push an installation over the limit. The remedy is to reduce transmit power to offset the added gain.'),

('n-f-236','netplus',2,'2.3','core',
 'How should a guest wireless network be designed?',
 'Give it its own SSID mapped to a dedicated VLAN with no route into internal subnets, enable client isolation so guests cannot see each other, put a captive portal in front of internet access for terms acceptance or credentials, apply rate limiting per client, and scope its own DHCP and DNS. Treat the guest VLAN as untrusted and firewall it as if it were the internet.'),

('n-f-237','netplus',2,'2.3','core',
 'What is a captive portal, and what is its main security limitation?',
 'A gateway that holds a newly associated client in a walled garden and redirects its first web request to an authentication or terms-of-use page before allowing wider access. Its limitation is that the wireless link itself is normally open and unencrypted, so it controls access without protecting traffic over the air - users still depend on HTTPS or a VPN for confidentiality.'),

('n-f-238','netplus',2,'2.3','core',
 'What is band steering, and what problem does it address?',
 'A feature where the access point encourages dual-band-capable clients onto 5 GHz - typically by delaying or withholding probe responses on 2.4 GHz - so the crowded 2.4 GHz band is left for legacy and distant devices. It addresses the tendency of clients to associate on 2.4 GHz simply because that signal appears stronger, even when a much faster 5 GHz cell is available.'),

('n-f-239','netplus',2,'2.3','core',
 'What does WPA3-Personal change compared with WPA2-Personal?',
 'WPA3-Personal replaces the WPA2 pre-shared key handshake with SAE (Simultaneous Authentication of Equals). An attacker who captures the exchange cannot run an offline dictionary attack against it, so even a weak passphrase is not trivially cracked afterwards, and each session gains forward secrecy so a later key compromise does not expose recorded traffic.'),

('n-f-240','netplus',2,'2.3','core',
 'Why does a wireless client sometimes stay attached to a distant access point with a poor signal?',
 'Because the roaming decision belongs to the client, not to the network. A client holds its association until its own signal threshold is crossed, so it can drag a weak connection well into the next cell - the sticky client problem. Mitigations are proper cell sizing with reduced transmit power, avoiding excessive overlap, and enabling the 802.11k, 802.11v and 802.11r assisted-roaming features where clients support them.'),

-- ---------------------------------------------------------------- 2.4 --------
('n-f-241','netplus',2,'2.4','acronym',
 'MDF',
 'Main Distribution Frame. The building''s primary termination point, where the service provider demarcation, the core switching equipment and the backbone cabling to every IDF all come together.'),

('n-f-242','netplus',2,'2.4','acronym',
 'IDF',
 'Intermediate Distribution Frame. A floor or zone wiring closet fed from the MDF by backbone cabling, from which horizontal cabling runs out to the work areas it serves.'),

('n-f-243','netplus',2,'2.4','acronym',
 'PDU',
 'Power Distribution Unit. Distributes an incoming feed to the outlets in a rack; metered models report actual current draw so you can see remaining circuit headroom, and switched models allow remote power cycling of an individual outlet.'),

('n-f-244','netplus',2,'2.4','acronym',
 'UPS',
 'Uninterruptible Power Supply. Supplies battery power during utility sags and outages and conditions the incoming supply, keeping equipment up long enough for a generator to start or for an orderly shutdown.'),

('n-f-245','netplus',2,'2.4','core',
 'How do the MDF and IDF relate, and which cabling connects them?',
 'The MDF is the single main termination point per building; each IDF serves one floor or zone. Backbone or vertical cabling - usually fibre - runs from the MDF to each IDF. Horizontal cabling runs from the IDF patch panel out to work-area outlets, and under the structured cabling standard that permanent link is limited to 90 m, leaving 10 m for patch cords at both ends within the 100 m channel.'),

('n-f-246','netplus',2,'2.4','core',
 'What does a rack unit measure, and what other rack dimensions must be checked?',
 'A rack unit (U) is 1.75 inches or 44.45 mm of vertical mounting height, in the standard 19-inch EIA mounting width; a full-height cabinet is typically 42U. Height in U is only one constraint - you must independently check usable depth (a shallow wall-mount cabinet will not take a deep server), static and dynamic weight capacity, and clearance for doors, cable managers and airflow.'),

('n-f-247','netplus',2,'2.4','core',
 'What is the difference between a UPS and a PDU?',
 'A UPS stores energy in batteries and supplies the load when the utility feed sags or fails; it is the only one of the two that provides ride-through. A PDU simply distributes an incoming feed to the outlets in the rack, adding monitoring or remote switching in its metered and switched variants. A typical rack uses both: the UPS feeds the PDU, and the PDU feeds the equipment.'),

('n-f-248','netplus',2,'2.4','core',
 'What is the difference between a basic, metered and switched PDU?',
 'A basic PDU is outlets only. A metered PDU reports the current or power actually being drawn, either on a local display or over the network, which is what tells you how much circuit headroom is left before you add equipment. A switched PDU adds remote control of individual outlets, so a hung device can be power cycled without a site visit.'),

('n-f-249','netplus',2,'2.4','core',
 'How do you calculate the safe continuous load for a 20 A, 120 V branch circuit?',
 'Nameplate capacity is 20 x 120 = 2,400 VA. Continuous load - anything running three hours or more, which describes nearly all network equipment - should be limited to 80 percent of the circuit rating, giving 1,920 W or 16 A. Sum the actual measured draw rather than nameplate ratings where possible, and leave further headroom for start-up inrush and future growth.'),

('n-f-250','netplus',2,'2.4','core',
 'What are the three main UPS topologies, and where is each appropriate?',
 'Standby (offline) runs the load from utility and switches to inverter on failure, cheapest with a brief transfer time - suitable for workstations. Line-interactive adds automatic voltage regulation that corrects sags and swells without touching the battery, the usual choice for network closets. Double-conversion (online) always feeds the load from the inverter, so there is no transfer time and the output is fully conditioned - used for core and data-centre equipment.'),

('n-f-251','netplus',2,'2.4','core',
 'What is the purpose of a hot aisle/cold aisle layout?',
 'Racks are arranged in rows that alternate front-to-front and back-to-back so all equipment intakes face one cold aisle and all exhausts face one hot aisle. This keeps hot exhaust from being drawn back into an intake, lets cooling units receive genuinely hot return air (which makes them more efficient), and allows cold supply to be directed only where it is needed. Containment doors or roofs over an aisle tighten the separation further.'),

('n-f-252','netplus',2,'2.4','core',
 'What do blanking panels do, and why do they matter?',
 'They fill unused rack units so cold supply air cannot pass straight through the empty space in the front of the rack and out the back. Without them cold air bypasses the equipment and hot exhaust recirculates around to the intakes, raising inlet temperatures by several degrees. They are among the cheapest and most effective airflow fixes available in an existing room.'),

('n-f-253','netplus',2,'2.4','core',
 'Which environmental conditions should be monitored in an equipment room, and why each?',
 'Temperature, because heat shortens component life and drives thermal shutdown. Humidity, because air that is too dry invites electrostatic discharge while air that is too humid brings condensation and corrosion. Airflow or differential pressure, to catch blocked or failed cooling. Water and leak detection under raised floors and near cooling units, and smoke detection. Sensors should alert at a warning threshold below the point at which equipment fails.'),

('n-f-254','netplus',2,'2.4','core',
 'Why are permanent cable runs terminated on a patch panel?',
 'Because the run inside the wall or ceiling should be terminated once and never disturbed again. All plugging, unplugging and flexing then happens on short, cheap patch cords at the front of the panel, which protects the permanent link from wear and repeated re-termination. The panel also gives every run a fixed, numbered, documentable endpoint that a port map and labelling scheme can reference.'),

('n-f-255','netplus',2,'2.4','core',
 'What are the first things to check when a newly installed fibre link will not come up?',
 'Transmit/receive polarity, since one end''s TX must reach the other end''s RX - a reversed pair is the single most common new-install fault. Then end-face contamination, which should be inspected and cleaned rather than assumed clean. Then fibre type mismatch (single-mode patch cord on a multimode run or vice versa), transceiver wavelength and type mismatch between the two ends, and any bend that violates the minimum radius.'),

('n-f-256','netplus',2,'2.4','core',
 'What does properly documenting a structured cabling plant involve?',
 'A unique identifier on both ends of every run, matching the patch panel port and the wall outlet, using a consistent scheme such as building-floor-closet-panel-port. A cable and port map recording each run''s origin, destination and purpose, kept current through change control rather than rewritten at audit time. Rack elevation diagrams showing what occupies which rack units, plus the certification test results filed as as-built documentation.'),

('n-f-257','netplus',2,'2.4','core',
 'Why does bend radius matter for both copper and fibre?',
 'On twisted pair, bending too tightly or crushing the jacket with over-tightened ties deforms the pair twist and conductor spacing, degrading near-end crosstalk and return loss - the link may pass traffic while failing certification and producing intermittent errors. On fibre, a bend tighter than the minimum causes macrobending loss as light escapes the core, raising attenuation and sometimes taking the link down entirely. Follow the manufacturer''s stated minimum in both cases.'),

('n-f-258','netplus',2,'2.4','core',
 'When would you choose a two-post relay rack, a four-post cabinet, or a wall-mount bracket?',
 'A two-post open relay rack is cheap and gives all-round access, suited to patch panels and shallow switches in a wiring closet, but offers no doors, security or airflow containment. A four-post enclosed cabinet supports deep, heavy equipment such as servers and UPS units, and its doors allow locking and front-to-back airflow containment. A wall-mount bracket or cabinet suits a small IDF with no floor space, but is limited in depth and weight capacity - check both before specifying equipment for it.');
