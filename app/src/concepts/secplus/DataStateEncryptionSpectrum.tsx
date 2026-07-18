import { useState } from 'react'

interface Tier {
  name: string
  mechanism: string
  threat: string
  overhead: number // 1-5 relative scale
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'Data at rest',
    mechanism: 'Full-disk encryption, TDE (Transparent Data Encryption), file/folder-level encryption',
    threat: 'A stolen drive, laptop, or backup exposes plaintext data with no need to breach any live system.',
    overhead: 1,
    desc: 'Data sitting in storage — on disk, in a database, or in a backup — that is not actively being read or moved. Because it is stationary, it can be encrypted once and left encrypted with minimal ongoing performance cost.',
  },
  {
    name: 'Data in transit',
    mechanism: 'TLS, IPsec VPN tunnels, SFTP/SSH',
    threat: 'On-path (man-in-the-middle) attackers on the network path can eavesdrop on or tamper with plaintext traffic.',
    overhead: 3,
    desc: 'Data actively moving across a network, between a client and a server or between two sites. Every connection must negotiate and maintain encryption in real time, adding ongoing CPU and latency overhead.',
  },
  {
    name: 'Data in use',
    mechanism: 'Confidential computing / secure enclaves (e.g., trusted execution environments), memory encryption',
    threat: 'Memory-scraping malware or a compromised/root-level host process can read data the instant it is decrypted for processing.',
    overhead: 5,
    desc: 'Data actively being processed in RAM or by the CPU — the moment it typically must be decrypted to be useful. This is the hardest state to protect and the newest area of active cryptographic research.',
  },
  {
    name: 'Data archived',
    mechanism: 'Encrypted backups, offline/air-gapped cold storage, managed key escrow',
    threat: 'Aging storage media and long-lived encryption keys create a long window for key compromise or media decay.',
    overhead: 1,
    desc: 'Data retained long-term for compliance or disaster recovery, rarely accessed. Key management and periodic key rotation matter more here than raw encryption performance.',
  },
  {
    name: 'Data disposed',
    mechanism: 'Cryptographic erasure (destroying the key), degaussing, physical media destruction',
    threat: 'Improperly sanitized media can leave recoverable remnants of "deleted" data — a data remanence risk.',
    overhead: 1,
    desc: 'End of the data lifecycle. Simply deleting a file rarely removes its content from the underlying media — proper sanitization or destruction is required to make it truly unrecoverable.',
  },
]

const OVERHEAD_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function DataStateEncryptionSpectrum() {
  const [selected, setSelected] = useState(0)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Encryption Across the Data Lifecycle</h3>
        <p className="text-sm text-soft">
          Domain 1.4 — drag across the data lifecycle to see how the right cryptographic control changes by state.
        </p>
      </div>

      <input
        type="range"
        min={0}
        max={TIERS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / TIERS.length}%` }}
          >
            {tier.name.replace('Data ', '')}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Typical mechanism</p>
          <p className="text-sm font-medium text-ink">{t.mechanism}</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Runtime overhead</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.overhead ? OVERHEAD_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-2">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed mb-2">{t.desc}</p>
        <p className="text-sm text-ink"><span className="font-semibold">Primary threat if unprotected:</span> {t.threat}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        SY0-701 expects you to name the right control for each state: rest and archived data favor strong, low-overhead
        encryption at the storage layer; transit needs a secure channel like TLS; and in-use data is the hardest to
        protect because it is typically decrypted the moment it is processed.
      </div>
    </div>
  )
}
