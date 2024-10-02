import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FONT_SIZES, ERROR_COLORS, GREY_SHADES, SECONDARY_COLORS } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadContractText: {
    color: SECONDARY_COLORS.main,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.body1,
  },
  link: {
    textDecoration: 'none',
  },
  errorMessage: {
    color: ERROR_COLORS.main,
  },
  graySubtitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(10),
    color: GREY_SHADES[400],
    fontSize: FONT_SIZES.h6,
    lineHeight: '1.2',
  },
}))
