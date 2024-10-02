import { PaletteOptions } from '@mui/material'

export const PRIMARY_COLORS = {
  main: '#93BD22',
  light: '#B3D164',
  dark: '#76971B',
  ultralight: '#eff3e3',
}

export const SECONDARY_COLORS = {
  main: '#203649',
  light: '#4d5e6d',
  dark: '#162633',
  ultralight: '#e3eaff',
}

export const ERROR_COLORS = {
  main: '#d13124',
  light: '#df6f66',
  dark: '#a7271d',
}

export const GREY_SHADES = {
  50: '#fbfbff',
  100: '#eaedf5',
  200: '#d8dbe3',
  300: '#c1c6d6',
  400: '#92959e',
  500: '#827d87',
  600: '#3f3f3a',
}

export const UNCATEGORIZED_COLORS = {
  yellow: '#FBC900',
  lightblue: '#f8f9fc',
}

export const palette: PaletteOptions = {
  primary: PRIMARY_COLORS,
  secondary: SECONDARY_COLORS,
  error: ERROR_COLORS,
  grey: GREY_SHADES,
  background: {
    default: '#fafafa',
  },
}
