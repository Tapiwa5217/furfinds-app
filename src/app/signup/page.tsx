'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check, Plus, Trash2, UploadCloud } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const STEPS = ['Your Info', 'Your Pets', 'Preferences', 'Community']

type Pet = { name: string; type: string; breed: string }

export default function SignupPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '',
    city: '', state: '', zip: '',
    pets: [{ name: '', type: 'Dog', breed: '' }] as Pet[],
    prefDogs: true, prefCats: true, prefNoFee: false, prefNoSizeLimit: false,
    allowReviews: true, communityAgreed: false,
  })
  const { login } = useAuth()
  const router = useRouter()

  const update = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }))
  const updatePet = (i: number, k: keyof Pet, v: string) =>
    setForm(f => { const pets = [...f.pets]; pets[i] = { ...pets[i], [k]: v }; return { ...f, pets } })
  const addPet = () => setForm(f => ({ ...f, pets: [...f.pets, { name: '', type: 'Dog', breed: '' }] }))
  const removePet = (i: number) => setForm(f => ({ ...f, pets: f.pets.filter((_, idx) => idx !== i) }))

  const handleSubmit = () => {
    login({ role: 'pet-parent', name: `${form.firstName} ${form.lastName}`, email: form.email })
    router.push('/dashboard/pet-parent')
  }

  const field = (label: string, key: string, type = 'text', placeholder = '') => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={(form as Record<string, unknown>)[key] as string}
        onChange={e => update(key, e.target.value)}
        className="border-[1.5px] border-[#E4EAF0] rounded-lg px-4 py-3 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]"
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F4F8FC] px-4 py-16">
      <div className="max-w-[560px] mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-2xl">🐾</span>
            <span className="text-[22px] font-extrabold text-[#0F2140] tracking-tight">FurFinds</span>
          </Link>
          <h1 className="text-[28px] font-extrabold text-[#0F2140] tracking-tight">Create your account</h1>
          <p className="text-[#8A9BB0] text-[14px] mt-1">Join thousands of pet parents finding trusted places</p>
        </div>

        {/* Step indicators */}
        <div className="flex gap-0 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-extrabold mb-1 transition-colors
                  ${i < step ? 'bg-[#2DB8A8] text-white' : i === step ? 'bg-[#0F2140] text-white' : 'bg-[#E4EAF0] text-[#8A9BB0]'}`}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide ${i === step ? 'text-[#0F2140]' : 'text-[#8A9BB0]'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`h-[2px] flex-1 mb-5 ${i < step ? 'bg-[#2DB8A8]' : 'bg-[#E4EAF0]'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border-[1.5px] border-[#E4EAF0] p-8 shadow-sm">
          {/* Step 0: Your Info */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-[20px] font-extrabold text-[#0F2140]">Tell us about yourself</h2>
              <div className="grid grid-cols-2 gap-4">
                {field('First Name', 'firstName', 'text', 'Jane')}
                {field('Last Name', 'lastName', 'text', 'Smith')}
              </div>
              {field('Email Address', 'email', 'email', 'jane@email.com')}
              {field('Phone Number', 'phone', 'tel', '(312) 555-0100')}
              {field('Password', 'password', 'password', '••••••••')}
              <div className="grid grid-cols-3 gap-3">
                {field('City', 'city', 'text', 'Chicago')}
                {field('State', 'state', 'text', 'IL')}
                {field('ZIP', 'zip', 'text', '60601')}
              </div>
            </div>
          )}

          {/* Step 1: Your Pets */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-[20px] font-extrabold text-[#0F2140]">Add your pets</h2>
              <p className="text-[13px] text-[#8A9BB0] -mt-2">You can upload vaccination records from your dashboard after signing up.</p>
              {form.pets.map((pet, i) => (
                <div key={i} className="border-[1.5px] border-[#E4EAF0] rounded-xl p-4 flex flex-col gap-3 relative">
                  {form.pets.length > 1 && (
                    <button onClick={() => removePet(i)} className="absolute top-3 right-3 text-[#8A9BB0] hover:text-red-400">
                      <Trash2 size={15} />
                    </button>
                  )}
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#2DB8A8]">Pet {i + 1}</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">Pet Name</label>
                      <input value={pet.name} onChange={e => updatePet(i, 'name', e.target.value)} placeholder="Biscuit" className="border-[1.5px] border-[#E4EAF0] rounded-lg px-3 py-2.5 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">Type</label>
                      <select value={pet.type} onChange={e => updatePet(i, 'type', e.target.value)} className="border-[1.5px] border-[#E4EAF0] rounded-lg px-3 py-2.5 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors">
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140]">Breed (optional)</label>
                    <input value={pet.breed} onChange={e => updatePet(i, 'breed', e.target.value)} placeholder="Golden Retriever" className="border-[1.5px] border-[#E4EAF0] rounded-lg px-3 py-2.5 text-[14px] text-[#0F2140] outline-none focus:border-[#2DB8A8] transition-colors placeholder:text-[#8A9BB0]" />
                  </div>
                  <div className="border-2 border-dashed border-[#E4EAF0] rounded-lg p-4 text-center hover:border-[#2DB8A8] transition-colors cursor-pointer">
                    <UploadCloud size={20} className="text-[#8A9BB0] mx-auto mb-1" />
                    <p className="text-[12px] text-[#8A9BB0]">Upload vaccination records (optional)</p>
                    <p className="text-[11px] text-[#B0BEC5]">PDF, JPG, PNG · Max 10MB</p>
                  </div>
                </div>
              ))}
              <button onClick={addPet} className="flex items-center gap-2 text-[13px] font-semibold text-[#2DB8A8] hover:text-[#1E9E90] self-start">
                <Plus size={16} /> Add another pet
              </button>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-[20px] font-extrabold text-[#0F2140]">Your preferences</h2>
              <p className="text-[13px] text-[#8A9BB0] -mt-2">Help us surface the most relevant businesses for you and your pet(s).</p>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140] mb-3">I&apos;m searching for places that welcome</p>
                {[['prefDogs', '🐕 Dogs'], ['prefCats', '🐈 Cats']].map(([k, label]) => (
                  <label key={k} className="flex items-center gap-3 mb-2 cursor-pointer">
                    <div onClick={() => update(k, !(form as Record<string, unknown>)[k])} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${(form as Record<string, unknown>)[k] ? 'bg-[#2DB8A8] border-[#2DB8A8]' : 'border-[#E4EAF0]'}`}>
                      {(form as Record<string, unknown>)[k] && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-[14px] text-[#0F2140] font-medium">{label}</span>
                  </label>
                ))}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140] mb-3">Filters I care about</p>
                {[['prefNoFee', 'No pet fees'], ['prefNoSizeLimit', 'No size or breed restrictions']].map(([k, label]) => (
                  <label key={k} className="flex items-center gap-3 mb-2 cursor-pointer">
                    <div onClick={() => update(k, !(form as Record<string, unknown>)[k])} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${(form as Record<string, unknown>)[k] ? 'bg-[#2DB8A8] border-[#2DB8A8]' : 'border-[#E4EAF0]'}`}>
                      {(form as Record<string, unknown>)[k] && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-[14px] text-[#0F2140] font-medium">{label}</span>
                  </label>
                ))}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#0F2140] mb-3">Review permissions</p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => update('allowReviews', !form.allowReviews)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${form.allowReviews ? 'bg-[#2DB8A8] border-[#2DB8A8]' : 'border-[#E4EAF0]'}`}>
                    {form.allowReviews && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-[14px] text-[#0F2140] font-medium">Allow FurFinds to display my reviews publicly</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Community */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-[20px] font-extrabold text-[#0F2140]">Community standards</h2>
              <p className="text-[14px] text-[#8A9BB0] leading-relaxed">FurFinds is built on trust. Our community standards ensure that reviews are honest, interactions are respectful, and every pet owner can rely on the information they find here.</p>
              <div className="bg-[#F4F8FC] rounded-xl p-5 flex flex-col gap-3 text-[13px] text-[#0F2140]">
                {[
                  'I will write honest, first-hand reviews based on my real experiences.',
                  'I will not submit false information about businesses.',
                  'I agree to treat other community members with respect.',
                  'I understand that FurFinds may remove content that violates community standards.',
                  'I will keep my pet\'s vaccination records up to date in my profile.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check size={14} className="text-[#2DB8A8] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <div onClick={() => update('communityAgreed', !form.communityAgreed)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer mt-0.5 flex-shrink-0 ${form.communityAgreed ? 'bg-[#2DB8A8] border-[#2DB8A8]' : 'border-[#E4EAF0]'}`}>
                  {form.communityAgreed && <Check size={12} className="text-white" />}
                </div>
                <span className="text-[14px] text-[#0F2140] font-medium leading-snug">I agree to the FurFinds Community Standards and <Link href="#" className="text-[#2DB8A8] hover:underline">Terms of Service</Link></span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-5 py-3 rounded-xl border-[1.5px] border-[#E4EAF0] text-[14px] font-semibold text-[#0F2140] hover:border-[#2DB8A8] hover:text-[#2DB8A8] transition-colors">
                <ArrowLeft size={16} /> Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} className="flex-1 flex items-center justify-center gap-2 bg-[#2DB8A8] text-white font-bold text-[15px] py-3 rounded-xl hover:bg-[#1E9E90] transition-colors">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!form.communityAgreed}
                className="flex-1 flex items-center justify-center gap-2 bg-[#2DB8A8] text-white font-bold text-[15px] py-3 rounded-xl hover:bg-[#1E9E90] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create My Account <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-[13px] text-[#8A9BB0] mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-[#2DB8A8] font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
