import { useCallback, useEffect, useRef, useState } from 'react'

interface UseCarouselOptions {
  itemCount: number
  autoplayMs?: number
}

/**
 * Drives a horizontal scroll-snap carousel: tracks the active index,
 * exposes a `scrollTo(index)` helper, and optionally autoplays until
 * the user interacts with it.
 */
export function useCarousel({ itemCount, autoplayMs }: UseCarouselOptions) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      const index = Math.round(track.scrollLeft / track.clientWidth)
      setActiveIndex(index)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!autoplayMs || itemCount <= 1) return
    const track = trackRef.current
    if (!track) return

    let stopped = false
    const interval = setInterval(() => {
      if (stopped) return
      const next = (Math.round(track.scrollLeft / track.clientWidth) + 1) % itemCount
      scrollTo(next)
    }, autoplayMs)

    const stop = () => {
      stopped = true
      clearInterval(interval)
    }
    track.addEventListener('touchstart', stop, { passive: true, once: true })
    track.addEventListener('pointerdown', stop, { once: true })

    return () => {
      clearInterval(interval)
      track.removeEventListener('touchstart', stop)
      track.removeEventListener('pointerdown', stop)
    }
  }, [autoplayMs, itemCount, scrollTo])

  return { trackRef, activeIndex, scrollTo }
}
