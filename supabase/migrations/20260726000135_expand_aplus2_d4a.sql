-- A+ Core 2 (220-1102) Domain 4 (Operational Procedures) expansion, part A.
-- Adds questions a2-q-1000..a2-q-1049 (50) and flashcards a2-f-1000..a2-f-1060 (61)
-- across objectives 4.1-4.4. Existing content is untouched; these are additions only.
--   4.1 Documentation/support systems ................ 13 q + 15 f = 28
--   4.2 Change management ............................ 13 q + 15 f = 28
--   4.3 Backup/recovery, safety procedures ........... 12 q + 16 f = 28
--   4.4 Environmental impacts and controls ........... 12 q + 15 f = 27
-- Total: 50 questions + 61 flashcards = 111 new items.

insert into questions (id, cert, domain, objective, qtype, difficulty, stem, choices, answer, explanation) values

-- ===================================================================
-- 4.1  Documentation/support systems
-- ===================================================================
($q$a2-q-1000$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$mcq$q$,1,
 $q$A user calls the help desk to report that their laptop will not power on. Which piece of information is LEAST important for the technician to record when opening the ticket?$q$,
 $q$["The laptop's asset tag number","The user's favorite color","A description of the symptoms the user observed","The user's contact information and department"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Ticket intake should capture user information, device or asset information, and a description of the problem; the user's favorite color has no bearing on troubleshooting or documentation and should not be recorded.$q$),

($q$a2-q-1001$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$mcq$q$,1,
 $q$Which document would a new employee most likely read to understand which types of websites and applications are permitted on company-owned devices?$q$,
 $q$["Network topology diagram","Acceptable use policy","Incident report","Standard operating procedure for password resets"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$An acceptable use policy (AUP) defines what employees may and may not do with company systems and network resources, including which websites and applications are permitted.$q$),

($q$a2-q-1002$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$mcq$q$,2,
 $q$A technician resolves a recurring issue where a specific line-of-business application crashes after a Windows update. To help other technicians resolve the same issue faster in the future, the technician should document the symptoms, cause, and resolution in which system?$q$,
 $q$["The asset management database","The network topology diagram","The knowledge base","The regulatory compliance policy"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$A knowledge base stores articles describing known issues, their causes, and their resolutions so other technicians can find and apply proven solutions instead of re-diagnosing the same problem from scratch.$q$),

($q$a2-q-1003$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$mcq$q$,2,
 $q$An organization wants to track which employee is currently using each laptop, when each laptop's warranty expires, and where each laptop sits in its procurement lifecycle. Which system should the organization maintain?$q$,
 $q$["A splash screen","A knowledge base article","A change request form","An asset management database"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$Asset management databases track assigned users, asset tags or IDs, warranty and licensing information, and procurement lifecycle stage for each piece of equipment.$q$),

($q$a2-q-1004$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$mcq$q$,1,
 $q$What is the primary purpose of assigning a severity or priority level to a help desk ticket?$q$,
 $q$["To determine how quickly the issue needs to be addressed relative to other open tickets","To decide which color the ticket should appear in the database","To calculate the user's satisfaction score","To determine which vendor manufactured the affected device"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Severity and priority levels help support teams triage and order their work so that business-critical or widespread issues are addressed before low-impact issues.$q$),

($q$a2-q-1005$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$mcq$q$,2,
 $q$A technician closes a ticket immediately after a phone call ends but does not write any notes about what was tried or what fixed the issue. Which best practice did the technician fail to follow?$q$,
 $q$["Verifying the user's asset tag number","Recording progress notes and the resolution before closing the ticket","Escalating the ticket to Tier 2","Attaching a network topology diagram to the ticket"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$Ticketing best practice requires documenting progress notes and the final resolution before closing a ticket so it provides a useful history for future reference, audits, and knowledge base articles.$q$),

($q$a2-q-1006$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$mcq$q$,3,
 $q$A company's SOP requires that any workstation removed from inventory be updated in the asset management system within 24 hours. A technician disposes of an old desktop but forgets to update the database. Six months later, an audit finds the desktop still listed as "in service" and assigned to an employee who left the company. What is the MOST direct consequence of this documentation failure?$q$,
 $q$["The desktop's warranty is automatically extended","The knowledge base article count decreases","The asset inventory no longer accurately reflects the organization's actual equipment","The network topology diagram becomes outdated"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$Failing to update the asset management database after decommissioning equipment breaks the accuracy of the inventory, which can cause compliance, audit, security, and financial-tracking problems.$q$),

($q$a2-q-1007$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$mcq$q$,1,
 $q$Which of the following is an example of a standard operating procedure (SOP)?$q$,
 $q$["A diagram showing how switches and routers are physically connected","A pop-up message displayed at login warning against unauthorized use","A spreadsheet listing every asset tag in the building","A step-by-step document describing exactly how to image and deploy a new workstation"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$An SOP is a documented, repeatable, step-by-step process for performing a specific task consistently, such as imaging and deploying workstations.$q$),

($q$a2-q-1008$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$mcq$q$,2,
 $q$A visitor logs into a guest kiosk and sees a message stating that all activity on the device is monitored and that use of the kiosk implies consent to company policy. What is this message called?$q$,
 $q$["A splash screen","A knowledge base article","An asset tag","A change request form"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A splash screen, or login banner, is displayed before or during login to communicate policy notices, such as monitoring and acceptable use, to the person logging in.$q$),

($q$a2-q-1009$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$multi$q$,2,
 $q$Which TWO of the following should be included when opening a new help desk ticket for a hardware failure?$q$,
 $q$["The affected device's asset tag or serial number","The technician's personal cell phone number","The stock price of the device manufacturer","A description of the symptoms the user is experiencing"]$q$::jsonb,
 $q$[0,3]$q$::jsonb,
 $q$A well-formed ticket identifies the specific device by asset tag or serial number and describes the observed symptoms so the issue can be triaged and reproduced; the technician's personal number and the manufacturer's stock price are irrelevant.$q$),

($q$a2-q-1010$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$multi$q$,2,
 $q$Which TWO of the following are typical fields tracked in an asset management database?$q$,
 $q$["The user's home street address","Warranty expiration date","Assigned user","The technician's favorite troubleshooting tool"]$q$::jsonb,
 $q$[1,2]$q$::jsonb,
 $q$Asset management databases commonly track warranty and licensing dates and the currently assigned user, along with asset tags, purchase dates, and lifecycle stage; unrelated personal details are not tracked there.$q$),

($q$a2-q-1011$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$ordering$q$,2,
 $q$Place the following steps of handling a help desk ticket in the order they normally occur, from first to last.$q$,
 $q$["Escalate to Tier 2 if unresolved within the SOP time limit","Record user information, device information, and a description of the problem","Document the resolution and close the ticket","Attempt troubleshooting and record progress notes"]$q$::jsonb,
 $q$[1,3,0,2]$q$::jsonb,
 $q$Proper ticket workflow starts with recording user, device, and problem details, then attempting troubleshooting while logging progress notes, escalating if the SOP time limit is exceeded, and finally documenting the resolution before closing the ticket.$q$),

($q$a2-q-1012$q$,$q$aplus2$q$,4,$q$4.1$q$,$q$matching$q$,3,
 $q$Match each documentation/support system term on the left with the description that best fits it on the right.$q$,
 $q${"left":["Knowledge base","Asset management database","Standard operating procedure","Network topology diagram"],"right":["A visual map showing how network devices are physically or logically connected","A step-by-step document ensuring a task is performed the same way every time","A repository of articles describing known issues and their resolutions","A record of every device's warranty, assigned user, and lifecycle stage"]}$q$::jsonb,
 $q$[2,3,1,0]$q$::jsonb,
 $q$A knowledge base collects known-issue articles, an asset management database records device lifecycle and ownership details, a standard operating procedure standardizes how a task is performed, and a network topology diagram visually maps device connections.$q$),

-- ===================================================================
-- 4.2  Change management
-- ===================================================================
($q$a2-q-1013$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$mcq$q$,1,
 $q$What is the primary purpose of a change request form?$q$,
 $q$["To record the outcome of a completed help desk ticket","To list all assets currently assigned to a department","To formally document what change is being proposed, why, and how it will be implemented before it happens","To display a login warning to end users"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$A change request form captures the details of a proposed change, including its purpose, scope, plan, and risk, so it can be reviewed and approved before implementation.$q$),

($q$a2-q-1014$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$mcq$q$,2,
 $q$A network administrator wants to upgrade the firmware on the company's core switch during business hours without submitting a change request or notifying anyone. What is the MOST significant risk of skipping the change management process?$q$,
 $q$["The firmware vendor will void the switch's warranty automatically","The switch will require a new asset tag","The knowledge base will become out of date","An outage could occur with no rollback plan or stakeholder awareness of what changed"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$Bypassing change management removes the safety net of a documented rollback plan, risk analysis, and stakeholder notification, so if the upgrade causes an outage, recovery is slower and no one expects or understands the disruption.$q$),

($q$a2-q-1015$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$mcq$q$,2,
 $q$Before implementing a major change to a production database schema, a DBA first applies the change to an isolated copy of the environment to observe its effects. What is this practice called?$q$,
 $q$["Sandbox testing","End-user acceptance","Risk analysis","Backout planning"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Sandbox testing applies a proposed change in an isolated, non-production environment to validate its effects before rolling it out to live systems.$q$),

($q$a2-q-1016$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$mcq$q$,1,
 $q$In change management, what does "scope of the change" describe?$q$,
 $q$["The exact dollar cost of the new hardware","Which systems, users, or processes will be affected by the change","The vendor's technical support phone number","The color scheme of the new interface"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$The scope of a change defines its boundaries, meaning which systems, services, or user groups will be impacted, helping reviewers judge how much risk and testing is warranted.$q$),

($q$a2-q-1017$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$mcq$q$,2,
 $q$A patch is applied to a production file server and immediately causes several line-of-business applications to fail. The technician reverts the server to its pre-patch state using a set of documented steps prepared in advance. Which change-management element made this recovery possible?$q$,
 $q$["The end-user acceptance form","The change board meeting minutes","The backout plan","The asset management database"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$A backout, or rollback, plan documents in advance exactly how to undo a change if it causes problems, enabling a fast, controlled recovery.$q$),

($q$a2-q-1018$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$mcq$q$,1,
 $q$Which group is typically responsible for reviewing and approving proposed changes before they are implemented in a production environment?$q$,
 $q$["The help desk tier 1 team","The end users affected by the change","The hardware vendor","The change advisory board"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$A change advisory board, or change board, reviews proposed changes, weighing risk, scope, and business impact, and formally approves or rejects them before implementation.$q$),

($q$a2-q-1019$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$mcq$q$,2,
 $q$A company's mail server is actively being exploited and must be patched immediately to stop data loss, well outside the normal weekly change window. Which type of change process should be used?$q$,
 $q$["Emergency change","Standard change","Sandbox testing","End-user acceptance review"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$An emergency change is used when a change must be implemented immediately to address a critical issue, such as an active exploit, bypassing the normal approval timeline while still requiring documentation and after-the-fact review.$q$),

($q$a2-q-1020$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$mcq$q$,3,
 $q$A change request for a routine, low-risk software update follows the organization's pre-approved, well-documented process that has been performed successfully many times before with minimal review. What type of change is this?$q$,
 $q$["An emergency change","A standard change","A regulatory compliance policy","A splash screen deployment"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$A standard change is a low-risk, well-understood, pre-approved change that follows an established, repeatable process, requiring only lightweight review rather than full change board deliberation.$q$),

($q$a2-q-1021$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$mcq$q$,2,
 $q$Why does the change management process require end-user acceptance before some changes are considered complete?$q$,
 $q$["To determine the asset tag number of affected hardware","To calculate the risk score of unrelated future changes","To confirm the change achieves the intended result from the perspective of the people who actually use the affected system","To decide which technician gets credit for the change"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$End-user acceptance verifies that the implemented change actually works as intended for the people who rely on the system daily, confirming the change met its purpose.$q$),

($q$a2-q-1022$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$multi$q$,2,
 $q$Which TWO of the following should be documented as part of a formal change request?$q$,
 $q$["A risk analysis of what could go wrong","The requesting technician's favorite lunch spot","A plan describing how the change will be implemented","The office thermostat setting for the day"]$q$::jsonb,
 $q$[0,2]$q$::jsonb,
 $q$A complete change request documents the risk analysis and the implementation plan, along with purpose, scope, and a backout plan; personal or irrelevant details have no place in the record.$q$),

($q$a2-q-1023$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$multi$q$,3,
 $q$A change board is evaluating a proposed change to migrate email to a new platform. Which TWO factors should weigh most heavily in their risk analysis?$q$,
 $q$["The brand of coffee served in the break room","How many users and business processes depend on the current email system","The technician's years of unrelated hobby experience","Whether a tested rollback plan exists if the migration fails"]$q$::jsonb,
 $q$[1,3]$q$::jsonb,
 $q$Risk analysis should weigh the scope of impact, meaning how many users and processes depend on the system, and whether a viable backout plan exists, since these determine how severe a failure would be and how quickly it could be recovered from.$q$),

($q$a2-q-1024$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$ordering$q$,3,
 $q$Place the following change-management steps in the typical order they occur, from first to last.$q$,
 $q$["Change board reviews and approves the request","Change is tested in a sandbox environment","Change request form is submitted describing purpose, scope, and risk analysis","Change is implemented in production with a backout plan ready"]$q$::jsonb,
 $q$[2,0,1,3]$q$::jsonb,
 $q$A change is typically requested and documented first, reviewed and approved by the change board, validated in a sandbox before touching production, and finally implemented with a backout plan ready in case it fails.$q$),

($q$a2-q-1025$q$,$q$aplus2$q$,4,$q$4.2$q$,$q$matching$q$,2,
 $q$Match each change-management term on the left to its correct description on the right.$q$,
 $q${"left":["Backout plan","Sandbox testing","Change board","Standard change"],"right":["A pre-approved, low-risk change following an established repeatable process","The group that reviews and approves proposed changes","Steps prepared in advance to undo a change if it fails","Validating a change in an isolated, non-production environment"]}$q$::jsonb,
 $q$[2,3,1,0]$q$::jsonb,
 $q$A backout plan defines how to undo a failed change, sandbox testing validates a change away from production, a change board reviews and approves requests, and a standard change is a pre-approved, low-risk process.$q$),

-- ===================================================================
-- 4.3  Backup/recovery and safety procedures
-- ===================================================================
($q$a2-q-1026$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$mcq$q$,1,
 $q$Which backup type captures ALL selected data every time it runs, regardless of what has changed since the last backup?$q$,
 $q$["Incremental backup","Full backup","Differential backup","Synthetic backup"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$A full backup copies the entire selected data set every time it runs, independent of any prior backup, which makes restores simple but takes the most time and storage per run.$q$),

($q$a2-q-1027$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$mcq$q$,2,
 $q$A backup job is configured to copy only the files that have changed since the LAST backup of any type, whether full or incremental. Which backup type is this?$q$,
 $q$["Full backup","Synthetic backup","Incremental backup","3-2-1 backup"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$An incremental backup copies only data changed since the most recent backup of any type, resulting in small, fast backups but restores that require the last full backup plus every incremental since.$q$),

($q$a2-q-1028$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$mcq$q$,2,
 $q$A backup job copies all files that have changed since the LAST FULL backup, regardless of any incremental backups run in between. Which backup type is this?$q$,
 $q$["Incremental backup","Full backup","Grandfather backup","Differential backup"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$A differential backup copies all changes since the last full backup, so each differential grows larger over time, but a restore only ever needs the last full backup plus the most recent differential.$q$),

($q$a2-q-1029$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$mcq$q$,3,
 $q$A backup system periodically combines a full backup with its subsequent incremental backups to produce a new consolidated full backup image, without requiring a full backup to be read from the original production data again. What is this technique called?$q$,
 $q$["Synthetic full backup","Differential backup","Grandfather-father-son rotation","ESD-safe backup"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$A synthetic full backup is created by merging an existing full backup with subsequent incrementals at the backup storage level, producing the equivalent of a new full backup without re-reading all data from the source.$q$),

($q$a2-q-1030$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$mcq$q$,1,
 $q$Under the 3-2-1 backup rule, how many total copies of data should exist, including the original?$q$,
 $q$["2","3","1","4"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$The 3-2-1 rule specifies 3 total copies of data, the original plus 2 backups, stored on 2 different types of media, with 1 copy kept offsite.$q$),

($q$a2-q-1031$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$mcq$q$,2,
 $q$A technician is about to open a desktop computer case to replace a stick of RAM. Before touching any internal components, the technician puts on a wrist strap connected to a grounding point. What is the primary purpose of this step?$q$,
 $q$["To prevent the technician from being electrocuted by wall power","To keep the technician's hands warm while working","To prevent electrostatic discharge from damaging sensitive components","To satisfy a network topology diagram requirement"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$An ESD wrist strap safely channels static electricity away from the technician's body so it cannot discharge into and damage sensitive electronic components.$q$),

($q$a2-q-1032$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$mcq$q$,2,
 $q$Why should a technician avoid working on computer hardware while standing on a carpeted floor in a low-humidity room without ESD precautions?$q$,
 $q$["Carpet fibers can short-circuit the power supply directly","Low humidity causes hard drives to overheat","Carpeted rooms are always poorly grounded electrically","Carpet and dry air both increase the buildup of static electricity, raising the risk of ESD damage to components"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$Low humidity and friction against carpet both promote static charge buildup on a person's body, increasing the risk that touching a component will discharge damaging static electricity into it.$q$),

($q$a2-q-1033$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$mcq$q$,2,
 $q$A server room contains sensitive electrical equipment and stored backup media. Which class of fire extinguisher is appropriate for an electrical fire in this room?$q$,
 $q$["Class C","Class A","Class B","Class K"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Class C fire extinguishers are rated for fires involving energized electrical equipment; using a water-based Class A extinguisher on live electrical equipment risks electrocution.$q$),

($q$a2-q-1034$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$mcq$q$,3,
 $q$A technician notices that a desktop's metal case has been retrofitted with a three-prong power cord, but the third, ground, prong was clipped off to fit an old two-prong outlet. What safety concern does this create?$q$,
 $q$["The computer will run at a slower clock speed","Without a proper ground path, a fault inside the case could energize the metal chassis and shock anyone who touches it","The power supply fan will spin in reverse","The hard drive will lose its partition table"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$The ground prong provides a safe path for fault current back to the electrical panel; removing it means a short inside the case could leave the metal chassis energized, creating a serious shock hazard.$q$),

($q$a2-q-1035$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$multi$q$,2,
 $q$Which TWO of the following are effective ESD prevention practices when working inside a computer case?$q$,
 $q$["Wearing an anti-static wrist strap connected to a ground point","Wearing wool socks and rubbing them on the carpet beforehand","Removing the power supply's ground prong to reduce resistance","Working on top of an anti-static mat"]$q$::jsonb,
 $q$[0,3]$q$::jsonb,
 $q$An anti-static wrist strap and an anti-static mat both safely bleed away static charge before it can discharge into components; rubbing wool on carpet generates static, and removing a ground prong is a serious safety hazard, not an ESD control.$q$),

($q$a2-q-1036$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$ordering$q$,2,
 $q$Place these steps in the correct logical order for restoring data after a full failure when using an incremental backup scheme, from first performed to last performed.$q$,
 $q$["Apply each incremental backup in the order it was created, oldest to newest","Identify the most recent full backup taken before the failure","Restore the most recent full backup to the system","Confirm the incremental backups all run between the full backup and the failure"]$q$::jsonb,
 $q$[1,3,2,0]$q$::jsonb,
 $q$Restoring from an incremental scheme starts by identifying the last full backup before the failure, confirming which incrementals fall between it and the failure, restoring the full backup first, and then applying each incremental in chronological order.$q$),

($q$a2-q-1037$q$,$q$aplus2$q$,4,$q$4.3$q$,$q$matching$q$,3,
 $q$Match each backup type on the left with its restore-time tradeoff on the right.$q$,
 $q${"left":["Full backup","Incremental backup","Differential backup","Synthetic full backup"],"right":["Restore requires only the last full backup plus the most recent differential","Restore requires the last full backup plus every incremental since, in order","Restore is fastest because only one backup set is needed, though each backup run takes the longest","Restore is as fast as a full backup restore, without requiring a fresh full read from the source during backup creation"]}$q$::jsonb,
 $q$[2,1,0,3]$q$::jsonb,
 $q$Full backups are slow to create but fast to restore from a single set; incremental backups are fast to create but require replaying every increment since the last full; differential backups need only the last full plus the newest differential; and synthetic fulls give full-backup-speed restores while sparing production systems from repeated full reads.$q$),

-- ===================================================================
-- 4.4  Environmental impacts and controls
-- ===================================================================
($q$a2-q-1038$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$mcq$q$,1,
 $q$A technician spills toner from a laser printer cartridge and is unsure how to safely clean it up and what health hazards it poses. Which document should the technician consult?$q$,
 $q$["The network topology diagram","The change request form","The safety data sheet (SDS) for the toner cartridge","The asset management database"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$A safety data sheet (SDS), formerly called an MSDS, provides hazard information and safe handling and cleanup procedures for chemicals and materials such as toner.$q$),

($q$a2-q-1039$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$mcq$q$,2,
 $q$A server room's temperature has been rising steadily over the past week, and several servers have begun thermal-throttling. Which environmental control is most directly responsible for preventing this kind of issue?$q$,
 $q$["A UPS providing battery backup power","A fire suppression system","An SDS binder","HVAC/cooling system maintaining proper temperature"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$HVAC systems regulate a server room's temperature; when cooling fails or is insufficient, equipment can overheat and throttle or fail.$q$),

($q$a2-q-1040$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$mcq$q$,2,
 $q$Why is maintaining proper humidity levels in a server room important, in addition to temperature?$q$,
 $q$["Humidity that is too low increases static electricity risk, while humidity that is too high can cause condensation and corrosion","Humidity has no measurable effect on electronic equipment","High humidity makes hard drives spin faster","Low humidity causes fire suppression systems to activate automatically"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$Overly dry air increases the risk of electrostatic discharge, while overly humid air can cause condensation and corrosion on components; both extremes threaten equipment reliability.$q$),

($q$a2-q-1041$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$mcq$q$,1,
 $q$What is the main purpose of an uninterruptible power supply (UPS) connected to a server?$q$,
 $q$["To permanently replace the building's utility power","To provide short-term battery power so the server can ride out a brief outage or shut down gracefully during a longer one","To cool the server during heavy processing loads","To document changes made to the server's configuration"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$A UPS supplies battery power for a limited time during a power interruption, allowing equipment to keep running briefly or shut down cleanly, and it also typically filters out surges and sags in the incoming power.$q$),

($q$a2-q-1042$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$mcq$q$,2,
 $q$During a thunderstorm, a brief but significant spike in voltage travels through the power line into an office. A desktop plugged directly into the wall outlet is damaged, but an identical desktop plugged into a UPS a few feet away survives undamaged. What most likely explains the difference?$q$,
 $q$["The UPS increased the wall outlet's voltage rating","The damaged desktop was missing a network topology diagram","The UPS absorbed or diverted the voltage surge before it reached the protected desktop","The surviving desktop had a longer power cord"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$Most UPS units include surge protection that clamps or diverts sudden voltage spikes, shielding connected equipment from the kind of transient surge that can destroy unprotected devices.$q$),

($q$a2-q-1043$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$mcq$q$,2,
 $q$An organization is retiring a batch of old laptop batteries. Why can't these simply be thrown in the regular trash?$q$,
 $q$["Batteries are always classified as trade secrets","Regular trash pickup refuses any item smaller than a desktop tower","Batteries must first be re-imaged before disposal","Batteries contain chemicals that are regulated as hazardous waste and must be disposed of or recycled according to local environmental regulations"]$q$::jsonb,
 $q$3$q$::jsonb,
 $q$Batteries contain heavy metals and chemicals that can leach into soil and water if landfilled, so most jurisdictions require them to be handled as regulated e-waste and recycled or disposed of through approved channels.$q$),

($q$a2-q-1044$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$mcq$q$,1,
 $q$A company is disposing of several old CRT monitors. What is the primary environmental concern that governs how these must be handled?$q$,
 $q$["CRTs contain leaded glass and other hazardous materials that require special recycling under e-waste regulations","CRTs are lighter than modern monitors and easier to break","CRTs contain lithium-ion batteries that can catch fire","CRTs must be kept because they cannot legally be disposed of at all"]$q$::jsonb,
 $q$0$q$::jsonb,
 $q$CRT monitors contain leaded glass and other hazardous materials, so environmental regulations typically require them to be recycled through certified e-waste channels rather than placed in ordinary trash.$q$),

($q$a2-q-1045$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$mcq$q$,3,
 $q$A technician is unsure whether a specific cleaning solvent used in the shop is safe to mix with another chemical, and what personal protective equipment should be worn while using it. Which single document answers both questions?$q$,
 $q$["The company's acceptable use policy","The solvent's safety data sheet (SDS)","The asset management database","The change advisory board's meeting minutes"]$q$::jsonb,
 $q$1$q$::jsonb,
 $q$An SDS documents a chemical's hazards, safe handling instructions, required personal protective equipment, and incompatibilities with other substances, such as chemicals that should never be mixed.$q$),

($q$a2-q-1046$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$mcq$q$,1,
 $q$Which of the following best describes a "brownout"?$q$,
 $q$["A complete, prolonged loss of power","A sudden spike in voltage above normal levels","A temporary drop in voltage below normal levels","A scheduled maintenance window for the power grid"]$q$::jsonb,
 $q$2$q$::jsonb,
 $q$A brownout is a temporary reduction in voltage supply, which can cause equipment to behave erratically or shut down, distinct from a full blackout, a total loss of power, or a surge, a spike above normal.$q$),

($q$a2-q-1047$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$multi$q$,2,
 $q$Which TWO of the following pieces of equipment are typically subject to special e-waste disposal regulations rather than regular trash disposal?$q$,
 $q$["Empty cardboard shipping boxes","Lithium-ion laptop batteries","CRT monitors","Plastic zip ties used for cable management"]$q$::jsonb,
 $q$[1,2]$q$::jsonb,
 $q$Lithium-ion batteries and CRT monitors both contain hazardous materials regulated as e-waste; plain cardboard and plastic zip ties are ordinary, non-hazardous waste.$q$),

($q$a2-q-1048$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$ordering$q$,2,
 $q$Place the following steps in the correct order for safely handling a chemical spill in accordance with its safety data sheet, from first to last.$q$,
 $q$["Consult the SDS for the specific spilled material to determine the correct cleanup and disposal method","Follow the SDS-recommended cleanup procedure and dispose of waste as directed","Put on the personal protective equipment specified in the SDS","Identify which chemical was spilled"]$q$::jsonb,
 $q$[3,0,2,1]$q$::jsonb,
 $q$Safe spill response starts with identifying exactly what was spilled, consulting that material's SDS for guidance, donning the specified personal protective equipment, and then following the documented cleanup and disposal procedure.$q$),

($q$a2-q-1049$q$,$q$aplus2$q$,4,$q$4.4$q$,$q$matching$q$,3,
 $q$Match each environmental hazard or condition on the left with the appropriate control or document on the right.$q$,
 $q${"left":["Unknown chemical hazard from a cleaning solvent","Sudden voltage spike during a storm","Server room air too dry, risking static buildup","Old batteries being retired from inventory"],"right":["Humidity control as part of HVAC management","Recycling through an approved e-waste/hazardous-materials program","Consulting the material's safety data sheet","A UPS with surge protection"]}$q$::jsonb,
 $q$[2,3,0,1]$q$::jsonb,
 $q$Chemical hazards are addressed by consulting the SDS, voltage spikes are mitigated with a surge-protecting UPS, overly dry air is corrected through HVAC humidity control, and batteries must go through approved e-waste and hazardous-material recycling rather than the trash.$q$)
;

insert into flashcards (id, cert, deck, domain, objective, front, back) values

-- ===================================================================
-- 4.1  Documentation/support systems
-- ===================================================================
($q$a2-f-1000$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$What three categories of information should always be captured when opening a help desk ticket?$q$,
 $q$User information (name, contact, department), device information (asset tag, model, serial number), and a clear description of the problem or symptoms -- these form the foundation of an actionable ticket.$q$),

($q$a2-f-1001$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$Why should progress notes be added to a ticket while troubleshooting is still underway?$q$,
 $q$Progress notes create a running history of what has been tried and observed, which prevents duplicated effort if the ticket is escalated or reassigned, and later supports knowledge base articles written from the resolved case.$q$),

($q$a2-f-1002$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$What information does an asset tag typically link to in an asset management system?$q$,
 $q$An asset tag, a unique physical or barcode label, links a specific device to its record in the asset database, including purchase date, warranty status, licensing, assigned user, and lifecycle stage.$q$),

($q$a2-f-1003$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$What is the procurement life cycle in the context of asset management?$q$,
 $q$The procurement life cycle tracks a device from request and purchase, through deployment and active use, to eventual retirement and disposal -- asset management records track where each device currently sits in that cycle.$q$),

($q$a2-f-1004$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$Why do organizations maintain a knowledge base for IT support?$q$,
 $q$A knowledge base stores articles about known issues, their causes, and proven resolutions so technicians, and often end users, can resolve recurring problems faster without re-investigating from scratch every time.$q$),

($q$a2-f-1005$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$What is a regulatory and compliance policy document used for in IT operations?$q$,
 $q$It documents how the organization meets legal, industry, or contractual requirements, such as data handling or retention rules, and IT staff must follow it when configuring systems and handling records.$q$),

($q$a2-f-1006$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$What should a technician do when a ticket's SOP-defined time limit is reached without resolution?$q$,
 $q$Escalate the ticket to the next support tier or appropriate specialist as defined by the SOP, rather than continuing to hold the ticket indefinitely without progress.$q$),

($q$a2-f-1007$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$What is the purpose of a network topology diagram in documentation?$q$,
 $q$It visually represents how network devices such as routers, switches, servers, and workstations are physically or logically connected, helping technicians understand the environment and troubleshoot connectivity issues.$q$),

($q$a2-f-1008$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$Why is warranty and licensing information tracked in asset management systems?$q$,
 $q$Tracking warranty and licensing lets an organization know when a device is still eligible for vendor repair or replacement and whether software on it is properly licensed, avoiding unexpected costs or compliance violations.$q$),

($q$a2-f-1009$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$What is the difference between a ticketing system and a knowledge base?$q$,
 $q$A ticketing system tracks individual support incidents and their status and history for a specific user or device; a knowledge base is a general reference library of known issues and solutions that is not tied to any one ticket.$q$),

($q$a2-f-1010$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.1$q$,
 $q$Why should technicians avoid unexplained jargon and undefined acronyms when writing ticket notes?$q$,
 $q$Ticket notes may be read later by other technicians, auditors, or end users who do not share the same background; plain, clearly defined language keeps documentation useful to everyone who reads it.$q$),

($q$a2-f-1011$q$,$q$aplus2$q$,$q$acronym$q$,4,$q$4.1$q$,
 $q$SOP$q$,
 $q$Standard Operating Procedure -- a documented, step-by-step process ensuring a task, such as imaging a workstation, is performed the same way every time regardless of who performs it.$q$),

($q$a2-f-1012$q$,$q$aplus2$q$,$q$acronym$q$,4,$q$4.1$q$,
 $q$KB (in IT support)$q$,
 $q$Knowledge Base -- a searchable repository of articles documenting known issues, their causes, and proven resolutions, used to speed up troubleshooting and reduce repeated investigation.$q$),

($q$a2-f-1013$q$,$q$aplus2$q$,$q$feynman$q$,4,$q$4.1$q$,
 $q$Explain in plain language why a ticketing system matters even for a one-person IT shop.$q$,
 $q$Even a single technician benefits from tickets because they create a written memory of what happened, when, and how it was fixed, so if the same problem returns in six months there is no need to re-diagnose it from zero, and there is proof of work done for anyone who asks.$q$),

($q$a2-f-1014$q$,$q$aplus2$q$,$q$feynman$q$,4,$q$4.1$q$,
 $q$Explain in plain language the difference between "documenting an asset" and "documenting a procedure."$q$,
 $q$Documenting an asset means recording facts about one specific physical thing, like which laptop belongs to which person and when its warranty ends. Documenting a procedure means writing down the repeatable steps for doing a task, like resetting a password, so anyone following the steps gets the same correct result.$q$),

-- ===================================================================
-- 4.2  Change management
-- ===================================================================
($q$a2-f-1015$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$What four elements should a well-formed change request typically define?$q$,
 $q$The purpose of the change, the scope describing what and who is affected, a risk analysis, and a plan for implementing it, plus a backout plan in case it fails.$q$),

($q$a2-f-1016$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$What is the difference between a standard change and an emergency change?$q$,
 $q$A standard change is low-risk, pre-approved, and follows a well-established repeatable process; an emergency change must be implemented immediately to address a critical, urgent issue and bypasses the normal approval timeline, though it still requires documentation and after-the-fact review.$q$),

($q$a2-f-1017$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$Why is a backout (rollback) plan prepared before a change is implemented, not after?$q$,
 $q$If the backout plan is prepared only after a failure occurs, there is no time to think it through calmly. Preparing it beforehand means the team can revert quickly and confidently if something goes wrong during implementation.$q$),

($q$a2-f-1018$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$What role does the change advisory board (change board) play in change management?$q$,
 $q$It reviews proposed changes for risk, scope, and business impact, and formally approves, rejects, or requests modifications before the change is allowed to proceed.$q$),

($q$a2-f-1019$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$Why is a risk analysis performed before approving a change?$q$,
 $q$Risk analysis estimates what could go wrong, how likely it is, and how severe the impact would be, so the change board can decide whether the benefit of the change outweighs the potential disruption.$q$),

($q$a2-f-1020$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$What does "end-user acceptance" confirm in the change management process?$q$,
 $q$It confirms that the people who actually use the affected system agree the change achieved its intended purpose and works correctly from their point of view.$q$),

($q$a2-f-1021$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$Why should every implemented change be documented after the fact, even if it went smoothly?$q$,
 $q$Documenting completed changes keeps configuration records accurate, gives future technicians a history to reference when troubleshooting, and supports audits and compliance requirements.$q$),

($q$a2-f-1022$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$What is the purpose of scoping a change before submitting a request?$q$,
 $q$Scoping defines exactly which systems, users, or processes the change will touch, which lets reviewers judge how much testing and caution the change actually needs.$q$),

($q$a2-f-1023$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$Why might a low-risk, frequently repeated update still require a documented change process?$q$,
 $q$Even routine updates can affect production systems, so documenting them as standard changes preserves a record and consistency, even though the review can be lighter than for high-risk changes.$q$),

($q$a2-f-1024$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$What is the relationship between sandbox testing and a backout plan?$q$,
 $q$Sandbox testing tries to catch problems before they ever reach production, while a backout plan is the safety net for problems that make it through anyway -- together they reduce both the likelihood and impact of a failed change.$q$),

($q$a2-f-1025$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.2$q$,
 $q$Why do organizations require formal approval before a change touches a production system, rather than letting any technician implement changes at will?$q$,
 $q$Formal approval ensures someone with visibility across the whole environment has weighed the risk and scope, preventing well-intentioned but uncoordinated changes from causing outages nobody was prepared for.$q$),

($q$a2-f-1026$q$,$q$aplus2$q$,$q$acronym$q$,4,$q$4.2$q$,
 $q$CAB (in change management)$q$,
 $q$Change Advisory Board -- the group of stakeholders who review, and approve or reject, proposed changes before they are implemented in production.$q$),

($q$a2-f-1027$q$,$q$aplus2$q$,$q$acronym$q$,4,$q$4.2$q$,
 $q$RFC (in change management)$q$,
 $q$Request for Change -- the formal document submitted to propose a change, describing its purpose, scope, risk analysis, and implementation plan.$q$),

($q$a2-f-1028$q$,$q$aplus2$q$,$q$feynman$q$,4,$q$4.2$q$,
 $q$Explain in plain language why IT departments bother with a formal change process instead of "just fixing it."$q$,
 $q$Because one person's quick fix can quietly break something another team depends on. Writing down what you are changing, why, and how to undo it means everyone affected gets a chance to flag a conflict before it happens, and if it breaks anyway, there is already a plan to put things back.$q$),

($q$a2-f-1029$q$,$q$aplus2$q$,$q$feynman$q$,4,$q$4.2$q$,
 $q$Explain in plain language the difference between testing a change in a sandbox versus testing it with a pilot group of real users.$q$,
 $q$A sandbox is a fake copy of the environment where nothing real is at stake, so you can break things safely and learn from it. A pilot group is real users on the real system, but limited in number, so if something is still wrong, only a few people are affected instead of everyone at once.$q$),

-- ===================================================================
-- 4.3  Backup/recovery and safety procedures
-- ===================================================================
($q$a2-f-1030$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$What is the main tradeoff of full backups compared to incremental backups?$q$,
 $q$Full backups take the longest to create and use the most storage per run, but they make restores simple and fast because only one backup set is needed.$q$),

($q$a2-f-1031$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$What is the main tradeoff of incremental backups?$q$,
 $q$Incremental backups are fast to create and use little storage per run, but restoring requires the last full backup plus every incremental since, applied in order, which takes longer and has more points of failure.$q$),

($q$a2-f-1032$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$What is the main tradeoff of differential backups?$q$,
 $q$Differential backups grow larger each day since they capture everything changed since the last full backup, but a restore only ever needs two backup sets: the last full backup and the most recent differential.$q$),

($q$a2-f-1033$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$Under the 3-2-1 backup rule, what does the "offsite" copy protect against?$q$,
 $q$Keeping one copy offsite protects against localized disasters such as fire, flood, theft, or building damage that could destroy both the original data and an onsite backup at the same time.$q$),

($q$a2-f-1034$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$Why should backups be tested periodically instead of just being created and left alone?$q$,
 $q$A backup that cannot actually be restored is worthless; periodic test restores confirm the backup media and process work before they are needed in a real emergency.$q$),

($q$a2-f-1035$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$What does an anti-static mat do that a wrist strap alone does not?$q$,
 $q$An anti-static mat provides a grounded, static-safe surface to set down components, such as a motherboard, so they are not exposed to a static charge even when not being held by the technician.$q$),

($q$a2-f-1036$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$Why is equipment grounding important beyond just preventing electric shock to a person?$q$,
 $q$A proper ground path also protects sensitive electronics from voltage spikes and helps ensure fuses and breakers trip correctly during a fault, rather than leaving a dangerous voltage present on equipment chassis.$q$),

($q$a2-f-1037$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$What should a technician do with jewelry and loose static-prone clothing before opening a computer case?$q$,
 $q$Remove metal jewelry to avoid short-circuit or shock hazards, and take basic ESD precautions with clothing, since synthetic fabrics can build up static charge that could discharge into components.$q$),

($q$a2-f-1038$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$Why is a grandfather-father-son (GFS) rotation scheme used for backup media?$q$,
 $q$GFS assigns different backup sets to daily, weekly, and monthly roles, so older media is reused on a schedule while still preserving enough historical restore points at different granularities.$q$),

($q$a2-f-1039$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$What immediate action should a technician take before attempting to fight a small electrical fire near computer equipment?$q$,
 $q$Cut power to the equipment if it can be done safely, and only use a Class C or multipurpose ABC extinguisher rated for electrical fires -- never use water on live electrical equipment.$q$),

($q$a2-f-1040$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$Why should backup media not be stored in the same room as the servers it backs up?$q$,
 $q$If a fire, flood, or theft affects the server room, backup media stored in the same location would likely be destroyed or lost along with the original data, defeating the purpose of the backup.$q$),

($q$a2-f-1041$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.3$q$,
 $q$What is the safety reason for never bypassing or clipping a power cord's ground prong?$q$,
 $q$The ground prong gives fault current a safe path back to the panel; without it, an internal short can energize the equipment's metal chassis, creating a shock hazard for anyone who touches it.$q$),

($q$a2-f-1042$q$,$q$aplus2$q$,$q$acronym$q$,4,$q$4.3$q$,
 $q$ESD$q$,
 $q$Electrostatic Discharge -- the sudden flow of static electricity between objects, which can silently damage or destroy sensitive electronic components if not controlled with wrist straps, mats, and proper handling.$q$),

($q$a2-f-1043$q$,$q$aplus2$q$,$q$acronym$q$,4,$q$4.3$q$,
 $q$GFS (backup rotation)$q$,
 $q$Grandfather-Father-Son -- a backup rotation scheme using daily, weekly, and monthly backup sets so that media is reused on a predictable schedule while preserving several restore points at different time scales.$q$),

($q$a2-f-1044$q$,$q$aplus2$q$,$q$feynman$q$,4,$q$4.3$q$,
 $q$Explain in plain language why "incremental" backups are fast to make but slow to restore from.$q$,
 $q$Each incremental only saves what changed since the last backup, so making one is quick -- it is a small pile of new stuff. But to rebuild the whole picture, every day's small pile has to be stacked back on top of the original full backup in the right order, and if even one day's pile is missing or corrupt, the rebuild breaks.$q$),

($q$a2-f-1045$q$,$q$aplus2$q$,$q$feynman$q$,4,$q$4.3$q$,
 $q$Explain in plain language why touching a doorknob after walking on carpet is the same hazard as touching a circuit board without ESD precautions.$q$,
 $q$Walking on carpet in dry air lets your body build up a static charge, just like scuffing your feet. Touching a metal doorknob lets that charge jump all at once and you feel a spark. Touching a circuit board does the exact same thing, except the spark is often too small to feel while still being large enough to destroy a microchip.$q$),

-- ===================================================================
-- 4.4  Environmental impacts and controls
-- ===================================================================
($q$a2-f-1046$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$What is the difference between MSDS and SDS?$q$,
 $q$MSDS (Material Safety Data Sheet) is the older United States term; SDS (Safety Data Sheet) is the standardized, internationally aligned format that replaced it under the Globally Harmonized System -- both document a chemical's hazards, handling, and disposal information.$q$),

($q$a2-f-1047$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$Why does a server room need both temperature AND humidity control, not just air conditioning?$q$,
 $q$Cooling alone controls temperature, but air conditioning can also dry out the air. Without separate humidity management, the room can become too dry, raising ESD risk, or too damp, risking condensation and corrosion.$q$),

($q$a2-f-1048$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$What does a UPS protect against that a simple power strip does not?$q$,
 $q$A UPS provides battery-backed runtime during an outage and typically includes surge suppression, whereas a basic power strip without surge protection offers no backup power and little or no protection from voltage spikes.$q$),

($q$a2-f-1049$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$What is the difference between a surge and a sag in electrical power?$q$,
 $q$A surge is a brief increase above normal voltage, which can damage equipment; a sag, or a brownout if sustained, is a temporary drop below normal voltage, which can cause equipment to malfunction or shut down.$q$),

($q$a2-f-1050$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$Why must toner, batteries, and CRT monitors be disposed of differently from ordinary office trash?$q$,
 $q$Each contains materials regulated as hazardous or e-waste, such as fine particulates, heavy metals, or leaded glass, that can harm the environment if landfilled, so local regulations require recycling or disposal through approved hazardous-waste channels.$q$),

($q$a2-f-1051$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$What information does a safety data sheet (SDS) provide about a chemical product?$q$,
 $q$It documents the chemical's hazards, safe handling and storage instructions, required personal protective equipment, first-aid measures, and proper disposal method.$q$),

($q$a2-f-1052$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$Why should a technician check an SDS before mixing or combining cleaning chemicals?$q$,
 $q$Some chemical combinations react dangerously, producing toxic gas or heat; the SDS lists known incompatibilities so a technician does not unknowingly create a hazardous reaction.$q$),

($q$a2-f-1053$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$What environmental risk does excessively high humidity pose to computer equipment, distinct from low humidity?$q$,
 $q$High humidity can cause condensation to form on and inside equipment, leading to corrosion of contacts and circuitry and increasing the risk of short circuits.$q$),

($q$a2-f-1054$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$Why should a UPS's battery be periodically tested rather than assumed to work?$q$,
 $q$UPS batteries degrade over time and can fail silently; periodic testing confirms the unit can actually deliver backup power and surge protection when a real outage occurs, rather than discovering a dead battery during an emergency.$q$),

($q$a2-f-1055$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$What should a technician do with an SDS binder or its digital equivalent in a workplace?$q$,
 $q$Keep it readily accessible to all staff who handle chemicals, since regulations typically require SDS documents to be available on-site, physically or electronically, wherever hazardous materials are used or stored.$q$),

($q$a2-f-1056$q$,$q$aplus2$q$,$q$core$q$,4,$q$4.4$q$,
 $q$Why do many jurisdictions specifically regulate the disposal of rechargeable batteries?$q$,
 $q$Rechargeable batteries, such as lithium-ion and NiMH, contain heavy metals and reactive chemicals that pose fire and environmental hazards if crushed or landfilled, so they are required to go through certified battery recycling programs.$q$),

($q$a2-f-1057$q$,$q$aplus2$q$,$q$acronym$q$,4,$q$4.4$q$,
 $q$SDS$q$,
 $q$Safety Data Sheet -- a standardized document listing a chemical or material's hazards, safe handling and storage requirements, required protective equipment, and disposal guidance, the modern replacement for MSDS.$q$),

($q$a2-f-1058$q$,$q$aplus2$q$,$q$acronym$q$,4,$q$4.4$q$,
 $q$UPS (power protection)$q$,
 $q$Uninterruptible Power Supply -- a battery-backed device that provides short-term power during an outage and typically filters or suppresses voltage surges and sags for connected equipment.$q$),

($q$a2-f-1059$q$,$q$aplus2$q$,$q$feynman$q$,4,$q$4.4$q$,
 $q$Explain in plain language why a UPS is described as buying you "time," not unlimited power.$q$,
 $q$A UPS has a battery, and batteries only hold so much charge. It is meant to bridge a short outage or give a few minutes to save work and shut down cleanly, not to run equipment indefinitely the way a generator would.$q$),

($q$a2-f-1060$q$,$q$aplus2$q$,$q$feynman$q$,4,$q$4.4$q$,
 $q$Explain in plain language why an old CRT monitor can't just go in a dumpster like a broken chair.$q$,
 $q$A CRT's picture tube contains leaded glass and other materials that are genuinely hazardous if they leak into soil or water at a landfill. Because of that, laws in most places require it to go through an e-waste recycler that knows how to break it down safely, instead of ordinary trash pickup.$q$)
;
