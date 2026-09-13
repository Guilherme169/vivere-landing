import type { Meal } from '@/types'
import { cn } from '@/lib/cn'

interface MealImageProps {
  meal: Meal
  className?: string
  sizes?: string
  eager?: boolean
}

/**
 * Foto do prato em WebP com fallback JPEG. Dimensões explícitas evitam o
 * deslocamento de layout enquanto a imagem carrega.
 */
export function MealImage({ meal, className, sizes, eager }: MealImageProps) {
  if (!meal.image) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-green-forest text-green-moss/45',
          className,
        )}
        aria-hidden="true"
      >
        <span className="font-serif text-[2.6rem] leading-none">V</span>
      </div>
    )
  }

  return (
    <picture>
      <source srcSet={`/images/menu/${meal.image}.webp`} type="image/webp" />
      <img
        src={`/images/menu/${meal.image}.jpg`}
        alt={meal.name}
        width={700}
        height={700}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  )
}
