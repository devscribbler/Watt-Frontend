import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FONT_SIZES } from '@watt/theme'

export const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  link: {
    color: theme.palette.common.white,
  },
  buttonLabel: {
    lineHeight: 1,
    fontSize: FONT_SIZES.body1,
  },
  buttonRoot: {
    justifyContent: 'start',
  },
  sectionTitle: {
    textTransform: 'uppercase',
    color: theme.palette.grey[300],
  },
}))
