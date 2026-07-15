import { useMemo, useState } from 'react'

type Channel = 'Email' | 'Phone call' | 'Text message (SMS)' | 'In person'
type Technique = 'Mass urgent request' | 'Fabricated identity / false pretext'

interface Verdict {
  term: string
  tint: 'accent' | 'warn' | 'bad'
  explanation: string
}

function evaluate(channel: Channel, technique: Technique): Verdict {
  if (technique === 'Fabricated identity / false pretext') {
    if (channel === 'In person') {
      return {
        term: 'Pretexting (with tailgating risk)',
        tint: 'bad',
        explanation:
          'The attacker invents a believable false identity or scenario (delivery driver, new contractor, auditor) to manipulate a target face to face. In person, this often escalates into tailgating — following an employee through a secured door on the strength of that fabricated story.',
      }
    }
    return {
      term: 'Pretexting',
      tint: 'warn',
      explanation: `Pretexting is defined by the fabricated scenario itself, not the channel — the attacker impersonates a specific, researched identity (a vendor, an executive, IT support) to build false trust over ${channel.toLowerCase()} before making the ask. This is what separates it from a generic mass phishing blast.`,
    }
  }

  switch (channel) {
    case 'Email':
      return {
        term: 'Phishing',
        tint: 'bad',
        explanation:
          'A mass, generic email creates urgency ("your account will be suspended") and pushes the victim to click a malicious link or open an attachment. Red flags: mismatched sender domain, generic greeting, urgency, and a link that doesn\'t match its display text.',
      }
    case 'Phone call':
      return {
        term: 'Vishing',
        tint: 'bad',
        explanation:
          'Voice phishing over a phone call, often spoofing a trusted caller ID (bank, IRS, help desk) and using urgency plus authority to extract credentials, account numbers, or remote-access permission.',
      }
    case 'Text message (SMS)':
      return {
        term: 'Smishing',
        tint: 'bad',
        explanation:
          'SMS phishing — a text claiming a package is stuck, a payment failed, or an account is locked, with a shortened link designed to look plausible on a small screen where full URLs are hard to inspect.',
      }
    case 'In person':
      return {
        term: 'Tailgating / Shoulder surfing',
        tint: 'warn',
        explanation:
          'A generic, opportunistic in-person approach — following someone through a badge-locked door without a fabricated cover story (tailgating), or simply observing a screen or keypad from nearby (shoulder surfing).',
      }
  }
}

const CHANNELS: Channel[] = ['Email', 'Phone call', 'Text message (SMS)', 'In person']
const TECHNIQUES: Technique[] = ['Mass urgent request', 'Fabricated identity / false pretext']

const TINT_CLASSES: Record<Verdict['tint'], string> = {
  accent: 'border-accent bg-accent-tint text-accent',
  warn: 'border-warn bg-warn-tint text-warn',
  bad: 'border-bad bg-bad-tint text-bad',
}

export default function SocialEngineeringPicker() {
  const [channel, setChannel] = useState<Channel>('Email')
  const [technique, setTechnique] = useState<Technique>('Mass urgent request')

  const verdict = useMemo(() => evaluate(channel, technique), [channel, technique])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg text-ink">Social-Engineering Red-Flag Picker</h3>
        <p className="text-sm text-soft">Domain 2.2 — pick the channel and the attacker's technique to see the verdict.</p>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Channel</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CHANNELS.map((c) => (
            <button
              key={c}
              onClick={() => setChannel(c)}
              className={`rounded-crisp border px-2 py-2 text-xs font-medium transition-colors ${
                channel === c ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-soft mb-1.5">Technique</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TECHNIQUES.map((t) => (
            <button
              key={t}
              onClick={() => setTechnique(t)}
              className={`rounded-crisp border px-2 py-2 text-xs font-medium transition-colors ${
                technique === t ? 'border-accent bg-accent-tint text-accent' : 'border-line bg-surface text-soft hover:border-line-strong'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div key={`${channel}-${technique}`} className={`rounded-crisp border-l-2 px-5 py-4 animate-fadein ${TINT_CLASSES[verdict.tint]}`}>
        <p className="font-display text-2xl font-semibold text-center">{verdict.term}</p>
        <p className="text-sm text-ink text-center mt-2 leading-relaxed">{verdict.explanation}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Exam tip: phishing/vishing/smishing are named after the delivery channel (email/voice/SMS). Pretexting is
        named after the technique — a fabricated scenario and false identity — and can ride on any of those
        channels, which is why questions often combine it with another term ("a phone call using a fabricated IT
        support persona" is both vishing AND pretexting).
      </div>
    </div>
  )
}
