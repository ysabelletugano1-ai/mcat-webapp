import { getTree, getFile } from '@/lib/github'
import { parseFrontmatter, parseCardFrontmatter, renderMarkdown, pathToSlug } from '@/lib/vault'
import CheckpointControls from './CheckpointControls'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const paths = await getTree('topics/cards/')
  const path = paths.find(p => pathToSlug(p) === slug)
  if (!path) notFound()

  const { content: raw } = await getFile(path)
  const { frontmatter, content: body } = parseFrontmatter(raw)
  const meta = parseCardFrontmatter(frontmatter)
  const html = await renderMarkdown(body)

  return (
    <div className="card-page">
      <div className="card-page-header">
        <span className="tc-category">{meta.aamcCategory}</span>
        <h1>{meta.title}</h1>
        <div className="card-page-stats">
          <span className="mono">Score: {meta.score}</span>
          <span className="mono">Completion: {meta.completionPct}%</span>
        </div>
      </div>
      <div className="card-body" dangerouslySetInnerHTML={{ __html: html }} />
      <CheckpointControls vaultPath={path} currentPct={meta.completionPct} />
    </div>
  )
}
