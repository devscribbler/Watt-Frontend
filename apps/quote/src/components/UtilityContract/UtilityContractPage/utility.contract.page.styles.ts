import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  contractPreview: {
    [theme.breakpoints.up('lg')]: {
      display: 'initial',
    },
  },
  divider: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  hiddenInput: {
    display: 'none',
  },
}))
