import { useMemo, useState } from 'react'

export default function AttackSurfaceReductionCalculator() {
  const [openPorts, setOpenPorts] = useState(12)
  const [daysUnpatched, setDaysUnpatched] = useState(45)
  const [privilegeLevel, setPrivilegeLevel] = useState(4) // 1 = least privilege, 5 = broad/admin access
  const [segments, setSegments] = useState(1) // number of isolated network zones

  const score = useMemo(() => {
    const portRisk = Math.min(openPorts, 30) * 1.4
    const patchRisk = Math.min(daysUnpatched, 120) * 0.5
    const privRisk = privilegeLevel * 8
    const segmentRelief = Math.min(segments, 8) * 6
    const raw = portRisk + patchRisk + privRisk - segmentRelief
    return Math.max(0, Math.min(100, Math.round(raw)))
  }, [openPorts, daysUnpatched, privilegeLevel, segments])

  type Band = 'bad' | 'warn' | 'good'
  const band: Band = score >= 66 ? 'bad' : score >= 33 ? 'warn' : 'good'
  const bandLabel = score >= 66 ? 'High residual risk' : score >= 33 ? 'Moderate residual risk' : 'Low residual risk'

  const BAND_CONTAINER: Record<Band, string> = {
    bad: 'border-bad bg-bad-tint',
    warn: 'border-warn bg-warn-tint',
    good: 'border-good bg-good-tint',
  }
  const BAND_TEXT: Record<Band, string> = { bad: 'text-bad', warn: 'text-warn', good: 'text-good' }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Attack Surface Reduction Calculator</h3>
        <p className="text-sm text-soft">
          Domain 2.5 — adjust common mitigation techniques and watch the estimated residual risk score respond.
        </p>
      </div>

      <div className="space-y-4">
        <Slider label="Open service ports" value={openPorts} min={0} max={30} onChange={setOpenPorts} suffix=" ports" />
        <Slider label="Days since last patch cycle" value={daysUnpatched} min={0} max={120} onChange={setDaysUnpatched} suffix=" days" />
        <Slider label="Typical account privilege level" value={privilegeLevel} min={1} max={5} onChange={setPrivilegeLevel} suffix="/5" />
        <Slider label="Network segmentation zones" value={segments} min={1} max={8} onChange={setSegments} suffix=" zones" />
      </div>

      <div className={`rounded-crisp border-l-2 px-5 py-4 text-center animate-fadein ${BAND_CONTAINER[band]}`}>
        <p className={`font-display text-3xl font-semibold ${BAND_TEXT[band]}`}>{score}</p>
        <p className={`text-sm font-medium ${BAND_TEXT[band]}`}>{bandLabel}</p>
        <p className="text-sm text-ink mt-2">
          score ≈ (open ports × 1.4) + (days unpatched × 0.5) + (privilege level × 8) − (segmentation zones × 6), clamped to 0–100
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        This score is illustrative, not a real formula — but the direction of every mitigation technique on the
        exam is real: patching, least privilege, and segmentation all reduce risk, while unnecessary open ports and
        stale patches increase it. Isolation and hardening compress the attack surface even when a vulnerability
        cannot be immediately fixed.
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  suffix: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs text-soft">{label}</label>
        <span className="font-mono text-xs text-ink">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
