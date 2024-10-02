import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  adornment: {
    color: theme.palette.primary.main,
  },
  formHelperText: {
    paddingTop: '0.25em',
    float: 'right',
  },
}))
