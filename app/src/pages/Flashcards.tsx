import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { PageSkeleton } from '../components/Skeleton'
import Stage from '../components/Stage'
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

  if (!cards) return <PageSkeleton label="Loading cards" />

  // Session progress: cards graded out of everything this session will hand
  // you. A lapsed card is re-queued, so the denominator grows with it.
  const sessionTotal = done + queue.length
  const sessionPct = sessionTotal === 0 ? 0 : (done / sessionTotal) * 100

  return (
    <Stage>
    <div className="space-y-4 sm:space-y-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="inline-flex border border-line rounded-crisp overflow-hidden divide-x divide-line bg-surface">
          {(['all', 'core', 'acronym'] as DeckFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDeck(d)}
              className={`px-2.5 sm:px-3 py-1.5 text-xs capitalize transition-colors ${
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

      {/* Progress through this session, matching the quiz bar. */}
      <div
        className="h-1 rounded-full bg-wash overflow-hidden"
        role="progressbar"
        aria-label="Session progress"
        aria-valuemin={0}
        aria-valuemax={sessionTotal}
        aria-valuenow={done}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${sessionPct}%` }}
        />
      </div>

      {!current ? (
        <div className="text-center py-16 animate-pop">
          <p className="text-2xl text-faint mb-4 animate-pulse-dot">❦</p>
          <p className="font-display text-xl text-ink">Queue clear</p>
          <p className="text-sm text-soft mt-2">
            All due cards reviewed. Take a quiz next, or come back tomorrow — the schedule does the remembering.
          </p>
        </div>
      ) : (
        <div
          key={current.id}
          className={`bg-surface border border-line rounded-soft shadow-card p-5 sm:p-10 space-y-5 sm:space-y-6 min-h-64 animate-pop ${
            flipped ? 'animate-reveal pb-24 sm:pb-10' : ''
          }`}
        >
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
            <div className="space-y-6 animate-rise">
              <hr className="border-line" />
              <p className="text-ink leading-relaxed whitespace-pre-wrap">{current.back}</p>
              {/* Desktop: in the card, right under the answer. */}
              <GradeRow className="hidden sm:grid pt-2" onGrade={(g) => void grade(g)} />
            </div>
          ) : (
            <button
              onClick={() => setFlipped(true)}
              className="w-full rounded-crisp border border-line bg-surface hover:border-line-strong hover:bg-wash py-3 text-sm font-semibold text-ink transition-all duration-200 active:scale-[0.99]"
            >
              Show answer
            </button>
          )}
        </div>
      )}

      {/* Mobile: grading is the most repeated action in the app, so it sits in
          the thumb zone just above the bottom bar rather than mid-screen.
          Portalled to the body because the animated route wrapper carries a
          transform, which would otherwise become its containing block. */}
      {current &&
        flipped &&
        createPortal(
          <GradeRow
            className="grid sm:hidden fixed inset-x-0 bottom-[calc(2.9rem+env(safe-area-inset-bottom))] z-20 border-t border-line bg-paper/95 px-3 py-2 backdrop-blur"
            onGrade={(g) => void grade(g)}
          />,
          document.body,
        )}
    </div>
    </Stage>
  )
}

/** The four SM-2 grades. Rendered twice — desktop in-card, mobile thumb bar. */
function GradeRow({ className, onGrade }: { className: string; onGrade: (g: Grade) => void }) {
  return (
    <div className={`grid-cols-4 gap-2 ${className}`}>
      <GradeBtn
        label="Again"
        sub="&lt;10m"
        color="bg-bad-tint text-bad border-bad-line hover:border-bad"
        onClick={() => onGrade(0)}
      />
      <GradeBtn label="Hard" sub="" color="bg-warn-tint text-warn border-warn-line hover:border-warn" onClick={() => onGrade(3)} />
      <GradeBtn label="Good" sub="" color="bg-good-tint text-good border-good-line hover:border-good" onClick={() => onGrade(4)} />
      <GradeBtn
        label="Easy"
        sub=""
        color="bg-accent-tint text-accent border-accent-line hover:border-accent"
        onClick={() => onGrade(5)}
      />
    </div>
  )
}

function GradeBtn({ label, sub, color, onClick }: { label: string; sub: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-crisp border py-2.5 text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${color}`}
    >
      {label}
      {sub && <span className="block text-[10px] font-normal opacity-70">{sub}</span>}
    </button>
  )
}
