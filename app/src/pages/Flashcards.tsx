import { useEffect, useMemo, useState } from 'react'
import { useUserId } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import { fetchCardStates, fetchFlashcards, gradeCard } from '../lib/data'
import type { Grade } from '../lib/sm2'
import type { CardState, Flashcard } from '../lib/types'
import { shuffle } from '../lib/shuffle'

const NEW_PER_SESSION = 20

type DeckFilter = 'all' | 'core' | 'acronym'

export default function Flashcards() {
  const userId = useUserId()
  const { cert } = useCert()
  const [cards, setCards] = useState<Flashcard[] | null>(null)
  const [states, setStates] = useState<Map<string, CardState>>(new Map())
  const [deck, setDeck] = useState<DeckFilter>('all')
  const [queue, setQueue] = useState<Flashcard[]>([])
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(0)

  useEffect(() => {
    setCards(null)
    void (async () => {
      const [allCards, cardStates] = await Promise.all([fetchFlashcards(cert.id), fetchCardStates(userId)])
      setCards(allCards.filter((c) => c.deck !== 'feynman'))
      setStates(cardStates)
    })()
  }, [userId, cert])

  useEffect(() => {
    if (!cards) return
    const now = new Date()
    const pool = deck === 'all' ? cards : cards.filter((c) => c.deck === deck)
    const due: Flashcard[] = []
    const fresh: Flashcard[] = []
    for (const c of pool) {
      const s = states.get(c.id)
      if (!s) fresh.push(c)
      else if (new Date(s.due_at) <= now) due.push(c)
    }
    // Due reviews first (oldest due first), then a capped batch of new cards.
    due.sort((a, b) => new Date(states.get(a.id)!.due_at).getTime() - new Date(states.get(b.id)!.due_at).getTime())
    setQueue([...due, ...shuffle(fresh).slice(0, NEW_PER_SESSION)])
    setDone(0)
    setFlipped(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, deck])

  const current = queue[0]
  const isNew = current ? !states.get(current.id) : false

  const counts = useMemo(() => {
    if (!cards) return { due: 0, fresh: 0 }
    const now = new Date()
    const pool = deck === 'all' ? cards : cards.filter((c) => c.deck === deck)
    let due = 0
    let fresh = 0
    for (const c of pool) {
      const s = states.get(c.id)
      if (!s) fresh += 1
      else if (new Date(s.due_at) <= now) due += 1
    }
    return { due, fresh }
  }, [cards, states, deck])

  async function grade(g: Grade) {
    if (!current) return
    const prior = states.get(current.id)
    const row = await gradeCard(userId, current.id, prior, g)
    const next = new Map(states)
    next.set(current.id, row as CardState)
    setStates(next)
    setFlipped(false)
    setDone((d) => d + 1)
    setQueue((qs) => {
      const rest = qs.slice(1)
      // Lapsed cards come back later in this session.
      return g === 0 ? [...rest, current] : rest
    })
  }

  if (!cards) return <p className="text-soft">Loading…</p>

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="inline-flex border border-line rounded-crisp overflow-hidden divide-x divide-line bg-surface">
          {(['all', 'core', 'acronym'] as DeckFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDeck(d)}
              className={`px-3 py-1.5 text-xs capitalize transition-colors ${
                deck === d ? 'bg-accent-tint text-accent font-medium' : 'text-soft hover:text-ink'
              }`}
            >
              {d === 'all' ? 'All decks' : d}
            </button>
          ))}
        </div>
        <p className="font-mono text-xs text-faint">
          {counts.due} due · {counts.fresh} new · {done} done
        </p>
      </div>

      {!current ? (
        <div className="text-center py-16">
          <p className="text-2xl text-faint mb-4">❦</p>
          <p className="font-display text-xl text-ink">Queue clear</p>
          <p className="text-sm text-soft mt-2">
            All due cards reviewed. Take a quiz next, or come back tomorrow — the schedule does the remembering.
          </p>
        </div>
      ) : (
        <div className="bg-surface border border-line rounded-soft shadow-card p-8 sm:p-10 space-y-6 min-h-64">
          <div className="flex justify-between text-[11px] uppercase tracking-wider text-faint">
            <span>
              <span className="font-mono normal-case">§{current.domain}.{current.objective.split('.')[1] ?? ''}</span>{' '}
              {cert.domains[current.domain]}
            </span>
            <span className="font-mono normal-case">
              {isNew ? 'new' : `rep ${states.get(current.id)?.reps ?? 0}`} · {current.deck}
            </span>
          </div>
          <p className="font-display text-xl sm:text-2xl text-ink leading-snug whitespace-pre-wrap">{current.front}</p>
          {flipped ? (
            <>
              <hr className="border-line" />
              <p className="text-ink leading-relaxed whitespace-pre-wrap">{current.back}</p>
              <div className="grid grid-cols-4 gap-2 pt-2">
                <GradeBtn
                  label="Again"
                  sub="&lt;10m"
                  color="bg-bad-tint text-bad border-bad-line hover:border-bad"
                  onClick={() => void grade(0)}
                />
                <GradeBtn
                  label="Hard"
                  sub=""
                  color="bg-warn-tint text-warn border-warn-line hover:border-warn"
                  onClick={() => void grade(3)}
                />
                <GradeBtn
                  label="Good"
                  sub=""
                  color="bg-good-tint text-good border-good-line hover:border-good"
                  onClick={() => void grade(4)}
                />
                <GradeBtn
                  label="Easy"
                  sub=""
                  color="bg-accent-tint text-accent border-accent-line hover:border-accent"
                  onClick={() => void grade(5)}
                />
              </div>
            </>
          ) : (
            <button
              onClick={() => setFlipped(true)}
              className="w-full rounded-crisp border border-line bg-surface hover:border-line-strong hover:bg-wash py-3 text-sm font-semibold text-ink transition-colors"
            >
              Show answer
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function GradeBtn({ label, sub, color, onClick }: { label: string; sub: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-crisp border py-2.5 text-sm font-semibold transition-colors ${color}`}>
      {label}
      {sub && <span className="block text-[10px] font-normal opacity-70">{sub}</span>}
    </button>
  )
}
