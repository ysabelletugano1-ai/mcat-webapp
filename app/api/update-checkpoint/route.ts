import { NextRequest, NextResponse } from 'next/server'
import { getFile, updateFile } from '@/lib/github'
import { parseFrontmatter } from '@/lib/vault'
import matter from 'gray-matter'

export async function POST(req: NextRequest) {
  let body: { path: string; completionPct: number }
  try {
    body = await req.json() as { path: string; completionPct: number }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  const { path, completionPct } = body

  const { content: raw, sha } = await getFile(path)
  const { frontmatter, content: bodyContent } = parseFrontmatter(raw)

  frontmatter['completion'] = `${completionPct}%`

  const updated = matter.stringify(bodyContent, frontmatter as Record<string, unknown>)
  await updateFile(path, updated, sha, `study: update completion on ${path}`)

  return NextResponse.json({ ok: true })
}
