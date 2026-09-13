import { brandImage } from '@/lib/brand'

interface BrandImageProps {
  file: string
  alt: string
  className?: string
  sizes?: string
  width: number
  height: number
}

/** Foto institucional em WebP com fallback JPEG e dimensões explícitas. */
export function BrandImage({ file, alt, className, sizes, width, height }: BrandImageProps) {
  return (
    <picture>
      <source srcSet={brandImage(file, 'webp')} type="image/webp" />
      <img
        src={brandImage(file, 'jpg')}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  )
}
