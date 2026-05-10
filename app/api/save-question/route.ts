import { NextRequest, NextResponse } from 'next/server'
import { createFile } from '@/lib/github'
import { buildOutputFile, buildSavePath } from '@/lib/prompts'

export async function POST(req: NextRequest) {
  let body: { topic: string; category: string; qType: string; content: string }
  try {
    body = await req.json() as { topic: string; category: string; qType: string; content: string }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  const { topic, category, qType, content } = body
  const fileContent = buildOutputFile(topic, category, qType, content)
  const path = buildSavePath(topic, qType)
  await createFile(path, fileContent, `practice: generate ${qType} questions — ${topic} (${category})`)
  return NextResponse.json({ ok: true, path })
}
