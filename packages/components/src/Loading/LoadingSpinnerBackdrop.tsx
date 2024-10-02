import { Backdrop, CircularProgress } from '@mui/material'
import { useStyles } from './LoadingSpinnerBackdrop.styles'

export function LoadingSpinnerBackdrop() {
  const classes = useStyles()
  return (
    <Backdrop open={true} className={classes.backdrop}>
      <CircularProgress color="primary" />
    </Backdrop>
  )
}
