import { describe, expect, it } from 'vitest'
import { buildExamForm, isCorrect, scaledScore } from './exam'
import { CERTS, certConfig, domainCounts } from './certs'
import type { Question } from './types'

const secplus = certConfig('secplus')

function q(id: string, domain: number, extra: Partial<Question> = {}): Question {
  return {
    id,
    cert: 'secplus',
    domain,
    objective: `${domain}.1`,
    qtype: 'mcq',
    difficulty: 2,
    stem: `stem ${id}`,
    choices: ['a', 'b', 'c', 'd'],
    answer: 0,
    explanation: 'because',
    ...extra,
  } as Question
}

/** A pool large enough to satisfy every domain's blueprint quota. */
function fullPool(cfg = secplus): Question[] {
  const out: Question[] = []
  for (const d of Object.keys(cfg.domains).map(Number)) {
    for (let i = 0; i < cfg.exam.questions; i++) out.push(q(`d${d}-${i}`, d))
  }
  return out
}

describe('domainCounts', () => {
  it('allocates exactly the exam length across domains for every cert', () => {
    for (const cfg of Object.values(CERTS)) {
      const counts = domainCounts(cfg)
      const total = Object.values(counts).reduce((s, n) => s + n, 0)
      expect(total, `${cfg.id} must total ${cfg.exam.questions}`).toBe(cfg.exam.questions)
    }
  })

  it('gives the heaviest-weighted domain the most questions', () => {
    const counts = domainCounts(secplus)
    const heaviest = Number(
      Object.entries(secplus.weights).sort(([, a], [, b]) => b - a)[0][0],
    )
    const max = Math.max(...Object.values(counts))
    expect(counts[heaviest]).toBe(max)
  })
})

describe('buildExamForm', () => {
  it('produces a full-length form and respects the blueprint per domain', () => {
    const form = buildExamForm(fullPool(), secplus)
    expect(form).toHaveLength(secplus.exam.questions)

    const counts = domainCounts(secplus)
    for (const [domain, expected] of Object.entries(counts)) {
      const got = form.filter((item) => item.domain === Number(domain)).length
      expect(got, `domain ${domain}`).toBe(expected)
    }
  })

  it('never repeats a question within a form', () => {
    const form = buildExamForm(fullPool(), secplus)
    expect(new Set(form.map((f) => f.id)).size).toBe(form.length)
  })

  it('tops up from other domains when one domain is short, rather than shrinking', () => {
    // Domain 1 supplies only two questions; the rest are plentiful.
    const pool = fullPool().filter((item) => item.domain !== 1).concat([q('d1-0', 1), q('d1-1', 1)])
    const form = buildExamForm(pool, secplus)
    expect(form).toHaveLength(secplus.exam.questions)
    expect(new Set(form.map((f) => f.id)).size).toBe(form.length)
  })

  it('degrades to the pool size when the whole bank is smaller than the exam', () => {
    const pool = [q('a', 1), q('b', 2), q('c', 3)]
    const form = buildExamForm(pool, secplus)
    expect(form).toHaveLength(3)
  })

  it('returns an empty form for an empty pool instead of throwing', () => {
    expect(buildExamForm([], secplus)).toEqual([])
  })
})

describe('scaledScore', () => {
  it('maps a perfect and a zero score to the scale bounds', () => {
    expect(scaledScore(90, 90, secplus)).toBe(secplus.exam.scaleMax)
    expect(scaledScore(0, 90, secplus)).toBe(secplus.exam.scaleMin)
  })

  it('increases monotonically with raw score', () => {
    let prev = -Infinity
    for (let raw = 0; raw <= 90; raw += 10) {
      const s = scaledScore(raw, 90, secplus)
      expect(s).toBeGreaterThanOrEqual(prev)
      prev = s
    }
  })

  it('guards against divide-by-zero on an empty form', () => {
    expect(scaledScore(0, 0, secplus)).toBe(secplus.exam.scaleMin)
  })

  it('stays inside the scale for every cert at every raw score', () => {
    for (const cfg of Object.values(CERTS)) {
      for (const raw of [0, 1, Math.floor(cfg.exam.questions / 2), cfg.exam.questions]) {
        const s = scaledScore(raw, cfg.exam.questions, cfg)
        expect(s).toBeGreaterThanOrEqual(cfg.exam.scaleMin)
        expect(s).toBeLessThanOrEqual(cfg.exam.scaleMax)
      }
    }
  })
})

describe('isCorrect', () => {
  it('treats an unanswered question as wrong', () => {
    expect(isCorrect(q('x', 1), null)).toBe(false)
    expect(isCorrect(q('x', 1), undefined)).toBe(false)
  })

  it('grades mcq by index', () => {
    const item = q('x', 1, { answer: 2 })
    expect(isCorrect(item, 2)).toBe(true)
    expect(isCorrect(item, 1)).toBe(false)
  })

  it('grades multi ignoring selection order but requiring the exact set', () => {
    const item = q('x', 1, { qtype: 'multi', answer: [0, 2] })
    expect(isCorrect(item, [2, 0])).toBe(true)
    expect(isCorrect(item, [0, 2])).toBe(true)
    expect(isCorrect(item, [0])).toBe(false)
    expect(isCorrect(item, [0, 1, 2])).toBe(false)
  })

  it('grades ordering positionally', () => {
    const item = q('x', 1, { qtype: 'ordering', answer: [0, 1, 2] })
    expect(isCorrect(item, [0, 1, 2])).toBe(true)
    expect(isCorrect(item, [0, 2, 1])).toBe(false)
  })

  it('grades matching pair by pair', () => {
    const item = q('x', 1, { qtype: 'matching', answer: [1, 0, 2] })
    expect(isCorrect(item, [1, 0, 2])).toBe(true)
    expect(isCorrect(item, [1, 2, 0])).toBe(false)
  })

  it('rejects a malformed response instead of throwing', () => {
    const item = q('x', 1, { qtype: 'multi', answer: [0, 1] })
    expect(isCorrect(item, 'nonsense')).toBe(false)
    expect(isCorrect(item, [null, null])).toBe(false)
  })
})
