import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { PRIMARY_COLORS } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  estimateBill: {
    fontWeight: 'bold',
    color: theme.palette.grey[600],
  },

  newEstimateTable: {
    borderLeft: '3px solid' + PRIMARY_COLORS.main,
    borderRight: '3px solid' + PRIMARY_COLORS.main,
  },
  newEstimateBill: {
    borderBottom: '3px solid ' + PRIMARY_COLORS.main,
    borderLeft: '3px solid' + PRIMARY_COLORS.main,
    borderRight: '3px solid' + PRIMARY_COLORS.main,
  },
}))
