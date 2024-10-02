import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GREY_SHADES } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  borderBottom: {
    borderBottom: `1px solid ${GREY_SHADES[200]}`,
    [theme.breakpoints.up('lg')]: {
      borderBottom: 'none',
    },
  },
  buttonRoot: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  buttonLabel: {
    lineHeight: 1,
  },
  marginBottom: {
    marginBottom: theme.spacing(6),
  },
}))
