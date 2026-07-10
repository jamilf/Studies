/**
 * SM-2 spaced repetition scheduler.
 * Grades: 0 = Again (lapse), 3 = Hard, 4 = Good, 5 = Easy.
 */
export type Grade = 0 | 3 | 4 | 5

export interface SrsState {
  ease: number
  interval_days: number
  reps: number
  lapses: number
}

export interface SrsResult extends SrsState {
  due_at: string
}

const MIN_EASE = 1.3

export function reviewCard(state: SrsState, grade: Grade, now: Date = new Date()): SrsResult {
  let { ease, interval_days, reps, lapses } = state

  if (grade === 0) {
    // Lapse: relearn today, ease penalty, interval resets.
    lapses += 1
    reps = 0
    interval_days = 0
    ease = Math.max(MIN_EASE, ease - 0.2)
    // Due again in 10 minutes so it comes back within the session.
    const due = new Date(now.getTime() + 10 * 60 * 1000)
    return { ease, interval_days, reps, lapses, due_at: due.toISOString() }
  }

  // Standard SM-2 ease update: q=3 -> -0.14, q=4 -> 0, q=5 -> +0.10
  const q = grade
  ease = Math.max(MIN_EASE, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))

  if (reps === 0) {
    interval_days = 1
  } else if (reps === 1) {
    interval_days = 6
  } else {
    const factor = grade === 3 ? 1.2 : ease
    interval_days = Math.round(interval_days * factor)
  }
  if (grade === 5) {
    interval_days = Math.max(interval_days + 1, Math.round(interval_days * 1.3))
  }
  interval_days = Math.max(1, interval_days)
  reps += 1

  const due = new Date(now.getTime() + interval_days * 24 * 60 * 60 * 1000)
  return { ease, interval_days, reps, lapses, due_at: due.toISOString() }
}

export const NEW_CARD_STATE: SrsState = { ease: 2.5, interval_days: 0, reps: 0, lapses: 0 }
