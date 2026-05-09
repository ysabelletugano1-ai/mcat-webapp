import { fetchVaultPage } from '@/lib/pages'

export const revalidate = 60

export default async function CarsPage() {
  const { title, html } = await fetchVaultPage('topics/mcat-cars-hub.md')
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
