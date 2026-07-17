import { useMemo, useState } from 'react'

type Mode = 'governance' | 'compliance'
type Actor = 'root' | 'special-permission-user' | 'regular-user'

const ACTORS: { id: Actor; label: string }[] = [
  { id: 'root', label: 'Account Root User' },
  { id: 'special-permission-user', label: 'User with s3:BypassGovernanceRetention' },
  { id: 'regular-user', label: 'Regular IAM User' },
]

function canOverride(mode: Mode, actor: Actor): boolean {
  if (mode === 'compliance') return false
  return actor === 'special-permission-user'
}

export default function ObjectLockModes() {
  const [mode, setMode] = useState<Mode>('governance')
  const [actor, setActor] = useState<Actor>('root')
  const [attempted, setAttempted] = useState(false)

  const allowed = useMemo(() => canOverride(mode, actor), [mode, actor])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">S3 Object Lock: Governance vs Compliance</h3>
        <p className="text-sm text-soft">
          Domain 5.2 — pick a retention mode and an actor, then try to delete a locked object to see who can override.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">Retention mode</p>
          <div className="flex gap-2">
            {(['governance', 'compliance'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m)
                  setAttempted(false)
                }}
                className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  mode === m
                    ? 'border-accent bg-accent-tint text-accent'
                    : 'border-line bg-surface text-soft hover:border-line-strong'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-soft mb-1">Who is attempting the delete?</p>
          <select
            value={actor}
            onChange={(e) => {
              setActor(e.target.value as Actor)
              setAttempted(false)
            }}
            className="w-full rounded-crisp border border-line bg-surface px-3 py-2 text-sm text-ink"
          >
            {ACTORS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-crisp border border-line bg-wash p-5 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-28 h-20 rounded-crisp border-2 border-line-strong bg-surface flex items-center justify-center text-xs text-ink font-mono">
            object.pdf
          </div>
          <div className="absolute -top-3 -right-3 text-2xl" title="Locked">
            🔒
          </div>
        </div>

        <button
          onClick={() => setAttempted(true)}
          className="rounded-crisp bg-bad hover:opacity-90 text-paper text-sm font-semibold px-4 py-2 transition-opacity"
        >
          Attempt DeleteObject
        </button>

        {attempted && (
          <div
            key={`${mode}-${actor}`}
            className={`w-full rounded-crisp border-l-2 px-4 py-3 text-sm animate-fadein ${
              allowed ? 'border-warn bg-warn-tint' : 'border-bad bg-bad-tint'
            }`}
          >
            {allowed ? (
              <p className="text-ink">
                <span className="font-display font-semibold text-warn">Delete succeeded (with bypass).</span> This
                user holds the special{' '}
                <code className="font-mono text-xs bg-surface border border-line px-1 rounded-crisp">
                  s3:BypassGovernanceRetention
                </code>{' '}
                permission, and the object is only in <span className="font-semibold">governance</span> mode — the
                lock can be intentionally overridden by an authorized principal.
              </p>
            ) : (
              <p className="text-ink">
                <span className="font-display font-semibold text-bad">Delete denied.</span>{' '}
                {mode === 'compliance'
                  ? 'Compliance mode cannot be overridden by ANY principal, including the root user, until the retention period expires.'
                  : 'This principal lacks the bypass permission, so governance mode still blocks the delete.'}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        <span className="font-semibold text-ink">Exam tip:</span> "cannot be deleted by anyone, including root" is
        the tell for <span className="text-bad font-medium">compliance</span> mode. "An authorized user can override
        in an emergency" is the tell for <span className="text-good font-medium">governance</span> mode.
      </div>
    </div>
  )
}
