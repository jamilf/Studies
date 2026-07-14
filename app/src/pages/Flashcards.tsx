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

  if (!cards) return <p className="text-slate-400">Loading…</p>

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {(['all', 'core', 'acronym'] as DeckFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDeck(d)}
              className={`px-3 py-1 rounded-md text-xs capitalize ${deck === d ? 'bg-emerald-600/30 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}
            >
              {d === 'all' ? 'All decks' : d}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          {counts.due} due · {counts.fresh} new · {done} done
        </p>
      </div>

      {!current ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center">
          <p className="text-lg text-emerald-400 font-semibold">Queue clear 🎉</p>
          <p className="text-sm text-slate-400 mt-2">
            All due cards reviewed. Take a quiz next, or come back tomorrow — the schedule does the remembering.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6 min-h-64">
          <div className="flex justify-between text-xs text-slate-500">
            <span>
              D{current.domain} · {cert.domains[current.domain]} · {current.objective}
            </span>
            <span>{isNew ? 'NEW' : `rep ${states.get(current.id)?.reps ?? 0}`} · {current.deck}</span>
          </div>
          <p className="text-lg text-slate-100 leading-relaxed whitespace-pre-wrap">{current.front}</p>
          {flipped ? (
            <>
              <hr className="border-slate-800" />
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{current.back}</p>
              <div className="grid grid-cols-4 gap-2 pt-2">
                <GradeBtn label="Again" sub="&lt;10m" color="bg-red-700 hover:bg-red-600" onClick={() => void grade(0)} />
                <GradeBtn label="Hard" sub="" color="bg-yellow-700 hover:bg-yellow-600" onClick={() => void grade(3)} />
                <GradeBtn label="Good" sub="" color="bg-emerald-700 hover:bg-emerald-600" onClick={() => void grade(4)} />
                <GradeBtn label="Easy" sub="" color="bg-sky-700 hover:bg-sky-600" onClick={() => void grade(5)} />
              </div>
            </>
          ) : (
            <button
              onClick={() => setFlipped(true)}
              className="w-full rounded-lg bg-slate-800 hover:bg-slate-700 py-3 text-sm font-semibold"
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
    <button onClick={onClick} className={`rounded-lg py-2.5 text-sm font-semibold ${color}`}>
      {label}
      {sub && <span className="block text-[10px] font-normal opacity-70">{sub}</span>}
    </button>
  )
}
