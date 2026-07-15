import { useState } from 'react'

interface ProtocolTier {
  name: string
  strength: number
  forwardSecrecy: number
  stillSeen: number
  detail: string
}

const TIERS: ProtocolTier[] = [
  {
    name: 'Telnet / FTP (Cleartext)',
    strength: 5,
    forwardSecrecy: 0,
    stillSeen: 55,
    detail: 'No encryption at all — credentials and data travel in the clear. Any on-path observer can read or replay the session. Should never appear on a modern network except in isolated legacy/OT segments.',
  },
  {
    name: 'SSLv3 / TLS 1.0 (Deprecated)',
    strength: 25,
    forwardSecrecy: 15,
    stillSeen: 30,
    detail: 'Vulnerable to downgrade and padding-oracle attacks (e.g., POODLE). Formally deprecated by every major standards body — a scanner flagging this is a real finding, not noise.',
  },
  {
    name: 'TLS 1.1 (Weak)',
    strength: 45,
    forwardSecrecy: 30,
    stillSeen: 20,
    detail: 'An improvement over 1.0 but still lacks modern cipher suite support and is deprecated by RFC 8996. Mostly seen where legacy client compatibility was prioritized over security.',
  },
  {
    name: 'TLS 1.2 (Acceptable)',
    strength: 80,
    forwardSecrecy: 85,
    stillSeen: 75,
    detail: 'Still widely acceptable when configured with strong cipher suites and forward secrecy enabled. The current minimum baseline for most compliance frameworks.',
  },
  {
    name: 'TLS 1.3 (Current Best)',
    strength: 100,
    forwardSecrecy: 100,
    stillSeen: 45,
    detail: 'Removes legacy/weak ciphers entirely, mandates forward secrecy, and reduces handshake round-trips. The target state for any internet-facing service today.',
  },
]

function Meter({ label, value }: { label: string; value: number }) {
  const level = Math.max(1, Math.min(6, Math.ceil((value / 100) * 6)))
  return (
    <div className="rounded-crisp border border-line bg-surface px-3 py-2.5">
      <p className="text-xs text-soft mb-1.5">{label}</p>
      <div className="h-2 rounded-crisp bg-wash overflow-hidden">
        <div className={`h-full bg-heat-${level} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
      <p className="font-mono text-xs text-ink mt-1">{value}%</p>
    </div>
  )
}

export default function EncryptionProtocolSpectrum() {
  const [tier, setTier] = useState(3)
  const active = TIERS[tier]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Transport Encryption Protocol Spectrum</h3>
        <p className="text-sm text-soft">Domain 1.1 — slide across the protocol generations to compare strength, forward secrecy, and real-world exposure.</p>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={TIERS.length - 1}
          step={1}
          value={tier}
          onChange={(e) => setTier(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-[11px] text-faint mt-1">
          {TIERS.map((t, i) => (
            <span key={t.name} className={i === tier ? 'text-accent font-semibold' : ''} style={{ width: `${100 / TIERS.length}%`, textAlign: 'center' }}>
              {t.name.split(' ')[0]}
            </span>
          ))}
        </div>
      </div>

      <p className="font-display text-base font-semibold text-ink">{active.name}</p>

      <div className="grid sm:grid-cols-3 gap-3">
        <Meter label="Cipher strength" value={active.strength} />
        <Meter label="Forward secrecy support" value={active.forwardSecrecy} />
        <Meter label="Still seen in the wild" value={active.stillSeen} />
      </div>

      <div key={tier} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-soft leading-relaxed">{active.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A vulnerability scan flagging "deprecated TLS version" is not cosmetic — it means an attacker on the network
        path can potentially downgrade or break the session's confidentiality. CS0-003 expects you to recognize
        cleartext and deprecated-TLS findings as high-priority, not informational.
      </div>
    </div>
  )
}
