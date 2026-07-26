-- A+ Core 1 (220-1101) Domain 3 (Hardware) expansion, objectives 3.4-3.7.
-- Tops up 3.4 (motherboards/CPUs/add-on cards), 3.5 (power supplies),
-- 3.6 (multifunction devices & printers - setup/config, previously empty) and
-- 3.7 (printer consumables) to 33 items each.
-- Questions: a1-q-600 .. a1-q-651 (52)   Flashcards: a1-f-600 .. a1-f-662 (63)

insert into public.questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ============================================================
-- 3.4  Motherboards, CPUs and add-on cards  (a1-q-600 .. a1-q-608)
-- ============================================================

('a1-q-600','aplus1',3,'3.4','mcq',2,
 'A technician needs to enable BitLocker so the volume encryption key is sealed to the hardware and released only when the boot measurements match. Which motherboard feature must be present and enabled in UEFI setup?',
 '["Trusted Platform Module (TPM)","Hardware security module (HSM)","Wake-on-LAN","Intel VT-x / AMD-V"]'::jsonb,
 '0'::jsonb,
 'A TPM is a crypto-processor bound to the motherboard (discrete chip or firmware TPM in the CPU). It stores keys and seals them to platform measurements, which is exactly how BitLocker binds a volume to one machine. An HSM is the tempting distractor because it also protects keys - but it is a separate dedicated appliance or plug-in card serving many systems, not a per-endpoint board feature. VT-x is virtualization support and Wake-on-LAN is a network wake feature; neither stores keys.'),

('a1-q-601','aplus1',3,'3.4','mcq',2,
 'A technician installs a Linux distribution whose bootloader is not signed by any key in the firmware trust database. The machine refuses to load it. Which UEFI feature is causing this?',
 '["Secure Boot","The TPM","A boot (user) password","CSM / legacy boot mode"]'::jsonb,
 '0'::jsonb,
 'Secure Boot checks the digital signature of the bootloader against the firmware key database and refuses anything untrusted, which is precisely the described behaviour. The TPM is the tempting distractor since it is the other headline UEFI security item, but it only stores and seals keys - it does not veto boot code. A boot password would prompt for credentials rather than reject a specific loader, and CSM enables legacy booting rather than blocking it.'),

('a1-q-602','aplus1',3,'3.4','mcq',3,
 'A user installs a Type 2 hypervisor on a desktop whose CPU datasheet lists hardware virtualization support, but the hypervisor reports that virtualization is unavailable. What should the technician do first?',
 '["Enable Intel VT-x / AMD-V in UEFI setup","Add more system memory","Enable Secure Boot","Replace the CPU with a server-socket model"]'::jsonb,
 '0'::jsonb,
 'Hardware virtualization extensions are frequently shipped disabled in firmware, so a capable CPU still reports no support until VT-x or AMD-V is turned on in UEFI setup. Adding memory is the tempting distractor because low RAM is the usual VM complaint, but it produces a capacity warning, not a missing-virtualization error. Secure Boot is unrelated, and the CPU already supports the feature so replacing it is wasted effort.'),

('a1-q-603','aplus1',3,'3.4','mcq',3,
 'A newly built PC does nothing when the case power button is pressed. Briefly shorting the two power-switch pins on the motherboard header with a screwdriver starts the system normally. What is the most likely cause?',
 '["The front-panel power-switch lead is on the wrong header pins or is not fully seated","The power supply has failed","The CPU is not seated correctly","The memory is installed in the wrong slots"]'::jsonb,
 '0'::jsonb,
 'Shorting the header pins is exactly what the case button does, so a successful start that way proves the PSU, CPU and memory are all working - the fault is in the wiring between the button and the header. A failed PSU is the tempting distractor for a dead-on-press symptom, but a dead PSU could not power the board when the pins are shorted either. Note that switch leads are non-polarised while LED leads are polarised; a reversed LED lead simply fails to light.'),

('a1-q-604','aplus1',3,'3.4','mcq',1,
 'A CPU is advertised as 8 cores and 16 threads. What does the thread count describe?',
 '["Simultaneous multithreading presents two logical processors per physical core","The CPU contains 16 physical cores, half of them reserved for the operating system","The CPU supports 16 memory channels","The CPU can address a maximum of 16 GB of RAM"]'::jsonb,
 '0'::jsonb,
 'Simultaneous multithreading (Intel calls it Hyper-Threading) lets one physical core interleave two instruction threads and present itself to the OS as two logical processors, improving throughput on parallel workloads. The 16-physical-cores option is the tempting distractor - the thread count is never a physical core count, and no cores are reserved for the OS. Memory channels and addressable RAM are unrelated specifications.'),

('a1-q-605','aplus1',3,'3.4','mcq',3,
 'A technician installs an M.2 NVMe SSD into a spare M.2 socket on a laptop. The module seats and latches, but it never appears in UEFI or in the operating system. What is the most likely explanation?',
 '["That M.2 socket is wired for SATA only and does not carry the PCIe lanes NVMe requires","The drive must be partitioned and formatted before firmware can detect it","M.2 drives also need a SATA data cable attached","NVMe drives are supported only in desktop systems"]'::jsonb,
 '0'::jsonb,
 'M.2 sockets are keyed and lane-wired differently; a socket that provides only SATA signalling will physically accept a module yet never communicate with an NVMe device, so the board manual must be checked for what each socket supports. Formatting is the tempting distractor, but UEFI and Disk Management both list an unformatted drive - if firmware cannot see it at all, the problem is below the file-system layer. M.2 carries power and data through the socket itself, and NVMe is fully supported in laptops.'),

('a1-q-606','aplus1',3,'3.4','multi',2,
 'A technician is fitting an aftermarket air cooler to a newly installed CPU. Select the TWO actions required for correct thermal transfer.',
 '["Apply a thin, even layer of thermal paste between the CPU heat spreader and the cooler base, or use the cooler pre-applied thermal pad","Peel the protective plastic film off the cooler contact base before mounting it","Fill the socket area with thermal paste until it squeezes out around all four edges","Connect the cooler fan to an unswitched case-fan splitter so it always runs at full speed","Run the system without the cooler for ten minutes first so the paste cures"]'::jsonb,
 '[0,1]'::jsonb,
 'Thermal paste (or the factory pad) fills the microscopic gaps between the two metal surfaces so heat conducts instead of crossing insulating air, and the shipping film on the cooler base must come off or it acts as an insulator. Over-applying paste is the tempting error - excess does not improve conduction and can ooze onto the socket. Running a CPU with no cooler risks immediate thermal shutdown, and the fan should go on the CPU_FAN header so the board can monitor and control it.'),

('a1-q-607','aplus1',3,'3.4','multi',2,
 'A shared kiosk PC in a public lobby must be hardened at the firmware level. Select the THREE UEFI settings the technician should configure.',
 '["Set a supervisor (administrator) password so firmware setup cannot be entered without credentials","Restrict or disable booting from USB devices so the OS cannot be bypassed with removable media","Enable Secure Boot so unsigned boot code is rejected","Enable CSM / legacy boot mode for maximum operating system compatibility","Set the chassis fan profile to silent to reduce noise in the lobby"]'::jsonb,
 '[0,1,2]'::jsonb,
 'A supervisor password locks the setup utility, restricting USB boot stops someone booting a live OS to reach the disk, and Secure Boot blocks unsigned bootloaders and bootkits - together these close the firmware attack path on an unattended machine. Enabling CSM is the tempting distractor because it sounds helpful, but legacy mode disables Secure Boot and weakens the configuration. The fan profile is a comfort setting with no security effect.'),

('a1-q-608','aplus1',3,'3.4','matching',2,
 'Match each firmware feature on the left to its function on the right.',
 '{"left":["Secure Boot","TPM","CSM / legacy boot mode","Supervisor (administrator) password"],"right":["Stores and seals encryption keys in hardware so a volume can be bound to this machine","Allows an operating system without UEFI support to boot in BIOS-compatibility mode","Blocks entry to the firmware setup utility unless credentials are supplied","Refuses to load a bootloader that is not signed by a trusted key"]}'::jsonb,
 '[3,0,1,2]'::jsonb,
 'Secure Boot validates bootloader signatures; the TPM stores and seals keys but does not block code; CSM provides legacy BIOS compatibility for non-UEFI operating systems; the supervisor password gates the setup utility. The easy mix-up is Secure Boot with the TPM - they are commonly enabled together for BitLocker, but only Secure Boot rejects untrusted boot code, and only the TPM holds keys.'),

-- ============================================================
-- 3.5  Power supplies  (a1-q-609 .. a1-q-622)
-- ============================================================

('a1-q-609','aplus1',3,'3.5','mcq',3,
 'A build pairs a 125 W CPU with a graphics card rated at 320 W that has two 8-pin PCIe power sockets; drives, fans and memory add roughly another 75 W. Which power supply is the best choice?',
 '["750 W, single +12 V rail rated at 62 A, two PCIe 6+2 connectors","550 W, +12 V rail rated at 44 A, two PCIe 6+2 connectors","1000 W, +12 V rail rated at 83 A, one PCIe 6+2 connector","750 W, +12 V rail rated at 20 A, two PCIe 6+2 connectors"]'::jsonb,
 '0'::jsonb,
 'Peak draw is roughly 520 W, so a 750 W unit whose +12 V rail delivers 62 A (62 x 12 = 744 W) covers the load with real headroom for transients, and it has the two PCIe feeds the card demands. The 1000 W unit is the tempting distractor - ample wattage is useless when the card needs two separate 8-pin feeds and the unit supplies one. The 550 W option leaves almost no margin above 520 W, and the 750 W unit with only 20 A on +12 V can deliver just 240 W where it actually matters, which is why the rail amperage is checked and not only the label wattage.'),

('a1-q-610','aplus1',3,'3.5','mcq',2,
 'A desktop whose power supply has a red 115/230 V selector switch is being shipped from a 115 V region to a site with 230 V mains. What must be done before it is plugged in?',
 '["Move the selector to 230 V so it matches the local mains supply","Leave it at 115 V because the power supply steps the input down automatically","Change it to 230 V only if the system also has a redundant power supply","Replace the power supply, because a voltage selector cannot be changed after manufacture"]'::jsonb,
 '0'::jsonb,
 'A manual selector means the unit is not auto-switching, so the switch must match the local mains before power is applied - leaving it at 115 V on a 230 V feed typically destroys the supply on the spot. The automatic step-down option is the tempting distractor because most modern units genuinely are universal-input (roughly 100-240 V) and have no switch at all - but the presence of the switch is the proof that this one is not. Redundancy is unrelated, and the switch is designed to be moved.'),

('a1-q-611','aplus1',3,'3.5','mcq',1,
 'A technician is building in a compact case and wants to keep cable clutter out of the airflow path. Which power supply characteristic addresses this most directly?',
 '["A fully modular design, so only the cables the build actually uses are attached","A higher 80 PLUS efficiency rating","A higher total wattage rating","A 20-pin main power connector"]'::jsonb,
 '0'::jsonb,
 'A fully modular unit lets every cable detach, so unused peripheral leads stay in the box instead of being stuffed behind the drive cage. The 80 PLUS rating is the tempting distractor since higher efficiency does reduce waste heat, but it does nothing about the physical bundle of cables. Extra wattage generally adds cables rather than removing them, and a 20-pin connector is simply an obsolete standard.'),

('a1-q-612','aplus1',3,'3.5','mcq',1,
 'In a modern desktop with a discrete graphics card, which DC output rail carries most of the system load?',
 '["+12 V","+5 V","+3.3 V","-12 V"]'::jsonb,
 '0'::jsonb,
 'The CPU voltage regulator, the graphics card and all motors and fans draw from +12 V, which is why the +12 V rail amperage is the figure that decides whether a supply can run a build. The +5 V rail is the tempting distractor because it feeds USB ports and drive electronics, but that is a small fraction of total draw; +3.3 V serves memory and chipset logic, and -12 V is a legacy low-current rail retained for compatibility.'),

('a1-q-613','aplus1',3,'3.5','mcq',2,
 'A file server must keep running through the failure of a single power supply module. What should be specified?',
 '["A redundant, hot-swappable dual-module power supply, with each module fed from a separate circuit","One higher-wattage fully modular power supply","A UPS in front of the existing single power supply","Two identical power supplies kept as spares on the shelf"]'::jsonb,
 '0'::jsonb,
 'A redundant supply puts two or more hot-swappable modules in the chassis so either can carry the full load, and feeding them from separate circuits also survives the loss of one mains path. The UPS is the tempting distractor - it protects against loss of mains power, but a UPS cannot help when the PSU module itself fails, because the server has no second module to take over. A bigger single unit and shelf spares both still require downtime to swap.'),

('a1-q-614','aplus1',3,'3.5','mcq',3,
 'An older power supply with a 20-pin main connector is being reused on a modern motherboard that has a 24-pin socket. Beyond the physical fit, what is the real concern?',
 '["The extra four pins add +12 V, +5 V and +3.3 V current that largely feeds the PCIe slots, and an older low-wattage unit may not supply what the board and cards need","A 20-to-24 adapter reverses the polarity of the +12 V rail","The board will not complete POST unless Secure Boot is disabled","The SATA ports will negotiate a reduced link speed"]'::jsonb,
 '0'::jsonb,
 'The move from 20 to 24 pins added current-carrying lines mainly to support power drawn through the PCIe slots, so an adapter can make it fit while the ageing, lower-capacity unit still cannot feed a modern board and card. Reversed polarity is the tempting distractor because adapters do sometimes cause damage, but a correctly built 20-to-24 adapter maps the pins straight through. Secure Boot and SATA link speed have nothing to do with the main power connector.'),

('a1-q-615','aplus1',3,'3.5','mcq',2,
 'A desktop intermittently fails to POST and the technician suspects the power supply. What is the most direct way to confirm whether the DC outputs are within tolerance?',
 '["Measure the rails at the 24-pin connector with a multimeter or PSU tester, ideally with the system under load","Read the 80 PLUS efficiency label on the side of the unit","Run the memory diagnostic built into UEFI","Confirm that the power supply fan spins up when the system is switched on"]'::jsonb,
 '0'::jsonb,
 'Measuring the +12 V, +5 V and +3.3 V lines at the 24-pin connector shows whether the unit is actually holding voltage, and doing so under load exposes a supply that sags only when the system draws current. A spinning fan is the tempting distractor because it proves the unit turns on, which is not the same as delivering rails within specification. The 80 PLUS label describes efficiency, and a memory test cannot distinguish bad RAM from unstable power.'),

('a1-q-616','aplus1',3,'3.5','mcq',2,
 'A graphics card has one 8-pin PCIe power socket. The power supply cable ends in a 6+2 pin plug. What should the technician do?',
 '["Join the detachable 2-pin section to the 6-pin section and seat the complete 8-pin plug in the card","Connect only the 6-pin section, since the extra two pins are optional","Fit a SATA-power-to-8-pin adapter instead","Leave the socket empty, because the PCIe slot already supplies the card"]'::jsonb,
 '0'::jsonb,
 'A 6+2 plug exists so one cable can serve either a 6-pin or an 8-pin card; clipping the two pins on gives the full 8-pin connection the card is asking for. Connecting only the 6-pin portion is the tempting distractor - the card senses the missing lines and will refuse to initialise or run heavily throttled. A PCIe slot supplies at most 75 W, far short of what a card with an 8-pin socket needs, and adapting from low-current SATA power is poor practice.'),

('a1-q-617','aplus1',3,'3.5','mcq',1,
 'Which power supply connector provides power to a 2.5-inch SSD in a desktop?',
 '["The flat 15-pin SATA power connector","The 7-pin SATA data connector","The 4-pin CPU EPS connector","The 24-pin ATX connector"]'::jsonb,
 '0'::jsonb,
 'SATA drives take power through a flat 15-pin connector that supplies +3.3 V, +5 V and +12 V, separate from the data cable. The 7-pin SATA connector is the tempting distractor because it plugs into the same drive edge, but it carries data only - which is why every SATA drive needs two cables. The EPS connector feeds the CPU voltage regulator and the 24-pin feeds the motherboard.'),

('a1-q-618','aplus1',3,'3.5','mcq',2,
 'A small-form-factor office PC needs a replacement power supply. The failed unit is noticeably smaller than a standard ATX supply. What should the technician order?',
 '["A unit matching the case power supply form factor, such as SFX or TFX, with the same mounting pattern","Any ATX unit of equal wattage, since ATX is the universal standard","A redundant server power supply of similar wattage","A higher-wattage ATX unit, cutting the case to fit"]'::jsonb,
 '0'::jsonb,
 'Power supplies come in physical form factors - ATX, SFX, TFX and others - and the replacement has to match the case cut-out, screw pattern and cable lengths as well as the electrical requirement. Assuming ATX is universal is the tempting error; it is the desktop standard but simply will not mount in an SFF chassis. Redundant server units use different chassis rails, and modifying the case is not an acceptable repair.'),

('a1-q-619','aplus1',3,'3.5','multi',2,
 'A technician is choosing a power supply for a build with a 170 W CPU and a graphics card that requires two 8-pin PCIe feeds. Select the THREE specifications that must be verified before purchase.',
 '["Total wattage comfortably exceeds the summed peak draw of all components","The unit includes an 8-pin (4+4) EPS connector for the CPU","The unit includes at least two PCIe 6+2 connectors","The unit is fully modular rather than semi-modular","The unit carries an 80 PLUS Titanium efficiency rating","The unit has a manual 115/230 V input selector switch"]'::jsonb,
 '[0,1,2]'::jsonb,
 'A power supply only runs a build if it has the capacity plus the right physical connectors, so wattage, the CPU EPS feed and two PCIe feeds are all hard requirements. Modularity and an 80 PLUS Titanium rating are the tempting distractors - both are genuinely desirable, but a non-modular Bronze unit with the correct connectors and capacity will run the machine perfectly. A manual voltage selector is not a feature to seek at all; auto-switching universal input is preferable because it cannot be set wrong.'),

('a1-q-620','aplus1',3,'3.5','multi',3,
 'Select the TWO accurate statements about a power supply +12 V rail specification.',
 '["Multiplying the +12 V rail rated amperage by 12 gives the power that rail can actually deliver","A unit with a high total wattage rating can still be unsuitable if its +12 V rail amperage is low","The +12 V rail is the direct supply for system memory modules","The full wattage printed on the label is always available on the +12 V rail alone","The -12 V rail is the main supply for modern graphics cards"]'::jsonb,
 '[0,1]'::jsonb,
 'Volts times amps gives watts, so the +12 V amperage figure converts directly into the power available to the CPU and GPU, and a label wattage that is spread thinly across rails can leave a nominally large unit short where the load actually is. The idea that the whole label wattage sits on +12 V is the tempting distractor - total output is shared across +3.3 V, +5 V and +12 V. Memory is fed from +3.3 V through board regulators, and -12 V is a legacy low-current rail, not a graphics supply.'),

('a1-q-621','aplus1',3,'3.5','multi',2,
 'A technician must remove the motherboard from a desktop that is shut down but still connected to mains. Select the TWO required safety steps.',
 '["Unplug the mains cord, or switch off the rocker switch on the back of the power supply","Press and hold the case power button afterwards to drain residual charge from the board","Open the power supply housing and discharge its internal capacitors by hand","Leave the system plugged in so the chassis stays grounded during the work","Move the 115/230 V selector to 230 V before opening the case"]'::jsonb,
 '[0,1]'::jsonb,
 'A shut-down but plugged-in system still has the +5 V standby rail live, which is what keeps the power button, Wake-on-LAN and USB charging alive, so power must be removed and residual charge bled off with the power button before touching the board. Leaving it plugged in for grounding is the tempting distractor because it was once taught that way - it is now considered unsafe; use an anti-static strap clipped to the unpowered chassis instead. Never open a power supply: its capacitors can hold a lethal charge long after unplugging.'),

('a1-q-622','aplus1',3,'3.5','matching',2,
 'Match each power supply connector on the left to what it powers on the right.',
 '{"left":["24-pin ATX","8-pin (4+4) EPS 12 V","PCIe 6+2","15-pin SATA power"],"right":["The main power input of the motherboard","The CPU voltage regulator module","A drive such as a 2.5-inch SSD or an optical drive","The supplementary power socket on a discrete graphics card"]}'::jsonb,
 '[0,1,3,2]'::jsonb,
 'The 24-pin feeds the board itself, the EPS 12 V connector runs a dedicated line to the CPU regulator, the 6+2 PCIe cable feeds a graphics card, and the flat 15-pin connector powers drives. The classic confusion is EPS against PCIe: both are 8-pin, both are 12 V, and they are keyed differently on purpose - forcing a PCIe plug into an EPS socket can damage the board.'),

-- ============================================================
-- 3.6  Multifunction devices and printers: setup and configuration
--      (a1-q-623 .. a1-q-637)
-- ============================================================

('a1-q-623','aplus1',3,'3.6','mcq',1,
 'A newly unboxed laser printer jams on its very first job, and the toner cartridge rattles when handled. What did the installer most likely overlook?',
 '["Packing material and shipping restraints, including cartridge spacers and the toner sealing strip, were left in place","The printer needs a firmware update before its first print job","The device must be calibrated with the vendor utility before any paper is loaded","The tray guides were set to Letter instead of A4"]'::jsonb,
 '0'::jsonb,
 'Printers ship with foam blocks, tape and coloured restraints through the paper path and around the cartridge, plus a sealing strip that must be pulled from a new toner cartridge - leaving any of it in place causes immediate jams and rattles. Mismatched tray guides are the tempting distractor because they genuinely do cause jams, but they would not explain a rattling cartridge on a device straight out of the box. Firmware and calibration come after the device physically runs.'),

('a1-q-624','aplus1',3,'3.6','mcq',3,
 'Jobs sent to a shared office printer come out as page after page of raw code beginning with %!PS instead of the intended document. What is the most likely cause?',
 '["The device cannot interpret PostScript, so the PostScript stream is printed as literal text; a driver matching a page description language the device supports is needed","The print spooler service needs to be restarted","The device is low on toner","The document was set to duplex on a printer with no duplex unit"]'::jsonb,
 '0'::jsonb,
 'When a printer receives a page description language it does not understand, it treats the stream as plain text and prints the code - the %!PS header is the signature of PostScript arriving at a device that only speaks PCL. Restarting the spooler is the tempting distractor because it is the reflex fix for print problems, but the job is reaching the printer and printing successfully; the fault is the language, not the queue. Low toner produces faded pages and a missing duplexer simply prints single-sided.'),

('a1-q-625','aplus1',3,'3.6','mcq',2,
 'A shared printer has a factory-fitted duplex unit, but the duplex option is greyed out in the driver on every client. What should the technician do?',
 '["Open the printer properties and enable the duplex unit under installable options / device settings, or install the full vendor driver instead of the generic class driver","Replace the duplex unit, since a greyed-out option indicates hardware failure","Change the document orientation to landscape","Lower the print quality setting to draft"]'::jsonb,
 '0'::jsonb,
 'Drivers expose optional hardware only after the option is declared, so a duplexer, extra tray or finisher stays greyed out until it is enabled in device settings - or until a vendor driver that knows about it replaces the OS generic class driver. Replacing the duplex unit is the tempting distractor, but a hardware failure would show as jams or errors during a duplex job, not as an option that never becomes selectable. Orientation and quality are unrelated settings.'),

('a1-q-626','aplus1',3,'3.6','mcq',1,
 'A user prints 5 copies of a 20-page handout and receives 20 small stacks, each holding 5 identical pages, instead of 5 complete handouts. Which setting should be changed?',
 '["Enable collate","Enable duplex","Change the orientation to landscape","Raise the print quality setting"]'::jsonb,
 '0'::jsonb,
 'Collate tells the printer to assemble each copy in page order - 1 to 20, then 1 to 20 again - so the output arrives as finished sets. Duplex is the tempting distractor because both settings affect how a multi-page job comes out, but duplex only controls single- versus double-sided printing and would not reorder anything. Orientation and quality change the appearance of each page, not the sequence.'),

('a1-q-627','aplus1',3,'3.6','mcq',3,
 'A user wants a double-sided report bound along the left edge, so it opens like a book with both sides upright. Which duplex setting is correct?',
 '["Flip on long edge","Flip on short edge","Landscape orientation with collate enabled","Manual duplex with reverse page order"]'::jsonb,
 '0'::jsonb,
 'Long-edge binding flips each sheet about its long side, which keeps both faces upright when the stack is bound down the left edge - the book layout. Short-edge flip is the tempting distractor and is a real setting, but it flips about the top, so alternate pages appear upside down in a left-bound document; it suits notepad or calendar style binding along the top. Landscape and manual duplex change other properties and do not fix the flip axis.'),

('a1-q-628','aplus1',3,'3.6','mcq',2,
 'Every few weeks users report that a network printer is offline, and the problem clears when the technician re-creates the queue pointing at a new address. What is the correct permanent fix?',
 '["Give the printer a static IP address or a DHCP reservation, and point queues at that address or its DNS name","Extend the DHCP lease duration to thirty days","Reinstall the print driver on every workstation","Connect the printer by USB to one PC and share it from there"]'::jsonb,
 '0'::jsonb,
 'Print queues target a device by address, so a printer that receives a different lease breaks every queue until they are rebuilt - pinning the address with a reservation or static assignment removes the cause. A longer lease is the tempting distractor because it makes the symptom rarer, but the address can still change on lease expiry or after a reboot, so the failure only becomes less predictable. Reinstalling drivers treats the symptom, and moving to a USB share creates a dependency on one workstation.'),

('a1-q-629','aplus1',3,'3.6','mcq',2,
 'A small office shares a printer from the receptionist workstation. Staff cannot print whenever that PC is asleep or powered off. Which change resolves this properly?',
 '["Move the queue to a dedicated print server, or point the clients directly at the network address of the printer","Ask the receptionist to leave the workstation signed in at all times","Run a USB cable from the printer to each user desk in turn","Raise the print spooler service priority on the receptionist workstation"]'::jsonb,
 '0'::jsonb,
 'A shared printer keeps the queue and driver on the host machine, so the host has to be up for anyone else to print; hosting the queue on an always-on print server, or letting each client talk straight to the network printer, removes that dependency. Leaving the workstation signed in is the tempting distractor because it does make printing work most of the time, but it depends on a user habit and still fails at every reboot or power cut. USB is a single-host connection and spooler priority changes nothing when the host is off.'),

('a1-q-630','aplus1',3,'3.6','mcq',2,
 'A visiting consultant needs to print from a laptop that is not allowed to join the corporate wireless network. The multifunction device supports Wi-Fi Direct. What does that provide?',
 '["The laptop associates directly with the wireless link of the printer and prints without joining the corporate LAN","The printer bridges the laptop onto the corporate LAN so it can also reach file shares","The laptop can print only once a USB cable is connected between it and the printer","The printer advertises all corporate print queues to any device within range"]'::jsonb,
 '0'::jsonb,
 'Wi-Fi Direct lets a client form a peer-to-peer wireless link with the device itself, so a guest can print without credentials on, or access to, the production network. The bridging option is the tempting distractor because the printer is on both sides of the connection, but Wi-Fi Direct deliberately does not route the guest onto the LAN - that isolation is the point. It also does not require a cable, and it does not publish other queues.'),

('a1-q-631','aplus1',3,'3.6','mcq',3,
 'On a newly installed multifunction device, scan-to-folder over SMB works correctly but scan-to-email fails with an authentication error. What should the technician check first?',
 '["The SMTP server address, port, sender address and relay credentials configured on the device","The condition of the automatic document feeder rollers","The scan resolution and file format settings","The configuration of the duplex printing unit"]'::jsonb,
 '0'::jsonb,
 'Successful scan-to-folder proves the scan hardware, the network path and the device address are all healthy, which narrows the fault to the mail-specific settings - server, port, sender identity and the credentials the device uses to relay. Feeder rollers are the tempting distractor for any scanning complaint, but a mechanical feed fault would break scan-to-folder in exactly the same way. Resolution and duplex settings cannot generate an authentication error.'),

('a1-q-632','aplus1',3,'3.6','mcq',2,
 'Confidential HR documents are repeatedly found sitting in the output tray of a shared multifunction device. Which feature should be enabled?',
 '["Secured print, which holds each job until the owner authenticates at the device and releases it","Audit logging, so every print job is recorded against a user","Duplex printing, to halve the number of sheets produced","A higher default print quality on the shared queue"]'::jsonb,
 '0'::jsonb,
 'Secured or pull printing holds the job on the device or server until the owner authenticates with a PIN, badge or login, so nothing is printed until its owner is standing there - which is exactly the exposure described. Audit logging is the tempting distractor because it is the other headline MFD security feature, but it only records who printed what after the event; the pages still sit in the tray for anyone to read. Duplex and quality settings have no security effect.'),

('a1-q-633','aplus1',3,'3.6','multi',2,
 'A technician is deploying a new multifunction device over Ethernet so a whole department can use it. Select the THREE steps required.',
 '["Assign the device a static IP address or a DHCP reservation","Create the print queue targeting the device address or its DNS name","Install a driver on each client, or deploy it from a print server, matching the client operating system and architecture","Connect a USB cable from the device to one workstation as a fallback path","Disable the built-in web management interface of the device","Set the default paper size on every client to A4"]'::jsonb,
 '[0,1,2]'::jsonb,
 'A network deployment needs a stable address, a queue pointed at that address, and a correct driver on every client - those three together are what actually produce printed pages. Disabling the web interface is the tempting distractor because it sounds like hardening, but that interface is how the device is configured, secured and monitored; it should be password-protected rather than turned off. A USB fallback recreates the single-host dependency the network install removes, and paper size is a preference, not a deployment step.'),

('a1-q-634','aplus1',3,'3.6','multi',3,
 'An organisation must be able to prove which individual employee copied a specific confidential document on a shared multifunction device. Select the TWO settings that make this possible.',
 '["Require per-user authentication at the device, such as a personal PIN, badge tap or directory login","Enable the device audit log or job accounting so every job is recorded against the authenticated user","Configure a single shared department PIN for everyone on that floor","Enable duplex printing as the device default","Enable Wi-Fi Direct so users can connect from personal devices"]'::jsonb,
 '[0,1]'::jsonb,
 'Accountability needs two halves: an identity at the device, and a log that records the job against that identity - either alone is useless, since an unauthenticated log shows only that a job occurred. A shared department PIN is the tempting distractor because it feels like authentication, but it attributes every job to a group, so the log can never name the individual. Duplex is a paper-saving default, and Wi-Fi Direct widens access rather than tracking it.'),

('a1-q-635','aplus1',3,'3.6','multi',1,
 'Select the TWO originals that should be scanned on the flatbed glass rather than through the automatic document feeder.',
 '["A page from a hardback book","A fragile original with a torn edge","A forty-sheet stack of loose Letter-size pages","Twenty double-sided sheets on a device with a duplexing ADF","A stack of identical invoices bound for a network folder"]'::jsonb,
 '[0,1]'::jsonb,
 'The ADF pulls loose, uniform, undamaged sheets through rollers, so a bound book cannot be fed at all and a torn or fragile original is likely to jam or be damaged further - both belong on the glass. The twenty double-sided sheets are the tempting distractor, but that is precisely the job a duplexing ADF exists for, capturing both faces in one pass. Loose stacks of same-size pages are ideal ADF work.'),

('a1-q-636','aplus1',3,'3.6','ordering',2,
 'Place the steps for deploying a new networked multifunction device to a department in the correct order.',
 '["Create the print queue on the print server and share it with the department","Unbox the device, remove all shipping restraints, install the consumables and load paper","Connect the device to the network and configure a static IP address or DHCP reservation","Configure device settings and security: default duplex, tray paper sizes, user authentication and secured print","Print a test page from a client workstation and verify that scan-to-folder works"]'::jsonb,
 '[1,2,3,0,4]'::jsonb,
 'The device has to physically work before anything else matters, so unboxing and consumables come first, then a stable network address, then the device-side configuration and security policy, then the shared queue that points at it, and finally end-to-end verification from a client. The common error is creating the queue early: a queue built before the address is pinned ends up pointing at a lease that will change, and security settings applied after users are already printing leave a window with no authentication.'),

('a1-q-637','aplus1',3,'3.6','matching',2,
 'Match each printer configuration setting on the left to the problem it resolves on the right.',
 '{"left":["Collate","Duplex (long edge)","Tray paper-size setting","Secured print"],"right":["Documents sit unclaimed in the output tray where anyone can read them","The device keeps prompting to load paper even though a tray is full","Multiple copies arrive as separate stacks of identical pages instead of complete sets","Internal drafts consume twice as much paper as necessary"]}'::jsonb,
 '[2,3,1,0]'::jsonb,
 'Collate assembles complete sets, duplex halves paper use on drafts, correct tray media settings stop the device requesting paper it thinks is absent, and secured print keeps output in the queue until its owner is at the device. The pairing most often missed is the tray setting: a load-paper prompt with a full tray usually means the tray is configured for a different size or media type than the job requests, so the device looks for a source that does not exist.'),

-- ============================================================
-- 3.7  Printer consumables  (a1-q-638 .. a1-q-651)
-- ============================================================

('a1-q-638','aplus1',3,'3.7','ordering',2,
 'Place the seven stages of the laser imaging process in the correct order.',
 '["Fusing - heat and pressure melt the toner permanently into the paper fibres","Charging - the primary charge roller applies a uniform negative charge across the drum","Cleaning - residual toner is removed and the drum charge is neutralised ready for the next page","Processing - the page is rasterised into a bitmap held in printer memory","Developing - charged toner is drawn from the developer roller onto the image areas of the drum","Transferring - a positive charge applied to the paper pulls the toner off the drum","Exposing - the laser writes the image by discharging the areas of the drum that will carry toner"]'::jsonb,
 '[3,1,6,4,5,0,2]'::jsonb,
 'The order is processing, charging, exposing, developing, transferring, fusing, cleaning: the page is first turned into a bitmap, the drum is given a uniform charge, the laser writes the latent image, toner is attracted to it, the charged paper pulls the toner away, heat and pressure bond it, and the drum is wiped and neutralised for the next sheet. The step most often placed wrongly is processing - it is easy to start at charging and forget that the printer must build the raster image in memory before any mechanical stage begins. Cleaning is last, not first: it prepares the drum for the following page rather than the current one.'),

('a1-q-639','aplus1',3,'3.7','ordering',1,
 'Place the steps for replacing an inkjet cartridge and restoring print quality in the correct order.',
 '["Run the head alignment routine and print a test page","Open the lid and wait for the carriage to travel to the cartridge-change position","Peel the protective tape from the new cartridge without touching the nozzles or the contacts","Release and lift out the spent cartridge","Seat the new cartridge until the latch clicks, then close the lid"]'::jsonb,
 '[1,3,2,4,0]'::jsonb,
 'The carriage must reach its service position before anything can be removed, the old cartridge comes out, the new one has its tape peeled and is seated, and alignment is run last to correct registration after the change. Peeling the tape before opening the printer is the common slip - the exposed nozzles begin drying immediately, so the tape comes off at the moment of installation, and the nozzles and copper contacts are never touched because skin oils cause misfires.'),

('a1-q-640','aplus1',3,'3.7','mcq',3,
 'A high-volume laser printer has reached the page count at which the manufacturer specifies a maintenance kit. What does such a kit typically contain, and what must be done after fitting it?',
 '["Fuser assembly, transfer roller and feed/pickup rollers - then reset the maintenance page counter on the device","Toner cartridge and imaging drum only - no counter reset is required","Print head, carriage belt and ink cartridges - then run head alignment","Ribbon, tractor-feed guides and print head - then run a device self-test"]'::jsonb,
 '0'::jsonb,
 'A laser maintenance kit bundles the wear parts rated for the same page interval - fuser, transfer roller and the feed and pickup rollers - and the page counter must be reset afterwards or the device keeps reporting that service is due and the next interval is mistracked. The toner-and-drum option is the tempting distractor because those are the parts users replace most often, but they are ordinary consumables changed on their own schedule, not the scheduled maintenance kit. The other two lists are inkjet and impact parts.'),

('a1-q-641','aplus1',3,'3.7','mcq',3,
 'A laser printer regularly pulls two or three sheets through at once. Which part is worn?',
 '["The separation pad","The pickup roller","The fuser assembly","The imaging drum"]'::jsonb,
 '0'::jsonb,
 'The separation pad (or separation roller) supplies the friction that holds back everything except the top sheet, so when its surface glazes over, extra sheets ride through together. The pickup roller is the tempting distractor because it is the other feed-path consumable, but its job is to grab the top sheet - when it wears the printer fails to feed at all rather than feeding too much. The fuser and drum sit further along the paper path and play no part in sheet separation.'),

('a1-q-642','aplus1',3,'3.7','mcq',3,
 'A colour laser printer prints black text with a thin cyan fringe offset consistently to one side across every page. All four toner cartridges report ample toner. What is the correct first action?',
 '["Run the colour calibration and registration routine on the device","Replace all four toner cartridges","Replace the fuser assembly","Set the driver default to draft quality"]'::jsonb,
 '0'::jsonb,
 'A colour laser lays down four separate planes that must land exactly on top of each other; a consistent one-sided colour fringe is a registration error, which is what calibration corrects - and it is standard practice after replacing toner, a drum or a transfer belt. Replacing the toner is the tempting distractor since the fault is colour-related, but the cartridges report plenty of toner and a supply problem would show as fading or streaking rather than a precise offset. A failing fuser produces toner that rubs off, and print quality settings do not move colour planes.'),

('a1-q-643','aplus1',3,'3.7','mcq',1,
 'A toner cartridge splits and spills powder over a desk and the carpet. How should it be cleaned up?',
 '["Wipe with a dry or slightly damp cool cloth and use a toner-rated vacuum fitted with a HEPA/ESD-safe filter","Use the office shop vacuum, then wipe the area down","Rinse the area with hot water so the toner dissolves","Blow the powder clear with compressed air, then sweep"]'::jsonb,
 '0'::jsonb,
 'Toner is a fine plastic powder, so it is wiped up cold and vacuumed only with a unit rated for it - one whose filter can actually capture the particles and whose motor will not ignite the airborne dust. The ordinary shop vacuum is the tempting distractor because it is the tool that is to hand, but standard filters pass toner straight through and blow it back into the room. Hot water fuses toner into fabric permanently, and compressed air simply spreads it.'),

('a1-q-644','aplus1',3,'3.7','mcq',2,
 'An inkjet printer that has been unused for two months now prints with horizontal gaps and no magenta at all. All cartridges report full. What should the technician do first?',
 '["Run the print-head cleaning cycle, then print a nozzle-check page","Replace all of the ink cartridges","Replace the carriage belt","Run the head alignment routine"]'::jsonb,
 '0'::jsonb,
 'Ink dries in nozzles that sit idle, and missing colours plus banding after a long period of disuse is the classic clogged-head picture - the cleaning cycle purges the nozzles and the nozzle-check page confirms whether it worked. Replacing the cartridges is the tempting distractor, but they read full, so the ink is present and simply is not reaching the page. Alignment corrects registration rather than restoring missing nozzles, and a carriage belt fault would show as stalling or shifted output, not absent colour.'),

('a1-q-645','aplus1',3,'3.7','mcq',2,
 'After a new inkjet cartridge is installed, vertical lines print doubled and text looks fuzzy, but no colours are missing. What should be run?',
 '["The head alignment / calibration routine","Another print-head cleaning cycle","A printer firmware update","A duplex test page"]'::jsonb,
 '0'::jsonb,
 'Nothing is missing from the output, so the nozzles are clear - the head passes are simply not lining up, which is the alignment routine correcting the forward and reverse passes and the relative position of the colour nozzles after a cartridge change. A second cleaning cycle is the tempting distractor because cleaning is the familiar inkjet fix, but it wastes ink and cannot correct a positional error. Firmware and duplex settings are unrelated to print registration.'),

('a1-q-646','aplus1',3,'3.7','mcq',2,
 'An inkjet printer grinds and stalls with the print head partway across the page, leaving shifted and streaked output. Which part should be inspected first?',
 '["The carriage belt","The pickup roller","The fuser assembly","The transfer belt"]'::jsonb,
 '0'::jsonb,
 'The toothed carriage belt is what the stepper motor uses to drag the head across the page, so a stretched, slipping, broken or obstructed belt produces exactly this grinding, stalling and misplaced output. The pickup roller is the tempting distractor because it is the other common mechanical consumable, but it moves paper into the printer and its failure shows as no-feeds, not as a stalled head. Fusers and transfer belts are laser components and do not exist in an inkjet.'),

('a1-q-647','aplus1',3,'3.7','mcq',2,
 'A direct thermal label printer feeds labels normally, but every label comes out completely blank. What should the technician check first?',
 '["Whether the roll is loaded with the heat-sensitive coated side facing away from the print head","Whether the toner cartridge is empty","Whether the print head needs alignment","Whether the wrong PCL driver is installed"]'::jsonb,
 '0'::jsonb,
 'Direct thermal printing works by burning dots into a coated surface, so if the roll is loaded upside down the heating element meets the uncoated back of the stock and produces nothing at all - which is why roll orientation is the first thing checked when labels feed but stay blank; a failed heating element is the next candidate. Toner is the tempting distractor, but direct thermal printers have no toner, ink or ribbon of any kind. A driver mismatch would normally yield garbage characters rather than perfectly blank stock.'),

('a1-q-648','aplus1',3,'3.7','mcq',2,
 'A thermal receipt printer produces a persistent white vertical line down every receipt. What is the correct maintenance action?',
 '["Clean the heating element with isopropyl alcohol on a lint-free swab, or run a cleaning card through the device","Replace the ribbon","Replace the ink cartridge","Run the colour calibration routine"]'::jsonb,
 '0'::jsonb,
 'Paper dust and adhesive residue build up on the print head and block individual heating dots, which shows as an unbroken white line down the length of every receipt; cleaning the element with alcohol or a cleaning card clears it, and if the line survives cleaning the element itself has failed and the head needs replacing. Replacing the ribbon is the tempting distractor because a worn ribbon does cause pale striping on impact printers - but a direct thermal printer has no ribbon and no ink to change, and colour calibration does not apply to a monochrome thermal device.'),

('a1-q-649','aplus1',3,'3.7','mcq',2,
 'A warehouse must produce three-part carbon-copy delivery notes in a single pass. Which technology is required, and what consumables does it use?',
 '["An impact / dot-matrix printer using an inked ribbon and continuous tractor-feed multipart paper","A laser printer using a maintenance kit and heavy stock","An inkjet printer using pigment ink and a duplexing assembly","A direct thermal printer using coated thermal label stock"]'::jsonb,
 '0'::jsonb,
 'Only an impact printer marks every layer of a multipart form at once, because its pins physically strike a ribbon against the stack, and it is fed by continuous tractor-feed paper with sprocket-hole edges. The laser option is the tempting distractor since laser output is far higher quality, but toner is fused onto the top sheet only and nothing reaches the copies beneath. Inkjet and thermal printing are likewise non-impact and cannot mark carbon copies.'),

('a1-q-650','aplus1',3,'3.7','multi',2,
 'An impact printer output has faded steadily over several weeks, and one horizontal row of dots is now missing from every character. Select the TWO parts that should be replaced.',
 '["The ribbon","The print head","The fuser assembly","The imaging drum","The tractor-feed paper"]'::jsonb,
 '[0,1]'::jsonb,
 'Gradual overall fading is a ribbon running out of ink, while a row of dots absent from every character on every page is a dead pin in the print head - two separate faults with two separate parts. The fuser and imaging drum are the tempting distractors because they are the best-known printer consumables, but both belong to laser printers and have no counterpart in an impact device. Paper is not a defect source here; the stock is fine.'),

('a1-q-651','aplus1',3,'3.7','multi',2,
 'Select the THREE consumables or wear parts that belong to a colour laser printer rather than to an inkjet.',
 '["Toner cartridge","Transfer belt","Fuser assembly","Carriage belt","Print head","Ink cartridge"]'::jsonb,
 '[0,1,2]'::jsonb,
 'Toner cartridges supply the powder, the transfer belt collects the cyan, magenta, yellow and black layers from the four drums before transferring the combined image to paper, and the fuser bonds the toner with heat and pressure - all three exist only in a laser device. The carriage belt is the tempting distractor because the two belts sound alike, but it simply drags an inkjet print head across the page and carries no image. Print heads and ink cartridges are likewise inkjet parts.');

insert into public.flashcards (id, cert, domain, objective, deck, front, back) values

-- ============================================================
-- 3.4  Motherboards, CPUs and add-on cards  (a1-f-600 .. a1-f-611)
-- ============================================================

('a1-f-600','aplus1',3,'3.4','core',
 'What does a TPM do, and where does it live?',
 'The Trusted Platform Module is a dedicated crypto-processor on the motherboard, or built into the CPU as a firmware TPM. It generates and stores keys in hardware and can seal them to the platform, which is how BitLocker binds a volume key to one machine and releases it only when the boot measurements still match.'),

('a1-f-601','aplus1',3,'3.4','core',
 'How does a TPM differ from an HSM?',
 'A TPM is bound to one motherboard and protects the keys of that single endpoint. An HSM (hardware security module) is a separate dedicated device - a plug-in card or a networked appliance - that generates and stores keys for many systems at enterprise scale, with tamper resistance and much higher throughput.'),

('a1-f-602','aplus1',3,'3.4','core',
 'What does Secure Boot check, and what does it require?',
 'It verifies the digital signature of the bootloader and early boot components against a database of trusted keys held in firmware, refusing to load anything unsigned or untrusted so that bootkits cannot load ahead of the OS. It requires UEFI mode with CSM/legacy boot disabled, and the disk partitioned as GPT.'),

('a1-f-603','aplus1',3,'3.4','core',
 'What is the difference between a UEFI supervisor password and a boot password?',
 'The supervisor (administrator) password gates entry to the firmware setup utility, so settings cannot be altered. The boot or user password gates starting the machine at all. Setting only a boot password still leaves firmware settings open to anyone who does get in, so both are usually set on kiosk and shared machines.'),

('a1-f-604','aplus1',3,'3.4','core',
 'Why can an M.2 drive fit a socket and still not work?',
 'M.2 modules and sockets are keyed (B, M, or B+M) and the notch must match, but keying alone does not guarantee signalling: some M.2 sockets are wired for SATA only, while an M-key socket typically carries up to four PCIe lanes for NVMe. Always check the board manual - a physically fitting module may not be electrically supported.'),

('a1-f-605','aplus1',3,'3.4','core',
 'What are front-panel headers, and why does orientation matter for some of them?',
 'They are pin blocks on the board for the case power switch, reset switch, power LED, drive-activity LED, and front USB and audio ports. The switch leads are non-polarised and work either way round; the LED leads are polarised, so a reversed LED lead simply never lights. A power-switch lead on the wrong pins means the machine will not start at all.'),

('a1-f-606','aplus1',3,'3.4','core',
 'What does simultaneous multithreading (Hyper-Threading) actually do?',
 'It lets one physical core interleave two instruction threads and present itself to the operating system as two logical processors, so a 6-core CPU reports 12 threads. It improves throughput on parallel workloads by filling idle execution slots, but it does not double the physical cores or the raw compute available.'),

('a1-f-607','aplus1',3,'3.4','core',
 'How do x86, x64 and ARM differ as CPU architectures?',
 'x86 is the 32-bit instruction set, limited to roughly 4 GB of addressable RAM. x64 (x86-64) is its 64-bit extension: it addresses far more memory and still runs 32-bit software. ARM is a RISC architecture used in phones, tablets and low-power laptops for high performance per watt, and it needs software compiled for ARM or run under emulation.'),

('a1-f-608','aplus1',3,'3.4','core',
 'Which UEFI setting must be enabled before a hypervisor can run virtual machines efficiently?',
 'Hardware virtualization support - Intel VT-x or AMD-V, plus VT-d or AMD-Vi for device pass-through. It is often shipped disabled, so a CPU that supports virtualization on paper still makes the hypervisor report that virtualization is unavailable, or fall back to very slow software emulation, until the setting is turned on.'),

('a1-f-609','aplus1',3,'3.4','core',
 'Why is thermal paste applied between a CPU and its heat sink, and how much is used?',
 'It fills the microscopic pits in the two machined surfaces so heat conducts into the heat sink instead of crossing insulating air. A thin, even layer is all that is required - roughly a pea-sized dot spread by mounting pressure. Too little (or a protective film left on the cooler base) causes throttling and thermal shutdowns; too much just squeezes onto the socket.'),

('a1-f-610','aplus1',3,'3.4','core',
 'What is a capture card used for?',
 'It digitises an incoming video signal - typically HDMI from a games console, camera or second PC - so it can be recorded or live-streamed. Internal versions install in a PCIe slot; external versions connect over USB. Using one offloads capture and encoding from the main system, so gameplay or the source machine is not slowed by the recording.'),

('a1-f-611','aplus1',3,'3.4','acronym',
 'PCIe',
 'Peripheral Component Interconnect Express - the serial expansion bus that carries add-in cards such as GPUs, NICs, capture cards and NVMe storage. Slots come in x1, x4, x8 and x16 lane widths, and per-lane bandwidth roughly doubles with each generation.'),

-- ============================================================
-- 3.5  Power supplies  (a1-f-612 .. a1-f-627)
-- ============================================================

('a1-f-612','aplus1',3,'3.5','acronym',
 'PSU',
 'Power Supply Unit - converts AC mains into the regulated DC rails a PC uses (+3.3 V, +5 V and +12 V, plus -12 V and +5 V standby). Its job is to deliver enough current on each rail, through the right connectors, for every component in the build.'),

('a1-f-613','aplus1',3,'3.5','acronym',
 'EPS',
 'Entry-Level Power Supply Specification - the 4-pin or 8-pin (4+4) 12 V connector that feeds the CPU voltage regulator directly, separate from the 24-pin main connector. It is keyed differently from the visually similar 8-pin PCIe plug so the two cannot be swapped.'),

('a1-f-614','aplus1',3,'3.5','core',
 'Which DC rails does an ATX power supply output, and what does each mainly feed?',
 '+12 V carries most of a modern system load - the CPU voltage regulator, the graphics card, and all motors and fans. +5 V feeds USB ports and drive electronics. +3.3 V feeds memory and chipset logic. There is also a legacy low-current -12 V rail, and a +5 V standby rail that stays live to run the power button and Wake-on-LAN.'),

('a1-f-615','aplus1',3,'3.5','core',
 'Why check the +12 V rail amperage rather than only the total wattage?',
 'Modern CPUs and GPUs draw almost all of their power from +12 V, but the label wattage is the combined output across all rails. Multiply the +12 V amperage by 12 to see what that rail can really deliver: a nominally large unit whose +12 V rating is weak, or split thinly across multiple rails, can still fall short where the load actually sits.'),

('a1-f-616','aplus1',3,'3.5','core',
 'What is the difference between non-modular, semi-modular and fully modular power supplies?',
 'Non-modular has every cable permanently attached - cheapest, but unused leads must be hidden in the case. Semi-modular fixes the essentials (24-pin and EPS) and lets peripheral cables detach. Fully modular allows every cable to be removed, so only what the build needs is installed - best for airflow and tidy small builds. Modular cables are not interchangeable between vendors.'),

('a1-f-617','aplus1',3,'3.5','core',
 'What is a redundant power supply, and where is it used?',
 'Two or more hot-swappable PSU modules in one chassis, each able to carry the full load, so a failed module can be pulled and replaced without powering the system down. It is standard in servers, NAS units and network appliances. Best practice is to feed each module from a separate circuit or UPS so a single mains path failure is also survivable.'),

('a1-f-618','aplus1',3,'3.5','core',
 'What is the difference between a 20-pin and a 24-pin main power connector?',
 'Older ATX boards used a 20-pin main connector; modern boards use 24-pin. Most cables are built as 20+4 so they serve either. The extra four pins add +3.3 V, +5 V and +12 V current largely used to supply the PCIe slots - so while an adapter makes an old unit fit, a low-capacity older supply is still a poor match for a modern board and graphics card.'),

('a1-f-619','aplus1',3,'3.5','core',
 'What powers a discrete graphics card, and what does a 6+2 connector mean?',
 'PCIe power connectors from the PSU. The plug is built as a 6-pin section with a detachable 2-pin section, so one cable serves either a 6-pin or an 8-pin card. A 6-pin feed supplies up to 75 W and an 8-pin up to 150 W, on top of the 75 W the slot itself provides. Newer high-end cards instead use a 12-pin 12VHPWR / 12V-2x6 connector.'),

('a1-f-620','aplus1',3,'3.5','core',
 'How does a SATA power connector differ from a Molex connector?',
 'SATA power is a flat, L-keyed 15-pin connector carrying +3.3 V, +5 V and +12 V to drives, and it is always paired with a separate 7-pin data cable. The older 4-pin Molex carries only +5 V and +12 V and now mostly serves fans, pumps, older optical drives and adapters. Adapters exist between them, but the native connector is always preferred.'),

('a1-f-621','aplus1',3,'3.5','core',
 'What does the red 115/230 V switch on a power supply do?',
 'On units without automatic voltage sensing it selects the input voltage range for the region. Setting it to 115 while plugged into 230 V mains will typically destroy the unit immediately; leaving it at 230 on a 115 V supply usually means the system will not power on. Most modern supplies are auto-switching with universal 100-240 V input and have no switch at all.'),

('a1-f-622','aplus1',3,'3.5','core',
 'What does an 80 PLUS rating tell you, and what does it not?',
 'It grades efficiency - the percentage of AC drawn from the wall that becomes usable DC - at typical load points, in tiers from 80 PLUS through Bronze, Silver, Gold and Platinum to Titanium. Higher efficiency means less waste heat and lower running cost. It says nothing about how many watts the unit can supply, its +12 V amperage, or which connectors it has.'),

('a1-f-623','aplus1',3,'3.5','core',
 'How much headroom should a power supply have over the calculated load?',
 'Size it comfortably above the summed peak draw - commonly around 20-30 percent - so the unit runs in its efficient mid-load band, absorbs the brief transient spikes modern CPUs and GPUs produce, and leaves room for a future upgrade. An undersized unit does not degrade gracefully: it trips protection and the system reboots or shuts down under load.'),

('a1-f-624','aplus1',3,'3.5','core',
 'What are the typical symptoms of a failing or overloaded power supply?',
 'Random shutdowns or reboots that appear only under load, intermittent failure to POST, devices dropping out, a burning smell, or loud fan noise and coil whine. Confirm by measuring the rails at the 24-pin connector with a multimeter or PSU tester under load, or by substituting a known-good unit - a fan that spins proves the unit switches on, not that its output is in tolerance.'),

('a1-f-625','aplus1',3,'3.5','core',
 'What must be checked about physical form factor when replacing a power supply?',
 'A standard ATX unit will not fit a small-form-factor chassis, which needs SFX or TFX dimensions with the matching screw pattern and shorter cables. Some prebuilt OEM systems also use proprietary connector pinouts in a standard-looking shell, and fitting a normal ATX unit to such a board can damage it - match the OEM part or the documented form factor.'),

('a1-f-626','aplus1',3,'3.5','core',
 'Why does a motherboard still have power when the PC is switched off?',
 'The PSU keeps its +5 V standby rail live whenever it is plugged in and the rear rocker switch is on, so the power button, Wake-on-LAN and USB charging keep working. Before servicing, unplug the cord (or switch off at the PSU) and press and hold the case power button to drain residual charge. Never open the PSU housing itself - its capacitors can hold a lethal charge.'),

('a1-f-627','aplus1',3,'3.5','core',
 'How do you size a power supply for a new build?',
 'Add the manufacturer rated draw of the CPU and GPU (the two dominant loads), add an allowance for drives, fans, memory and peripherals, then add headroom. Then verify connectors and rails separately: the unit needs a 24-pin, the right 4/8-pin EPS feed, enough PCIe 6+2 plugs for the card, and a +12 V rail rated to cover the load. A high-wattage unit missing a required connector still cannot run the build.'),

-- ============================================================
-- 3.6  Multifunction devices and printers: setup and configuration
--      (a1-f-628 .. a1-f-645)
-- ============================================================

('a1-f-628','aplus1',3,'3.6','acronym',
 'MFD',
 'Multifunction Device - one unit combining printing, scanning, copying and often faxing, sharing a single paper path, one network address and one management interface. Consolidating the functions also consolidates configuration: drivers, security and scan destinations are all set on the same device.'),

('a1-f-629','aplus1',3,'3.6','acronym',
 'ADF',
 'Automatic Document Feeder - the tray above a scanner or MFD that draws a stack of loose sheets past the scan head one at a time, so multi-page originals need no manual handling. A duplexing (or reversing) ADF also captures the reverse of each sheet in the same run.'),

('a1-f-630','aplus1',3,'3.6','core',
 'When would you install a PCL driver rather than a PostScript one?',
 'PCL (Printer Command Language, from HP) renders quickly and is the sensible default for general office documents. PostScript (Adobe) describes the page in a device-independent language and reproduces fonts, vectors and colour more faithfully, so design and print-production work prefers it. Sending a language the device does not support usually prints pages of raw code instead of the document.'),

('a1-f-631','aplus1',3,'3.6','core',
 'When is the vendor driver package needed rather than the built-in OS class driver?',
 'A generic class driver gets basic printing working straight away with no download. The vendor package exposes device-specific capability: the duplex unit, extra trays, a stapler or finisher, secure print release and scan-to destinations. If a feature such as duplex is greyed out in printing preferences, either the wrong driver is loaded or the installable option has not been enabled in device settings.'),

('a1-f-632','aplus1',3,'3.6','core',
 'What is the difference between automatic and manual duplex, and between long-edge and short-edge flip?',
 'An automatic duplexer turns the sheet inside the printer; manual duplex prints all the odd pages and prompts the user to reload the stack for the even ones. Long-edge flip keeps both faces upright for a document bound down the left side, like a book; short-edge flip suits binding along the top, like a notepad, and looks upside down if bound on the long edge.'),

('a1-f-633','aplus1',3,'3.6','core',
 'What does the collate setting change in a multi-copy job?',
 'With collate on, three copies of a ten-page document print as 1-10, 1-10, 1-10 - complete sets ready to staple. With it off, the printer produces ten stacks: three copies of page 1, then three of page 2, and so on. Collating inside the device requires enough printer memory or storage to hold the whole job.'),

('a1-f-634','aplus1',3,'3.6','core',
 'What is the difference between portrait and landscape orientation, and what else should be checked with it?',
 'Portrait is taller than wide and is the default for text; landscape is wider than tall and suits spreadsheets, timelines and wide tables. Orientation is set in the application or the driver preferences. If output prints clipped or shifted, check that the paper size (Letter against A4) and the tray configuration agree with the orientation the job requested.'),

('a1-f-635','aplus1',3,'3.6','core',
 'Why must each paper tray be configured with its media size and type?',
 'The device uses the tray configuration to route a job to a source that holds the requested media, and to apply the right fuser temperature and feed behaviour for heavier stock, labels or envelopes. A mismatch produces load-paper prompts even when a tray is full, jams, or toner that will not fuse properly onto thick media.'),

('a1-f-636','aplus1',3,'3.6','core',
 'What is the trade-off in the print quality setting, and where is it configured?',
 'Higher quality (a higher DPI or best setting) lays down more toner or ink and prints more slowly; draft or econo mode is faster and cheaper and is appropriate for internal copies. It is set in the driver printing preferences, and on a shared queue an administrator can set the default for everyone - draft-by-default is a common consumables-saving policy.'),

('a1-f-637','aplus1',3,'3.6','core',
 'How do USB, Ethernet and wireless printer connections compare?',
 'USB is a direct single-host connection: simplest, no network configuration, but only that PC can print unless the printer is shared. Ethernet gives the device its own address so many clients print directly to it, and it is the most reliable choice for a shared office device. Wireless suits places with no network drop, and Wi-Fi Direct lets a client print peer-to-peer without joining the LAN at all.'),

('a1-f-638','aplus1',3,'3.6','core',
 'Why does a network printer need a static IP address or a DHCP reservation?',
 'Client queues and print servers target the device by address or by a DNS name that resolves to it. If DHCP later hands the printer a different lease, every queue pointing at the old address fails with printer-offline errors until it is rebuilt. Pinning the address - statically on the device, or as a reservation on the DHCP server - removes the whole class of failure.'),

('a1-f-639','aplus1',3,'3.6','core',
 'What is the difference between a shared printer and a print server?',
 'A shared printer is hosted on a workstation or server that holds the queue and driver, so that machine must be powered on and reachable for anyone else to print. A print server - a server role, or a small hardware print-server box - centralises queues, driver distribution, permissions and accounting for the whole network and does not depend on any one user workstation.'),

('a1-f-640','aplus1',3,'3.6','core',
 'How do clients reach a shared Windows printer, and what must be enabled on the host?',
 'Clients connect to the UNC path \\hostname\sharename. The host needs printer sharing turned on for that queue, network discovery and file-and-printer-sharing permitted through its firewall, and appropriate share permissions. Clients either supply their own matching driver or download it from the host, which is why the host should carry drivers for each client architecture.'),

('a1-f-641','aplus1',3,'3.6','core',
 'What problem does secured print (pull printing) solve, and how does it work?',
 'It stops confidential documents lying in the output tray of a shared device. The job is held on the printer or print server until its owner authenticates at the panel - PIN, badge tap or directory login - and releases it, so pages are only produced with the owner present. It also cuts waste, because jobs nobody collects are never printed at all.'),

('a1-f-642','aplus1',3,'3.6','core',
 'What does badging add to a multifunction device?',
 'Users tap an existing ID or proximity card on a reader at the device to authenticate, releasing held secure print jobs and unlocking copy, scan and fax functions. It gives per-user accounting and access control without typing credentials on a small panel, and a lost badge can be revoked centrally so device access is removed everywhere at once.'),

('a1-f-643','aplus1',3,'3.6','core',
 'What do MFD audit logs record, and what makes them meaningful?',
 'Per-job records of who printed, copied, scanned or faxed what, when, and how many pages - used for departmental chargeback, quota enforcement and investigating leaks of sensitive material. They only carry weight when each user authenticates individually: a shared department PIN attributes every job to a group, so the log can never identify a person.'),

('a1-f-644','aplus1',3,'3.6','core',
 'Where can a network scan service send a scanned document, and what does each destination need?',
 'Scan-to-email needs the SMTP server address and port, a sender address and any relay credentials. Scan-to-folder over SMB needs the share path plus an account with write permission. Scan-to-cloud needs a linked storage account, and scan-to-FTP needs server credentials. When one destination fails while another works, the fault is almost always credentials, permissions or a blocked port - not the scanner.'),

('a1-f-645','aplus1',3,'3.6','core',
 'When should the flatbed glass be used instead of the ADF?',
 'Use the ADF for stacks of loose, same-size, undamaged sheets - and a duplexing ADF captures both faces in one pass. Use the flatbed for bound books, fragile or torn originals, odd-size items and photographs, none of which can be dragged through rollers safely. A streak on every ADF-scanned page points to the ADF scan strip; a streak only on flatbed scans points to the platen glass.'),

-- ============================================================
-- 3.7  Printer consumables  (a1-f-646 .. a1-f-662)
-- ============================================================

('a1-f-646','aplus1',3,'3.7','core',
 'What are the seven stages of the laser imaging process, in order?',
 'Processing (the page is rasterised into a bitmap in printer memory), charging (the primary charge roller applies a uniform negative charge to the drum), exposing (the laser writes the image by discharging those areas), developing (toner is drawn from the developer roller onto the written areas), transferring (a positive charge on the paper pulls the toner off the drum), fusing (heat and pressure melt the toner into the fibres), cleaning (residual toner is scraped away and the drum charge is neutralised).'),

('a1-f-647','aplus1',3,'3.7','core',
 'What does the fuser do, and what is the safety consideration when replacing it?',
 'A heated roller or belt works with a pressure roller to melt toner and bond it permanently into the paper. It runs at roughly 200 degrees Celsius, so it must be allowed to cool before it is removed - fuser burns are the most common laser-printer injury. It is a scheduled wear item and is normally supplied as part of the maintenance kit rather than replaced alone.'),

('a1-f-648','aplus1',3,'3.7','core',
 'What is the imaging drum, and what damages it?',
 'A photosensitive cylinder that holds the electrostatic latent image between exposing and transferring. Light and physical contact are its enemies: never touch its surface or leave it exposed to bright light, and keep cartridges in their protective bag until fitted. On small printers the drum is built into the toner cartridge; on larger models it is a separate consumable with its own page-life rating.'),

('a1-f-649','aplus1',3,'3.7','core',
 'What is the difference between a transfer roller and a transfer belt?',
 'A monochrome laser uses a transfer roller that applies a positive charge to the back of the sheet so the negatively charged toner jumps from drum to paper. A colour laser adds a transfer belt, which first collects the cyan, magenta, yellow and black layers from four separate drums and then transfers the assembled image to the paper in a single pass.'),

('a1-f-650','aplus1',3,'3.7','core',
 'What do the pickup roller and separation pad each do, and what does each failure look like?',
 'The pickup roller grabs the top sheet from the tray; the separation pad or separation roller provides the friction that holds back the sheets underneath. A glazed, worn pickup roller means the printer fails to feed at all, while a worn separation pad means several sheets go through together. Both are replaced as part of the maintenance kit.'),

('a1-f-651','aplus1',3,'3.7','core',
 'What is in a laser maintenance kit, and what must be done after fitting one?',
 'Typically the fuser assembly, the transfer roller and a set of feed and pickup rollers - the wear parts rated for the same page interval, which the device tracks and announces when it is due. After installation the maintenance page counter must be reset, or the printer keeps reporting service due and the next interval is mistracked.'),

('a1-f-652','aplus1',3,'3.7','core',
 'Why and when is a colour laser printer calibrated?',
 'Calibration re-registers the four colour planes on top of each other and corrects density drift, so colours match and text has no coloured fringe. Run it after replacing toner, the drum or the transfer belt, after moving the printer, or whenever output shows shifted colours or fringing - it corrects alignment and density, not a supply problem.'),

('a1-f-653','aplus1',3,'3.7','core',
 'How is spilled toner cleaned up safely?',
 'Toner is a fine plastic powder that melts with heat. Wipe with a dry or slightly damp cool cloth, and vacuum only with a toner-rated unit fitted with a HEPA or ESD-safe filter. An ordinary vacuum passes the particles straight through its filter and back into the air, and hot water fuses toner permanently into fabric - so clothing is rinsed in cold water first.'),

('a1-f-654','aplus1',3,'3.7','core',
 'What is the inkjet print head, and why do heads clog?',
 'It sprays microscopic droplets through nozzles, using either a thermal (bubble) or a piezoelectric mechanism. Ink dries in nozzles that sit idle, causing banding, gaps and missing colours even when cartridges read full. The fix is the driver head-cleaning cycle followed by a nozzle-check page; cleaning consumes ink, so it should not be repeated indefinitely. On some models the head is part of the cartridge, on others it is a separate replaceable part.'),

('a1-f-655','aplus1',3,'3.7','core',
 'What does inkjet head alignment correct, and when is it run?',
 'It prints a test pattern to line up the forward and reverse passes of the head and the position of the colour nozzles relative to each other. Without it, vertical lines look doubled or wavy and text looks fuzzy, even though no colour is missing. Run it after installing a new cartridge or print head, or after the printer has been moved.'),

('a1-f-656','aplus1',3,'3.7','core',
 'What is the inkjet carriage belt, and what does its failure look like?',
 'The toothed belt a stepper motor uses to drag the print-head carriage across the page. When it stretches, slips, frays or breaks, the carriage stalls partway, grinds, or strikes the side of the printer, and output comes out shifted, streaked or overlapped. It is a mechanical wear part, distinct from the transfer belt found in colour laser printers.'),

('a1-f-657','aplus1',3,'3.7','core',
 'How should a new inkjet cartridge be handled during installation?',
 'Hold it by the plastic body, peel off the protective tape covering the nozzles and vent only at the moment of installation, and never touch the nozzle plate or the copper contacts - skin oils cause misfires and poor electrical contact. Install promptly so the nozzles do not dry, then run alignment. Third-party refills can void warranty and clog the head with incompatible ink chemistry.'),

('a1-f-658','aplus1',3,'3.7','core',
 'How does a direct thermal printer form an image, and what limits its output?',
 'A heating element in the print head burns dots into heat-sensitive coated paper - there is no ink, toner or ribbon, so the paper is the only consumable. The image fades with heat, light and time, so it suits receipts and shipping labels rather than records that must last. The thermal transfer variant instead melts wax or resin from a ribbon onto the stock for durable labels.'),

('a1-f-659','aplus1',3,'3.7','core',
 'What maintenance does a thermal printer need?',
 'Load the correct thermal stock with the coated side facing the print head - a roll fitted the wrong way round feeds normally but produces blank output. Clean the heating element with isopropyl alcohol on a lint-free swab, or run a cleaning card, when vertical white lines appear. Clear paper dust and label adhesive from the feed assembly, since residue causes both jams and blocked dots.'),

('a1-f-660','aplus1',3,'3.7','core',
 'How does an impact printer work, and what are its consumables?',
 'A print head fires pins that strike an inked ribbon against the paper. Its consumables are the ribbon (steadily fading output means the ribbon is exhausted), the print head itself (a row of dots missing from every character means a failed pin), and continuous tractor-feed paper with sprocket holes along removable perforated edges.'),

('a1-f-661','aplus1',3,'3.7','core',
 'Why are impact printers still used despite being slow and noisy?',
 'They are the only common technology that can produce multipart carbon-copy forms in a single pass, because the pins physically strike through every layer - invoices, delivery notes and point-of-sale forms in warehouses and workshops. They also tolerate dirty, hot industrial environments well. The trade-off is low print quality, slow speed and considerable noise.'),

('a1-f-662','aplus1',3,'3.7','core',
 'What consumables does a 3D printer use?',
 'An FDM printer uses filament - a spool of thermoplastic such as PLA or ABS, melted and extruded layer by layer. An SLA or DLP resin printer uses liquid photopolymer resin cured by light; uncured resin is a skin and respiratory irritant, so gloves and ventilation are required and prints need washing and post-curing. Both depend on a clean, level, properly prepared print bed for the first layer to adhere.');
