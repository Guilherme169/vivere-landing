import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'green' | 'orange' | 'dark' | 'gold' | 'light'

const toneClasses: Record<Tone, string> = {
  green: 'bg-green/10 border-green/20 text-green-forest',
  orange: 'bg-orange/10 border-orange/25 text-orange-dark',
  dark: 'bg-black/30 text-white border-white/15 backdrop-blur-sm',
  gold: 'bg-gold/12 border-gold/35 text-[#8a6a24]',
  light: 'bg-white/12 border-white/25 text-white backdrop-blur-sm',
}

interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
}

/** Rótulo pequeno acima dos títulos de seção. */
export function Eyebrow({ tone = 'green', className, children, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          tone === 'orange'
            ? 'bg-orange'
            : tone === 'gold'
              ? 'bg-gold'
              : tone === 'dark' || tone === 'light'
                ? 'bg-green-moss'
                : 'bg-green',
        )}
      />
      <span className="text-[10.5px] font-bold uppercase tracking-[.08em]">{children}</span>
    </div>
  )
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

/** Etiqueta de card: "Novidade", "Mais pedido", gramatura. */
export function Badge({ tone = 'dark', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full border px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[.07em]',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}

interface SectionTitleProps {
  eyebrow: string
  title: React.ReactNode
  description?: string
  tone?: Tone
  align?: 'left' | 'center'
  className?: string
}

/** Cabeçalho padrão de seção: rótulo, título serifado e linha de apoio. */
export function SectionTitle({
  eyebrow,
  title,
  description,
  tone = 'green',
  align = 'left',
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className="balance font-serif text-[clamp(1.85rem,5.2vw,3rem)] font-normal leading-[1.05] tracking-[-.015em]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'max-w-prose text-[15px] leading-relaxed',
            tone === 'light' || tone === 'dark' ? 'text-white/70' : 'text-neutral',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
