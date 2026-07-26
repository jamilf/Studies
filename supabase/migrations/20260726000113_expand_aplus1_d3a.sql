-- A+ Core 1 (220-1101) Domain 3 expansion, part A: objectives 3.1-3.3.
-- Adds questions a1-q-500..536 (37) and flashcards a1-f-500..545 (46), topping
-- each objective up to 33 total items:
--   3.1 Cables & connectors   -> 12 questions, 15 flashcards
--   3.2 RAM types & configs   -> 13 questions, 16 flashcards
--   3.3 Storage devices       -> 12 questions, 15 flashcards
-- Acronym-deck note: NVMe (a1-a-005) and SO-DIMM (a1-a-006) already exist as
-- pure-expansion cards, so this file uses HDMI, eSATA, DIMM, ECC, SATA and SSD
-- for its six acronym cards rather than duplicating them.

insert into public.questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ===================== 3.1 Cables and connectors =====================

('a1-q-500','aplus1',3,'3.1','mcq',2,
 $q$A technician must run new Ethernet drops through the space above a suspended ceiling that the building uses to return HVAC air. Which cable specification does fire code require for that run?$q$,
 $q$["Plenum-rated cable with a fire-retardant, low-smoke jacket","Direct burial cable with a gel-filled waterproof jacket","Standard PVC-jacketed riser cable","Shielded twisted pair with a grounded drain wire"]$q$::jsonb,
 '0'::jsonb,
 $q$A ceiling void used to return air is a plenum, so cable run through it must have a fire-retardant jacket (typically FEP) that produces little smoke when it burns. Standard PVC-jacketed cable is the tempting cheap answer, but burning PVC releases dense toxic smoke that the air handler would distribute through the whole building, which is exactly why code prohibits it there. Direct burial addresses moisture underground and STP addresses electrical interference; neither is a fire rating.$q$),

('a1-q-501','aplus1',3,'3.1','mcq',3,
 $q$Ethernet drops that run alongside fluorescent light ballasts and a motor room show intermittent errors and heavy retransmissions. Which cabling change best addresses the cause?$q$,
 $q$["Replace the runs with a longer Cat5e patch cable to reduce tension on the plugs","Replace the runs with shielded twisted pair and bond the shield to ground at the patch panel","Replace the RJ45 plugs with RJ11 plugs","Switch to plenum-rated cable of the same category"]$q$::jsonb,
 '1'::jsonb,
 $q$Motors and fluorescent ballasts radiate electromagnetic interference that couples into unshielded pairs; STP wraps the pairs in foil or braid that drains that noise away, but only when the shield is bonded to ground at the termination. An ungrounded shield is the classic mistake because it then acts as an antenna and can make errors worse. Plenum rating describes only the jacket material burn behaviour and adds no shielding, and RJ11 is a 6-position telephone jack that cannot carry Ethernet at all.$q$),

('a1-q-502','aplus1',3,'3.1','mcq',1,
 $q$A cable-internet modem must be connected to the coaxial wall outlet the ISP provisioned. Which cable and connector pair is correct?$q$,
 $q$["Cat6 twisted pair with RJ45 connectors","RG-59 coaxial with BNC bayonet connectors","Multi-mode fiber with LC connectors","RG-6 coaxial with threaded F-type connectors"]$q$::jsonb,
 '3'::jsonb,
 $q$Residential cable TV and cable broadband use RG-6 coax terminated with the threaded F-type connector that screws onto the wall plate. RG-59 with BNC is the near-miss: it is also coax, but it is thinner, has higher signal loss, and survives today mainly on short legacy CCTV runs rather than ISP drops. The Cat6/RJ45 cable connects the modem to the router, not the modem to the wall.$q$),

('a1-q-503','aplus1',3,'3.1','mcq',2,
 $q$A fiber patch panel must fit roughly twice as many ports in the same rack space as the existing panel. Which connector should the technician specify?$q$,
 $q$["SC, a square push-pull connector","LC, a small form factor connector with a latching duplex clip","ST, a round bayonet twist-lock connector","F-type, a threaded connector"]$q$::jsonb,
 '1'::jsonb,
 $q$LC is the small form factor fiber connector, roughly half the footprint of SC, which is why it dominates high-density patch panels and SFP transceivers. SC is the tempting answer because it is also a modern duplex push-pull connector, but its larger ferrule and body are exactly what limits port density. ST is an older, larger bayonet design, and F-type is a coaxial connector, not fiber.$q$),

('a1-q-504','aplus1',3,'3.1','mcq',3,
 $q$A user connects a laptop to an external monitor with a USB-C to DisplayPort cable and gets no picture, although the same cable and monitor work from a colleague's laptop. What should the technician verify first?$q$,
 $q$["That the monitor cable is rated Cat6a","That the laptop USB-C port can supply at least 100 W","That the laptop USB-C port supports DisplayPort Alternate Mode","That the cable run is under 15 meters"]$q$::jsonb,
 '2'::jsonb,
 $q$USB-C is only a connector shape; carrying video requires the port to implement DisplayPort Alternate Mode or Thunderbolt, and many USB-C ports are data and charging only while looking physically identical. The wattage option is the seductive distractor because USB Power Delivery does share the same connector, but PD governs charging and has no bearing on whether video is routed. Cat6a is a network cable rating, and DisplayPort runs are far shorter than 15 m regardless.$q$),

('a1-q-505','aplus1',3,'3.1','mcq',2,
 $q$A technician attaches a 3.5-inch external drive enclosure to a workstation with an eSATA cable, and the drive never spins up. What is the most likely reason?$q$,
 $q$["eSATA cables are limited to 0.5 meters, so the run is too long","eSATA requires a Molex-to-eSATA adapter at the host end","eSATA is a video interface and cannot carry storage data","eSATA carries data only, so the enclosure needs its own power source"]$q$::jsonb,
 '3'::jsonb,
 $q$eSATA is an external extension of the SATA data interface and, unlike USB, supplies no bus power, so any eSATA enclosure needs a separate power adapter. Cable length is the tempting distractor because eSATA is indeed distance-limited, but the limit is about 2 m, not half a metre, and an over-length cable would produce errors rather than a completely dead drive. eSATA is a storage interface, so the video option is simply wrong.$q$),

('a1-q-506','aplus1',3,'3.1','multi',1,
 $q$A technician is briefing a user on the capabilities of the USB-C port on a new laptop. Select the TWO accurate statements.$q$,
 $q$["The connector is reversible, so it can be inserted either way up","A port that implements USB Power Delivery can charge the laptop over that same connector","USB-C guarantees Thunderbolt transfer speeds on every device that uses it","Every USB-C port outputs video to an external display","USB-C is a proprietary Apple connector"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$USB-C defines a reversible 24-pin connector, and ports implementing USB Power Delivery can both draw and supply charging power over it. The speed and video options are the traps: USB-C is a connector, not a protocol guarantee, so a USB-C port may run at USB 2.0 speeds, and video output requires DisplayPort Alternate Mode or Thunderbolt support that not every port has. USB-C is an open industry standard used across all major vendors.$q$),

('a1-q-507','aplus1',3,'3.1','multi',2,
 $q$A user wants one cable to send both video and audio from a PC to a television. Select the TWO interfaces that can carry audio and video over a single cable.$q$,
 $q$["HDMI","DisplayPort","VGA","DVI-D single link","PS/2"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$HDMI and DisplayPort are digital interfaces that transport multi-channel audio alongside the video stream. DVI is the distractor most likely to catch someone, because it is digital and physically similar to HDMI, but standard DVI-D carries video only, which is why a DVI-to-HDMI adapter still needs a separate audio connection. VGA is analog video only, and PS/2 is a legacy keyboard and mouse connector.$q$),

('a1-q-508','aplus1',3,'3.1','matching',2,
 $q$Match each connector to the signal or service it carries.$q$,
 $q${"left":["RJ11","F-type","LC","Molex","DB9"],"right":["Fiber optic light signal","Legacy 4-pin DC power to drives and fans","Analog telephone or DSL line","RS-232 serial console connection","Coaxial cable TV or broadband signal"]}$q$::jsonb,
 '[2,4,0,1,3]'::jsonb,
 $q$RJ11 is the 6-position jack on analog phone and DSL lines, easily confused with the wider 8-position RJ45 used for Ethernet. F-type screws onto RG-6 or RG-59 coax for TV and broadband. LC is a small form factor fiber connector. Molex is the legacy 4-pin peripheral power connector for older drives and fans. DB9 is the 9-pin D-subminiature serial connector still used for console access to switches, routers, and UPS units.$q$),

('a1-q-509','aplus1',3,'3.1','ordering',3,
 $q$Place the steps for terminating and commissioning a new Cat6 wall drop in the correct order.$q$,
 $q$["Punch the individual conductors down onto the keystone jack following the T568B color code","Pull the Cat6 cable from the patch panel to the wall box, leaving service slack","Strip the outer jacket and untwist only as much of each pair as termination requires","Snap the terminated keystone into the faceplate and label both ends of the run","Verify the run end to end with a cable tester for continuity and correct pinout"]$q$::jsonb,
 '[1,2,0,3,4]'::jsonb,
 $q$The run is pulled first with slack for future re-termination, then the jacket is stripped with minimal untwist because excess untwist raises crosstalk, then the conductors are punched down to the chosen T568 pattern, then the jack is mounted and both ends labeled, and finally a cable tester confirms continuity and pin mapping before handover. Testing earlier is the common wrong instinct, but a tester needs both ends terminated before it can report a pinout at all.$q$),

('a1-q-510','aplus1',3,'3.1','mcq',1,
 $q$A technician installs a 3.5-inch SATA hard drive, attaches the narrow flat cable between the drive and the motherboard, and finds the drive is still not detected. Which additional connection is required?$q$,
 $q$["A second 7-pin SATA data cable to supply power","A 15-pin SATA power connector from the power supply","A 40-pin IDE ribbon cable to the drive","A Molex-to-eSATA adapter"]$q$::jsonb,
 '1'::jsonb,
 $q$SATA splits the connections in two: a 7-pin data cable to the motherboard port and a separate wider 15-pin power connector from the PSU. The data cable delivers no power, so a drive with only data attached never spins up. A second data cable cannot substitute for power, IDE ribbon cables belong to PATA drives and physically will not fit a SATA drive, and eSATA is for external connections.$q$),

('a1-q-511','aplus1',3,'3.1','mcq',2,
 $q$A video editor needs one port that can drive high-resolution displays, connect an external PCIe expansion enclosure, and daisy-chain several devices. Which interface should the technician recommend?$q$,
 $q$["Thunderbolt 3 or 4 over a USB-C connector","USB 2.0 Micro-B","DVI-I dual link","A DB9 serial port"]$q$::jsonb,
 '0'::jsonb,
 $q$Thunderbolt 3 and 4 use the USB-C connector, run at 40 Gbps, and tunnel both PCIe and DisplayPort, which is what makes daisy chaining and external GPU or PCIe enclosures possible. DVI-I dual link is the tempting choice for a display-heavy workflow, but it carries video only, cannot daisy chain, and cannot transport PCIe. USB 2.0 Micro-B tops out at 480 Mbps and DB9 serial is a low-speed management port.$q$),

-- ===================== 3.2 RAM types and configurations =====================

('a1-q-512','aplus1',3,'3.2','mcq',1,
 $q$A technician is ordering DDR4 memory for an all-in-one PC and for a small-form-factor mini PC. Which module form factor should be ordered?$q$,
 $q$["Full-size DIMM, since DDR4 modules come in one standard length","SODIMM, the shorter 260-pin module used in laptops, all-in-ones, and many mini PCs","Either one, because DDR4 SODIMMs and DIMMs share the same slot","A DDR4 DIMM fitted with an adapter bracket"]$q$::jsonb,
 '1'::jsonb,
 $q$Compact systems - laptops, all-in-ones, mini PCs, and most NAS units - use the physically shorter SODIMM, which for DDR4 has 260 pins against a desktop DIMM's 288. The interchangeability options are the trap: the two form factors differ in both length and pin count, no slot accepts both, and no adapter bracket makes a full-length DIMM fit a SODIMM socket.$q$),

('a1-q-513','aplus1',3,'3.2','mcq',2,
 $q$A DDR4 module roughly lines up with a motherboard memory slot but will not seat even under firm pressure. What does this indicate?$q$,
 $q$["The module must be enabled in BIOS before it will physically seat","The module is ECC, and ECC modules are physically longer than the slot","The slot is keyed for a different DDR generation, whose notch sits in a different position","Desktop DIMMs must be inserted at a 45-degree angle first"]$q$::jsonb,
 '2'::jsonb,
 $q$Each DDR generation deliberately places the module key notch in a different position so a module cannot be forced into a slot whose memory controller cannot drive it - DDR4 and DDR5 even share 288 pins and are separated mainly by notch position and electrical design. A BIOS setting cannot alter physical keying, ECC modules are the same physical length as non-ECC ones, and only SODIMM sockets use angled insertion; desktop DIMMs press straight down.$q$),

('a1-q-514','aplus1',3,'3.2','mcq',3,
 $q$A motherboard has four DIMM slots labeled A1, A2, B1, and B2, and the manual says to populate A2 and B2 first. A technician instead installs two matched modules in A1 and A2. What is the most likely result?$q$,
 $q$["The system will not POST at all","The modules will be reported at half their rated capacity","The system runs in quad-channel mode","The system runs in single-channel mode with roughly half the memory bandwidth"]$q$::jsonb,
 '3'::jsonb,
 $q$A1 and A2 sit on the same memory channel, so filling both leaves channel B empty and the platform falls back to single channel: the system boots and reports full capacity but loses about half its memory bandwidth, which shows up most on systems using integrated graphics. A failure to POST is the tempting answer, but wrong slot order is a performance problem, not a compatibility fault, and capacity reporting is unaffected by channel mode.$q$),

('a1-q-515','aplus1',3,'3.2','mcq',3,
 $q$A file server must detect and correct single-bit memory errors automatically rather than risk silent data corruption. What must the technician confirm before ordering the memory?$q$,
 $q$["That the modules are rated at the highest clock speed available","That the operating system has the pagefile disabled","That the CPU and the motherboard chipset both support ECC memory","That the modules will be installed in single-channel mode"]$q$::jsonb,
 '2'::jsonb,
 $q$ECC only works when the platform implements it: many consumer CPUs and chipsets either reject ECC modules or accept them with correction silently disabled, leaving the extra parity chip doing nothing. Buying the fastest modules is the plausible-sounding distractor, but clock speed governs throughput, not error correction; pagefile settings concern virtual memory and channel mode concerns bandwidth.$q$),

('a1-q-516','aplus1',3,'3.2','mcq',2,
 $q$A technician adds a DDR4-3200 module to a system that already contains a DDR4-2666 module of the same capacity. Assuming both are recognized, at what speed will the memory operate?$q$,
 $q$["3200, the speed of the fastest installed module","2666, the speed of the slowest installed module","The numeric average of the two speeds","Each module runs independently at its own rated speed"]$q$::jsonb,
 '1'::jsonb,
 $q$All modules on the bus share one memory clock, so the controller drops to the slowest common supported speed - 2666 here. Expecting the faster module to pull the system up is the natural but wrong intuition; likewise memory cannot be averaged or clocked per module. This is why memory is sold in matched kits and why adding a faster stick to an older one yields no gain.$q$),

('a1-q-517','aplus1',3,'3.2','mcq',2,
 $q$A workstation with 8 GB of RAM slows to a crawl and its drive activity light stays lit whenever several large applications are open at once. Which explanation best fits?$q$,
 $q$["The RAM modules have dropped out of dual-channel mode","The pagefile was moved onto an SSD, which slows access","ECC error correction is consuming memory bandwidth","The system is paging heavily to virtual memory on disk because physical RAM is exhausted"]$q$::jsonb,
 '3'::jsonb,
 $q$When physical RAM runs out, the OS moves inactive pages to the pagefile on disk; since even an SSD is orders of magnitude slower than RAM, the result is constant drive activity and severe sluggishness, a state called thrashing whose real fix is more physical memory. Losing dual channel is the tempting distractor because it does cut bandwidth, but it never produces sustained disk activity, and moving a pagefile onto an SSD makes paging faster, not slower.$q$),

('a1-q-518','aplus1',3,'3.2','mcq',1,
 $q$Which description correctly matches a desktop DDR4 DIMM?$q$,
 $q$["288 pins operating at roughly 1.2 V","240 pins operating at roughly 1.5 V","204 pins operating at roughly 1.35 V","288 pins operating at roughly 1.1 V"]$q$::jsonb,
 '0'::jsonb,
 $q$DDR4 desktop DIMMs carry 288 pins at about 1.2 V. The 288-pin, 1.1 V option is the deliberate trap: that is DDR5, which shares DDR4's pin count but sits at lower voltage with a different notch position and is not interchangeable. 240 pins at 1.5 V describes DDR3, and 204 pins describes a DDR3 SODIMM.$q$),

('a1-q-519','aplus1',3,'3.2','mcq',2,
 $q$A high-end workstation platform advertises quad-channel memory support. What does a technician gain by populating all four channels with matched modules?$q$,
 $q$["Four times the maximum memory capacity the platform supports","Four times the memory bus width, and therefore substantially more memory bandwidth","Automatic error correction across the four modules","The ability to mix DDR4 and DDR5 modules in one system"]$q$::jsonb,
 '1'::jsonb,
 $q$Channel count multiplies the width of the path between the memory controller and the modules, so quad channel quadruples bandwidth relative to single channel; it is purely a throughput feature. Capacity is the appealing wrong answer, but the maximum is set by the chipset, CPU, and slot count regardless of channel mode. Error correction requires ECC modules plus platform support, and DDR generations can never be mixed.$q$),

('a1-q-520','aplus1',3,'3.2','multi',2,
 $q$A technician is comparing DDR5 to DDR4 for a new build. Select the TWO accurate statements.$q$,
 $q$["DDR5 runs at a lower module voltage, around 1.1 V against roughly 1.2 V for DDR4","DDR5 moves voltage regulation onto the module itself using an on-board power management IC","A DDR5 module will seat in a DDR4 slot once the BIOS is updated","DDR5 and DDR4 modules can share a system as long as their rated speeds match","DDR5 desktop modules use 240 pins"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$DDR5 lowers module voltage to about 1.1 V and relocates power regulation from the motherboard onto the module through an on-module PMIC. The compatibility options are the trap: a BIOS update cannot change physical keying or the memory controller built into the CPU, so DDR5 cannot seat in a DDR4 slot and the two generations can never coexist. DDR5 desktop modules have 288 pins, the same count as DDR4, which is precisely why notch position matters.$q$),

('a1-q-521','aplus1',3,'3.2','multi',3,
 $q$A newly installed pair of 8 GB DIMMs is only partly recognized: the system reports 8 GB rather than 16 GB. Select the TWO most appropriate checks.$q$,
 $q$["Reseat both modules and confirm the retention clips snap fully closed at each end","Confirm the motherboard and CPU support both the total capacity and the per-slot module density installed","Disable the pagefile so Windows reports all physical memory","Replace the modules with ECC versions","Force the modules into single-channel mode"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$A partially seated module is the single most common cause of missing capacity, so reseating until both clips latch comes first; after that, verify the board and CPU support the total and the density of each module, because older platforms cap per-slot density even when total capacity looks fine. Disabling the pagefile is the plausible-looking trap, but the pagefile is virtual memory and has nothing to do with how much physical RAM is detected. ECC is unrelated to capacity reporting, and forcing single channel would only cost bandwidth.$q$),

('a1-q-522','aplus1',3,'3.2','multi',2,
 $q$A technician wants a desktop to run its memory in dual-channel mode. Select the TWO conditions that must be satisfied.$q$,
 $q$["Modules must occupy slots belonging to two different channels, as identified in the motherboard manual","The modules should be a matched pair of the same capacity and speed, ideally from one kit","All four DIMM slots must be populated","The modules must be ECC","Dual channel must be enabled with a jumper on the drive controller"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$Dual channel needs one module on each of two channels - usually the matching-coloured slot pair, often A2 and B2 - and behaves most reliably with a matched pair, which is why memory ships in kits. Populating all four slots is the tempting requirement to assume, but two modules in the right slots are enough, and filling all four can even force a lower speed on some boards. ECC is unrelated to channel mode, and no jumper is involved.$q$),

('a1-q-523','aplus1',3,'3.2','matching',2,
 $q$Match each memory term to its defining detail.$q$,
 $q${"left":["DDR3 desktop DIMM","DDR4 SODIMM","DDR5 desktop DIMM","ECC memory","Virtual memory"],"right":["Adds bits that detect and correct single-bit errors, requiring CPU and chipset support","240 pins at about 1.5 V","Disk space the OS uses as overflow when physical RAM is exhausted","260 pins in the shorter laptop form factor","288 pins at about 1.1 V with an on-module power management IC"]}$q$::jsonb,
 '[1,3,4,0,2]'::jsonb,
 $q$DDR3 desktop modules use 240 pins at roughly 1.5 V, while a DDR4 SODIMM has 260 pins in the short laptop form factor. DDR5 keeps DDR4's 288-pin count but drops to about 1.1 V and adds an on-module PMIC. ECC uses extra bits to correct single-bit errors and works only on platforms that support it. Virtual memory is disk-backed overflow, not a module type at all.$q$),

('a1-q-524','aplus1',3,'3.2','mcq',3,
 $q$A user with a five-year-old desktop asks whether DDR5 modules can be dropped in to speed it up. The board's slots hold DDR4. What is the correct advice?$q$,
 $q$["The memory generation is fixed by the motherboard and the CPU memory controller, so DDR5 would require a new board and CPU","The DDR5 modules will work but will be limited to DDR4 speeds","A DDR5-to-DDR4 slot adapter can be fitted","The DDR5 modules will work once the BIOS is updated to the latest version"]$q$::jsonb,
 '0'::jsonb,
 $q$The memory controller lives inside the CPU and the slot keying is fixed on the board, so a DDR4 platform can only ever run DDR4; moving generations means a new motherboard and CPU together. "Works at reduced speed" is the most tempting distractor because that really is how mixed-speed modules of the same generation behave, but it never applies across generations - and no passive adapter or firmware update can bridge different signalling and keying.$q$),

-- ===================== 3.3 Storage devices =====================

('a1-q-525','aplus1',3,'3.3','mcq',3,
 $q$A technician fits an M.2 SATA SSD into a laptop's empty M.2 slot. The drive is physically secure and screwed down, but UEFI does not list it. The board documentation states the slot is PCIe/NVMe only. What is the correct action?$q$,
 $q$["Reformat the drive as NTFS on another machine and reinstall it","Enable AHCI mode so the NVMe slot will accept the SATA drive","Fit a longer standoff so the drive seats deeper in the slot","Replace the drive with an M.2 NVMe model matching the protocol the slot supports"]$q$::jsonb,
 '3'::jsonb,
 $q$M.2 is a form factor only; a given socket routes SATA signalling, PCIe/NVMe signalling, or both, and a B+M keyed SATA drive can seat perfectly in an M-keyed socket while remaining electrically dead because the SATA lanes simply are not wired. Changing the AHCI/NVMe setting is the tempting fix, but a firmware toggle cannot create signalling the slot does not carry. Formatting is irrelevant when UEFI cannot see the device at all.$q$),

('a1-q-526','aplus1',3,'3.3','mcq',2,
 $q$A motherboard datasheet lists support for M.2 2242, 2260, and 2280 drives. What do those numbers describe?$q$,
 $q$["The maximum sequential read speed in hundreds of MB/s","The width and the length of the module in millimeters","The number of PCIe lanes and the PCIe generation","The capacity tier and endurance rating"]$q$::jsonb,
 '1'::jsonb,
 $q$The code is purely dimensional: the first two digits are the width in millimeters (22 mm on essentially all consumer drives) and the remaining digits are the length, so 2280 is 22 mm by 80 mm and 22110 is 22 mm by 110 mm. Lane count is the plausible-sounding alternative, but that is quoted separately as, for example, PCIe 4.0 x4; neither speed nor capacity is encoded in the form factor number.$q$),

('a1-q-527','aplus1',3,'3.3','mcq',2,
 $q$A user wants a high-capacity internal drive for a home media archive, and cares most about cost per terabyte, quiet operation, and low heat output. Which drive should the technician recommend?$q$,
 $q$["A 3.5-inch 5,400 RPM hard drive","A 3.5-inch 15,000 RPM SAS drive","A 2.5-inch 7,200 RPM hard drive","An M.2 NVMe SSD"]$q$::jsonb,
 '0'::jsonb,
 $q$Lower spindle speed means less noise, heat, and power draw, and 3.5-inch 5,400 RPM drives offer the best cost per terabyte for bulk archival storage where sustained throughput matters more than seek times. The 15,000 RPM SAS drive is the trap for anyone who reads "high capacity" as "high performance": enterprise drives are loud, hot, expensive per terabyte, and usually need a dedicated controller. NVMe is dramatically faster but costs many times more per terabyte.$q$),

('a1-q-528','aplus1',3,'3.3','mcq',1,
 $q$A technician must replace the failed drive in a standard laptop that uses a drive bay rather than an M.2 slot. Which internal drive form factor should be ordered?$q$,
 $q$["3.5-inch","2.5-inch","5.25-inch","M.2 2280"]$q$::jsonb,
 '1'::jsonb,
 $q$Laptop drive bays are built for 2.5-inch drives, which are also used in small-form-factor desktops and enterprise chassis. 3.5-inch is the desktop and NAS size and physically will not fit a laptop, 5.25-inch is the optical drive bay size, and M.2 2280 would be correct only if the laptop had an M.2 slot, which the scenario explicitly rules out.$q$),

('a1-q-529','aplus1',3,'3.3','mcq',2,
 $q$A technician needs to burn a 20 GB archive to a single optical disc. Which media is required?$q$,
 $q$["CD-R, which holds about 700 MB","DVD-R single layer, which holds 4.7 GB","DVD-R dual layer, which holds 8.5 GB","Blu-ray recordable, which holds 25 GB on a single layer"]$q$::jsonb,
 '3'::jsonb,
 $q$Only Blu-ray reaches 25 GB on a single layer (50 GB dual layer), so it is the only format that holds 20 GB on one disc. Dual-layer DVD at 8.5 GB is the near-miss that catches people who remember only that dual layer roughly doubles capacity - it is still far short. Single-layer DVD holds 4.7 GB and a CD about 700 MB.$q$),

('a1-q-530','aplus1',3,'3.3','mcq',2,
 $q$A camera's manual states that it supports SDHC cards but not SDXC. What practical limit does this impose?$q$,
 $q$["Cards will be limited to a maximum read speed of 32 MB/s","Only microSD cards may be used, not full-size SD","Cards larger than 32 GB will not be usable, because SDHC tops out at 32 GB","The card must be formatted as NTFS before use"]$q$::jsonb,
 '2'::jsonb,
 $q$The SD capacity classes are the constraint: original SD reaches 2 GB, SDHC reaches 32 GB, and SDXC covers everything above that up to 2 TB, so an SDHC-only host cannot address an SDXC card. The speed option is the tempting misread, but transfer rate is described separately by speed class and UHS ratings, and physical size (full-size, mini, micro) is independent of the capacity class entirely.$q$),

('a1-q-531','aplus1',3,'3.3','mcq',3,
 $q$A technician replaces a 7,200 RPM hard drive with a 2.5-inch SATA SSD. The user asks why benchmarks show about 550 MB/s rather than the multi-gigabyte figures advertised for SSDs. What is the correct explanation?$q$,
 $q$["The SATA III interface itself caps throughput at roughly 6 Gbps, about 550-600 MB/s after protocol overhead","The SSD is defective and should be replaced under warranty","The drive needs to be defragmented before it reaches full speed","The drive is running in single-channel mode"]$q$::jsonb,
 '0'::jsonb,
 $q$A SATA SSD is limited by its interface rather than its flash: SATA III's 6 Gbps signalling leaves roughly 550-600 MB/s of usable throughput, so multi-gigabyte figures require an NVMe drive on PCIe lanes. Assuming a defect is the tempting conclusion, but this is textbook normal behaviour. Defragmentation is unnecessary and actively harmful on an SSD, and channel modes describe RAM, not drives.$q$),

('a1-q-532','aplus1',3,'3.3','mcq',3,
 $q$An older ultrabook has an mSATA slot. What limitation should the technician explain before sourcing a replacement drive?$q$,
 $q$["mSATA drives are capped at 128 GB by the standard","mSATA drives require an external power connector","mSATA is a parallel interface and needs a ribbon cable","mSATA carries the SATA protocol only, so no drive fitted to it can reach NVMe speeds"]$q$::jsonb,
 '3'::jsonb,
 $q$mSATA borrows the mini PCIe card shape but carries SATA signalling only, so it hits the same roughly 600 MB/s ceiling as any SATA SSD - M.2 replaced it largely because M.2 sockets can also carry PCIe/NVMe. Assuming a capacity cap is the plausible-sounding trap, but the standard imposes none. The slot supplies power directly, and SATA is a serial interface with no ribbon cable.$q$),

('a1-q-533','aplus1',3,'3.3','mcq',1,
 $q$A field technician's laptop is repeatedly dropped and jostled in a service vehicle. Which storage choice best reduces the risk of data loss from physical shock?$q$,
 $q$["A 7,200 RPM hard drive, which spins fast enough to resist head crashes","A hybrid drive, whose flash cache absorbs impact","An SSD, which has no moving heads or platters to damage","A 3.5-inch hard drive, whose larger platters are more stable"]$q$::jsonb,
 '2'::jsonb,
 $q$SSDs store data in NAND flash with no moving parts, so vibration and drops cannot cause a head crash - alongside lower power draw and silent operation, this is why mobile and rugged systems moved to flash. The hybrid option is the tempting middle ground, but a hybrid drive still contains a spinning platter and moving head assembly; the cache only speeds up frequently read data. Higher spindle speed and bigger platters increase, not reduce, shock damage.$q$),

('a1-q-534','aplus1',3,'3.3','multi',2,
 $q$A technician is explaining why an NVMe SSD outperforms a SATA SSD. Select the TWO accurate statements.$q$,
 $q$["NVMe drives connect over PCIe lanes rather than a single SATA channel, giving far higher bandwidth","NVMe is a protocol designed around flash, using many deep command queues where AHCI/SATA uses one shallow queue","NVMe drives always use the M.2 form factor and appear in no other shape","NVMe drives need no driver or firmware of any kind","NVMe drives never wear out because they do not use NAND flash"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$NVMe wins on both the transport and the protocol: PCIe lanes replace the single 6 Gbps SATA link, and NVMe swaps AHCI's one shallow command queue for many deep queues suited to parallel flash access. The form factor claim is the tempting distractor, since M.2 NVMe is what most technicians see, but NVMe also ships as U.2 drives and PCIe add-in cards. NVMe drives do use drivers and do use NAND flash, which wears with writes.$q$),

('a1-q-535','aplus1',3,'3.3','multi',3,
 $q$Before ordering an M.2 SSD for a specific motherboard, select the TWO compatibility details the technician must confirm.$q$,
 $q$["Whether the socket supports SATA signalling, PCIe/NVMe signalling, or both","The maximum module length the socket and standoff positions accommodate, such as 2280 or 22110","Whether the drive is formatted exFAT or NTFS","Whether the drive is rated 5,400 or 7,200 RPM","Whether the drive includes a 15-pin SATA power connector"]$q$::jsonb,
 '[0,1]'::jsonb,
 $q$The two genuine fit questions for M.2 are protocol and physical length: a SATA-only socket cannot run an NVMe drive and an NVMe-only socket cannot run an M.2 SATA drive, and the standoff position sets which lengths will mount. File system is chosen after installation, RPM applies only to spinning disks, and M.2 drives draw power through the socket edge connector rather than a separate 15-pin SATA power lead.$q$),

('a1-q-536','aplus1',3,'3.3','ordering',2,
 $q$Place the steps for installing a new internal SATA SSD and bringing it into service in the correct order.$q$,
 $q$["Create a partition and format the volume with a supported file system","Power the system down and disconnect it from mains power before opening the case","Mount the drive and connect both the 7-pin SATA data cable and the 15-pin SATA power connector","Assign a drive letter or mount point and verify the reported capacity in the OS","Boot and confirm UEFI/BIOS detects the drive on the expected port"]$q$::jsonb,
 '[1,2,4,0,3]'::jsonb,
 $q$Safety comes first: power down and unplug before opening the case. Then mount and cable the drive with both data and power, then boot and confirm firmware detection before touching the operating system. Only once UEFI reports the device does partitioning and formatting make sense, with drive letter assignment and a capacity check last. Jumping straight to formatting is the common misstep, because a drive the firmware cannot see will never appear in Disk Management at all.$q$);

insert into public.flashcards (id, cert, domain, objective, deck, front, back) values

-- ===================== 3.1 Cables and connectors =====================

('a1-f-500','aplus1',3,'3.1','core',
 $$Why does fire code require plenum-rated cable in air-handling spaces?$$,
 $$A plenum is any space used to circulate return air, such as the void above a suspended ceiling. Plenum cable uses a fire-retardant, low-smoke jacket (typically FEP) instead of PVC, because burning PVC releases dense toxic smoke that the HVAC system would distribute building-wide. It is a jacket fire rating, not a performance rating.$$),

('a1-f-501','aplus1',3,'3.1','core',
 $$What does direct burial cable have that ordinary UTP does not?$$,
 $$A rugged moisture-resistant jacket, often gel-filled and sometimes armored, so it survives being buried underground without conduit. Standard UTP degrades quickly from water ingress, soil chemistry, and rodent damage, so it must never be used for outdoor buried runs.$$),

('a1-f-502','aplus1',3,'3.1','core',
 $$When should STP be chosen over UTP, and what must be done for the shield to help?$$,
 $$Choose STP when runs pass near EMI sources such as motors, fluorescent ballasts, elevator equipment, or industrial machinery. The foil or braid shield must be bonded to ground at the termination point; an ungrounded shield acts as an antenna and can make interference worse than plain UTP.$$),

('a1-f-503','aplus1',3,'3.1','core',
 $$What is the difference between RG-6 and RG-59 coaxial cable?$$,
 $$RG-6 is thicker with better shielding and lower signal loss, used for cable TV, cable internet, and satellite runs. RG-59 is thinner and higher loss, surviving mainly on short legacy CCTV runs. RG-6 normally terminates with threaded F-type connectors; RG-59 often uses BNC.$$),

('a1-f-504','aplus1',3,'3.1','core',
 $$How do LC, SC, and ST fiber connectors differ?$$,
 $$LC is the small form factor connector with a latching clip, roughly half the size of SC, so it gives the highest port density and is standard on SFP transceivers. SC is a larger square push-pull connector. ST is the oldest of the three, a round bayonet twist-lock. The equipment port and required panel density decide which you use.$$),

('a1-f-505','aplus1',3,'3.1','core',
 $$What does the USB-C connector guarantee, and what does it not guarantee?$$,
 $$It guarantees only a reversible 24-pin physical connector. It does NOT guarantee transfer speed (a USB-C port may run at USB 2.0 rates), video output (which needs DisplayPort Alternate Mode), Thunderbolt support, or any particular charging wattage. Those are separate capabilities of the port behind the connector.$$),

('a1-f-506','aplus1',3,'3.1','core',
 $$What can Thunderbolt 3 or 4 do that a plain USB-C data port cannot?$$,
 $$Run at 40 Gbps and tunnel both PCIe and DisplayPort, which enables daisy-chaining several devices, driving multiple high-resolution displays, and connecting external GPU or PCIe enclosures. It uses the same USB-C connector, so look for the lightning-bolt icon beside the port to tell them apart.$$),

('a1-f-507','aplus1',3,'3.1','core',
 $$Which common video interfaces carry audio as well as video, and which do not?$$,
 $$HDMI and DisplayPort carry digital video plus multi-channel audio on one cable. VGA is analog video only. Standard DVI (including DVI-D) carries video only, which is why a DVI-to-HDMI adapter still needs a separate audio connection.$$),

('a1-f-508','aplus1',3,'3.1','core',
 $$What is the difference between DVI-A, DVI-D, and DVI-I, and between single and dual link?$$,
 $$DVI-A carries analog signals only, DVI-D digital only, and DVI-I carries both, which is why DVI-I can adapt passively to VGA while DVI-D cannot. Dual link populates a second set of data pins to support higher resolutions and refresh rates than single link.$$),

('a1-f-509','aplus1',3,'3.1','core',
 $$What throughput do USB 2.0, USB 3.0/3.2 Gen 1, and USB 3.2 Gen 2 deliver?$$,
 $$USB 2.0 Hi-Speed is 480 Mbps. USB 3.0, later renamed USB 3.1 Gen 1 and then USB 3.2 Gen 1, is 5 Gbps and is usually flagged by a blue port insert or SS marking. USB 3.2 Gen 2 is 10 Gbps. The retroactive renaming means the same drive may be labeled several different ways.$$),

('a1-f-510','aplus1',3,'3.1','core',
 $$How do the SATA data cable and the SATA power connector differ?$$,
 $$Data is a thin flat 7-pin cable running from the drive to a motherboard SATA port. Power is a wider 15-pin connector supplied by the PSU. Both are required - the data cable delivers no power, so a drive with only data attached never spins up and never appears in UEFI.$$),

('a1-f-511','aplus1',3,'3.1','core',
 $$How do you recognize a legacy PATA/IDE drive installation?$$,
 $$A wide 40-pin ribbon connector (80-conductor cable on UDMA drives), master/slave/cable-select jumpers on the drive itself, and a 4-pin Molex power connector. SATA replaced it with a 7-pin data cable, a 15-pin power connector, and no jumpers.$$),

('a1-f-512','aplus1',3,'3.1','core',
 $$What is a punchdown block used for, and which tool terminates it?$$,
 $$66 and 110 blocks, along with keystone jacks, terminate solid-core horizontal cable runs in the wiring closet or wall box. A punchdown tool seats each conductor into an insulation-displacement contact and trims the excess in one stroke, so no stripping of individual conductors is needed.$$),

('a1-f-513','aplus1',3,'3.1','acronym',
 $$HDMI$$,
 $$High-Definition Multimedia Interface. A single digital cable carrying video plus multi-channel audio to displays and TVs, with HDCP copy protection built in.$$),

('a1-f-514','aplus1',3,'3.1','acronym',
 $$eSATA$$,
 $$External Serial ATA. Connects an external drive enclosure at native SATA speed with no protocol translation; it carries data only, so the enclosure needs its own power supply.$$),

-- ===================== 3.2 RAM types and configurations =====================

('a1-f-515','aplus1',3,'3.2','core',
 $$How do DDR3, DDR4, and DDR5 desktop DIMMs differ in pin count and voltage?$$,
 $$DDR3: 240 pins at about 1.5 V (DDR3L 1.35 V). DDR4: 288 pins at about 1.2 V. DDR5: 288 pins at about 1.1 V with on-module power management. DDR4 and DDR5 share a pin count but place the key notch differently and are electrically incompatible.$$),

('a1-f-516','aplus1',3,'3.2','core',
 $$Why does each DDR generation place its key notch in a different position?$$,
 $$It is a physical interlock. The notch stops a module from seating in a slot whose memory controller cannot drive it, which matters most between DDR4 and DDR5 since they share 288 pins. If a module will not seat under normal pressure, the generation is wrong - never force it.$$),

('a1-f-517','aplus1',3,'3.2','core',
 $$How many pins do DDR3, DDR4, and DDR5 SODIMMs have?$$,
 $$DDR3 SODIMM 204 pins, DDR4 SODIMM 260 pins, DDR5 SODIMM 262 pins. All are physically shorter than the matching desktop DIMM and are found in laptops, all-in-ones, mini PCs, and many NAS units. SODIMM and DIMM slots never accept each other.$$),

('a1-f-518','aplus1',3,'3.2','core',
 $$What exactly does dual-channel memory double?$$,
 $$The width of the path between the memory controller and RAM - a 64-bit channel becomes an effective 128-bit path - so it doubles bandwidth, not capacity and not clock speed. It requires one module on each channel, normally the matching-coloured slot pair named in the manual (often A2 and B2).$$),

('a1-f-519','aplus1',3,'3.2','core',
 $$Where is quad-channel memory found, and what does it buy you?$$,
 $$High-end desktop, workstation, and server platforms. Populating all four channels with matched modules quadruples the memory bus width relative to single channel, which pays off in rendering, virtualization, scientific computing, and other bandwidth-hungry workloads.$$),

('a1-f-520','aplus1',3,'3.2','core',
 $$What happens if you install two matched modules into both slots of the same memory channel?$$,
 $$The system boots and reports full capacity, but runs in single-channel mode and loses roughly half its available bandwidth - most visible on systems using integrated graphics. Always follow the slot order in the manual to engage dual channel.$$),

('a1-f-521','aplus1',3,'3.2','core',
 $$What does ECC memory do that non-ECC cannot, and what does it require?$$,
 $$It detects and corrects single-bit errors on the fly and detects multi-bit errors, preventing silent data corruption on servers and workstations. It works only when the CPU and chipset support ECC; on a non-supporting board the module either will not run or runs with correction disabled.$$),

('a1-f-522','aplus1',3,'3.2','core',
 $$What is the difference between parity memory and ECC memory?$$,
 $$Parity can only detect that an error occurred, typically halting the system. ECC uses additional bits to detect AND correct single-bit errors so the workload continues uninterrupted. Most consumer memory is neither - it is non-parity, non-ECC.$$),

('a1-f-523','aplus1',3,'3.2','core',
 $$What is the difference between a UDIMM and an RDIMM?$$,
 $$An unbuffered DIMM (UDIMM) wires the memory controller straight to the DRAM chips. A registered DIMM (RDIMM) inserts a register/buffer that reduces electrical load, letting server boards drive far more modules per channel. They are not interchangeable - the platform dictates which type it accepts.$$),

('a1-f-524','aplus1',3,'3.2','core',
 $$What is virtual memory, and which symptom shows it is being overused?$$,
 $$Disk space (the pagefile or swap) that the OS uses as overflow when physical RAM is exhausted. Constant drive activity plus severe sluggishness whenever several applications are open indicates heavy paging, known as thrashing. The real fix is more physical RAM, not a bigger pagefile.$$),

('a1-f-525','aplus1',3,'3.2','core',
 $$At what speed does memory run when modules of different rated speeds are mixed?$$,
 $$At the slowest common supported speed, because all modules on the bus share one memory clock. Adding a faster module to a slower one gives no benefit, which is why memory is sold and validated as matched kits.$$),

('a1-f-526','aplus1',3,'3.2','core',
 $$What do XMP and EXPO memory profiles do?$$,
 $$They are pre-validated speed and timing profiles stored on the module - XMP on Intel platforms, EXPO on AMD. Enabling one in BIOS/UEFI runs the memory at its advertised rated speed; without it the module defaults to the slower JEDEC baseline, so a fast kit silently underperforms.$$),

('a1-f-527','aplus1',3,'3.2','core',
 $$A DIMM is installed but the system reports less RAM than expected. What do you check first?$$,
 $$Reseat the module until both retention clips snap closed, confirm the slot population order in the manual, and verify the board and CPU support that total capacity and that per-module density. Also check whether integrated graphics is reserving a block of system RAM.$$),

('a1-f-528','aplus1',3,'3.2','core',
 $$What does CAS latency measure, and does a lower number always mean faster memory?$$,
 $$It counts the clock cycles between a read request and the data becoming available. Lower is better only when comparing modules at the same clock speed - real latency is cycles divided by clock rate, so a faster module with a higher CL number can still respond more quickly overall.$$),

('a1-f-529','aplus1',3,'3.2','acronym',
 $$DIMM$$,
 $$Dual Inline Memory Module. The full-length desktop and server memory module with independent electrical contacts on each side of the board; the shorter laptop variant is the SODIMM.$$),

('a1-f-530','aplus1',3,'3.2','acronym',
 $$ECC$$,
 $$Error Correcting Code memory. Uses extra bits to detect and correct single-bit errors as data moves, protecting servers and workstations from silent corruption; requires CPU and chipset support to function.$$),

-- ===================== 3.3 Storage devices =====================

('a1-f-531','aplus1',3,'3.3','core',
 $$What does the M.2 specification define, and what does it deliberately leave open?$$,
 $$M.2 defines the card shape, the key notches, and the length options (2242, 2260, 2280, 22110). It does NOT define the protocol: a given socket may carry SATA signalling, PCIe/NVMe signalling, or both, so a drive and socket must match electrically as well as physically.$$),

('a1-f-532','aplus1',3,'3.3','core',
 $$How do you read an M.2 size code such as 2280?$$,
 $$The first two digits are the width in millimeters - 22 mm on essentially every consumer drive - and the remaining digits are the length. So 2280 is 22 x 80 mm, 2242 is 22 x 42 mm, and 22110 is 22 x 110 mm. The motherboard standoff position must match the length you buy.$$),

('a1-f-533','aplus1',3,'3.3','core',
 $$An M.2 SSD is screwed down firmly but never appears in UEFI. What is the likely cause?$$,
 $$Protocol mismatch: an M.2 SATA drive fitted to a PCIe/NVMe-only socket, or an NVMe drive in a SATA-only socket. A B+M keyed SATA drive physically fits an M-keyed socket, so a clean physical fit proves nothing - check the board manual for what each M.2 socket actually supports.$$),

('a1-f-534','aplus1',3,'3.3','core',
 $$What throughput ceiling does the SATA III interface impose, and why does it matter?$$,
 $$Roughly 6 Gbps of signalling, which leaves about 550-600 MB/s of real throughput after overhead. Every SATA SSD hits that wall no matter how fast its flash is, so a user expecting multi-gigabyte speeds needs an NVMe drive on PCIe lanes instead.$$),

('a1-f-535','aplus1',3,'3.3','core',
 $$What are the common HDD spindle speeds and their tradeoffs?$$,
 $$5,400 RPM: quiet, cool, low power, best cost per TB - laptops and bulk archives. 7,200 RPM: the desktop standard, faster but hotter and louder. 10,000 and 15,000 RPM: enterprise SAS drives with the fastest seek times but high cost, heat, noise, and low capacity per dollar.$$),

('a1-f-536','aplus1',3,'3.3','core',
 $$When is a 2.5-inch drive used instead of a 3.5-inch drive?$$,
 $$2.5-inch fits laptop bays, small-form-factor desktops, and enterprise chassis, and draws less power. 3.5-inch is the desktop and NAS size, delivering the highest capacity per drive and the lowest cost per terabyte. Fitting a 2.5-inch drive into a desktop bay usually needs an adapter bracket.$$),

('a1-f-537','aplus1',3,'3.3','core',
 $$What is mSATA, and why did M.2 replace it?$$,
 $$mSATA uses the mini PCIe card shape but carries SATA signalling only, capping it at SATA speeds around 600 MB/s. M.2 replaced it because M.2 offers multiple lengths and sockets that can carry PCIe/NVMe as well as SATA, so the same slot type can host far faster drives.$$),

('a1-f-538','aplus1',3,'3.3','core',
 $$What are the capacities of CD, DVD, and Blu-ray optical media?$$,
 $$CD about 700 MB. DVD 4.7 GB single layer, 8.5 GB dual layer. Blu-ray 25 GB single layer, 50 GB dual layer. An R suffix means write-once; RW (or RE on Blu-ray) means rewritable.$$),

('a1-f-539','aplus1',3,'3.3','core',
 $$What distinguishes SD, SDHC, and SDXC memory cards?$$,
 $$Capacity class: plain SD reaches 2 GB, SDHC reaches 32 GB, and SDXC covers above 32 GB up to 2 TB. A host built only for SDHC cannot address an SDXC card. Physical size (full-size, mini, micro) and speed class/UHS rating are separate specifications.$$),

('a1-f-540','aplus1',3,'3.3','core',
 $$Beyond raw speed, what practical advantages do SSDs have over hard drives?$$,
 $$No moving parts, so they survive shock and vibration; near-silent operation; lower power draw and heat; and far better random-access latency, which is what makes systems feel responsive. Hard drives still win decisively on cost per terabyte for bulk and archival storage.$$),

('a1-f-541','aplus1',3,'3.3','core',
 $$What does the TRIM command do on an SSD?$$,
 $$It tells the drive which blocks the file system has abandoned so the controller can erase them in advance during garbage collection. Without TRIM, write performance degrades over time because the drive must erase blocks in the middle of the write path.$$),

('a1-f-542','aplus1',3,'3.3','core',
 $$What is a hot-swappable drive, and what does the system need to support one?$$,
 $$A drive that can be pulled and replaced while the system stays powered on, standard on SAS/SATA backplanes and RAID arrays. It requires a controller and backplane designed for hot swap; yanking a drive from a non-hot-swap port risks data loss and hardware damage.$$),

('a1-f-543','aplus1',3,'3.3','core',
 $$Which interfaces might an external drive use, and how do they differ?$$,
 $$USB is the most universal and supplies bus power for 2.5-inch enclosures. eSATA gives native SATA performance but carries no power, so the enclosure needs its own supply. Thunderbolt over USB-C is fastest and can tunnel PCIe, which is what allows external NVMe enclosures to run at full speed.$$),

('a1-f-544','aplus1',3,'3.3','acronym',
 $$SATA$$,
 $$Serial ATA (Serial Advanced Technology Attachment). The serial drive interface that replaced parallel IDE/PATA; uses a 7-pin data cable plus a separate 15-pin power connector, with SATA III topping out near 600 MB/s.$$),

('a1-f-545','aplus1',3,'3.3','acronym',
 $$SSD$$,
 $$Solid State Drive. Storage built from NAND flash with no moving parts, giving far lower latency than a hard drive; sold as 2.5-inch SATA, mSATA, M.2, U.2, and PCIe add-in-card form factors.$$);
