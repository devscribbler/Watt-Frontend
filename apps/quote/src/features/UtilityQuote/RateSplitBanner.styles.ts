import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  italicText: {
    color: theme.palette.grey[500],
  },
}))