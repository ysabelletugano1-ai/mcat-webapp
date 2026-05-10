import { getFile, getTree } from '@/lib/github'
import { parseErrorTable, tally } from '@/lib/fl'
import CategoryChart from '@/components/CategoryChart'
import Link from 'next/link'

export const revalidate = 60

export default async function ErrorsPage() {
  const { content } = await getFile('practice/full-lengths/fl-log.md')
  const rows = parseErrorTable(content)
  const tallied = tally(rows)

  // Find per-FL directories by listing the directory
  const allPaths = await getTree('practice/full-lengths/')
  const flDirs = [...new Set(
    allPaths
      .filter(p => p.split('/').length >= 4)
      .map(p => p.split('/')[2])
  )]

  return (
    <div>
      <h1>Full-Length Error Log</h1>
      <CategoryChart tally={tallied} />

      {flDirs.length > 0 && (
        <div className="fl-list">
          <h2>Individual FLs</h2>
          {flDirs.map(dir => (
            <Link key={dir} href={`/errors/${dir}`} className="fl-link">
              {dir}
            </Link>
          ))}
        </div>
      )}

      <h2>All Wrong Answers</h2>
      {rows.length === 0 ? (
        <p className="chart-empty">No entries yet. Add your first wrong answer below an individual FL page.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Source</th><th>Q#</th><th>Category</th>
              <th>Topic</th><th>Mine</th><th>Correct</th><th>×</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.date}-${r.source}-${r.qNum}`}>
                <td className="mono">{r.date}</td>
                <td>{r.source}</td>
                <td className="mono">{r.qNum}</td>
                <td className="mono">{r.category}</td>
                <td>{r.topic}</td>
                <td className="mono">{r.myAnswer}</td>
                <td className="mono">{r.correct}</td>
                <td className="mono">{r.timesMissed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
