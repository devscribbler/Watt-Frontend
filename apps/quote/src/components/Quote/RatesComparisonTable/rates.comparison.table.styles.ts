import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    paddingTop: theme.spacing(5),
  },
  cellFooter: {
    border: 0,
  },
}))
