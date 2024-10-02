import { useTheme, useMediaQuery } from '@mui/material'

export function useIsDesktop(): boolean {
  const { breakpoints } = useTheme()
  const isDesktop = useMediaQuery(breakpoints.up('lg'))

  return isDesktop
}
