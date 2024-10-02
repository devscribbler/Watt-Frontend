import { Container } from '@mui/material'
import { Stepper, Step } from '../Stepper/Stepper'
import { useStyles } from './subheader.styles'

type Props = {
  steps: Step[]
}

export const Subheader = ({ steps }: Props): JSX.Element => {
  const classes = useStyles()

  return (
    <header className={classes.root}>
      <Container className={classes.container}>
        <Stepper steps={steps} />
      </Container>
    </header>
  )
}
