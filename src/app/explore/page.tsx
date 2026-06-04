'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Grid2x2, LayoutList, LayoutGrid, X } from 'lucide-react'
import TierBadge from '@/components/TierBadge'
import PawRating from '@/components/PawRating'

type Tier = 'Pet-Inclusive' | 'Pet-Friendly' | 'Pets-Allowed'

const LISTINGS = [
  { slug: 'the-bark-hotel', name: 'The Bark Hotel', category: 'Hotel & Lodging', distance: '1.2 mi', tier: 'Pet-Inclusive' as Tier, rating: 5, count: 84, desc: 'Dog beds in every room, on-site dog spa, and a dedicated dog park. No size limits. No pet fees. Pure luxury for you and your four-legged co-pilot.', tags: ['Dogs', 'Cats', 'No Fee', 'No Size Limit'], bgColor: '#D4E8E8' },
  { slug: 'city-paws-vet', name: 'City Paws Veterinary', category: 'Vet & Clinic', distance: '0.8 mi', tier: 'Pet-Inclusive' as Tier, rating: 5, count: 203, desc: 'Fear-free certified practice. Separate cat and dog waiting areas, same-day emergency appointments, and a warm, stress-free environment.', tags: ['Dogs', 'Cats', 'Fear-Free', 'Emergency'], bgColor: '#D4D4E8' },
  { slug: 'patio-bites-cafe', name: 'Patio Bites Café', category: 'Restaurant', distance: '2.1 mi', tier: 'Pet-Friendly' as Tier, rating: 4, count: 51, desc: 'Massive dog-friendly patio, water bowls on arrival, and a doggy snack menu. Great brunch spot for the whole family.', tags: ['Dogs', 'Outdoor Seating'], bgColor: '#E8F0D4' },
  { slug: 'midwest-animal-shelter', name: 'Midwest Animal Shelter', category: 'Shelter & Rescue', distance: '3.4 mi', tier: 'Pet-Friendly' as Tier, rating: 5, count: 312, desc: 'No-kill shelter with 240+ animals available for adoption. Hosting adoption events every Saturday. Open to volunteers.', tags: ['Adoptions', 'Volunteering', 'FurFinds Partner'], bgColor: '#D4E8D8', nonprofit: true },
  { slug: 'pawsome-grooming', name: 'Pawsome Grooming Co.', category: 'Groomer', distance: '1.8 mi', tier: 'Pet-Inclusive' as Tier, rating: 5, count: 127, desc: 'Cage-free, fear-free grooming. Certified Fear Free groomers and a calming, stress-free environment for every pet.', tags: ['Dogs', 'Cats', 'Fear-Free'], bgColor: '#E8D4E8' },
  { slug: 'bark-avenue-daycare', name: 'Bark Avenue Daycare', category: 'Daycare & Boarding', distance: '2.7 mi', tier: 'Pet-Friendly' as Tier, rating: 4, count: 89, desc: 'Supervised play groups, webcam access, and individualized care for dogs of all sizes and temperaments.', tags: ['Dogs', 'Webcam', 'Play Groups'], bgColor: '#E8E8D4' },
]

const ACTIVE_FILTERS = ['Pet-Inclusive', 'Pet-Friendly', 'Dogs', '4+ paws']

export default function ExplorePage() {
  const [view, setView] = useState<'list' | 'grid'>('list')

  return (
    <div>
      {/* Hero search bar */}
      <section className="bg-[#0F2140] py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-white text-[32px] font-extrabold tracking-tight mb-6">Explore Pet-Friendly Places</h1>
          <div className="flex flex-col sm:flex-row items-stretch bg-white/10 border border-white/15 rounded-2xl overflow-hidden max-w-[720px]">
            <label className="flex items-center gap-3 px-5 py-3.5 flex-1 min-w-0">
              <MapPin size={17} className="text-white/50 flex-shrink-0" />
              <input defaultValue="Chicago, IL" className="flex-1 bg-transparent border-none outline-none text-[14px] text-white placeholder:text-white/40" />
            </label>
            <div className="hidden sm:block w-px bg-white/15 self-stretch" />
            <label className="flex items-center gap-3 px-5 py-3.5 flex-1 min-w-0">
              <Grid2x2 size={17} className="text-white/50 flex-shrink-0" />
              <select className="flex-1 bg-transparent border-none outline-none text-[14px] text-white appearance-none">
                <option className="text-black">All Categories</option>
                <option className="text-black">Hotels & Lodging</option>
                <option className="text-black">Restaurants</option>
                <option className="text-black">Groomers</option>
                <option className="text-black">Vets & Clinics</option>
                <option className="text-black">Housing</option>
                <option className="text-black">Shelters & Rescues</option>
              </select>
            </label>
            <button className="bg-[#2DB8A8] text-white font-bold text-[14px] px-6 py-4 flex items-center justify-center gap-2 hover:bg-[#1E9E90] transition-colors duration-150 flex-shrink-0">
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-7 items-start">

        {/* Filters sidebar */}
        <aside className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6 sticky top-[84px]">
          <div className="flex justify-between items-center mb-6">
            <strong className="text-[15px] font-bold text-[#0F2140]">Filters</strong>
            <button className="text-[12px] text-[#2DB8A8] font-semibold">Clear all</button>
          </div>

          {[
            { label: 'Verification Tier', items: [
              { label: 'Pet-Inclusive', dot: '#7B5EA7', checked: true },
              { label: 'Pet-Friendly', dot: '#2DB8A8', checked: true },
              { label: 'Pets-Allowed', dot: '#F4A261', checked: false },
            ]},
            { label: 'Pet Type', items: [
              { label: 'Dogs', checked: true },
              { label: 'Cats', checked: false },
              { label: 'Small Animals', checked: false },
              { label: 'Service Animals', checked: false },
              { label: 'ESA', checked: false },
            ]},
            { label: 'Amenities', items: [
              { label: 'No Size Restrictions', checked: false },
              { label: 'No Pet Fee', checked: false },
              { label: 'Fear-Free Certified', checked: false },
              { label: 'Outdoor Space', checked: false },
            ]},
          ].map(group => (
            <div key={group.label} className="mb-6 pb-6 border-b border-[#F4F8FC] last:border-b-0 last:pb-0 last:mb-0">
              <div className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#8A9BB0] mb-3">{group.label}</div>
              {group.items.map(item => (
                <label key={item.label} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="accent-[#2DB8A8] w-[15px] h-[15px]" />
                  {('dot' in item) && (
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: (item as {dot: string}).dot }} />
                  )}
                  <span className="text-[13px] text-[#2D3748]">{item.label}</span>
                </label>
              ))}
            </div>
          ))}

          <div className="mb-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#8A9BB0] mb-3">Distance</div>
            {['Within 5 miles', 'Within 15 miles', 'Within 30 miles', 'Any distance'].map((d, i) => (
              <label key={d} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                <input type="radio" name="dist" defaultChecked={i === 0} className="accent-[#2DB8A8]" />
                <span className="text-[13px] text-[#2D3748]">{d}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Results */}
        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-[14px] font-semibold text-[#0F2140] flex-1">142 verified places in Chicago, IL</span>
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#8A9BB0]">Sort by</label>
              <select className="text-[13px] border border-[#E4EAF0] rounded-lg px-3 py-1.5 outline-none text-[#0F2140]">
                <option>Best Match</option>
                <option>Top Rated</option>
                <option>Nearest</option>
                <option>Most Reviewed</option>
              </select>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setView('list')} className={`p-2 rounded-lg border-[1.5px] transition-colors duration-150 ${view === 'list' ? 'border-[#2DB8A8] text-[#2DB8A8]' : 'border-[#E4EAF0] text-[#8A9BB0]'}`}><LayoutList size={16} /></button>
              <button onClick={() => setView('grid')} className={`p-2 rounded-lg border-[1.5px] transition-colors duration-150 ${view === 'grid' ? 'border-[#2DB8A8] text-[#2DB8A8]' : 'border-[#E4EAF0] text-[#8A9BB0]'}`}><LayoutGrid size={16} /></button>
            </div>
          </div>

          {/* Active filter chips */}
          <div className="flex gap-2 flex-wrap mb-5">
            {ACTIVE_FILTERS.map(f => (
              <span key={f} className="inline-flex items-center gap-1.5 bg-[#E8F8F6] text-[#2DB8A8] text-[12px] font-semibold px-3 py-1 rounded-full">
                {f} <button><X size={12} /></button>
              </span>
            ))}
          </div>

          {/* Listings */}
          {view === 'list' ? (
            <div className="flex flex-col gap-4">
              {LISTINGS.map(b => (
                <Link key={b.slug} href={`/business/${b.slug}`} className="group flex gap-4 bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] overflow-hidden hover:border-[#2DB8A8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-[160px] flex-shrink-0 relative hidden sm:block" style={{ background: b.bgColor }}>
                    {b.nonprofit && (
                      <div className="absolute top-2 left-2 bg-[#52B788] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">FREE PROFILE</div>
                    )}
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="text-[11px] font-bold text-[#2DB8A8] uppercase tracking-[0.5px] mb-0.5">{b.category} · {b.distance} away</div>
                        <h3 className="text-[17px] font-bold text-[#0F2140]">{b.name}</h3>
                        <PawRating rating={b.rating} count={b.count} />
                      </div>
                      <TierBadge tier={b.tier} size="sm" />
                    </div>
                    <p className="text-[13px] text-[#8A9BB0] leading-relaxed my-2">{b.desc}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {b.tags.map(t => <span key={t} className="bg-[#F4F8FC] text-[#8A9BB0] text-[11px] font-semibold px-2.5 py-1 rounded-full">{t}</span>)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LISTINGS.map(b => (
                <Link key={b.slug} href={`/business/${b.slug}`} className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] overflow-hidden hover:border-[#2DB8A8] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block">
                  <div className="h-[140px] relative" style={{ background: b.bgColor }}>
                    <div className="absolute top-2 left-2"><TierBadge tier={b.tier} /></div>
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] font-bold text-[#2DB8A8] uppercase tracking-[0.5px] mb-0.5">{b.category}</div>
                    <h3 className="text-[15px] font-bold text-[#0F2140] mb-1">{b.name}</h3>
                    <PawRating rating={b.rating} count={b.count} />
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center pt-10 pb-4">
            <button className="border-2 border-[#2DB8A8] text-[#2DB8A8] font-bold text-[14px] px-8 py-3 rounded-lg hover:bg-[#2DB8A8] hover:text-white transition-all duration-150">Load more results</button>
          </div>
        </div>
      </div>
    </div>
  )
}
