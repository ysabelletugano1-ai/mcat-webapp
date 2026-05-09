import { getTree, getFile } from '@/lib/github'
import { parseYankiCard, isDueToday } from '@/lib/vault'
import FlashcardReviewer from '@/components/FlashcardReviewer'

export const dynamic = 'force-dynamic'

export default async function FlashcardsPage() {
  const paths = await getTree('anki-cards/')

  const allCards = await Promise.all(
    paths.map(async path => {
      const { content } = await getFile(path)
      const { frontmatter, question, answer } = parseYankiCard(content)
      return {
        path,
        question,
        answer,
        nextReview: (frontmatter['next-review'] as string | undefined),
      }
    })
  )

  const dueCards = allCards.filter(c => isDueToday(c.nextReview))
  const cards = dueCards.map((c, i) => ({
    path: c.path,
    question: c.question,
    answer: c.answer,
    index: i,
    total: dueCards.length,
  }))

  return (
    <div>
      <h1>Flashcard Review</h1>
      <p className="fc-due-count">{cards.length} card{cards.length !== 1 ? 's' : ''} due today</p>
      <FlashcardReviewer cards={cards} />
    </div>
  )
}
