-- A+ Core 1 (220-1101) Domain 2 expansion, part A: objectives 2.1-2.4.
-- Adds questions a1-q-300..348 (49) and flashcards a1-f-300..359 (60), topping
-- each objective up to 33 total items:
--   2.1 TCP/UDP ports and protocols          -> 11 questions, 13 flashcards
--   2.2 Networking hardware                  -> 12 questions, 15 flashcards
--   2.3 Wireless protocols and standards     -> 12 questions, 15 flashcards
--   2.4 Services provided by networked hosts -> 14 questions, 17 flashcards
-- Acronym-deck note: DHCP (a1-a-001), DNS (a1-a-002) and PoE (a1-a-004) already
-- exist as pure-expansion cards, so the six acronym cards here are SMB, SNMP,
-- LDAP, ONT, SDN and UTM rather than duplicating those.

insert into public.questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ===================== 2.1 TCP/UDP ports and protocols =====================

('a1-q-300','aplus1',2,'2.1','mcq',2,
 $q$A user can browse the internet normally but can no longer reach the department file share or the shared print queue on a Windows server. All hosts run current Windows builds with NetBIOS over TCP/IP disabled, and a firewall rule change was made that morning. Which port was most likely blocked?$q$,
 $q$["TCP 445","TCP 139","UDP 161","TCP 389"]$q$::jsonb,
 '0'::jsonb,
 $q$Modern Windows file and printer sharing runs SMB directly over TCP 445, so blocking it breaks UNC paths, mapped drives and shared print queues while leaving web browsing untouched. TCP 139 is the tempting near-miss because legacy NetBIOS session service also carried SMB, but the scenario states NetBIOS over TCP/IP is disabled, so nothing is using 139. UDP 161 is SNMP polling and TCP 389 is LDAP directory lookup; neither carries file shares.$q$),

('a1-q-301','aplus1',2,'2.1','mcq',1,
 $q$Security policy has disabled Telnet on all Linux servers. A technician still needs an encrypted command-line session to those servers. Which protocol and port should be permitted?$q$,
 $q$["Telnet on TCP 23","SSH on TCP 22","RDP on TCP 3389","HTTP on TCP 80"]$q$::jsonb,
 '1'::jsonb,
 $q$SSH on TCP 22 provides an encrypted terminal session and is the direct replacement for Telnet; SFTP and SCP ride the same port. RDP on 3389 is the tempting pick because it is also remote access, but it delivers a graphical Windows desktop rather than a shell, and a Linux server does not present one by default. Telnet is the protocol that was just banned because it sends credentials in cleartext, and HTTP is web traffic.$q$),

('a1-q-302','aplus1',2,'2.1','mcq',2,
 $q$A desktop mail client downloads new messages normally, but every attempt to send a message fails with a timeout. Outbound traffic to which default port should the technician check first at the firewall?$q$,
 $q$["TCP 110","TCP 143","TCP 25","TCP 443"]$q$::jsonb,
 '2'::jsonb,
 $q$Submitting and relaying mail uses SMTP, whose default port is TCP 25, so a block there stops sending while leaving retrieval untouched. TCP 110 (POP3) and TCP 143 (IMAP) are tempting because they are also mail ports, but they only pull messages down, and the symptom already proves retrieval works. TCP 443 is HTTPS, which would matter for webmail but not for a desktop client speaking native mail protocols.$q$),

('a1-q-303','aplus1',2,'2.1','mcq',2,
 $q$A user reads mail on both a laptop and a phone and complains that a message deleted on one device still shows as unread on the other. Which protocol and default port should the mailbox be reconfigured to use?$q$,
 $q$["POP3 on TCP 110, which downloads messages and removes them from the server","IMAP on TCP 143, which keeps messages and their status on the server","SMTP on TCP 25, which relays messages between mail servers","SNMP on UDP 161, which reports mailbox statistics"]$q$::jsonb,
 '1'::jsonb,
 $q$IMAP on TCP 143 leaves the mailbox on the server and synchronises folder structure plus read and deleted flags, so every device sees identical state. POP3 on TCP 110 is the tempting choice because it is the other mailbox-retrieval protocol, but its default behaviour is to download to one device and delete from the server, which is exactly what produces the mismatch described. SMTP only sends, and SNMP is device monitoring, not mail.$q$),

('a1-q-304','aplus1',2,'2.1','mcq',3,
 $q$Laptops moved to a newly created VLAN all end up with 169.254.x.x addresses. The DHCP server sits on a different subnet and the router already has an IP helper address configured. Which traffic must the new segment's ACL permit for leases to succeed?$q$,
 $q$["UDP ports 67 and 68","TCP ports 67 and 68","UDP port 53 only","TCP port 3389"]$q$::jsonb,
 '0'::jsonb,
 $q$DHCP is a UDP protocol: the client broadcasts from UDP 68 to UDP 67 and the server replies, so both ports must pass. Choosing TCP 67 and 68 is the classic trap, but DHCP has to work before the client has an address, and no TCP handshake is possible without one, which is precisely why DHCP rides connectionless UDP. Port 53 is DNS, which resolves names but cannot hand out addressing, and 3389 is RDP.$q$),

('a1-q-305','aplus1',2,'2.1','mcq',2,
 $q$A monitoring platform must poll switches for interface counters and must also receive unsolicited alerts the moment a power supply fails. Which ports are required?$q$,
 $q$["UDP 161 for the polls and UDP 162 for the alerts","UDP 162 for the polls and UDP 161 for the alerts","TCP 389 in both directions","UDP 514 in both directions"]$q$::jsonb,
 '0'::jsonb,
 $q$SNMP agents listen on UDP 161 for get and set requests from the manager, and the manager listens on UDP 162 to receive traps and informs that a device sends on its own initiative. Reversing the two is the most common error on this item because both are SNMP ports; the anchor is that 161 is where the managed device answers and 162 is where the manager listens. TCP 389 is LDAP, and UDP 514 is syslog, a related but separate way of receiving event messages.$q$),

('a1-q-306','aplus1',2,'2.1','mcq',3,
 $q$A firewall permits TCP 21 to an FTP server. Users can log in and list directories, but every file transfer stalls and eventually times out. Which port is the classic omission?$q$,
 $q$["TCP 20, the active-mode FTP data channel","TCP 22, used by SFTP","TCP 23, used by Telnet","UDP 69, used by TFTP"]$q$::jsonb,
 '0'::jsonb,
 $q$FTP splits its work across two connections: TCP 21 carries the control channel for login, commands and directory listings, while TCP 20 carries the file data in active mode. Allowing only 21 produces exactly the symptom described, where commands succeed and data never moves. TCP 22 is tempting because SFTP sounds like FTP, but SFTP is a different protocol tunnelled inside SSH and would not be in use on a plain FTP server. Telnet and TFTP are unrelated services.$q$),

('a1-q-307','aplus1',2,'2.1','multi',2,
 $q$A security audit flags remote-access and file-transfer services that carry credentials in cleartext. Select the TWO ports that should be closed and replaced with encrypted alternatives.$q$,
 $q$["TCP 23","TCP 22","TCP 21","TCP 443","TCP 3389"]$q$::jsonb,
 '[0,2]'::jsonb,
 $q$Telnet on TCP 23 and FTP on TCP 21 both transmit usernames and passwords in plaintext, which is why SSH and SFTP, both on TCP 22, replace them. TCP 22 is the tempting pick for anyone who remembers only that 22 is remote access, but SSH is the encrypted fix rather than the problem. TCP 443 is already TLS-protected HTTPS, and RDP on 3389 encrypts its session by default; exposing 3389 to the internet is a real risk, but it is not a cleartext-credential protocol.$q$),

('a1-q-308','aplus1',2,'2.1','multi',2,
 $q$A technician is documenting which services will break if UDP is filtered on a segment. Select the THREE services below that use UDP by default.$q$,
 $q$["DHCP on ports 67 and 68","Ordinary DNS name queries on port 53","SNMP on ports 161 and 162","SMB file sharing on port 445","HTTPS on port 443"]$q$::jsonb,
 '[0,1,2]'::jsonb,
 $q$DHCP, ordinary DNS lookups and SNMP all ride UDP because each exchange is a short request and reply where retrying is cheaper than maintaining a connection. SMB on 445 and HTTPS on 443 are the traps: both move bulk data that must arrive complete and in order, so both use TCP. Note that DNS also falls back to TCP 53 for zone transfers and for responses too large for a single datagram, which is why 53 is worth memorising as both UDP and TCP.$q$),

('a1-q-309','aplus1',2,'2.1','matching',1,
 $q$Match each protocol to its default port number.$q$,
 $q${"left":["LDAP","HTTP","POP3","RDP"],"right":["110","3389","80","389"]}$q$::jsonb,
 '[3,2,0,1]'::jsonb,
 $q$LDAP directory queries use TCP 389 (LDAPS is 636), HTTP serves unencrypted web pages on TCP 80, POP3 downloads mail on TCP 110, and RDP carries remote desktop sessions on TCP 3389. The easiest pair to transpose is 110 and 143, since both are mailbox-retrieval ports; anchor POP3 to the lower number 110 and IMAP to 143.$q$),

('a1-q-310','aplus1',2,'2.1','matching',3,
 $q$Match each symptom or requirement to the port most likely involved.$q$,
 $q${"left":["A user cannot reach a Windows file share by its UNC path","A padlocked banking site fails to load while plain HTTP sites work","An administrator wants to stop cleartext remote terminal logins","Hostnames stop resolving although connections by IP address still work"],"right":["TCP 443","TCP 445","UDP and TCP 53","TCP 23"]}$q$::jsonb,
 '[1,0,3,2]'::jsonb,
 $q$SMB file shares use TCP 445, HTTPS uses TCP 443, Telnet's cleartext terminal service is TCP 23, and DNS resolution uses port 53 over UDP for normal queries and TCP for large ones and zone transfers. 443 and 445 differ by one digit and are the pair most often transposed under time pressure: 443 is the padlock in the browser, 445 is the file share.$q$),

-- ===================== 2.2 Networking hardware =====================

('a1-q-311','aplus1',2,'2.2','mcq',1,
 $q$A subscriber's fibre service ends at a small box mounted on the garage wall, and a Cat6 cable runs from that box to the customer's router. What is the box?$q$,
 $q$["A DOCSIS cable modem","An optical network terminal (ONT)","A patch panel","A PoE injector"]$q$::jsonb,
 '1'::jsonb,
 $q$An ONT terminates the ISP's fibre and converts the optical signal into Ethernet the customer's router can accept; it is the demarcation device on a fibre-to-the-premises service. The cable modem is the tempting answer because it occupies the same slot in the topology, but it converts a DOCSIS signal carried over coaxial cable, not fibre. A patch panel passively terminates in-building copper, and a PoE injector adds power to an Ethernet link.$q$),

('a1-q-312','aplus1',2,'2.2','mcq',2,
 $q$A single ceiling-mounted access point must be installed in a small office. The existing 24-port switch has no PoE support and there is no budget to replace it, and no power outlet exists above the ceiling tile. What is the most appropriate solution?$q$,
 $q$["Insert a PoE injector into the access point's Ethernet run","Replace the switch with a PoE-capable model","Run a mains extension lead above the ceiling","Convert the access point link to fibre"]$q$::jsonb,
 '0'::jsonb,
 $q$A PoE injector sits mid-span on the single Ethernet run, adds power onto the pairs, and delivers power and data to the access point over one cable, which is exactly the right tool when only one or two devices need power and the switch cannot supply it. Replacing the switch with a PoE model is the tempting answer and would technically work, but it is the expensive, disruptive option the scenario explicitly rules out. Mains leads above a ceiling breach fire and electrical code, and fibre carries no power at all.$q$),

('a1-q-313','aplus1',2,'2.2','mcq',2,
 $q$In a wiring closet, the permanent cable runs from every wall jack are punched down on the back of a rack-mounted block, and short cords connect the front of that block to switch ports. What is the block and why is it used?$q$,
 $q$["A hub, because it repeats the signal to every jack","A patch panel, because fragile permanent runs are terminated once and then re-patched with cords","A firewall, because it controls which jacks may reach the switch","An unmanaged switch, because it forwards frames by MAC address"]$q$::jsonb,
 '1'::jsonb,
 $q$A patch panel terminates the solid-core horizontal cabling once and exposes it as ports, so moves and changes are made by swapping stranded patch cords rather than re-punching in-wall cable. An unmanaged switch is the tempting choice because it is also a rack-mounted box full of RJ45 ports, but a patch panel is entirely passive: no power supply, no MAC table and no forwarding decisions.$q$),

('a1-q-314','aplus1',2,'2.2','mcq',3,
 $q$A technician finds an old 8-port device in a branch office. A capture taken on one port shows traffic addressed to every other station, and the interfaces report rising collisions. Replacing this device with a switch improves performance mainly because:$q$,
 $q$["The switch gives each port its own collision domain and supports full duplex","The switch places each port in a separate broadcast domain","The switch converts the copper runs to fibre","The switch adds NAT so the stations can share one address"]$q$::jsonb,
 '0'::jsonb,
 $q$The device is a hub: it repeats every incoming bit to all ports, so all stations share one collision domain and must run half duplex. A switch learns MAC addresses and forwards only toward the destination port, giving each port its own collision domain and allowing full-duplex operation, which is why the collisions stop. The broadcast-domain option is the seductive distractor, because a plain switch is still a single broadcast domain; separating those requires VLANs or a router.$q$),

('a1-q-315','aplus1',2,'2.2','mcq',2,
 $q$A new access-layer device must place voice and data traffic on separate VLANs, mirror one port to a monitoring host, and participate in spanning tree. Which device meets the requirement?$q$,
 $q$["An unmanaged switch","A managed switch","A PoE injector","A patch panel"]$q$::jsonb,
 '1'::jsonb,
 $q$VLAN tagging, port mirroring, spanning-tree configuration and SNMP monitoring are all features of a managed switch, reached through a web interface, CLI or controller. An unmanaged switch is the tempting choice because it forwards frames perfectly well and costs far less, but it exposes no configuration interface at all, so not one of the three requirements can be met on it.$q$),

('a1-q-316','aplus1',2,'2.2','mcq',1,
 $q$An ultrabook has no RJ45 jack, but a technician must connect it to a wired gigabit network in a lab that has no wireless coverage. What should be used?$q$,
 $q$["A USB-C to Gigabit Ethernet network adapter","A PoE injector","A wireless access point","A cable modem"]$q$::jsonb,
 '0'::jsonb,
 $q$A USB-C to Gigabit Ethernet adapter is simply an external NIC: the operating system loads a driver and the laptop gains a normal wired interface with its own MAC address. The access point is the tempting answer because it also provides connectivity, but it serves wireless clients and the lab has no wireless coverage to join. A PoE injector only supplies power, and a cable modem terminates an ISP service.$q$),

('a1-q-317','aplus1',2,'2.2','mcq',3,
 $q$An organisation adopts software-defined networking. Which statement best describes what changes?$q$,
 $q$["Every switch is replaced with a wireless access point","Forwarding decisions move to a central controller that programs the devices, separating the control plane from the data plane","All routing is disabled and the network becomes one flat VLAN","Physical cabling is replaced by virtual cables inside the hypervisor"]$q$::jsonb,
 '1'::jsonb,
 $q$SDN lifts the control plane out of each individual device into a central controller that computes policy and pushes forwarding rules down to the hardware, leaving switches and routers to concentrate on the data plane. The hypervisor option is the plausible trap because virtual switching is often deployed alongside SDN, but SDN is about centralised control of physical and virtual devices, not about replacing cabling with something virtual.$q$),

('a1-q-318','aplus1',2,'2.2','mcq',2,
 $q$A branch office already has a router providing internet access. Management now wants inbound connections from the internet denied unless they belong to a session an internal user started, and wants outbound traffic restricted by port. Which device best provides this?$q$,
 $q$["A firewall performing stateful inspection at the network edge","A layer 2 switch with more ports","A patch panel with keystone jacks","A PoE++ injector"]$q$::jsonb,
 '0'::jsonb,
 $q$A stateful firewall records each connection in a state table, so return traffic for a session an inside host opened is allowed while unsolicited inbound connections are dropped, and its rules can permit or deny by address, port and protocol. The switch is the tempting answer for anyone reaching for any device that sits in the traffic path, but a layer 2 switch forwards by MAC address and applies no policy to internet traffic. Patch panels and injectors are passive cabling and power components.$q$),

('a1-q-319','aplus1',2,'2.2','multi',2,
 $q$An engineer replaces a SOHO wireless router with an enterprise access point managed by a wireless LAN controller. Select the TWO accurate consequences.$q$,
 $q$["Routing, NAT and DHCP must now be provided by another device on the network","The access point can be configured, channel-planned and updated centrally from the controller","The access point will supply its own public IP address to the office","A switch is no longer needed anywhere on the network","Wireless clients can no longer use WPA2 or WPA3 encryption"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$An enterprise access point is a bridge between the wireless medium and the wired LAN. It does not route, translate addresses or lease addressing, so those services must come from a router, firewall or DHCP server, and its settings, channel plan and firmware are pushed from the controller. The public-IP and no-switch options are the traps: the access point still plugs into a switch port, usually a PoE one, and public addressing remains the ISP's and router's business. Enterprise access points support WPA2 and WPA3 fully.$q$),

('a1-q-320','aplus1',2,'2.2','multi',1,
 $q$Select the THREE functions that a typical all-in-one SOHO wireless router performs.$q$,
 $q$["Routes traffic between the LAN and the ISP connection and performs NAT","Runs a DHCP server that leases addressing to LAN clients","Provides an access point radio for Wi-Fi clients","Terminates the building's permanent cable runs on punch-down blocks","Converts the ISP's optical signal into Ethernet"]$q$::jsonb,
 '[0,1,2]'::jsonb,
 $q$A consumer router bundles a router with NAT, a DHCP server, a small switch and an access point radio into one box, which is why a single purchase covers a home network. The last two options are the traps because they describe boxes that sit near the same cabinet: punch-down termination is a patch panel's passive job, and converting an optical signal to Ethernet is the ONT's job on a fibre service.$q$),

('a1-q-321','aplus1',2,'2.2','multi',3,
 $q$A technician is planning Power over Ethernet for cameras and access points. Select the TWO accurate statements.$q$,
 $q$["802.3af supplies roughly 15 W at the switch port, while 802.3at (PoE+) supplies roughly 30 W","A PoE injector lets one device receive power when the switch itself has no PoE capability","PoE requires fibre optic cabling between the switch and the powered device","PoE extends the maximum copper run well beyond 100 metres","Powered devices still need their own separate mains adapter"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$The PoE standards step up in power: 802.3af delivers about 15 W per port, 802.3at (PoE+) about 30 W, and 802.3bt (PoE++) more still for demanding devices such as pan-tilt-zoom cameras. Where a switch cannot supply power, a mid-span injector adds it to that one link. The fibre option traps anyone equating more capable cabling with PoE, since PoE works only over copper twisted pair, and the usual 100 m limit is unchanged. The entire point of PoE is that no local mains adapter is required.$q$),

('a1-q-322','aplus1',2,'2.2','ordering',2,
 $q$Place the devices in the order a frame from a desktop passes through them on its way out to a fibre internet service.$q$,
 $q$["Edge router with firewall","The desktop NIC and its wall jack","Optical network terminal (ONT)","Patch panel in the wiring closet","Access-layer switch"]$q$::jsonb,
 '[1,3,4,0,2]'::jsonb,
 $q$The frame leaves the NIC through the wall jack, travels the permanent horizontal run to the patch panel, crosses a patch cord into the access switch, is routed and filtered by the edge router and firewall, and finally reaches the ONT, which converts it to light for the ISP. The most common slip is putting the switch before the patch panel: the panel is the passive termination point of the in-wall cable, so it always sits between the jack and the switch port.$q$),

-- ===================== 2.3 Wireless protocols and standards =====================

('a1-q-323','aplus1',2,'2.3','mcq',2,
 $q$Which 802.11 amendment was the first to use MIMO with multiple antenna chains and to operate on both the 2.4 GHz and 5 GHz bands?$q$,
 $q$["802.11a","802.11g","802.11n (Wi-Fi 4)","802.11ac (Wi-Fi 5)"]$q$::jsonb,
 '2'::jsonb,
 $q$802.11n introduced multiple-input multiple-output with several transmit and receive chains, added 40 MHz channel bonding, and can run on 2.4 GHz, 5 GHz or both, reaching up to 600 Mbps. 802.11ac is the tempting answer because it pushed MIMO further with downlink MU-MIMO and much wider channels, but it arrived later and is defined for 5 GHz only. 802.11a and 802.11g are single-band 54 Mbps standards with no MIMO at all.$q$),

('a1-q-324','aplus1',2,'2.3','mcq',2,
 $q$A batch of 2.4 GHz-only sensors cannot see the office's new 802.11ac network at all, although laptops connect to it without trouble. Why?$q$,
 $q$["802.11ac operates only on the 5 GHz band","802.11ac uses a proprietary encryption the sensors lack","802.11ac hides the SSID by design","802.11ac requires every client to have four antennas"]$q$::jsonb,
 '0'::jsonb,
 $q$802.11ac is defined for the 5 GHz band only, so a radio that can tune nothing but 2.4 GHz cannot even hear the beacons. The usual fix is to keep a 2.4 GHz SSID alive on an 802.11n or 802.11ax radio for legacy and IoT devices. The hidden-SSID option is tempting because it also makes a network appear invisible, but that is a configuration choice rather than a property of ac, and the laptops would be affected equally.$q$),

('a1-q-325','aplus1',2,'2.3','mcq',2,
 $q$A company deploys Wi-Fi 6E access points to escape congested 2.4 GHz and 5 GHz spectrum. What must be true for clients to benefit from the new band?$q$,
 $q$["Clients need 6 GHz-capable radios, since existing Wi-Fi 5 and Wi-Fi 6 devices cannot use 6 GHz","Clients must be upgraded to 60 GHz radios","Clients must disable WPA3, which is unsupported at 6 GHz","Any Wi-Fi 5 adapter gains 6 GHz through a driver update"]$q$::jsonb,
 '0'::jsonb,
 $q$Wi-Fi 6E is 802.11ax extended into the 6 GHz band, and using that spectrum requires client hardware containing a 6 GHz radio. The driver-update option is the tempting one because vendors really do ship firmware that adds features, but a band is a radio-hardware property that software cannot create. WPA3 is in fact mandatory on 6 GHz rather than unsupported, and 60 GHz is a separate technology (802.11ad/ay).$q$),

('a1-q-326','aplus1',2,'2.3','mcq',3,
 $q$A technician configures 40 MHz-wide channels on the 2.4 GHz radios of every access point in a busy office block. What is the most likely result?$q$,
 $q$["Throughput improves for all clients, because wider channels always carry more data","Interference worsens, because a 40 MHz channel consumes most of the 2.4 GHz band and overlaps neighbouring networks","The access points fall back to 802.11b data rates","The 2.4 GHz band gains additional non-overlapping channels"]$q$::jsonb,
 '1'::jsonb,
 $q$The 2.4 GHz band has room for only three non-overlapping 20 MHz channels, so a 40 MHz channel swallows roughly two-thirds of the usable spectrum and is almost certain to collide with neighbouring networks. Wide channels are for 5 GHz and 6 GHz, where there is spectrum to spare. The wider-channel answer states the seductive half-truth: extra width does raise the theoretical rate, but only when the additional spectrum is actually clean.$q$),

('a1-q-327','aplus1',2,'2.3','mcq',2,
 $q$Two access points serving adjacent open-plan areas have both been left on channel 6 in the 2.4 GHz band. Users in the overlap area report slow speeds although the signal meter shows full strength. What should the technician do?$q$,
 $q$["Move one access point to channel 1 and the other to channel 11","Set both access points to channel 3 to split the difference","Increase transmit power on both access points","Give both access points the same SSID and passphrase"]$q$::jsonb,
 '0'::jsonb,
 $q$Two access points sharing a channel form one contention domain, so they take turns transmitting and every client waits: strong signal, poor throughput. Channels 1, 6 and 11 are the only 20 MHz channels in the US 2.4 GHz band that do not overlap, so separating the access points onto 1 and 11 lets them transmit simultaneously. Raising transmit power is the classic wrong instinct, because it enlarges the overlap area and makes contention worse rather than better.$q$),

('a1-q-328','aplus1',2,'2.3','mcq',3,
 $q$A distribution company needs a network link between two warehouses 3 km apart, with clear line of sight across land it owns. Trenching for fibre has been ruled out on cost. Which technology fits?$q$,
 $q$["A Bluetooth personal area network","Long-range fixed wireless with directional antennas at each building","An NFC bridge between the two buildings","A single Cat6a run between the buildings"]$q$::jsonb,
 '1'::jsonb,
 $q$Long-range fixed wireless uses high-gain directional antennas aimed at one another to carry a point-to-point link over kilometres, provided line of sight is clear; it is the standard answer for building-to-building links and rural broadband. Cat6a is the tempting "just run a cable" answer, but copper Ethernet is limited to 100 m, thirty times shorter than needed here. Bluetooth spans metres and NFC only centimetres.$q$),

('a1-q-329','aplus1',2,'2.3','mcq',1,
 $q$A retail customer holds a phone within a few centimetres of the card terminal to pay. Which wireless technology is in use?$q$,
 $q$["NFC","Bluetooth","An active RFID tag","802.11ax"]$q$::jsonb,
 '0'::jsonb,
 $q$NFC works at 13.56 MHz over a range of roughly 4 cm, and that deliberately tiny range is itself the security property that makes tap-to-pay practical. Bluetooth is the tempting answer because phones use it constantly for accessories, but it reaches around 10 m and requires pairing first, which would be unusable at a checkout queue. Active RFID tags carry their own battery and are read at far greater distances.$q$),

('a1-q-330','aplus1',2,'2.3','mcq',2,
 $q$A warehouse wants to inventory sealed cartons on a pallet by wheeling a reader past them. The tags must be cheap, batteryless, and readable at a few metres without line of sight. Which technology fits?$q$,
 $q$["Passive RFID tags","NFC tags","Bluetooth beacons","Infrared barcode scanning"]$q$::jsonb,
 '0'::jsonb,
 $q$Passive RFID tags harvest their power from the reader's radio field, cost very little, and at UHF can be read several metres away straight through cardboard, which is exactly the pallet-scanning use case. NFC is the tempting choice because it is a close relative of RFID, but NFC is deliberately restricted to a few centimetres, so every carton would have to be touched individually. Bluetooth beacons need batteries, and barcodes need direct line of sight.$q$),

('a1-q-331','aplus1',2,'2.3','mcq',2,
 $q$A user's Bluetooth mouse stutters whenever a nearby access point is busy. Which explanation and remedy are correct?$q$,
 $q$["Bluetooth shares the 2.4 GHz ISM band with Wi-Fi; move the wireless clients to the 5 GHz SSID","Bluetooth uses 5 GHz; move the access point down to 2.4 GHz","The mouse needs a Wi-Fi driver update so it can join the SSID","Bluetooth requires line of sight; reposition the mouse"]$q$::jsonb,
 '0'::jsonb,
 $q$Bluetooth operates in the same 2.4 GHz ISM band as 802.11b/g/n, so a busy 2.4 GHz access point and a Bluetooth link compete for the same spectrum; shifting Wi-Fi clients to 5 GHz frees the band. The answer that swaps the two bands is the most common confusion here. Bluetooth is a radio technology that does not require line of sight, and the mouse never joins the Wi-Fi SSID at all.$q$),

('a1-q-332','aplus1',2,'2.3','ordering',2,
 $q$Place these 802.11 standards in order of maximum theoretical throughput, lowest first.$q$,
 $q$["802.11n (Wi-Fi 4)","802.11ax (Wi-Fi 6)","802.11b","802.11ac (Wi-Fi 5)","802.11g"]$q$::jsonb,
 '[2,4,0,3,1]'::jsonb,
 $q$802.11b tops out at 11 Mbps, 802.11g at 54 Mbps, 802.11n at up to 600 Mbps using MIMO and 40 MHz bonding, 802.11ac in the multi-gigabit range with 160 MHz channels and MU-MIMO, and 802.11ax higher still while also improving efficiency in crowded cells. The pair most often swapped is g and n, because both can run on 2.4 GHz; only n adds MIMO and channel bonding, which is where the order comes from.$q$),

('a1-q-333','aplus1',2,'2.3','multi',2,
 $q$Select the THREE accurate statements about the 2.4 GHz Wi-Fi band.$q$,
 $q$["It travels farther and penetrates walls better than 5 GHz","In the US it offers only three non-overlapping 20 MHz channels: 1, 6 and 11","It is shared with Bluetooth, microwave ovens and many cordless phones","It provides more than twenty non-overlapping channels","It is the only band that 802.11ac can use"]$q$::jsonb,
 '[0,1,2]'::jsonb,
 $q$Lower-frequency signals attenuate less through building materials, so 2.4 GHz has the better range; the trade-off is that its usable spectrum holds only three non-overlapping 20 MHz channels and it is shared with a crowd of other ISM-band devices. The twenty-plus non-overlapping channel figure describes 5 GHz, not 2.4 GHz, and the claim about 802.11ac inverts a fact worth knowing: 802.11ac is 5 GHz only and cannot use 2.4 GHz at all.$q$),

('a1-q-334','aplus1',2,'2.3','multi',3,
 $q$A regional ISP proposes long-range fixed wireless to serve a rural customer. Select the TWO accurate statements about this technology.$q$,
 $q$["It normally requires clear line of sight between directional antennas at both ends","It is available in both licensed and unlicensed bands, with regulatory limits on transmit power","It works reliably straight through hills and dense forest","It uses omnidirectional antennas, so no aiming is needed","It requires fibre to be trenched to each subscriber"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Long-range fixed wireless links use high-gain directional antennas that must be aimed at each other along a clear path, and providers choose between licensed bands, which buy interference protection for a fee, and unlicensed bands, subject to the regulator's power limits. Terrain is precisely what breaks these links rather than something they see through, and the whole point of the technology is that no trenching is required; the trenching option is the trap for anyone who read "ISP" and thought of fibre to the premises.$q$),

-- ===================== 2.4 Services provided by networked hosts =====================

('a1-q-335','aplus1',2,'2.4','mcq',2,
 $q$A compliance requirement states that event messages from every switch, router and firewall must be gathered on one host so they can be searched and retained. Which server role does this?$q$,
 $q$["A syslog server","An SNMP-managed device","A print server","A proxy server"]$q$::jsonb,
 '0'::jsonb,
 $q$A syslog server receives log messages that network devices and servers push to it, storing them centrally for search, correlation and retention, which is exactly the compliance need described. SNMP is the tempting near-miss because it is the other classic monitoring protocol, but SNMP polls device state and counters and raises traps rather than acting as a log repository; the two are usually deployed side by side. Print and proxy servers serve unrelated functions.$q$),

('a1-q-336','aplus1',2,'2.4','mcq',2,
 $q$When staff browse to a gambling site they receive a company-branded page saying the request was blocked, and IT notes that frequently visited pages load faster than the internet link should allow. Which internet appliance is deployed?$q$,
 $q$["A load balancer","A proxy server","A spam gateway","A syslog server"]$q$::jsonb,
 '1'::jsonb,
 $q$A proxy server sits between clients and the internet, so it can enforce URL and category filtering, log who visited what, and cache popular content to save bandwidth; the block page and the unexpectedly fast pages are both proxy behaviours. The load balancer is the tempting choice because it also intercepts web traffic, but it distributes inbound requests across back-end servers and does not police users' browsing.$q$),

('a1-q-337','aplus1',2,'2.4','mcq',2,
 $q$A public web application runs on four identical servers. Incoming traffic must be spread across them, and any server that stops responding must be taken out of rotation automatically. Which appliance provides this?$q$,
 $q$["A forward proxy server","A load balancer with health checks","A syslog server","A DHCP server"]$q$::jsonb,
 '1'::jsonb,
 $q$A load balancer distributes incoming sessions across a pool of back-end servers and continuously health-checks each member, removing a failed one so that users are never sent to it; this delivers both scale and availability. The forward proxy is the closest cousin conceptually and is the tempting answer, but a forward proxy controls outbound user traffic, whereas the appliance in front of a server farm is a load balancer.$q$),

('a1-q-338','aplus1',2,'2.4','mcq',2,
 $q$A ten-person branch office needs firewalling, intrusion prevention, gateway antivirus, web content filtering and VPN termination, but has neither rack space nor budget for separate boxes. What should be specified?$q$,
 $q$["A unified threat management (UTM) appliance","An unmanaged PoE switch","A patch panel with a fibre cassette","A dedicated spam gateway"]$q$::jsonb,
 '0'::jsonb,
 $q$A UTM appliance consolidates firewall, IPS, gateway antivirus, content filtering and VPN into one managed device, which is exactly why small sites buy them. The spam gateway is the tempting answer because it is also a security appliance, but it inspects email only and would leave every other requirement unmet. The trade-off worth remembering is that a UTM is a single point of failure and can bottleneck once all its inspection engines are enabled.$q$),

('a1-q-339','aplus1',2,'2.4','mcq',2,
 $q$An organisation wants phishing and bulk mail stopped before it ever reaches the internal mail server. Where does the filtering appliance belong in the mail flow?$q$,
 $q$["Behind the mail server, filtering messages after users download them","In front of the mail server, with the domain's MX records pointing at the gateway","On each workstation only, as a mail client plug-in","On the DHCP server, filtering leases by sender"]$q$::jsonb,
 '1'::jsonb,
 $q$A spam gateway is placed at the mail perimeter and the domain's MX records are pointed at it, so all inbound mail is scanned for spam, phishing and malware before being relayed on to the mail server. The client plug-in is the tempting answer because every user has seen a junk-mail folder, but by that point the message has already crossed the perimeter and landed in the mailbox. DHCP plays no part in mail flow whatsoever.$q$),

('a1-q-340','aplus1',2,'2.4','mcq',1,
 $q$A small design firm keeps project files on individual workstations, so work is lost when a machine fails and staff email versions back and forth. Which server role addresses this most directly?$q$,
 $q$["A file server","A print server","A web server","A syslog server"]$q$::jsonb,
 '0'::jsonb,
 $q$A file server hosts shared storage reached over the network, with permissions per user and group, versioning and one place to back up, which solves both the loss risk and the emailing-versions habit. The web server is the tempting alternative for anyone picturing an intranet portal, but it publishes pages over HTTP rather than presenting a shared drive that applications can open and save files to.$q$),

('a1-q-341','aplus1',2,'2.4','mcq',2,
 $q$An office has one high-volume printer used by forty staff. Management wants queued jobs held centrally, driver deployment automated, and per-department page counts recorded. Which role provides this?$q$,
 $q$["A print server","A DHCP reservation on the printer","A load balancer in front of the printer","A syslog server collecting printer events"]$q$::jsonb,
 '0'::jsonb,
 $q$A print server owns the print queue: it accepts jobs from clients, spools and orders them, distributes drivers, and produces accounting data by user or department. The DHCP reservation is the tempting answer because it is genuinely good practice for a network printer, but it only pins the printer's address; it manages no queue, deploys no drivers and counts no pages.$q$),

('a1-q-342','aplus1',2,'2.4','mcq',3,
 $q$Wireless users sign in with their normal corporate username and password. The access points forward those credentials to a central server that approves the login, decides which VLAN the user lands on, and records session start and stop times. Which server role is this?$q$,
 $q$["A DNS server","An AAA server such as RADIUS","A syslog server","A file server"]$q$::jsonb,
 '1'::jsonb,
 $q$This is AAA: authentication proves identity, authorisation decides what the user may reach (here the VLAN assignment), and accounting records the session, typically delivered by RADIUS or TACACS+ backed by a directory. The syslog server is the tempting distractor because session start and stop records sound like logging, but syslog only receives messages after the fact; it never decides whether a login succeeds.$q$),

('a1-q-343','aplus1',2,'2.4','mcq',2,
 $q$A water utility runs a SCADA system whose controllers monitor pumps and valves across several sites. Which statement best describes the recommended network design?$q$,
 $q$["Place the SCADA network on the same flat LAN as office PCs so operators can reach it easily","Segment the SCADA/ICS network away from the corporate LAN and tightly restrict what may cross between them","Expose the SCADA controllers directly to the internet so vendors can support them","Give SCADA controllers dynamic addresses from the corporate DHCP scope"]$q$::jsonb,
 '1'::jsonb,
 $q$SCADA and other industrial control systems run legacy, frequently unauthenticated protocols on devices that are rarely patched and cannot tolerate downtime, so standard practice is to segment them onto their own network with tightly controlled and monitored crossings such as a jump host. The flat-LAN option is the tempting "simple" answer, but it exposes safety-critical plant to every phishing click and worm on the office network. Direct internet exposure is worse still, and addressing choices do not address the risk at all.$q$),

('a1-q-344','aplus1',2,'2.4','mcq',2,
 $q$A production CNC machine is driven by an embedded PC running an operating system the vendor no longer patches, and the machine cannot be replaced this financial year. What is the most appropriate way to keep it running safely?$q$,
 $q$["Isolate it on its own VLAN, permit only the traffic it needs through the firewall, and remove internet access","Install a modern antivirus product and connect it normally to the corporate LAN","Upgrade the operating system in place without vendor support","Disconnect it from every network and move files on a shared USB stick"]$q$::jsonb,
 '0'::jsonb,
 $q$When a legacy or embedded system cannot be patched or replaced, the correct response is compensating controls: network segmentation, restrictive ACLs, no internet access and close monitoring, so the unpatchable host is reachable only by the few systems that genuinely need it. Antivirus on the flat LAN is the tempting answer because it feels like action, but it does nothing about unpatched network-facing vulnerabilities. An unsupported in-place upgrade usually voids vendor certification, and shared USB media is a well-documented infection route into isolated plant.$q$),

('a1-q-345','aplus1',2,'2.4','multi',1,
 $q$A DHCP server delivers more than an address in each lease. Select the THREE options it commonly supplies to a client.$q$,
 $q$["The subnet mask","The default gateway address","The addresses of DNS servers","The client's own MAC address","The wireless network passphrase"]$q$::jsonb,
 '[0,1,2]'::jsonb,
 $q$A standard lease carries the IP address, subnet mask, default gateway and DNS server addresses along with the lease duration, and it can carry extras such as an NTP server or a TFTP boot server. The MAC option is the trap: the client already knows its own MAC address and in fact uses it to identify itself to the DHCP server. Wireless passphrases are configured on the access point and the client supplicant and are never distributed by DHCP.$q$),

('a1-q-346','aplus1',2,'2.4','multi',2,
 $q$Select the TWO tasks that a proxy server performs.$q$,
 $q$["Caches frequently requested web content to reduce internet bandwidth use","Applies content filtering and logs which users reached which sites","Assigns IP configuration to clients as they join the network","Resolves hostnames into IP addresses for clients","Converts the ISP's optical signal into Ethernet"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$A proxy terminates client web requests on their behalf, which is what lets it cache repeated content and apply URL or category filtering with per-user logging. The DHCP and DNS options are the traps, because clients do depend on both services to browse successfully, but those are separate server roles: the proxy neither leases addresses nor answers name queries. Optical-to-Ethernet conversion is the ONT's job on a fibre service.$q$),

('a1-q-347','aplus1',2,'2.4','multi',3,
 $q$Select the THREE reasons legacy and embedded systems are commonly placed on isolated network segments.$q$,
 $q$["The vendor no longer issues security patches for them","They often run unsupported operating systems that modern security tools cannot protect","They frequently speak proprietary protocols with little or no authentication","They consume far more bandwidth than modern hosts","They are physically incapable of using Ethernet"]$q$::jsonb,
 '[0,1,2]'::jsonb,
 $q$Unpatchable software, unsupported operating systems and legacy protocols that trust anything on the wire are precisely why these hosts are segmented and given compensating controls rather than left on the general LAN. The bandwidth option is the trap: industrial and embedded devices usually send very little traffic, and their problem is exposure rather than throughput. Many of them use Ethernet perfectly well, which is exactly how they end up reachable from the office network in the first place.$q$),

('a1-q-348','aplus1',2,'2.4','matching',2,
 $q$Match each requirement to the host or appliance that satisfies it.$q$,
 $q${"left":["Central collection of log messages from switches, routers and firewalls","Automatic IP configuration for laptops joining a new subnet","Incoming web requests spread evenly across a farm of identical servers","Inbound email scanned for phishing before it reaches the mailbox server"],"right":["DHCP server","Spam gateway","Syslog server","Load balancer"]}$q$::jsonb,
 '[2,0,3,1]'::jsonb,
 $q$Syslog receives log messages pushed by devices, DHCP leases addressing to clients, a load balancer distributes sessions across a server pool while health-checking it, and a spam gateway filters mail at the perimeter with the domain's MX records aimed at it. The easiest slip is pairing the load balancer with the email requirement, since both appliances sit in front of servers; the load balancer is about distributing traffic, the spam gateway about inspecting message content.$q$);


insert into public.flashcards (id, cert, domain, objective, deck, front, back) values

-- ===================== 2.1 TCP/UDP ports and protocols =====================

('a1-f-300','aplus1',2,'2.1','core',
 $q$Which port carries Windows file and printer sharing, and which legacy ports did that job before it?$q$,
 $q$SMB runs directly over TCP 445. The legacy path was NetBIOS over TCP/IP: UDP 137 (name service), UDP 138 (datagram service) and TCP 139 (session service). Blocking 445 breaks UNC paths, mapped drives and shared print queues while web browsing keeps working.$q$),

('a1-f-301','aplus1',2,'2.1','core',
 $q$Why does FTP need two ports, and what are they?$q$,
 $q$TCP 21 carries the control channel (login, commands, directory listings) and TCP 20 carries the file data in active mode. If only 21 is open, logins and listings work but transfers stall - a classic firewall symptom. SFTP is a different protocol entirely, tunnelled inside SSH on TCP 22.$q$),

('a1-f-302','aplus1',2,'2.1','core',
 $q$Which ports send email versus retrieve it?$q$,
 $q$Send and relay: SMTP on TCP 25. Retrieve: POP3 on TCP 110, which downloads to one device and by default removes the message from the server, and IMAP on TCP 143, which leaves mail on the server and syncs read/deleted state across every device.$q$),

('a1-f-303','aplus1',2,'2.1','core',
 $q$Which ports and transport does DHCP use, and why can it not be TCP?$q$,
 $q$UDP 67 on the server and UDP 68 on the client. The client has no IP address yet, so it broadcasts - a TCP handshake would be impossible without addressing. Because routers do not forward broadcasts, a DHCP server on another subnet needs a relay agent or IP helper address.$q$),

('a1-f-304','aplus1',2,'2.1','core',
 $q$What is the difference between SNMP port 161 and port 162?$q$,
 $q$UDP 161: the agent on the managed device listens here and answers get and set polls from the management station. UDP 162: the management station listens here to receive traps and informs that a device sends on its own initiative, such as a failed power supply.$q$),

('a1-f-305','aplus1',2,'2.1','core',
 $q$Which port does LDAP use, and what is it for?$q$,
 $q$TCP 389 for directory queries; LDAPS (LDAP over TLS) uses TCP 636. It is how clients and applications look up users, groups and computers in a directory such as Active Directory, which is what makes single sign-on and central authentication possible.$q$),

('a1-f-306','aplus1',2,'2.1','core',
 $q$Why is DNS listed as both UDP 53 and TCP 53?$q$,
 $q$Ordinary name lookups are one small request and one small response, so they use UDP 53 for speed with no connection setup. DNS switches to TCP 53 when a response is too large for a single UDP datagram and for zone transfers between DNS servers.$q$),

('a1-f-307','aplus1',2,'2.1','core',
 $q$Name three cleartext protocols, their ports, and their encrypted replacements.$q$,
 $q$Telnet TCP 23 -> SSH TCP 22. FTP TCP 21 (control) and 20 (data) -> SFTP over SSH on TCP 22. HTTP TCP 80 -> HTTPS TCP 443. The cleartext versions expose credentials and content to anyone capturing traffic on the path.$q$),

('a1-f-308','aplus1',2,'2.1','core',
 $q$Which port is RDP, and why should it not be published straight to the internet?$q$,
 $q$TCP 3389. An internet-facing 3389 is a leading target for credential stuffing and ransomware intrusion, so publish remote desktop through a VPN or a remote desktop gateway rather than simply port-forwarding 3389 on the edge router.$q$),

('a1-f-309','aplus1',2,'2.1','core',
 $q$What does TCP's three-way handshake buy you that UDP does not, and what does it cost?$q$,
 $q$SYN, SYN-ACK, ACK establishes a tracked connection, so TCP can sequence segments, acknowledge them and retransmit anything lost - reliable, ordered delivery. The cost is setup delay and retransmission latency, which is why real-time voice, video and gaming prefer UDP and simply discard the occasional lost packet.$q$),

('a1-f-310','aplus1',2,'2.1','acronym',
 $q$SMB$q$,
 $q$Server Message Block - the Windows file and printer sharing protocol, carried directly over TCP 445 on modern systems.$q$),

('a1-f-311','aplus1',2,'2.1','acronym',
 $q$SNMP$q$,
 $q$Simple Network Management Protocol - polls managed devices for status and counters on UDP 161 and receives their traps on UDP 162.$q$),

('a1-f-312','aplus1',2,'2.1','acronym',
 $q$LDAP$q$,
 $q$Lightweight Directory Access Protocol - queries a directory of users, groups and computers on TCP 389 (LDAPS on TCP 636).$q$),

-- ===================== 2.2 Networking hardware =====================

('a1-f-313','aplus1',2,'2.2','core',
 $q$What does a patch panel do, and why is it not a switch?$q$,
 $q$It is a passive rack-mounted block that terminates the permanent solid-core cable runs coming from wall jacks. Its front ports are then patched to switch ports with stranded cords, so moves and changes never disturb in-wall cabling. It has no power supply, no MAC address table and makes no forwarding decisions.$q$),

('a1-f-314','aplus1',2,'2.2','core',
 $q$What actually changes when a hub is replaced by a switch?$q$,
 $q$A hub repeats every bit to all ports: one shared collision domain, half duplex, and any port can capture all traffic. A switch learns MAC addresses and forwards only toward the destination port, so every port becomes its own collision domain and can run full duplex. Both remain a single broadcast domain unless VLANs or a router are added.$q$),

('a1-f-315','aplus1',2,'2.2','core',
 $q$Which capabilities does a managed switch have that an unmanaged switch does not?$q$,
 $q$A configuration interface (web, CLI or controller) exposing VLANs and trunk ports, port mirroring for packet capture, spanning tree tuning, link aggregation, quality of service, port security and SNMP monitoring. An unmanaged switch forwards frames and offers nothing to configure.$q$),

('a1-f-316','aplus1',2,'2.2','core',
 $q$What is an ONT and where does it sit?$q$,
 $q$Optical network terminal: the ISP demarcation device on a fibre-to-the-premises service. It converts the optical signal to Ethernet, and the customer router plugs into its Ethernet port. It is the fibre-service equivalent of a cable modem.$q$),

('a1-f-317','aplus1',2,'2.2','core',
 $q$What does a cable modem do, and which standard does it use?$q$,
 $q$It converts the ISP radio-frequency signal carried on RG-6 coaxial cable into Ethernet, using the DOCSIS standard. The coax attaches with a threaded F-type connector and the router plugs into the modem's Ethernet port.$q$),

('a1-f-318','aplus1',2,'2.2','core',
 $q$PoE switch or PoE injector - how do you choose?$q$,
 $q$PoE switch: powers many ports from one place, easier to manage and to back up with a UPS; the right answer when several access points, cameras or VoIP phones need power. PoE injector: a mid-span unit adding power to a single link, the cheap fix when the existing switch has no PoE and only one or two devices need it.$q$),

('a1-f-319','aplus1',2,'2.2','core',
 $q$How much power do the PoE standards deliver?$q$,
 $q$802.3af (PoE): about 15 W at the switch port. 802.3at (PoE+): about 30 W, enough for pan-tilt-zoom cameras and higher-end access points. 802.3bt (PoE++): more still, for devices such as video-conferencing units. Power and data share the same copper twisted pair within the usual 100 m limit.$q$),

('a1-f-320','aplus1',2,'2.2','core',
 $q$What does a firewall do that a plain router does not?$q$,
 $q$A router forwards packets between networks using its routing table. A firewall enforces policy: it permits or denies by source, destination, port and protocol, and a stateful firewall tracks each session so replies to outbound connections are allowed while unsolicited inbound connections are dropped.$q$),

('a1-f-321','aplus1',2,'2.2','core',
 $q$What is software-defined networking (SDN)?$q$,
 $q$An architecture that pulls the control plane out of individual switches and routers and into a central controller. The controller computes policy and programs forwarding rules into the devices, which then simply move traffic (the data plane). The payoff is consistent policy, automation and rapid reconfiguration through APIs.$q$),

('a1-f-322','aplus1',2,'2.2','core',
 $q$What is a NIC, and what address identifies it on the local network?$q$,
 $q$Network interface card - the adapter (onboard, PCIe, M.2 or USB) that connects a host to the network. Every NIC carries a 48-bit MAC address written as 12 hexadecimal digits, the first half of which is the manufacturer's OUI. Switches forward frames using that MAC address.$q$),

('a1-f-323','aplus1',2,'2.2','core',
 $q$Access point or wireless router - what is the difference?$q$,
 $q$An access point bridges wireless clients onto an existing wired LAN and does nothing more; routing, NAT and DHCP must come from elsewhere, and it is usually powered by PoE. A wireless router bundles an access point radio with routing, NAT, DHCP and a small switch - fine at home, but deploying several creates overlapping NAT and duplicate DHCP scopes.$q$),

('a1-f-324','aplus1',2,'2.2','core',
 $q$What is a wireless LAN controller for?$q$,
 $q$A central appliance or cloud service that manages a fleet of access points: it pushes SSIDs, security settings and firmware, coordinates channel and transmit-power assignment to limit interference, and supports seamless roaming between access points. Without one, every access point has to be configured individually.$q$),

('a1-f-325','aplus1',2,'2.2','core',
 $q$How far can a copper Ethernet run go, and what do you do when the distance is greater?$q$,
 $q$100 metres for twisted pair, including the patch cords at both ends. Beyond that, place an intermediate switch in the path or move to fibre, which spans hundreds of metres to kilometres depending on type. Exceeding 100 m usually produces intermittent errors and poor throughput rather than a clean failure.$q$),

('a1-f-326','aplus1',2,'2.2','acronym',
 $q$ONT$q$,
 $q$Optical Network Terminal - converts the ISP fibre signal to Ethernet at the customer premises; the demarcation device on a fibre service.$q$),

('a1-f-327','aplus1',2,'2.2','acronym',
 $q$SDN$q$,
 $q$Software-Defined Networking - separates the control plane from the data plane so a central controller programs forwarding rules into network devices.$q$),

-- ===================== 2.3 Wireless protocols and standards =====================

('a1-f-328','aplus1',2,'2.3','core',
 $q$How do 802.11a and 802.11b compare?$q$,
 $q$Both date from 1999. 802.11a: 5 GHz, up to 54 Mbps, shorter range but a quiet band. 802.11b: 2.4 GHz, up to 11 Mbps, longer range but a crowded band. They are not interoperable, because they use different frequency bands.$q$),

('a1-f-329','aplus1',2,'2.3','core',
 $q$What does 802.11g offer, and what happens when an 802.11b client joins?$q$,
 $q$2.4 GHz at up to 54 Mbps, backward compatible with 802.11b so older clients still associate. The catch: when a b client joins, the access point enables protection mechanisms that slow the entire cell down, not just that one client.$q$),

('a1-f-330','aplus1',2,'2.3','core',
 $q$What did 802.11n (Wi-Fi 4) introduce?$q$,
 $q$MIMO with multiple transmit and receive antenna chains, channel bonding to 40 MHz, frame aggregation, and operation on 2.4 GHz, 5 GHz or both - up to 600 Mbps. It is still the standard many 2.4 GHz IoT and sensor devices speak.$q$),

('a1-f-331','aplus1',2,'2.3','core',
 $q$What defines 802.11ac (Wi-Fi 5)?$q$,
 $q$5 GHz only, channels up to 160 MHz wide, denser modulation, and downlink MU-MIMO so an access point can transmit to several clients at once. Multi-gigabit throughput, but nothing at all for 2.4 GHz devices - those still need an n or ax radio alongside it.$q$),

('a1-f-332','aplus1',2,'2.3','core',
 $q$What does the E in Wi-Fi 6E add, and what is the catch?$q$,
 $q$6E is 802.11ax extended into the 6 GHz band, a large block of clean spectrum with room for many wide channels and almost no legacy traffic. The catch: only clients with a 6 GHz radio can use it, range is shorter than 5 GHz, and WPA3 is mandatory on that band.$q$),

('a1-f-333','aplus1',2,'2.3','core',
 $q$Which Wi-Fi generation numbers map to which 802.11 letters?$q$,
 $q$Wi-Fi 4 = 802.11n, Wi-Fi 5 = 802.11ac, Wi-Fi 6 = 802.11ax, Wi-Fi 6E = 802.11ax operating on 6 GHz, Wi-Fi 7 = 802.11be. The friendly numbers were introduced so buyers could rank generations without decoding letter suffixes.$q$),

('a1-f-334','aplus1',2,'2.3','core',
 $q$Why are 1, 6 and 11 the recommended 2.4 GHz channels?$q$,
 $q$Channel centres are spaced 5 MHz apart, but each 20 MHz channel actually occupies about 22 MHz, so neighbours must be at least five channel numbers apart to avoid overlapping. In the US only 1, 6 and 11 satisfy that, which is why picking channel 3 or 9 sprays energy across two other networks.$q$),

('a1-f-335','aplus1',2,'2.3','core',
 $q$What is the trade-off when you widen a Wi-Fi channel?$q$,
 $q$Each doubling of width (20 -> 40 -> 80 -> 160 MHz) roughly doubles the theoretical rate but halves the number of non-overlapping channels and raises the noise floor. Keep 20 MHz on 2.4 GHz, and save 80 or 160 MHz for 5 GHz and 6 GHz where there is spectrum to spare.$q$),

('a1-f-336','aplus1',2,'2.3','core',
 $q$Co-channel versus adjacent-channel interference - what is the difference?$q$,
 $q$Co-channel: two access points on the same channel hear each other and take turns, so throughput drops but frames stay intact. Adjacent-channel: partly overlapping channels such as 4 and 6 cannot decode one another, so they simply corrupt each other's frames. Adjacent-channel is the worse of the two.$q$),

('a1-f-337','aplus1',2,'2.3','core',
 $q$Which everyday devices interfere with 2.4 GHz Wi-Fi?$q$,
 $q$Microwave ovens, Bluetooth devices, older cordless phones, baby monitors, wireless cameras and Zigbee smart-home gear all share the 2.4 GHz ISM band. Slowness that follows a schedule - the break-room microwave at lunchtime, for example - is the classic clue.$q$),

('a1-f-338','aplus1',2,'2.3','core',
 $q$What are Bluetooth's band, typical range and role?$q$,
 $q$The 2.4 GHz ISM band, roughly 10 m for the common Class 2 devices, used to build a personal area network for headsets, keyboards, mice, speakers, car kits and phone tethering. Devices must be paired first, and it competes for spectrum with 2.4 GHz Wi-Fi.$q$),

('a1-f-339','aplus1',2,'2.3','core',
 $q$What is NFC, and over what range does it work?$q$,
 $q$Near-field communication: a 13.56 MHz technology operating at roughly 4 cm. Used for tap-to-pay, transit passes, badge reads and quick pairing of speakers or headphones. That tiny range is itself the security control, since an attacker must be practically touching the device.$q$),

('a1-f-340','aplus1',2,'2.3','core',
 $q$Passive versus active RFID - what is the difference?$q$,
 $q$Passive tags have no battery: they draw power from the reader's field, cost very little, and are read from centimetres (HF) up to several metres (UHF). Active tags carry a battery, transmit on their own and can be read from tens of metres. Uses include door badges, inventory, and asset and livestock tracking.$q$),

('a1-f-341','aplus1',2,'2.3','core',
 $q$When is long-range fixed wireless the right answer?$q$,
 $q$For building-to-building links and rural broadband where cabling is impractical: directional antennas at both ends, clear line of sight, and ranges from a few kilometres upward. Available in licensed bands, which buy interference protection for a fee, or unlicensed bands subject to the regulator's transmit-power limits.$q$),

('a1-f-342','aplus1',2,'2.3','core',
 $q$MIMO versus MU-MIMO - what is the difference?$q$,
 $q$MIMO uses multiple antenna chains to send several spatial streams to one client at a time, raising that client's rate. MU-MIMO (multi-user) lets the access point serve several clients simultaneously - downlink only in 802.11ac, both directions in 802.11ax - which matters most in dense environments with many devices.$q$),

-- ===================== 2.4 Services provided by networked hosts =====================

('a1-f-343','aplus1',2,'2.4','core',
 $q$What does a DNS server do, and what does its failure look like to a user?$q$,
 $q$It resolves hostnames to IP addresses and back. When it fails, connections by IP address still succeed while anything typed as a name fails - the classic split symptom. Confirm it with nslookup, or by pinging a known IP address and then the same host by name.$q$),

('a1-f-344','aplus1',2,'2.4','core',
 $q$What does a DHCP server hand out, and what is a reservation?$q$,
 $q$A lease containing an IP address, subnet mask, default gateway, DNS server addresses and a lease duration, plus optional extras such as NTP or boot servers. A reservation ties a specific MAC address to a fixed IP address, so a printer or server always gets the same address while still receiving every other option centrally.$q$),

('a1-f-345','aplus1',2,'2.4','core',
 $q$What does a file server provide beyond raw storage?$q$,
 $q$Shared folders reached over SMB (Windows) or NFS (Unix and Linux), with permissions applied per user and group so access is controlled centrally. It also gives one place to back up, audit, version and search data instead of scattering it across individual workstations.$q$),

('a1-f-346','aplus1',2,'2.4','core',
 $q$What does a print server do?$q$,
 $q$It accepts print jobs from clients, spools and orders the queue, distributes the correct drivers, and records accounting data such as pages per user or department. It may be a dedicated server, a small hardware print server box, or the network interface built into the printer itself.$q$),

('a1-f-347','aplus1',2,'2.4','core',
 $q$What does a mail server do, and which protocols does it speak?$q$,
 $q$It accepts, stores and relays email. SMTP (TCP 25) moves mail between servers and accepts it from clients; POP3 (TCP 110) and IMAP (TCP 143) let clients retrieve it. The domain's public MX record tells the rest of the internet where to deliver mail for that domain.$q$),

('a1-f-348','aplus1',2,'2.4','core',
 $q$What is a syslog server, and why centralise logs at all?$q$,
 $q$A host that receives log messages pushed to it by network devices and servers, traditionally on UDP 514. Centralising means logs survive the failure or compromise of the device that produced them, can be correlated across systems during troubleshooting, and can be retained to satisfy compliance rules.$q$),

('a1-f-349','aplus1',2,'2.4','core',
 $q$What does a web server do?$q$,
 $q$It serves web content over HTTP (TCP 80) and HTTPS (TCP 443) to browsers and applications, either internally for an intranet or publicly for a website. Common software is IIS on Windows and Apache or nginx on Linux.$q$),

('a1-f-350','aplus1',2,'2.4','core',
 $q$What are the three A's in an AAA server?$q$,
 $q$Authentication - proving who the user or device is. Authorisation - deciding what they may access, such as which VLAN or which commands. Accounting - recording session start, stop and usage. RADIUS and TACACS+ are the common implementations, used heavily for wireless and VPN logins.$q$),

('a1-f-351','aplus1',2,'2.4','core',
 $q$What is a proxy server, and what does it give you?$q$,
 $q$A middleman that fetches internet content on behalf of clients. Benefits: caching frequently requested pages to save bandwidth, URL and category content filtering, per-user browsing logs, and hiding internal client addresses from the sites being visited.$q$),

('a1-f-352','aplus1',2,'2.4','core',
 $q$What is a load balancer, and what does a health check do?$q$,
 $q$It distributes incoming connections across a pool of identical back-end servers so no single one is overloaded, providing both scale and availability. Health checks continuously probe each pool member and pull a failed or unhealthy server out of rotation automatically, so users are never sent to a dead node.$q$),

('a1-f-353','aplus1',2,'2.4','core',
 $q$What is a spam gateway, and where is it placed?$q$,
 $q$An appliance or cloud service that inspects inbound email for spam, phishing and malware before delivery. The domain's MX records point at the gateway rather than at the mail server, so unwanted mail is quarantined or dropped at the perimeter instead of reaching mailboxes.$q$),

('a1-f-354','aplus1',2,'2.4','core',
 $q$What is a UTM appliance, and what is the trade-off?$q$,
 $q$Unified threat management: one box combining firewall, intrusion prevention, gateway antivirus and content filtering, often with VPN and spam filtering too, all from a single console. Ideal for small sites with no security team; the trade-off is a single point of failure and a throughput drop once every inspection engine is switched on.$q$),

('a1-f-355','aplus1',2,'2.4','core',
 $q$Which four internet appliances does Core 1 expect you to recognise?$q$,
 $q$Spam gateway - filters inbound mail at the perimeter. Unified threat management - all-in-one security box. Load balancer - spreads incoming traffic across a pool of servers and health-checks them. Proxy server - fetches, caches and filters web content on behalf of clients.$q$),

('a1-f-356','aplus1',2,'2.4','core',
 $q$What is SCADA, and how does it relate to ICS?$q$,
 $q$Supervisory control and data acquisition: the software and network layer that lets operators monitor and control an industrial control system (ICS) - the PLCs, RTUs and sensors driving pumps, valves, conveyors and power equipment. Operators work through an HMI, often across widely separated sites.$q$),

('a1-f-357','aplus1',2,'2.4','core',
 $q$How do you protect a legacy or embedded system that cannot be patched?$q$,
 $q$Compensating controls: put it on its own VLAN or a physically separate network, permit only the specific traffic it needs through a firewall, remove internet access, restrict administrative access to a jump host, monitor it closely and control removable media. Replacement remains the real fix once budget allows.$q$),

('a1-f-358','aplus1',2,'2.4','core',
 $q$What is an embedded system, and where do you meet them?$q$,
 $q$A purpose-built computer built into a larger device, running fixed firmware or a stripped-down OS with no general-purpose use: thermostats, medical infusion pumps, point-of-sale kiosks, CNC controllers, building access panels and IP cameras. They are network-attached but rarely patched, which is why they get segmented.$q$),

('a1-f-359','aplus1',2,'2.4','acronym',
 $q$UTM$q$,
 $q$Unified Threat Management - a single appliance combining firewall, intrusion prevention, antivirus, content filtering and often VPN, aimed at small sites.$q$);
