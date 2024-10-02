import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(() => ({
  button: ({ visible }: { visible: boolean }) => ({
    display: visible ? 'flex' : 'none',
  }),
}))
