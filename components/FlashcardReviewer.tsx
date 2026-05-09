'use client'
import { useState } from 'react'
import type { Rating } from '@/lib/sm2'

interface Card {
  path: string
  question: string
  answer: string
  index: number
  total: number
}

interface Props {
  cards: Card[]
}

export default function FlashcardReviewer({ cards }: Props) {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)
  const [reviewed, setReviewed] = useState(0)

  const card = cards[idx]

  if (!cards.length || done) {
    return (
      <div className="fc-empty">
        <h2>All caught up</h2>
        <p>{reviewed} card{reviewed !== 1 ? 's' : ''} reviewed today.</p>
      </div>
    )
  }

  async function handleRating(rating: Rating) {
    await fetch('/api/update-flashcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: card.path, rating }),
    })
    setReviewed(r => r + 1)
    if (idx + 1 >= cards.length) {
      setDone(true)
    } else {
      setIdx(i => i + 1)
      setFlipped(false)
    }
  }

  return (
    <div className="fc-container">
      <p className="fc-progress">{idx + 1} / {cards.length}</p>
      <div
        className={`fc-card${flipped ? ' flipped' : ''}`}
        onClick={() => !flipped && setFlipped(true)}
      >
        <div className="fc-front">
          <p>{card.question}</p>
          {!flipped && <span className="fc-hint">Click to reveal answer</span>}
        </div>
        <div className="fc-back">
          <p>{card.answer}</p>
        </div>
      </div>
      {flipped && (
        <div className="fc-ratings">
          {(['again', 'hard', 'good', 'easy'] as Rating[]).map(r => (
            <button key={r} onClick={() => handleRating(r)} className={`fc-btn fc-${r}`}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
