import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    paddingBottom: '1em',
  },
}))
