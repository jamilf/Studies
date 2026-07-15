import { useEffect, useState } from 'react'

interface Phase {
  label: string
  detail: string
}

const PHASES: Phase[] = [
  {
    label: 'Workstation in a workgroup',
    detail: 'By default a new Windows install is in a workgroup — a peer-to-peer group where every machine keeps its own local SAM database of user accounts. There is no central authentication authority.',
  },
  {
    label: 'Admin opens System Properties',
    detail: "Under Settings > System > About > Advanced system settings > Computer Name, an administrator clicks \"Change\" and selects \"Domain,\" then types the domain name (e.g. corp.local).",
  },
  {
    label: 'Credentials sent to a Domain Controller',
    detail: 'Windows prompts for domain administrator credentials and contacts a Domain Controller over the network to validate them and authorize the join.',
  },
  {
    label: 'Computer account created in AD',
    detail: 'The Domain Controller creates a computer object for this machine in Active Directory, establishing a trust relationship between the workstation and the domain.',
  },
  {
    label: 'Reboot — domain policies apply',
    detail: 'After the required reboot, the machine trusts the domain: users log on with domain credentials validated by a Domain Controller, and Group Policy pushed from the domain now applies automatically.',
  },
]

export default function DomainJoinFlow() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 1800)
    return () => clearTimeout(t)
  }, [playing, phase])

  const workstationActive = phase >= 0
  const linkActive = phase >= 1 && phase <= 3
  const dcActive = phase >= 2
  const trustActive = phase >= 4

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Workgroup to Domain Join</h3>
          <p className="text-sm text-soft">Domain 1.5 — watch a workstation move from a local workgroup into an Active Directory domain.</p>
        </div>
        <button
          onClick={() => {
            if (phase >= PHASES.length - 1) setPhase(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : phase >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[180px]">
        <svg viewBox="0 0 460 160" className="w-full h-40" aria-hidden>
          <defs>
            <marker id="arrow-dj" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
            </marker>
          </defs>

          <rect x="30" y="60" width="120" height="60" rx="4" className={workstationActive ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line'} strokeWidth="1.5" />
          <text x="90" y="95" textAnchor="middle" className="fill-ink text-[11px] font-medium">Workstation</text>

          <line x1="150" y1="90" x2="300" y2="90" className={linkActive ? 'stroke-accent' : 'stroke-line'} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow-dj)" />

          <rect x="310" y="60" width="120" height="60" rx="4" className={dcActive ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line'} strokeWidth="1.5" />
          <text x="370" y="88" textAnchor="middle" className="fill-ink text-[11px] font-medium">Domain</text>
          <text x="370" y="102" textAnchor="middle" className="fill-ink text-[11px] font-medium">Controller</text>

          {trustActive && (
            <text x="230" y="35" textAnchor="middle" className="fill-good text-[10px] font-semibold">Trust established — GPOs apply</text>
          )}
        </svg>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(phase / (PHASES.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {PHASES.map((p, i) => (
            <button
              key={p.label}
              onClick={() => {
                setPlaying(false)
                setPhase(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / PHASES.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= phase ? 'bg-accent text-paper' : 'bg-wash text-faint'
                } ${i === phase ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{PHASES[phase].label}</h4>
        <p className="text-sm text-soft leading-relaxed">{PHASES[phase].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: a workgroup means local accounts and local authentication only — no central management. A
        domain centralizes authentication at a Domain Controller and pushes Group Policy to every joined
        machine, which is why 1102 scenarios about "policy isn't applying to just one PC" often trace back to
        that machine never having successfully joined the domain.
      </div>
    </div>
  )
}
