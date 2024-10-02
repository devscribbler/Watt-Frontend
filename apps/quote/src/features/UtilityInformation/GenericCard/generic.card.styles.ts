import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DEFAULT_BORDER_RADIUS } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    height: '100%',
    borderRadius: DEFAULT_BORDER_RADIUS,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8),
    },
  },
}))
