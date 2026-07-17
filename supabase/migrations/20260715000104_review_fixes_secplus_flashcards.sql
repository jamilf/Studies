-- Review fixes: Security+ (SY0-701) flashcards (core, acronym, feynman decks).
-- Scope A content review. UPDATE/DELETE by id only.

-- a-022 [E4]: CVE is explicitly listed under objective 4.3 (vulnerability analysis) in the SY0-701 blueprint, not 2.3; retag to match sibling card a-023 (CVSS, 4.3).
update public.flashcards set domain = 4, objective = '4.3' where id = 'a-022';

-- a-025 [E4]: on-path (MitM/AitM) attack is listed under objective 2.4 (indicators of malicious activity, network attacks), not 2.2 (threat vectors); retag.
update public.flashcards set objective = '2.4' where id = 'a-025';

-- f1-027 [E1]: card asserted a strict scope ordering "volume < partition" which is not generally true (a volume commonly maps to, or can span, partitions); rewritten as a levels-of-encryption retrieval prompt without the false ordering.
update public.flashcards set front = $$At what levels can data at rest be encrypted?$$, back = $$Full-disk (entire drive incl. OS, e.g., BitLocker), partition (one section of a disk), volume (a mounted filesystem/drive letter), file (individual files, e.g., EFS), plus database-level and record/column-level. Broader scope protects more automatically; narrower scope gives finer control.$$ where id = 'f1-027';

-- f4-040 [E1]: back conflated SMTPS with STARTTLS submission ("SMTPS/submission with STARTTLS 587") - SMTPS (implicit TLS) is port 465; submission with STARTTLS is 587; corrected.
update public.flashcards set back = $$SSH 22, SFTP 22 (or FTPS 990), HTTPS 443, mail submission with STARTTLS 587 (implicit-TLS SMTPS 465), IMAPS 993, POP3S 995, LDAPS 636, DNSSEC/encrypted DNS (DoT 853, DoH 443).$$ where id = 'f4-040';

-- f1-052 [W1]: seed used SQL-style doubled apostrophe inside dollar quotes, so "what''s" is stored literally; corrected to a single apostrophe.
update public.flashcards set front = $$Standard vs normal vs emergency change - what's the difference?$$ where id = 'f1-052';

-- f2-059 [W1]: literal doubled apostrophe ("isn''t") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$Phishing via a malicious QR code leading to a credential-harvesting or malware site - exploits that a QR code's destination isn't visible before scanning.$$ where id = 'f2-059';

-- f2-061 [W1]: literal doubled apostrophe ("aren''t") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$Pretext: the fabricated story/scenario. Authority: the persuasion principle of impersonating someone whose instructions aren't normally questioned (executive, IT, law enforcement).$$ where id = 'f2-061';

-- f2-066 [W1]: literal doubled apostrophe ("program''s") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$An attacker swaps a file for a symlink to a sensitive target between a program's permission check and its actual file access, redirecting the operation to an unintended file.$$ where id = 'f2-066';

-- f2-068 [W1]: literal doubled apostrophe ("attacker''s") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$Bot: a single compromised, remotely controlled host. Botnet: a large network of bots under one attacker's C2, used for DDoS, spam, or distributed cracking.$$ where id = 'f2-068';

-- f2-071 [W1]: literal doubled apostrophes ("attacker''s", "gateway''s") stored inside dollar-quoted back text; corrected.
update public.flashcards set back = $$Sending forged ARP replies claiming the attacker's MAC address owns the gateway's IP, so victims send their traffic to the attacker instead - the mechanism behind on-path attacks on a LAN.$$ where id = 'f2-071';
