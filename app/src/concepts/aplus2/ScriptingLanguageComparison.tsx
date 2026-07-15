interface Fact {
  label: string
  value: string
}

const WINDOWS_NATIVE: Fact[] = [
  { label: 'File extensions', value: '.bat (batch), .ps1 (PowerShell), .vbs (VBScript)' },
  { label: 'Runs via', value: 'cmd.exe or the PowerShell host, built into Windows with no extra install' },
  { label: 'Typical use', value: 'Automating Windows admin tasks — user provisioning, registry edits, scheduled maintenance' },
  { label: 'Variables', value: 'PowerShell variables are prefixed with $; batch uses %VAR%' },
  { label: 'Watch out for', value: 'Execution policy can block .ps1 scripts by default; .vbs is largely legacy and often flagged by security tools' },
]

const CROSS_PLATFORM: Fact[] = [
  { label: 'File extensions', value: '.sh (shell script), .py (Python), .js (JavaScript)' },
  { label: 'Runs via', value: 'An interpreter that must be installed/present (bash, python, node) — not built into Windows by default' },
  { label: 'Typical use', value: 'Automation that needs to run identically across Windows, macOS, and Linux, or web/app-adjacent tooling' },
  { label: 'Variables', value: 'Python and JavaScript use standard typed variables; shell scripts treat everything as text unless cast' },
  { label: 'Watch out for', value: 'Running an unfamiliar downloaded script is a real risk — untested scripts can make unintended system changes, so read before you run' },
]

function Column({ title, facts, accent }: { title: string; facts: Fact[]; accent: boolean }) {
  return (
    <div className={`rounded-crisp border p-4 space-y-3 ${accent ? 'border-accent-line bg-accent-tint' : 'border-line bg-surface'}`}>
      <h4 className={`font-display font-semibold ${accent ? 'text-accent' : 'text-ink'}`}>{title}</h4>
      <dl className="space-y-2">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="text-[11px] uppercase tracking-wider text-faint">{f.label}</dt>
            <dd className="text-sm text-ink leading-relaxed">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function ScriptingLanguageComparison() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Scripting Basics: Windows-Native vs Cross-Platform</h3>
        <p className="text-sm text-soft">Domain 4.8 — compare the two broad scripting families a technician runs into.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Column title="Windows-native scripting" facts={WINDOWS_NATIVE} accent={false} />
        <Column title="Cross-platform scripting" facts={CROSS_PLATFORM} accent />
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: 1102 scripting questions test recognition (matching an extension to its scripting type) and
        judgment (basic use cases like scripted user account creation, plus the risks of running untested scripts —
        unintended system changes, browser/security-setting hijacking, and unnecessary resource usage) more than
        actual code-writing.
      </div>
    </div>
  )
}
