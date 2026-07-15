import { useState } from 'react'

export default function DeceptionTechnologyToggle() {
  const [after, setAfter] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Deception &amp; Disruption Technology</h3>
        <p className="text-sm text-soft">
          Domain 1.2 — toggle to see how honeypots and decoys change an attacker's path after the perimeter is breached.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!after ? 'text-ink' : 'text-faint'}`}>No deception</span>
        <button
          onClick={() => setAfter((a) => !a)}
          className={`relative h-6 w-11 rounded-full transition-colors ${after ? 'bg-good' : 'bg-line-strong'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${after ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${after ? 'text-ink' : 'text-faint'}`}>Deception deployed</span>
      </div>

      <div key={after ? 'after' : 'before'} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${after ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'}`}>
        <p className={`font-display text-lg font-semibold ${after ? 'text-good' : 'text-bad'}`}>
          {after ? 'Honeypots, honeynets, honeyfiles & honeytokens' : 'Real production assets only'}
        </p>
        {after ? (
          <p className="text-sm text-ink mt-1 leading-relaxed">
            Decoy hosts (honeypots), whole decoy segments (honeynets), planted bait documents (honeyfiles), and
            fake credentials or API keys (honeytokens) sit alongside production assets. No legitimate user or
            process has any reason to touch them — so any interaction is a near-certain, high-fidelity indicator of
            compromise, and it wastes the attacker's time while revealing their tools and techniques.
          </p>
        ) : (
          <p className="text-sm text-ink mt-1 leading-relaxed">
            Once an attacker gets past the perimeter, every system they encounter is a real, production asset.
            Defenders only find out something is wrong once the attacker touches something that matters — detection
            is reactive and depends entirely on catching activity against real data or real infrastructure.
          </p>
        )}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Deception and disruption controls do not try to stop the initial breach — they assume it can happen and aim
        to detect the attacker quickly with very low false positives, and to slow them down (disruption) while a
        response is mounted.
      </div>
    </div>
  )
}
