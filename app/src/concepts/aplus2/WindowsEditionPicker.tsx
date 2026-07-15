import { useMemo, useState } from 'react'

type Edition = 'Home' | 'Pro' | 'Pro for Workstations' | 'Enterprise'
type Feature =
  | 'BitLocker Drive Encryption'
  | 'Group Policy Editor (gpedit.msc)'
  | 'Domain / Azure AD Join'
  | 'Remote Desktop (host a session)'
  | 'Hyper-V'
  | 'Windows Sandbox'
  | 'BranchCache'
  | 'AppLocker'

const EDITIONS: Edition[] = ['Home', 'Pro', 'Pro for Workstations', 'Enterprise']

const FEATURES: Feature[] = [
  'BitLocker Drive Encryption',
  'Group Policy Editor (gpedit.msc)',
  'Domain / Azure AD Join',
  'Remote Desktop (host a session)',
  'Hyper-V',
  'Windows Sandbox',
  'BranchCache',
  'AppLocker',
]

// Minimum edition rank required to unlock a feature. 0=Home, 1=Pro, 2=Pro for Workstations, 3=Enterprise
const REQUIREMENT: Record<Feature, number> = {
  'BitLocker Drive Encryption': 1,
  'Group Policy Editor (gpedit.msc)': 1,
  'Domain / Azure AD Join': 1,
  'Remote Desktop (host a session)': 1,
  'Hyper-V': 1,
  'Windows Sandbox': 1,
  BranchCache: 3,
  AppLocker: 3,
}

const NOTES: Record<Feature, string> = {
  'BitLocker Drive Encryption':
    'Full-volume encryption. Home users are limited to "Device Encryption" (a stripped-down, silent version tied to a Microsoft account) — the full BitLocker control panel with PIN/USB key options only appears on Pro and above.',
  'Group Policy Editor (gpedit.msc)':
    'Home has no local Group Policy Editor at all; local security and system policy must be set through the Registry instead. Pro adds gpedit.msc for local machine policy.',
  'Domain / Azure AD Join':
    'Home can only join a Microsoft account or "work or school" account in a limited way — it cannot join a traditional on-prem Active Directory domain. Pro and above can join both AD and Azure AD.',
  'Remote Desktop (host a session)':
    'Every edition can be an RDP client (mstsc.exe), but only Pro and above can act as the RDP host that accepts incoming connections. Home cannot host RDP sessions.',
  'Hyper-V':
    'Requires Pro or above plus CPU virtualization support (VT-x/AMD-V). Home cannot run Hyper-V natively — third-party hypervisors are the workaround.',
  'Windows Sandbox':
    'A disposable, isolated desktop for testing untrusted apps; built on the same Hyper-V infrastructure, so it inherits the Pro-or-above requirement.',
  BranchCache:
    'Caches content from central servers at a branch office so peers can share it locally instead of re-fetching over WAN — an Enterprise/Education feature for large, multi-site organizations.',
  AppLocker:
    'Enterprise-grade application allowlisting/denylisting by publisher, path, or hash — reserved for Enterprise (and Education), managed centrally via Group Policy.',
}

function isUnlocked(edition: Edition, feature: Feature): boolean {
  return EDITIONS.indexOf(edition) >= REQUIREMENT[feature]
}

export default function WindowsEditionPicker() {
  const [edition, setEdition] = useState<Edition>('Pro')
  const [feature, setFeature] = useState<Feature>('BitLocker Drive Encryption')

  const unlocked = useMemo(() => isUnlocked(edition, feature), [edition, feature])
  const minEdition = useMemo(() => EDITIONS[REQUIREMENT[feature]], [feature])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Windows Edition Feature Picker</h3>
        <p className="text-sm text-soft">Domain 1.1 — pick an edition and a feature to see whether it's unlocked.</p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Windows edition</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {EDITIONS.map((e) => (
            <button
              key={e}
              onClick={() => setEdition(e)}
              className={`rounded-crisp border px-2 py-2 text-xs font-medium transition-colors ${
                edition === e ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Feature</p>
        <select
          value={feature}
          onChange={(e) => setFeature(e.target.value as Feature)}
          className="w-full rounded-crisp border border-line bg-surface px-3 py-2 text-sm text-ink"
        >
          {FEATURES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div
        key={`${edition}-${feature}`}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${
          unlocked ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'
        }`}
      >
        <p className={`font-display text-xl font-semibold text-center ${unlocked ? 'text-good' : 'text-bad'}`}>
          {unlocked ? 'Unlocked' : 'Not available'}
        </p>
        <p className="text-sm text-ink text-center mt-1">
          {unlocked
            ? `${feature} is available on Windows ${edition}.`
            : `${feature} requires Windows ${minEdition} or higher.`}
        </p>
        <p className="text-sm text-soft leading-relaxed mt-3">{NOTES[feature]}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam pattern: 1102 loves "which edition is the minimum needed" questions. The rule of thumb — Home lacks
        domain join, BitLocker's full UI, RDP hosting, Hyper-V, and gpedit; Enterprise adds the large-organization
        features (BranchCache, AppLocker, Windows To Go) on top of everything Pro has.
      </div>
    </div>
  )
}
