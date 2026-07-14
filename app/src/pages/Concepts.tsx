import { useState } from 'react'
import { useCert } from '../cert/CertContext'
import { conceptsForCert } from '../concepts/registry'

export default function Concepts() {
  const { cert } = useCert()
  const items = conceptsForCert(cert.id)
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)
  const active = items.find((i) => i.id === activeId)

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
        No interactive visuals for {cert.label} yet — these are being built out domain by domain, starting with
        Security+. Check back as more certs get coverage.
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-5">
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
              item.id === activeId
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-700/60'
                : 'text-slate-300 hover:bg-slate-800 border border-transparent'
            }`}
          >
            <div className="font-medium">{item.title}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Domain {item.domain}</div>
          </button>
        ))}
      </nav>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
        {active ? <active.Component /> : null}
      </div>
    </div>
  )
}
