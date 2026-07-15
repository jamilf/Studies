import { useMemo, useState } from 'react'

type Symptom = "App won't open" | 'App crashes randomly during use' | 'App runs very slowly' | "App won't install"
type Trigger = 'Right after a Windows update' | 'Every single time' | 'Only under heavy load or with large files'

interface Verdict {
  cause: string
  fix: string
  tint: 'bad' | 'warn'
}

function evaluate(symptom: Symptom, trigger: Trigger): Verdict {
  if (symptom === "App won't install") {
    if (trigger === 'Right after a Windows update') {
      return {
        cause: 'The installer is failing a compatibility or architecture check against the newly updated OS build, or a security policy change is blocking the installer.',
        fix: 'Run the installer in compatibility mode for the target OS version, temporarily check Windows Defender/antivirus exclusions, and confirm the app supports the current build.',
        tint: 'warn',
      }
    }
    return {
      cause: 'Insufficient permissions, insufficient free disk space, or a missing dependency (e.g., a required runtime like .NET or Visual C++ redistributable) is blocking setup.',
      fix: 'Run the installer as administrator, verify free disk space and system requirements, and install any prerequisite runtimes the app lists before retrying.',
      tint: 'bad',
    }
  }
  if (symptom === "App won't open") {
    if (trigger === 'Right after a Windows update') {
      return {
        cause: 'The update changed a shared component, driver, or security setting the app depends on, breaking compatibility that worked before.',
        fix: 'Check for an app update matching the new OS build; if none exists yet, try compatibility mode or, as a last resort, roll back the Windows update.',
        tint: 'warn',
      }
    }
    return {
      cause: 'Corrupted application files, a conflicting background process, or a missing dependency is preventing the app from launching at all.',
      fix: 'Reinstall the application, check Event Viewer for the specific faulting module, and confirm required services/dependencies are running.',
      tint: 'bad',
    }
  }
  if (symptom === 'App crashes randomly during use') {
    if (trigger === 'Only under heavy load or with large files') {
      return {
        cause: 'The app is running out of memory or hitting a resource ceiling — often a genuine RAM/CPU limitation rather than a corrupted install.',
        fix: 'Check Task Manager for memory/CPU usage while reproducing the crash, close competing background apps, and consider a RAM upgrade if this is a recurring pattern.',
        tint: 'warn',
      }
    }
    return {
      cause: 'An unstable or outdated driver, a corrupted app cache, or a conflicting background process (commonly antivirus or another resident app) is interrupting execution.',
      fix: 'Update graphics/chipset drivers, clear the app\'s cache/temp files, and test in a clean boot to rule out a conflicting background process.',
      tint: 'bad',
    }
  }
  // App runs very slowly
  if (trigger === 'Only under heavy load or with large files') {
    return {
      cause: 'The workload genuinely exceeds available system resources — this is expected behavior at scale, not necessarily a fault.',
      fix: 'Monitor Resource Monitor/Task Manager during the slow operation; if RAM or disk I/O is maxed, that confirms a hardware/resource limitation rather than a software bug.',
      tint: 'warn',
    }
  }
  return {
    cause: 'Low disk space, too many background/startup processes, malware, or a fragmented/failing drive is dragging down performance across the board.',
    fix: 'Free up disk space, trim startup items in Task Manager, run a malware scan, and check drive health (SMART status) before assuming the app itself is at fault.',
    tint: 'bad',
  }
}

const SYMPTOMS: Symptom[] = ["App won't open", 'App crashes randomly during use', 'App runs very slowly', "App won't install"]
const TRIGGERS: Trigger[] = ['Right after a Windows update', 'Every single time', 'Only under heavy load or with large files']

export default function ApplicationCrashDecisionMatrix() {
  const [symptom, setSymptom] = useState<Symptom>("App won't open")
  const [trigger, setTrigger] = useState<Trigger>('Every single time')

  const verdict = useMemo(() => evaluate(symptom, trigger), [symptom, trigger])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Application Crash & Slow Performance Triage</h3>
        <p className="text-sm text-soft">Domain 3.1 — pick the symptom and when it happens to get the likely cause and fix path.</p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Symptom</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SYMPTOMS.map((s) => (
            <button
              key={s}
              onClick={() => setSymptom(s)}
              className={`rounded-crisp border px-2 py-2 text-xs font-medium text-left transition-colors ${
                symptom === s ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">When it happens</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {TRIGGERS.map((t) => (
            <button
              key={t}
              onClick={() => setTrigger(t)}
              className={`rounded-crisp border px-2 py-2 text-xs font-medium text-left transition-colors ${
                trigger === t ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div
        key={`${symptom}-${trigger}`}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${verdict.tint === 'bad' ? 'border-bad bg-bad-tint' : 'border-warn bg-warn-tint'}`}
      >
        <p className={`text-[11px] uppercase tracking-wider font-semibold mb-1 ${verdict.tint === 'bad' ? 'text-bad' : 'text-warn'}`}>
          Likely cause
        </p>
        <p className="text-sm text-ink leading-relaxed mb-3">{verdict.cause}</p>
        <p className={`text-[11px] uppercase tracking-wider font-semibold mb-1 ${verdict.tint === 'bad' ? 'text-bad' : 'text-warn'}`}>
          Fix path
        </p>
        <p className="text-sm text-ink leading-relaxed">{verdict.fix}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: "right after an update" is a strong hint toward compatibility, not corruption — check for an
        available app update or driver rollback before you reinstall anything from scratch.
      </div>
    </div>
  )
}
