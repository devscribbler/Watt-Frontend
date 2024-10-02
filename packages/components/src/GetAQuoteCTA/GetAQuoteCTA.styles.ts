import { makeStyles } from '@mui/styles'
import { PRIMARY_COLORS } from '@watt/theme'

export const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingTop: '5%',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bolder',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingBottom: '2%',
  },
  subtitle: {
    paddingLeft: '2%',
    paddingRight: '2%',
    fontSize: '0.8rem',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
    color: '#FFFFFF',
  },
  buttonEnabled: {
    backgroundColor: PRIMARY_COLORS.main,
    color: '#FFFFFF',
    fontSize: '1.5rem',
    padding: '0.5em 1em',

    '&:hover': {
      backgroundColor: PRIMARY_COLORS.light,
    },
  },
  actionarea: {
    paddingTop: '2%',
    paddingBottom: '2%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
