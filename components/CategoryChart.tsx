interface Props {
  tally: Record<string, number>
}

export default function CategoryChart({ tally }: Props) {
  const entries = Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 10)
  if (!entries.length) return <p className="chart-empty">No errors logged yet.</p>
  const max = entries[0][1]

  return (
    <div className="chart">
      <h3>Most-Missed Categories</h3>
      {entries.map(([cat, count]) => (
        <div key={cat} className="chart-row">
          <span className="chart-label mono">{cat}</span>
          <div className="chart-track">
            <div className="chart-bar" style={{ width: `${(count / max) * 100}%` }} />
          </div>
          <span className="chart-count mono">{count}</span>
        </div>
      ))}
    </div>
  )
}
