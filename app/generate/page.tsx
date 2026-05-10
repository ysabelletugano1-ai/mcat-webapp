'use client'
import { useState } from 'react'
import { AAMC_CATEGORIES } from '@/lib/prompts'

export default function GeneratePage() {
  const [topic, setTopic]       = useState('')
  const [category, setCategory] = useState('1A')
  const [qType, setQType]       = useState<'discrete' | 'passage'>('discrete')
  const [output, setOutput]     = useState('')
  const [loading, setLoading]   = useState(false)
  const [saved, setSaved]       = useState(false)

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setOutput('')
    setSaved(false)

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: topic || AAMC_CATEGORIES[category]?.name, category, qType }),
    })

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let text = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      text += decoder.decode(value, { stream: true })
      setOutput(text)
    }
    setLoading(false)
  }

  async function handleSave() {
    await fetch('/api/save-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: topic || AAMC_CATEGORIES[category]?.name, category, qType, content: output }),
    })
    setSaved(true)
  }

  return (
    <div>
      <h1>Question Generator</h1>
      <form onSubmit={handleGenerate} className="gen-form">
        <div className="gen-field">
          <label className="gen-label">Topic (optional)</label>
          <input
            className="gen-input"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. enzyme kinetics (defaults to category name)"
          />
        </div>
        <div className="gen-field">
          <label className="gen-label">AAMC Category</label>
          <select className="gen-select" value={category} onChange={e => setCategory(e.target.value)}>
            {Object.entries(AAMC_CATEGORIES).map(([code, info]) => (
              <option key={code} value={code}>{code} — {info.name}</option>
            ))}
          </select>
        </div>
        <div className="gen-field">
          <label className="gen-label">Question Type</label>
          <div className="gen-radio-row">
            {(['discrete', 'passage'] as const).map(t => (
              <label key={t} className="gen-radio">
                <input type="radio" name="qtype" value={t} checked={qType === t} onChange={() => setQType(t)} />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" disabled={loading} className="gen-btn">
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </form>
      {output && (
        <div className="gen-output-container">
          <pre className="gen-output">{output}</pre>
          <button onClick={handleSave} disabled={saved} className="gen-save-btn">
            {saved ? 'Saved to vault ✓' : 'Save to vault'}
          </button>
        </div>
      )}
    </div>
  )
}
