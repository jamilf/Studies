import { useMemo, useState } from 'react'

type SyncMethod = 'cloud' | 'cable'
type Environment = 'personal' | 'corporate'
type Tone = 'good' | 'warn' | 'bad'

interface Verdict {
  label: string
  tone: Tone
  reasoning: string
}

function evaluate(method: SyncMethod, env: Environment): Verdict {
  if (method === 'cloud' && env === 'personal') {
    return {
      label: 'Recommended',
      tone: 'good',
      reasoning:
        'A personal cloud account (iCloud, Google, Microsoft) syncs contacts, photos, email, and app data automatically over Wi-Fi or cellular. It requires mutual authentication between the device and the account, and syncing large photo/video libraries over cellular can burn through a data cap fast.',
    }
  }
  if (method === 'cloud' && env === 'corporate') {
    return {
      label: 'Recommended — via MDM only',
      tone: 'good',
      reasoning:
        'Corporate data should sync through an approved MDM/EMM profile, not a personal cloud account. That gives IT the mutual authentication, encryption, and remote-wipe control the org needs, and keeps corporate data separated from the user\'s personal cloud storage.',
    }
  }
  if (method === 'cable' && env === 'personal') {
    return {
      label: 'Acceptable alternative',
      tone: 'good',
      reasoning:
        'A direct USB connection to a desktop sync client works fine for personal devices — no data cap, no cellular signal needed, and it\'s often faster for a large one-time media transfer. It does require physical access to the device and the sync software installed on that machine.',
    }
  }
  return {
    label: 'Not recommended',
    tone: 'warn',
    reasoning:
      'Plugging a corporate-managed device into an untrusted PC for a raw USB sync bypasses the MDM policies that control encryption and data leakage. Corporate devices should be set to charge-only over USB unless the sync path itself is IT-provisioned.',
  }
}

const TONE_CLASSES: Record<Tone, string> = {
  good: 'border-good bg-good-tint text-good',
  warn: 'border-warn bg-warn-tint text-warn',
  bad: 'border-bad bg-bad-tint text-bad',
}

export default function MobileSyncDecision() {
  const [method, setMethod] = useState<SyncMethod>('cloud')
  const [env, setEnv] = useState<Environment>('personal')

  const verdict = useMemo(() => evaluate(method, env), [method, env])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Mobile Device Synchronization</h3>
        <p className="text-sm text-soft">
          Domain 1.4 — pick a sync method and device environment to see the recommended approach.
        </p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Sync method</p>
        <div className="flex gap-2">
          {(['cloud', 'cable'] as SyncMethod[]).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                method === m ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {m === 'cloud' ? 'Cloud account' : 'Cable (USB)'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Device environment</p>
        <div className="flex gap-2">
          {(['personal', 'corporate'] as Environment[]).map((e) => (
            <button
              key={e}
              onClick={() => setEnv(e)}
              className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                env === e ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {e === 'personal' ? 'Personal / BYOD' : 'Corporate-managed'}
            </button>
          ))}
        </div>
      </div>

      <div key={`${method}-${env}`} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${TONE_CLASSES[verdict.tone]}`}>
        <p className="font-display text-lg font-semibold">{verdict.label}</p>
        <p className="text-sm text-ink mt-1 leading-relaxed">{verdict.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The recurring exam theme: on a corporate-managed device, the sync path has to go through whatever the MDM
        profile enforces so the org retains encryption and remote-wipe control — a personal cloud account or a bare
        USB cable sidesteps that policy entirely.
      </div>
    </div>
  )
}
