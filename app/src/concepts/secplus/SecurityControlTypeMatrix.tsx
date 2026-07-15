import { useMemo, useState } from 'react'

type Category = 'technical' | 'managerial' | 'operational' | 'physical'
type Fn = 'preventive' | 'detective' | 'corrective' | 'deterrent' | 'compensating'

const CATEGORY_LABEL: Record<Category, string> = {
  technical: 'Technical',
  managerial: 'Managerial',
  operational: 'Operational',
  physical: 'Physical',
}

const FN_LABEL: Record<Fn, string> = {
  preventive: 'Preventive',
  detective: 'Detective',
  corrective: 'Corrective',
  deterrent: 'Deterrent',
  compensating: 'Compensating',
}

const MATRIX: Record<Category, Record<Fn, string>> = {
  technical: {
    preventive: 'Firewall rules and ACLs that block unauthorized traffic before it ever reaches a host.',
    detective: 'IDS/IPS and SIEM correlation rules that flag anomalous traffic as it happens.',
    corrective: 'Automated patch deployment or a scripted restore-from-backup after an incident.',
    deterrent: 'A login banner warning that all activity on the system is monitored and logged.',
    compensating: 'Adding MFA in front of a legacy app that cannot be patched for a weak-authentication flaw.',
  },
  managerial: {
    preventive: 'Security awareness training and pre-employment background checks before access is granted.',
    detective: 'Periodic user access reviews and compliance audits that surface policy violations.',
    corrective: 'Rewriting a security policy after a post-incident lessons-learned review.',
    deterrent: 'A published acceptable use policy that states clear disciplinary consequences.',
    compensating: 'Requiring dual sign-off from a manager when full segregation of duties cannot be automated.',
  },
  operational: {
    preventive: 'Security guards checking ID badges and mandatory onboarding security drills.',
    detective: 'Daily log review and video surveillance monitoring performed by an operations team.',
    corrective: 'Executing the incident response playbook to restore a system to a known-good state.',
    deterrent: 'Visible security guard patrols and warning signage at facility entrances.',
    compensating: 'Manual verification of high-value transactions while automated fraud detection is down.',
  },
  physical: {
    preventive: 'Locked doors, fencing, and mantraps that physically block unauthorized entry.',
    detective: 'Motion sensors and CCTV cameras that detect an intrusion attempt as it occurs.',
    corrective: 'Fire suppression systems that restore a safe environment after a fire is detected.',
    deterrent: 'Perimeter lighting and warning signs that discourage an attempted physical entry.',
    compensating: 'Posting a guard at a door whose badge reader is temporarily out of service.',
  },
}

export default function SecurityControlTypeMatrix() {
  const [category, setCategory] = useState<Category>('technical')
  const [fn, setFn] = useState<Fn>('preventive')

  const example = useMemo(() => MATRIX[category][fn], [category, fn])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Security Control Types Matrix</h3>
        <p className="text-sm text-soft">
          Domain 1.1 — pick a control category and a control function to see a matching real-world example.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Category (what kind of control)</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  category === c ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {CATEGORY_LABEL[c]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Function (what the control does)</p>
          <div className="flex flex-col gap-1.5">
            {(Object.keys(FN_LABEL) as Fn[]).map((f) => (
              <button
                key={f}
                onClick={() => setFn(f)}
                className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                  fn === f ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {FN_LABEL[f]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${category}-${fn}`} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 animate-fadein">
        <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
          {CATEGORY_LABEL[category]} · {FN_LABEL[fn]}
        </p>
        <p className="text-sm text-ink leading-relaxed">{example}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam tests both axes independently: category answers "what kind of control is this?" (technical,
        managerial, operational, physical) while function answers "what does it do?" (prevent, detect, correct,
        deter, or compensate). A single real-world safeguard is always describable on both axes at once.
      </div>
    </div>
  )
}
