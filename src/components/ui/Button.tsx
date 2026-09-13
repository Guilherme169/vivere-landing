import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'dark' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-green text-green-deep shadow-lg shadow-green/25 hover:bg-green-hover',
  dark: 'bg-green-forest text-white hover:bg-green-deep',
  secondary: 'bg-white text-green-forest shadow-lg hover:bg-cream',
  outline: 'bg-transparent text-green-forest border border-green-forest/25 hover:bg-green-forest/5',
  ghost: 'bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-5 py-3 text-sm gap-2',
  lg: 'px-6 py-4 text-[15px] gap-2.5',
}

const base =
  'inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-colors duration-200 active:scale-[.98] disabled:opacity-50 disabled:pointer-events-none'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  )
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
}

/** Mesma linguagem visual do Button, para CTAs que navegam. */
export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      target={props.target ?? '_blank'}
      rel={props.rel ?? 'noopener noreferrer'}
      {...props}
    />
  )
}
