import { useMemo, useState } from 'react'

type Level = 'No Access' | 'Read' | 'Read & Execute' | 'Modify' | 'Full Control'
type ShareLevel = 'No Access' | 'Read' | 'Change' | 'Full Control'

const NTFS_LEVELS: Level[] = ['No Access', 'Read', 'Read & Execute', 'Modify', 'Full Control']
const SHARE_LEVELS: ShareLevel[] = ['No Access', 'Read', 'Change', 'Full Control']

// Rank each level on a common 0-4 scale so the most-restrictive (minimum) can be computed.
const RANK: Record<string, number> = {
  'No Access': 0,
  Read: 1,
  'Read & Execute': 1,
  Change: 2,
  Modify: 2,
  'Full Control': 3,
}

function rankToLabel(rank: number): string {
  if (rank <= 0) return 'No Access'
  if (rank === 1) return 'Read'
  if (rank <= 2) return 'Modify / Change'
  return 'Full Control'
}

export default function PermissionCalculator() {
  const [ntfs, setNtfs] = useState<Level>('Modify')
  const [share, setShare] = useState<ShareLevel>('Read')
  const [viaNetwork, setViaNetwork] = useState(true)

  const ntfsRank = RANK[ntfs]
  const shareRank = RANK[share]
  const effectiveRank = useMemo(() => (viaNetwork ? Math.min(ntfsRank, shareRank) : ntfsRank), [viaNetwork, ntfsRank, shareRank])
  const effectiveLabel = rankToLabel(effectiveRank)
  const bottleneck = viaNetwork ? (ntfsRank <= shareRank ? 'NTFS' : 'Share') : 'NTFS (local access ignores the share)'

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">NTFS vs Share Permission Calculator</h3>
        <p className="text-sm text-soft">Domain 2.5 — combine an NTFS permission with a share permission to find the effective access.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-soft mb-1">NTFS permission (applies always, local or network)</p>
          <select
            value={ntfs}
            onChange={(e) => setNtfs(e.target.value as Level)}
            className="w-full rounded-crisp border border-line bg-surface px-3 py-2 text-sm text-ink"
          >
            {NTFS_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs text-soft mb-1">Share permission (only applies over the network)</p>
          <select
            value={share}
            onChange={(e) => setShare(e.target.value as ShareLevel)}
            className="w-full rounded-crisp border border-line bg-surface px-3 py-2 text-sm text-ink"
          >
            {SHARE_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Access method</p>
        <div className="flex gap-2">
          <button
            onClick={() => setViaNetwork(false)}
            className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
              !viaNetwork ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            Local logon (console)
          </button>
          <button
            onClick={() => setViaNetwork(true)}
            className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
              viaNetwork ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
            }`}
          >
            Network share (\\\\server\\share)
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">NTFS rank</p>
          <p className="font-mono text-lg font-semibold text-ink">{ntfsRank} / 3</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Share rank</p>
          <p className="font-mono text-lg font-semibold text-ink">{viaNetwork ? `${shareRank} / 3` : 'n/a (local)'}</p>
        </div>
        <div className="rounded-crisp border-l-2 border-accent bg-accent-tint px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-faint mb-1">Effective access</p>
          <p className="font-display text-lg font-semibold text-accent">{effectiveLabel}</p>
        </div>
      </div>

      <div key={`${ntfs}-${share}-${viaNetwork}`} className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 animate-fadein">
        <p className="text-sm text-ink font-mono">
          Effective = {viaNetwork ? 'MIN(NTFS rank, Share rank)' : 'NTFS rank (local logon bypasses the share)'}
        </p>
        <p className="text-sm text-soft leading-relaxed mt-2">
          Most restrictive wins: {bottleneck} is the limiting factor here. Within NTFS alone, permissions are
          cumulative across a user's group memberships (except that an explicit Deny always overrides an Allow); but
          once a share permission enters the picture over the network, the more restrictive of the two — NTFS or
          share — always wins.
        </p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: this is one of the most tested 1102 calculations. Memorize the rule as "share permissions and NTFS
        permissions combine by taking the most restrictive," and separately, "multiple NTFS permissions from
        different groups combine by taking the least restrictive — except Deny always wins."
      </div>
    </div>
  )
}
