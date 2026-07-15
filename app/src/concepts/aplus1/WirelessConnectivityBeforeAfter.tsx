import { useState } from 'react'

interface Point {
  text: string
}

const BEFORE: Point[] = [
  { text: 'AP set to an overlapping 2.4 GHz channel (e.g. channel 4), causing co-channel interference with nearby networks.' },
  { text: 'Security set to WEP or left open — WEP is trivially crackable and open networks pass traffic in the clear.' },
  { text: 'AP physically tucked in a corner behind metal cabinets, creating dead zones through the rest of the space.' },
  { text: 'Firmware years out of date, missing patches for known vulnerabilities and driver-compatibility fixes.' },
]

const AFTER: Point[] = [
  { text: 'AP set to a non-overlapping channel (1, 6, or 11 on 2.4 GHz, or an auto-selecting 5 GHz channel).' },
  { text: 'Security set to WPA2 (AES) or WPA3 with a strong passphrase.' },
  { text: 'AP relocated centrally based on a quick site survey, clear of large metal obstructions.' },
  { text: 'Firmware kept current, closing known vulnerabilities and improving client compatibility.' },
]

export default function WirelessConnectivityBeforeAfter() {
  const [after, setAfter] = useState(false)
  const points = after ? AFTER : BEFORE

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Wireless Connectivity: Before / After</h3>
        <p className="text-sm text-soft">
          Domain 5.7 — toggle between a misconfigured access point and the same AP after standard troubleshooting fixes.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Before</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>After</span>
      </div>

      <div
        key={after ? 'after' : 'before'}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}
      >
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'After: properly configured AP' : 'Before: misconfigured AP'}
        </p>
        <ul className="mt-2 space-y-1.5">
          {points.map((p) => (
            <li key={p.text} className="text-sm text-ink flex gap-2">
              <span className={after ? 'text-good' : 'text-bad'}>{after ? '✓' : '✗'}</span>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Weak/intermittent Wi-Fi has two very different root causes the exam expects you to tell apart: RF problems
        (channel overlap, distance, obstructions — fixed with placement and channel selection) versus configuration
        problems (weak or missing encryption, stale firmware — fixed by reconfiguring rather than moving hardware).
      </div>
    </div>
  )
}
