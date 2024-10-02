import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    background: '#203649',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: 0,
    },
  },
  socialsStyling: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '1em',
    },
  },

  logoStyling: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  gridPadding: {
    paddingButtom: '1em',
  },
  textColor: {
    color: 'white',
  },
  subHeading: {
    color: 'white',
    paddingTop: '1em',
  },
  header: {
    fontWeight: 'bold',
    paddingBottom: '0.5em',
    color: 'white',
    fontSize: '1em',
  },
}))
