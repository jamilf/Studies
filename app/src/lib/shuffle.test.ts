import { describe, expect, it } from 'vitest'
import { shuffle, shuffledIndexes, weightedSample } from './shuffle'

describe('shuffle', () => {
  it('preserves every element exactly once', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8]
    const out = shuffle(input)
    expect(out).toHaveLength(input.length)
    expect([...out].sort((a, b) => a - b)).toEqual(input)
  })

  it('does not mutate the input', () => {
    const input = [1, 2, 3, 4]
    const snapshot = [...input]
    shuffle(input)
    expect(input).toEqual(snapshot)
  })

  it('actually reorders across repeated runs', () => {
    const input = Array.from({ length: 20 }, (_, i) => i)
    const reordered = Array.from({ length: 25 }, () => shuffle(input)).some(
      (out) => out.some((v, i) => v !== input[i]),
    )
    expect(reordered).toBe(true)
  })

  it('handles empty and single-element arrays', () => {
    expect(shuffle([])).toEqual([])
    expect(shuffle(['only'])).toEqual(['only'])
  })
})

describe('shuffledIndexes', () => {
  it('returns a valid permutation of 0..n-1 — the contract grading relies on', () => {
    for (const n of [2, 4, 5, 10]) {
      const perm = shuffledIndexes(n)
      expect(perm).toHaveLength(n)
      expect([...perm].sort((a, b) => a - b)).toEqual(Array.from({ length: n }, (_, i) => i))
    }
  })
})

describe('weightedSample', () => {
  const items = Array.from({ length: 30 }, (_, i) => i)

  it('samples without replacement', () => {
    const picked = weightedSample(items, () => 1, 10)
    expect(picked).toHaveLength(10)
    expect(new Set(picked).size).toBe(10)
  })

  it('never returns more than the pool holds', () => {
    expect(weightedSample([1, 2, 3], () => 1, 10)).toHaveLength(3)
  })

  it('returns nothing for a zero count or an empty pool', () => {
    expect(weightedSample(items, () => 1, 0)).toEqual([])
    expect(weightedSample([], () => 1, 5)).toEqual([])
  })

  it('favours heavier items — the mechanism behind Weak-areas quizzes', () => {
    // Item 0 is 100x more likely than the rest; it should dominate single draws.
    let hits = 0
    for (let i = 0; i < 200; i++) {
      if (weightedSample(items, (n) => (n === 0 ? 100 : 1), 1)[0] === 0) hits += 1
    }
    expect(hits).toBeGreaterThan(100)
  })

  it('tolerates zero and negative weights without breaking', () => {
    const picked = weightedSample(items, () => 0, 5)
    expect(picked).toHaveLength(5)
    expect(new Set(picked).size).toBe(5)
  })
})
