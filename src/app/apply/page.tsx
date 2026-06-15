'use client'

import { useState } from 'react'
import { Check, ArrowRight, ArrowLeft, UploadCloud, Info, Award, ShieldCheck, Shield, Heart } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type OrgType =
  | 'for-profit'
  | 'nonprofit'
  | 'shelter-rescue'
  | 'service-animal'
  | 'therapy-animal'
  | 'esa'
  | 'other-mission'
  | 'other'
  | ''

const ORG_TYPE_LABELS: Record<string, string> = {
  'for-profit': 'For-profit business',
  'nonprofit': 'Nonprofit animal welfare organization',
  'shelter-rescue': 'Shelter / rescue',
  'service-animal': 'Service animal organization',
  'therapy-animal': 'Therapy animal organization',
  'esa': 'Emotional support animal organization',
  'other-mission': 'Other mission-based animal welfare organization',
  'other': 'Other',
}

const SERVICE_CATEGORIES = [
  'Lodging', 'Grooming', 'Pet walking / sitting', 'Vet clinic',
  'Restaurant / cafe', 'Driver / transport', 'Pet daycare', 'Boarding facility',
  'Shelter / rescue', 'Service animal org.', 'Therapy / ESA', 'Other / not listed',
]

const TIERS = [
  { id: '1paw', paws: 1, name: 'Pet Allowed', price: 'Free', color: '#F4A261', desc: 'Pets are permitted. Basic tolerance with minimal accommodations.' },
  { id: '2paw', paws: 2, name: 'Pet Friendly', price: '$79/yr', color: '#2DB8A8', desc: 'Intentional accommodations in place. Pets are welcomed, not just tolerated.', popular: true },
  { id: '3paw', paws: 3, name: 'Pet Inclusive', price: '$149/yr', color: '#7B5EA7', desc: 'Pets treated as valued guests. Above-and-beyond experience for pets and owners.' },
]

const isNonprofit = (t: OrgType) =>
  ['nonprofit', 'shelter-rescue', 'service-animal', 'therapy-animal', 'esa', 'other-mission'].includes(t)

// ─── Step definitions ─────────────────────────────────────────────────────────

function getSteps(orgType: OrgType) {
  if (!orgType) return ['Organization Type']
  if (orgType === 'for-profit') {
    return ['Organization Type', 'Business Basics', 'Pet Accommodation', 'Tier Assessment', 'Service Questions', 'Evidence', 'Agreement']
  }
  if (isNonprofit(orgType)) {
    return ['Organization Type', 'General Info', 'Mission & Services', 'Evidence', 'Agreement']
  }
  return ['Organization Type', 'General Info', 'Evidence', 'Agreement']
}

// ─── Reusable field components ────────────────────────────────────────────────

function Field({ label, placeholder = '', type = 'text', required = false, hint = '', full = true }: {
  label: string; placeholder?: string; type?: string; required?: boolean; hint?: string; full?: boolean
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? 'col-span-2' : ''}`}>
      <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">
        {label} {required && <span className="text-[#E05]">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea placeholder={placeholder} rows={4} className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0] resize-none" />
      ) : (
        <input type={type} placeholder={placeholder} className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
      )}
      {hint && <p className="text-[11px] text-[#8A9BB0] italic">{hint}</p>}
    </div>
  )
}

function RadioGroup({ label, options, required = false, hint = '' }: {
  label: string; options: string[]; required?: boolean; hint?: string
}) {
  const [selected, setSelected] = useState('')
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[13px] font-bold text-[#0F2140]">{label} {required && <span className="text-[#E05]">*</span>}</p>
      {hint && <p className="text-[11px] text-[#8A9BB0] italic mb-1">{hint}</p>}
      {options.map(opt => (
        <label key={opt} onClick={() => setSelected(opt)} className="flex items-center gap-3 py-2 px-3 rounded-lg border-[1.5px] border-[#E4EAF0] cursor-pointer hover:border-[#2DB8A8] transition-colors" style={{ borderColor: selected === opt ? '#2DB8A8' : '' }}>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selected === opt ? 'border-[#2DB8A8]' : 'border-[#E4EAF0]'}`}>
            {selected === opt && <div className="w-2 h-2 rounded-full bg-[#2DB8A8]" />}
          </div>
          <span className="text-[13px] text-[#0F2140]">{opt}</span>
        </label>
      ))}
    </div>
  )
}

function CheckGroup({ label, options, hint = '' }: { label: string; options: string[]; hint?: string }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const toggle = (o: string) => setChecked(s => { const n = new Set(s); n.has(o) ? n.delete(o) : n.add(o); return n })
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[13px] font-bold text-[#0F2140]">{label}</p>
      {hint && <p className="text-[11px] text-[#8A9BB0] italic mb-1">{hint}</p>}
      {options.map(opt => (
        <label key={opt} onClick={() => toggle(opt)} className="flex items-center gap-3 py-2 px-3 rounded-lg border-[1.5px] border-[#E4EAF0] cursor-pointer hover:border-[#2DB8A8] transition-colors" style={{ borderColor: checked.has(opt) ? '#2DB8A8' : '' }}>
          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked.has(opt) ? 'bg-[#2DB8A8] border-[#2DB8A8]' : 'border-[#E4EAF0]'}`}>
            {checked.has(opt) && <Check size={10} className="text-white" />}
          </div>
          <span className="text-[13px] text-[#0F2140]">{opt}</span>
        </label>
      ))}
    </div>
  )
}

// ─── Section content components ───────────────────────────────────────────────

function StepOrgType({ orgType, setOrgType }: { orgType: OrgType; setOrgType: (t: OrgType) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#0F2140] mb-1">What type of organization are you applying as?</h2>
        <p className="text-[14px] text-[#8A9BB0]">Your answer determines which questions you&apos;ll see next.</p>
      </div>
      <div className="flex flex-col gap-2">
        {(Object.entries(ORG_TYPE_LABELS) as [OrgType, string][]).map(([val, label]) => (
          <button
            key={val}
            onClick={() => setOrgType(val)}
            className={`flex items-center gap-3 py-3.5 px-4 rounded-xl border-2 text-left transition-colors
              ${orgType === val ? 'border-[#2DB8A8] bg-[#2DB8A8]/5' : 'border-[#E4EAF0] hover:border-[#2DB8A8]/50'}`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${orgType === val ? 'border-[#2DB8A8]' : 'border-[#E4EAF0]'}`}>
              {orgType === val && <div className="w-2.5 h-2.5 rounded-full bg-[#2DB8A8]" />}
            </div>
            <span className={`text-[14px] font-semibold ${orgType === val ? 'text-[#2DB8A8]' : 'text-[#0F2140]'}`}>{label}</span>
          </button>
        ))}
      </div>
      {isNonprofit(orgType) && (
        <div className="flex items-start gap-3 bg-[#F0FAF5] border border-[#52B78840] rounded-xl p-4">
          <Heart size={16} className="text-[#52B788] mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-[#52B788] font-medium">Nonprofit and mission-based organizations are listed for <strong>free</strong> on FurFinds and are featured in our <em>FurFinds Gives Back</em> section.</p>
        </div>
      )}
    </div>
  )
}

function StepBusinessBasics() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] font-extrabold text-[#0F2140]">Business Basics</h2>
      <p className="text-[13px] text-[#8A9BB0] -mt-3">Required for all service types.</p>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Legal Business Name" placeholder="Legal business name" required full={false} />
        <Field label="Display / Trade Name" placeholder="If different from legal name" full={false} />
        <Field label="Business Address" placeholder="Street address" required full={false} />
        <Field label="City / State / ZIP" placeholder="Chicago, IL 60601" required full={false} />
        <Field label="Primary Contact Name" placeholder="First and last name" required full={false} />
        <Field label="Contact Email" placeholder="name@business.com" type="email" required full={false} />
        <Field label="Phone Number" placeholder="(000) 000-0000" type="tel" required full={false} />
        <Field label="Business Website" placeholder="https://" full={false} />
        <Field label="Year Established" placeholder="YYYY" required full={false} />
        <Field label="Business Hours" placeholder="e.g. Mon–Fri 8am–6pm" full={false} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">
          Service Category <span className="text-[#E05]">*</span>
        </label>
        <p className="text-[11px] text-[#8A9BB0] italic mb-1">Your selection determines which service-specific questions load in the next section.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SERVICE_CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2 py-2 px-3 rounded-lg border-[1.5px] border-[#E4EAF0] cursor-pointer hover:border-[#2DB8A8] transition-colors text-[13px] text-[#0F2140]">
              <input type="radio" name="category" className="accent-[#2DB8A8]" /> {cat}
            </label>
          ))}
        </div>
      </div>

      <RadioGroup
        label="Does your business operate in multiple locations?"
        options={['No — single location', 'Yes — each location submits a separate application']}
        required
      />
    </div>
  )
}

function StepPetAccommodation() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#0F2140]">Universal Pet Accommodation</h2>
        <div className="flex items-start gap-2 mt-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
          <Info size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-blue-700">These answers are scored by our AI engine and cross-referenced against your public listings (Google, Yelp, website) automatically.</p>
        </div>
      </div>

      <RadioGroup
        label="Which animals does your business accommodate?"
        options={['Dogs', 'Cats', 'Both dogs and cats']}
        required
        hint="FurFinds only verifies dog- and cat-friendly businesses. Businesses that do not accommodate at least one will not qualify."
      />

      <RadioGroup
        label="Do you actively advertise your pet policy to customers?"
        options={[
          'Yes — prominently on website, signage, and/or Google listing',
          'Somewhat — mentioned on website but not prominently',
          'No — customers find out when they arrive or call',
        ]}
        required
      />

      <RadioGroup
        label="Are there any breed or size restrictions?"
        options={[
          'No restrictions',
          'Size restrictions only (e.g. under 25 lbs)',
          'Breed restrictions only',
          'Both size and breed restrictions',
        ]}
        required
      />
      <Field label="If restrictions exist, please describe them" placeholder="Describe any size or breed restrictions in detail" type="textarea" full />

      <RadioGroup
        label="Do you provide fresh water for pets on premises?"
        options={['Yes — always available', 'Yes — available upon request', 'No']}
        required
      />

      <RadioGroup
        label="Is there a designated area or space for pets?"
        options={['Yes — clearly marked and maintained', 'Yes — informal but available', 'No designated area']}
        required
      />

      <RadioGroup
        label="Is there a pet relief area on or immediately near your property?"
        options={['Yes — on property and clearly communicated to customers', 'Nearby (within 1 block) but not on property', 'No']}
        required
      />

      <RadioGroup
        label="Have any staff received training related to pet handling or pet-friendly hospitality?"
        options={['Yes — formal or certified training', 'Yes — informal internal training', 'No formal training']}
      />

      <RadioGroup
        label="Do you have a written pet policy document?"
        options={['Yes — publicly available on website', 'Yes — available upon request', 'No written policy']}
      />

      <RadioGroup
        label="Have you had any pet-related incidents, complaints, or removals in the last 12 months?"
        options={['No', 'Yes — resolved with no further action', 'Yes — details below']}
      />
      <Field label="If yes, please describe what occurred and how it was resolved" placeholder="Describe the incident and resolution..." type="textarea" full />

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">
          In your own words, what makes your business genuinely welcoming to cats and dogs? <span className="text-[#E05]">*</span>
        </label>
        <p className="text-[11px] text-[#8A9BB0] italic">This open-text response helps evaluate businesses that don&apos;t fit a standard category and is used to train our AI scoring model.</p>
        <textarea placeholder="Describe your pet experience, what you do differently, and what pet owners and their animals can expect when they visit." rows={5} className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0] resize-none" />
      </div>
    </div>
  )
}

function StepTierAssessment() {
  const [selected, setSelected] = useState('')
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#0F2140]">Tier Self-Assessment</h2>
        <p className="text-[14px] text-[#8A9BB0] mt-1">Select the tier you believe your business qualifies for. Our AI will compare your self-assessment against your scored tier — a gap of more than one tier is automatically flagged for founder review.</p>
      </div>

      <div className="flex flex-col gap-3">
        {TIERS.map(tier => (
          <button
            key={tier.id}
            onClick={() => setSelected(tier.id)}
            className={`relative text-left rounded-2xl border-2 p-5 transition-all
              ${selected === tier.id ? 'border-[' + tier.color + '] bg-[' + tier.color + ']/5' : 'border-[#E4EAF0] hover:border-[#D0D8E4]'}`}
            style={{ borderColor: selected === tier.id ? tier.color : '' }}
          >
            {tier.popular && (
              <span className="absolute top-4 right-4 bg-[#2DB8A8] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Most Popular</span>
            )}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex gap-0.5">
                {Array.from({ length: tier.paws }, (_, i) => (
                  <span key={i} style={{ color: tier.color }}>🐾</span>
                ))}
              </div>
              <span className="font-extrabold text-[#0F2140]">{tier.paws} {tier.paws === 1 ? 'Paw' : 'Paws'}</span>
              <span className="ml-auto font-extrabold text-[15px]" style={{ color: tier.color }}>{tier.price}</span>
            </div>
            <div className="font-bold text-[14px] mb-1" style={{ color: tier.color }}>{tier.name}</div>
            <p className="text-[13px] text-[#8A9BB0] leading-relaxed">{tier.desc}</p>
            <div className={`mt-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selected === tier.id ? '' : 'border-[#E4EAF0]'}`} style={{ borderColor: selected === tier.id ? tier.color : '' }}>
              {selected === tier.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: tier.color }} />}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepServiceQuestions() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#0F2140]">Service-Specific Questions</h2>
        <p className="text-[14px] text-[#8A9BB0] mt-1">These questions are tailored to your service category. Answers are AI-scored and combined with your universal score for a final weighted result.</p>
        <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <Info size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-amber-700">The example below shows <strong>Lodging</strong> questions. In the live form, this section loads dynamically based on your category selection. If you selected &ldquo;Other / not listed,&rdquo; you&apos;ll see the Universal Fallback module and your application will be flagged for founder review.</p>
        </div>
      </div>

      <RadioGroup
        label="What type of lodging do you operate?"
        options={['Hotel / motel', 'Vacation rental / Airbnb', 'Bed & breakfast', 'Resort', 'Campground / RV park', 'Hostel', 'Other']}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">Is there a pet fee? <span className="text-[#E05]">*</span></label>
          <select className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors">
            <option>No pet fee</option>
            <option>One-time fee</option>
            <option>Per-night fee</option>
            <option>Refundable deposit</option>
          </select>
        </div>
        <Field label="Fee amount (if applicable)" placeholder="$0.00" full={false} hint="Shown on your FurFinds listing so pet owners can plan ahead." />
      </div>

      <CheckGroup
        label="What pet amenities do you provide in-room or on property?"
        options={[
          'Food and water bowls provided',
          'Pet bed or bedding provided',
          'Welcome kit (treats, toys, waste bags)',
          'Designated pet relief area on property',
          'Pet-friendly floor or section of property',
          'Dog walking service or referral available',
          'Emergency vet contact info provided at check-in',
          'None of the above',
        ]}
      />

      <RadioGroup
        label="Are pet-free accommodations available for guests with allergies?"
        options={['Yes — dedicated pet-free floors or rooms', 'Available upon request', 'No']}
      />

      <RadioGroup
        label="Can pets be left unattended in the room?"
        options={['Yes — no restrictions', 'Yes — crated only', 'No']}
      />

      <RadioGroup
        label="Are pets allowed in any common indoor areas (lobby, restaurant, pool area, etc.)?"
        options={['Yes — multiple indoor common areas', 'Yes — lobby only', 'No — outdoor areas only']}
      />
    </div>
  )
}

function StepMissionServices(orgType: OrgType) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] font-extrabold text-[#0F2140]">Mission & Services</h2>

      <Field label="Mission Statement" placeholder="Describe your organization's mission..." type="textarea" required />

      <CheckGroup
        label="Type of animal welfare work provided"
        options={[
          'Animal rescue and rehabilitation',
          'Adoption services',
          'Foster network',
          'Spay / neuter programs',
          'Community education',
          'Service animal training',
          'Therapy animal programs',
          'Emotional support animal resources',
          'Advocacy and policy',
          'Emergency animal response',
          'Other',
        ]}
      />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Proof of Nonprofit Status" placeholder="501(c)(3) EIN or upload" full={false} hint="If applicable" />
        <Field label="Communities or Animals Served" placeholder="e.g. stray cats in Cook County" full={false} />
      </div>

      {(orgType === 'shelter-rescue' || orgType === 'nonprofit') && (
        <>
          <RadioGroup
            label="Do you offer adoption services?"
            options={['Yes', 'No', 'Foster-to-adopt only']}
          />
          <Field label="Adoption event information" placeholder="Upcoming events, dates, locations..." type="textarea" />
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Volunteer opportunities" placeholder="Describe how people can volunteer" full={false} />
        <Field label="Donation link" placeholder="https://donate.yourorg.com" full={false} hint="Optional" />
        <Field label="Wish list link" placeholder="https://amazon.com/wishlist/..." full={false} hint="Optional" />
        <Field label="Website / social media" placeholder="https://" full={false} />
      </div>

      {['service-animal', 'therapy-animal', 'esa'].includes(orgType) && (
        <Field label="Service / therapy / ESA resources" placeholder="Links or descriptions of resources you provide to handlers and owners" type="textarea" />
      )}

      <Field label="How can FurFinds users support your organization?" placeholder="Donate, volunteer, attend events, foster, share..." type="textarea" required />

      <CheckGroup
        label="FurFinds Gives Back"
        options={['Include my organization in the FurFinds Gives Back section']}
      />

      <RadioGroup
        label="Partnership model"
        options={['Free listing (nonprofit)', 'Featured listing (optional paid placement)']}
      />
    </div>
  )
}

function StepGeneralInfo() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] font-extrabold text-[#0F2140]">General Information</h2>
      <p className="text-[13px] text-[#8A9BB0] -mt-3">Required for all applicants.</p>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Organization / Business Name" placeholder="Your organization name" required full={false} />
        <Field label="Legal Business Name" placeholder="If different" full={false} />
        <Field label="DBA (Doing Business As)" placeholder="If applicable" full={false} />
        <Field label="Website" placeholder="https://" full={false} />
        <Field label="Street Address" placeholder="123 Main St" required full={false} />
        <Field label="City / State / ZIP" placeholder="Chicago, IL 60601" required full={false} />
        <Field label="Contact Person" placeholder="First and last name" required full={false} />
        <Field label="Contact Email" placeholder="contact@org.com" type="email" required full={false} />
        <Field label="Phone Number" placeholder="(000) 000-0000" type="tel" required full={false} />
        <Field label="Hours of Operation" placeholder="e.g. Mon–Fri 9am–5pm" full={false} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">Social Media Links</label>
        <div className="grid grid-cols-2 gap-3">
          {['Instagram', 'Facebook', 'TikTok', 'X / Twitter'].map(sm => (
            <input key={sm} type="url" placeholder={`${sm} URL`} className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
          ))}
        </div>
      </div>

      <Field label="Organization / Business Description" placeholder="Tell us about your organization, what you do, and why you want to join FurFinds..." type="textarea" required />

      <div className="border-2 border-dashed border-[#E4EAF0] rounded-xl p-6 text-center hover:border-[#2DB8A8] transition-colors cursor-pointer">
        <UploadCloud size={28} className="text-[#8A9BB0] mx-auto mb-2" />
        <strong className="block text-[14px] text-[#0F2140] mb-1">Upload photos & logo</strong>
        <p className="text-[12px] text-[#8A9BB0]">JPG, PNG · Max 10MB per file</p>
        <button className="mt-3 border-[1.5px] border-[#2DB8A8] text-[#2DB8A8] text-[12px] font-semibold px-4 py-2 rounded-lg hover:bg-[#2DB8A8] hover:text-white transition-all">Choose files</button>
      </div>

      <RadioGroup
        label="Pet policies"
        options={['Dogs welcome', 'Cats welcome', 'Both dogs and cats welcome', 'Service animals only']}
        required
      />

      <Field label="Pet restrictions (if any)" placeholder="e.g. must be leashed, under 50 lbs, no aggressive breeds..." type="textarea" />
      <Field label="Pet accommodations or amenities" placeholder="e.g. water bowls, pet relief area, treats at reception..." type="textarea" />
    </div>
  )
}

function StepForProfitExtra() {
  return null // Embedded in service questions step for for-profit
}

function StepEvidence({ isForProfit }: { isForProfit: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] font-extrabold text-[#0F2140]">Evidence Submission</h2>
      <p className="text-[14px] text-[#8A9BB0] mt-1">Photos and links for AI image recognition and cross-referencing.</p>

      <div className="border-2 border-dashed border-[#E4EAF0] rounded-xl p-8 text-center hover:border-[#2DB8A8] transition-colors cursor-pointer">
        <UploadCloud size={32} className="text-[#8A9BB0] mx-auto mb-2" />
        <strong className="block text-[14px] text-[#0F2140] mb-1">
          Upload photos of your {isForProfit ? 'pet accommodations' : 'facilities and programs'} <span className="text-[#E05]">*</span> (at least 2)
        </strong>
        <p className="text-[12px] text-[#8A9BB0] mb-1">
          {isForProfit
            ? 'Entrance signage · Water stations · Pet areas · Amenities · Relief areas'
            : 'Facility photos · Animals in your care · Events · Programs'}
        </p>
        <p className="text-[11px] text-[#8A9BB0] italic mb-3">JPG or PNG · Max 10MB per file</p>
        <button className="border-[1.5px] border-[#2DB8A8] text-[#2DB8A8] text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-[#2DB8A8] hover:text-white transition-all duration-150">Choose files</button>
        {isForProfit && (
          <p className="text-[11px] text-[#8A9BB0] italic mt-3">AI image recognition scans photos for pet amenities and flags photos that don&apos;t match application claims.</p>
        )}
      </div>

      {isForProfit && (
        <>
          <Field label="Link to your pet policy on your website" placeholder="https://yoursite.com/pet-policy" />
          <Field label="Link to your Google Business profile" placeholder="https://g.co/..." hint="Used by our AI to pull and analyze public reviews mentioning pets." />
          <Field label="Any awards, press, or recognition for being pet-friendly?" placeholder='e.g. "Featured in PetTravel.com 2024 Best Hotels list" — include links if available' type="textarea" />
        </>
      )}

      {!isForProfit && (
        <>
          <Field label="Link to your website or social media" placeholder="https://" />
          <Field label="Proof of nonprofit status (optional)" placeholder="EIN number or link to 501(c)(3) determination letter" />
          <Field label="Press, awards, or community recognition" placeholder="Links to news coverage, awards, community partnerships..." type="textarea" />
        </>
      )}
    </div>
  )
}

function StepAgreement({ isForProfit }: { isForProfit: boolean }) {
  const [checks, setChecks] = useState<Record<string, boolean>>({})
  const toggle = (k: string) => setChecks(c => ({ ...c, [k]: !c[k] }))

  const forProfitItems = [
    { id: 'accurate', text: 'I confirm that all information provided is accurate and truthful. I understand that misrepresentation may result in immediate removal of my verification tier.' },
    { id: 'reverify', text: 'I consent to FurFinds conducting periodic re-verification, including AI monitoring of public reviews and optional secret shopper visits. Re-verification occurs every 12 months or if complaints spike.' },
    { id: 'shopper', text: 'I opt in to the FurFinds Secret Shopper Program. An anonymous verified pet owner may visit and submit a confidential review. Results may affect tier standing.' },
    { id: 'upgrade', text: 'I would like to be notified when I am eligible to upgrade my tier.' },
    { id: 'badge', text: 'I agree to the FurFinds Badge Usage Agreement and will only use the badge for my approved tier.' },
    { id: 'marketing', text: 'I agree to FurFinds Marketing Material Usage Agreement.' },
    { id: 'complaints', text: 'I agree to participate in the FurFinds complaint resolution process in good faith.' },
    { id: 'suspend', text: 'I understand that FurFinds may suspend or remove my verification if I fail to maintain the standards associated with my tier.' },
  ]

  const nonprofitItems = [
    { id: 'accurate', text: 'I confirm that all information provided is accurate and truthful.' },
    { id: 'profile', text: 'I give FurFinds permission to display my organization\'s profile on the platform.' },
    { id: 'community', text: 'I agree to FurFinds Community Standards.' },
    { id: 'update', text: 'I commit to keeping my profile information up to date.' },
  ]

  const items = isForProfit ? forProfitItems : nonprofitItems

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#0F2140]">Agreement & Consent</h2>
        <p className="text-[14px] text-[#8A9BB0] mt-1">Please review and check all items below before submitting.</p>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <label key={item.id} onClick={() => toggle(item.id)} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${checks[item.id] ? 'border-[#2DB8A8] bg-[#2DB8A8]/5' : 'border-[#E4EAF0] hover:border-[#D0D8E4]'}`}>
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${checks[item.id] ? 'bg-[#2DB8A8] border-[#2DB8A8]' : 'border-[#D0D8E4]'}`}>
              {checks[item.id] && <Check size={11} className="text-white" />}
            </div>
            <span className="text-[13px] text-[#0F2140] leading-relaxed">{item.text}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">Authorized Signature (full legal name) <span className="text-[#E05]">*</span></label>
          <input type="text" placeholder="Type your full legal name" className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">Date <span className="text-[#E05]">*</span></label>
          <input type="date" className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors" />
        </div>
      </div>

      {isForProfit && (
        <div className="bg-[#F4F8FC] rounded-xl p-5 text-[13px] text-[#8A9BB0] leading-relaxed">
          <strong className="text-[#0F2140]">What happens next:</strong> Our AI will score your application within minutes. Clear approvals are processed automatically. Edge cases are flagged for founder review. You will receive a decision email within <strong className="text-[#0F2140]">3 business days</strong>. All approved businesses receive a <em>Gap Report</em> showing exactly what criteria they would need to meet to reach the next tier.
        </div>
      )}

      {!isForProfit && (
        <div className="bg-[#F0FAF5] border border-[#52B78840] rounded-xl p-5 text-[13px] text-[#8A9BB0] leading-relaxed">
          <strong className="text-[#0F2140]">What happens next:</strong> Your application will be reviewed by the FurFinds team. You&apos;ll receive a confirmation email within <strong className="text-[#0F2140]">5 business days</strong>. Approved organizations will be listed for free and featured in FurFinds Gives Back.
        </div>
      )}
    </div>
  )
}

function SuccessScreen() {
  return (
    <div className="text-center py-12 flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-[#2DB8A8]/15 flex items-center justify-center text-4xl">🐾</div>
      <h2 className="text-[26px] font-extrabold text-[#0F2140]">Application Submitted!</h2>
      <p className="text-[15px] text-[#8A9BB0] max-w-[400px] leading-relaxed">
        Thank you for applying to FurFinds. We&apos;ve sent a confirmation email with your application details. You&apos;ll hear from us within 3–5 business days.
      </p>
      <div className="flex flex-col gap-2 text-[13px] text-[#8A9BB0] text-left bg-[#F4F8FC] rounded-xl p-5 w-full max-w-[360px]">
        <div className="flex items-center gap-2"><Check size={14} className="text-[#2DB8A8]" /> Application received</div>
        <div className="flex items-center gap-2 opacity-40"><Check size={14} className="text-[#8A9BB0]" /> AI scoring in progress</div>
        <div className="flex items-center gap-2 opacity-40"><Check size={14} className="text-[#8A9BB0]" /> FurFinds review</div>
        <div className="flex items-center gap-2 opacity-40"><Check size={14} className="text-[#8A9BB0]" /> Decision email sent</div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  const [orgType, setOrgType] = useState<OrgType>('')
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const steps = getSteps(orgType)
  const isForProfit = orgType === 'for-profit'
  const nonprofit = isNonprofit(orgType)

  const canAdvance = step === 0 ? !!orgType : true

  const renderStep = () => {
    if (step === 0) return <StepOrgType orgType={orgType} setOrgType={setOrgType} />

    if (isForProfit) {
      if (step === 1) return <StepBusinessBasics />
      if (step === 2) return <StepPetAccommodation />
      if (step === 3) return <StepTierAssessment />
      if (step === 4) return <StepServiceQuestions />
      if (step === 5) return <StepEvidence isForProfit />
      if (step === 6) return <StepAgreement isForProfit />
    }

    if (nonprofit) {
      if (step === 1) return StepGeneralInfo()
      if (step === 2) return StepMissionServices(orgType)
      if (step === 3) return <StepEvidence isForProfit={false} />
      if (step === 4) return <StepAgreement isForProfit={false} />
    }

    // Other
    if (step === 1) return StepGeneralInfo()
    if (step === 2) return <StepEvidence isForProfit={false} />
    if (step === 3) return <StepAgreement isForProfit={false} />

    return null
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0F2140] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <span className="block text-[12px] font-bold uppercase tracking-widest text-[#2DB8A8] mb-3">For Businesses & Organizations</span>
          <h1 className="text-white text-[clamp(28px,4vw,48px)] font-extrabold tracking-tight mb-3">Apply for FurFinds Verification</h1>
          <p className="text-white/60 text-[15px] max-w-[540px] leading-relaxed">One application for pet-friendly businesses, shelters, rescues, and animal welfare organizations. Verification builds trust — and brings in customers who specifically seek you out.</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
        <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-8">
          {submitted ? (
            <SuccessScreen />
          ) : (
            <>
              {/* Step indicator */}
              {orgType && (
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
                  {steps.map((s, i) => (
                    <div key={s} className="flex items-center gap-2 flex-shrink-0">
                      <div className={`flex items-center gap-2 ${i === step ? 'text-[#0F2140]' : i < step ? 'text-[#2DB8A8]' : 'text-[#8A9BB0]'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 ${i < step ? 'bg-[#2DB8A8] text-white' : i === step ? 'bg-[#0F2140] text-white' : 'bg-[#E4EAF0] text-[#8A9BB0]'}`}>
                          {i < step ? <Check size={12} /> : i + 1}
                        </div>
                        <span className="text-[12px] font-semibold whitespace-nowrap hidden sm:block">{s}</span>
                      </div>
                      {i < steps.length - 1 && <div className={`w-6 h-[2px] flex-shrink-0 ${i < step ? 'bg-[#2DB8A8]' : 'bg-[#E4EAF0]'}`} />}
                    </div>
                  ))}
                </div>
              )}

              {renderStep()}

              {/* Nav buttons */}
              <div className="flex gap-3 mt-8">
                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-5 py-3 rounded-xl border-[1.5px] border-[#E4EAF0] text-[14px] font-semibold text-[#0F2140] hover:border-[#2DB8A8] hover:text-[#2DB8A8] transition-colors">
                    <ArrowLeft size={16} /> Back
                  </button>
                )}
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canAdvance}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#2DB8A8] text-white font-bold text-[15px] py-3.5 rounded-xl hover:bg-[#1E9E90] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmitted(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#2DB8A8] text-white font-bold text-[15px] py-3.5 rounded-xl hover:bg-[#1E9E90] transition-colors"
                  >
                    Submit Application <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-5">
            <h3 className="text-[15px] font-bold text-[#0F2140] mb-4">Verification Tiers</h3>
            {[
              { Icon: Award, tier: 'Pet-Inclusive', price: '$149/yr', color: '#7B5EA7', desc: 'Annual inspection, premium placement.' },
              { Icon: ShieldCheck, tier: 'Pet-Friendly', price: '$79/yr', color: '#2DB8A8', desc: 'Policy review, verified badge.' },
              { Icon: Shield, tier: 'Pets-Allowed', price: 'Free', color: '#F4A261', desc: 'Self-reported listing.' },
              { Icon: Heart, tier: 'Nonprofit / Rescue', price: 'Always Free', color: '#52B788', desc: 'Free for verified organizations.' },
            ].map(({ Icon, tier, price, color, desc }) => (
              <div key={tier} className="flex items-start gap-3 mb-4 last:mb-0">
                <Icon size={15} style={{ color }} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0F2140] text-[13px]">{tier}</span>
                    <span className="font-extrabold text-[12px]" style={{ color }}>{price}</span>
                  </div>
                  <p className="text-[12px] text-[#8A9BB0]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#F4F8FC] rounded-2xl p-5 text-[13px] text-[#8A9BB0]">
            <p className="font-bold text-[#0F2140] mb-2">How it works</p>
            <div className="flex flex-col gap-2">
              {['Submit your application', 'AI scores + cross-references your data', 'FurFinds reviews edge cases', 'Approval email with your tier + badge', 'Access your Business Dashboard'].map((s, i) => (
                <div key={s} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#2DB8A8]/20 text-[#2DB8A8] text-[10px] font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
