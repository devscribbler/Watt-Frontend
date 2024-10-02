import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { PRIMARY_COLORS } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '0 2rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.6rem',
    marginBottom: '0.5rem',
  },
  linkText: {
    color: PRIMARY_COLORS.dark,
    fontSize: '1.6rem',
    marginBottom: '0.5rem',
  },
}))
