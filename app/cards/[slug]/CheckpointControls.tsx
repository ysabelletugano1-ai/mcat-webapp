'use client'
import { useState } from 'react'

interface Props {
  vaultPath: string
  currentPct: number
}

export default function CheckpointControls({ vaultPath, currentPct }: Props) {
  const [pct, setPct] = useState(currentPct)
  const [saving, setSaving] = useState(false)

  async function set(newPct: number) {
    setSaving(true)
    await fetch('/api/update-checkpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: vaultPath, completionPct: newPct }),
    })
    setPct(newPct)
    setSaving(false)
  }

  return (
    <div className="checkpoint-controls">
      <p className="checkpoint-label">Completion: {pct}%</p>
      <div className="checkpoint-btns">
        {[0, 20, 40, 60, 80, 100].map(v => (
          <button
            key={v}
            onClick={() => set(v)}
            disabled={saving}
            className={`checkpoint-btn${pct === v ? ' active' : ''}`}
          >
            {v}%
          </button>
        ))}
      </div>
    </div>
  )
}
