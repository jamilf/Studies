import { useState } from 'react'

interface Card {
  front: string
  back: string
}

const CARDS: Card[] = [
  {
    front: 'Repeated clicking noise from the drive',
    back: '"Click of death" — the HDD\'s head-actuator mechanism is failing to park/seek correctly. Back up immediately and replace the drive; continued power cycling risks total data loss.',
  },
  {
    front: 'S.M.A.R.T. warning at boot',
    back: 'Predictive-failure attributes (reallocated sectors, pending sectors) crossed their threshold. The drive still works today — back up now and replace proactively before it fails outright.',
  },
  {
    front: 'RAID array status shows "degraded"',
    back: 'One member disk has dropped out of the array. The array still serves data via the remaining parity/mirror copies, but has zero fault tolerance left until the failed disk is replaced and the array rebuilds.',
  },
  {
    front: 'Drive not detected in BIOS/UEFI at all',
    back: 'Usually a power or data cable/connection problem, dead drive electronics, or (on SSDs) a firmware crash. Reseat cables and try a different SATA port/cable before condemning the drive itself.',
  },
  {
    front: 'Extremely slow reads/writes, high queue times',
    back: 'Failing sectors are being retried and reallocated in the background, or an SSD is nearing its write-endurance limit. Check S.M.A.R.T. reallocated/pending sector counts to confirm.',
  },
  {
    front: 'Controller shows array as "foreign" or "offline" after a drive swap',
    back: 'The RAID controller doesn\'t recognize the replacement disk\'s configuration metadata. Import or clear the foreign configuration in the RAID utility, then let the array rebuild.',
  },
]

export default function StorageRaidFailureMatcher() {
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
        <h3 className="font-display text-lg text-ink">Storage & RAID Failure Symptom Matcher</h3>
        <p className="text-sm text-soft">
          Domain 5.3 — click a symptom card to reveal its likely cause and the right first response.
        </p>
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
              <p className="font-display text-base font-semibold text-ink animate-fadein">{c.front}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        The exam draws a hard line between drive symptoms (clicking, S.M.A.R.T. errors, not detected) and array
        symptoms (degraded, foreign, offline) — a degraded array is still working and needs a rebuild, while a
        clicking drive needs an immediate backup because failure could be imminent.
      </div>
    </div>
  )
}
