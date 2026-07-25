import { describe, expect, it } from 'vitest'
import { NEW_CARD_STATE, reviewCard, type SrsState } from './sm2'

const NOW = new Date('2026-07-25T12:00:00.000Z')
const daysBetween = (iso: string, from: Date = NOW) =>
  (new Date(iso).getTime() - from.getTime()) / (24 * 60 * 60 * 1000)

describe('reviewCard', () => {
  it('schedules a brand-new card one day out on first Good', () => {
    const r = reviewCard(NEW_CARD_STATE, 4, NOW)
    expect(r.interval_days).toBe(1)
    expect(r.reps).toBe(1)
    expect(daysBetween(r.due_at)).toBeCloseTo(1)
  })

  it('follows the 1 → 6 day ladder across the first two reviews', () => {
    const first = reviewCard(NEW_CARD_STATE, 4, NOW)
    const second = reviewCard(first, 4, NOW)
    expect(second.interval_days).toBe(6)
    expect(second.reps).toBe(2)
  })

  it('grows the interval by ease once past the ladder', () => {
    const state: SrsState = { ease: 2.5, interval_days: 6, reps: 2, lapses: 0 }
    const r = reviewCard(state, 4, NOW)
    expect(r.interval_days).toBe(Math.round(6 * 2.5))
  })

  it('grows more slowly on Hard than on Good', () => {
    const state: SrsState = { ease: 2.5, interval_days: 10, reps: 3, lapses: 0 }
    expect(reviewCard(state, 3, NOW).interval_days).toBeLessThan(
      reviewCard(state, 4, NOW).interval_days,
    )
  })

  it('rewards Easy with a longer interval than Good', () => {
    const state: SrsState = { ease: 2.5, interval_days: 10, reps: 3, lapses: 0 }
    expect(reviewCard(state, 5, NOW).interval_days).toBeGreaterThan(
      reviewCard(state, 4, NOW).interval_days,
    )
  })

  it('resets the card and returns it within the session on a lapse', () => {
    const state: SrsState = { ease: 2.5, interval_days: 30, reps: 5, lapses: 0 }
    const r = reviewCard(state, 0, NOW)
    expect(r.interval_days).toBe(0)
    expect(r.reps).toBe(0)
    expect(r.lapses).toBe(1)
    // ~10 minutes, i.e. still today.
    expect(daysBetween(r.due_at)).toBeCloseTo(10 / (24 * 60), 4)
  })

  it('penalises ease on a lapse but never below the 1.3 floor', () => {
    let state: SrsState = { ease: 1.4, interval_days: 5, reps: 3, lapses: 0 }
    for (let i = 0; i < 5; i++) state = reviewCard(state, 0, NOW)
    expect(state.ease).toBeGreaterThanOrEqual(1.3)
  })

  it('never schedules a successful review less than a day out', () => {
    const state: SrsState = { ease: 1.3, interval_days: 1, reps: 9, lapses: 4 }
    expect(reviewCard(state, 3, NOW).interval_days).toBeGreaterThanOrEqual(1)
  })

  it('leaves the caller state untouched (no mutation)', () => {
    const state: SrsState = { ease: 2.5, interval_days: 6, reps: 2, lapses: 0 }
    const snapshot = { ...state }
    reviewCard(state, 5, NOW)
    expect(state).toEqual(snapshot)
  })
})
