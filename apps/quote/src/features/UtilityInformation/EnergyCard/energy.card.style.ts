import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflowX: 'auto',
    overflowY: 'hidden',
    [theme.breakpoints.up('md')]: {
      overflowX: 'initial',
      overflowY: 'initial',
    },
    width: '100%',
  },
  consumption: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  diagram: { height: '215px', minWidth: '500px', userSelect: 'none' },
}))
