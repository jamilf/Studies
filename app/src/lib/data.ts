import { supabase } from './supabase'
import type { AnswerEvent, CardState, Flashcard, Question, QuizKind } from './types'
import type { CertConfig } from './certs'
import type { Grade } from './sm2'
import { NEW_CARD_STATE, reviewCard } from './sm2'

export async function fetchFlashcards(cert: string, deck?: string): Promise<Flashcard[]> {
  let query = supabase.from('flashcards').select('*').eq('cert', cert)
  if (deck) query = query.eq('deck', deck)
  const { data, error } = await query
  if (error) throw error
  return data as Flashcard[]
}

export async function fetchQuestions(cert: string): Promise<Question[]> {
  const { data, error } = await supabase.from('questions').select('*').eq('cert', cert)
  if (error) throw error
  return data as Question[]
}

export async function fetchCardStates(userId: string): Promise<Map<string, CardState>> {
  const { data, error } = await supabase.from('card_states').select('*').eq('user_id', userId)
  if (error) throw error
  return new Map((data as CardState[]).map((s) => [s.card_id, s]))
}

/** Apply an SM-2 review and persist. Returns the new state. */
export async function gradeCard(userId: string, cardId: string, prior: CardState | undefined, grade: Grade) {
  const base = prior ?? { ...NEW_CARD_STATE }
  const next = reviewCard(base, grade)
  const row = {
    user_id: userId,
    card_id: cardId,
    ease: next.ease,
    interval_days: next.interval_days,
    reps: next.reps,
    lapses: next.lapses,
    due_at: next.due_at,
    last_grade: grade,
    updated_at: new Date().toISOString(),
  }
  const { error } = await supabase.from('card_states').upsert(row, { onConflict: 'user_id,card_id' })
  if (error) throw error
  await bumpStudyDay(userId, { reviews: 1 })
  return row
}

export async function recordAnswer(userId: string, questionId: string, quizKind: QuizKind, correct: boolean, chosen: unknown) {
  const event: AnswerEvent = { user_id: userId, question_id: questionId, quiz_kind: quizKind, correct, chosen }
  const { error } = await supabase.from('answer_events').insert(event)
  if (error) throw error
  await bumpStudyDay(userId, { questions: 1 })
}

export async function fetchRecentAnswers(userId: string, limit = 600): Promise<AnswerEvent[]> {
  const { data, error } = await supabase
    .from('answer_events')
    .select('*')
    .eq('user_id', userId)
    .order('answered_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data as AnswerEvent[]
}

async function bumpStudyDay(userId: string, delta: { reviews?: number; questions?: number }) {
  const day = new Date().toISOString().slice(0, 10)
  const { data } = await supabase.from('study_days').select('*').eq('user_id', userId).eq('day', day)
  const existing = data?.[0]
  if (existing) {
    await supabase
      .from('study_days')
      .update({
        reviews: existing.reviews + (delta.reviews ?? 0),
        questions_answered: existing.questions_answered + (delta.questions ?? 0),
      })
      .eq('user_id', userId)
      .eq('day', day)
  } else {
    await supabase.from('study_days').insert({
      user_id: userId,
      day,
      reviews: delta.reviews ?? 0,
      questions_answered: delta.questions ?? 0,
    })
  }
}

export async function fetchStudyDays(userId: string) {
  const { data, error } = await supabase
    .from('study_days')
    .select('*')
    .eq('user_id', userId)
    .order('day', { ascending: false })
    .limit(60)
  if (error) throw error
  return data as { day: string; reviews: number; questions_answered: number }[]
}

export function computeStreak(days: { day: string }[]): number {
  const have = new Set(days.map((d) => String(d.day).slice(0, 10)))
  let streak = 0
  const cursor = new Date()
  // Today counts if studied; otherwise the streak may still be alive from yesterday.
  if (!have.has(cursor.toISOString().slice(0, 10))) cursor.setDate(cursor.getDate() - 1)
  while (have.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export interface ObjectiveStats {
  objective: string
  domain: number
  attempts: number
  correct: number
  accuracy: number
}

/** Rolling per-objective accuracy from recent answer events. */
export function objectiveStats(events: AnswerEvent[], questions: Map<string, Question>): Map<string, ObjectiveStats> {
  const stats = new Map<string, ObjectiveStats>()
  for (const e of events) {
    const q = questions.get(e.question_id)
    if (!q) continue
    let s = stats.get(q.objective)
    if (!s) {
      s = { objective: q.objective, domain: q.domain, attempts: 0, correct: 0, accuracy: 0 }
      stats.set(q.objective, s)
    }
    s.attempts += 1
    if (e.correct) s.correct += 1
  }
  for (const s of stats.values()) s.accuracy = s.attempts ? s.correct / s.attempts : 0
  return stats
}

export function domainAccuracy(events: AnswerEvent[], questions: Map<string, Question>): Record<number, { attempts: number; correct: number }> {
  const acc: Record<number, { attempts: number; correct: number }> = {}
  for (const e of events) {
    const q = questions.get(e.question_id)
    if (!q) continue
    acc[q.domain] ??= { attempts: 0, correct: 0 }
    acc[q.domain].attempts += 1
    if (e.correct) acc[q.domain].correct += 1
  }
  return acc
}

/**
 * Readiness: blueprint-weighted quiz accuracy (70%) blended with SRS maturity (30%).
 * Domains without data contribute a 0.35 prior so an empty history reads low, not zero.
 */
export function readinessScore(
  cfg: CertConfig,
  events: AnswerEvent[],
  questions: Map<string, Question>,
  cardStates: Map<string, CardState>,
  totalCards: number,
): number {
  const byDomain = domainAccuracy(events, questions)
  let quiz = 0
  for (const [domain, weight] of Object.entries(cfg.weights)) {
    const d = byDomain[Number(domain)]
    const acc = d && d.attempts >= 5 ? d.correct / d.attempts : 0.35
    quiz += weight * acc
  }
  let mature = 0
  for (const s of cardStates.values()) if (s.interval_days >= 7) mature += 1
  const srs = totalCards > 0 ? mature / totalCards : 0
  return Math.round((quiz * 0.7 + srs * 0.3) * 100)
}

/**
 * Adaptive picker weights: unseen objectives get a strong pull, weak objectives
 * are oversampled, mastered ones still appear (interleaving floor).
 */
export function questionWeight(q: Question, stats: Map<string, ObjectiveStats>): number {
  const s = stats.get(q.objective)
  if (!s || s.attempts === 0) return 1.0
  return 0.2 + (1 - s.accuracy)
}
