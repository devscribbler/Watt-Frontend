import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DEFAULT_BORDER_RADIUS, FONT_SIZES, GREY_SHADES, PRIMARY_COLORS } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  contentContainer: {
    background: PRIMARY_COLORS.ultralight,
    borderRadius: DEFAULT_BORDER_RADIUS,
    marginBottom: theme.spacing(20),
  },
  gridContainer: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10),
    },
    padding: theme.spacing(4),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(8),
    },
    marginBottom: theme.spacing(6),
    fontSize: FONT_SIZES.h5,
    fontWeight: 'bold',
    color: GREY_SHADES[600],
  },
  description: {
    fontSize: FONT_SIZES.subtitle1,
    color: GREY_SHADES[600],
  },
}))
