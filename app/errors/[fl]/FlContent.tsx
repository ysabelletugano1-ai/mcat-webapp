'use client'
import { useState, useEffect } from 'react'
import ErrorForm from '@/components/ErrorForm'

type Row = { date: string; source: string; qNum: string; category: string; topic: string; myAnswer: string; correct: string }

export default function FlContent({ fl }: { fl: string }) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/fl-entries?fl=${fl}`)
      .then(r => r.json())
      .then(data => { setRows(data.rows); setLoading(false) })
  }, [fl])

  function handleAdded(row: Row) {
    setRows(prev => [row, ...prev])
  }

  if (loading) return <p>Loading…</p>

  return (
    <>
      <table>
        <thead>
          <tr><th>Date</th><th>Q#</th><th>Category</th><th>Topic</th><th>Mine</th><th>Correct</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.date}-${r.source}-${r.qNum}-${i}`}>
              <td className="mono">{r.date}</td>
              <td className="mono">{r.qNum}</td>
              <td className="mono">{r.category}</td>
              <td>{r.topic}</td>
              <td className="mono">{r.myAnswer}</td>
              <td className="mono">{r.correct}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ErrorForm fl={fl} onAdded={handleAdded} />
    </>
  )
}
