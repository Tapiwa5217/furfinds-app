'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Phone, Globe, Clock, Navigation, Bookmark, CheckCircle, Flag, Award } from 'lucide-react'
import TierBadge from '@/components/TierBadge'
import PawRating from '@/components/PawRating'

const TABS = ['Overview', 'Pet Policy', 'Reviews', 'Photos']

const AMENITIES = [
  { icon: '🛏️', label: 'Dog beds in every room' },
  { icon: '💧', label: 'Water bowls provided' },
  { icon: '✂️', label: 'On-site pet spa' },
  { icon: '🌿', label: 'Fenced dog run' },
  { icon: '🍽️', label: 'Pet-friendly restaurant' },
  { icon: '🩺', label: 'Pet first-aid trained staff' },
  { icon: '💰', label: 'No pet fees' },
  { icon: '✅', label: 'All breeds welcome' },
]

const POLICY_ROWS = [
  ['Allowed Pets', 'Dogs, Cats, Small caged animals'],
  ['Size Limit', 'None — all sizes welcome'],
  ['Breed Restrictions', 'None'],
  ['Max Pets per Room', 'Up to 3 pets'],
  ['Pet Fee', 'No additional fee'],
  ['Pet Deposit', 'None required'],
  ['Pets Left Unattended', 'Allowed with provided crate'],
  ['Service Animals', 'Always welcome — ADA compliant'],
  ['ESA Policy', 'Welcome with documentation'],
]

const REVIEWS = [
  { initials: 'MS', color: '#D4E8E8', name: 'Maya S.', date: 'April 2026 · Verified stay', body: '"I\'ve stayed at dozens of \'pet-friendly\' hotels. This is the first one that actually meant it. Dog bed, treats on arrival, staff who know your dog\'s name by checkout."' },
  { initials: 'TR', color: '#E8D4D4', name: 'Tom R.', date: 'March 2026 · Verified stay', body: '"Brought our 110 lb Great Dane — no raised eyebrows, no extra charges, no restrictions. Just a warm welcome and a very happy dog."' },
]

export default function BusinessProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div>
      {/* Back */}
      <div className="max-w-[1200px] mx-auto px-6 pt-6">
        <Link href="/explore" className="inline-flex items-center gap-1.5 text-[#2DB8A8] text-[13px] font-semibold hover:underline">
          <ArrowLeft size={15} /> Back to results
        </Link>
      </div>

      {/* Gallery */}
      <div className="max-w-[1200px] mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-2 h-[380px]">
          <div className="rounded-l-2xl lg:rounded-l-2xl rounded-r-none bg-[#C4D8D8]" />
          <div className="hidden lg:grid grid-rows-4 gap-2">
            <div className="bg-[#B4C8C8] rounded-none" />
            <div className="bg-[#A4B8B8] rounded-none" />
            <div className="bg-[#94A8A8] rounded-none" />
            <div className="bg-[#0F2140]/50 rounded-r-2xl flex items-center justify-center text-white font-bold text-[14px] cursor-pointer hover:bg-[#0F2140]/60 transition-colors">+8 photos</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1200px] mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 pb-20">
        {/* Main content */}
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <div className="text-[11px] font-bold text-[#2DB8A8] uppercase tracking-[0.5px] mb-1">Hotel & Lodging · Chicago, IL</div>
              <h1 className="text-[32px] font-extrabold text-[#0F2140] tracking-tight mb-2">The Bark Hotel</h1>
              <PawRating rating={5} count={84} size="md" />
            </div>
            <div className="text-right">
              <TierBadge tier="Pet-Inclusive" size="lg" />
              <div className="text-[12px] text-[#8A9BB0] mt-2">Verified June 2025 · Next review: June 2026</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b-2 border-[#E4EAF0] mb-8">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-[14px] font-semibold border-b-[3px] -mb-[2px] transition-colors duration-150
                  ${activeTab === tab ? 'text-[#2DB8A8] border-[#2DB8A8]' : 'text-[#8A9BB0] border-transparent hover:text-[#0F2140]'}`}
              >
                {tab}{tab === 'Reviews' ? ' (84)' : ''}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === 'Overview' && (
            <div>
              <h2 className="text-[22px] font-bold text-[#0F2140] mb-4">About The Bark Hotel</h2>
              <p className="text-[15px] text-[#8A9BB0] leading-relaxed mb-4">The Bark Hotel is Chicago's premier pet-inclusive boutique hotel. We believe your pet is family — and family doesn't wait in the car. Every room is equipped with a dog bed, water bowl, and a welcome treat bag. Our staff is trained in pet first aid and hospitality.</p>
              <p className="text-[15px] text-[#8A9BB0] leading-relaxed mb-8">Our on-site amenities include a fenced dog run, a pet spa offering baths and grooming, and a dedicated pet menu at our restaurant. We accommodate all breeds and sizes — no restrictions, no judgment.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {AMENITIES.map(a => (
                  <div key={a.label} className="flex items-center gap-2.5 bg-[#F4F8FC] rounded-xl p-3 text-[13px] text-[#2D3748]">
                    <span className="text-[18px]">{a.icon}</span> {a.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pet Policy */}
          {activeTab === 'Pet Policy' && (
            <div>
              <h2 className="text-[22px] font-bold text-[#0F2140] mb-5">Pet Policy</h2>
              <div className="rounded-xl overflow-hidden border-[1.5px] border-[#E4EAF0]">
                {POLICY_ROWS.map(([k, v], i) => (
                  <div key={k} className={`grid grid-cols-[180px_1fr] gap-4 px-5 py-4 text-[14px] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F4F8FC]'}`}>
                    <span className="text-[#8A9BB0]">{k}</span>
                    <strong className="text-[#0F2140] font-semibold">{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'Reviews' && (
            <div>
              <div className="flex items-center gap-8 bg-[#F4F8FC] rounded-xl p-6 mb-7">
                <div className="text-[64px] font-extrabold text-[#0F2140] leading-none">5.0</div>
                <div className="flex-1 flex flex-col gap-1.5">
                  {[5,4,3,2,1].map(s => (
                    <div key={s} className="flex items-center gap-2 text-[12px] text-[#8A9BB0]">
                      <span className="w-10 text-right">{s} paws</span>
                      <div className="flex-1 h-2 bg-[#E4EAF0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2DB8A8] rounded-full" style={{ width: s === 5 ? '87%' : s === 4 ? '10%' : '3%' }} />
                      </div>
                      <span className="w-6">{s === 5 ? 73 : s === 4 ? 8 : s === 3 ? 2 : 0}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {REVIEWS.map(r => (
                  <div key={r.name} className="border-[1.5px] border-[#E4EAF0] rounded-xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-[#0F2140] flex-shrink-0" style={{ background: r.color }}>{r.initials}</div>
                      <div>
                        <div className="font-bold text-[14px] text-[#0F2140]">{r.name}</div>
                        <PawRating rating={5} size="sm" />
                        <div className="text-[12px] text-[#8A9BB0] mt-0.5">{r.date}</div>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#8A9BB0] leading-relaxed italic">{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          {activeTab === 'Photos' && (
            <div className="grid grid-cols-3 gap-3">
              {['#D4E8E8','#C4D8D8','#B4C8C8','#A4B8B8','#94A8A8','#8498A8'].map((c, i) => (
                <div key={i} className="aspect-[16/10] rounded-xl" style={{ background: c }} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
            <h3 className="text-[16px] font-bold text-[#0F2140] mb-5">Plan your visit</h3>
            {[
              { Icon: MapPin, text: '123 N. Wabash Ave, Chicago, IL 60601' },
              { Icon: Phone, text: '(312) 555-0198' },
              { Icon: Globe, text: 'thebarkhotel.com' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-start gap-3 text-[13px] text-[#2D3748] mb-3">
                <Icon size={15} className="text-[#2DB8A8] flex-shrink-0 mt-0.5" />
                <span>{text}</span>
              </div>
            ))}
            <div className="border-t border-[#F4F8FC] pt-4 mt-1 mb-4">
              <div className="flex items-center gap-2 text-[13px] text-[#0F2140] font-bold mb-2"><Clock size={14} className="text-[#2DB8A8]" /> Hours</div>
              {[['Mon–Fri', '24 hrs (hotel)'],['Sat–Sun', '24 hrs (hotel)']].map(([d, h]) => (
                <div key={d} className="flex justify-between text-[13px] text-[#8A9BB0] py-1"><span>{d}</span><span>{h}</span></div>
              ))}
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-[#2DB8A8] text-white font-bold text-[14px] py-3 rounded-xl hover:bg-[#1E9E90] transition-colors duration-150 mb-2">
              <Navigation size={15} /> Get Directions
            </button>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-[#E4EAF0] text-[#0F2140] font-bold text-[14px] py-3 rounded-xl hover:border-[#2DB8A8] transition-colors duration-150">
              <Bookmark size={15} /> Save to List
            </button>
          </div>

          <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
            <h3 className="text-[16px] font-bold text-[#0F2140] mb-4">Quick Pet Summary</h3>
            {['All sizes welcome', 'No breed restrictions', 'No pet fee', 'Cats allowed', 'Service animals (ADA)', 'ESA accepted'].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-[13px] text-[#2D3748] py-2">
                <CheckCircle size={15} className="text-[#52B788] flex-shrink-0" /> {item}
              </div>
            ))}
          </div>

          <div className="bg-[#F4F8FC] rounded-2xl border-[1.5px] border-[#E4EAF0] p-4 text-center">
            <p className="text-[13px] text-[#8A9BB0] mb-2">Something wrong with this listing?</p>
            <button className="inline-flex items-center gap-1.5 text-[#2DB8A8] text-[12px] font-semibold">
              <Flag size={13} /> Report an issue
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
