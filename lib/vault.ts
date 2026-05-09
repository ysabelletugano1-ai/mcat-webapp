import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

export interface CardFrontmatter {
  title: string
  type?: string
  'aamc-category'?: string
  section?: string
  tier?: number
  score?: string         // e.g. "2/5"
  completion?: string    // e.g. "40%"
  ease?: string | number
  'last-reviewed'?: string
  'next-review'?: string
  'review-count'?: number
  tags?: string[]
}

export interface ParsedCardMeta {
  title: string
  aamcCategory: string
  section: string
  score: string
  completionPct: number  // 0-100
  ease: string | number
  nextReview?: string
}

export function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; content: string } {
  const { data, content } = matter(raw)
  return { frontmatter: data, content }
}

export function parseCardFrontmatter(fm: Record<string, unknown>): ParsedCardMeta {
  const completion = fm['completion'] as string | undefined
  const completionPct = completion ? parseInt(completion, 10) : 0
  return {
    title:        (fm['title'] as string) ?? '',
    aamcCategory: (fm['aamc-category'] as string) ?? '',
    section:      (fm['section'] as string) ?? '',
    score:        (fm['score'] as string) ?? '0/5',
    completionPct,
    ease:         (fm['ease'] as string | number) ?? 'new',
    nextReview:   (fm['next-review'] as string | undefined),
  }
}

export function parseYankiCard(raw: string): {
  frontmatter: Record<string, unknown>
  question: string
  answer: string
} {
  const { data: frontmatter, content } = matter(raw)
  const parts = content.split('\n---\n')
  const question = (parts[0] ?? '').trim()
  const answer   = parts.slice(1).join('\n---\n').trim()
  return { frontmatter, question, answer }
}

export function isDueToday(nextReview: string | undefined): boolean {
  if (!nextReview) return true
  const today = new Date().toISOString().split('T')[0]
  return nextReview <= today
}

export function pathToSlug(path: string): string {
  return path.split('/').pop()!.replace('.md', '')
}

function convertWikiLinks(content: string): string {
  return content.replace(/\[\[([^\]]+)\]\]/g, (_, name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    return `[${name}](/cards/${slug})`
  })
}

export async function renderMarkdown(content: string): Promise<string> {
  const withLinks = convertWikiLinks(content)
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(withLinks)
  return String(result)
}
