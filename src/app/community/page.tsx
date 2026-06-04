import Link from 'next/link'
import { Edit } from 'lucide-react'

const EVENTS = [
  { month: 'JUN', day: '14', type: 'Adoption Event', title: 'Chicago Summer Adoption Fair', desc: '50+ dogs and cats looking for homes. Midwest Animal Shelter · Lincoln Park, Chicago' },
  { month: 'JUN', day: '21', type: 'Community Walk', title: 'FurFinds Paws on the Trail', desc: 'A 5K dog walk for shelter fundraising. Lakefront Trail, Chicago' },
  { month: 'JUL', day: '05', type: 'Workshop', title: 'Know Your Rights: ESA & Service Animals', desc: 'Free online workshop on housing and travel rights. Virtual event.' },
]

const STORIES = [
  { color: '#D4E8E8', tag: 'Travel', title: 'Road-tripping from Chicago to Portland with Two Huskies', desc: 'Every stop verified on FurFinds. Here\'s our exact route, where we stayed, and what surprised us.', initials: 'JS', avatarColor: '#D4E8E8', author: 'Jamie S.', date: 'May 2026' },
  { color: '#E8D4E8', tag: 'Housing', title: 'How I Found a No-Breed-Restriction Apartment in NYC', desc: 'With a 70 lb Rottweiler, I thought I was out of options. FurFinds Housing changed everything.', initials: 'LP', avatarColor: '#E8D4E8', author: 'Lena P.', date: 'April 2026' },
  { color: '#E8E8D4', tag: 'ESA', title: 'Getting My ESA Certified and What Changed', desc: 'The process, the resources I used, and which businesses actually honor ESA documentation.', initials: 'MK', avatarColor: '#E8E8D4', author: 'Marcus K.', date: 'March 2026' },
]

export default function CommunityPage() {
  return (
    <div>
      <section className="bg-[#0F2140] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3">Community</span>
          <h1 className="text-white text-[clamp(32px,5vw,52px)] font-extrabold tracking-tight mb-4">Stories from pet families like yours.</h1>
          <p className="text-white/60 text-[17px] max-w-[560px] leading-relaxed">Real experiences, upcoming events, and a place for the pet-loving community to connect.</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Events */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-extrabold text-[#0F2140] tracking-tight">Upcoming Adoption & Pet Events</h2>
          <Link href="/impact" className="text-[#2DB8A8] text-[14px] font-semibold hover:underline">See all events →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {EVENTS.map(e => (
            <div key={e.title} className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-5 flex gap-4 items-start">
              <div className="bg-[#F4F8FC] rounded-xl px-3 py-2 text-center flex-shrink-0 min-w-[52px]">
                <span className="block text-[10px] font-extrabold uppercase text-[#2DB8A8] tracking-widest">{e.month}</span>
                <span className="block text-[28px] font-extrabold text-[#0F2140] leading-none">{e.day}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase text-[#2DB8A8] tracking-[0.5px] mb-1">{e.type}</span>
                <h3 className="text-[15px] font-bold text-[#0F2140] mb-1.5">{e.title}</h3>
                <p className="text-[13px] text-[#8A9BB0] leading-relaxed mb-3">{e.desc}</p>
                <button className="border-[1.5px] border-[#2DB8A8] text-[#2DB8A8] text-[12px] font-semibold px-3 py-1.5 rounded-lg hover:bg-[#2DB8A8] hover:text-white transition-all duration-150">RSVP</button>
              </div>
            </div>
          ))}
        </div>

        {/* Stories */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-extrabold text-[#0F2140] tracking-tight">Community Stories</h2>
          <button className="inline-flex items-center gap-1.5 text-[#2DB8A8] text-[14px] font-semibold hover:underline">
            Share your story <Edit size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORIES.map(s => (
            <div key={s.title} className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
              <div className="h-[160px]" style={{ background: s.color }} />
              <div className="p-5">
                <span className="block text-[11px] font-bold uppercase text-[#2DB8A8] tracking-[0.5px] mb-1.5">{s.tag}</span>
                <h3 className="text-[16px] font-bold text-[#0F2140] mb-2 leading-snug">{s.title}</h3>
                <p className="text-[13px] text-[#8A9BB0] leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-[#0F2140]" style={{ background: s.avatarColor }}>{s.initials}</div>
                  <span className="text-[12px] text-[#8A9BB0]">{s.author} · {s.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
