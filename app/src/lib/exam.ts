import type { Question } from './types'
import { shuffle } from './shuffle'

/** Questions per domain for a 90-question form at blueprint weights. */
export const EXAM_DOMAIN_COUNTS: Record<number, number> = { 1: 11, 2: 20, 3: 16, 4: 25, 5: 18 }
export const EXAM_SIZE = 90
export const EXAM_MINUTES = 90
export const PASS_SCALED = 750

/** Build a blueprint-weighted exam form. Falls back gracefully if the pool is short. */
export function buildExamForm(pool: Question[]): Question[] {
  const byDomain = new Map<number, Question[]>()
  for (const q of pool) {
    if (!byDomain.has(q.domain)) byDomain.set(q.domain, [])
    byDomain.get(q.domain)!.push(q)
  }
  const form: Question[] = []
  for (const [domain, count] of Object.entries(EXAM_DOMAIN_COUNTS)) {
    const candidates = shuffle(byDomain.get(Number(domain)) ?? [])
    form.push(...candidates.slice(0, count))
  }
  return shuffle(form)
}

/**
 * Approximate CompTIA scaled score: 100-900, linear in raw percentage.
 * The real exam uses undisclosed equating; treat this as a training signal only.
 */
export function scaledScore(rawCorrect: number, total: number): number {
  if (total === 0) return 100
  return Math.round(100 + (rawCorrect / total) * 800)
}

export function isCorrect(q: Question, response: unknown): boolean {
  if (response === null || response === undefined) return false
  if (q.qtype === 'mcq') return response === q.answer
  const expected = q.answer as number[]
  const got = response as number[]
  if (!Array.isArray(got) || got.length !== expected.length) return false
  if (q.qtype === 'multi') {
    const want = new Set(expected)
    return got.length === want.size && got.every((g) => want.has(g))
  }
  // ordering / matching: exact positional match
  return got.every((g, i) => g === expected[i])
}
