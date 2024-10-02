import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f7f9fd',
  },
  main: {
    display: 'flex',
    flexGrow: 1,
  },
  footer: {
    flexShrink: 0,
  },
})
