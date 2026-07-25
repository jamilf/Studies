import { useMemo, useState } from 'react'

export default function VmResourceSizingCalculator() {
  const [hostRamGb, setHostRamGb] = useState(64)
  const [hostCores, setHostCores] = useState(16)
  const [vmCount, setVmCount] = useState(12)
  const [ramPerVmGb, setRamPerVmGb] = useState(4)

  const hypervisorOverheadGb = 4 // reserved for the host OS/hypervisor itself
  const vCpuPerVm = 2 // typical light-workload assignment used for the oversubscription check

  const totalRamNeededGb = useMemo(
    () => vmCount * ramPerVmGb + hypervisorOverheadGb,
    [vmCount, ramPerVmGb],
  )
  const ramHeadroomGb = hostRamGb - totalRamNeededGb
  const ramFits = ramHeadroomGb >= 0

  const vCpuTotal = vmCount * vCpuPerVm
  const oversubscriptionRatio = useMemo(() => vCpuTotal / hostCores, [vCpuTotal, hostCores])
  const ratioHealthy = oversubscriptionRatio <= 4

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">VM Resource Sizing Calculator</h3>
        <p className="text-sm text-soft">
          Domain 4.2 — adjust host capacity and guest requirements to see whether the host can actually support the
          planned VMs.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Slider label="Host physical RAM" value={hostRamGb} onChange={setHostRamGb} min={8} max={256} step={8} format={(n) => `${n} GB`} />
        <Slider label="Host CPU cores" value={hostCores} onChange={setHostCores} min={4} max={64} step={2} format={(n) => `${n} cores`} />
        <Slider label="Number of VMs" value={vmCount} onChange={setVmCount} min={1} max={40} step={1} format={(n) => `${n} VM${n === 1 ? '' : 's'}`} />
        <Slider label="RAM per VM" value={ramPerVmGb} onChange={setRamPerVmGb} min={1} max={32} step={1} format={(n) => `${n} GB`} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Total RAM required</p>
          <p className="font-mono text-xl font-semibold text-ink">{totalRamNeededGb} GB</p>
          <p className="text-[11px] text-faint mt-1 font-mono">
            {vmCount}×{ramPerVmGb} + {hypervisorOverheadGb} overhead
          </p>
        </div>
        <div className={`rounded-crisp border-l-2 px-4 py-3 ${ramFits ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">RAM headroom</p>
          <p className={`font-mono text-xl font-semibold ${ramFits ? 'text-good' : 'text-bad'}`}>
            {ramHeadroomGb >= 0 ? '+' : ''}
            {ramHeadroomGb} GB
          </p>
          <p className="text-[11px] mt-1 text-faint">{ramFits ? 'Host has enough RAM' : 'Host is oversubscribed on RAM'}</p>
        </div>
        <div className={`rounded-crisp border-l-2 px-4 py-3 ${ratioHealthy ? 'border-good bg-good-tint' : 'border-warn bg-warn-tint'}`}>
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">vCPU : pCore ratio</p>
          <p className={`font-mono text-xl font-semibold ${ratioHealthy ? 'text-good' : 'text-warn'}`}>
            {oversubscriptionRatio.toFixed(1)}:1
          </p>
          <p className="text-[11px] mt-1 text-faint">{vCpuTotal} vCPUs across {hostCores} cores</p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        RAM is normally the hard ceiling — a hypervisor can't lend out memory it doesn't physically have the way it
        can share CPU time slices. CPU can be oversubscribed (more total vCPUs than physical cores) because VMs
        rarely peg the CPU simultaneously, but going past roughly a 4:1 vCPU-to-core ratio for general workloads (the
        threshold this tool flags) starts causing scheduling contention and sluggish VMs even when RAM still fits.
      </div>
    </div>
  )
}

interface SliderProps {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  format: (n: number) => string
}

function Slider({ label, value, onChange, min, max, step, format }: SliderProps) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-soft">{label}</span>
        <span className="font-mono text-ink font-medium">{format(value)}</span>
      </div>
      <input type="range" aria-label="VM Resource Sizing Calculator" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  )
}
