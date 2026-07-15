import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  {
    front: 'Recon:EC2/PortProbeUnprotectedPort',
    back: 'An EC2 instance has a port that is not blocked by a security group being probed by a host on a threat list of known scanners. Informational on its own, but worth checking whether the port needs to be open at all.',
  },
  {
    front: 'UnauthorizedAccess:IAMUser/ConsoleLoginSuccess.B',
    back: 'A console login succeeded from a Tor exit node or an unusual, never-seen-before location for this principal. A successful login (not just an attempt) from an anomalous source strongly suggests stolen credentials in active use.',
  },
  {
    front: 'CryptoCurrency:EC2/BitcoinTool.B!DNS',
    back: "An EC2 instance is querying a domain name associated with cryptocurrency mining activity. Classic sign of malware running on the instance consuming compute for the attacker's benefit.",
  },
  {
    front: 'Exfiltration:S3/AnomalousBehavior',
    back: "An IAM entity's S3 API call pattern (e.g. sudden bulk GetObject/PutObject across many buckets, or from a new location) deviates sharply from its established baseline — the signature of data being pulled out of the account.",
  },
  {
    front: 'PenTest:IAMUser/KaliLinux',
    back: 'API calls are originating from a host running Kali Linux, a common penetration-testing toolkit. Useful to distinguish an authorized security assessment from a real attacker — correlate with your pentest schedule before escalating.',
  },
  {
    front: 'Backdoor:EC2/C&CActivity.B!DNS',
    back: 'An EC2 instance is querying a domain known to be associated with a command-and-control (C2) server. This indicates the instance is likely compromised and communicating with attacker infrastructure — isolate it immediately.',
  },
]

export default function GuardDutyFindingTypeMatcher() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">GuardDuty Finding Type Matcher</h3>
        <p className="text-sm text-soft">
          Domain 1.2 — GuardDuty finding type names encode threat, resource, and behavior. Click a card to reveal
          what it actually means.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[120px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-sm text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-mono text-sm font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        GuardDuty finding type IDs follow a pattern: <span className="font-mono">ThreatPurpose:ResourceType/ThreatName</span>.
        Reading the prefix alone (Recon, UnauthorizedAccess, CryptoCurrency, Exfiltration, PenTest, Backdoor,
        Trojan, Impact) tells you the category of threat before you even open the finding.
      </div>
    </div>
  )
}
