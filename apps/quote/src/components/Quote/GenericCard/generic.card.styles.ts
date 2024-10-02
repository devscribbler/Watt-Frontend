import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DEFAULT_BORDER_RADIUS } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    height: '100%',
    borderRadius: DEFAULT_BORDER_RADIUS,
    boxShadow: theme.shadows[1],
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    padding: theme.spacing(6),
  },
}))
