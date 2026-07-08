/**
 * Tiny className combinator, in the same spirit/API as the classic
 * shadcn/ui `cn()` helper (clsx + tailwind-merge), but hand-written
 * with zero runtime dependencies.
 *
 * It does not dedupe conflicting Tailwind utility classes the way
 * `tailwind-merge` would — components in this project avoid passing
 * conflicting classes to the same element, so this is safe here.
 * If the project grows and needs real conflict resolution, install
 * `clsx` + `tailwind-merge` and swap the implementation below without
 * touching any call sites.
 */
export type ClassValue = string | number | null | boolean | undefined | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []

  const walk = (value: ClassValue): void => {
    if (!value) return
    if (Array.isArray(value)) {
      value.forEach(walk)
      return
    }
    out.push(String(value))
  }

  inputs.forEach(walk)
  return out.join(' ')
}
