'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ShieldCheck, Award, Star, BarChart2, MessageSquare, AlertCircle,
  Settings, Bell, ChevronRight, Check, Lock, CreditCard, RefreshCw,
  Download, Eye, ExternalLink, Clock
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const REVIEWS = [
  { author: 'Maya S.', rating: 5, text: 'Amazing place. Biscuit loved it!', date: 'Jun 10, 2026', responded: false },
  { author: 'James R.', rating: 4, text: 'Great service, water bowls always available.', date: 'May 28, 2026', responded: true },
  { author: 'Anika K.', rating: 5, text: 'Best pet-friendly hotel in the city.', date: 'May 15, 2026', responded: false },
]

const CHECKLIST = [
  { label: 'Business description', done: true },
  { label: 'Business hours', done: true },
  { label: 'Contact information', done: true },
  { label: 'Photos uploaded (3 of 10)', done: false },
  { label: 'Social media links', done: false },
  { label: 'Pet policy published', done: true, locked: true },
  { label: 'Pet amenities confirmed', done: true, locked: true },
]

export default function BusinessDashboard() {
  const { user, loaded } = useAuth()
  const router = useRouter()
  const [replyOpen, setReplyOpen] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')

  useEffect(() => {
    if (!loaded) return
    if (!user || user.role !== 'business') router.push('/login')
  }, [user, loaded, router])

  if (!loaded) return null
  if (!user) return null

  const completedItems = CHECKLIST.filter(i => i.done).length
  const completionPct = Math.round((completedItems / CHECKLIST.length) * 100)

  return (
    <div className="min-h-screen bg-[#F4F8FC]">
      {/* Header */}
      <div className="bg-[#0F2140] pt-10 pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#2DB8A8] flex items-center justify-center text-white text-[22px] font-extrabold flex-shrink-0">
              {user.name ? user.name[0].toUpperCase() : 'B'}
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-[13px] font-medium">Business Dashboard</p>
              <h1 className="text-white text-[24px] font-extrabold tracking-tight">{user.name || 'Your Business'}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-[#2DB8A8] text-white">
                  <ShieldCheck size={11} /> FurFinds Verified
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-[#7B5EA720] text-[#C4A8F0]">
                  <Award size={11} /> Pet-Inclusive · 3 Paws
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F4A261]" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 -mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main column */}
          <div className="flex flex-col gap-5">
            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Avg Rating', value: '4.8', sub: '84 reviews', icon: Star, color: '#F4A261' },
                { label: 'Profile Views', value: '1.2k', sub: 'This month', icon: Eye, color: '#2DB8A8' },
                { label: 'Open Complaints', value: '0', sub: 'All clear', icon: AlertCircle, color: '#52B788' },
                { label: 'Re-verify In', value: '6mo', sub: 'Dec 2026', icon: RefreshCw, color: '#7B5EA7' },
              ].map(({ label, value, sub, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-xl border-[1.5px] border-[#E4EAF0] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-[22px] font-extrabold text-[#0F2140] leading-none">{value}</div>
                    <div className="text-[11px] text-[#8A9BB0] font-medium mt-0.5">{label}</div>
                    <div className="text-[10px] text-[#B0BEC5]">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Completion Checklist */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[17px] font-extrabold text-[#0F2140]">Profile Completion</h2>
                <span className="text-[14px] font-bold text-[#2DB8A8]">{completionPct}%</span>
              </div>
              <div className="h-2 bg-[#E4EAF0] rounded-full mb-5 overflow-hidden">
                <div className="h-full bg-[#2DB8A8] rounded-full transition-all" style={{ width: `${completionPct}%` }} />
              </div>
              <div className="flex flex-col gap-2.5">
                {CHECKLIST.map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-[#2DB8A8]' : 'border-2 border-[#E4EAF0]'}`}>
                      {item.done && <Check size={12} className="text-white" />}
                    </div>
                    <span className={`text-[13px] font-medium flex-1 ${item.done ? 'text-[#0F2140]' : 'text-[#8A9BB0]'}`}>{item.label}</span>
                    {item.locked && (
                      <span className="flex items-center gap-1 text-[10px] text-[#8A9BB0] font-semibold">
                        <Lock size={10} /> FurFinds managed
                      </span>
                    )}
                    {!item.done && !item.locked && (
                      <button className="text-[12px] font-bold text-[#2DB8A8] hover:underline">Complete</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Editable Fields Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <Lock size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[14px] font-bold text-blue-800">Some fields require FurFinds approval</p>
                  <p className="text-[13px] text-blue-700 mt-1 leading-relaxed">You can freely edit your description, hours, contact info, social links, and photos. Changes to <strong>pet policies, pet amenities, restrictions, certifications, tier status, and verification claims</strong> require FurFinds review before they go live.</p>
                  <button className="mt-2 text-[12px] font-bold text-blue-700 underline">Request a restricted field change →</button>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[17px] font-extrabold text-[#0F2140]">Reviews</h2>
                <div className="flex items-center gap-1">
                  <Star size={14} fill="#F4A261" className="text-[#F4A261]" />
                  <span className="text-[14px] font-bold text-[#0F2140]">4.8</span>
                  <span className="text-[13px] text-[#8A9BB0]">(84)</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="border-[1.5px] border-[#E4EAF0] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#D4E8E8] flex items-center justify-center text-[11px] font-bold text-[#2DB8A8]">
                          {r.author[0]}
                        </div>
                        <span className="font-bold text-[#0F2140] text-[13px]">{r.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, j) => <Star key={j} size={11} fill={j < r.rating ? '#F4A261' : 'none'} className={j < r.rating ? 'text-[#F4A261]' : 'text-[#E4EAF0]'} />)}</div>
                        <span className="text-[11px] text-[#8A9BB0]">{r.date}</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#8A9BB0] leading-relaxed mb-3">{r.text}</p>
                    {r.responded ? (
                      <div className="bg-[#F4F8FC] rounded-lg px-3 py-2 text-[12px] text-[#8A9BB0]">
                        <span className="font-bold text-[#2DB8A8]">Your response:</span> Thank you so much! We look forward to seeing you again.
                      </div>
                    ) : (
                      <>
                        {replyOpen === i ? (
                          <div className="flex flex-col gap-2">
                            <textarea
                              value={replyText}
                              onChange={e => setReplyText(e.target.value)}
                              placeholder="Write a public response..."
                              className="w-full border-[1.5px] border-[#E4EAF0] rounded-lg px-3 py-2.5 text-[13px] text-[#0F2140] outline-none focus:border-[#2DB8A8] resize-none h-20"
                            />
                            <div className="flex gap-2">
                              <button onClick={() => { setReplyOpen(null); setReplyText('') }} className="text-[12px] font-semibold text-[#8A9BB0] hover:text-[#0F2140]">Cancel</button>
                              <button className="px-4 py-1.5 bg-[#2DB8A8] text-white text-[12px] font-bold rounded-lg hover:bg-[#1E9E90] transition-colors">Post Response</button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={() => setReplyOpen(i)} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#2DB8A8] hover:underline">
                            <MessageSquare size={13} /> Respond to this review
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Complaints / Disputes */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={16} className="text-[#8A9BB0]" />
                <h2 className="text-[17px] font-extrabold text-[#0F2140]">Complaints & Disputes</h2>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#52B788] font-semibold">
                <Check size={14} /> No open complaints. Your account is in good standing.
              </div>
            </div>

            {/* Profile Analytics */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
              <div className="flex items-center gap-2 mb-5">
                <BarChart2 size={16} className="text-[#2DB8A8]" />
                <h2 className="text-[17px] font-extrabold text-[#0F2140]">Profile Analytics</h2>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: 'Profile Views', value: '1,247', change: '+12%' },
                  { label: 'Saves', value: '89', change: '+8%' },
                  { label: 'Direction Clicks', value: '34', change: '+3%' },
                ].map(m => (
                  <div key={m.label} className="bg-[#F4F8FC] rounded-xl p-4 text-center">
                    <div className="text-[20px] font-extrabold text-[#0F2140]">{m.value}</div>
                    <div className="text-[11px] text-[#8A9BB0] mt-0.5">{m.label}</div>
                    <div className="text-[11px] text-[#52B788] font-bold mt-1">{m.change} this month</div>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-[#8A9BB0]">Analytics update daily. Data shown for the last 30 days.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Verified Badge + Marketing */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-5">
              <h3 className="text-[15px] font-extrabold text-[#0F2140] mb-4">FurFinds Verified Badge</h3>
              <div className="bg-[#F4F8FC] rounded-xl p-4 text-center mb-4">
                <div className="text-4xl mb-2">🐾</div>
                <div className="text-[13px] font-extrabold text-[#0F2140]">Pet-Inclusive</div>
                <div className="text-[11px] text-[#8A9BB0] mt-0.5">3 Paws · FurFinds Verified</div>
              </div>
              <div className="flex flex-col gap-2">
                {['Download badge (PNG)', 'Download badge (SVG)', 'Embed code for website'].map(item => (
                  <button key={item} className="flex items-center justify-between py-2 text-[13px] font-semibold text-[#0F2140] hover:text-[#2DB8A8] border-b border-[#F4F8FC] last:border-0 transition-colors">
                    <span className="flex items-center gap-2"><Download size={13} className="text-[#2DB8A8]" /> {item}</span>
                    <ExternalLink size={12} className="text-[#8A9BB0]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Billing */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={15} className="text-[#2DB8A8]" />
                <h3 className="text-[15px] font-extrabold text-[#0F2140]">Billing</h3>
              </div>
              <div className="bg-[#F4F8FC] rounded-xl p-3 mb-3">
                <div className="text-[13px] font-bold text-[#0F2140]">Pet-Inclusive Plan</div>
                <div className="text-[12px] text-[#8A9BB0]">$149/year · Renews Jun 2027</div>
              </div>
              <div className="flex flex-col gap-1">
                {['View invoices', 'Update payment method', 'Manage subscription'].map(item => (
                  <button key={item} className="flex items-center justify-between py-2 text-[13px] font-semibold text-[#0F2140] hover:text-[#2DB8A8] border-b border-[#F4F8FC] last:border-0 transition-colors">
                    {item} <ChevronRight size={14} className="text-[#8A9BB0]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Re-verification */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={15} className="text-[#7B5EA7]" />
                <h3 className="text-[15px] font-extrabold text-[#0F2140]">Re-Verification</h3>
              </div>
              <p className="text-[12px] text-[#8A9BB0] mb-3">Your next annual re-verification is due in <strong className="text-[#0F2140]">December 2026</strong>. You&apos;ll receive a reminder 60 days in advance.</p>
              <div className="h-1.5 bg-[#E4EAF0] rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#7B5EA7] rounded-full" style={{ width: '50%' }} />
              </div>
              <p className="text-[11px] text-[#8A9BB0]">6 months remaining</p>
            </div>

            {/* Quick Profile Edit */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-5">
              <h3 className="text-[15px] font-extrabold text-[#0F2140] mb-3">Quick Edit (Free Fields)</h3>
              <div className="flex flex-col gap-1">
                {['Edit description', 'Update hours', 'Update contact info', 'Add photos', 'Manage social links'].map(item => (
                  <button key={item} className="flex items-center justify-between py-2.5 text-[13px] font-semibold text-[#0F2140] hover:text-[#2DB8A8] border-b border-[#F4F8FC] last:border-0 transition-colors">
                    {item} <ChevronRight size={14} className="text-[#8A9BB0]" />
                  </button>
                ))}
              </div>
            </div>

            {/* View public profile */}
            <Link href="/business/the-bark-hotel" className="flex items-center justify-center gap-2 py-3 rounded-xl border-[1.5px] border-[#2DB8A8] text-[13px] font-bold text-[#2DB8A8] hover:bg-[#2DB8A8] hover:text-white transition-colors">
              <Eye size={15} /> View Public Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
