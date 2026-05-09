import { describe, it, expect } from 'vitest'
import {
  parseFrontmatter,
  parseYankiCard,
  isDueToday,
  pathToSlug,
  renderMarkdown,
  parseCardFrontmatter,
} from '../lib/vault'

describe('parseFrontmatter', () => {
  it('extracts yaml and content', () => {
    const raw = `---\ntitle: Test\nscore: "7/10"\n---\n# Hello`
    const { frontmatter, content } = parseFrontmatter(raw)
    expect(frontmatter.title).toBe('Test')
    expect(frontmatter.score).toBe('7/10')
    expect(content.trim()).toBe('# Hello')
  })
})

describe('parseYankiCard', () => {
  it('splits on --- separator', () => {
    const raw = `---\ntags: [mcat]\n---\n\nWhat is Km?\n\n---\n\nMichaelis constant.`
    const { question, answer } = parseYankiCard(raw)
    expect(question).toBe('What is Km?')
    expect(answer).toBe('Michaelis constant.')
  })
})

describe('isDueToday', () => {
  it('true for past date', ()  => expect(isDueToday('2020-01-01')).toBe(true))
  it('true for today',      ()  => expect(isDueToday(new Date().toISOString().split('T')[0])).toBe(true))
  it('false for future',    ()  => expect(isDueToday('2099-12-31')).toBe(false))
  it('true for undefined',  ()  => expect(isDueToday(undefined)).toBe(true))
})

describe('pathToSlug', () => {
  it('strips directory and .md', () => {
    expect(pathToSlug('topics/cards/bio-biochem/enzyme-kinetics.md')).toBe('enzyme-kinetics')
  })
})

describe('renderMarkdown', () => {
  it('converts [[wiki-link]] to /cards/ href', async () => {
    const html = await renderMarkdown('See [[enzyme-kinetics]] for details.')
    expect(html).toContain('href="/cards/enzyme-kinetics"')
  })

  it('renders <details> tags through as raw HTML', async () => {
    const html = await renderMarkdown('<details><summary>Q</summary>A</details>')
    expect(html).toContain('<details>')
  })
})

describe('parseCardFrontmatter', () => {
  it('parses completion as integer', () => {
    const raw = `---\ntitle: X\ncompletion: 40%\nscore: "2/5"\nease: new\n---\nbody`
    const { frontmatter } = parseFrontmatter(raw)
    const card = parseCardFrontmatter(frontmatter)
    expect(card.completionPct).toBe(40)
    expect(card.score).toBe('2/5')
  })
})
