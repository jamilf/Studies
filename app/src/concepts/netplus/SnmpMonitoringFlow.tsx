import { useEffect, useState } from 'react'

interface Step {
  title: string
  who: 'Manager' | 'Agent'
  detail: string
}

const STEPS: Step[] = [
  {
    title: 'Manager sends GET',
    who: 'Manager',
    detail: 'The NMS (Network Management Station) sends an SNMP GET request to UDP port 161 on the agent, asking for a specific OID (Object Identifier) value from the device\'s MIB.',
  },
  {
    title: 'Agent returns MIB value',
    who: 'Agent',
    detail: 'The agent looks up the OID in its Management Information Base (MIB) and returns the value — e.g., ifOperStatus or sysUptime — in a GET-RESPONSE.',
  },
  {
    title: 'Manager sends SET (optional)',
    who: 'Manager',
    detail: 'The manager can also push a configuration change with an SNMP SET request to a writable OID, rather than only reading values.',
  },
  {
    title: 'Interface fails / threshold crossed',
    who: 'Agent',
    detail: 'An event occurs on the managed device on its own, without being polled by the manager — for example, a link going down.',
  },
  {
    title: 'Agent sends unsolicited TRAP',
    who: 'Agent',
    detail: 'The agent proactively sends a TRAP (e.g., linkDown) to UDP port 162 on the manager — no polling required for the manager to find out.',
  },
  {
    title: 'Manager logs & alerts',
    who: 'Manager',
    detail: 'The NMS logs the trap and triggers an alert or notification to the operations team.',
  },
]

const WHO_COLOR: Record<Step['who'], string> = {
  Manager: 'bg-accent text-paper',
  Agent: 'bg-warn text-paper',
}

export default function SnmpMonitoringFlow() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1900)
    return () => clearTimeout(t)
  }, [playing, active])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">SNMP Monitoring Flow</h3>
          <p className="text-sm text-soft">Domain 3.1 — step through polling, setting, and unsolicited traps.</p>
        </div>
        <button
          onClick={() => {
            if (active >= STEPS.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : active >= STEPS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-line" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-accent transition-all duration-700 ease-out"
          style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              className="flex flex-col items-center gap-2 group"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 ${
                  i <= active ? WHO_COLOR[s.who] : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-crisp px-2 py-0.5 text-[11px] font-semibold ${WHO_COLOR[STEPS[active].who]}`}>
            {STEPS[active].who}
          </span>
          <h4 className="font-semibold text-ink">{STEPS[active].title}</h4>
        </div>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-warn-tint border-l-2 border-warn px-4 py-3 text-sm">
        <p className="font-semibold text-warn mb-1">Exam tip</p>
        <p className="text-ink">
          The agent listens on UDP 161 for GET/SET; the manager listens on UDP 162 for TRAP/INFORM. SNMPv1 and v2c
          use plaintext "public"/"private" community strings with no encryption — SNMPv3 is the version tested as
          secure, adding both authentication (HMAC-MD5/SHA) and encryption (DES/AES).
        </p>
      </div>
    </div>
  )
}
