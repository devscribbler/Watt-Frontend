import { Container, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Button } from '@watt/components'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    background: theme.palette.secondary.main,
    fontWeight: 'bold',
    color: theme.palette.common.white,
    borderRadius: 8,
    borderColor: theme.palette.common.white,
    width: '100%',
  },
}))

export const LoginButton = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Container>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => {
          console.log('login')
        }}
      >
        Login
      </Button>
    </Container>
  )
}
