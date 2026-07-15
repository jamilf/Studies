import { useMemo, useState } from 'react'

type Applet = 'Devices and Printers' | 'System Configuration (msconfig)' | 'Disk Cleanup' | 'Network and Sharing Center' | 'Backup and Restore'

interface Symptom {
  text: string
  correctApplet: Applet
  why: string
}

const SYMPTOMS: Symptom[] = [
  {
    text: 'A newly connected USB printer isn\'t showing up as a print destination.',
    correctApplet: 'Devices and Printers',
    why: 'This applet lists every installed printer and lets you add a new one, set a default, or manage the print queue.',
  },
  {
    text: 'The PC takes forever to reach the desktop because too many programs launch at boot.',
    correctApplet: 'System Configuration (msconfig)',
    why: 'The Startup tab (or a link into Task Manager\'s Startup tab on Windows 10/11) shows every boot-time program so you can selectively disable the ones slowing logon.',
  },
  {
    text: 'A drive report says storage is almost full and temp files need to be cleared.',
    correctApplet: 'Disk Cleanup',
    why: 'Disk Cleanup scans a volume for temporary files, old Windows Update caches, and Recycle Bin contents, and safely removes what you select.',
  },
  {
    text: 'Two computers on the same LAN can\'t see each other or share files.',
    correctApplet: 'Network and Sharing Center',
    why: 'This applet configures the active network profile, adapter settings, and advanced sharing options (network discovery, file/printer sharing) that control visibility between hosts.',
  },
  {
    text: 'A user wants scheduled, automatic copies of their documents in case the drive fails.',
    correctApplet: 'Backup and Restore',
    why: 'Backup and Restore (Windows 7 style, still present in 10/11) lets you schedule recurring backups to another drive and create a system image.',
  },
]

const APPLETS: Applet[] = [
  'Devices and Printers',
  'System Configuration (msconfig)',
  'Disk Cleanup',
  'Network and Sharing Center',
  'Backup and Restore',
]

export default function ControlPanelAppletRouter() {
  const [symptomIndex, setSymptomIndex] = useState(0)
  const [guess, setGuess] = useState<Applet | null>(null)

  const symptom = SYMPTOMS[symptomIndex]
  const isCorrect = useMemo(() => guess !== null && guess === symptom.correctApplet, [guess, symptom])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Control Panel Applet Router</h3>
        <p className="text-sm text-soft">Domain 1.4 — pick a symptom, then pick the applet that fixes it.</p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Symptom</p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((s, i) => (
            <button
              key={s.text}
              onClick={() => {
                setSymptomIndex(i)
                setGuess(null)
              }}
              className={`rounded-crisp border px-3 py-1.5 text-xs font-medium transition-colors ${
                symptomIndex === i ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              Case {i + 1}
            </button>
          ))}
        </div>
        <p className="text-sm text-ink mt-2 rounded-crisp border border-line bg-wash px-3 py-2">{symptom.text}</p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Which applet do you open?</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {APPLETS.map((a) => (
            <button
              key={a}
              onClick={() => setGuess(a)}
              className={`rounded-crisp border px-3 py-2 text-sm font-medium text-left transition-colors ${
                guess === a ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {guess !== null && (
        <div
          key={`${symptomIndex}-${guess}`}
          className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${
            isCorrect ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'
          }`}
        >
          <p className={`font-display text-lg font-semibold ${isCorrect ? 'text-good' : 'text-bad'}`}>
            {isCorrect ? 'Correct applet' : `Not quite — the answer is ${symptom.correctApplet}`}
          </p>
          <p className="text-sm text-ink mt-1 leading-relaxed">{symptom.why}</p>
        </div>
      )}

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: 1102 phrases these as "a user reports X, which tool do you open" questions. Learn the applet
        by the specific verb in the symptom — printers/devices, startup programs, disk space, network sharing,
        and scheduled backups each map to exactly one applet above.
      </div>
    </div>
  )
}
