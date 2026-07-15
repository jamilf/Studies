import { useState } from 'react'

interface Setting {
  name: string
  before: string
  after: string
}

const SETTINGS: Setting[] = [
  { name: 'UAC (User Account Control)', before: 'Disabled — apps can silently make admin-level changes', after: 'Enabled — any admin-level action prompts for consent' },
  { name: 'BitLocker', before: 'Off — drive contents readable if the disk is removed', after: 'On with TPM — drive is encrypted at rest' },
  { name: 'Windows Defender / firewall', before: 'Default or disabled — no real-time protection', after: 'Real-time protection and firewall both enabled' },
  { name: 'Screen lock', before: 'No lock screen timeout configured', after: 'Locks after a short idle timeout, requires re-auth' },
  { name: 'Guest account', before: 'Enabled — anyone can log on with no credentials', after: 'Disabled — every logon must be a named, audited account' },
]

export default function WindowsSecurityHardeningToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Workstation Hardening: Before / After</h3>
        <p className="text-sm text-soft">Domain 2.6 — toggle to see an unhardened workstation next to one configured with security best practices.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Before</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>After</span>
      </div>

      <div key={after ? 'after' : 'before'} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-lg font-semibold mb-3 ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'Hardened workstation' : 'Default / unhardened workstation'}
        </p>
        <div className="space-y-2">
          {SETTINGS.map((s) => (
            <div key={s.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="text-xs font-semibold text-ink sm:w-56 shrink-0">{s.name}</span>
              <span className="text-sm text-ink">{after ? s.after : s.before}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: 1102 workstation-hardening scenarios usually describe the "before" state as the problem and
        ask which single setting closes the gap. Match the symptom to the exact control — "drive was stolen,
        data was still readable" is BitLocker, not UAC; "malware ran with full admin rights with no prompt" is
        UAC, not the firewall.
      </div>
    </div>
  )
}
