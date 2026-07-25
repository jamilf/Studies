import { useState } from 'react'

interface Tier {
  name: string
  full: string
  shiftLeft: number
  runtimeVisibility: number
  falsePositive: number
  desc: string
}

const TIERS: Tier[] = [
  {
    name: 'SAST',
    full: 'Static Application Security Testing',
    shiftLeft: 9,
    runtimeVisibility: 1,
    falsePositive: 6,
    desc: 'Scans source code or bytecode without executing it. Runs at commit or build time, catching flaws as early as possible — but without runtime context, it tends to flag more false positives than tools that see the app actually run.',
  },
  {
    name: 'SCA',
    full: 'Software Composition Analysis',
    shiftLeft: 8,
    runtimeVisibility: 1,
    falsePositive: 3,
    desc: 'Scans third-party libraries and dependencies against known-vulnerability databases at build time. Because it\'s matching known CVEs rather than reasoning about custom logic, false positives are relatively low.',
  },
  {
    name: 'IAST',
    full: 'Interactive Application Security Testing',
    shiftLeft: 5,
    runtimeVisibility: 7,
    falsePositive: 2,
    desc: 'An instrumented agent runs inside the application during QA functional testing, combining code-level visibility with real execution — it confirms a flaw is actually reachable and exploitable, which keeps false positives low.',
  },
  {
    name: 'DAST',
    full: 'Dynamic Application Security Testing',
    shiftLeft: 2,
    runtimeVisibility: 9,
    falsePositive: 4,
    desc: 'Attacks the running application from the outside, black-box, with no source code needed — typically run against staging or pre-production. It finds real, externally-reachable issues but runs late in the pipeline.',
  },
]

const BAR_COLOR = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4', 'bg-heat-5', 'bg-heat-6', 'bg-heat-6', 'bg-heat-6', 'bg-heat-6']

export default function AppSecTestingToolsSpectrum() {
  const [selected, setSelected] = useState(0)
  const t = TIERS[selected]

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Application Security Testing Tools Across the SDLC</h3>
        <p className="text-sm text-soft">Domain 8.3 — slide across SAST, SCA, IAST, and DAST to compare where and how each runs.</p>
      </div>

      <input
        type="range" aria-label="Application Security Testing Tools Across the SDLC"
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
            {tier.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">How early ("shift-left")</p>
          <div className="flex gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.shiftLeft ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Runtime visibility</p>
          <div className="flex gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.runtimeVisibility ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1.5">Typical false-positive rate</p>
          <div className="flex gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 rounded-crisp transition-colors ${i < t.falsePositive ? BAR_COLOR[i] : 'bg-line/50'}`} />
            ))}
          </div>
        </div>
      </div>

      <div key={t.name} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{t.name} — {t.full}</h4>
        <p className="text-sm text-soft leading-relaxed">{t.desc}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        No single tool covers the whole pipeline: SAST and SCA run earliest but can't see runtime behavior, DAST
        sees real runtime behavior but runs late and needs no source, and IAST sits in the middle, combining
        code-level insight with live execution during QA testing. Mature programs layer several of these together.
      </div>
    </div>
  )
}
