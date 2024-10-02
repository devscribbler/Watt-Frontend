import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const SUBHEADER_HEIGHT = 20 //20 * 4 = 80px

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflowX: 'auto',
    height: theme.spacing(SUBHEADER_HEIGHT),
    backgroundColor: theme.palette.common.white,
  },
  container: {
    height: '100%',
    display: 'flex!important',
    margin: 'auto',
  },
}))
