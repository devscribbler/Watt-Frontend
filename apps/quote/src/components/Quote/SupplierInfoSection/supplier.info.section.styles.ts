import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  image: {
    display: 'flex',
    margin: '0 auto',
    justifyContent: 'center',
    paddingBottom: '10%',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'initial',
    },
  },
}))
