import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f7f9fd',
  },
  main: {
    flexGrow: 1,
  },
  footer: {
    flexShrink: 0,
  },
})
