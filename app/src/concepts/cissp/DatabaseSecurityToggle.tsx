import { useState } from 'react'

export default function DatabaseSecurityToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Database Security: Aggregation & Inference</h3>
        <p className="text-sm text-soft">Domain 8.5 — toggle to compare a database exposed to aggregation/inference with one hardened against it.</p>
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

      <div key={after ? 'after' : 'before'} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein space-y-2 ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'Hardened database' : 'Vulnerable database'}
        </p>
        {after ? (
          <ul className="text-sm text-ink space-y-1 list-disc list-inside">
            <li>Users query restricted views or stored procedures instead of the base tables directly, so no query can pull more columns than its need-to-know allows.</li>
            <li>Cell suppression and result-set partitioning stop low-sensitivity queries from being combined (aggregated) into a higher-sensitivity summary.</li>
            <li>Polyinstantiation lets the same record exist at multiple classification levels, so a low-clearance user can't infer a high-clearance value even indirectly exists.</li>
            <li>Query auditing and rate limiting flag a user issuing many narrow queries that, pieced together, would reconstruct restricted data.</li>
          </ul>
        ) : (
          <ul className="text-sm text-ink space-y-1 list-disc list-inside">
            <li>Users have direct table access, and individually low-sensitivity fields can be combined (aggregation) into a summary that's classified far higher than any single field.</li>
            <li>An inference channel exists: a user without direct access to a sensitive value can deduce it from other fields they're allowed to see (e.g., deducing salary from job title + department budget).</li>
            <li>A single classification level per record means there's no way to hide that a restricted record exists at all — its mere presence can leak information.</li>
            <li>No monitoring exists for query patterns, so an attacker can slowly reconstruct restricted data through many small, individually authorized queries.</li>
          </ul>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Aggregation combines multiple pieces of low-sensitivity data into something more sensitive; inference lets
        someone deduce restricted information without ever querying it directly. Views, cell suppression, and
        polyinstantiation are the classic database-layer controls used to close both channels.
      </div>
    </div>
  )
}
