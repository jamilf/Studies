import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Admin' | 'SSM' | 'Instance'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Define a patch baseline',
    who: 'Admin',
    detail: 'An admin defines a patch baseline: which patches are approved, auto-approval rules and delay, and rejected patches, optionally per compliance severity.',
  },
  {
    title: 'Group instances by tag',
    who: 'Admin',
    detail: 'Managed instances are organized into patch groups using a tag (e.g. Patch Group = prod-web), so different baselines can apply to different fleets.',
  },
  {
    title: 'Schedule a maintenance window',
    who: 'SSM',
    detail: 'Systems Manager schedules a maintenance window with a recurring cron/rate schedule and duration, and registers the patch group plus the AWS-RunPatchBaseline task against it.',
  },
  {
    title: 'Scan for compliance',
    who: 'SSM',
    detail: 'At window start, Patch Manager first runs AWS-RunPatchBaseline in Scan mode to assess current compliance against the baseline before changing anything.',
  },
  {
    title: 'Install approved patches',
    who: 'Instance',
    detail: "Each instance's SSM Agent installs the approved patches within the window, respecting the window's max-concurrency and max-error thresholds so a bad patch can't take down the whole fleet at once.",
  },
  {
    title: 'Reboot and report',
    who: 'Instance',
    detail: 'The instance reboots if the baseline requires it, then reports its compliance status back to Patch Manager, visible in Systems Manager Compliance and optionally in Security Hub.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Admin: 'bg-accent text-paper',
  SSM: 'bg-warn text-paper',
  Instance: 'bg-good text-paper',
}

export default function PatchManagerWorkflowTimeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1800)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Patch Management with Systems Manager</h3>
          <p className="text-sm text-soft">Domain 3.3 — step through the Patch Manager workflow from baseline to compliance report.</p>
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
                  i <= active ? WHO_COLOR[s.who] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-1">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>{STEPS[active].who}</span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Patch baselines, patch groups, and maintenance windows are three separate objects that Patch Manager ties
        together — the exam frequently tests whether you know which one controls WHAT gets patched (baseline),
        WHICH instances (patch group/tag), and WHEN (maintenance window).
      </div>
    </div>
  )
}
