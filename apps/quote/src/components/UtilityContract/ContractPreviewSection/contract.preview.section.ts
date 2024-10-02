import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  downloadLeft: {
    display: 'flex',
    flex: 3,
    padding: '0.75em',
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    background: 'white',
    boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',
    alignItems: 'center',
    paddingLeft: '3em',
  },
  downloadRight: {
    flex: 1,
    alignItems: 'stretch',
    display: 'flex',
  },
  downloadRightButton: {
    display: 'flex',
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    alignItems: 'center',
    flexDirection: 'column',
  },
  errorBorder: {
    border: '2px solid ' + theme.palette.error.main,
  },
  successBorder: {
    border: '2px solid ' + theme.palette.primary.main,
  },
  neutralBorder: {
    border: '2px solid ' + theme.palette.grey[400],
  },
  downloadText: {
    height: 0,
    color: theme.palette.error.main,
  },
  divider: {
    background: 'linear-gradient(to right, #E5E5E5,' + theme.palette.primary.main + ')',
    [theme.breakpoints.down('lg')]: {
      height: '1.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1.5rem',
    },
  },
  contractPreview: {
    minHeight: theme.spacing(100),
    overflowY: 'hidden',
  },
  gridWidthHeight: {
    width: '100%',
    height: '100%',
  },
  downloadButton: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    borderRadius: '0',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
