import { useMemo, useState } from 'react'

type DataType = 'flow' | 'health' | 'events' | 'packets'
type Horizon = 'live' | 'historical'

interface Verdict {
  tool: string
  tone: 'good' | 'warn'
  reasoning: string
}

const DATA_LABELS: Record<DataType, string> = {
  flow: 'Bandwidth & traffic flow trends',
  health: 'Device health & interface thresholds',
  events: 'Security & system event history',
  packets: 'Exact packet contents',
}

const HORIZON_LABELS: Record<Horizon, string> = {
  live: 'Live / real-time',
  historical: 'Historical / stored',
}

function evaluate(dataType: DataType, horizon: Horizon): Verdict {
  if (dataType === 'packets') {
    return {
      tool: 'Packet Capture (Wireshark / tcpdump)',
      tone: 'warn',
      reasoning:
        horizon === 'live'
          ? 'Only a capture shows the actual bytes on the wire. Running it live is heavy and should be scoped narrowly — filter by host or port before you start.'
          : 'Save the capture to a .pcap file for later analysis. It is the most detailed record you can keep, but also the largest and most storage-hungry.',
    }
  }
  if (dataType === 'flow') {
    return {
      tool: 'Flow data (NetFlow / sFlow / IPFIX)',
      tone: 'good',
      reasoning:
        horizon === 'live'
          ? 'A flow collector summarizes who is talking to whom and how much, in near real time, without capturing full payloads.'
          : 'Flow records roll up into historical reports — ideal for spotting a bandwidth trend or a top talker over the last week.',
    }
  }
  if (dataType === 'health') {
    return {
      tool: 'SNMP polling',
      tone: 'good',
      reasoning:
        horizon === 'live'
          ? 'SNMP polls device OIDs for CPU, memory, and interface counters, and a trap can push an urgent threshold breach immediately.'
          : 'An NMS graphs polled values over time, turning raw OID readings into historical utilization and error trends.',
    }
  }
  return {
    tool: 'Centralized Syslog',
    tone: 'good',
    reasoning:
      horizon === 'live'
        ? 'Devices forward log messages to a syslog server as they happen, so a live tail shows events as they occur.'
        : 'The retained log archive is the historical record used for audits, correlation, and incident investigation.',
  }
}

export default function MonitoringToolMatrix() {
  const [dataType, setDataType] = useState<DataType>('flow')
  const [horizon, setHorizon] = useState<Horizon>('live')
  const verdict = useMemo(() => evaluate(dataType, horizon), [dataType, horizon])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Choosing a Monitoring Tool</h3>
        <p className="text-sm text-soft">Domain 3.1 — pick what you need to see and when you need to see it.</p>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-faint">What do you need to see?</p>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(DATA_LABELS) as DataType[]).map((key) => (
            <button
              key={key}
              onClick={() => setDataType(key)}
              className={`rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                dataType === key ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {DATA_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-faint">Time horizon</p>
        <div className="flex gap-2">
          {(Object.keys(HORIZON_LABELS) as Horizon[]).map((key) => (
            <button
              key={key}
              onClick={() => setHorizon(key)}
              className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                horizon === key ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {HORIZON_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <div
        key={`${dataType}-${horizon}`}
        className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${verdict.tone === 'good' ? 'border-good bg-good-tint' : 'border-warn bg-warn-tint'}`}
      >
        <p className={`font-display text-xl font-semibold ${verdict.tone === 'good' ? 'text-good' : 'text-warn'}`}>{verdict.tool}</p>
        <p className="text-sm text-ink mt-2 leading-relaxed">{verdict.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        In practice these tools are complementary, not exclusive — a mature monitoring stack runs SNMP and flow
        collection continuously, forwards logs to syslog, and reaches for a packet capture only when the others
        cannot answer the question.
      </div>
    </div>
  )
}
