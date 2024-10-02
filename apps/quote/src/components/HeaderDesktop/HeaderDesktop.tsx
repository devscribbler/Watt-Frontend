import { AppBar, Grid, Toolbar, Container, Link, Typography, Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useSpacing } from '@watt/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    color: theme.palette.common.white,
    fontWeight: '600',
  },
  items: {
    justifyContent: 'flex-end',
  },
}))

const Links = [
  { link: 'https://watt.co.uk/large-businesses', text: 'Tailored offers' },
  { link: 'https://watt.co.uk/bills-utility-hub/', text: 'Bill’s utility hub' },
  { link: 'https://watt.co.uk/about/about-watt/', text: 'About Us' },
  { link: 'https://watt.co.uk/contact/', text: 'Contact' },
]

export const HeaderDesktop = (): JSX.Element => {
  const [pt4, mb5, pt1] = useSpacing('pt4', 'mb5', 'pt1')
  const classes = useStyles()

  return (
    <AppBar color="secondary">
      <Typography variant="caption" style={{ position: 'absolute', right: 3 }}>
        {process.env.NEXT_PUBLIC_GITHUB_SHA && <span>SHA: {process.env.NEXT_PUBLIC_GITHUB_SHA}</span>}
      </Typography>
      <Toolbar>
        <Container className={mb5}>
          <Container className={pt4}>
            <Grid container spacing={2} direction="row" display="flex" alignItems="center">
              <Grid item xs={3}>
                <Container className={pt1}>
                  <Link href="https://watt.co.uk" color="inherit" underline="none">
                    <Box>
                      <img src="/assets/img/watt-logo.svg" alt="Watt.co.uk logo - go to home" height="32px" />
                    </Box>
                  </Link>
                </Container>
              </Grid>
              <Grid container item className={classes.items} sm={9} md={8}>
                {Links.map((link) => (
                  <Grid key={link.text} item>
                    <Container className={pt1}>
                      <Link href={link.link}>
                        <Typography variant="button" className={classes.button}>
                          {link.text}
                        </Typography>
                      </Link>
                    </Container>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
