'use client'
import { useState } from 'react'
import { AAMC_CATEGORIES } from '@/lib/prompts'

interface Props {
  fl: string
  onAdded: (row: { date: string; source: string; qNum: string; category: string; topic: string; myAnswer: string; correct: string }) => void
}

export default function ErrorForm({ fl, onAdded }: Props) {
  const today = new Date().toLocaleDateString('en-CA')
  const [date, setDate]         = useState(today)
  const [source, setSource]     = useState(fl.toUpperCase().replace(/-/g, ' '))
  const [qNum, setQNum]         = useState('')
  const [category, setCategory] = useState('1A')
  const [topic, setTopic]       = useState('')
  const [myAnswer, setMyAnswer] = useState('')
  const [correct, setCorrect]   = useState('')
  const [saving, setSaving]     = useState(false)
  const [done, setDone]         = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const entry = { date, source, qNum, category, topic, myAnswer, correct }
    await fetch('/api/append-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fl, entry }),
    })
    onAdded(entry)
    setSaving(false)
    setDone(true)
    setQNum(''); setTopic(''); setMyAnswer(''); setCorrect('')
    setTimeout(() => setDone(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="error-form">
      <h3>Add Error Entry</h3>
      <div className="error-form-grid">
        <div className="gen-field">
          <label className="gen-label">Date</label>
          <input className="gen-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="gen-field">
          <label className="gen-label">Q#</label>
          <input className="gen-input" value={qNum} onChange={e => setQNum(e.target.value)} placeholder="e.g. 23" required />
        </div>
        <div className="gen-field">
          <label className="gen-label">Category</label>
          <select className="gen-select" value={category} onChange={e => setCategory(e.target.value)}>
            {Object.entries(AAMC_CATEGORIES).map(([code, info]) => (
              <option key={code} value={code}>{code} — {info.name}</option>
            ))}
          </select>
        </div>
        <div className="gen-field">
          <label className="gen-label">Topic</label>
          <input className="gen-input" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Enzyme kinetics" required />
        </div>
        <div className="gen-field">
          <label className="gen-label">My Answer</label>
          <input className="gen-input" value={myAnswer} onChange={e => setMyAnswer(e.target.value)} placeholder="A" required />
        </div>
        <div className="gen-field">
          <label className="gen-label">Correct</label>
          <input className="gen-input" value={correct} onChange={e => setCorrect(e.target.value)} placeholder="C" required />
        </div>
      </div>
      <button type="submit" disabled={saving} className="gen-btn">
        {done ? 'Saved ✓' : saving ? 'Saving…' : 'Add Entry'}
      </button>
    </form>
  )
}
