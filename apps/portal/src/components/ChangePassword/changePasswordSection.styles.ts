import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DRAWER_WIDTH } from '~/components/common/Drawer/drawer.styles'

const borderTop = '1px solid #f8f9fc' // TODO Change this when we have a styleguide for this color

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: DRAWER_WIDTH,
    },
    backgroundColor: 'white',
    height: theme.spacing(20),
    borderTop,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    display: 'flex',
    alignItems: 'center',
  },
}))
