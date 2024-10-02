import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GREY_SHADES, SECONDARY_COLORS, DEFAULT_BORDER_RADIUS, ERROR_COLORS } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  inputFieldAutocompleteStyle: {
    overflow: 'hidden',
    maxWidth: '100%',
    background: `#fff`,
    fontWeight: 'bold',
    '&$disabled': {
      backgroundColor: GREY_SHADES[100],
      color: GREY_SHADES[500],
      fontWeight: 'normal',
      borderColor: GREY_SHADES[300],
    },
  },
  autocompleteStyle: {
    border: `1px solid ${GREY_SHADES[200]}`,
  },
  errorBorder: {
    border: `1px solid`,
    borderColor: `${ERROR_COLORS.main}`,
  },
  supplierCardContainer: {
    borderRadius: DEFAULT_BORDER_RADIUS,
    zIndex: theme.zIndex.mobileStepper,
  },
  activeSupplierCard: {
    borderColor: SECONDARY_COLORS.main,
  },
}))
