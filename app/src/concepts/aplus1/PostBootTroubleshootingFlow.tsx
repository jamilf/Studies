import { useEffect, useState } from 'react'

interface Stage {
  title: string
  symptom: string
  likelyCause: string
  action: string
}

const STAGES: Stage[] = [
  {
    title: 'No power at all',
    symptom: 'No fans spin, no lights, no display — completely dead.',
    likelyCause: 'PSU dead/unplugged, wall outlet/surge protector off, or a failed power/motherboard connection.',
    action: 'Check the wall outlet and PSU switch first, then reseat the 24-pin/8-pin power connectors before assuming the board itself is dead.',
  },
  {
    title: 'Power on, but no display and no beep',
    symptom: 'Fans spin, lights are on, but nothing reaches the monitor and there\'s dead silence from the speaker.',
    likelyCause: 'No POST speaker installed (common on modern boards), a dead GPU, or a motherboard that failed before it could even initialize the speaker.',
    action: 'Try a different video output (onboard vs. discrete GPU), reseat the GPU and RAM, and check the motherboard\'s debug LED/code display if it has one.',
  },
  {
    title: 'Continuous or repeating beep code',
    symptom: 'A steady or patterned beep loop instead of the normal single confirmation beep.',
    likelyCause: 'Memory not seated or failed — this is the single most common beep-code culprit across AMI and Award/Phoenix BIOS.',
    action: 'Reseat each RAM module firmly until the clips click, then test with one module at a time in different slots to isolate a bad stick or slot.',
  },
  {
    title: 'Specific long/short beep pattern',
    symptom: 'e.g., 1 long + 2 short beeps (classic AMI code for a video adapter fault).',
    likelyCause: 'Beep patterns are manufacturer-specific (AMI vs. Award/Phoenix use different codes) but a video-related pattern usually points to the GPU or its seating.',
    action: 'Look up the exact pattern against that motherboard/BIOS vendor\'s beep code chart, then reseat or swap the indicated component.',
  },
  {
    title: 'POST passes (single beep), but "boot device not found"',
    symptom: 'BIOS/UEFI splash appears fine, POST completes, then it can\'t find an OS to load.',
    likelyCause: 'Boot order pointing at the wrong device, a disconnected/failed drive, or a corrupted boot partition (MBR/GPT).',
    action: 'Enter BIOS/UEFI setup, confirm the drive is detected at all, and fix the boot order — if the drive isn\'t detected, check its power/data cables.',
  },
  {
    title: 'OS starts loading, then fails',
    symptom: 'Windows/Linux logo appears, then a blue screen, boot loop, or crash before reaching the desktop.',
    likelyCause: 'Corrupted system files, a bad driver update, or failing storage — this is past POST and now an OS-level problem.',
    action: 'Boot into Safe Mode or recovery environment, check Event Viewer/logs, and consider startup repair or a driver rollback before reinstalling anything.',
  },
]

export default function PostBootTroubleshootingFlow() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STAGES.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 2000)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">POST / Boot Failure Troubleshooting Flow</h3>
          <p className="text-sm text-soft">Domain 5.2 — step through the boot sequence to see where a failure points you.</p>
        </div>
        <button
          onClick={() => {
            if (active >= STAGES.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STAGES.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STAGES.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {STAGES.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STAGES.length}%` }}
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

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein space-y-2">
        <h4 className="font-semibold text-ink">{STAGES[active].title}</h4>
        <p className="text-sm text-soft leading-relaxed">
          <span className="font-semibold text-ink">Symptom: </span>
          {STAGES[active].symptom}
        </p>
        <p className="text-sm text-soft leading-relaxed">
          <span className="font-semibold text-ink">Likely cause: </span>
          {STAGES[active].likelyCause}
        </p>
        <div className="rounded-crisp border border-line bg-surface p-3 text-sm text-soft">
          <span className="font-semibold text-ink">Next action: </span>
          {STAGES[active].action}
        </div>
      </div>

      <div className="rounded-crisp bg-warn-tint border-l-2 border-warn px-4 py-3 text-sm">
        <p className="font-semibold text-warn mb-1">Exam tip</p>
        <p className="text-ink">
          Beep codes are BIOS-vendor-specific (AMI and Award/Phoenix use different patterns for the same fault) — the
          exam won't expect you to memorize exact codes, but it will expect you to know that continuous/repeating
          beeps almost always mean memory, and total silence with no display usually means video or power.
        </p>
      </div>
    </div>
  )
}
