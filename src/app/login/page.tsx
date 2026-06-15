'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PawPrint, Building2, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

type Tab = 'pet-parent' | 'business'

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('pet-parent')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setError('')

    if (tab === 'pet-parent') {
      login({ role: 'pet-parent', name: email.split('@')[0], email })
      router.push('/dashboard/pet-parent')
    } else {
      // Simulate: approved businesses get dashboard, unapproved get redirected to apply
      const isApproved = true // In production this comes from the backend
      login({ role: 'business', name: email.split('@')[0], email, businessApproved: isApproved })
      router.push(isApproved ? '/dashboard/business' : '/apply')
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F8FC] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl">🐾</span>
            <span className="text-[22px] font-extrabold text-[#0F2140] tracking-tight">FurFinds</span>
          </Link>
          <h1 className="text-[28px] font-extrabold text-[#0F2140] tracking-tight">Welcome back</h1>
          <p className="text-[#8A9BB0] text-[14px] mt-1">Log in to your FurFinds account</p>
        </div>

        <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-8 shadow-sm">
          {/* Role tabs */}
          <div className="flex gap-2 mb-7 bg-[#F4F8FC] rounded-xl p-1">
            <button
              onClick={() => setTab('pet-parent')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-150
                ${tab === 'pet-parent' ? 'bg-white text-[#0F2140] shadow-sm' : 'text-[#8A9BB0] hover:text-[#0F2140]'}`}
            >
              <PawPrint size={15} /> Pet Parent
            </button>
            <button
              onClick={() => setTab('business')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-150
                ${tab === 'business' ? 'bg-white text-[#0F2140] shadow-sm' : 'text-[#8A9BB0] hover:text-[#0F2140]'}`}
            >
              <Building2 size={15} /> Business
            </button>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140] mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tab === 'pet-parent' ? 'you@email.com' : 'owner@yourbusiness.com'}
                className="w-full border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">Password</label>
                <button type="button" className="text-[12px] text-[#2DB8A8] font-semibold hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 pr-11 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]"
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9BB0] hover:text-[#0F2140]">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-[13px] text-red-500 font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#2DB8A8] text-white font-bold text-[15px] py-3.5 rounded-xl hover:bg-[#1E9E90] transition-colors duration-150 mt-1"
            >
              Log In <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E4EAF0] text-center">
            {tab === 'pet-parent' ? (
              <p className="text-[13px] text-[#8A9BB0]">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-[#2DB8A8] font-semibold hover:underline">Create one free</Link>
              </p>
            ) : (
              <p className="text-[13px] text-[#8A9BB0]">
                Not yet verified?{' '}
                <Link href="/apply" className="text-[#2DB8A8] font-semibold hover:underline">Apply for FurFinds Verification</Link>
              </p>
            )}
          </div>
        </div>

        {tab === 'business' && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-[13px] text-amber-800">
            <strong>Business accounts</strong> are created by FurFinds after your application is reviewed and approved. If you haven&apos;t applied yet, <Link href="/apply" className="underline font-semibold">start your application here</Link>.
          </div>
        )}
      </div>
    </div>
  )
}
