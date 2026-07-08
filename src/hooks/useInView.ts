import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight scroll-reveal hook built on IntersectionObserver.
 * Stands in for `framer-motion`'s `whileInView` without adding a
 * runtime dependency — pair it with the `animate-fade-up` Tailwind
 * utility (see tailwind.config.js) for a fade + slide-up reveal.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}
