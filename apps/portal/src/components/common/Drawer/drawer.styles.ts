import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GREY_SHADES, SECONDARY_COLORS } from '@watt/theme'

export const DRAWER_WIDTH = `320px`

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
      zIndex: theme.zIndex.appBar,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    paddingTop: theme.spacing(42),
    width: DRAWER_WIDTH,
    zIndex: theme.zIndex.mobileStepper,
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    marginRight: 0,
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(20),
    },
    [theme.breakpoints.up('xl')]: {
      marginRight: theme.spacing(30),
    },
  },
  drawerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  listContainer: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
  },
  labelList: {},
  selectedItem: {
    background: `linear-gradient(to right, ${SECONDARY_COLORS.main}, ${SECONDARY_COLORS.main} 4px, ${SECONDARY_COLORS.ultralight} 4px, ${SECONDARY_COLORS.ultralight} 100%)`,
    width: `100%`,
    paddingLeft: theme.spacing(10),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  item: {
    paddingLeft: theme.spacing(10),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  myAccount: {
    color: GREY_SHADES[400],
    paddingLeft: theme.spacing(10),
    marginBottom: theme.spacing(18),
  },
}))
