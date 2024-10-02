import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { UNCATEGORIZED_COLORS } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: UNCATEGORIZED_COLORS.lightblue,
    [theme.breakpoints.up('md')]: {
      marginTop: '5em',
    },
    paddingBottom: '5rem',
  },
}))
