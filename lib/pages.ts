import { getFile } from './github'
import { parseFrontmatter, renderMarkdown } from './vault'

export interface RenderedPage {
  title: string
  html: string
}

export async function fetchVaultPage(path: string): Promise<RenderedPage> {
  const { content } = await getFile(path)
  const { frontmatter, content: body } = parseFrontmatter(content)
  const html = await renderMarkdown(body)
  return { title: (frontmatter['title'] as string) ?? path, html }
}
