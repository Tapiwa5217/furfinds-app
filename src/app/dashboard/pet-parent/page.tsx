'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  PawPrint, Heart, Star, ShieldCheck, Bell, BookOpen,
  Settings, Upload, MapPin, Award, AlertCircle, Calendar, ChevronRight
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const SAVED = [
  { name: 'The Bark Hotel', category: 'Hotel & Lodging', location: 'Chicago, IL', tier: 'Pet-Inclusive', rating: 5 },
  { name: 'Patio Bites Café', category: 'Restaurant', location: 'Austin, TX', tier: 'Pet-Friendly', rating: 4 },
  { name: 'Pawsome Grooming Co.', category: 'Groomer', location: 'Seattle, WA', tier: 'Pet-Inclusive', rating: 5 },
]

const RECOMMENDED = [
  { name: 'Wag & Whisker Inn', category: 'Hotel & Lodging', location: 'Chicago, IL', tier: 'Pet-Friendly', rating: 4 },
  { name: 'The Furry Fork', category: 'Restaurant', location: 'Chicago, IL', tier: 'Pet-Friendly', rating: 4 },
]

const TIER_COLORS: Record<string, string> = {
  'Pet-Inclusive': '#7B5EA7',
  'Pet-Friendly': '#2DB8A8',
  'Pets-Allowed': '#F4A261',
}

function TierPill({ tier }: { tier: string }) {
  return (
    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: `${TIER_COLORS[tier]}20`, color: TIER_COLORS[tier] }}>
      {tier}
    </span>
  )
}

export default function PetParentDashboard() {
  const { user, loaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loaded) return
    if (!user || user.role !== 'pet-parent') router.push('/login')
  }, [user, loaded, router])

  if (!loaded) return null
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#F4F8FC]">
      {/* Header */}
      <div className="bg-[#0F2140] pt-10 pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#2DB8A8] flex items-center justify-center text-white text-[22px] font-extrabold flex-shrink-0">
              {user.name ? user.name[0].toUpperCase() : 'P'}
            </div>
            <div>
              <p className="text-white/60 text-[13px] font-medium">Welcome back,</p>
              <h1 className="text-white text-[24px] font-extrabold tracking-tight">{user.name || 'Pet Parent'}</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="relative p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F4A261]" />
              </button>
              <Link href="/dashboard/pet-parent/settings" className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Settings size={18} />
              </Link>
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
                { label: 'Pets', value: '1', icon: PawPrint, color: '#2DB8A8' },
                { label: 'Saved Places', value: String(SAVED.length), icon: Heart, color: '#F4A261' },
                { label: 'Reviews', value: '3', icon: Star, color: '#7B5EA7' },
                { label: 'Badges', value: '2', icon: Award, color: '#52B788' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-xl border-[1.5px] border-[#E4EAF0] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-[22px] font-extrabold text-[#0F2140] leading-none">{value}</div>
                    <div className="text-[11px] text-[#8A9BB0] font-medium mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* My Pets */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[17px] font-extrabold text-[#0F2140]">My Pets</h2>
                <button className="text-[13px] font-semibold text-[#2DB8A8] hover:underline">+ Add Pet</button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 bg-[#F4F8FC] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[#D4E8E8] flex items-center justify-center text-2xl flex-shrink-0">🐕</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F2140]">Biscuit</span>
                      <span className="text-[11px] text-[#8A9BB0]">· Golden Retriever · Dog</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#52B788] bg-[#52B78815] px-2 py-0.5 rounded-full">
                        <ShieldCheck size={10} /> Vaccines current
                      </span>
                      <span className="text-[11px] text-[#8A9BB0]">Next due: Aug 2026</span>
                    </div>
                  </div>
                  <button className="text-[13px] font-semibold text-[#2DB8A8] flex items-center gap-1 hover:underline">
                    Edit <ChevronRight size={14} />
                  </button>
                </div>

                {/* Vaccine upload */}
                <div className="border-2 border-dashed border-[#E4EAF0] rounded-xl p-5 text-center hover:border-[#2DB8A8] transition-colors cursor-pointer">
                  <Upload size={20} className="text-[#8A9BB0] mx-auto mb-2" />
                  <p className="text-[13px] font-semibold text-[#0F2140]">Upload vaccination records</p>
                  <p className="text-[12px] text-[#8A9BB0] mt-0.5">PDF, JPG, PNG · Max 10MB</p>
                </div>
              </div>
            </div>

            {/* Vaccine reminders */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
              <Bell size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[14px] font-bold text-amber-800">Vaccine reminder</p>
                <p className="text-[13px] text-amber-700 mt-0.5">Biscuit&apos;s rabies vaccination is due in <strong>2 months</strong> (August 2026). Upload updated records to keep your profile current.</p>
                <button className="mt-2 text-[12px] font-bold text-amber-700 underline">Upload records</button>
              </div>
            </div>

            {/* Saved Businesses */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[17px] font-extrabold text-[#0F2140]">Saved Places</h2>
                <Link href="/explore" className="text-[13px] font-semibold text-[#2DB8A8] hover:underline">Explore more</Link>
              </div>
              <div className="flex flex-col gap-3">
                {SAVED.map(b => (
                  <div key={b.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F4F8FC] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#D4E8E8] flex items-center justify-center text-lg flex-shrink-0">🐾</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#0F2140] text-[14px]">{b.name}</span>
                        <TierPill tier={b.tier} />
                      </div>
                      <div className="flex items-center gap-1 text-[12px] text-[#8A9BB0] mt-0.5">
                        <MapPin size={11} /> {b.location} · {b.category}
                      </div>
                    </div>
                    <button className="text-[#8A9BB0] hover:text-red-400 transition-colors"><Heart size={16} fill="currentColor" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Written */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[17px] font-extrabold text-[#0F2140]">My Reviews</h2>
                <span className="text-[12px] text-[#8A9BB0]">3 reviews written</span>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { biz: 'The Bark Hotel', rating: 5, text: 'Absolutely loved the dog-friendly amenities. Biscuit had the best time!' },
                  { biz: 'Patio Bites Café', rating: 4, text: 'Great patio, water bowls were already out. Will definitely return.' },
                ].map(r => (
                  <div key={r.biz} className="border-[1.5px] border-[#E4EAF0] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0F2140] text-[14px]">{r.biz}</span>
                      <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} fill={i < r.rating ? '#F4A261' : 'none'} className={i < r.rating ? 'text-[#F4A261]' : 'text-[#E4EAF0]'} />)}</div>
                    </div>
                    <p className="text-[13px] text-[#8A9BB0] leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Complaints Filed */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={16} className="text-[#8A9BB0]" />
                <h2 className="text-[17px] font-extrabold text-[#0F2140]">Complaints Filed</h2>
              </div>
              <p className="text-[13px] text-[#8A9BB0]">No complaints filed. If you encounter a business misrepresenting their pet-friendliness, you can file a complaint from their listing page.</p>
            </div>

            {/* Upcoming Visits */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-[#2DB8A8]" />
                <h2 className="text-[17px] font-extrabold text-[#0F2140]">Upcoming Bookings & Visits</h2>
              </div>
              <p className="text-[13px] text-[#8A9BB0]">No upcoming bookings saved. Save a business and mark your visit to track it here.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Recommended */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-5">
              <h3 className="text-[15px] font-extrabold text-[#0F2140] mb-4">Recommended for You</h3>
              <div className="flex flex-col gap-3">
                {RECOMMENDED.map(b => (
                  <div key={b.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#D4E8E8] flex items-center justify-center text-base flex-shrink-0">🐾</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#0F2140] text-[13px] truncate">{b.name}</div>
                      <div className="text-[11px] text-[#8A9BB0]">{b.category}</div>
                    </div>
                    <TierPill tier={b.tier} />
                  </div>
                ))}
              </div>
              <Link href="/explore" className="mt-4 block text-center text-[13px] font-semibold text-[#2DB8A8] hover:underline">
                View all nearby →
              </Link>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-5">
              <h3 className="text-[15px] font-extrabold text-[#0F2140] mb-4">Community Badges</h3>
              <div className="flex flex-col gap-3">
                {[
                  { emoji: '⭐', label: 'First Review', desc: 'Wrote your first review' },
                  { emoji: '🐾', label: 'Pet Parent', desc: 'Joined FurFinds' },
                  { emoji: '🔒', label: 'Vaccinated', desc: 'Uploaded vaccine records', locked: true },
                  { emoji: '📍', label: 'Explorer', desc: '5 places visited', locked: true },
                ].map(b => (
                  <div key={b.label} className={`flex items-center gap-3 ${b.locked ? 'opacity-40' : ''}`}>
                    <div className="w-9 h-9 rounded-lg bg-[#F4F8FC] flex items-center justify-center text-lg flex-shrink-0">{b.emoji}</div>
                    <div>
                      <div className="font-bold text-[#0F2140] text-[13px]">{b.label}</div>
                      <div className="text-[11px] text-[#8A9BB0]">{b.locked ? 'Locked' : b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FurFinds Gives Back */}
            <div className="bg-[#F0FAF5] rounded-2xl border border-[#52B78840] p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} className="text-[#52B788]" />
                <h3 className="text-[15px] font-extrabold text-[#0F2140]">FurFinds Gives Back</h3>
              </div>
              <p className="text-[12px] text-[#8A9BB0] mb-3">Support shelters and rescues in your area.</p>
              <div className="flex flex-col gap-2">
                {['Chicago Animal Care & Control', 'PAWS Chicago', 'Anti-Cruelty Society'].map(org => (
                  <div key={org} className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#0F2140]">{org}</span>
                    <button className="text-[11px] font-bold text-[#52B788] hover:underline">Donate</button>
                  </div>
                ))}
              </div>
              <Link href="/impact" className="mt-3 block text-center text-[12px] font-semibold text-[#52B788] hover:underline">
                See all organizations →
              </Link>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-5">
              <h3 className="text-[15px] font-extrabold text-[#0F2140] mb-3">Account Settings</h3>
              <div className="flex flex-col gap-1">
                {['Edit Profile', 'Notification Preferences', 'Privacy Settings', 'Change Password', 'Linked Accounts'].map(item => (
                  <button key={item} className="flex items-center justify-between py-2.5 text-[13px] font-semibold text-[#0F2140] hover:text-[#2DB8A8] border-b border-[#F4F8FC] last:border-0 transition-colors">
                    {item} <ChevronRight size={14} className="text-[#8A9BB0]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
