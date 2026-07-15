import { useState } from 'react'

export default function RedundantLinkToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Redundant Links: STP Blocking vs LACP Aggregation</h3>
        <p className="text-sm text-soft">Domain 2.1 — toggle to see what happens to a second physical link between two switches.</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>STP</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>LACP</span>
      </div>

      <div
        key={after ? 'after' : 'before'}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-warn bg-warn-tint'}`}
      >
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-warn'}`}>
          {after ? 'LACP — Active-Active Aggregation' : 'STP — One Link Blocked'}
        </p>
        {after ? (
          <p className="text-sm text-ink mt-2 leading-relaxed">
            The same two physical links between the switches are bundled with LACP into a single logical
            EtherChannel. Both links forward traffic simultaneously, so throughput scales with the number of member
            links and either one can fail without an outage.
          </p>
        ) : (
          <p className="text-sm text-ink mt-2 leading-relaxed">
            Spanning Tree Protocol sees two physical paths between the same pair of switches and must block one of
            them to prevent a Layer 2 broadcast loop. That link sits idle, doing nothing, unless the primary link
            fails and STP re-converges onto it.
          </p>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        STP and LACP solve different problems: STP prevents loops between redundant paths by disabling one, while
        LACP turns redundant parallel links into one bigger, fully active logical link — which is why link
        aggregation is generally preferred wherever the topology allows it.
      </div>
    </div>
  )
}
