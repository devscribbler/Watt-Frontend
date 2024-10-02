import * as React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { useSpacing } from '@watt/theme'
import Link from '../common/Link/Link'
import { useStyles } from './footer.styles'

interface Props {
  classes?: string
}

export const Footer: React.FunctionComponent<Props> = ({ classes }) => {
  const styles = useStyles()
  const [py4] = useSpacing('py4')

  return (
    <footer className={clsx(py4, styles.root, classes)}>
      <Container>
        <Grid container justifyContent="space-between">
          <Grid item xs={12}>
            <Typography variant="body2">Copyright © {new Date().getFullYear()} Watt.co.uk</Typography>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item>
              <Link href="/">Home</Link>
            </Grid>
            <Grid item>
              <Link href="/login">Login</Link>
            </Grid>
            <Grid item>
              <Link href="/about">About</Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}
