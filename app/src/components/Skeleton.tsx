/**
 * Shaped placeholders that hold the layout while data or a lazy chunk loads,
 * instead of collapsing to a bare "Loading…" string. Uses only design tokens;
 * the pulse is a plain opacity animation the reduced-motion guard neutralises.
 */

function Bar({ className = '' }: { className?: string }) {
  return <div className={`rounded-crisp bg-wash animate-pulse ${className}`} />
}

/** Generic page-level placeholder. */
export function PageSkeleton({ label = 'Loading' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="space-y-4 max-w-2xl">
      <span className="sr-only">{label}…</span>
      <Bar className="h-5 w-40" />
      <Bar className="h-32 w-full" />
      <Bar className="h-4 w-3/4" />
      <Bar className="h-4 w-1/2" />
    </div>
  )
}

/** Placeholder sized for a concept figure inside its frame. */
export function FigureSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="space-y-3">
      <span className="sr-only">Loading figure…</span>
      <Bar className="h-6 w-2/3" />
      <Bar className="h-4 w-1/2" />
      <Bar className="h-40 w-full" />
    </div>
  )
}

/** Placeholder for the dashboard's stat row plus first section. */
export function DashboardSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="space-y-8">
      <span className="sr-only">Loading dashboard…</span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
        {[0, 1, 2, 3].map((i) => (
          <Bar key={i} className="h-20" />
        ))}
      </div>
      <Bar className="h-5 w-44" />
      <div className="grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Bar key={i} className="h-24" />
        ))}
      </div>
    </div>
  )
}
