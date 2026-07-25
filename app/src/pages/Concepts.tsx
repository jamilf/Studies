import { Suspense, useMemo, useState } from 'react'
import { useCert } from '../cert/CertContext'
import ErrorBoundary from '../components/ErrorBoundary'
import { FigureSkeleton } from '../components/Skeleton'
import { conceptsForCert, type ConceptEntry } from '../concepts/registry'
import { certConfig } from '../lib/certs'

export default function Concepts() {
  const { cert } = useCert()
  const items = conceptsForCert(cert.id)
  const domainLabels = certConfig(cert.id).domains
  const [query, setQuery] = useState('')
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const byDomain = new Map<number, { item: ConceptEntry; index: number }[]>()
    items.forEach((item, index) => {
      // Filter on title/description but keep the ORIGINAL index so figure
      // numbers stay stable while searching.
      if (q && !`${item.title} ${item.description}`.toLowerCase().includes(q)) return
      const list = byDomain.get(item.domain) ?? []
      list.push({ item, index })
      byDomain.set(item.domain, list)
    })
    return [...byDomain.entries()]
      .sort(([a], [b]) => a - b)
      .map(([domain, domainItems]) => ({ domain, items: domainItems }))
  }, [items, query])
  const matchCount = groups.reduce((n, g) => n + g.items.length, 0)
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)
  const [pickerOpen, setPickerOpen] = useState(false)
  // Fall back to the first figure when the cert switches and the stored id
  // belongs to the previous cert's list.
  const foundIndex = items.findIndex((i) => i.id === activeId)
  const activeIndex = foundIndex >= 0 ? foundIndex : 0
  const active = items[activeIndex]
  // Position of the active figure within its own domain, matching the sidebar.
  const activeInDomain =
    items.filter((i) => i.domain === active?.domain).findIndex((i) => i.id === active?.id) + 1

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-faint mb-4">❦</p>
        <p className="font-display text-xl text-ink">No figures for {cert.label} yet</p>
        <p className="text-sm text-soft mt-2 max-w-md mx-auto">
          Interactive figures are being built out domain by domain, starting with Security+. Check back as more certs
          get coverage.
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-[230px_1fr] gap-6">
      {/* Mobile: the figure is the point of the page, so the picker collapses
          above it instead of burying the diagram under a 39-item list. */}
      <button
        onClick={() => setPickerOpen((o) => !o)}
        aria-expanded={pickerOpen}
        className="md:hidden order-1 flex items-center justify-between w-full rounded-crisp border border-line bg-surface px-3 py-2.5 text-sm text-ink transition-colors hover:border-line-strong"
      >
        <span className="truncate">
          <span className="font-mono text-[10px] uppercase tracking-wider text-faint mr-2">Figure</span>
          {active?.title}
        </span>
        <span aria-hidden className={`text-faint transition-transform ${pickerOpen ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      <nav
        className={`${pickerOpen ? 'block' : 'hidden'} md:block order-2 md:order-none space-y-3 max-h-[60vh] md:max-h-[calc(100vh-10rem)] overflow-y-auto pr-1`}
      >
        <div className="sticky top-0 bg-paper pb-2 z-10">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${items.length} figures…`}
            aria-label="Search figures"
            className="w-full rounded-crisp bg-surface border border-line focus:border-accent px-3 py-1.5 text-sm text-ink placeholder:text-faint outline-none transition-colors"
          />
          {query && (
            <p className="px-1 pt-1.5 font-mono text-[10px] text-faint">
              {matchCount} match{matchCount === 1 ? '' : 'es'}
            </p>
          )}
        </div>
        {matchCount === 0 && (
          <p className="px-3 py-4 text-sm text-soft">
            No figure matches “{query}”.
          </p>
        )}
        {groups.map((group) => (
          <div key={group.domain}>
            <p className="px-3 mb-1 font-mono text-[10px] uppercase tracking-wider text-faint">
              §{group.domain} · {domainLabels[group.domain] ?? `Domain ${group.domain}`}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ item }, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveId(item.id)
                    setPickerOpen(false)
                  }}
                  className={`w-full text-left rounded-crisp border-l-2 px-3 py-2 text-sm transition-colors ${
                    item.id === active?.id
                      ? 'border-accent bg-accent-tint text-ink'
                      : 'border-transparent text-soft hover:bg-wash hover:text-ink'
                  }`}
                >
                  <div className="font-medium">
                    {/* Numbered within its domain: a global index made the
                        sequence read as 1, 2, 14, 15, 3, 4 … */}
                    <span className="font-mono text-xs text-faint mr-1.5">{i + 1}.</span>
                    {item.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="order-1 md:order-none">
        {active && (
          <figure className="bg-surface border border-line rounded-soft shadow-card p-6 m-0">
            <figcaption className="font-mono text-[11px] uppercase tracking-wider text-faint pb-4 mb-5 border-b border-line">
              §{active.domain} · Fig. {activeInDomain} — {active.title}
            </figcaption>
            {/* Each figure is lazy-loaded and independently contained, so a
                slow or broken diagram never takes down the page around it. */}
            <ErrorBoundary key={active.id} label="figure">
              <Suspense fallback={<FigureSkeleton />}>
                <active.Component />
              </Suspense>
            </ErrorBoundary>
          </figure>
        )}
      </div>
    </div>
  )
}
