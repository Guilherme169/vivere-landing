import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'green' | 'orange' | 'dark'

const toneClasses: Record<Tone, string> = {
  green: 'bg-green/10 border-green/20 text-green-dark',
  orange: 'bg-orange/10 border-orange/25 text-[#b3611a]',
  dark: 'bg-black/25 text-white border-transparent backdrop-blur-sm',
}

interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
}

/** Small pill label used above section headings ("Promoções da semana", "Quem somos", ...). */
export function Eyebrow({ tone = 'green', className, children, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 mb-2.5',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          tone === 'orange' ? 'bg-orange' : tone === 'dark' ? 'bg-white' : 'bg-green',
        )}
      />
      <span className="text-[10.5px] font-bold uppercase tracking-wide">{children}</span>
    </div>
  )
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

/** Small tag used on cards, e.g. "NOVIDADE" / weight / category chips. */
export function Badge({ tone = 'dark', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide border',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}
