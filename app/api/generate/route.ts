import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { DISCRETE_SYSTEM_PROMPT, PASSAGE_SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompts'

const anthropic = new Anthropic()

export async function POST(req: NextRequest) {
  const { topic, category, qType } = await req.json() as { topic: string; category: string; qType: string }
  const system = qType === 'discrete' ? DISCRETE_SYSTEM_PROMPT : PASSAGE_SYSTEM_PROMPT
  const userPrompt = buildUserPrompt(topic, category, qType)

  const stream = anthropic.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    system,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked' },
  })
}
