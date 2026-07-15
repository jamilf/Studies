import { useEffect, useState } from 'react'

interface Step {
  title: string
  detail: string
}

const STEPS: Step[] = [
  { title: 'Define scope & schedule', detail: 'Decide which assets/networks are in scope and when scans run — e.g., off-hours for production, monthly internal / quarterly external cadence.' },
  { title: 'Configure the scan', detail: 'Choose authenticated/credentialed scanning (deeper, patch-level accuracy, fewer false positives) vs. unauthenticated (outside attacker\'s view, faster, noisier).' },
  { title: 'Run the scan', detail: 'The scanner actively or passively probes hosts and diffs banners/responses against its vulnerability signature database.' },
  { title: 'Validate results', detail: 'Analysts triage findings to eliminate false positives — e.g., a banner reporting an old version that was actually patched via backport — before they pollute the remediation queue.' },
  { title: 'Prioritize', detail: 'Rank validated findings by CVSS base score, asset criticality/exposure, and exploitability — known exploit available, EPSS score, internet-facing or not.' },
  { title: 'Remediate or accept the risk', detail: 'Apply the patch/compensating control, or formally document a risk acceptance/exception when patching isn\'t currently feasible.' },
  { title: 'Rescan to confirm', detail: 'Re-run the scan against remediated hosts to verify the finding is actually closed and didn\'t reappear.' },
]

export default function VulnScanTimeline() {
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
          <h3 className="font-display text-lg text-ink">Vulnerability Scanning Lifecycle</h3>
          <p className="text-sm text-soft">Domain 2.1 — step through a full scan-to-remediation cycle.</p>
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
                  i <= active ? 'bg-accent text-paper' : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{STEPS[active].title}</h4>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Validation and rescanning are the two steps exam scenarios most often skip in distractor answers — a scan
        result isn't a finding until it's validated, and a patch isn't confirmed until rescanned.
      </div>
    </div>
  )
}
