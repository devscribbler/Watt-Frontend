import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { SECONDARY_COLORS } from '@watt/theme'

const borderTop = '1px solid'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'white',
    height: theme.spacing(20),
    borderTop,
    borderColor: SECONDARY_COLORS.ultralight,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'fixed',
    alignItems: 'center',
    display: 'flex',
    zIndex: theme.zIndex.appBar,
  },
}))
