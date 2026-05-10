import FlContent from './FlContent'

export default async function FlPage({ params }: { params: Promise<{ fl: string }> }) {
  const { fl } = await params
  return (
    <div>
      <h1>{fl.toUpperCase().replace(/-/g, ' ')} — Error Log</h1>
      <FlContent fl={fl} />
    </div>
  )
}
