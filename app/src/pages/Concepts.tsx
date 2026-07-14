import { useState } from 'react'
import { useCert } from '../cert/CertContext'
import { conceptsForCert } from '../concepts/registry'

export default function Concepts() {
  const { cert } = useCert()
  const items = conceptsForCert(cert.id)
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)
  // Fall back to the first figure when the cert switches and the stored id
  // belongs to the previous cert's list.
  const foundIndex = items.findIndex((i) => i.id === activeId)
  const activeIndex = foundIndex >= 0 ? foundIndex : 0
  const active = items[activeIndex]

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
      <nav className="space-y-0.5">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`w-full text-left rounded-crisp border-l-2 px-3 py-2 text-sm transition-colors ${
              item.id === active?.id
                ? 'border-accent bg-accent-tint text-ink'
                : 'border-transparent text-soft hover:bg-wash hover:text-ink'
            }`}
          >
            <div className="font-medium">
              <span className="font-mono text-xs text-faint mr-1.5">{i + 1}.</span>
              {item.title}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-faint mt-0.5">
              <span className="font-mono normal-case">§{item.domain}</span> · Domain {item.domain}
            </div>
          </button>
        ))}
      </nav>
      <div>
        {active && (
          <figure className="bg-surface border border-line rounded-soft shadow-card p-6 m-0">
            <figcaption className="font-mono text-[11px] uppercase tracking-wider text-faint pb-4 mb-5 border-b border-line">
              Fig. {activeIndex + 1} — {active.title}
            </figcaption>
            <active.Component />
          </figure>
        )}
      </div>
    </div>
  )
}
