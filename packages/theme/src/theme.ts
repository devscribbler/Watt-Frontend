import { createTheme } from '@mui/material'
import { overrides } from './overrides'
import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'

// Create a theme instance.
export const theme = createTheme({
  components: overrides,
  palette,
  shadows,
  spacing: 4,
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1400, // This breakpoint is different from the M-UI  default breakpoints
      xl: 1920,
    },
  },
})
