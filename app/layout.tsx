import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora, IBM_Plex_Mono } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['400','500','600','700'],
  style: ['normal','italic'], variable: '--font-cormorant',
})
const lora = Lora({
  subsets: ['latin'], weight: ['400','500'], variable: '--font-lora',
})
const ibm = IBM_Plex_Mono({
  subsets: ['latin'], weight: ['400','500'], variable: '--font-ibm',
})

export const metadata: Metadata = { title: 'MCAT Study System' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lora.variable} ${ibm.variable}`}>
      <body>
        <div className="app-shell">
          <Sidebar />
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  )
}
