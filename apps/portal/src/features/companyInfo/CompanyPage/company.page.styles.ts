import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    height: '100%',
    borderRight: `1px solid ${theme.palette.grey[400]}`,
  },
}))
