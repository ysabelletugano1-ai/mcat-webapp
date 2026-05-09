'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) router.push('/')
    else setError('Incorrect password.')
  }

  return (
    <div className="login-page">
      <h1 className="login-title">MCAT Study System</h1>
      <blockquote className="login-quote">
        <em>Physicians are the natural attorneys of the poor and the social problems should largely be solved by them.</em>
        <cite>— Virchow</cite>
      </blockquote>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
          autoFocus
        />
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-btn">Enter</button>
      </form>
    </div>
  )
}
