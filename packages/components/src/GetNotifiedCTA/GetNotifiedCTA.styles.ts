import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
  },
  content: {
    textAlign: 'center',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  title: {},
  subtitle: {
    paddingTop: '2.5%',
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  actionarea: {
    paddingTop: '2%',
    paddingBottom: '2%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '45%',
    height: '30%',
  },
}))
