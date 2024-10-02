import { makeStyles } from '@mui/styles'
import { DEFAULT_BORDER_RADIUS, PRIMARY_COLORS, SECONDARY_COLORS } from '@watt/theme'

export const useStyles = makeStyles({
  root: {
    backgroundColor: SECONDARY_COLORS.ultralight,
    borderRadius: DEFAULT_BORDER_RADIUS,
  },
  newSupplierHead: {
    borderLeft: '3px solid ' + PRIMARY_COLORS.main,
    borderTop: '3px solid ' + PRIMARY_COLORS.main,
    borderRight: '3px solid ' + PRIMARY_COLORS.main,
  },
  boxRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  boxColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
})
