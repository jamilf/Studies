import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  { front: 'fields', back: 'Extracts or computes fields for use in the query, e.g. `fields @timestamp, @message, sourceIPAddress`. Usually the first command in a query.' },
  { front: 'filter', back: 'Filters results using a condition, e.g. `filter eventName = "ConsoleLogin"` — narrows the record set before any aggregation runs, which also makes the query cheaper.' },
  { front: 'stats', back: 'Aggregates data into a summary, e.g. `stats count(*) by sourceIPAddress` — the core analytics command for turning raw events into counts, sums, and percentiles.' },
  { front: 'sort', back: 'Orders results by one or more fields, e.g. `sort @timestamp desc` to see the most recent events first.' },
  { front: 'limit', back: 'Caps the number of returned results, e.g. `limit 20` — controls result size and cost on broad queries.' },
  { front: 'parse', back: 'Extracts structured data out of unstructured log text using a glob-like pattern, e.g. `parse @message "user=* action=*" as user, action`, so you can query fields your logs never explicitly had.' },
]

export default function LogsInsightsCommandMatcher() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">CloudWatch Logs Insights: Query Commands</h3>
        <p className="text-sm text-soft">Domain 2.2 — click a command to reveal what it does in a Logs Insights query pipeline.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c, i) => (
          <button
            key={c.front}
            onClick={() => toggle(i)}
            className={`text-left rounded-crisp border px-4 py-4 min-h-[110px] transition-colors ${
              flipped.has(i) ? 'border-accent bg-accent-tint' : 'border-line bg-surface hover:border-line-strong'
            }`}
          >
            {flipped.has(i) ? (
              <p className="text-sm text-ink animate-fadein leading-relaxed">{c.back}</p>
            ) : (
              <p className="font-mono text-base font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        A Logs Insights query is a pipeline: commands are chained with a pipe (`|`) and each one transforms the
        output of the one before it — e.g. `fields`, then `filter`, then `stats`, then `sort`, then `limit` — in
        that order, similarly to how you'd read a Unix shell pipeline.
      </div>
    </div>
  )
}
