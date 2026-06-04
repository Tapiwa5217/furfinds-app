'use client'

import { useState } from 'react'
import { Award, ShieldCheck, Shield, Heart, UploadCloud, ArrowRight, Check } from 'lucide-react'

const STEPS = ['Business Info', 'Pet Policy', 'Documents', 'Review']

export default function VerifyPage() {
  const [step, setStep] = useState(0)

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0F2140] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3">For Businesses</span>
          <h1 className="text-white text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight mb-4">Get verified. Get discovered.</h1>
          <p className="text-white/60 text-[17px] max-w-[560px] leading-relaxed">Join 8,400+ pet-friendly businesses trusted by FurFinds users. Verification builds confidence — and brings in customers who specifically seek you out.</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Form card */}
        <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-8">
          {/* Step indicators */}
          <div className="flex gap-0 border-b-2 border-[#E4EAF0] pb-5 mb-8">
            {STEPS.map((s, i) => (
              <button key={s} onClick={() => setStep(i)} className="flex items-center gap-2 flex-1 text-[13px] font-semibold">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 transition-colors
                  ${i <= step ? 'bg-[#2DB8A8] text-white' : 'bg-[#E4EAF0] text-[#8A9BB0]'}`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </span>
                <span className={i <= step ? 'text-[#2DB8A8]' : 'text-[#8A9BB0]'}>{s}</span>
              </button>
            ))}
          </div>

          <h2 className="text-[22px] font-extrabold text-[#0F2140] tracking-tight mb-7">Tell us about your business</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { label: 'Business Name', placeholder: 'e.g. The Bark Hotel', full: false },
              { label: 'Business Type', placeholder: '', type: 'select', full: false },
            ].map(field => (
              <div key={field.label} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">{field.label}</label>
                {field.type === 'select' ? (
                  <select className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors">
                    <option>Select a category</option>
                    <option>Hotel & Lodging</option>
                    <option>Restaurant</option>
                    <option>Groomer</option>
                    <option>Vet & Clinic</option>
                    <option>Housing</option>
                    <option>Shelter / Rescue (Free)</option>
                    <option>Transportation</option>
                    <option>Training & Daycare</option>
                    <option>Pet Retail</option>
                  </select>
                ) : (
                  <input type="text" placeholder={field.placeholder} className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140] mb-1.5">Street Address</label>
            <input type="text" placeholder="123 Main St" className="w-full border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {[['City', 'Chicago'], ['State', 'IL'], ['ZIP', '60601']].map(([l, p]) => (
              <div key={l} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">{l}</label>
                <input type="text" placeholder={p} className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[['Contact Email', 'email', 'owner@yourbusiness.com'], ['Phone', 'tel', '(312) 555-0100']].map(([l, t, p]) => (
              <div key={l} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">{l}</label>
                <input type={t} placeholder={p} className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140] mb-1.5">Website (optional)</label>
            <input type="url" placeholder="https://yourbusiness.com" className="w-full border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
          </div>

          {/* Upload zone */}
          <div className="border-2 border-dashed border-[#E4EAF0] rounded-xl p-8 text-center mb-8 hover:border-[#2DB8A8] transition-colors cursor-pointer">
            <UploadCloud size={32} className="text-[#8A9BB0] mx-auto mb-2" />
            <strong className="block text-[14px] text-[#0F2140] mb-1">Upload business photos (optional)</strong>
            <p className="text-[12px] text-[#8A9BB0] mb-3">JPG or PNG · Up to 10 photos · Max 5MB each</p>
            <button className="border-[1.5px] border-[#2DB8A8] text-[#2DB8A8] text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-[#2DB8A8] hover:text-white transition-all duration-150">Choose files</button>
          </div>

          <button
            onClick={() => setStep(s => Math.min(s + 1, STEPS.length - 1))}
            className="w-full flex items-center justify-center gap-2 bg-[#2DB8A8] text-white font-bold text-[15px] py-4 rounded-xl hover:bg-[#1E9E90] transition-colors duration-150"
          >
            Continue to Pet Policy <ArrowRight size={17} />
          </button>
        </div>

        {/* Tier sidebar */}
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-6">
            <h3 className="text-[16px] font-bold text-[#0F2140] mb-5">Which tier are you aiming for?</h3>

            {[
              { tier: 'Pet-Inclusive', price: '$149/yr', Icon: Award, color: '#7B5EA7', borderColor: 'rgba(123,94,167,0.3)', desc: 'Annual on-site inspection, full amenity verification, premium placement in search.' },
              { tier: 'Pet-Friendly', price: '$79/yr', Icon: ShieldCheck, color: '#2DB8A8', borderColor: '#2DB8A8', popular: true, desc: 'Policy review, community verification, bi-annual check-in, and a verified badge.' },
              { tier: 'Pets-Allowed', price: 'Free', Icon: Shield, color: '#F4A261', borderColor: 'rgba(244,162,97,0.3)', desc: 'Self-reported listing with basic policy on file. Upgrade anytime.' },
              { tier: 'Shelter / Rescue', price: 'Always Free', Icon: Heart, color: '#52B788', borderColor: 'rgba(82,183,136,0.4)', desc: 'Free nonprofit profile for verified 501(c)(3) organizations.', bg: 'bg-[#F0FAF5]' },
            ].map(({ tier, price, Icon, color, borderColor, popular, desc, bg }) => (
              <div key={tier} className={`relative rounded-xl border-2 p-4 mb-3 last:mb-0 ${bg || 'bg-white'}`} style={{ borderColor }}>
                {popular && (
                  <div className="absolute top-3 right-3 bg-[#2DB8A8] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Most Popular</div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={15} style={{ color }} />
                  <strong className="text-[14px] text-[#0F2140]">{tier}</strong>
                  <span className="ml-auto text-[14px] font-extrabold" style={{ color }}>{price}</span>
                </div>
                <p className="text-[12px] text-[#8A9BB0] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
