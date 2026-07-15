import { useEffect, useState } from 'react'

interface Step {
  title: string
  detail: string
}

const STEPS: Step[] = [
  { title: 'Reconnaissance', detail: 'Harvesting emails, OSINT, and scanning to identify targets and gather information before making contact.' },
  { title: 'Weaponization', detail: 'Coupling an exploit with a payload — e.g. a malicious macro embedded in a document.' },
  { title: 'Delivery', detail: 'Transmitting the weaponized payload — a phishing email, a malicious USB drive, or a watering-hole site.' },
  { title: 'Exploitation', detail: 'The payload triggers, exploiting a vulnerability or tricking the user into executing it.' },
  { title: 'Installation', detail: 'A persistent backdoor or implant is installed on the compromised host.' },
  { title: 'Command & Control', detail: 'The host beacons out to an attacker-controlled server, giving the attacker hands-on-keyboard access.' },
  { title: 'Actions on Objectives', detail: 'The attacker accomplishes their goal — data exfiltration, ransomware deployment, or lateral movement.' },
]

export default function CyberKillChain() {
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
          <h3 className="font-display text-lg text-ink">Lockheed Martin Cyber Kill Chain</h3>
          <p className="text-sm text-soft">Domain 3.1 — step through the seven stages of an intrusion.</p>
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
                  i <= active ? 'bg-accent text-paper' : 'bg-wash text-faint'
                } ${i === active ? 'scale-125 ring-2 ring-offset-2 ring-offset-surface ring-accent' : ''}`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{STEPS[active].title}</h4>
        <p className="text-sm text-soft leading-relaxed">{STEPS[active].detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Breaking the chain at any link stops the attack, and links get progressively more expensive for the attacker
        to reconstitute the earlier you disrupt them — the same "cost to the attacker" logic as the Pyramid of Pain.
      </div>
    </div>
  )
}
