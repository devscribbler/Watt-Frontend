import { makeStyles } from '@mui/styles'
import { GREY_SHADES, SECONDARY_COLORS, DEFAULT_BORDER_RADIUS } from '@watt/theme'

export const useStyles = makeStyles({
  supplierCardContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid',
    borderRadius: DEFAULT_BORDER_RADIUS,
    borderColor: GREY_SHADES[200],
  },
  activeSupplierCard: {
    borderColor: SECONDARY_COLORS.main,
  },
  card: {
    width: '100%',
  },
})
