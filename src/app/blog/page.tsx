const FEATURED = {
  tag: 'Guide',
  title: 'The Complete 2026 Guide to Pet-Friendly Travel in the US',
  desc: 'We analyzed 8,400 verified listings and surveyed 1,200 pet owners to build the definitive guide to traveling with your pet — from road trips to flights to finding the right hotel.',
  author: 'FurFinds Team',
  date: 'June 2, 2026',
  read: '12 min read',
}

const POSTS = [
  { color: '#E8D4E8', tag: 'Housing', title: 'Understanding Pet Fees, Deposits, and Your Rights as a Renter', date: 'May 28, 2026', read: '7 min read' },
  { color: '#D4D4E8', tag: 'Service Animals', title: 'ADA vs. ESA: What Businesses Actually Have to Allow', date: 'May 21, 2026', read: '9 min read' },
  { color: '#E8E8D4', tag: 'Adoption', title: '5 Things to Know Before Adopting a Dog in a City Apartment', date: 'May 14, 2026', read: '5 min read' },
  { color: '#D4E8D8', tag: 'Business', title: 'Why Becoming Pet-Inclusive Tripled One Hotel\'s Repeat Bookings', date: 'May 7, 2026', read: '6 min read' },
  { color: '#E8D4D4', tag: 'Wellness', title: 'Fear-Free Certification: What It Means and Why It Matters', date: 'April 30, 2026', read: '5 min read' },
  { color: '#D8D4E8', tag: 'Community', title: 'Meet the Shelter That Placed 400 Animals Last Year with Zero Marketing Budget', date: 'April 23, 2026', read: '8 min read' },
]

export default function BlogPage() {
  return (
    <div>
      <section className="bg-[#0F2140] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3">The FurFinds Journal</span>
          <h1 className="text-white text-[clamp(32px,5vw,52px)] font-extrabold tracking-tight max-w-[640px]">Stories, guides, and insights for pet families.</h1>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Featured */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] overflow-hidden mb-12">
          <div className="min-h-[280px] lg:min-h-0" style={{ background: 'linear-gradient(135deg,#D4E8E8,#A0C8C8)' }} />
          <div className="p-8 lg:p-10">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.8px] text-[#2DB8A8] mb-3">{FEATURED.tag}</span>
            <h2 className="text-[26px] font-extrabold text-[#0F2140] tracking-tight leading-snug mb-4">{FEATURED.title}</h2>
            <p className="text-[14px] text-[#8A9BB0] leading-relaxed mb-4">{FEATURED.desc}</p>
            <div className="flex gap-2 text-[12px] text-[#8A9BB0] mb-6 flex-wrap">
              <span>By {FEATURED.author}</span>
              <span>·</span><span>{FEATURED.date}</span>
              <span>·</span><span>{FEATURED.read}</span>
            </div>
            <button className="inline-flex items-center gap-1.5 border-[1.5px] border-[#2DB8A8] text-[#2DB8A8] text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-[#2DB8A8] hover:text-white transition-all duration-150">
              Read article →
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map(p => (
            <div key={p.title} className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
              <div className="h-[160px]" style={{ background: p.color }} />
              <div className="p-5">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.8px] text-[#2DB8A8] mb-2">{p.tag}</span>
                <h3 className="text-[15px] font-bold text-[#0F2140] leading-snug mb-3">{p.title}</h3>
                <div className="flex gap-2 text-[12px] text-[#8A9BB0]">
                  <span>{p.date}</span><span>·</span><span>{p.read}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <button className="border-2 border-[#2DB8A8] text-[#2DB8A8] font-bold text-[14px] px-8 py-3 rounded-lg hover:bg-[#2DB8A8] hover:text-white transition-all duration-150">Load more articles</button>
        </div>
      </div>
    </div>
  )
}
