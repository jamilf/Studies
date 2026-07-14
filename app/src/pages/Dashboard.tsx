import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserId } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import {
  computeStreak,
  domainAccuracy,
  fetchCardStates,
  fetchFlashcards,
  fetchQuestions,
  fetchRecentAnswers,
  fetchStudyDays,
  readinessScore,
} from '../lib/data'
import type { CardState } from '../lib/types'

interface Stats {
  dueNow: number
  newCards: number
  readiness: number
  streak: number
  domains: { domain: number; label: string; weight: number; attempts: number; accuracy: number | null }[]
  dueSoon: { day: string; count: number }[]
  hasContent: boolean
}

export default function Dashboard() {
  const userId = useUserId()
  const { cert } = useCert()
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setStats(null)
    async function load() {
      try {
        const [cards, allStates, questions, answers, days] = await Promise.all([
          fetchFlashcards(cert.id),
          fetchCardStates(userId),
          fetchQuestions(cert.id),
          fetchRecentAnswers(userId),
          fetchStudyDays(userId),
        ])
        const now = new Date()
        const reviewable = cards.filter((c) => c.deck !== 'feynman')
        // SRS stats must only count this cert's cards.
        const certCardIds = new Set(reviewable.map((c) => c.id))
        const states = new Map<string, CardState>()
        for (const [id, s] of allStates) if (certCardIds.has(id)) states.set(id, s)
        let dueNow = 0
        let newCards = 0
        for (const c of reviewable) {
          const s = states.get(c.id)
          if (!s) newCards += 1
          else if (new Date(s.due_at) <= now) dueNow += 1
        }
        const qMap = new Map(questions.map((q) => [q.id, q]))
        const byDomain = domainAccuracy(answers, qMap)
        const domains = Object.entries(cert.domains).map(([d, label]) => {
          const n = Number(d)
          const acc = byDomain[n]
          return {
            domain: n,
            label,
            weight: cert.weights[n],
            attempts: acc?.attempts ?? 0,
            accuracy: acc && acc.attempts > 0 ? acc.correct / acc.attempts : null,
          }
        })
        const dueSoon: { day: string; count: number }[] = []
        for (let i = 1; i <= 7; i++) {
          const dayStart = new Date(now)
          dayStart.setDate(now.getDate() + i - 1)
          dayStart.setHours(23, 59, 59)
          const prev = new Date(dayStart)
          prev.setDate(prev.getDate() - 1)
          let count = 0
          for (const s of states.values()) {
            const due = new Date(s.due_at)
            if (due > prev && due <= dayStart) count += 1
          }
          dueSoon.push({ day: dayStart.toISOString().slice(5, 10), count })
        }
        if (!cancelled)
          setStats({
            dueNow,
            newCards,
            readiness: readinessScore(cert, answers, qMap, states, reviewable.length),
            streak: computeStreak(days),
            domains,
            dueSoon,
            hasContent: cards.length > 0,
          })
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [userId, cert])

  if (error) return <p className="text-red-400">{error}</p>
  if (!stats) return <p className="text-slate-400">Loading…</p>

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-400">
        Studying: <span className="text-slate-200 font-semibold">{cert.label}</span> ({cert.examCode}) — switch certs in
        the header.
      </p>

      {!stats.hasContent && (
        <div className="rounded-xl border border-amber-700/60 bg-amber-950/40 p-4 text-sm text-amber-200">
          No study content is loaded for {cert.label} yet. Use the master prompt in docs/MASTER_PROMPT.md to generate
          and seed a bank for it.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Tile label="Cards due now" value={String(stats.dueNow)} to="/flashcards" accent={stats.dueNow > 0} />
        <Tile label="New cards waiting" value={String(stats.newCards)} to="/flashcards" />
        <Tile label="Exam readiness" value={`${stats.readiness}%`} />
        <Tile label="Study streak" value={`${stats.streak}d`} />
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="font-semibold mb-1 text-slate-200">What to do next</h2>
        <ol className="text-sm text-slate-400 list-decimal ml-5 space-y-1">
          <li>
            Clear your <Link className="text-emerald-400 hover:underline" to="/flashcards">due cards</Link> — spaced repetition only works daily.
          </li>
          <li>
            Take one 15-question <Link className="text-emerald-400 hover:underline" to="/quiz">mixed quiz</Link> (or <em>weak areas</em> if a domain lags).
          </li>
          <li>
            From week 2: one full <Link className="text-emerald-400 hover:underline" to="/exam">mock exam</Link> weekly. Sustained 85%+ readiness plus a passed mock → book the real exam.
          </li>
        </ol>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="font-semibold mb-3 text-slate-200">Domain mastery (blueprint-weighted)</h2>
        <div className="space-y-2.5">
          {stats.domains.map((d) => (
            <div key={d.domain}>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>
                  {d.domain}. {d.label} <span className="text-slate-500">({Math.round(d.weight * 100)}%)</span>
                </span>
                <span>{d.accuracy === null ? 'no data' : `${Math.round(d.accuracy * 100)}% of ${d.attempts}`}</span>
              </div>
              <div className="h-2 rounded bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${d.accuracy === null ? 'bg-slate-700' : d.accuracy >= 0.85 ? 'bg-emerald-500' : d.accuracy >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${(d.accuracy ?? 0.05) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="font-semibold mb-3 text-slate-200">Review forecast (next 7 days)</h2>
        <div className="flex gap-2 items-end h-20">
          {stats.dueSoon.map((d) => {
            const max = Math.max(...stats.dueSoon.map((x) => x.count), 1)
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-400">{d.count}</span>
                <div className="w-full bg-emerald-700/60 rounded-t" style={{ height: `${(d.count / max) * 56 + 2}px` }} />
                <span className="text-[10px] text-slate-500">{d.day}</span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function Tile({ label, value, to, accent }: { label: string; value: string; to?: string; accent?: boolean }) {
  const inner = (
    <div
      className={`rounded-xl border p-4 h-full ${accent ? 'border-emerald-600 bg-emerald-950/40' : 'border-slate-800 bg-slate-900'}`}
    >
      <p className="text-2xl font-bold text-slate-100">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{label}</p>
    </div>
  )
  return to ? <Link to={to}>{inner}</Link> : inner
}
