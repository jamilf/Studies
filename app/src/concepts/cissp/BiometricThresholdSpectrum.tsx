import { useState } from 'react'

interface Tier {
  name: string
  far: number
  frr: number
  desc: string
}

const TIERS: Tier[] = [
  { name: 'Very loose', far: 9, frr: 1, desc: 'The sensor accepts almost any close-enough match. Convenient — legitimate users are rarely rejected — but impostors slip through far too often for a security-sensitive system.' },
  { name: 'Loose', far: 6, frr: 2, desc: 'Fewer false rejections than strict settings, but the false acceptance rate is still too high for protecting sensitive assets.' },
  { name: 'Balanced (near CER)', far: 3, frr: 3, desc: 'Near the Crossover Error Rate (CER) — the point where FAR and FRR are approximately equal. CER is the standard, vendor-neutral way to compare the accuracy of different biometric systems: a lower CER is a more accurate system.' },
  { name: 'Strict', far: 2, frr: 6, desc: 'The sensor rejects more legitimate users to keep impostors out — appropriate for higher-security areas where a false acceptance is more costly than user friction.' },
  { name: 'Very strict', far: 1, frr: 9, desc: 'Near-zero tolerance for false acceptance. Legitimate users are frequently rejected and re-prompted, which hurts usability and can push users toward insecure workarounds.' },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6', 'bg-heat-6', 'bg-heat-6', 'bg-heat-6']

export default function BiometricThresholdSpectrum() {
  const [selected, setSelected] = useState(2)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Biometric Sensitivity: FAR vs. FRR Trade-off</h3>
        <p className="text-sm text-soft">Domain 5.2 — slide the sensor threshold and watch false acceptance and false rejection trade off.</p>
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
            {tier.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">False Acceptance Rate (Type II)</p>
          <div className="flex gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.far ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">False Rejection Rate (Type I)</p>
          <div className="flex gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.frr ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        False Acceptance Rate (letting an impostor in, Type II error) and False Rejection Rate (locking out a
        legitimate user, Type I error) move in opposite directions as the match threshold changes. The Crossover
        Error Rate — where the two curves meet — is the industry-standard metric for comparing biometric factor
        accuracy across vendors and modalities.
      </div>
    </div>
  )
}
