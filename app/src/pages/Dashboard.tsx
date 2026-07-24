import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserId } from '../auth/AuthContext'
import { useCert } from '../cert/CertContext'
import { useCountUp } from '../lib/useCountUp'
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
  // Drives the 0→target grow of the domain/forecast bars once data lands.
  const [barsIn, setBarsIn] = useState(false)

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

  // Reset then trigger the bar-grow whenever a fresh stats payload arrives.
  useEffect(() => {
    if (!stats) {
      setBarsIn(false)
      return
    }
    const id = requestAnimationFrame(() => setBarsIn(true))
    return () => cancelAnimationFrame(id)
  }, [stats])

  if (error) return <p className="text-bad">{error}</p>
  if (!stats) return <p className="text-soft">Loading…</p>

  return (
    <div className="space-y-10">
      <p className="text-xs uppercase tracking-wider text-faint">
        Studying · <span className="text-ink font-medium normal-case text-sm tracking-normal">{cert.label}</span>{' '}
        <span className="font-mono">{cert.examCode}</span>
      </p>

      {!stats.hasContent && (
        <div className="bg-warn-tint border-l-2 border-warn rounded-crisp px-4 py-3 text-sm text-ink">
          No study content is loaded for {cert.label} yet. Use the master prompt in docs/MASTER_PROMPT.md to generate
          and seed a bank for it.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-line [&>*]:border-line [&>*:nth-child(even)]:border-l md:[&>*:nth-child(n+2)]:border-l max-md:[&>*:nth-child(n+3)]:border-t">
        <Tile label="Cards due now" value={stats.dueNow} to="/flashcards" accent={stats.dueNow > 0} delay={0} />
        <Tile label="New cards waiting" value={stats.newCards} to="/flashcards" delay={1} />
        <Tile label="Exam readiness" value={stats.readiness} suffix="%" delay={2} />
        <Tile label="Study streak" value={stats.streak} suffix="d" delay={3} />
      </div>

      <section className="animate-rise stagger-1">
        <h2 className="font-display text-lg text-ink pb-2 border-b border-line mb-4">What to do next</h2>
        <ol className="text-sm text-soft list-decimal ml-5 space-y-1.5">
          <li>
            Clear your{' '}
            <Link className="text-accent underline underline-offset-2 hover:text-accent-deep" to="/flashcards">
              due cards
            </Link>{' '}
            — spaced repetition only works daily.
          </li>
          <li>
            Take one 15-question{' '}
            <Link className="text-accent underline underline-offset-2 hover:text-accent-deep" to="/quiz">
              mixed quiz
            </Link>{' '}
            (or <em>weak areas</em> if a domain lags).
          </li>
          <li>
            From week 2: one full{' '}
            <Link className="text-accent underline underline-offset-2 hover:text-accent-deep" to="/exam">
              mock exam
            </Link>{' '}
            weekly. Sustained 85%+ readiness plus a passed mock → book the real exam.
          </li>
        </ol>
      </section>

      <section className="animate-rise stagger-2">
        <h2 className="font-display text-lg text-ink pb-2 border-b border-line mb-4">
          Domain mastery <span className="text-sm text-faint font-sans">(blueprint-weighted)</span>
        </h2>
        <div className="space-y-3">
          {stats.domains.map((d, i) => (
            <div key={d.domain}>
              <div className="flex justify-between items-baseline text-xs mb-1">
                <span className="text-soft">
                  <span className="font-mono text-faint">§{d.domain}</span> {d.label}{' '}
                  <span className="text-faint">({Math.round(d.weight * 100)}%)</span>
                </span>
                <span className="font-mono text-soft">
                  {d.accuracy === null ? '—' : `${Math.round(d.accuracy * 100)}% of ${d.attempts}`}
                </span>
              </div>
              <div className="relative h-1.5 rounded-full bg-wash overflow-hidden">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                    d.accuracy === null
                      ? 'bg-line'
                      : d.accuracy >= 0.85
                        ? 'bg-good'
                        : d.accuracy >= 0.7
                          ? 'bg-warn'
                          : 'bg-bad'
                  }`}
                  style={{
                    width: barsIn ? `${(d.accuracy ?? 0.05) * 100}%` : '0%',
                    transitionDelay: `${i * 70}ms`,
                  }}
                />
                <div className="absolute top-0 h-full w-px bg-line-strong" style={{ left: '85%' }} title="85% target" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="animate-rise stagger-3">
        <h2 className="font-display text-lg text-ink pb-2 border-b border-line mb-4">
          Review forecast <span className="text-sm text-faint font-sans">(next 7 days)</span>
        </h2>
        <div className="flex gap-1.5 items-end h-24 border-b border-line">
          {stats.dueSoon.map((d, i) => {
            const max = Math.max(...stats.dueSoon.map((x) => x.count), 1)
            return (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center justify-end gap-1 h-full"
                title={`${d.count} card${d.count === 1 ? '' : 's'} due ${d.day}`}
              >
                {d.count > 0 && (
                  <span
                    className="font-mono text-[10px] text-faint transition-opacity duration-300"
                    style={{ opacity: barsIn ? 1 : 0, transitionDelay: `${300 + i * 55}ms` }}
                  >
                    {d.count}
                  </span>
                )}
                <div
                  className={`w-full max-w-10 mx-auto rounded-t-[var(--radius-crisp)] origin-bottom transition-transform duration-500 ease-out ${
                    d.count > 0 ? 'bg-accent/70' : 'bg-wash'
                  }`}
                  style={{
                    height: `${(d.count / max) * 64 + 2}px`,
                    transform: barsIn ? 'scaleY(1)' : 'scaleY(0)',
                    transitionDelay: `${i * 55}ms`,
                  }}
                />
              </div>
            )
          })}
        </div>
        <div className="flex gap-1.5 mt-1">
          {stats.dueSoon.map((d) => (
            <span key={d.day} className="flex-1 text-center font-mono text-[10px] text-faint">
              {d.day}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

function Tile({
  label,
  value,
  suffix = '',
  to,
  accent,
  delay = 0,
}: {
  label: string
  value: number
  suffix?: string
  to?: string
  accent?: boolean
  delay?: number
}) {
  const shown = useCountUp(value)
  const inner = (
    <div className={`px-4 py-5 h-full ${to ? 'hover:bg-wash transition-colors' : ''}`}>
      <p className={`font-display text-3xl tabular-nums ${accent ? 'text-accent' : 'text-ink'}`}>
        {shown}
        {suffix}
        {accent && (
          <span className="align-middle ml-2 inline-block w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
        )}
      </p>
      <p className="text-[11px] uppercase tracking-wider text-faint mt-1.5">{label}</p>
    </div>
  )
  const wrapped = (
    <div className={`h-full animate-scale-in stagger-${delay + 1}`}>{inner}</div>
  )
  return to ? (
    <Link to={to} className="h-full">
      {wrapped}
    </Link>
  ) : (
    wrapped
  )
}
