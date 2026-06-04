import Link from 'next/link'
import TierBadge from './TierBadge'
import PawRating from './PawRating'

type Tier = 'Pet-Inclusive' | 'Pet-Friendly' | 'Pets-Allowed'

interface BizCardProps {
  slug: string
  name: string
  category: string
  location: string
  tier: Tier
  rating: number
  reviewCount: number
  snippet: string
  tags: string[]
  bgColor?: string
}

export default function BizCard({ slug, name, category, location, tier, rating, reviewCount, snippet, tags, bgColor = '#D4E8E8' }: BizCardProps) {
  return (
    <Link href={`/business/${slug}`} className="group bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] overflow-hidden hover:border-[#2DB8A8] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 block">
      <div className="relative h-[180px]" style={{ background: bgColor }}>
        <div className="absolute top-3 left-3">
          <TierBadge tier={tier} />
        </div>
      </div>
      <div className="p-5">
        <div className="text-[11px] font-bold text-[#2DB8A8] uppercase tracking-[0.5px] mb-1">{category} · {location}</div>
        <h3 className="text-[16px] font-bold text-[#0F2140] mb-2">{name}</h3>
        <PawRating rating={rating} count={reviewCount} />
        <p className="text-[13px] text-[#8A9BB0] leading-relaxed mt-2 mb-3">{snippet}</p>
        <div className="flex gap-1.5 flex-wrap">
          {tags.map(t => (
            <span key={t} className="bg-[#F4F8FC] text-[#8A9BB0] text-[11px] font-semibold px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
