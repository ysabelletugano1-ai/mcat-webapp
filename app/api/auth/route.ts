import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let password: string
  try {
    const body = await req.json() as { password?: string }
    password = body.password ?? ''
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!password || password !== process.env.SITE_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('session', process.env.SITE_PASSWORD!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}
