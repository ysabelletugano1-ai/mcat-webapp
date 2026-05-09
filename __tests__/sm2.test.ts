import { describe, it, expect } from 'vitest'
import { rate, newCard, type CardState, type Rating } from '../lib/sm2'

describe('newCard', () => {
  it('returns a card due today with default ease 2.5', () => {
    const today = new Date().toISOString().split('T')[0]
    const card = newCard()
    expect(card.ease).toBe(2.5)
    expect(card.interval).toBe(0)
    expect(card.repetitions).toBe(0)
    expect(card.nextReview).toBe(today)
  })
})

describe('rate — Again', () => {
  it('resets interval to 1 and repetitions to 0', () => {
    const state: CardState = { interval: 10, ease: 2.5, repetitions: 3, lastReviewed: '2026-05-01', nextReview: '2026-05-11' }
    const result = rate(state, 'again')
    expect(result.interval).toBe(1)
    expect(result.repetitions).toBe(0)
  })

  it('decreases ease factor for again', () => {
    const state: CardState = { interval: 6, ease: 2.5, repetitions: 2, lastReviewed: '2026-05-01', nextReview: '2026-05-07' }
    const result = rate(state, 'again')
    expect(result.ease).toBeLessThan(2.5)
  })
})

describe('rate — Good', () => {
  it('sets interval to 1 on first review (repetitions=0)', () => {
    const state = newCard()
    const result = rate(state, 'good')
    expect(result.interval).toBe(1)
    expect(result.repetitions).toBe(1)
  })

  it('sets interval to 6 on second review (repetitions=1)', () => {
    const state: CardState = { interval: 1, ease: 2.5, repetitions: 1, lastReviewed: '2026-05-01', nextReview: '2026-05-02' }
    const result = rate(state, 'good')
    expect(result.interval).toBe(6)
    expect(result.repetitions).toBe(2)
  })

  it('multiplies interval by ease on subsequent reviews', () => {
    const state: CardState = { interval: 6, ease: 2.5, repetitions: 2, lastReviewed: '2026-05-01', nextReview: '2026-05-07' }
    const result = rate(state, 'good')
    expect(result.interval).toBe(15) // round(6 * 2.5)
    expect(result.repetitions).toBe(3)
  })
})

describe('rate — Hard', () => {
  it('decreases ease but still advances if repetitions > 0', () => {
    const state: CardState = { interval: 6, ease: 2.5, repetitions: 2, lastReviewed: '2026-05-01', nextReview: '2026-05-07' }
    const result = rate(state, 'hard')
    expect(result.ease).toBeLessThan(2.5)
    expect(result.repetitions).toBe(3)
  })
})

describe('rate — Easy', () => {
  it('increases ease factor', () => {
    const state: CardState = { interval: 6, ease: 2.5, repetitions: 2, lastReviewed: '2026-05-01', nextReview: '2026-05-07' }
    const result = rate(state, 'easy')
    expect(result.ease).toBeGreaterThan(2.5)
  })
})

describe('ease floor', () => {
  it('ease never drops below 1.3', () => {
    let state: CardState = { interval: 1, ease: 1.3, repetitions: 1, lastReviewed: '2026-05-01', nextReview: '2026-05-02' }
    state = rate(state, 'hard')
    expect(state.ease).toBeGreaterThanOrEqual(1.3)
  })
})

describe('nextReview date', () => {
  it('sets nextReview to today + interval days', () => {
    const state = newCard()
    const result = rate(state, 'good') // interval becomes 1
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    expect(result.nextReview).toBe(tomorrow.toISOString().split('T')[0])
  })
})
