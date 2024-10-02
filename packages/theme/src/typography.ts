import { TypographyOptions } from '@mui/material/styles/createTypography'
import { GREY_SHADES, SECONDARY_COLORS } from './palette'

export const FONT_SIZES = {
  h1: '3.5rem',
  h2: '3rem',
  h3: '2.5rem',
  h4: '2rem',
  h5: '1.5rem',
  h6: '1.25rem',
  body1: '1rem',
  body2: '1rem',
  subtitle1: '0.875rem',
  subtitle2: '0.875rem',
  button: '1.25rem',
}

export const typography: TypographyOptions = {
  fontFamily: `'Open Sans', sans-serif`,
  h1: {
    fontSize: FONT_SIZES.h1,
    fontWeight: 'bold',
    lineHeight: '1.25',
    color: GREY_SHADES[600],
  },
  h2: {
    fontSize: FONT_SIZES.h2,
    fontWeight: 'bold',
    lineHeight: '1.25',
    color: GREY_SHADES[600],
  },
  h3: {
    fontSize: FONT_SIZES.h3,
    fontWeight: 'bold',
    lineHeight: '1.2',
    color: SECONDARY_COLORS.main,
  },
  h4: {
    fontSize: FONT_SIZES.h4,
    fontWeight: 'bold',
    lineHeight: '1.25',
    color: GREY_SHADES[600],
  },
  h5: {
    fontSize: FONT_SIZES.h5,
    fontWeight: 'bold',
    lineHeight: '1.25',
    color: SECONDARY_COLORS.main,
  },
  h6: {
    fontSize: FONT_SIZES.h6,
    fontWeight: 'bold',
    lineHeight: '1.2',
    color: SECONDARY_COLORS.main,
  },
  body1: {
    color: GREY_SHADES[600],
    fontWeight: 'normal',
    fontSize: FONT_SIZES.body1,
    // lineHeight: '1.5',
  },
  body2: {
    color: GREY_SHADES[600],
    fontWeight: 'bold',
    fontSize: FONT_SIZES.body2,
    // lineHeight: '1.5',
  },
  subtitle1: {
    fontSize: FONT_SIZES.subtitle1,
    lineHeight: '1.45',
    color: GREY_SHADES[600],
  },
  subtitle2: {
    fontSize: FONT_SIZES.subtitle2,
    lineHeight: '1.45',
    fontWeight: 'bold',
    color: GREY_SHADES[600],
  },
  button: {
    fontWeight: 'bold',
  },
}
