export default function PawRating({ rating, count, size = 'sm' }: { rating: number; count?: number; size?: 'sm' | 'md' | 'lg' }) {
  const fontSize = size === 'lg' ? 'text-[18px]' : size === 'md' ? 'text-[15px]' : 'text-[13px]'

  return (
    <div className={`flex items-center gap-1 ${fontSize}`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? 'paw-filled' : 'paw-empty'}>🐾</span>
      ))}
      {count !== undefined && (
        <span className="text-[12px] text-[#8A9BB0] ml-1">({count})</span>
      )}
    </div>
  )
}
