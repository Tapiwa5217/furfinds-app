import Link from 'next/link'
import { Share2, Link2, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0F2140] pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="text-[22px] font-extrabold text-white mb-3">🐾 FurFinds</div>
            <p className="text-[13px] text-white/40 leading-relaxed mb-5 max-w-[260px]">Less Stress, More Pets.</p>
            <div className="flex gap-2">
              {[Share2, Link2, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-white/50 hover:bg-[#2DB8A8] hover:text-white transition-colors duration-150">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Explore', links: [['Explore','/explore'],['Pet-Friendly Hotels','/explore'],['Restaurants','/explore'],['Housing','/explore']] },
            { title: 'Business', links: [['Apply for Verification','/verify'],['Verification Tiers','/verify'],['Business Login','#'],['Pricing','/verify']] },
            { title: 'Company', links: [['About FurFinds','/about'],['FurFinds Gives Back','/impact'],['Blog','/blog'],['Careers','#']] },
          ].map(col => (
            <div key={col.title}>
              <strong className="block text-[11px] font-bold uppercase tracking-widest text-white mb-4">{col.title}</strong>
              {col.links.map(([label, href]) => (
                <Link key={label} href={href} className="block text-[13px] text-white/40 py-1 hover:text-white/90 transition-colors duration-150">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-7 flex flex-wrap justify-between items-center gap-3">
          <p className="text-[12px] text-white/30">© 2026 FurFinds, Inc. All rights reserved.</p>
          <p className="text-[12px] text-white/30">Made with love for pets and the people who love them.</p>
        </div>
      </div>
    </footer>
  )
}
