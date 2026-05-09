import { getTree, getFile } from '@/lib/github'
import { parseFrontmatter, parseCardFrontmatter, pathToSlug } from '@/lib/vault'
import TopicCard from '@/components/TopicCard'

export const revalidate = 60

type Section = 'all' | 'bio-biochem' | 'chem-physics' | 'psych-soc'

export default async function CardsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>
}) {
  const { section = 'all' } = await searchParams
  const paths = await getTree('topics/cards/')

  const cards = await Promise.all(
    paths.map(async path => {
      const { content } = await getFile(path)
      const { frontmatter } = parseFrontmatter(content)
      return { slug: pathToSlug(path), meta: parseCardFrontmatter(frontmatter), section: frontmatter['section'] as string }
    })
  )

  const filtered = section === 'all' ? cards : cards.filter(c => c.section === section)

  const sections: { value: Section; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'bio-biochem', label: 'Bio / Biochem' },
    { value: 'chem-physics', label: 'Chem / Physics' },
    { value: 'psych-soc', label: 'Psych / Soc' },
  ]

  return (
    <div>
      <h1>Topic Cards</h1>
      <div className="filter-row">
        {sections.map(s => (
          <a
            key={s.value}
            href={`/cards?section=${s.value}`}
            className={`filter-chip${section === s.value ? ' active' : ''}`}
          >
            {s.label}
          </a>
        ))}
      </div>
      <div className="card-grid">
        {filtered.map(c => (
          <TopicCard key={c.slug} slug={c.slug} meta={c.meta} />
        ))}
      </div>
    </div>
  )
}
