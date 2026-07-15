import { useState } from 'react'

export default function RdsMultiAzToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">RDS Single-AZ vs Multi-AZ</h3>
        <p className="text-sm text-soft">Domain 2.2 — toggle to see how a standby replica changes failure behavior.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Single-AZ</span>
        <button onClick={() => setAfter((a) => !a)} className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>Multi-AZ</span>
      </div>

      <div key={after ? 'after' : 'before'} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>{after ? 'Multi-AZ (synchronous standby)' : 'Single-AZ (no standby)'}</p>
        {after ? (
          <ul className="text-sm text-ink mt-2 space-y-1">
            <li>- A synchronous standby replica runs in a second Availability Zone</li>
            <li>- On AZ failure, RDS automatically fails over — typically 60-120 seconds, no manual action</li>
            <li>- The DNS endpoint stays the same; RDS repoints it to the new primary</li>
            <li>- Standby is for durability/HA only — it is not readable and does not offload read traffic</li>
          </ul>
        ) : (
          <ul className="text-sm text-ink mt-2 space-y-1">
            <li>- Exactly one database instance, one Availability Zone</li>
            <li>- An AZ outage or storage failure means downtime until AWS restores from backup</li>
            <li>- No automatic failover target exists — recovery is manual and slow</li>
            <li>- Cheapest option, appropriate only for dev/test workloads</li>
          </ul>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Multi-AZ is a high-availability feature, not a scaling feature — for read scaling you still need Read
        Replicas. A production database on the exam almost always calls for Multi-AZ at minimum.
      </div>
    </div>
  )
}
