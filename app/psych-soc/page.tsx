import { fetchVaultPage } from '@/lib/pages'

export const revalidate = 60

export default async function PsychPage() {
  const { title, html } = await fetchVaultPage('topics/mcat-psych-soc-hub.md')
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
