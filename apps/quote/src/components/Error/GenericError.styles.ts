import { makeStyles } from '@mui/styles'
import { GREY_SHADES, PRIMARY_COLORS } from '@watt/theme'

export const useStyles = makeStyles(() => ({
  rootDiv: {
    display: 'flex',
    width: '100%',
    height: '100%',
    background: GREY_SHADES[400],
    // noselect
    zIndex: 1,
  },
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    background: PRIMARY_COLORS.main,
    width: '100%',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  warningIcon: {
    fontSize: '5rem',
    color: PRIMARY_COLORS.main,
  },
  headerDiv: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '1em',
    paddingRight: '1em',
  },

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
    paddingLeft: '2em',
    paddingRight: '2em',
    justifyContent: 'space-evenly',
  },

  importantDevicesIcon: {
    paddingRight: '0.25em',
    fontSize: '2em',
  },
  needToCallYou: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rootProceedContainer: {
    display: 'flex',
    marginBottom: '5%',
    flexDirection: 'row',
    paddingTop: '1em',
    zIndex: 5,
  },
  proceedContainer: {
    display: 'flex',
    padding: '0.5em',
    textAlign: 'center',
    fontWeight: 'bold',
    background: PRIMARY_COLORS.main,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    userSelect: 'auto',
    '&:hover': {
      background: PRIMARY_COLORS.dark,
    },
  },

  iconButton: {
    borderRadius: 0,
  },
}))
