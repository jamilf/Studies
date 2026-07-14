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
        <h3 className="text-lg font-semibold text-slate-100">S3 Object Lock: Governance vs Compliance</h3>
        <p className="text-sm text-slate-400">
          Domain 5.2 — pick a retention mode and an actor, then try to delete a locked object before its retention expires.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-400 mb-1">Retention mode</p>
          <div className="flex gap-2">
            {(['governance', 'compliance'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m)
                  setAttempted(false)
                }}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  mode === m
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">Who is attempting the delete?</p>
          <select
            value={actor}
            onChange={(e) => {
              setActor(e.target.value as Actor)
              setAttempted(false)
            }}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200"
          >
            {ACTORS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-28 h-20 rounded-md border-2 border-slate-600 bg-slate-800 flex items-center justify-center text-xs text-slate-300 font-mono">
            object.pdf
          </div>
          <div className="absolute -top-3 -right-3 text-2xl" title="Locked">
            🔒
          </div>
        </div>

        <button
          onClick={() => setAttempted(true)}
          className="rounded-lg bg-red-700 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          Attempt DeleteObject
        </button>

        {attempted && (
          <div
            key={`${mode}-${actor}`}
            className={`w-full rounded-lg border p-4 text-sm animate-[fadein_0.3s_ease-out] ${
              allowed
                ? 'border-amber-700/50 bg-amber-950/30 text-amber-200'
                : 'border-red-800/50 bg-red-950/30 text-red-300'
            }`}
          >
            {allowed ? (
              <p>
                <span className="font-semibold">Delete succeeded (with bypass).</span> This user holds the special{' '}
                <code className="text-xs bg-slate-800 px-1 rounded">s3:BypassGovernanceRetention</code> permission, and
                the object is only in <span className="font-semibold">governance</span> mode — the lock can be
                intentionally overridden by an authorized principal.
              </p>
            ) : (
              <p>
                <span className="font-semibold">Delete denied.</span>{' '}
                {mode === 'compliance'
                  ? 'Compliance mode cannot be overridden by ANY principal, including the root user, until the retention period expires.'
                  : 'This principal lacks the bypass permission, so governance mode still blocks the delete.'}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
        <span className="font-semibold text-slate-300">Exam tip:</span> "cannot be deleted by anyone, including root"
        is the tell for <span className="text-red-300 font-medium">compliance</span> mode. "An authorized user can
        override in an emergency" is the tell for <span className="text-emerald-300 font-medium">governance</span>{' '}
        mode.
      </div>
    </div>
  )
}
