import { parseFrontmatter } from './vault'

export interface ErrorRow {
  date: string
  source: string
  qNum: string
  category: string
  topic: string
  myAnswer: string
  correct: string
  timesMissed: string
  expanded: string
}

// Parse the "All Wrong Answers" markdown table from fl-log.md
export function parseErrorTable(content: string): ErrorRow[] {
  const { content: body } = parseFrontmatter(content)
  const rows: ErrorRow[] = []
  const lines = body.split('\n')
  let inTable = false

  for (const line of lines) {
    if (line.includes('| Date |')) { inTable = true; continue }
    if (inTable && line.startsWith('|---')) continue
    if (inTable && line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean)
      if (cells.length >= 9 && cells[0] && cells[0] !== '') {
        rows.push({
          date: cells[0], source: cells[1], qNum: cells[2], category: cells[3],
          topic: cells[4], myAnswer: cells[5], correct: cells[6],
          timesMissed: cells[7], expanded: cells[8],
        })
      }
    } else if (inTable && !line.startsWith('|')) {
      inTable = false
    }
  }
  return rows
}

export function tally(rows: ErrorRow[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const row of rows) {
    if (row.category) counts[row.category] = (counts[row.category] ?? 0) + 1
  }
  return counts
}
