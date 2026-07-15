import { useEffect, useState } from 'react'

interface Node {
  x: number
  y: number
  label: string
}

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface Phase {
  title: string
  detail: string
  nodes: Node[]
  lines: Line[]
}

const PHASES: Phase[] = [
  {
    title: 'Star',
    detail:
      'Every device connects to one central switch. Easy to install and troubleshoot — a single cable fault only drops one device — but the central switch is a single point of failure for the whole segment.',
    nodes: [
      { x: 150, y: 80, label: 'SW' },
      { x: 60, y: 20, label: 'A' },
      { x: 240, y: 20, label: 'B' },
      { x: 60, y: 140, label: 'C' },
      { x: 240, y: 140, label: 'D' },
    ],
    lines: [
      { x1: 150, y1: 80, x2: 60, y2: 20 },
      { x1: 150, y1: 80, x2: 240, y2: 20 },
      { x1: 150, y1: 80, x2: 60, y2: 140 },
      { x1: 150, y1: 80, x2: 240, y2: 140 },
    ],
  },
  {
    title: 'Full Mesh',
    detail:
      'Every device has a direct link to every other device. Maximum redundancy — no single link or node failure isolates anyone — but cabling and port count grow as n(n-1)/2, so it does not scale past a small core.',
    nodes: [
      { x: 60, y: 20, label: 'A' },
      { x: 240, y: 20, label: 'B' },
      { x: 60, y: 140, label: 'C' },
      { x: 240, y: 140, label: 'D' },
    ],
    lines: [
      { x1: 60, y1: 20, x2: 240, y2: 20 },
      { x1: 60, y1: 20, x2: 60, y2: 140 },
      { x1: 60, y1: 20, x2: 240, y2: 140 },
      { x1: 240, y1: 20, x2: 60, y2: 140 },
      { x1: 240, y1: 20, x2: 240, y2: 140 },
      { x1: 60, y1: 140, x2: 240, y2: 140 },
    ],
  },
  {
    title: 'Hybrid',
    detail:
      'Combines topologies to fit real buildings — here, two star clusters (e.g. two IDF closets) are linked by a redundant backbone back to the core. Each closet gets star simplicity locally, while the backbone gets meshed redundancy.',
    nodes: [
      { x: 70, y: 80, label: 'SW1' },
      { x: 20, y: 20, label: 'A' },
      { x: 20, y: 140, label: 'B' },
      { x: 230, y: 80, label: 'SW2' },
      { x: 280, y: 20, label: 'C' },
      { x: 280, y: 140, label: 'D' },
    ],
    lines: [
      { x1: 70, y1: 80, x2: 20, y2: 20 },
      { x1: 70, y1: 80, x2: 20, y2: 140 },
      { x1: 230, y1: 80, x2: 280, y2: 20 },
      { x1: 230, y1: 80, x2: 280, y2: 140 },
      { x1: 70, y1: 74, x2: 230, y2: 74 },
      { x1: 70, y1: 86, x2: 230, y2: 86 },
    ],
  },
  {
    title: 'Spine-and-Leaf',
    detail:
      'A data-center design: every leaf switch (where servers connect) links to every spine switch, and only to spines — never leaf-to-leaf or spine-to-spine. That gives a predictable, low-latency, equal-cost path between any two servers.',
    nodes: [
      { x: 90, y: 20, label: 'Spine 1' },
      { x: 210, y: 20, label: 'Spine 2' },
      { x: 40, y: 140, label: 'Leaf 1' },
      { x: 150, y: 140, label: 'Leaf 2' },
      { x: 260, y: 140, label: 'Leaf 3' },
    ],
    lines: [
      { x1: 90, y1: 20, x2: 40, y2: 140 },
      { x1: 90, y1: 20, x2: 150, y2: 140 },
      { x1: 90, y1: 20, x2: 260, y2: 140 },
      { x1: 210, y1: 20, x2: 40, y2: 140 },
      { x1: 210, y1: 20, x2: 150, y2: 140 },
      { x1: 210, y1: 20, x2: 260, y2: 140 },
    ],
  },
]

export default function NetworkTopologyDiagram() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 2000)
    return () => clearTimeout(t)
  }, [playing, step])

  const phase = PHASES[step]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Network Topology Types</h3>
          <p className="text-sm text-soft">
            Domain 1.5 — step through physical topologies to see how devices are wired together and what each buys you.
          </p>
        </div>
        <button
          onClick={() => {
            if (step >= PHASES.length - 1) setStep(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : step >= PHASES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="flex justify-between gap-1.5">
        {PHASES.map((p, i) => (
          <button
            key={p.title}
            onClick={() => {
              setPlaying(false)
              setStep(i)
            }}
            className={`flex-1 rounded-crisp border px-2 py-1.5 text-xs font-medium transition-colors ${
              i === step ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="rounded-crisp border border-line bg-wash p-4">
        <svg viewBox="0 0 300 160" className="w-full h-44">
          {phase.lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className="stroke-accent-line" strokeWidth="1.5" />
          ))}
          {phase.nodes.map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r="14" className="fill-accent-tint stroke-accent" strokeWidth="1.5" />
              <text x={n.x} y={n.y + 3} textAnchor="middle" className="fill-ink text-[7px] font-semibold">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{phase.title}</h4>
        <p className="text-sm text-soft leading-relaxed">{phase.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Real networks are almost always hybrid: wiring closets use star topology to the desktop, while the
        distribution and core layers add mesh-style redundant links (or a spine-and-leaf fabric in a data center) so
        no single switch failure takes down the whole network.
      </div>
    </div>
  )
}
