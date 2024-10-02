export function getBetterRate(current: number | null, next: number | null): 'current' | 'next' | 'none' {
  if (current === null || next === null) {
    return 'none'
  }

  if (current < next) {
    return 'current'
  }

  if (current > next) {
    return 'next'
  }

  return 'none'
}
