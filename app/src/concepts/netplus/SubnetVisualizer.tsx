import { useMemo, useState } from 'react'

function maskToDotted(prefix: number): string {
  const bits = '1'.repeat(prefix) + '0'.repeat(32 - prefix)
  const octets = [0, 1, 2, 3].map((i) => parseInt(bits.slice(i * 8, i * 8 + 8), 2))
  return octets.join('.')
}

function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc, part) => acc * 256 + Number(part), 0)
}

function intToIp(n: number): string {
  return [24, 16, 8, 0].map((shift) => (n >>> shift) & 255).join('.')
}

export default function SubnetVisualizer() {
  const [prefix, setPrefix] = useState(24)
  const [baseIp, setBaseIp] = useState('192.168.1.0')

  const info = useMemo(() => {
    const hostBits = 32 - prefix
    const totalAddresses = Math.pow(2, hostBits)
    const usableHosts = hostBits <= 1 ? 0 : totalAddresses - 2
    let networkInt = 0
    let valid = true
    try {
      const ipInt = ipToInt(baseIp)
      const maskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
      networkInt = (ipInt & maskInt) >>> 0
    } catch {
      valid = false
    }
    const broadcastInt = hostBits === 0 ? networkInt : (networkInt | (Math.pow(2, hostBits) - 1)) >>> 0
    return {
      mask: maskToDotted(prefix),
      totalAddresses,
      usableHosts,
      network: valid ? intToIp(networkInt) : '-',
      broadcast: valid ? intToIp(broadcastInt) : '-',
      firstHost: valid && usableHosts > 0 ? intToIp(networkInt + 1) : '-',
      lastHost: valid && usableHosts > 0 ? intToIp(broadcastInt - 1) : '-',
    }
  }, [prefix, baseIp])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">CIDR / Subnetting Visualizer</h3>
        <p className="text-sm text-soft">
          Domain 1.2 — enter a network address and slide the prefix length to see the subnet mask, usable range, and
          host count update live.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-soft mb-1 block">Network address</label>
          <input
            type="text"
            value={baseIp}
            onChange={(e) => setBaseIp(e.target.value)}
            placeholder="192.168.1.0"
            className="w-full rounded-crisp border border-line bg-surface focus:border-accent px-3 py-2 text-sm text-ink font-mono placeholder:text-faint outline-none transition-colors"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-soft">Prefix length</span>
            <span className="font-mono text-ink font-medium">/{prefix}</span>
          </div>
          <input
            type="range"
            min={8}
            max={30}
            step={1}
            value={prefix}
            onChange={(e) => setPrefix(Number(e.target.value))}
            className="w-full mt-2.5"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint">Subnet mask</p>
          <p className="text-lg font-mono text-ink">{info.mask}</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint">Total / usable hosts</p>
          <p className="text-lg font-mono text-ink">
            {info.totalAddresses} / {info.usableHosts}
          </p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint">Network address</p>
          <p className="text-lg font-mono text-ink">{info.network}</p>
        </div>
        <div className="rounded-crisp border border-line bg-wash p-3">
          <p className="text-[11px] uppercase tracking-wider text-faint">Broadcast address</p>
          <p className="text-lg font-mono text-ink">{info.broadcast}</p>
        </div>
        <div className="rounded-crisp border border-accent-line bg-accent-tint p-3 sm:col-span-2">
          <p className="text-[11px] uppercase tracking-wider text-faint">Usable host range</p>
          <p className="text-lg font-mono text-accent">
            {info.firstHost} – {info.lastHost}
          </p>
        </div>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Every extra bit borrowed for the prefix halves the number of addresses in the subnet. A /24 gives 256
        addresses (254 usable); a /25 splits that into two subnets of 128 addresses (126 usable) each. The network
        address (all host bits 0) and broadcast address (all host bits 1) are never assignable to a host.
      </div>
    </div>
  )
}
