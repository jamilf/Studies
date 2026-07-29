-- Network+ (N10-009) Domain 1 (Networking Concepts) expansion, part B.
-- Tops up objectives 1.5, 1.6, 1.7 and 1.8 to 33 items each.
--   questions:   n-q-500 .. n-q-546  (47 items)
--   flashcards:  n-f-500 .. n-f-557  (58 items)
-- Objective split: 1.5 = 13q/16f, 1.6 = 12q/15f, 1.7 = 10q/12f, 1.8 = 12q/15f.

-- ============================================================================
-- QUESTIONS
-- ============================================================================

insert into public.questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ---------------------------------------------------------------- 1.5 --------
('n-q-500','netplus',1,'1.5','mcq',2,
 $q$A 70 m horizontal run has to carry 10GBASE-T to a workstation. The installer has a reel of Cat6 on the van and a reel of Cat6a in the warehouse. What is the correct assessment?$q$,
 $q$["Cat6 is fine, because Cat6 and Cat6a are both rated for 10 Gbps over the full 100 m channel","Cat6 carries 10 Gbps only to roughly 55 m, so a 70 m 10GBASE-T run needs the Cat6a","No twisted pair supports 10 Gbps at any length, so the run must be fibre","Cat5e should be used instead, because its thinner conductors generate less crosstalk than Cat6"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Cat6 is a 1 Gbps/100 m cable that will also do 10 Gbps, but only over a shortened channel of roughly 55 m, because alien crosstalk between adjacent unshielded pairs becomes the limit. Cat6a was designed specifically to hold 10 Gbps across the full 100 m. The claim that Cat6 and Cat6a are equivalent at 10 Gbps is the trap: both cables are 10G-capable on paper, and the difference the exam wants is the distance at which that rating holds. Twisted pair certainly does support 10 Gbps, so jumping to fibre for a 70 m office run is unnecessary cost.$q$),

('n-q-501','netplus',1,'1.5','mcq',2,
 $q$Two sites 12 km apart must be joined with a single fibre link. Why is single-mode the only workable choice?$q$,
 $q$["Its roughly 9 micron core admits essentially one light path, so the pulse does not smear the way it does when a wide multimode core carries many paths of differing length","Its larger core collects more light from the transmitter, which is what carries the signal further","It carries a small DC current alongside the light that regenerates the signal along the run","It is always armoured, so it can be buried between sites where multimode cannot"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Single-mode fibre has a very narrow core (about 8 to 10 microns) that supports one propagation mode, so there is no modal dispersion and, paired with 1310 nm or 1550 nm laser optics, it reaches tens of kilometres. The answer claiming a larger core is the tempting one because it sounds like more light equals more distance, but the larger core belongs to multimode (50 or 62.5 microns) and is exactly what causes the pulse spreading that limits multimode to hundreds of metres. Fibre carries no electrical current at all, and armouring is a jacket option available for either fibre type.$q$),

('n-q-502','netplus',1,'1.5','mcq',2,
 $q$A data centre standardises on OM4 multimode for its in-row and in-rack links, even though single-mode would reach far further. What is the usual justification?$q$,
 $q$["Multimode glass is immune to bend loss, so it can be routed tightly inside a cabinet","Single-mode cannot operate at 100 Gbps","Multimode optics cost noticeably less than long-reach single-mode optics, and in-row runs sit well inside multimode reach","Only multimode can be terminated with LC connectors"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$The choice is economic, not technical: at the tens-of-metres distances found inside a row, multimode is comfortably within its limit, and the 850 nm VCSEL optics it uses are cheaper per port than the precision lasers long-reach single-mode needs. Buy reach only where reach is needed. The claim that single-mode cannot run at 100 Gbps is the most seductive distractor and is simply false - single-mode carries the highest rates and the longest distances. Bend loss is a property of the cable construction rather than of multimode versus single-mode, and LC connectors are used on both fibre types.$q$),

('n-q-503','netplus',1,'1.5','matching',2,
 $q$Match each transmission medium or cable assembly to the deployment it is the natural choice for.$q$,
 $q${"left":["Single-mode fibre with 1310 nm optics","A direct attach copper (twinax) assembly","Cat6a unshielded twisted pair","An MPO/MTP trunk cable"],"right":["A 2 m top-of-rack switch to server connection","A 90 m horizontal run feeding a 10GBASE-T workstation","A 12 km link between two sites","A 40G or 100G parallel-optics link carrying 8 or 12 fibres in one ferrule"]}$q$::jsonb,
 $q$[2,0,1,3]$q$::jsonb,
 $q$Single-mode plus long-reach optics is the only one of the four that spans kilometres. DAC twinax is a fixed-length assembly with the transceiver ends moulded on, sold in 1 to 7 m lengths for switch-to-server hops inside a rack. Cat6a is the copper answer for a 10 Gbps horizontal run out to 100 m. MPO/MTP gathers 8, 12 or 24 strands into a single ferrule, which is how parallel 40G and 100G optics and data centre trunks are cabled. The pairing people get wrong is DAC against Cat6a: both are copper, but DAC is a metres-long pre-terminated assembly that plugs into transceiver cages, not a structured cabling run to a wall plate.$q$),

('n-q-504','netplus',1,'1.5','mcq',1,
 $q$Which fibre connector is a small-form-factor latching type, normally supplied as a duplex clipped pair, and is what an SFP or SFP+ module accepts?$q$,
 $q$["ST","SC","MPO","LC"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$LC (lucent connector) is the small-form-factor connector with a plastic latch like an RJ45 tab; its small footprint is why two of them fit on the face of an SFP module. SC is the connector most often confused with it: SC is also a common push-pull square connector but is roughly twice the size, so it appears on patch panels and older 1G gear rather than on SFP cages. ST is the older round bayonet twist-lock type, and MPO is the multi-fibre ribbon connector used for parallel optics.$q$),

('n-q-505','netplus',1,'1.5','mcq',1,
 $q$What is an MPO/MTP connector used for?$q$,
 $q$["Terminating a single fibre strand for a 1 Gbps uplink","Carrying 8, 12 or 24 fibres in a single ferrule, which is how parallel 40G and 100G optics and data centre trunks are cabled","Joining copper twisted pair to coaxial cable","Screwing a fibre into place with a threaded barrel so it survives vibration"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$MPO (multi-fibre push-on, sold by one vendor as MTP) puts many fibres into one rectangular ferrule so a single plug can serve a parallel optic that transmits across several lanes at once, and so a trunk can be pre-terminated in the factory. Single-strand termination is what LC, SC and ST do, and describing MPO that way is the common error - the whole point of MPO is that it is not one strand. The threaded barrel description is FC, a screw-on connector for high-vibration environments.$q$),

('n-q-506','netplus',1,'1.5','mcq',2,
 $q$Which transceiver form factor is used for a 100 Gbps switch port?$q$,
 $q$["SFP","SFP+","QSFP28","GBIC"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$QSFP28 is the quad small form-factor pluggable variant that carries four 25 Gbps lanes for 100 Gbps total. SFP+ is the distractor most people reach for because it is the modern-looking one, but SFP+ is a single-lane 10 Gbps module; plain SFP is 1 Gbps and GBIC is the older, physically larger 1 Gbps predecessor to SFP. The pattern worth memorising is that the Q prefix means quad lanes, which is where the step change in speed comes from.$q$),

('n-q-507','netplus',1,'1.5','multi',2,
 $q$Which TWO statements about a direct attach copper (DAC) cable are correct? (Choose two.)$q$,
 $q$["The transceiver ends are permanently attached to the cable, so no separate optic is purchased","It is intended for very short runs, typically within a rack or to an adjacent rack","It reaches the same 100 m as Cat6a, because it is also copper","It converts the electrical signal to single-mode fibre for long-haul links","It requires an MPO connector at each end"]$q$::jsonb,
 $q$[0,1]$q$::jsonb,
 $q$A DAC is a shielded twinaxial cable with the transceiver bodies moulded onto both ends and sold as one assembly, which is why it is cheaper and lower-power than buying two optics plus a patch lead. Because it is passive copper at multi-gigabit rates, usable lengths are only a few metres, which confines it to intra-rack and rack-to-adjacent-rack use. The 100 m claim is the trap: 100 m is the structured-cabling limit for twisted pair running Ethernet, and it does not transfer to a twinax assembly running 10G, 25G or 100G. DACs contain no fibre and no MPO ferrule.$q$),

('n-q-508','netplus',1,'1.5','mcq',3,
 $q$Why does multimode fibre lose usable distance as the data rate rises?$q$,
 $q$["The wide core lets light take several paths of slightly different length, so each pulse arrives spread out in time; at higher bit rates that spread overlaps the following pulse","Copper shielding inside the cable heats up and attenuates the signal at higher rates","The transmitter must move to a longer wavelength that the glass absorbs more strongly","The connector ferrule cannot mechanically switch fast enough at high bit rates"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$This is modal dispersion. A 50 micron core supports many propagation modes, and light taking a shallow zig-zag arrives slightly later than light going straight down the axis, so a sharp pulse leaves the transmitter and arrives smeared. Faster signalling means pulses sit closer together, so the same amount of smear starts to blur one pulse into the next, and the tolerable distance falls. That is why OM3 and OM4 are rated to different distances at 10 Gbps than at 40 or 100 Gbps. The wavelength-absorption answer confuses modal dispersion with attenuation, which is a separate loss mechanism that does not depend on bit rate, and fibre contains no copper shielding to heat up.$q$),

('n-q-509','netplus',1,'1.5','mcq',1,
 $q$A telemetry radio can transmit in one direction only and has no return path at all. Which term describes this?$q$,
 $q$["Full duplex","Half duplex","Simplex","Multiplexed"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$Simplex means communication flows one way only, with no reverse channel - a broadcast transmitter or a one-way sensor feed. Half duplex is the tempting answer because it also involves a restriction, but half duplex does allow both directions; it simply forbids them at the same instant, which is how a legacy hub segment or a walkie-talkie works. Full duplex allows both directions simultaneously, as a modern switched Ethernet port does. Multiplexing is about combining several signals onto one medium and is unrelated to directionality.$q$),

('n-q-510','netplus',1,'1.5','multi',3,
 $q$A 300 m link is needed between two buildings on opposite sides of a car park. Which TWO are valid technical reasons to choose fibre over copper? (Choose two.)$q$,
 $q$["Twisted-pair Ethernet is limited to a 100 m channel, so 300 m is out of reach for copper","Glass carries no current, so the link is immune to electromagnetic interference and introduces no electrical bond between the two buildings","Fibre transceivers cost less than the RJ45 ports already built into the switches","Fibre can deliver Power over Ethernet to cameras at the far end","Fibre is easier to terminate in the field than twisted pair"]$q$::jsonb,
 $q$[0,1]$q$::jsonb,
 $q$Distance settles it on its own: the 100 m limit for balanced twisted pair is a channel limit, not a suggestion, and 300 m is triple it. The second reason matters specifically for a building-to-building run - copper entering two structures on different electrical services can carry induced surge and creates a ground potential difference between them, whereas glass is a dielectric and breaks that path entirely. The PoE answer is the most plausible-sounding wrong one: PoE rides on the copper conductors of twisted pair, and fibre has none, so a fibre-fed remote device needs local power or a media converter with its own supply. Fibre optics are more expensive than built-in copper ports and field termination of fibre is harder, not easier.$q$),

('n-q-511','netplus',1,'1.5','ordering',2,
 $q$Order these four links by the maximum distance they support, shortest first.$q$,
 $q$["Cat6a unshielded twisted pair running 10GBASE-T","Single-mode fibre with long-reach optics","A direct attach copper (twinax) assembly","OM4 multimode fibre at 10 Gbps"]$q$::jsonb,
 $q$[2,0,3,1]$q$::jsonb,
 $q$A DAC assembly is measured in single-digit metres. Cat6a holds 10GBASE-T across the standard 100 m channel. OM4 multimode carries 10 Gbps to roughly 400 m, which is why it wins campus-riser and in-building backbone work but not inter-site work. Single-mode with long-reach optics runs to tens of kilometres. The reversal candidates are DAC against Cat6a - both are copper, and it is easy to assume the purpose-built data centre cable goes further, when in fact it is by far the shortest of the four.$q$),

('n-q-512','netplus',1,'1.5','mcq',3,
 $q$New cable must be pulled through the return-air space above a suspended ceiling. Which jacket rating applies, and why?$q$,
 $q$["Riser-rated, because the run is horizontal rather than vertical","Plenum-rated, because its low-smoke fluoropolymer jacket limits the toxic fumes released if it burns in a space that feeds breathing air","Direct-burial rated, because of condensation in the ceiling void","Any jacket is acceptable provided the cable is Cat6a or better"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$A plenum is any space used to move conditioned air, and the void above a drop ceiling frequently is one. Cable there must have a plenum-rated (CMP) jacket, because ordinary PVC jacketing produces dense toxic smoke that the air handling would then distribute through the building. Riser-rated (CMR) is the near-miss: it is a genuine fire rating, but it is the lesser one, intended for vertical shafts between floors, and it does not satisfy a plenum requirement. The category rating (Cat6a and so on) describes electrical performance and says nothing about fire behaviour, so the two are specified independently.$q$),

-- ---------------------------------------------------------------- 1.6 --------
('n-q-513','netplus',1,'1.6','mcq',1,
 $q$Which statement correctly describes a spine-and-leaf fabric?$q$,
 $q$["The spine switches are cabled to one another in a ring, and leaves hang off that ring","Servers attach to the spine switches, while the leaf switches carry only uplinks","Every leaf connects to every spine, and leaf switches are never cabled to each other","Each leaf connects to exactly one spine, so that no loop can form"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$The defining rule is full leaf-to-spine meshing with no leaf-to-leaf and no spine-to-spine links. That is what makes every server exactly two switch hops from every other server. The answer stating that each leaf connects to a single spine is the one that catches people, because avoiding loops sounds like sound switching practice - but a fabric deliberately uses all the parallel paths, relying on ECMP routing rather than on blocking them the way spanning tree would. Servers and storage attach to leaves, never to spines.$q$),

('n-q-514','netplus',1,'1.6','mcq',2,
 $q$A virtualisation team needs consistent latency between any two virtual machines regardless of which physical host the scheduler places them on. Why does a spine-and-leaf fabric serve this better than a traditional three-tier design?$q$,
 $q$["Every server is the same number of hops from every other server, so east-west latency does not depend on placement","It uses fewer cables and switches than a three-tier design","It removes the need for any routing protocol inside the data centre","It converts all east-west traffic into north-south traffic, which is easier to police"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$In a fabric, leaf to spine to leaf is the path between any two racks, so the hop count and therefore the latency budget is uniform and predictable. In a three-tier tree, two servers under the same access switch are close while two servers in different distribution blocks have to climb to the core and back down, so performance depends on where a VM happens to land. The cabling answer is exactly backwards and is the most common misconception: full leaf-to-spine meshing consumes more cable and more switch ports than a tree, and that extra cost is what buys the predictability.$q$),

('n-q-515','netplus',1,'1.6','mcq',2,
 $q$A nightly job replicates data between two storage arrays that sit in different racks in the same data centre. How is this traffic classified, and why does the classification matter?$q$,
 $q$["North-south, because it crosses between racks","East-west, because it stays between systems inside the data centre; fabrics are sized for this because it now dominates the traffic mix","North-south, because it is scheduled rather than interactive","East-west, because it is encrypted"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$East-west means server-to-server traffic that stays inside the data centre, and virtualisation, clustering, replication and microservices have made it the majority of data centre traffic - which is precisely why spine-and-leaf displaced the old tree. North-south is the tempting label here because the flow leaves one rack: but north-south specifically means traffic entering or leaving the data centre, such as a customer browser reaching the web tier or a server calling an external API. Direction is about the boundary crossed, not about rack numbers, scheduling or encryption.$q$),

('n-q-516','netplus',1,'1.6','mcq',2,
 $q$A 400-user organisation occupies one four-storey building. Each floor has a wiring closet feeding a pair of switches in the basement, and there is no second site. Which architecture is the appropriate fit?$q$,
 $q$["A full three-tier core, distribution and access design, for consistency with best practice","A collapsed core, where the distribution and core functions live on the same pair of switches","A spine-and-leaf fabric sized for future growth","A hub-and-spoke topology with each floor as a spoke to a hub router"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$A collapsed core merges the distribution and core layers into one pair of devices, which is the standard answer for a single building or single campus block: fewer chassis, fewer hops, lower cost, and the design still keeps a clean access layer beneath it. The full three-tier answer is defensible-sounding, and that is what makes it the trap - a dedicated core layer exists to aggregate multiple distribution blocks, and with only one block the core would be aggregating a single connection, spending money and adding a hop for nothing. Spine-and-leaf is a data centre answer aimed at east-west server traffic, not at floors of end users.$q$),

('n-q-517','netplus',1,'1.6','mcq',2,
 $q$In a three-tier hierarchical design, at which layer are inter-VLAN routing and access control lists normally applied?$q$,
 $q$["The access layer","The distribution (aggregation) layer","The core layer","They are applied identically at all three layers"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$The distribution layer is the policy layer: it aggregates access switches, provides the default gateway for the user VLANs, routes between them, and enforces filtering and route summarisation. The core is the distractor worth understanding - the core is deliberately kept lean and is optimised for forwarding as fast as possible, so loading it with ACL processing works against its whole reason for existing. The access layer handles port-level functions such as PoE, port security and VLAN assignment, not inter-VLAN routing.$q$),

('n-q-518','netplus',1,'1.6','mcq',2,
 $q$A retailer connects 40 stores back to one head office in a hub-and-spoke WAN. What are the main operational consequences of that choice?$q$,
 $q$["Each store needs a circuit to every other store, so circuit count grows quickly","Store-to-store traffic must transit the head office, adding a hop of latency, and the hub is a single point of failure for every store","Stores cannot use a routing protocol, because the topology has no redundant paths","The design prevents the head office from reaching more than one store at a time"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Hub-and-spoke is cheap and simple - one circuit per site, and adding a site adds one link - but everything is bought at the hub. Traffic between two spokes is hairpinned through the centre, which hurts latency-sensitive flows such as voice between stores, and if the hub fails or its circuit drops, every spoke loses connectivity at once. The answer describing a circuit to every other store belongs to a full mesh, which is the opposite design and the one hub-and-spoke exists to avoid.$q$),

('n-q-519','netplus',1,'1.6','mcq',3,
 $q$A full mesh is proposed between six sites. How many links does that require?$q$,
 $q$["12","15","30","36"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$A full mesh needs n(n-1)/2 links, so 6 x 5 / 2 = 15. The value 30 is the classic error: n(n-1) counts each connection twice, once from each end, and a link between site A and site B is one circuit, not two. The value 36 is n squared, which additionally counts a link from each site to itself. Knowing the formula also shows why full mesh does not scale - at 10 sites it is 45 links, and at 20 it is 190.$q$),

('n-q-520','netplus',1,'1.6','multi',2,
 $q$An organisation replaces its full mesh WAN with a partial mesh. Which TWO outcomes should it expect? (Choose two.)$q$,
 $q$["Fewer circuits to buy and manage, because not every pair of sites is directly linked","Some site-to-site traffic will now take an extra hop through an intermediate site","Every site retains a direct path to every other site","The number of links grows faster as new sites are added","Broadcast traffic between sites is eliminated"]$q$::jsonb,
 $q$[0,1]$q$::jsonb,
 $q$Partial mesh is the pragmatic middle ground: you give direct links only to the pairs that need them, usually the high-volume or latency-sensitive ones, and let the remaining pairs reach each other indirectly. That cuts circuit count and cost, at the price of an extra hop and slightly more path-selection work for the routing protocol. The claim that every site keeps a direct path describes full mesh, which is what was just removed. Link growth slows rather than accelerates, and broadcast containment is a function of routed boundaries, not of how densely the sites are meshed.$q$),

('n-q-521','netplus',1,'1.6','mcq',1,
 $q$A utility needs a dedicated link between two rooftops 3 km apart, carrying traffic only between those two endpoints and nothing else. Which topology is this?$q$,
 $q$["Point to point","Star","Partial mesh","Spine and leaf"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A point-to-point topology is a single dedicated link between exactly two endpoints - a leased circuit, a fibre pair, or a licensed microwave shot between two rooftops. It is the simplest topology and the building block from which larger ones are assembled. The star answer is the reflex choice because star is the default LAN answer, but a star has a central device with three or more arms; two nodes joined by one link have no centre to speak of.$q$),

('n-q-522','netplus',1,'1.6','matching',2,
 $q$Match each topology to the requirement it is the best answer for.$q$,
 $q${"left":["Spine and leaf","Hub and spoke","Point to point","Full mesh"],"right":["Connect 30 branches to one headquarters with the fewest circuits, accepting that branch-to-branch traffic transits the hub","Give every pair of nodes a direct path, so no single link failure removes reachability between any two of them","Keep server-to-server latency uniform across a virtualised data centre by putting every leaf one hop from every spine","Provide one dedicated circuit between exactly two endpoints and no others"]}$q$::jsonb,
 $q$[2,0,3,1]$q$::jsonb,
 $q$Each topology is chosen for a different requirement: spine-and-leaf for predictable east-west latency, hub-and-spoke for minimum circuit count when one site is the natural centre, point-to-point for a dedicated two-endpoint link, and full mesh for maximum resilience when the cost of many links is acceptable. The pair most often swapped is hub-and-spoke against full mesh - both connect many sites, but hub-and-spoke optimises for cost with one link per site while full mesh optimises for survivability with n(n-1)/2 links.$q$),

('n-q-523','netplus',1,'1.6','multi',3,
 $q$Which TWO statements about the three-tier hierarchical model are correct? (Choose two.)$q$,
 $q$["The access layer is where end devices attach and where PoE, port security and VLAN assignment are applied","The core layer is optimised for fast uninterrupted forwarding and is normally kept free of heavy filtering and policy","The distribution layer connects end-user devices directly and provides their gateway on the same switchport they plug into","The core layer is where inter-VLAN routing and access control lists are normally applied","The model requires exactly three physical devices"]$q$::jsonb,
 $q$[0,1]$q$::jsonb,
 $q$The access layer is the user-facing edge, so port-level features live there. The core exists to move packets between distribution blocks as fast as possible, which is why policy is pushed down rather than loaded onto it. Placing inter-VLAN routing and ACLs at the core is the most attractive wrong answer because those functions genuinely are Layer 3 functions - they simply belong at the distribution layer, which is the model's designated policy tier. The layers are roles rather than a device count: a collapsed core implements the same model on fewer boxes.$q$),

('n-q-524','netplus',1,'1.6','mcq',3,
 $q$A spine-and-leaf fabric is running short of leaf-to-spine bandwidth as more servers are added to each rack. What is the standard way to relieve it?$q$,
 $q$["Cable the busiest leaf switches directly to one another so their traffic bypasses the spine","Add another spine switch and a uniform uplink from every leaf to it, which raises fabric bandwidth and lowers the oversubscription ratio","Add a second tier of leaf switches beneath the existing leaves","Move the highest-traffic servers onto the spine switches"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$A fabric scales horizontally: adding a spine adds one more uplink path from every leaf, so aggregate leaf-to-spine capacity rises and the ratio of access bandwidth to uplink bandwidth improves, without changing the hop count for anyone. Cabling leaves to each other is the tempting shortcut and is precisely what the architecture forbids - it creates paths of unequal length, so latency stops being uniform and the ECMP assumption that all paths are equivalent breaks. Servers never attach to spines, and stacking leaves in tiers reintroduces the variable hop count the fabric was built to remove.$q$),

-- ---------------------------------------------------------------- 1.7 --------
('n-q-525','netplus',1,'1.7','mcq',3,
 $q$A host is configured as 192.168.20.77/26. What are the network address and the broadcast address of its subnet?$q$,
 $q$["Network 192.168.20.0, broadcast 192.168.20.63","Network 192.168.20.72, broadcast 192.168.20.79","Network 192.168.20.64, broadcast 192.168.20.127","Network 192.168.20.64, broadcast 192.168.20.128"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$A /26 leaves 6 host bits, so subnets step in blocks of 64: .0, .64, .128 and .192. The host .77 falls in the .64 block, whose broadcast is one below the next boundary, .127. The option ending at .128 is the classic off-by-one: .128 is the network address of the following subnet, and it cannot also be the broadcast of this one. The option starting at .0 would be right for a host between .1 and .62 but not for .77.$q$),

('n-q-526','netplus',1,'1.7','mcq',2,
 $q$A single VLAN must accommodate 300 hosts. What is the smallest prefix that will hold them?$q$,
 $q$["/24","/23","/22","/25"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$A /23 provides 2^9 = 512 addresses, so 510 usable hosts - the smallest prefix that clears 300. A /24 is the trap because a /24 feels like the standard subnet, but it holds only 254 usable addresses and is 46 short. A /22 would work but wastes over 700 addresses. Work it as powers of two: 2^(32-prefix) - 2 must be at least the host count.$q$),

('n-q-527','netplus',1,'1.7','mcq',3,
 $q$An IP block of 172.16.8.0/21 has been delegated to a branch. Which address falls OUTSIDE that block?$q$,
 $q$["172.16.9.200","172.16.15.254","172.16.16.5","172.16.8.1"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$A /21 leaves 11 host bits, which is 3 bits in the third octet, so the block steps in eights: 172.16.0.0, 172.16.8.0, 172.16.16.0. The delegated range therefore runs 172.16.8.0 to 172.16.15.255, and 172.16.16.5 is the first address of the next block. The address 172.16.15.254 is the near-miss worth checking carefully - it looks like it might have spilled over, but .15 is the last third-octet value inside the range, so it is a perfectly valid host in this block.$q$),

('n-q-528','netplus',1,'1.7','mcq',1,
 $q$A workstation shows the address 169.254.18.44 with mask 255.255.0.0 and no default gateway. What does this most likely indicate?$q$,
 $q$["Someone assigned a static address by mistake","The DNS server is unreachable","The workstation could not obtain a DHCP lease and self-assigned an APIPA address","The workstation is using the loopback network"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$169.254.0.0/16 is the APIPA link-local range that a DHCP client assigns to itself when no server answers, and the absence of a gateway is the signature - APIPA supplies an address and mask only. Treat it as a diagnostic pointer to the DHCP path: a dead scope, an unplugged uplink, a failed relay or IP helper, or a switch port in the wrong VLAN. A static misconfiguration is the plausible-sounding alternative, but an administrator hand-typing an address would not choose the reserved 169.254 range, and the loopback network is 127.0.0.0/8, which is a different reservation entirely.$q$),

('n-q-529','netplus',1,'1.7','multi',2,
 $q$Two workstations on the same access switch both hold 169.254.x.x addresses. Which TWO statements are correct? (Choose two.)$q$,
 $q$["The two workstations can still exchange traffic with each other across that link","Neither can reach the default gateway or the internet, because APIPA supplies no gateway and no DNS server","169.254.0.0/16 is routable, so the hosts can reach other subnets normally","The addresses prove that both network adapters have failed","The addresses were handed out by the DHCP server from a fallback scope"]$q$::jsonb,
 $q$[0,1]$q$::jsonb,
 $q$APIPA is genuinely functional within one broadcast domain: two link-local hosts on the same segment can ping each other and even share files, which is why a user sometimes reports that "the network works" while nothing off-segment does. What APIPA cannot do is get them off the link, because it configures no gateway and no resolver. The routable claim is the one to reject firmly - 169.254.0.0/16 is link-local by definition and routers are required to drop it rather than forward it. Nothing here indicates hardware failure, and the addresses were self-assigned precisely because no DHCP server replied.$q$),

('n-q-530','netplus',1,'1.7','mcq',2,
 $q$Pinging 127.0.0.1 succeeds on a host that cannot reach its default gateway. What has that test actually proved?$q$,
 $q$["The network adapter hardware and its physical link are confirmed good","The default gateway is reachable at Layer 3","Name resolution is working","The local TCP/IP stack is installed and responding - the reply never leaves the host, so it says nothing about the cable, the switch port or the gateway"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$127.0.0.0/8 is the loopback reservation, and traffic to it is turned around inside the operating system's own stack. A successful loopback ping therefore rules out a broken or missing TCP/IP stack and nothing more. Concluding that the adapter is good is the standard overreach: the packet never reached the adapter, so a dead NIC, an unplugged patch lead or a disabled switch port would all still return a healthy loopback reply. The next useful step is to ping the host's own configured address, then the gateway.$q$),

('n-q-531','netplus',1,'1.7','mcq',3,
 $q$A design document lists 172.16.0.0/12 as the organisation's private range. Which statement correctly describes that block?$q$,
 $q$["It covers 12 consecutive /16 networks and therefore ends at 172.28.255.255","The /12 leaves four variable bits in the second octet, giving 16 consecutive /16 networks - 172.16.0.0 through 172.31.255.255","It covers the whole of 172.0.0.0 through 172.255.255.255","It runs to 172.32.255.255, because 172.32 is the last private network"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$The second octet holds bits 9 to 16; a /12 fixes the first four of them and leaves four free, so 2^4 = 16 values are in range, running 172.16 through 172.31. The answer that reads the 12 in /12 as a count of networks is the trap - the number in CIDR notation is a count of fixed bits, never a count of subnets - and it also gets the arithmetic wrong. Anything from 172.32.0.0 upward is public address space, which is exactly why 172.32.x addresses appear so often as distractors in private-range questions.$q$),

('n-q-532','netplus',1,'1.7','mcq',3,
 $q$A junior engineer objects to 10.1.1.0/26 being used on a small segment, arguing that 10.0.0.0 is a class A network and must therefore carry a 255.0.0.0 mask. What is the correct response?$q$,
 $q$["The objection holds: a class A network cannot be subnetted below /8","The objection holds: class A networks may be subnetted only as far as /16","Classful rules stopped governing mask length once CIDR was adopted, so any prefix may be used on a 10.x segment provided every device and every routing update carries the matching mask","The segment should be renumbered to 192.168.1.0/26, because only class C space may take a /26"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$Classful addressing implied the mask from the first octet, and CIDR replaced it: the prefix length is now carried explicitly in interface configuration and in routing updates, so 10.1.1.0/26 is a normal 62-host subnet carved out of a large private block. The renumbering answer is the seductive one because it keeps the old class-to-mask habit alive under a new name, but 192.168.1.0/26 is no more or less legal than 10.1.1.0/26 - the class of the leading octet has not constrained mask choice for decades. What genuinely matters is that every host, interface and route on that segment agrees on /26.$q$),

('n-q-533','netplus',1,'1.7','ordering',2,
 $q$Order these prefixes from the largest number of usable host addresses to the smallest.$q$,
 $q$["/29","/22","/26","/30"]$q$::jsonb,
 $q$[1,2,0,3]$q$::jsonb,
 $q$Apply 2^(32-prefix) - 2 to each: /22 gives 1022, /26 gives 62, /29 gives 6, /30 gives 2. The smaller the prefix number, the more host bits remain and the larger the subnet - which is the relationship that trips people up, because a bigger number after the slash means a smaller network. A /30 is the classic router-to-router subnet, and a /29 is the usual choice for a handful of infrastructure devices.$q$),

('n-q-534','netplus',1,'1.7','multi',3,
 $q$Which TWO of the following are valid, assignable host addresses inside 192.168.50.128/27? (Choose two.)$q$,
 $q$["192.168.50.128","192.168.50.130","192.168.50.158","192.168.50.159","192.168.50.160"]$q$::jsonb,
 $q$[1,2]$q$::jsonb,
 $q$A /27 steps in blocks of 32, so this subnet spans .128 to .159. The first address, .128, is the network identifier and the last, .159, is the broadcast, leaving .129 through .158 assignable - which makes .130 and .158 the two valid answers. The address .159 is the one worth pausing over, because it looks like an ordinary host number and only the block arithmetic reveals it as the broadcast. The address .160 opens the next /27 subnet altogether.$q$),

-- ---------------------------------------------------------------- 1.8 --------
('n-q-535','netplus',1,'1.8','mcq',1,
 $q$What makes a network environment hybrid?$q$,
 $q$["It uses two or more public cloud providers","It runs IPv4 and IPv6 side by side","On-premises infrastructure and cloud-hosted infrastructure are connected and operated as one environment","It combines wired and wireless access methods"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$Hybrid describes the relationship between locations: workloads run both in facilities the organisation controls and in a provider's cloud, joined by network connectivity and, usually, common identity and management. Using several public providers is multicloud, and that is the distractor the exam leans on - multicloud may involve no on-premises footprint at all, so the two terms are not interchangeable. Dual-stack addressing and mixed access media are unrelated to where the infrastructure lives.$q$),

('n-q-536','netplus',1,'1.8','mcq',2,
 $q$A firm wants to keep owning and configuring its own servers and switches but no longer wants to operate a building with generators, chillers and carrier entrances. Which environment fits?$q$,
 $q$["Public cloud infrastructure as a service","Colocation","A private cloud built out in the existing server room","A branch office deployment"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Colocation rents space, power, cooling, physical security and carrier access while the tenant still owns, racks and administers the hardware. That matches the requirement exactly: shed the facility, keep the kit. Public cloud IaaS is the tempting answer because it also removes the building, but it removes the hardware ownership too - the firm would be renting virtual machines rather than configuring its own switches, which is precisely what it said it wants to keep. Building a private cloud in the existing server room leaves the firm running the facility it is trying to exit.$q$),

('n-q-537','netplus',1,'1.8','mcq',2,
 $q$An organisation owns six buildings on one site and links them with fibre it installed in its own ducts. How is this network best classified, and what does the classification imply?$q$,
 $q$["A campus network - because the land and the fibre belong to the organisation, no carrier circuit is needed between buildings","A WAN, because separate structures always require leased lines","A collection of branch offices, because each building is a separate location","A metropolitan network, because the buildings are more than 100 m apart"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A campus is several buildings in one geographic area under one owner, interconnected by that owner's own cabling. The practical consequence is that inter-building links are free to run at LAN speeds with no recurring circuit charge and no carrier service level to negotiate. The WAN answer is the one that catches people, because the distances involved look WAN-like: what actually defines a WAN is crossing territory the organisation does not control, which forces reliance on a service provider. Distance alone does not make a network metropolitan or wide-area.$q$),

('n-q-538','netplus',1,'1.8','mcq',2,
 $q$A 15-person branch office needs a network design that no on-site technical staff will have to look after. Which approach is most appropriate?$q$,
 $q$["A full three-tier core, distribution and access stack, matching headquarters","One centrally managed converged router, firewall, switch and access point appliance, with a secondary broadband or cellular link for WAN resilience","A spine-and-leaf fabric sized for future growth","Client VPN software on every laptop and no local network equipment at all"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Branch design optimises for low device count, remote manageability and a resilient path back to headquarters or the cloud, which is exactly why converged appliances and SD-WAN with a backup cellular circuit dominate this space. Mirroring the headquarters three-tier stack is the plausible-looking wrong answer - consistency sounds like good practice, but it puts several chassis and layers of hierarchy into a site with fifteen users and nobody to maintain them. Spine-and-leaf answers a data centre problem, and abandoning local equipment entirely leaves shared printers, access points and any on-site systems with nothing to attach to.$q$),

('n-q-539','netplus',1,'1.8','mcq',2,
 $q$On a plant control network, why is a routine monthly patch-and-reboot maintenance window usually unacceptable?$q$,
 $q$["Control devices are not connected to any network","Patching is forbidden by the Purdue reference model","Availability and process safety come first: halting a controller halts physical production, and vendor certification often ties the device to one firmware version","Industrial controllers contain no firmware to patch"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$Operational technology inverts the usual priority order. In an ICS or SCADA environment, availability and safety outrank confidentiality, because a stopped controller means a stopped process and possibly an unsafe physical state; on top of that, controllers are frequently certified against a specific firmware build, so patching can void support or safety approval. That is why change happens in rare planned outages rather than monthly. The claim that these devices are unnetworked is the appealing misconception - modern plants are heavily networked, which is exactly why segmentation and compensating controls matter so much when patching is not an option.$q$),

('n-q-540','netplus',1,'1.8','mcq',3,
 $q$Why is an active vulnerability scan of an ICS segment generally discouraged?$q$,
 $q$["Scanners cannot interpret Modbus or DNP3, so the scan simply returns nothing","Legacy controllers have minimal network stacks and can fault or halt when probed, so passive monitoring from a mirrored port is preferred","Scanning is only meaningful on wireless networks","It would breach the air gap, which by definition cannot be crossed"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Programmable logic controllers and remote terminal units were built for deterministic control, not for hostile traffic, and unexpected probes or malformed packets have been known to hang or reset them - an outcome with physical consequences. The accepted practice is passive discovery from a SPAN or tap, supplemented by vendor-supplied asset inventories. The answer about protocol support is the plausible one and is partly true of naive scanners, but it understates the issue: the risk is not that the scan learns nothing, it is that the scan disrupts the process. Many ICS networks are also segmented rather than truly air gapped, so scanning them is technically possible - just unwise.$q$),

('n-q-541','netplus',1,'1.8','mcq',1,
 $q$In a SCADA system, which component is the operator-facing screen that displays process state and accepts control input?$q$,
 $q$["The PLC","The historian","The RTU","The HMI"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$The human-machine interface is the graphical console an operator watches and acts through. The historian is the tempting alternative because it is also a screen-accessible system, but it is a time-series database that stores process values for later trending and reporting rather than a live control surface. A PLC is the ruggedised controller executing the logic on the plant floor, and an RTU performs a similar role at geographically remote sites such as pipeline or substation locations.$q$),

('n-q-542','netplus',1,'1.8','multi',2,
 $q$Which TWO characteristics distinguish a data centre network from a branch office network? (Choose two.)$q$,
 $q$["Traffic is dominated by east-west server-to-server flows rather than by a few users reaching the internet","Redundant power feeds, cooling and multiple carrier entrances are designed in from the outset","A single converged router, firewall, switch and access point appliance usually serves the whole site","The design assumes one WAN circuit as the only path off site","Wireless is the primary access method for the servers"]$q$::jsonb,
 $q$[0,1]$q$::jsonb,
 $q$Data centres are built around machine-to-machine traffic and around never going down, which is why they use fabrics tuned for east-west flow and why the facility itself is engineered with N+1 power, cooling and diverse carrier entry. The converged single appliance and the single WAN circuit describe the branch, which is the contrast the question is drawing - a branch optimises for cost and simplicity because the workloads it serves live elsewhere. Servers in a data centre are cabled, not wireless.$q$),

('n-q-543','netplus',1,'1.8','multi',3,
 $q$A company is extending its on-premises network into a public cloud virtual network to form a hybrid environment. Which TWO items must be settled before the first workload moves? (Choose two.)$q$,
 $q$["The cloud address space must not overlap the RFC1918 ranges already in use on premises","A protected transit path - site-to-site VPN or a dedicated private circuit - must join the two sides","Every on-premises server must be renumbered into 169.254.0.0/16","The cloud provider must be granted administrative access to the on-premises directory","All internal traffic must be moved onto public IPv4 addresses"]$q$::jsonb,
 $q$[0,1]$q$::jsonb,
 $q$Overlapping address space is the single most common hybrid failure, because if 10.1.0.0/16 exists on both sides, routing cannot distinguish them and the workaround is painful double NAT; the ranges have to be planned as one address plan. The second requirement is transit: hybrid means the two environments behave as one network, which needs an encrypted tunnel or a private circuit rather than traffic traversing the open internet. Renumbering into 169.254.0.0/16 is the answer that sounds technical but inverts reality - link-local space is not routable and is reserved for DHCP failure. Nothing about hybrid requires handing the provider directory administration or exposing internal systems on public addresses.$q$),

('n-q-544','netplus',1,'1.8','matching',2,
 $q$Match each network environment to the characteristic that defines it.$q$,
 $q${"left":["Colocation data centre","Campus network","Branch office","SCADA / ICS network"],"right":["Availability and safety outrank confidentiality, and devices may run for many years without a firmware change","You own and rack your own equipment but rent the building, power, cooling and carrier connectivity","A small user population behind one converged appliance, reached over a WAN or SD-WAN link back to headquarters","Several buildings on land the organisation owns, joined by its own fibre rather than a leased circuit"]}$q$::jsonb,
 $q$[1,3,2,0]$q$::jsonb,
 $q$Colocation is defined by the split of ownership - your hardware, someone else's facility. A campus is defined by owning the land and the interconnecting cable, which is why it needs no carrier between buildings. A branch is defined by being small and remote, so it is designed for central management and WAN resilience. An ICS network is defined by its inverted priorities, where uptime and physical safety come before confidentiality. Colocation and public cloud are the pair most often conflated; the test is whether you still own the servers.$q$),

('n-q-545','netplus',1,'1.8','mcq',2,
 $q$An organisation retires its own data centre and moves those workloads to public cloud. Which change to its cost and capacity model should it expect?$q$,
 $q$["Capital purchases of hardware refreshed every few years give way to recurring operating charges that rise and fall with consumption","Costs become fixed and fully predictable, because the provider quotes a single annual figure","Capacity planning disappears entirely, since the provider has unlimited capacity at no cost","The organisation becomes responsible for the physical security of the provider's facility"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$The headline shift is capital expenditure to operating expenditure: instead of buying servers up front and depreciating them, the organisation pays monthly for what it consumes, and can scale up or down without a procurement cycle. The predictable-fixed-cost answer is the appealing one and is exactly backwards - consumption billing makes spend variable, which is why cloud cost management becomes a discipline of its own. Capacity planning changes shape rather than vanishing, since consumption still has to be forecast and budgeted, and physical security of the facility remains the provider's responsibility under any shared responsibility model.$q$),

('n-q-546','netplus',1,'1.8','mcq',3,
 $q$A manufacturer must keep its control network unreachable from the corporate LAN, yet plant metrics have to appear on corporate dashboards. What is the standard design?$q$,
 $q$["Place the control devices on a VLAN of the corporate access switches and rely on the VLAN tag for separation","Put a historian in a screened boundary network between operational and corporate technology, which the control side writes to and the corporate side reads from, with no session initiated inward toward the controllers","Publish the controllers directly to the internet with strong passwords so the dashboards can poll them","Give the corporate analysts engineering workstation accounts on the control network"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$The accepted pattern is a demilitarised boundary between operational and information technology: controllers push process data outward to a historian or broker that lives in the boundary zone, and corporate systems read from that copy, so no traffic ever originates on the corporate side and terminates on a controller. The VLAN answer is the plausible one because VLANs really are a segmentation tool, but a VLAN on shared corporate switches is a Layer 2 boundary with no inspection and no default deny between zones - it stops broadcasts, not an attacker who has already reached that switch. Exposing controllers publicly or handing out engineering accounts both create the direct inbound path the design exists to eliminate.$q$);

-- ============================================================================
-- FLASHCARDS
-- ============================================================================

insert into public.flashcards (id, cert, domain, objective, deck, front, back) values

-- ---------------------------------------------------------------- 1.5 --------
('n-f-500','netplus',1,'1.5','core',
 $q$Why does single-mode fibre reach so much further than multimode?$q$,
 $q$Core size. Single-mode has a core of about 8 to 10 microns, narrow enough that light travels essentially one path, so pulses stay sharp over tens of kilometres. Multimode has a 50 or 62.5 micron core that supports many paths of slightly different length, so a pulse arrives spread out (modal dispersion) - which limits it to hundreds of metres and shrinks further as the bit rate rises.$q$),

('n-f-501','netplus',1,'1.5','core',
 $q$When would you deliberately choose multimode over single-mode, given single-mode goes further?$q$,
 $q$When the run is short and the port count is high. Multimode uses cheap 850 nm VCSEL optics; single-mode needs precision long-reach lasers that cost more per port. Inside a row or a building, multimode is comfortably within its distance limit, so paying for reach you cannot use is waste. Cross a campus or go between sites and the calculation flips to single-mode.$q$),

('n-f-502','netplus',1,'1.5','core',
 $q$What core diameter, light source and wavelength does each fibre type use?$q$,
 $q$Single-mode: roughly 9 micron core, laser source, 1310 nm or 1550 nm, yellow jacket by convention. Multimode: 50 or 62.5 micron core, VCSEL or LED source, 850 nm (and 1300 nm), orange for OM1/OM2, aqua for OM3/OM4, lime green for OM5.$q$),

('n-f-503','netplus',1,'1.5','core',
 $q$How do you tell LC, SC and ST fibre connectors apart?$q$,
 $q$LC is the small-form-factor one with an RJ45-style plastic latch, usually clipped as a duplex pair - it is what fits an SFP cage. SC is a square push-pull connector about twice the size of LC, common on patch panels and older 1G equipment. ST is round with a bayonet twist-lock, the legacy type still found in older buildings.$q$),

('n-f-504','netplus',1,'1.5','core',
 $q$What problem does an MPO/MTP connector solve?$q$,
 $q$It gathers 8, 12 or 24 fibres into one rectangular ferrule. That lets a parallel optic transmit across several lanes simultaneously - which is how 40G and 100G short-reach links work - and lets data centre trunks be pre-terminated in the factory so a whole bundle lands with one plug instead of a dozen LC pairs.$q$),

('n-f-505','netplus',1,'1.5','acronym',
 $q$SFP$q$,
 $q$Small Form-factor Pluggable - a hot-swappable optical or copper transceiver module that slides into a switch or router cage. Purpose: it lets one physical port be fitted for whatever medium and distance the link needs (1 Gbps for SFP, 10 Gbps for SFP+, 25 Gbps for SFP28).$q$),

('n-f-506','netplus',1,'1.5','acronym',
 $q$QSFP$q$,
 $q$Quad Small Form-factor Pluggable - a transceiver that carries four parallel lanes in one module. Purpose: multiplying the lane count is how the high-speed tiers are reached, giving 40 Gbps with QSFP+ (4 x 10) and 100 Gbps with QSFP28 (4 x 25).$q$),

('n-f-507','netplus',1,'1.5','acronym',
 $q$MPO$q$,
 $q$Multi-fibre Push-On - a connector holding 8, 12 or 24 fibres in a single ferrule (sold by one vendor as MTP). Purpose: it feeds parallel optics such as 40GBASE-SR4 and terminates data centre fibre trunks with one plug rather than many.$q$),

('n-f-508','netplus',1,'1.5','core',
 $q$What speed does each transceiver form factor carry?$q$,
 $q$GBIC 1 Gbps (older, larger). SFP 1 Gbps. SFP+ 10 Gbps. SFP28 25 Gbps. QSFP+ 40 Gbps as four 10 Gbps lanes. QSFP28 100 Gbps as four 25 Gbps lanes. Rule of thumb: the Q prefix means four parallel lanes, which is where each jump in speed comes from.$q$),

('n-f-509','netplus',1,'1.5','core',
 $q$What is a direct attach copper (DAC) cable and where is it used?$q$,
 $q$A shielded twinaxial cable with the transceiver bodies moulded permanently onto both ends and sold as one fixed-length assembly. It is cheaper and draws less power than two optics plus a patch lead, but because it is passive copper at 10G and above, usable lengths are only a few metres - so it lives inside a rack or reaches an adjacent one, typically top-of-rack switch to server.$q$),

('n-f-510','netplus',1,'1.5','core',
 $q$What is the difference between simplex, half duplex and full duplex?$q$,
 $q$Simplex is one direction only, with no return channel at all (a broadcast transmitter, a one-way sensor feed). Half duplex allows both directions but only one at a time, so collisions are possible - the old hub or walkie-talkie model. Full duplex sends and receives simultaneously, which every modern switched Ethernet port does.$q$),

('n-f-511','netplus',1,'1.5','core',
 $q$Cat6 and Cat6a are both rated for 10 Gbps. What actually separates them?$q$,
 $q$Distance. Cat6 sustains 10GBASE-T only to roughly 55 m, because alien crosstalk between neighbouring unshielded cables becomes the limiting factor. Cat6a was engineered with tighter twists and better separation to hold 10 Gbps across the full 100 m channel. Both do 1 Gbps to 100 m without difficulty.$q$),

('n-f-512','netplus',1,'1.5','core',
 $q$What is Cat8 for, and why is its distance limit so short?$q$,
 $q$Cat8 carries 25GBASE-T and 40GBASE-T but only to about 30 m. That is a deliberate design point: it exists for short data centre runs from a top-of-rack switch to servers in the same or an adjacent cabinet, where RJ45 termination is convenient. It is not a horizontal cabling product for runs out to workstations.$q$),

('n-f-513','netplus',1,'1.5','core',
 $q$When is plenum-rated cable required rather than riser-rated?$q$,
 $q$Plenum (CMP) is required in any space used to move conditioned air - most often the void above a suspended ceiling. Its low-smoke fluoropolymer jacket limits the toxic smoke the air handling would otherwise circulate through the building if the cable burned. Riser (CMR) is the lesser rating, for vertical shafts between floors, and does not satisfy a plenum requirement.$q$),

('n-f-514','netplus',1,'1.5','core',
 $q$Where do you still meet coaxial cable, and how do RG-6 and RG-59 differ?$q$,
 $q$RG-6 is the thicker, lower-loss type used for cable internet and television drops, terminated with a screw-on F-type connector. RG-59 is thinner with higher loss, so it is limited to short runs and survives mainly in legacy analogue CCTV, often on BNC connectors. Coax carries a single conductor and shield rather than twisted pairs.$q$),

('n-f-515','netplus',1,'1.5','core',
 $q$Beyond distance, why choose fibre over copper between two buildings?$q$,
 $q$Glass is a dielectric: it carries no current, so it is immune to electromagnetic interference and, crucially, creates no electrical bond between structures on different electrical services - removing the ground potential difference and surge path that copper would introduce. The trade-off is that fibre cannot carry PoE, so remote devices need local power or a powered media converter.$q$),

-- ---------------------------------------------------------------- 1.6 --------
('n-f-516','netplus',1,'1.6','core',
 $q$What is the defining wiring rule of a spine-and-leaf fabric?$q$,
 $q$Every leaf connects to every spine, and nothing else connects to anything: no leaf-to-leaf links and no spine-to-spine links. Servers and storage attach only to leaves. The result is that any server reaches any other server in exactly two switch hops, over any of several equal-cost paths.$q$),

('n-f-517','netplus',1,'1.6','core',
 $q$Why did spine-and-leaf displace the three-tier tree in data centres?$q$,
 $q$Because the traffic changed. Virtualisation, clustering, replication and microservices made server-to-server (east-west) traffic dominant, and in a tree that traffic may have to climb to the core and back down, so latency depends on where a workload sits. A fabric makes every path the same length, so performance no longer depends on VM placement. The price is more cabling and more switch ports.$q$),

('n-f-518','netplus',1,'1.6','core',
 $q$What do north-south and east-west traffic mean?$q$,
 $q$North-south is traffic entering or leaving the data centre - a user's browser reaching the web tier, or a server calling an external API. East-west is traffic that stays inside, between servers: replication, clustering, storage and service-to-service calls. East-west now dominates the volume, which is the reason data centre fabrics are designed around it.$q$),

('n-f-519','netplus',1,'1.6','core',
 $q$What are the three layers of the hierarchical model and what does each do?$q$,
 $q$Access (edge): end devices plug in here; PoE, port security, VLAN assignment. Distribution (aggregation): aggregates access switches, provides the default gateway, routes between VLANs, enforces ACLs and summarises routes - the policy layer. Core: moves traffic between distribution blocks as fast as possible, deliberately kept free of heavy filtering.$q$),

('n-f-520','netplus',1,'1.6','core',
 $q$What is a collapsed core, and when do you use one?$q$,
 $q$It merges the distribution and core functions onto one pair of switches, leaving a two-layer design. It suits a single building or a single campus block, because a dedicated core exists to aggregate several distribution blocks - with only one block there is nothing for it to aggregate, so a separate core adds cost and a hop for no benefit.$q$),

('n-f-521','netplus',1,'1.6','core',
 $q$How many links does a full mesh of n sites need, and why does that matter?$q$,
 $q$n(n-1)/2. Six sites need 15 links, ten need 45, twenty need 190. The count grows roughly with the square of the site count, which is why full mesh is reserved for small numbers of critical nodes and why almost every real WAN is partial mesh or hub-and-spoke. Watch for n(n-1) as a distractor - that double-counts each link.$q$),

('n-f-522','netplus',1,'1.6','core',
 $q$What does a partial mesh trade away compared with a full mesh?$q$,
 $q$It gives direct links only to the pairs of sites that really need them, so there are far fewer circuits to buy and manage. The cost is that the remaining pairs reach each other indirectly, adding a hop of latency and leaving the routing protocol more path selection to do. It is the usual compromise between full mesh resilience and hub-and-spoke economy.$q$),

('n-f-523','netplus',1,'1.6','core',
 $q$What do you gain and lose with a hub-and-spoke WAN?$q$,
 $q$You gain simplicity and cost: one circuit per site, and adding a site adds one link. You lose direct paths - spoke-to-spoke traffic is hairpinned through the hub, which hurts latency-sensitive flows such as voice - and you concentrate risk, because a hub failure disconnects every spoke at once. The usual mitigation is a redundant hub or a second hub site.$q$),

('n-f-524','netplus',1,'1.6','core',
 $q$What is a point-to-point topology and where does it appear?$q$,
 $q$A single dedicated link between exactly two endpoints and no others - a leased line, a dark fibre pair, or a licensed microwave shot between two rooftops. It is the simplest topology and the building block that larger designs are assembled from: a hub-and-spoke WAN is a set of point-to-point links radiating from one site.$q$),

('n-f-525','netplus',1,'1.6','core',
 $q$What does hybrid mean when describing a topology?$q$,
 $q$A design that combines two or more topology types because different parts of the network have different requirements. Almost every real enterprise is hybrid: star wiring inside each building, a partial mesh or hub-and-spoke between sites, and a spine-and-leaf fabric in the data centre. The exam usually wants you to name the pieces rather than treat hybrid as a design in itself.$q$),

('n-f-526','netplus',1,'1.6','core',
 $q$A star topology puts everything behind one central device. How is that single point of failure normally handled?$q$,
 $q$By making the centre redundant rather than by abandoning the star. In practice that means a stacked or chassis pair of switches, dual uplinks from the access layer, redundant supervisors and power supplies, and first-hop redundancy such as HSRP or VRRP so the gateway address survives a device failure. The wiring stays a star; the centre stops being singular.$q$),

('n-f-527','netplus',1,'1.6','core',
 $q$Which functions belong specifically at the access layer?$q$,
 $q$Everything that is about the port a device plugs into: PoE for phones, cameras and access points; VLAN assignment including the voice VLAN; port security and 802.1X authentication; and often the first point of QoS marking. It is the layer with the most ports and the least routing, and it is where users first touch the network.$q$),

('n-f-528','netplus',1,'1.6','core',
 $q$Why is the core layer deliberately kept simple?$q$,
 $q$Because its only job is to forward between distribution blocks at line rate with minimal delay. Every access list, inspection or policy step added to the core costs latency on every flow that crosses it and creates a failure domain that affects the entire network. Policy therefore belongs at the distribution layer, which sits between the core and the users.$q$),

('n-f-529','netplus',1,'1.6','core',
 $q$What is oversubscription in a spine-and-leaf fabric, and how do you improve it?$q$,
 $q$It is the ratio of server-facing bandwidth on a leaf to that leaf's uplink bandwidth toward the spines - fill a leaf with servers and the uplinks become the constraint. You relieve it by scaling horizontally: add a spine switch and a uniform uplink to it from every leaf. Adding leaf-to-leaf cables instead would break the equal-path-length property the fabric depends on.$q$),

('n-f-530','netplus',1,'1.6','core',
 $q$How can a network's physical and logical topology differ?$q$,
 $q$The physical topology is how the cable actually runs; the logical topology is how traffic flows over it. Ethernet is the standard example: physically it is a star of cables into a switch, but logically each VLAN forms its own broadcast domain and spanning tree builds a loop-free tree that may block some of those cables. Diagrams should say which view they show.$q$),

-- ---------------------------------------------------------------- 1.7 --------
('n-f-531','netplus',1,'1.7','core',
 $q$Why is /30 the traditional prefix for a router-to-router link?$q$,
 $q$A /30 gives four addresses: one network, one broadcast and exactly two usable - one for each router interface. That is the smallest classic subnet that still works, so it wastes the least space on links that will only ever hold two devices. RFC 3021 goes one better and allows /31 on point-to-point links, where both addresses are usable because a broadcast address is meaningless with only two nodes.$q$),

('n-f-532','netplus',1,'1.7','core',
 $q$What is the quickest way to find a host's network and broadcast address by hand?$q$,
 $q$Use the block size. Subtract the interesting octet of the mask from 256 to get the increment: /26 gives 256 - 192 = 64, so subnets start at 0, 64, 128, 192. Find the boundary at or below the host address - that is the network. The broadcast is one less than the next boundary. For 192.168.20.77/26 the answer is network .64, broadcast .127.$q$),

('n-f-533','netplus',1,'1.7','acronym',
 $q$VLSM$q$,
 $q$Variable Length Subnet Masking - applying different prefix lengths to different subnets carved from the same block. Purpose: it lets you size each subnet to its actual host count, so a 200-user VLAN can take a /24 while a router-to-router link takes a /30, instead of wasting a /24 on two addresses.$q$),

('n-f-534','netplus',1,'1.7','acronym',
 $q$APIPA$q$,
 $q$Automatic Private IP Addressing - the 169.254.0.0/16 link-local range a client assigns itself when no DHCP server answers. Purpose: it keeps same-segment communication alive without a server, and for a technician it is a loud diagnostic signal that the DHCP path has failed.$q$),

('n-f-535','netplus',1,'1.7','core',
 $q$A host shows 169.254.x.x with no default gateway. What should you check, and what can it still do?$q$,
 $q$It failed to get a DHCP lease and self-assigned. Check the DHCP scope for exhaustion, the server and its service, the relay or IP helper on the router, the switch port VLAN, and the physical link. Meanwhile the host can still talk to other link-local hosts on the same segment - but it can reach nothing off-segment, because APIPA supplies no gateway and no DNS, and routers must not forward 169.254 traffic.$q$),

('n-f-536','netplus',1,'1.7','core',
 $q$What does a successful ping to 127.0.0.1 prove, and what does it not prove?$q$,
 $q$It proves the local TCP/IP stack is installed and responding. It proves nothing else: the packet is turned around inside the operating system and never reaches the network adapter, so a dead NIC, an unplugged patch lead or a disabled switch port would all still give a healthy reply. The whole of 127.0.0.0/8 is reserved for loopback. Next step is to ping the host's own configured address, then the gateway.$q$),

('n-f-537','netplus',1,'1.7','core',
 $q$What are the RFC 1918 private ranges, with their exact boundaries?$q$,
 $q$10.0.0.0/8 (10.0.0.0 to 10.255.255.255), 172.16.0.0/12 (172.16.0.0 to 172.31.255.255) and 192.168.0.0/16 (192.168.0.0 to 192.168.255.255). The 172 range is the one to memorise precisely - the /12 leaves four variable bits in the second octet, giving 16 networks from 172.16 to 172.31, so 172.32.x.x is public.$q$),

('n-f-538','netplus',1,'1.7','core',
 $q$What were the classful first-octet ranges, and why do they no longer decide your mask?$q$,
 $q$Class A 1-126, class B 128-191, class C 192-223, class D 224-239 multicast, class E 240-255 experimental, with 127 reserved for loopback. Classful addressing implied the mask from the first octet; CIDR replaced it, so the prefix is now carried explicitly in configuration and routing updates. A 10.x segment can legitimately be a /26 - the leading octet constrains nothing.$q$),

('n-f-539','netplus',1,'1.7','core',
 $q$What is the usable-host formula, and which prefixes are exceptions?$q$,
 $q$Total addresses are 2^(32 - prefix); usable hosts are that minus two, for the network and broadcast addresses. The exceptions: /31 is permitted on point-to-point links by RFC 3021 and yields two usable addresses because a broadcast is meaningless between two nodes, and /32 is a single host address used for loopback interfaces and host routes.$q$),

('n-f-540','netplus',1,'1.7','core',
 $q$Recite the mask, block size and usable hosts for /25 through /30.$q$,
 $q$/25 = 255.255.255.128, blocks of 128, 126 hosts. /26 = .192, blocks of 64, 62 hosts. /27 = .224, blocks of 32, 30 hosts. /28 = .240, blocks of 16, 14 hosts. /29 = .248, blocks of 8, 6 hosts. /30 = .252, blocks of 4, 2 hosts. Each extra bit halves the block and the host count.$q$),

('n-f-541','netplus',1,'1.7','core',
 $q$Show why VLSM saves addresses, using one /24 as the example.$q$,
 $q$Take 192.168.10.0/24 for a site needing 100 users, 50 users, 25 users and two router links. Fixed-size subnetting would force one prefix everywhere and either starve the big segment or squander a /26 on each two-address link. With VLSM you allocate a /25 (126 hosts), then a /26 (62), then a /27 (30), then /30s for the links - each subnet sized to its actual demand, all inside the same /24.$q$),

('n-f-542','netplus',1,'1.7','core',
 $q$What is the difference between the limited broadcast, a directed broadcast and a subnet broadcast?$q$,
 $q$255.255.255.255 is the limited broadcast: it reaches every host on the local segment and routers never forward it. A subnet broadcast is the all-host-bits-set address of a particular subnet, such as 192.168.20.127 for 192.168.20.64/26. A directed broadcast is that same subnet broadcast sent from off-net toward the subnet; routers normally drop it, because forwarding it enables amplification attacks.$q$),

-- ---------------------------------------------------------------- 1.8 --------
('n-f-543','netplus',1,'1.8','core',
 $q$What actually changes for the network team when workloads move from on-premises to public cloud?$q$,
 $q$The physical layer disappears from their remit - no cabling, switches, power or cooling to own - and is replaced by software-defined constructs: virtual networks, subnets, security groups, route tables and load balancers configured through an API. Spend shifts from capital purchases to consumption billing, and capacity becomes elastic rather than something bought years ahead.$q$),

('n-f-544','netplus',1,'1.8','core',
 $q$What defines a hybrid environment, and what has to be planned before building one?$q$,
 $q$On-premises and cloud infrastructure connected and operated as one environment. Two things must be settled first: a single non-overlapping address plan, because duplicate RFC1918 space on both sides breaks routing and forces double NAT, and a protected transit path - site-to-site VPN or a dedicated private circuit. Consistent identity and DNS resolution across both sides come next.$q$),

('n-f-545','netplus',1,'1.8','core',
 $q$What is colocation, and how does it differ from public cloud?$q$,
 $q$In colocation you rent rack space, power, cooling, physical security and carrier access, but you still own, install and administer your own servers and switches. In public cloud you own no hardware at all and rent virtual resources. The test question is simple: do you still own the equipment? If yes, it is colocation.$q$),

('n-f-546','netplus',1,'1.8','acronym',
 $q$SCADA$q$,
 $q$Supervisory Control and Data Acquisition - the class of system that monitors and controls physical industrial processes across distributed sites. Purpose: it gives operators a live view and control of plant, pipelines, substations or water systems through HMIs, PLCs and RTUs, usually on a network kept separate from corporate IT.$q$),

('n-f-547','netplus',1,'1.8','core',
 $q$Name the main components of a SCADA or ICS system and what each does.$q$,
 $q$HMI: the operator console showing process state and accepting control input. PLC: the ruggedised controller running the logic on the plant floor. RTU: the same idea at a geographically remote site such as a substation or pipeline valve. Historian: a time-series database storing process values for trending and reporting. Engineering workstation: where the control logic is written and downloaded.$q$),

('n-f-548','netplus',1,'1.8','core',
 $q$Why is the usual security priority order reversed on an operational technology network?$q$,
 $q$Because the system controls physical processes. Availability comes first - stopping a controller stops production and can leave equipment in an unsafe state - then integrity, since corrupted setpoints can cause physical damage, and confidentiality last, because a temperature reading matters far less than the plant staying under control. Corporate IT ranks the same three the other way round.$q$),

('n-f-549','netplus',1,'1.8','core',
 $q$Why can ICS devices not be patched and scanned on the usual IT schedule?$q$,
 $q$Patching needs a production outage that may be permitted only once or twice a year, and vendor certification often ties a controller to one firmware build, so updating can void support or safety approval. Active scanning is discouraged because legacy controllers have thin network stacks and may fault or halt when probed. The compensating controls are segmentation, strict access paths and passive monitoring.$q$),

('n-f-550','netplus',1,'1.8','core',
 $q$What network characteristics define a data centre environment?$q$,
 $q$Very high port density and bandwidth, traffic dominated by east-west server-to-server flows, spine-and-leaf fabrics chosen for uniform latency, and a facility engineered so nothing single fails: redundant power feeds and generators, N+1 cooling, and multiple carrier entrances on diverse paths. Change control is tight because a fault affects every service hosted there.$q$),

('n-f-551','netplus',1,'1.8','core',
 $q$What network characteristics define a campus environment?$q$,
 $q$Several buildings in one geographic area, all on land the organisation controls, joined by fibre it installed itself - so there is no carrier circuit and no recurring charge between buildings. Typically a collapsed core or three-tier design, heavy wireless coverage for mobile users, and a mix of user, voice, camera and building-system traffic on the same infrastructure.$q$),

('n-f-552','netplus',1,'1.8','core',
 $q$What network characteristics define a branch office?$q$,
 $q$A small user population, no on-site technical staff, and workloads that mostly live somewhere else. That drives a converged router, firewall, switch and access point in one appliance, central management or zero-touch provisioning, and WAN resilience through SD-WAN with a second broadband or cellular circuit. The design optimises for low cost and remote supportability, not for capacity.$q$),

('n-f-553','netplus',1,'1.8','core',
 $q$What is the difference between hybrid cloud and multicloud?$q$,
 $q$Hybrid means on-premises infrastructure plus cloud, joined and run as one environment. Multicloud means using two or more cloud providers, and may involve no on-premises footprint at all. An organisation can be both. Exam items lean on this distinction, so read whether the scenario mentions equipment the organisation still owns.$q$),

('n-f-554','netplus',1,'1.8','core',
 $q$How does a private cloud differ from a traditional on-premises server room?$q$,
 $q$Location is not the difference - a private cloud can sit in your own data centre. The difference is the operating model: pooled resources, self-service provisioning through a portal or API, automated orchestration and chargeback to internal consumers. A classic on-premises build assigns fixed hardware to fixed applications with a ticket-and-wait provisioning process.$q$),

('n-f-555','netplus',1,'1.8','core',
 $q$What is the capex-to-opex shift, and what is the catch?$q$,
 $q$On-premises is capital expenditure: buy hardware up front, depreciate it, refresh in three to five years. Cloud is operating expenditure: pay monthly for what you consume, with no procurement cycle before scaling. The catch is that consumption billing makes spend variable and easy to lose control of, which is why cloud cost management becomes an ongoing discipline rather than a one-time purchase decision.$q$),

('n-f-556','netplus',1,'1.8','core',
 $q$What should you know about industrial protocols such as Modbus and DNP3?$q$,
 $q$They were designed for reliable, deterministic control on isolated serial links, long before internet exposure was a concern, so in their classic forms they carry no authentication and no encryption - any device that can reach a controller can issue commands. They now ride over TCP/IP, which is why network segmentation and strict control of who can reach the control network carry so much of the security burden.$q$),

('n-f-557','netplus',1,'1.8','core',
 $q$How is a control network normally connected to the corporate network without exposing it?$q$,
 $q$Through a screened boundary zone between operational and information technology. Controllers push process data outward to a historian or broker sitting in that zone, and corporate systems read from that copy, so no session is ever initiated from the corporate side into the control network. A VLAN on shared corporate switches is not equivalent - it separates broadcast domains but applies no inspection and no default deny.$q$);
