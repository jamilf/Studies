import { useState } from 'react'

interface Tier {
  name: string
  detail: string
  privacyRisk: number
  obviousness: number
}

const TIERS: Tier[] = [
  {
    name: 'Unintended Wi-Fi / Bluetooth connections',
    detail: 'The device auto-joins an unfamiliar network or pairs with an unknown accessory — often the earliest, easiest-to-miss sign that something is probing the device.',
    privacyRisk: 1,
    obviousness: 2,
  },
  {
    name: 'High network data usage / data-usage limit notification',
    detail: 'A background process or malicious app is transmitting data the user did not initiate — check the per-app data usage breakdown to isolate the offender.',
    privacyRisk: 2,
    obviousness: 3,
  },
  {
    name: 'Leaked personal files or data',
    detail: 'Photos, contacts, or documents surface somewhere they should not — usually traced back to an over-permissioned app or a sideloaded APK.',
    privacyRisk: 4,
    obviousness: 2,
  },
  {
    name: 'Unauthorized location tracking',
    detail: 'An app is reporting GPS location far more often, or to far more destinations, than its function requires — review location permissions per app, not just globally.',
    privacyRisk: 4,
    obviousness: 1,
  },
  {
    name: 'Unauthorized camera or microphone activation',
    detail: 'The camera/mic indicator light activates with no matching app open — one of the most alarming symptoms because it implies live surveillance, not just data theft.',
    privacyRisk: 5,
    obviousness: 2,
  },
  {
    name: 'Unauthorized account access',
    detail: 'A sign-in alert or password-reset email arrives that the user did not trigger — treat as a full account compromise and rotate credentials on every linked service immediately.',
    privacyRisk: 5,
    obviousness: 5,
  },
]

const METER = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5']

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-crisp border border-line bg-wash p-3">
      <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">{label}</p>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < value ? METER[i] : 'bg-line/50'}`} />
        ))}
      </div>
    </div>
  )
}

export default function MobileSecuritySymptomSpectrum() {
  const [selected, setSelected] = useState(0)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Mobile Security Symptom Spectrum</h3>
        <p className="text-sm text-soft">Domain 3.5 — drag across mobile security symptoms to see how private and how obvious each one is.</p>
      </div>

      <input
        type="range" aria-label="Mobile Security Symptom Spectrum"
        min={0}
        max={TIERS.length - 1}
        step={1}
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-faint px-0.5 -mt-3 gap-1">
        {TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelected(i)}
            className={`text-center leading-tight transition-colors ${i === selected ? 'text-accent font-semibold' : 'hover:text-soft'}`}
            style={{ width: `${100 / TIERS.length}%` }}
          >
            {tier.name.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Meter label="Privacy risk" value={t.privacyRisk} />
        <Meter label="How obvious to the user" value={t.obviousness} />
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: mobile security symptoms are not always loud — the most privacy-invasive ones (silent location
        tracking, quiet data leakage) often have the lowest "obviousness," which is exactly why per-app permission
        review matters more than waiting for a visible warning.
      </div>
    </div>
  )
}
