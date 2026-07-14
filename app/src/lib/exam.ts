import type { Question } from './types'
import type { CertConfig } from './certs'
import { domainCounts } from './certs'
import { shuffle } from './shuffle'

/** Build a blueprint-weighted exam form for a cert. Degrades gracefully if the pool is short. */
export function buildExamForm(pool: Question[], cfg: CertConfig): Question[] {
  const byDomain = new Map<number, Question[]>()
  for (const q of pool) {
    if (!byDomain.has(q.domain)) byDomain.set(q.domain, [])
    byDomain.get(q.domain)!.push(q)
  }
  const counts = domainCounts(cfg)
  const form: Question[] = []
  const shortfall: number[] = []
  for (const [domain, count] of Object.entries(counts)) {
    const candidates = shuffle(byDomain.get(Number(domain)) ?? [])
    form.push(...candidates.slice(0, count))
    if (candidates.length < count) shortfall.push(count - candidates.length)
  }
  // Pool smaller than the form: top up from any domain so the exam still runs.
  if (form.length < cfg.exam.questions) {
    const used = new Set(form.map((q) => q.id))
    const rest = shuffle(pool.filter((q) => !used.has(q.id)))
    form.push(...rest.slice(0, cfg.exam.questions - form.length))
  }
  return shuffle(form)
}

/**
 * Linear approximation of the vendor's scaled score. Real equating is
 * undisclosed; treat this as a training signal only.
 */
export function scaledScore(rawCorrect: number, total: number, cfg: CertConfig): number {
  if (total === 0) return cfg.exam.scaleMin
  return Math.round(cfg.exam.scaleMin + (rawCorrect / total) * (cfg.exam.scaleMax - cfg.exam.scaleMin))
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
