import { ShieldCheck, Heart, Users, Leaf } from 'lucide-react'

const VALUES = [
  { Icon: ShieldCheck, color: '#2DB8A8', title: 'Honesty above all', desc: 'We verify before we list. No pay-to-play. A bad experience gets the same visibility as a great one.' },
  { Icon: Heart, color: '#52B788', title: 'Pets are family', desc: 'We design every feature as if the pet in question is our own. That changes decisions.' },
  { Icon: Users, color: '#F4A261', title: 'Community first', desc: 'Our best data comes from real pet owners. We protect and amplify community voices.' },
  { Icon: Leaf, color: '#52B788', title: 'Social impact matters', desc: 'Every dollar we make should move animals closer to homes and communities closer to being pet-welcoming.' },
]

const TEAM = [
  { initials: 'AJ', color: '#D4E8E8', name: 'Alex Jordan', role: 'Co-Founder & CEO', bio: 'Former hospitality consultant. Dog parent to Biscuit (Labrador, 9) and Mochi (Shih Tzu, 4).' },
  { initials: 'RM', color: '#E8D4E8', name: 'Riley Mok', role: 'Co-Founder & CTO', bio: 'Full-stack engineer. Cat parent to Pixel and Dot. Designed the FurFinds verification algorithm.' },
  { initials: 'SK', color: '#D4E8D8', name: 'Simone K.', role: 'Head of Partnerships', bio: 'Shelter advocate with 8 years in nonprofit fundraising. Manages FurFinds Gives Back.' },
  { initials: 'NP', color: '#E8E8D4', name: 'Noah P.', role: 'Head of Community', bio: 'Service dog handler and disability rights advocate. Leads our service animal resource initiative.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0F2140] py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3">Our Story</span>
            <h1 className="text-white text-[clamp(32px,5vw,52px)] font-extrabold tracking-tight mb-5">We built this because we needed it.</h1>
            <p className="text-white/60 text-[16px] leading-relaxed mb-4">FurFinds started after our founder — traveling with a 9-year-old Labrador — got turned away from three hotels in a row. Each one said "pet-friendly" online. None of them were.</p>
            <p className="text-white/60 text-[16px] leading-relaxed">We built the verification platform we wished existed: honest, thorough, and built for pet owners — not marketing departments.</p>
          </div>
          <div className="rounded-2xl min-h-[280px] hidden lg:block" style={{ background: 'linear-gradient(135deg,#D4E8E8,#B0D0D0)' }} />
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3 text-center">What we believe</span>
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-extrabold text-[#0F2140] tracking-tight mb-12 text-center">Our values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ Icon, color, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
                <Icon size={28} className="mb-4" style={{ color }} />
                <h3 className="text-[16px] font-bold text-[#0F2140] mb-2">{title}</h3>
                <p className="text-[13px] text-[#8A9BB0] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-[#F4F8FC]">
        <div className="max-w-[1200px] mx-auto">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3 text-center">The team</span>
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-extrabold text-[#0F2140] tracking-tight mb-12 text-center">Built by pet people, for pet people.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({ initials, color, name, role, bio }) => (
              <div key={name} className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-7 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-[18px] font-extrabold text-[#0F2140] mx-auto mb-4" style={{ background: color }}>{initials}</div>
                <strong className="block text-[16px] text-[#0F2140] mb-0.5">{name}</strong>
                <span className="block text-[11px] font-bold uppercase tracking-[0.5px] text-[#2DB8A8] mb-3">{role}</span>
                <p className="text-[13px] text-[#8A9BB0] leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
