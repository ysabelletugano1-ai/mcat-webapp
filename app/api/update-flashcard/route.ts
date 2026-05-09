import { NextRequest, NextResponse } from 'next/server'
import { getFile, updateFile } from '@/lib/github'
import { parseYankiCard } from '@/lib/vault'
import { rate, type Rating } from '@/lib/sm2'
import matter from 'gray-matter'

export async function POST(req: NextRequest) {
  let body: { path: string; rating: Rating }
  try {
    body = await req.json() as { path: string; rating: Rating }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  const { path, rating } = body

  const { content: raw, sha } = await getFile(path)
  const { frontmatter, question, answer } = parseYankiCard(raw)

  const current = {
    interval:    (frontmatter['interval'] as number)    ?? 0,
    ease:        (frontmatter['ease'] as number)        ?? 2.5,
    repetitions: (frontmatter['repetitions'] as number) ?? 0,
    lastReviewed:(frontmatter['last-reviewed'] as string) ?? '',
    nextReview:  (frontmatter['next-review'] as string)   ?? '',
  }

  const updated = rate(current, rating)

  const newFm = {
    ...frontmatter,
    interval:        updated.interval,
    ease:            updated.ease,
    repetitions:     updated.repetitions,
    'last-reviewed': updated.lastReviewed,
    'next-review':   updated.nextReview,
    'review-count':  ((frontmatter['review-count'] as number) ?? 0) + 1,
  }

  // Rebuild Yanki format: frontmatter block + question + --- + answer
  const frontmatterStr = matter.stringify('', newFm as Record<string, unknown>).trim()
  const rebuiltContent = `${frontmatterStr}\n\n${question}\n\n---\n\n${answer}\n`

  await updateFile(path, rebuiltContent, sha, `study: flashcard review ${path}`)
  return NextResponse.json({ ok: true, nextReview: updated.nextReview })
}
