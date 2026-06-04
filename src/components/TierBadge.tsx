import { Award, ShieldCheck, Shield } from 'lucide-react'

type Tier = 'Pet-Inclusive' | 'Pet-Friendly' | 'Pets-Allowed'

const config: Record<Tier, { bg: string; text: string; Icon: React.ElementType }> = {
  'Pet-Inclusive': { bg: 'bg-[#F3EEFF]', text: 'text-[#7B5EA7]', Icon: Award },
  'Pet-Friendly':  { bg: 'bg-[#E8F8F6]', text: 'text-[#2DB8A8]', Icon: ShieldCheck },
  'Pets-Allowed':  { bg: 'bg-[#FEF3E8]', text: 'text-[#F4A261]', Icon: Shield },
}

export default function TierBadge({ tier, size = 'sm' }: { tier: Tier; size?: 'sm' | 'md' | 'lg' }) {
  const { bg, text, Icon } = config[tier]
  const padding = size === 'lg' ? 'px-4 py-2.5 text-[14px]' : size === 'md' ? 'px-3 py-1.5 text-[12px]' : 'px-2.5 py-1 text-[11px]'
  const iconSize = size === 'lg' ? 16 : 14

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-extrabold uppercase tracking-[0.5px] ${bg} ${text} ${padding}`}>
      <Icon size={iconSize} />
      {tier}
    </span>
  )
}
