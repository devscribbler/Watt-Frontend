import { TableCell, Theme } from '@mui/material'
import { withStyles } from '@mui/styles'
import { PRIMARY_COLORS, GREY_SHADES } from '@watt/theme'

export const CustomTableCell = withStyles((theme: Theme) => ({
  root: {
    fontSize: '0.875rem',
    fontWeight: 'normal',
    fontStretch: 'normal',
    lineHeight: '1.43',
    letterSpacing: 'normal',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
  },
  body: (props) => {
    return {
      color: props.isBetterRate ? PRIMARY_COLORS.main : GREY_SHADES[500],
    }
  },
}))(TableCell)
