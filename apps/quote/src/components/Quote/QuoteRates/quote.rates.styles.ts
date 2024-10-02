import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  label: {
    padding: 0,
    fontSize: `0.875rem`,
    lineHeight: `20px`,
    letterSpacing: 0,
    color: theme.palette.grey[400],
    fontWeight: 'normal',
  },
  values: {
    fontStretch: 'normal',
    fontStyle: 'normal',
    padding: 0,
    paddingLeft: theme.spacing(6),
    fontSize: `1rem`,
    lineHeight: `24px`,
    letterSpacing: 0,
    color: theme.palette.grey[600],
    fontWeight: 'bold',
  },
}))
