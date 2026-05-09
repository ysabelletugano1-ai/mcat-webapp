export type Rating = 'again' | 'hard' | 'good' | 'easy'

export interface CardState {
  interval: number
  ease: number
  repetitions: number
  lastReviewed: string  // YYYY-MM-DD
  nextReview: string    // YYYY-MM-DD
}

function ratingToQuality(rating: Rating): number {
  switch (rating) {
    case 'again': return 0
    case 'hard':  return 3
    case 'good':  return 4
    case 'easy':  return 5
  }
}

function localDate(d: Date = new Date()): string {
  return d.toLocaleDateString('en-CA')
}

function addDays(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return localDate(d)
}

export function newCard(): CardState {
  const today = localDate()
  return { interval: 0, ease: 2.5, repetitions: 0, lastReviewed: today, nextReview: today }
}

export function rate(state: CardState, rating: Rating): CardState {
  const q = ratingToQuality(rating)
  const today = localDate()
  let { interval, ease, repetitions } = state

  const oldEase = ease
  ease = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  ease = Math.max(1.3, Math.round(ease * 100) / 100)

  if (q < 3) {
    repetitions = 0
    interval = 1
  } else {
    if (repetitions === 0)      interval = 1
    else if (repetitions === 1) interval = 6
    else                        interval = Math.round(interval * oldEase)
    repetitions++
  }

  return { interval, ease, repetitions, lastReviewed: today, nextReview: addDays(interval) }
}
