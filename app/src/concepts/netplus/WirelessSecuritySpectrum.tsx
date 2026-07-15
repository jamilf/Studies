import { useState } from 'react'

interface Standard {
  name: string
  encryption: number
  keyMgmt: number
  resistance: number
  desc: string
}

const STANDARDS: Standard[] = [
  {
    name: 'WEP',
    encryption: 1,
    keyMgmt: 1,
    resistance: 1,
    desc: 'Deprecated. Uses RC4 with a static shared key and a weak initialization vector — freely available tools can recover a WEP key in minutes. Never deploy it.',
  },
  {
    name: 'WPA',
    encryption: 2,
    keyMgmt: 2,
    resistance: 2,
    desc: 'An interim fix that added TKIP to patch RC4-based hardware without replacing it. Better than WEP but still built on the same weak cipher, and now considered obsolete.',
  },
  {
    name: 'WPA2',
    encryption: 3,
    keyMgmt: 3,
    resistance: 3,
    desc: 'Made AES-CCMP encryption mandatory and was the long-standing standard. Its 4-way handshake is vulnerable to offline dictionary attacks against weak pre-shared keys, and to attacks like KRACK.',
  },
  {
    name: 'WPA3',
    encryption: 4,
    keyMgmt: 4,
    resistance: 4,
    desc: 'Replaces the PSK handshake with SAE (Simultaneous Authentication of Equals), resisting offline dictionary attacks and adding forward secrecy. Enhanced Open also encrypts traffic on networks with no password at all.',
  },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-4', 'bg-heat-6']

export default function WirelessSecuritySpectrum() {
  const [selected, setSelected] = useState(0)
  const t = STANDARDS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Wireless Security Standards</h3>
        <p className="text-sm text-soft">Domain 2.4 — slide across Wi-Fi security generations to compare encryption and key management.</p>
      </div>

      <input
        type="range"
        min={0}
        max={STANDARDS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3">
        {STANDARDS.map((standard, i) => (
          <button
            key={standard.name}
            onClick={() => setSelected(i)}
            className={`text-center transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / STANDARDS.length}%` }}
          >
            {standard.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Encryption strength</p>
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.encryption ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Key management</p>
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.keyMgmt ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Attack resistance</p>
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-xs transition-colors ${i < t.resistance ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Each generation replaced the previous one's handshake or cipher after real-world attacks broke it — WEP's
        RC4/IV flaw, WPA's inherited RC4, and WPA2's offline-crackable PSK handshake are all fair game on the exam.
      </div>
    </div>
  )
}
