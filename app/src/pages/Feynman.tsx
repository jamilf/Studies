import { useEffect, useState } from 'react'
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

  if (!prompts) return <p className="text-slate-400">Loading…</p>

  if (!current) {
    return (
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-10 text-center">
        <p className="text-lg text-emerald-400 font-semibold">No explain-it prompts due</p>
        <p className="text-sm text-slate-400 mt-2">
          You worked through {done > 0 ? `${done} prompt${done === 1 ? '' : 's'} today` : 'the queue'}. They return on
          their spaced schedule.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between text-xs text-slate-400">
        <span>
          Explain it in your own words · D{current.domain} · {cert.domains[current.domain]}
        </span>
        <span>
          {queue.length} in queue · {done} done
        </span>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <p className="text-slate-100 leading-relaxed">{current.front}</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={revealed}
          rows={6}
          placeholder="Teach it to an imaginary junior colleague. If you can't explain it simply, you don't know it yet — that's the point."
          className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm leading-relaxed"
        />
        {!revealed ? (
          <button
            disabled={text.trim().length < 20}
            onClick={() => setRevealed(true)}
            className="rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 px-5 py-2 text-sm font-semibold"
          >
            Compare with model answer
          </button>
        ) : (
          <>
            <div className="rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {current.back}
            </div>
            <p className="text-xs text-slate-400">Honestly: how close was your explanation?</p>
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => void grade(0)} className="rounded-lg bg-red-700 hover:bg-red-600 py-2.5 text-sm font-semibold">
                Missed it
              </button>
              <button onClick={() => void grade(3)} className="rounded-lg bg-yellow-700 hover:bg-yellow-600 py-2.5 text-sm font-semibold">
                Partial
              </button>
              <button onClick={() => void grade(4)} className="rounded-lg bg-emerald-700 hover:bg-emerald-600 py-2.5 text-sm font-semibold">
                Solid
              </button>
              <button onClick={() => void grade(5)} className="rounded-lg bg-sky-700 hover:bg-sky-600 py-2.5 text-sm font-semibold">
                Nailed it
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
