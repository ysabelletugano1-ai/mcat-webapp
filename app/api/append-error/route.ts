import { NextRequest, NextResponse } from 'next/server'
import { getFile, updateFile } from '@/lib/github'

interface ErrorEntry {
  date: string
  source: string
  qNum: string
  category: string
  topic: string
  myAnswer: string
  correct: string
}

export async function POST(req: NextRequest) {
  try {
    const { fl, entry } = await req.json() as { fl: string; entry: ErrorEntry }
    if (!fl || !/^[a-z0-9-]+$/.test(fl)) {
      return NextResponse.json({ error: 'Invalid fl parameter' }, { status: 400 })
    }

    // Find the per-FL file. Convention: practice/full-lengths/{fl}/{fl}-errors.md
    const path = `practice/full-lengths/${fl}/${fl}-errors.md`
    const { content: raw, sha } = await getFile(path)

    // Append a row to the table: insert after the header separator row
    const newRow = `| ${entry.date} | ${entry.source} | ${entry.qNum} | ${entry.category} | ${entry.topic} | ${entry.myAnswer} | ${entry.correct} | 1 |  |`

    const updated = raw.replace(
      /(\|---.*\|)\n/,
      `$1\n${newRow}\n`
    )
    if (updated === raw) {
      return NextResponse.json({ error: 'Table separator not found in FL file' }, { status: 500 })
    }

    await updateFile(path, updated, sha, `study: log FL error — ${entry.source} Q${entry.qNum} (${entry.category})`)

    // Also append to master fl-log.md
    const masterPath = 'practice/full-lengths/fl-log.md'
    const { content: masterRaw, sha: masterSha } = await getFile(masterPath)
    const masterUpdated = masterRaw.replace(
      /(\|---.*\|)\n/,
      `$1\n${newRow}\n`
    )
    if (masterUpdated === masterRaw) {
      return NextResponse.json({ error: 'Table separator not found in master log' }, { status: 500 })
    }
    await updateFile(masterPath, masterUpdated, masterSha, `study: log FL error — ${entry.source} Q${entry.qNum}`)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to append error entry' }, { status: 500 })
  }
}
