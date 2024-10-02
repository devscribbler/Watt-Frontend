import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(20),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(40),
    },
  },
  menuButton: {
    marginRight: theme.spacing(9),
  },
  menuIcon: {
    color: 'white',
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
  },
}))
