import { Heart, Calendar, Users, DollarSign, Award, Handshake } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  { Icon: Heart, label: 'Adoption Listings', desc: 'Post adoptable animals with photos, bios, and intake info. Connect directly with potential adopters.', color: '#52B788', bg: '#E8F5F0' },
  { Icon: Calendar, label: 'Event Listings', desc: 'List adoption fairs, fundraisers, and volunteer days. FurFinds promotes shelter events to our community.', color: '#52B788', bg: '#E8F5F0' },
  { Icon: Users, label: 'Volunteer Matching', desc: 'Post volunteer needs and connect with community members looking to give their time to animals.', color: '#52B788', bg: '#E8F5F0' },
  { Icon: DollarSign, label: 'Donation Links', desc: 'Accept donations directly through your FurFinds profile. We integrate with all major giving platforms.', color: '#52B788', bg: '#E8F5F0' },
]

const AWARDS = [
  { Icon: Award, label: 'Community Paw Champion', desc: 'Awarded to businesses that go above and beyond for the local pet-owning community.', iconColor: '#F4A261', iconBg: '#FFF8E0' },
  { Icon: Heart, label: 'Shelter Supporter', desc: 'For businesses that actively partner with shelters — hosting adoption events, donating supplies, or fundraising.', iconColor: '#52B788', iconBg: '#F0FAF5' },
  { Icon: Handshake, label: 'FurFinds Impact Partner', desc: 'Our highest nonprofit honor. Businesses and organizations that have materially changed outcomes for animals.', iconColor: '#7B5EA7', iconBg: '#F0F0FF' },
]

export default function ImpactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg,#1a4a2e,#2d7a50)' }}>
        <div className="max-w-[1200px] mx-auto">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-white/70 mb-3">FurFinds Gives Back</span>
          <h1 className="text-white text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight mb-4 max-w-[640px]">Every search supports an animal in need.</h1>
          <p className="text-white/70 text-[17px] max-w-[560px] leading-relaxed">FurFinds is more than a directory. A portion of every business verification fee goes directly to our shelter and rescue partners — because no animal should go without a home.</p>
        </div>
      </section>

      {/* Impact stats */}
      <section className="bg-white border-b border-[#E4EAF0] py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[['3,200+','Animals placed in 2025'],['140','Shelter partners'],['$280K','Donated to rescues'],['820','Active volunteers']].map(([n, l]) => (
              <div key={l}>
                <div className="text-[40px] font-extrabold text-[#52B788] leading-none mb-1">{n}</div>
                <div className="text-[13px] text-[#8A9BB0]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For shelters */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3 text-center">For Shelters & Rescues</span>
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-extrabold text-[#0F2140] tracking-tight mb-4 text-center">Free profiles for every shelter.</h2>
          <p className="text-center text-[#8A9BB0] max-w-[600px] mx-auto mb-12 leading-relaxed">If you're a 501(c)(3) shelter or rescue, your FurFinds profile is completely free — forever. Post adoptable animals, list events, recruit volunteers, and connect with your community.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {FEATURES.map(({ Icon, label, desc, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="text-[16px] font-bold text-[#0F2140] mb-2">{label}</h3>
                <p className="text-[13px] text-[#8A9BB0] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Nonprofit banner */}
          <div className="rounded-2xl border-2 border-[#52B788]/30 p-7" style={{ background: 'linear-gradient(135deg,#E8F8F0,#D0F0E0)' }}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="bg-[#52B788] text-white text-[12px] font-extrabold px-4 py-1.5 rounded-full tracking-widest flex-shrink-0">FREE</div>
              <div className="flex-1 text-center sm:text-left">
                <strong className="block text-[17px] text-[#0F2140] mb-1">Are you a shelter or rescue?</strong>
                <p className="text-[13px] text-[#8A9BB0]">Apply for a free FurFinds nonprofit profile today. Verification is free. Your listing is free. Always.</p>
              </div>
              <Link href="/verify" className="flex-shrink-0 bg-[#52B788] text-white font-bold text-[14px] px-6 py-3 rounded-xl hover:bg-[#3da070] transition-colors duration-150 whitespace-nowrap">
                Apply for Free Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-6 bg-[#F4F8FC]">
        <div className="max-w-[1200px] mx-auto">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3 text-center">FurFinds Awards</span>
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-extrabold text-[#0F2140] tracking-tight mb-12 text-center">Recognizing extraordinary pet advocates.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AWARDS.map(({ Icon, label, desc, iconColor, iconBg }) => (
              <div key={label} className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: iconBg }}>
                  <Icon size={32} style={{ color: iconColor }} />
                </div>
                <strong className="block text-[17px] text-[#0F2140] mb-3">{label}</strong>
                <p className="text-[13px] text-[#8A9BB0] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
