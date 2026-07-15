import { useEffect, useState } from 'react'

interface Phase {
  label: string
  caption: string
}

const PHASES: Phase[] = [
  {
    label: 'Firewall filters by rule',
    caption:
      'A stateful firewall evaluates each connection against ACLs (source/destination IP, port, protocol) — traffic matching a deny rule, or from a known-bad IP, is dropped before it goes any further.',
  },
  {
    label: 'IDS/IPS inspects packet contents',
    caption:
      "Signature- and anomaly-based inspection looks inside allowed traffic for known attack patterns. An IPS sits inline and can block automatically; an IDS is out-of-band and only alerts.",
  },
  {
    label: 'NAC checks endpoint posture',
    caption:
      "Before a device joins the internal segment, Network Access Control checks its identity and health — patch level, AV status, domain membership — and can quarantine anything non-compliant into a remediation VLAN.",
  },
  {
    label: 'EDR watches the endpoint',
    caption:
      'Traffic that reaches the host is now inside the perimeter — an EDR agent watches process, file, and network behavior on that endpoint and can isolate it automatically if something still slips through.',
  },
]

const NODES = ['Internet', 'Firewall', 'IDS/IPS', 'NAC gate', 'Endpoint + EDR']

export default function NetworkDefenseLayers() {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 2000)
    return () => clearTimeout(t)
  }, [playing, phase])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Layered Network Defenses</h3>
          <p className="text-sm text-soft">
            Domain 4.5 — step through how a single connection is checked at each defensive layer.
          </p>
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

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[160px]">
        <svg viewBox="0 0 640 140" className="w-full h-36" aria-hidden>
          {NODES.map((n, i) => {
            const x = 10 + i * 155
            const active = i <= phase + 1
            return (
              <g key={n} transform={`translate(${x},45)`}>
                <rect
                  width="115"
                  height="50"
                  rx="4"
                  className={`transition-colors duration-500 ${active ? 'fill-accent-tint stroke-accent' : 'fill-surface stroke-line'}`}
                  strokeWidth="1.5"
                />
                <text x="57" y="30" textAnchor="middle" className="fill-ink text-[10px] font-medium">
                  {n}
                </text>
              </g>
            )
          })}
          {NODES.slice(0, -1).map((_, i) => {
            const x1 = 10 + i * 155 + 115
            const x2 = 10 + (i + 1) * 155
            const on = phase >= i
            return (
              <line
                key={i}
                x1={x1}
                y1={70}
                x2={x2}
                y2={70}
                className={`transition-opacity duration-700 ${on ? 'opacity-100 stroke-accent' : 'opacity-30 stroke-line-strong'}`}
                strokeWidth="2.5"
                markerEnd="url(#arrowLayer)"
              />
            )
          })}
          <defs>
            <marker id="arrowLayer" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="flex gap-2">
        {PHASES.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              setPlaying(false)
              setPhase(i)
            }}
            className={`flex-1 rounded-crisp px-2 py-1.5 text-[11px] font-medium transition-colors border ${
              i === phase
                ? 'bg-accent-tint border-accent text-accent'
                : i < phase
                  ? 'bg-wash border-line text-soft'
                  : 'bg-surface border-line text-faint hover:text-ink'
            }`}
          >
            {i + 1}. {p.label}
          </button>
        ))}
      </div>

      <div key={phase} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <p className="text-sm text-ink leading-relaxed">{PHASES[phase].caption}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Defense in depth means no single layer has to be perfect — a connection that gets past the firewall still
        has to survive IDS/IPS inspection, NAC posture checks, and endpoint monitoring before it can do damage.
      </div>
    </div>
  )
}
