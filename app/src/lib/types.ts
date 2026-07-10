export type Deck = 'core' | 'acronym' | 'feynman'
export type QType = 'mcq' | 'multi' | 'ordering' | 'matching'
export type QuizKind = 'mixed' | 'domain' | 'weak' | 'exam'

export const DOMAIN_NAMES: Record<number, string> = {
  1: 'General Security Concepts',
  2: 'Threats, Vulnerabilities & Mitigations',
  3: 'Security Architecture',
  4: 'Security Operations',
  5: 'Program Management & Oversight',
}

/** Official SY0-701 blueprint weights, as fractions. */
export const DOMAIN_WEIGHTS: Record<number, number> = {
  1: 0.12,
  2: 0.22,
  3: 0.18,
  4: 0.28,
  5: 0.2,
}

export interface Flashcard {
  id: string
  deck: Deck
  domain: number
  objective: string
  front: string
  back: string
}

export interface Question {
  id: string
  domain: number
  objective: string
  qtype: QType
  difficulty: number
  stem: string
  /** mcq/multi: string[]; ordering: string[] (correct order); matching: {left,right} */
  choices: string[] | { left: string[]; right: string[] }
  /** mcq: number; multi: number[]; ordering: number[]; matching: number[] */
  answer: number | number[]
  explanation: string
}

export interface CardState {
  user_id: string
  card_id: string
  ease: number
  interval_days: number
  reps: number
  lapses: number
  due_at: string
  last_grade: number | null
  updated_at: string
}

export interface AnswerEvent {
  id?: number
  user_id: string
  question_id: string
  quiz_kind: QuizKind
  correct: boolean
  chosen: unknown
  answered_at?: string
}

export interface ExamAttempt {
  id: string
  user_id: string
  started_at: string
  submitted_at: string | null
  question_ids: string[]
  responses: Record<string, unknown> | null
  raw_correct: number | null
  scaled_score: number | null
  passed: boolean | null
}
