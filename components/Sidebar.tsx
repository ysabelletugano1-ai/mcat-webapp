'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/',            label: 'Dashboard' },
  { href: '/bio-biochem', label: 'Bio / Biochem' },
  { href: '/chem-physics', label: 'Chem / Physics' },
  { href: '/psych-soc',   label: 'Psych / Soc' },
  { href: '/cars',        label: 'CARS' },
  { href: '/cards',       label: 'Topic Cards' },
  { href: '/flashcards',  label: 'Flashcards' },
  { href: '/generate',    label: 'Question Generator' },
  { href: '/errors',      label: 'FL Error Log' },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">MCAT 2026</div>
      <nav className="sidebar-nav">
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link${pathname === href ? ' active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <footer className="sidebar-footer">
        <blockquote className="virchow-quote">
          <em>Physicians are the natural attorneys of the poor and the social problems should largely be solved by them.</em>
          <cite>— Virchow</cite>
        </blockquote>
      </footer>
    </aside>
  )
}
