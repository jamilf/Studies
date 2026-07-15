import { useEffect, useState } from 'react'

interface Waypoint {
  x: number
  y: number
  label: string
  detail: string
}

const WAYPOINTS: Waypoint[] = [
  { x: 30, y: 100, label: 'Request a data key', detail: 'The application calls KMS GenerateDataKey, naming the CMK (KMS key) that should protect it.' },
  {
    x: 150,
    y: 40,
    label: 'KMS returns two copies',
    detail:
      'KMS returns a plaintext data key AND that same data key encrypted under the CMK. The CMK itself never leaves KMS.',
  },
  {
    x: 270,
    y: 100,
    label: 'Encrypt locally',
    detail: 'The application uses the fast, plaintext data key to encrypt the actual object or file locally with a symmetric cipher (e.g. AES-256).',
  },
  {
    x: 390,
    y: 40,
    label: 'Discard plaintext key',
    detail:
      'The plaintext data key is wiped from memory. Only the ciphertext and the encrypted copy of the data key are stored together.',
  },
  {
    x: 430,
    y: 130,
    label: 'Decrypt later',
    detail:
      'To read the data, the encrypted data key is sent back to KMS, which decrypts it (again, without exposing the CMK) and returns the plaintext key to decrypt the data locally.',
  },
]

export default function EnvelopeEncryptionConcept() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= WAYPOINTS.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1700)
    return () => clearTimeout(t)
  }, [playing, step])

  const w = WAYPOINTS[step]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Envelope Encryption with KMS</h3>
          <p className="text-sm text-soft">Domain 5.1 — watch the data key travel through generation, local use, and decryption.</p>
        </div>
        <button
          onClick={() => {
            if (step >= WAYPOINTS.length - 1) setStep(0)
            setPlaying((p) => !p)
          }}
          className="rounded-crisp bg-accent hover:bg-accent-deep px-3 py-1.5 text-sm font-medium text-paper transition-colors"
        >
          {playing ? 'Pause' : step >= WAYPOINTS.length - 1 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="relative rounded-crisp border border-line bg-wash p-6 min-h-[160px]">
        <svg viewBox="0 0 460 160" className="w-full h-40" aria-hidden>
          <polyline
            points={WAYPOINTS.map((p) => `${p.x},${p.y}`).join(' ')}
            className="fill-none stroke-line-strong"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {WAYPOINTS.map((p, i) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="6" className={i <= step ? 'fill-accent' : 'fill-line'} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-ink text-[8px] font-medium">
                {p.label}
              </text>
            </g>
          ))}
          <circle cx={w.x} cy={w.y} r="9" className="fill-none stroke-accent transition-all duration-700 ease-out" strokeWidth="2.5" />
        </svg>
      </div>

      <div key={step} className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 animate-fadein">
        <h4 className="font-semibold text-ink mb-1">{w.label}</h4>
        <p className="text-sm text-soft leading-relaxed">{w.detail}</p>
      </div>

      <div className="rounded-crisp bg-wash border-l-2 border-line-strong px-4 py-3 text-sm text-soft">
        Envelope encryption is why KMS scales to encrypting huge volumes of data without ever moving the CMK: the
        expensive, network-bound KMS call only produces or decrypts a small data key, while the actual bulk
        encryption happens locally and fast. It's exactly what S3 SSE-KMS, EBS encryption, and the AWS Encryption
        SDK all do under the hood.
      </div>
    </div>
  )
}
