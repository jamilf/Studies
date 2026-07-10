/** Fisher-Yates shuffle; returns a new array. */
export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Shuffled view of choices: display[i] = original index shown at position i.
 * Content is stored with the answer keyed to ORIGINAL indexes, so every
 * presentation shuffles display order (no position memorization) and grading
 * maps back through this permutation.
 */
export function shuffledIndexes(n: number): number[] {
  return shuffle(Array.from({ length: n }, (_, i) => i))
}

/** Weighted sample WITHOUT replacement. Weights must be > 0. */
export function weightedSample<T>(items: readonly T[], weightOf: (item: T) => number, count: number): T[] {
  const pool = items.map((item) => ({ item, w: Math.max(weightOf(item), 0.0001) }))
  const picked: T[] = []
  while (picked.length < count && pool.length > 0) {
    const total = pool.reduce((s, p) => s + p.w, 0)
    let r = Math.random() * total
    let idx = 0
    for (; idx < pool.length; idx++) {
      r -= pool[idx].w
      if (r <= 0) break
    }
    idx = Math.min(idx, pool.length - 1)
    picked.push(pool[idx].item)
    pool.splice(idx, 1)
  }
  return picked
}
