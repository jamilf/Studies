import { useMemo, useState } from 'react'

function peeringConnections(n: number) {
  return (n * (n - 1)) / 2
}

export default function VpcConnectivityScaling() {
  const [vpcCount, setVpcCount] = useState(4)
  const peering = useMemo(() => peeringConnections(vpcCount), [vpcCount])
  const positions = useMemo(() => {
    const pts: { x: number; y: number }[] = []
    const cx = 150
    const cy = 150
    const r = 110
    for (let i = 0; i < vpcCount; i++) {
      const angle = (2 * Math.PI * i) / vpcCount - Math.PI / 2
      pts.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) })
    }
    return pts
  }, [vpcCount])

  const pairs = useMemo(() => {
    const p: [number, number][] = []
    for (let i = 0; i < vpcCount; i++) {
      for (let j = i + 1; j < vpcCount; j++) p.push([i, j])
    }
    return p
  }, [vpcCount])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">VPC Peering vs Transit Gateway Scaling</h3>
        <p className="text-sm text-slate-400">
          Domain 2.1 — drag the slider to see why full-mesh peering breaks down as VPC count grows.
        </p>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Number of VPCs</span>
          <span className="text-slate-200 font-medium">{vpcCount}</span>
        </div>
        <input
          type="range"
          min={2}
          max={12}
          step={1}
          value={vpcCount}
          onChange={(e) => setVpcCount(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-red-800/50 bg-red-950/20 p-4">
          <p className="text-sm font-semibold text-red-300 mb-2">VPC Peering (full mesh)</p>
          <svg viewBox="0 0 300 300" className="w-full h-56">
            {pairs.map(([i, j]) => (
              <line
                key={`${i}-${j}`}
                x1={positions[i].x}
                y1={positions[i].y}
                x2={positions[j].x}
                y2={positions[j].y}
                className="stroke-red-500/50"
                strokeWidth="1"
              />
            ))}
            {positions.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="8" className="fill-red-600 stroke-red-300" strokeWidth="1.5" />
            ))}
          </svg>
          <p className="text-2xl font-bold text-red-300 text-center">{peering} connections</p>
          <p className="text-[11px] text-red-300/70 text-center mt-1">n(n-1)/2 — grows quadratically</p>
        </div>

        <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-4">
          <p className="text-sm font-semibold text-emerald-300 mb-2">Transit Gateway (hub)</p>
          <svg viewBox="0 0 300 300" className="w-full h-56">
            {positions.map((p, i) => (
              <line key={i} x1={150} y1={150} x2={p.x} y2={p.y} className="stroke-emerald-500/60" strokeWidth="1.5" />
            ))}
            <circle cx={150} cy={150} r="12" className="fill-emerald-500 stroke-emerald-200" strokeWidth="2" />
            {positions.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="8" className="fill-emerald-700 stroke-emerald-300" strokeWidth="1.5" />
            ))}
          </svg>
          <p className="text-2xl font-bold text-emerald-300 text-center">{vpcCount} attachments</p>
          <p className="text-[11px] text-emerald-300/70 text-center mt-1">n — grows linearly, plus transitive routing</p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
        VPC Peering also has no transitive routing — VPC A peered with B, and B peered with C, does NOT let A reach C.
        Transit Gateway routes between every attached VPC automatically. At {vpcCount} VPCs, peering already needs{' '}
        {peering} separate connections to manage; Transit Gateway needs just {vpcCount}.
      </div>
    </div>
  )
}
