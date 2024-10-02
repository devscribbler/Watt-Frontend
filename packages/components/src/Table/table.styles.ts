import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { SECONDARY_COLORS, GREY_SHADES, FONT_SIZES } from '@watt/theme'

export const useStyles = makeStyles<Theme, { border?: boolean }>((theme) => ({
  root: {
    borderRadius: ({ border }) => (border ? theme.shape.borderRadius : '5px'),
    width: '100%',
  },
  table: {
    width: '100%',
  },
  tableHeadCell: {
    fontSize: FONT_SIZES.body1,
    fontWeight: 'bold',
    lineHeight: '1.5',
    color: SECONDARY_COLORS.main,
    background: SECONDARY_COLORS.ultralight,
  },
  clickableRow: {
    cursor: 'pointer',
  },
  tableBodyRow: {
    fontSize: FONT_SIZES.subtitle1,
    lineHeight: '1.5',
    fontWeight: 'normal',
    color: GREY_SHADES[600],
  },
}))
