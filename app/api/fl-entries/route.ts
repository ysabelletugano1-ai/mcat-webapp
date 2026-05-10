import { NextRequest, NextResponse } from 'next/server'
import { getFile } from '@/lib/github'
import { parseErrorTable } from '@/lib/fl'

export async function GET(req: NextRequest) {
  try {
    const fl = req.nextUrl.searchParams.get('fl')
    if (!fl) return NextResponse.json({ rows: [] })

    const path = `practice/full-lengths/${fl}/${fl}-errors.md`
    const { content } = await getFile(path)
    const rows = parseErrorTable(content)
    return NextResponse.json({ rows })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ rows: [] }, { status: 500 })
  }
}
