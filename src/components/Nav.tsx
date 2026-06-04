'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/explore',   label: 'Explore' },
  { href: '/community', label: 'Community' },
  { href: '/impact',    label: 'FurFinds Gives Back' },
  { href: '/blog',      label: 'Blog' },
  { href: '/about',     label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E4EAF0] transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-[1200px] mx-auto px-6 h-[68px] flex items-center gap-7">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl">🐾</span>
          <span className="text-[20px] font-extrabold text-[#0F2140] tracking-tight">FurFinds</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap
                ${pathname === l.href ? 'text-[#2DB8A8]' : 'text-[#8A9BB0] hover:text-[#0F2140] hover:bg-[#F4F8FC]'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link href="/verify" className="px-4 py-2 rounded-lg border-[1.5px] border-[#E4EAF0] text-[13px] font-semibold text-[#0F2140] hover:border-[#2DB8A8] hover:text-[#2DB8A8] transition-colors duration-150">
            For Businesses
          </Link>
          <Link href="/explore" className="px-4 py-2 rounded-lg bg-[#2DB8A8] text-white text-[13px] font-bold hover:bg-[#1E9E90] transition-colors duration-150">
            Find Pet-Friendly Places
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-2 text-[#0F2140]"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#E4EAF0] px-6 py-4 flex flex-col gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="py-3 text-[15px] font-semibold text-[#0F2140] border-b border-[#F4F8FC]">
              {l.label}
            </Link>
          ))}
          <Link href="/verify" className="mt-3 py-3 text-[15px] font-semibold text-[#0F2140]">
            For Businesses
          </Link>
        </div>
      )}
    </header>
  )
}
