import { useMemo, useState } from 'react'

type Brand = 'Intel' | 'AMD'
type Socket = 'LGA1700' | 'LGA1200' | 'AM4' | 'AM5'

interface SocketInfo {
  id: Socket
  brand: Brand
  generations: string
}

const SOCKETS: SocketInfo[] = [
  { id: 'LGA1700', brand: 'Intel', generations: '12th-14th Gen Core ("Alder Lake" through "Raptor Lake Refresh")' },
  { id: 'LGA1200', brand: 'Intel', generations: '10th-11th Gen Core ("Comet Lake" / "Rocket Lake")' },
  { id: 'AM4', brand: 'AMD', generations: 'Ryzen 1000 through 5000 series' },
  { id: 'AM5', brand: 'AMD', generations: 'Ryzen 7000 series and newer' },
]

function evaluate(brand: Brand, socket: Socket): { compatible: boolean; reasoning: string } {
  const info = SOCKETS.find((s) => s.id === socket)!
  const compatible = info.brand === brand
  if (compatible) {
    return {
      compatible: true,
      reasoning: `${socket} is an ${brand} socket, used by ${info.generations}. A motherboard built for ${socket} will physically accept a matching ${brand} CPU — though it's still worth checking the board's BIOS/chipset support list for the exact model.`,
    }
  }
  return {
    compatible: false,
    reasoning: `${socket} is an ${info.brand} socket (${info.generations}), not ${brand}. The pin/land layout and retention mechanism are physically different between manufacturers — this CPU will not fit in this socket at all, let alone boot.`,
  }
}

export default function CpuSocketCompatibility() {
  const [brand, setBrand] = useState<Brand>('Intel')
  const [socket, setSocket] = useState<Socket>('LGA1700')

  const result = useMemo(() => evaluate(brand, socket), [brand, socket])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">CPU Socket Compatibility</h3>
        <p className="text-sm text-soft">
          Domain 3.4 — pick a CPU brand and a motherboard socket to see whether they physically match.
        </p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">CPU brand</p>
        <div className="flex gap-2">
          {(['Intel', 'AMD'] as Brand[]).map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                brand === b ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Motherboard socket</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SOCKETS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSocket(s.id)}
              className={`rounded-crisp border px-3 py-2 text-sm font-medium font-mono transition-colors ${
                socket === s.id ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {s.id}
            </button>
          ))}
        </div>
      </div>

      <div
        key={`${brand}-${socket}`}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${
          result.compatible ? 'border-good bg-good-tint' : 'border-bad bg-bad-tint'
        }`}
      >
        <p className={`font-display text-xl font-semibold mb-1 ${result.compatible ? 'text-good' : 'text-bad'}`}>
          {result.compatible ? 'Compatible' : 'Incompatible'}
        </p>
        <p className="text-sm text-ink leading-relaxed">{result.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Beyond brand, a passing socket match still isn't a guarantee — the motherboard's chipset and BIOS version
        have to explicitly support that CPU generation, which is why a BIOS update is sometimes required before a
        newer chip will even boot on an older board of the same socket.
      </div>
    </div>
  )
}
