import Link from 'next/link'
import { Search, MapPin, Grid2x2, ArrowRight, ShieldCheck, Award, Shield, Check, Map, Heart } from 'lucide-react'
import BizCard from '@/components/BizCard'
import TierBadge from '@/components/TierBadge'

const CATEGORIES = [
  { label: 'Hotels & Lodging', icon: '🏨' },
  { label: 'Restaurants', icon: '🍽️' },
  { label: 'Groomers', icon: '✂️' },
  { label: 'Vets & Clinics', icon: '🩺' },
  { label: 'Pet-Friendly Housing', icon: '🏠' },
  { label: 'Shelters & Rescues', icon: '🐾' },
  { label: 'Transportation', icon: '🚗' },
  { label: 'Training & Daycare', icon: '🎓' },
  { label: 'Pet Retail', icon: '🛍️' },
  { label: 'Service Animal Resources', icon: '🦮' },
]

const FEATURED = [
  { slug: 'the-bark-hotel', name: 'The Bark Hotel', category: 'Hotel & Lodging', location: 'Chicago, IL', tier: 'Pet-Inclusive' as const, rating: 5, reviewCount: 84, snippet: 'Dog beds in every room, on-site dog spa, and a dedicated dog park. No size limits, no pet fees.', tags: ['Dogs', 'Cats', 'No Fee', 'No Size Limit'], bgColor: '#D4E8E8' },
  { slug: 'patio-bites-cafe', name: 'Patio Bites Café', category: 'Restaurant', location: 'Austin, TX', tier: 'Pet-Friendly' as const, rating: 4, reviewCount: 51, snippet: 'Massive dog-friendly patio, water bowls on arrival, and a doggy snack menu.', tags: ['Dogs', 'Patio Seating'], bgColor: '#E8F0D4' },
  { slug: 'pawsome-grooming', name: 'Pawsome Grooming Co.', category: 'Groomer', location: 'Seattle, WA', tier: 'Pet-Inclusive' as const, rating: 5, reviewCount: 127, snippet: 'Cage-free, fear-free grooming. Certified Fear Free groomers and a calming environment.', tags: ['Dogs', 'Cats', 'Fear-Free'], bgColor: '#E8D4E8' },
]

const TESTIMONIALS = [
  { quote: '"FurFinds saved our road trip. Every stop was verified — no awkward "sorry, no dogs" moments at check-in."', name: 'Maya S.', meta: 'Denver, CO · 2 dogs', initials: 'MS', color: '#D4E8E8' },
  { quote: '"I have a service dog. The Service Animal Resources filter is a game-changer. I know my rights before I walk in the door."', name: 'James R.', meta: 'Atlanta, GA · Service dog handler', initials: 'JR', color: '#E8D4D4' },
  { quote: '"I found my apartment through FurFinds Housing. No secret pet fees, no surprises. My landlord has a verified badge."', name: 'Anika K.', meta: 'Portland, OR · 1 cat', initials: 'AK', color: '#D4D4E8' },
]

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg,#0F2140 0%,#1B4060 45%,#0F4050 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(45,184,168,0.15) 0%, transparent 70%)' }} />
        <div className="max-w-[1200px] mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#2DB8A8] px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest mb-6">
              Trusted by 12,000+ pet owners
            </div>
            <h1 className="text-white text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.1] tracking-tight mb-5">
              Find places that truly<br />
              <span className="text-[#2DB8A8]">welcome your pet.</span>
            </h1>
            <p className="text-white/65 text-[17px] leading-relaxed mb-8 max-w-[520px]">
              FurFinds verifies pet-friendly businesses so you never have to guess. From hotels to restaurants, groomers to housing — every listing is reviewed, rated, and real.
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-2xl flex flex-col sm:flex-row items-stretch overflow-hidden shadow-2xl mb-4">
              <label className="flex items-center gap-3 px-5 py-3.5 flex-1 min-w-0">
                <MapPin size={18} className="text-[#8A9BB0] flex-shrink-0" />
                <input type="text" placeholder="City, zip, or neighborhood" className="flex-1 border-none outline-none text-[14px] text-[#0F2140] placeholder:text-[#8A9BB0] bg-transparent min-w-0" />
              </label>
              <div className="hidden sm:block w-px bg-[#E4EAF0] self-stretch" />
              <label className="flex items-center gap-3 px-5 py-3.5 flex-1 min-w-0">
                <Grid2x2 size={18} className="text-[#8A9BB0] flex-shrink-0" />
                <input type="text" placeholder="Category — Hotel, Restaurant…" className="flex-1 border-none outline-none text-[14px] text-[#0F2140] placeholder:text-[#8A9BB0] bg-transparent min-w-0" />
              </label>
              <Link href="/explore" className="flex items-center justify-center gap-2 bg-[#2DB8A8] text-white font-bold text-[14px] px-6 py-4 hover:bg-[#1E9E90] transition-colors duration-150 flex-shrink-0 sm:rounded-none rounded-none">
                <Search size={16} /> Search
              </Link>
            </div>
            <p className="text-white/45 text-[13px]">
              Popular:{' '}
              <Link href="/explore" className="text-white/70 underline underline-offset-2 mr-2 hover:text-white">Dog-Friendly Restaurants</Link>
              <Link href="/explore" className="text-white/70 underline underline-offset-2 mr-2 hover:text-white">Pet-Friendly Hotels</Link>
              <Link href="/explore" className="text-white/70 underline underline-offset-2 hover:text-white">Emergency Vets</Link>
            </p>
          </div>

          {/* Right — floating cards */}
          <div className="hidden lg:block relative h-[320px]">
            <div className="absolute top-5 left-0 bg-white rounded-2xl p-4 shadow-2xl w-[190px]">
              <TierBadge tier="Pet-Inclusive" size="sm" />
              <div className="mt-2 font-bold text-[#0F2140] text-[14px]">The Bark Hotel</div>
              <div className="text-[12px] text-[#8A9BB0]">Chicago, IL</div>
            </div>
            <div className="absolute top-[110px] right-0 bg-white rounded-2xl p-4 shadow-2xl w-[185px]">
              <TierBadge tier="Pet-Friendly" size="sm" />
              <div className="mt-2 font-bold text-[#0F2140] text-[14px]">Patio Bites Café</div>
              <div className="text-[12px] text-[#8A9BB0]">Austin, TX</div>
            </div>
            <div className="absolute bottom-5 left-10 bg-white rounded-2xl px-3 py-2.5 shadow-2xl flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#2DB8A8]" />
              <span className="text-[12px] font-semibold text-[#0F2140]">Verified 2 days ago</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-7 border-b border-[#E4EAF0] bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex gap-2.5 overflow-x-auto pb-1 flex-wrap">
            {CATEGORIES.map(c => (
              <Link key={c.label} href="/explore" className="flex items-center gap-2 px-4 py-2.5 rounded-full border-[1.5px] border-[#E4EAF0] text-[13px] font-semibold text-[#8A9BB0] hover:border-[#2DB8A8] hover:text-[#2DB8A8] hover:bg-[#E8F8F6] transition-all duration-150 whitespace-nowrap bg-white">
                <span>{c.icon}</span> {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tier Explainer ── */}
      <section className="py-24 bg-[#F4F8FC]">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3">How FurFinds Verification Works</span>
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-extrabold text-[#0F2140] tracking-tight mb-3">Not all "pet-friendly" is the same.</h2>
          <p className="text-[16px] text-[#8A9BB0] max-w-[560px] leading-relaxed mb-12">We verify what businesses actually offer so you know what to expect before you arrive.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: 'Pet-Inclusive' as const, icon: Award, color: '#7B5EA7', borderColor: 'rgba(123,94,167,0.25)', desc: 'The gold standard. Dedicated amenities, trained staff, no breed or size restrictions, and a genuine pet-first culture.', features: ['On-site pet amenities (beds, bowls, treats)', 'Pet-trained staff', 'Written pet policies published', 'No breed or size restrictions', 'Annual re-verification'] },
              { tier: 'Pet-Friendly' as const, icon: ShieldCheck, color: '#2DB8A8', borderColor: 'rgba(45,184,168,0.25)', desc: 'Actively welcoming. Clear pet policies, pet-specific spaces or services, and a positive track record from our community.', features: ['Designated pet areas', 'Clear written pet policy', 'Staff aware of pet needs', 'Community-verified reviews', 'Bi-annual check-in'] },
              { tier: 'Pets-Allowed' as const, icon: Shield, color: '#F4A261', borderColor: 'rgba(244,162,97,0.25)', desc: 'The entry point. Pets are permitted but restrictions may apply. Always worth calling ahead.', features: ['Pets permitted on premises', 'Basic policy on file', 'May have breed/size limits', 'No dedicated pet spaces', 'Self-reported, pending review'] },
            ].map(({ tier, icon: Icon, color, borderColor, desc, features }) => (
              <div key={tier} className="bg-white rounded-2xl p-8 border-2 hover:-translate-y-1 hover:shadow-xl transition-all duration-200" style={{ borderColor }}>
                <div className="flex items-center gap-2 mb-4" style={{ color }}>
                  <Icon size={22} />
                  <span className="font-extrabold text-[15px] uppercase tracking-widest">{tier}</span>
                </div>
                <p className="text-[14px] text-[#8A9BB0] leading-relaxed mb-5">{desc}</p>
                <ul className="flex flex-col gap-2.5">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-[#2D3748]">
                      <Check size={14} className="text-[#2DB8A8] flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/verify" className="inline-flex items-center gap-2 border-2 border-[#2DB8A8] text-[#2DB8A8] font-bold text-[14px] px-6 py-3 rounded-lg hover:bg-[#2DB8A8] hover:text-white transition-all duration-150">
              Is your business pet-friendly? Apply for verification
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#0F2140] py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[['8,400+', 'Verified Businesses'], ['47', 'States Covered'], ['12,000+', 'Community Members'], ['96%', 'Accuracy Rate']].map(([num, label]) => (
              <div key={label}>
                <div className="text-[clamp(36px,4vw,52px)] font-extrabold text-white leading-none mb-2">{num}</div>
                <div className="text-[14px] text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-2">Featured</span>
              <h2 className="text-[clamp(20px,2.5vw,30px)] font-extrabold text-[#0F2140] tracking-tight">Highly rated near you</h2>
            </div>
            <Link href="/explore" className="flex items-center gap-1.5 text-[#2DB8A8] text-[14px] font-semibold hover:underline">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED.map(b => <BizCard key={b.slug} {...b} />)}
          </div>
        </div>
      </section>

      {/* ── Map Preview ── */}
      <section className="py-24 bg-[#F4F8FC]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3">Explore the Map</span>
              <h2 className="text-[clamp(20px,2.5vw,30px)] font-extrabold text-[#0F2140] tracking-tight mb-4">Pet-friendly places near you, at a glance.</h2>
              <p className="text-[16px] text-[#8A9BB0] leading-relaxed mb-8">See verified businesses on an interactive map. Filter by tier, category, or amenities. Never wonder if your pet is welcome again.</p>
              <Link href="/explore" className="inline-flex items-center gap-2 bg-[#2DB8A8] text-white font-bold text-[14px] px-6 py-3 rounded-lg hover:bg-[#1E9E90] transition-colors duration-150">
                Open the Map <Map size={16} />
              </Link>
            </div>
            <div className="relative bg-[#E4EAF0] rounded-2xl h-[320px] shadow-md overflow-hidden flex items-center justify-center">
              <div className="absolute top-[25%] left-[40%] text-[#2DB8A8]"><MapPin size={28} fill="#2DB8A8" /></div>
              <div className="absolute top-[50%] left-[60%] text-[#7B5EA7]"><MapPin size={24} fill="#7B5EA7" /></div>
              <div className="absolute top-[65%] left-[25%] text-[#F4A261]"><MapPin size={24} fill="#F4A261" /></div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full text-[12px] font-semibold text-[#8A9BB0] shadow">Interactive map in Explore</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3 text-center">What pet owners are saying</span>
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-extrabold text-[#0F2140] tracking-tight mb-12 text-center">Real stories from real pet families.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-7 border-[1.5px] border-[#E4EAF0] relative">
                <span className="absolute top-4 right-5 text-[56px] text-[#E8F8F6] font-serif leading-none select-none">"</span>
                <p className="text-[14px] italic text-[#2D3748] leading-relaxed mb-6">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-[#0F2140]" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="text-[13px] font-bold text-[#0F2140]">{t.name}</div>
                    <div className="text-[12px] text-[#8A9BB0]">{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Strip ── */}
      <section className="py-10 bg-[#E8F8F6] border-y border-[#2DB8A8]/20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <Heart size={28} className="text-[#52B788] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[18px] font-bold text-[#0F2140] mb-1">FurFinds Gives Back</strong>
                <p className="text-[14px] text-[#8A9BB0] max-w-[520px]">We partner with shelters and rescues to help more animals find homes. Free profiles, adoption listings, and volunteer matching — all in one place.</p>
              </div>
            </div>
            <Link href="/impact" className="flex-shrink-0 bg-[#52B788] text-white font-bold text-[14px] px-6 py-3 rounded-lg hover:bg-[#3da070] transition-colors duration-150 whitespace-nowrap">
              Learn about our impact
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg,#0F2140,#1B4060)' }}>
        <div className="max-w-[560px] mx-auto px-6 text-center">
          <h3 className="text-white text-[28px] font-extrabold tracking-tight mb-3">Stay in the loop, paw parent.</h3>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">New verified businesses, community stories, and adoption events — delivered weekly.</p>
          <div className="flex overflow-hidden rounded-xl bg-white max-w-[440px] mx-auto mb-3">
            <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3.5 text-[14px] outline-none border-none text-[#0F2140] placeholder:text-[#8A9BB0] bg-transparent" />
            <button className="bg-[#2DB8A8] text-white font-bold text-[14px] px-6 py-3.5 hover:bg-[#1E9E90] transition-colors duration-150 flex-shrink-0">Subscribe</button>
          </div>
          <p className="text-white/35 text-[12px]">No spam. Unsubscribe anytime. We love pets, not inboxes.</p>
        </div>
      </section>
    </div>
  )
}
