import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const OWNER = process.env.GITHUB_OWNER!
const REPO  = process.env.GITHUB_REPO!

export interface FileData {
  content: string
  sha: string
}

export async function getFile(path: string): Promise<FileData> {
  const res = await octokit.repos.getContent({ owner: OWNER, repo: REPO, path })
  const data = res.data
  if (Array.isArray(data) || data.type !== 'file') throw new Error(`Not a file: ${path}`)
  return {
    content: Buffer.from(data.content, 'base64').toString('utf-8'),
    sha: data.sha,
  }
}

export async function updateFile(
  path: string, content: string, sha: string, message: string
): Promise<void> {
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER, repo: REPO, path, message, sha,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    committer: { name: 'MCAT Web App', email: 'bot@brain' },
    author:    { name: 'MCAT Web App', email: 'bot@brain' },
  })
}

export async function createFile(
  path: string, content: string, message: string
): Promise<void> {
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER, repo: REPO, path, message,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    committer: { name: 'MCAT Web App', email: 'bot@brain' },
    author:    { name: 'MCAT Web App', email: 'bot@brain' },
  })
}

// Returns all file paths matching a prefix (e.g. "topics/cards/")
export async function getTree(prefix: string): Promise<string[]> {
  const res = await octokit.git.getTree({ owner: OWNER, repo: REPO, tree_sha: 'HEAD', recursive: '1' })
  return res.data.tree
    .filter(item => item.type === 'blob' && item.path?.startsWith(prefix) && item.path.endsWith('.md'))
    .map(item => item.path!)
}
