import { useEffect, useState } from 'react'
import { PageSkeleton } from '../components/Skeleton'
import Stage from '../components/Stage'
import { useUserId } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import { fetchCardStates, fetchFlashcards, gradeCard } from '../lib/data'
import type { Grade } from '../lib/sm2'
import type { CardState, Flashcard } from '../lib/types'
import { shuffle } from '../lib/shuffle'

/**
 * Feynman technique: write the explanation in your own words BEFORE seeing
 * the model answer, then honestly self-grade. Grades feed the same SM-2
 * scheduler as flashcards, so shaky concepts come back sooner.
 */
export default function Feynman() {
  const userId = useUserId()
  const { cert } = useCert()
  const [prompts, setPrompts] = useState<Flashcard[] | null>(null)
  const [states, setStates] = useState<Map<string, CardState>>(new Map())
  const [queue, setQueue] = useState<Flashcard[]>([])
  const [text, setText] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(0)

  useEffect(() => {
    setPrompts(null)
    void (async () => {
      const [cards, cardStates] = await Promise.all([fetchFlashcards(cert.id, 'feynman'), fetchCardStates(userId)])
      setPrompts(cards)
      setStates(cardStates)
      const now = new Date()
      const due = cards.filter((c) => {
        const s = cardStates.get(c.id)
        return !s || new Date(s.due_at) <= now
      })
      setQueue(shuffle(due))
    })()
  }, [userId, cert])

  const current = queue[0]

  async function grade(g: Grade) {
    if (!current) return
    const row = await gradeCard(userId, current.id, states.get(current.id), g)
    const next = new Map(states)
    next.set(current.id, row as CardState)
    setStates(next)
    setQueue((qs) => (g === 0 ? [...qs.slice(1), current] : qs.slice(1)))
    setText('')
    setRevealed(false)
    setDone((d) => d + 1)
  }

  if (!prompts) return <PageSkeleton label="Loading prompts" />

  if (!current) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <p className="text-2xl text-faint mb-4">❦</p>
        <p className="font-display text-xl text-ink">No explain-it prompts due</p>
        <p className="text-sm text-soft mt-2">
          You worked through {done > 0 ? `${done} prompt${done === 1 ? '' : 's'} today` : 'the queue'}. They return on
          their spaced schedule.
        </p>
      </div>
    )
  }

  return (
    <Stage>
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between text-[11px] uppercase tracking-wider text-faint">
        <span>
          Explain it in your own words · <span className="font-mono normal-case">§{current.domain}</span>{' '}
          {cert.domains[current.domain]}
        </span>
        <span className="font-mono normal-case">
          {queue.length} in queue · {done} done
        </span>
      </div>
      <div className="bg-surface border border-line rounded-soft shadow-card p-6 space-y-4">
        <p className="font-display text-lg text-ink leading-snug">{current.front}</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={revealed}
          rows={6}
          placeholder="Teach it to an imaginary junior colleague. If you can't explain it simply, you don't know it yet — that's the point."
          className="w-full rounded-crisp bg-surface border border-line focus:border-accent px-3 py-2 text-sm text-ink leading-relaxed placeholder:text-faint outline-none transition-colors"
        />
        {!revealed ? (
          <button
            disabled={text.trim().length < 20}
            onClick={() => setRevealed(true)}
            className="rounded-crisp bg-accent hover:bg-accent-deep disabled:opacity-40 text-paper px-5 py-2 text-sm font-semibold transition-colors"
          >
            Compare with model answer
          </button>
        ) : (
          <>
            <div className="rounded-crisp bg-wash border-l-2 border-accent px-4 py-3 text-sm text-ink leading-relaxed whitespace-pre-wrap">
              {current.back}
            </div>
            <p className="text-xs text-faint italic">Honestly: how close was your explanation?</p>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => void grade(0)}
                className="rounded-crisp border bg-bad-tint text-bad border-bad-line hover:border-bad py-2.5 text-sm font-semibold transition-colors"
              >
                Missed it
              </button>
              <button
                onClick={() => void grade(3)}
                className="rounded-crisp border bg-warn-tint text-warn border-warn-line hover:border-warn py-2.5 text-sm font-semibold transition-colors"
              >
                Partial
              </button>
              <button
                onClick={() => void grade(4)}
                className="rounded-crisp border bg-good-tint text-good border-good-line hover:border-good py-2.5 text-sm font-semibold transition-colors"
              >
                Solid
              </button>
              <button
                onClick={() => void grade(5)}
                className="rounded-crisp border bg-accent-tint text-accent border-accent-line hover:border-accent py-2.5 text-sm font-semibold transition-colors"
              >
                Nailed it
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </Stage>
  )
}
