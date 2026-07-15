import { useState } from 'react'

interface Tier {
  name: string
  encryption: number
  keyMgmt: number
  attackResist: number
  desc: string
}

const TIERS: Tier[] = [
  { name: 'WEP', encryption: 1, keyMgmt: 1, attackResist: 1, desc: 'Uses RC4 with a static, shared key and a tiny 24-bit IV that reuses quickly — broken with widely available tools in minutes. Should never appear in a modern design.' },
  { name: 'WPA', encryption: 2, keyMgmt: 2, attackResist: 2, desc: 'Still RC4-based but adds TKIP, which rotates per-packet keys — a stopgap fix for WEP hardware that closed the worst holes without solving the underlying cipher weakness.' },
  { name: 'WPA2', encryption: 4, keyMgmt: 4, attackResist: 4, desc: 'Replaces RC4 with AES-CCMP, a real block cipher with proper integrity checking — the long-time baseline standard, though PSK mode is still vulnerable to offline dictionary attacks against a captured handshake.' },
  { name: 'WPA3', encryption: 5, keyMgmt: 5, attackResist: 5, desc: 'Adds SAE (Simultaneous Authentication of Equals, a Dragonfly-based handshake) in place of the WPA2 4-way handshake, resisting offline dictionary attacks even against weak passphrases, plus forward secrecy and AES-GCMP.' },
]

const BAR_COLOR: string[] = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

export default function WirelessSecurityArchitecture() {
  const [selected, setSelected] = useState<number>(2)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Wireless Security Standards</h3>
        <p className="text-sm text-soft">Domain 4.1 — slide across the Wi-Fi security generations to see how encryption, key management, and attack resistance improved.</p>
      </div>

      <input type="range" min={0} max={TIERS.length - 1} step={1} value={selected} onChange={(e) => setSelected(Number(e.target.value))} className="w-full" />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {TIERS.map((tier, i) => (
          <button key={tier.name} onClick={() => setSelected(i)} className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`} style={{ width: `${100 / TIERS.length}%` }}>
            {tier.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Encryption strength</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.encryption ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Key management</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.keyMgmt ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Offline attack resistance</p>
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.attackResist ? BAR_COLOR[i] : 'bg-line/50'}`} />))}</div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam-relevant thread here is the handshake, not just the cipher: WPA2's 4-way handshake can be captured
        and brute-forced offline against a weak passphrase, while WPA3's SAE handshake is specifically designed to
        resist that class of attack even with a weak passphrase.
      </div>
    </div>
  )
}
