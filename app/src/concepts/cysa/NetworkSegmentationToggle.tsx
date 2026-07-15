import { useState } from 'react'

export default function NetworkSegmentationToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Flat Network vs. Zero-Trust Segmentation</h3>
        <p className="text-sm text-soft">Domain 1.1 — toggle to compare a flat, perimeter-only network with a segmented, zero-trust design.</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>Before (Flat)</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>After (Segmented)</span>
      </div>
      <div
        key={after ? 'after' : 'before'}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}
      >
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'After: Zero-Trust Segmentation' : 'Before: Flat, Perimeter-Based Network'}
        </p>
        {after ? (
          <ul className="text-sm text-ink mt-2 space-y-1 list-disc list-inside">
            <li>VLANs and microsegmentation isolate user, server, OT, and data zones from one another.</li>
            <li>East-west traffic between zones is inspected and access is verified per-session, not just at the perimeter.</li>
            <li>A compromised workstation cannot freely reach the database tier — every hop requires re-authentication and authorization.</li>
          </ul>
        ) : (
          <ul className="text-sm text-ink mt-2 space-y-1 list-disc list-inside">
            <li>One firewall guards the perimeter; everything inside is implicitly trusted once it is on the network.</li>
            <li>Internal traffic between workstations, servers, and databases is largely uninspected.</li>
            <li>A single compromised endpoint can move laterally to crown-jewel systems with little resistance.</li>
          </ul>
        )}
      </div>
      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Segmentation does not stop an initial compromise — it limits the blast radius, turning one compromised host
        into a contained incident instead of a full breach of the environment.
      </div>
    </div>
  )
}
