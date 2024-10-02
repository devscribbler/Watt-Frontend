import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    lineHeight: 0,
  },
  drawer: {
    width: 280,
  },
  paper: {
    backgroundColor: theme.palette.secondary.light,
    paddingTop: theme.spacing(4),
  },
}))
