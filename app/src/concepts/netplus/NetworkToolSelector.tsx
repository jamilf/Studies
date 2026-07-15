import { useMemo, useState } from 'react'

type Symptom = 'locate-run' | 'wiring-fault' | 'port-loopback' | 'fiber-break'
type Media = 'copper' | 'fiber'

interface Recommendation {
  tool: string
  reasoning: string
}

const SYMPTOM_LABELS: Record<Symptom, string> = {
  'locate-run': "Can't tell which cable run goes where inside a wall/ceiling",
  'wiring-fault': 'Suspect an open, short, or miswired pair',
  'port-loopback': 'Need to confirm a port/NIC actually sends and receives',
  'fiber-break': 'Need to find a break or measure length on a long fiber run',
}

const MEDIA_LABELS: Record<Media, string> = { copper: 'Copper (UTP)', fiber: 'Fiber' }

function recommend(symptom: Symptom, media: Media): Recommendation {
  if (symptom === 'locate-run') {
    return { tool: 'Toner probe (tone generator + probe)', reasoning: 'Inject an audible tone at one end and trace it with the probe to physically identify the same cable at a patch panel or wall plate.' }
  }
  if (symptom === 'wiring-fault') {
    if (media === 'fiber') {
      return { tool: 'OTDR (optical time-domain reflectometer)', reasoning: 'Sends a light pulse down the fiber and measures reflections to pinpoint breaks, bends, and splice loss by distance.' }
    }
    return { tool: 'Cable tester / certifier', reasoning: 'Checks pin-to-pin continuity and wire-map to catch opens, shorts, split pairs, and miswires against the expected T568 standard.' }
  }
  if (symptom === 'port-loopback') {
    return { tool: 'Loopback adapter', reasoning: 'Plugs into a port and connects TX to RX so a device or switch can test its own send/receive path without any far-end equipment.' }
  }
  if (media === 'fiber') {
    return { tool: 'OTDR (optical time-domain reflectometer)', reasoning: 'The standard tool for locating fiber breaks and measuring exact run length by timing reflected light.' }
  }
  return { tool: 'TDR (time-domain reflectometer)', reasoning: 'The copper equivalent of an OTDR — sends an electrical pulse and reads the reflection to estimate distance to a fault.' }
}

export default function NetworkToolSelector() {
  const [symptom, setSymptom] = useState<Symptom>('locate-run')
  const [media, setMedia] = useState<Media>('copper')

  const rec = useMemo(() => recommend(symptom, media), [symptom, media])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Which Hardware Tool Do I Need?</h3>
        <p className="text-sm text-soft">
          Domain 5.6 — pick the symptom and cable media to see which physical-layer tool actually fits the job.
        </p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1">Symptom</p>
        <div className="flex flex-col gap-1.5">
          {(Object.keys(SYMPTOM_LABELS) as Symptom[]).map((s) => (
            <button
              key={s}
              onClick={() => setSymptom(s)}
              className={`rounded-crisp border px-3 py-2 text-sm text-left transition-colors ${
                symptom === s ? 'border-accent bg-accent-tint text-ink' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {SYMPTOM_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1">Cable media</p>
        <div className="flex gap-2">
          {(Object.keys(MEDIA_LABELS) as Media[]).map((m) => (
            <button
              key={m}
              onClick={() => setMedia(m)}
              className={`flex-1 rounded-crisp border px-3 py-2 text-sm font-medium transition-colors ${
                media === m ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {MEDIA_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      <div key={`${symptom}-${media}`} className="rounded-crisp border-l-2 border-accent bg-accent-tint px-5 py-4 text-center animate-fadein">
        <p className="font-display text-xl font-semibold text-accent">{rec.tool}</p>
        <p className="text-sm text-ink mt-2">{rec.reasoning}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Matching the tool to the symptom saves time: a cable tester tells you wiring is correct but says nothing
        about distance to a break, while a TDR/OTDR tells you distance but not wire-map correctness — most real
        troubleshooting uses more than one of these tools in sequence.
      </div>
    </div>
  )
}
