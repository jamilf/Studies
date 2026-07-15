import { useMemo, useState } from 'react'

type Media = 'hdd' | 'ssd' | 'optical' | 'paper'
type Disposition = 'reuseInternal' | 'reuseExternal' | 'endOfLife'
type Category = 'clear' | 'purge' | 'destroy'

interface Verdict {
  category: Category
  method: string
  rationale: string
}

const MEDIA_LABEL: Record<Media, string> = { hdd: 'Magnetic HDD', ssd: 'SSD / Flash', optical: 'Optical (CD/DVD)', paper: 'Paper record' }
const DISPOSITION_LABEL: Record<Disposition, string> = { reuseInternal: 'Reuse — stays in org', reuseExternal: 'Reuse — leaves org', endOfLife: 'End of life / decommission' }
const CATEGORY_STYLE: Record<Category, string> = {
  clear: 'border-good bg-good-tint text-good',
  purge: 'border-warn bg-warn-tint text-warn',
  destroy: 'border-bad bg-bad-tint text-bad',
}
const CATEGORY_LABEL: Record<Category, string> = { clear: 'Clear', purge: 'Purge', destroy: 'Destroy' }

function decide(media: Media, disposition: Disposition): Verdict {
  if (media === 'paper') {
    return { category: 'destroy', method: 'Cross-cut shred, pulp, or incinerate.', rationale: 'Paper cannot be logically overwritten — the only NIST 800-88 category that applies to a physical document is Destroy, regardless of what happens to it next.' }
  }
  if (media === 'optical') {
    return { category: 'destroy', method: 'Shred or pulverize the disc.', rationale: 'Write-once optical media has no reliable overwrite path, so Clear and Purge are not achievable — Destroy is the only category that guarantees the data cannot be read back.' }
  }
  if (media === 'ssd') {
    if (disposition === 'endOfLife') {
      return { category: 'destroy', method: 'Shred to NIST-specified particle size.', rationale: 'When the device has no further use, physical destruction removes any doubt raised by flash wear-leveling and over-provisioning.' }
    }
    return { category: 'purge', method: 'Vendor cryptographic erase or ATA/NVMe Secure Erase.', rationale: 'Flash translation layers and wear leveling mean a logical overwrite (Clear) cannot be trusted to reach every physical cell — SSDs need a Purge-level, vendor-verified sanitize command even for internal reuse.' }
  }
  // hdd
  if (disposition === 'reuseInternal') {
    return { category: 'clear', method: 'Single-pass overwrite (e.g., all-zero pattern).', rationale: 'The drive stays inside the same custody boundary, so a logical overwrite that defeats simple recovery tools is sufficient.' }
  }
  if (disposition === 'reuseExternal') {
    return { category: 'purge', method: 'Cryptographic erase or degaussing.', rationale: 'Once the media leaves organizational control, it must resist state-of-the-art laboratory recovery techniques, not just simple undelete tools — that is the definition of Purge.' }
  }
  return { category: 'destroy', method: 'Disintegrate, shred, or incinerate.', rationale: 'A drive being decommissioned has no further use, so physical destruction removes the media from service entirely — the strongest and simplest assurance.' }
}

export default function DataSanitizationDecision() {
  const [media, setMedia] = useState<Media>('hdd')
  const [disposition, setDisposition] = useState<Disposition>('reuseInternal')
  const verdict = useMemo(() => decide(media, disposition), [media, disposition])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Clear, Purge, or Destroy?</h3>
        <p className="text-sm text-soft">Domain 2.4 — pick a media type and disposition to see the NIST 800-88 sanitization category it demands.</p>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-faint">Media type</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(MEDIA_LABEL) as Media[]).map((k) => (
            <button
              key={k}
              onClick={() => setMedia(k)}
              className={`rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${media === k ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'}`}
            >
              {MEDIA_LABEL[k]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-faint">Disposition</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(Object.keys(DISPOSITION_LABEL) as Disposition[]).map((k) => (
            <button
              key={k}
              onClick={() => setDisposition(k)}
              className={`rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${disposition === k ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'}`}
            >
              {DISPOSITION_LABEL[k]}
            </button>
          ))}
        </div>
      </div>

      <div key={`${media}-${disposition}`} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein space-y-1.5 ${CATEGORY_STYLE[verdict.category]}`}>
        <p className="font-display text-lg font-semibold">{CATEGORY_LABEL[verdict.category]}</p>
        <p className="text-sm text-ink"><span className="font-semibold">Method:</span> {verdict.method}</p>
        <p className="text-sm text-ink">{verdict.rationale}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        NIST SP 800-88 defines the three categories by assurance level, not by technique: Clear defeats simple
        recovery tools, Purge defeats laboratory-grade recovery, and Destroy makes the media physically unusable —
        the right choice depends on where the media is going next, not just what it is.
      </div>
    </div>
  )
}
