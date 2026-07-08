import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-green text-white shadow-lg shadow-green/30 hover:bg-green-dark',
  secondary: 'bg-white text-green-dark shadow-lg hover:bg-white/90',
  outline: 'bg-transparent text-green-dark border-[1.5px] border-green/35 hover:bg-green/5',
  ghost: 'bg-white/15 text-white border border-white/30 backdrop-blur-sm hover:bg-white/25',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-5 py-3 text-sm gap-2',
  lg: 'px-6 py-4 text-base gap-2.5',
}

const base =
  'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variantClasses[variant], sizeClasses[size], className)} {...props} />
  )
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
}

/** Same visual language as `Button`, for CTAs that navigate (WhatsApp, cardápio, Instagram). */
export function LinkButton({ variant = 'primary', size = 'md', className, ...props }: LinkButtonProps) {
  return (
    <a
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      target={props.target ?? '_blank'}
      rel={props.rel ?? 'noopener noreferrer'}
      {...props}
    />
  )
}
