import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Auditor' | 'CloudTrail' | 'S3'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Enable log file validation',
    who: 'Auditor',
    detail:
      'An auditor turns on log file integrity validation on the trail — a one-time setting in the trail configuration. CloudTrail begins the hash-chaining process from this point forward.',
  },
  {
    title: 'Deliver log file, compute hash',
    who: 'CloudTrail',
    detail: "CloudTrail delivers each log file to the configured S3 bucket and computes a SHA-256 hash of that file's contents.",
  },
  {
    title: 'Write digest file',
    who: 'CloudTrail',
    detail:
      "Roughly every hour, CloudTrail writes a digest file listing that period's log files and their hashes, plus the hash of the PREVIOUS digest file — chaining each digest to the one before it.",
  },
  {
    title: 'Sign the digest',
    who: 'CloudTrail',
    detail: "CloudTrail signs the digest file with its private key so the digest's authenticity, not just its integrity, can be verified later.",
  },
  {
    title: 'Store digest separately',
    who: 'S3',
    detail:
      "Digest files land in S3 — ideally a separate bucket/prefix with tighter access controls than the log bucket, so an attacker who can edit logs still can't edit the digests that would expose the edit.",
  },
  {
    title: 'Validate the chain',
    who: 'Auditor',
    detail:
      'The auditor runs `aws cloudtrail validate-logs --trail-arn <arn> --start-time <t>`. The CLI walks the digest chain from that time forward; any log file that was modified, deleted, or has a mismatched hash breaks the chain and is reported — proof the logs are tamper-evident.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Auditor: 'bg-accent text-paper',
  CloudTrail: 'bg-warn text-paper',
  S3: 'bg-good text-paper',
}

export default function CloudTrailDigestChainTimeline() {
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
          <h3 className="font-display text-lg text-ink">CloudTrail Log File Integrity Validation</h3>
          <p className="text-sm text-soft">Domain 2.3 — step through how CloudTrail's digest hash chain makes tampering detectable.</p>
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
        The hash chain is what makes this tamper-EVIDENT rather than just tamper-resistant: deleting or editing a
        single log file breaks every digest after it in the chain, so `validate-logs` will flag the gap even if
        the attacker also deleted the offending log file itself.
      </div>
    </div>
  )
}
