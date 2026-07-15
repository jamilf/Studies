import { useEffect, useState } from 'react'

interface Step {
  title: string
  stage: 'Onboarding' | 'Operations' | 'Offboarding'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Acquisition & Procurement',
    stage: 'Onboarding',
    detail:
      'Vet suppliers for a secure supply chain and require new hardware or software to meet a documented security baseline before it enters production — standardized purchasing is what keeps unmanaged "shadow IT" devices out.',
  },
  {
    title: 'Assignment & Accounting',
    stage: 'Onboarding',
    detail:
      'Every asset is tagged, entered into inventory (a CMDB), and given an accountable owner and classification level — the foundation everything else, from patching to incident response, depends on.',
  },
  {
    title: 'Monitoring & Asset Tracking',
    stage: 'Operations',
    detail:
      'Reconcile the inventory on a schedule, track software license compliance, and watch for devices appearing on the network without a matching inventory record — a common sign of shadow IT or a rogue device.',
  },
  {
    title: 'Disposal & Decommissioning',
    stage: 'Offboarding',
    detail:
      'Sanitize or destroy media per its data classification (cryptographic erase, degaussing, physical shredding), obtain a certificate of destruction for compliance, and apply data retention rules before the asset leaves inventory.',
  },
]

const STAGE_COLOR: Record<Step['stage'], string> = {
  Onboarding: 'bg-accent text-paper',
  Operations: 'bg-warn text-paper',
  Offboarding: 'bg-good text-paper',
}

export default function AssetManagementLifecycle() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Asset Management Lifecycle</h3>
          <p className="text-sm text-soft">
            Domain 4.2 — step through a hardware/software asset from procurement to disposal.
          </p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= active ? STAGE_COLOR[s.stage] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${STAGE_COLOR[STEPS[active].stage]}`}>
            {STEPS[active].stage}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Asset management is a full lifecycle, not a purchase-time checklist — an asset acquired securely but never
        tracked, or disposed of without sanitization, still creates exploitable risk (recoverable data on a surplus
        hard drive is a classic exam scenario).
      </div>
    </div>
  )
}
