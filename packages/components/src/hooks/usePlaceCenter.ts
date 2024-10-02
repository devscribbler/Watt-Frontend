import { makeStyles } from '@mui/styles'

export function usePlaceCenter(): string {
  const useStyles = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  const classes = useStyles()

  return classes.root
}
