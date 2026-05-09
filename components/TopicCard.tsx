import Link from 'next/link'
import type { ParsedCardMeta } from '@/lib/vault'

interface Props {
  slug: string
  meta: ParsedCardMeta
}

export default function TopicCard({ slug, meta }: Props) {
  return (
    <Link href={`/cards/${slug}`} className="topic-card">
      <div className="tc-category">{meta.aamcCategory}</div>
      <h3 className="tc-title">{meta.title}</h3>
      <div className="tc-meta">
        <span className="tc-score mono">{meta.score}</span>
        <span className="tc-completion">{meta.completionPct}% complete</span>
      </div>
      <div className="tc-bar">
        <div className="tc-bar-fill" style={{ width: `${meta.completionPct}%` }} />
      </div>
    </Link>
  )
}
