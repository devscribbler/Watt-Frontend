import { Facebook, LinkedIn, Twitter } from '@mui/icons-material'
import { Box, Divider, Grid, Link, Typography } from '@mui/material'
import clsx from 'clsx'
import { useStyles } from './FooterDesktop.styles'

export function FooterDesktop() {
  const classes = useStyles()
  return (
    <footer>
      <Grid container direction="row" className={classes.root} spacing={5}>
        <Grid item xs={12} md={2} lg={3}></Grid>
        <Grid item xs={12} md={2} lg={1}>
          <Grid container direction="column">
            <Grid item xs={12} className={classes.gridPadding}>
              <Typography variant="h6" className={clsx(classes.textColor, classes.header)}>
                ABOUT US
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link href="https://watt.co.uk/about/about-watt/" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">ABOUT US</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://watt.co.uk/about/careers/" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">CAREERS</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://watt.co.uk/about/reviews/" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">REVIEWS</Typography>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="https://watt.co.uk/bills-utility-hub/" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">BILL&apos;S UTILITY HUB</Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} lg={3}>
          <Grid container direction="column">
            <Grid item xs={12} className={classes.gridPadding}>
              <Typography variant="h6" className={clsx(classes.textColor, classes.header)}>
                MORE INFO
              </Typography>
            </Grid>
            <Grid item>
              <Link href="/assets/pdf/watt-complaints.pdf" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">COMPLAINTS PROCEDURE</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://watt.co.uk/help/privacy-policy/" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">PRIVACY POLICY</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="assets/pdf/watt-terms-and-conditions.pdf" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">TERMS & CONDITIONS</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://watt.co.uk/help/tpi-code-of-conduct/" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">TPI CODE OF CONDUCT</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://watt.co.uk/glossary/" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">GLOSSARY OF TERMS</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/assets/pdf/watt_loa.pdf" target="_blank" rel="noopener noreferrer">
                <Typography variant="caption">LETTER OF AUTHORITY</Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} lg={1}>
          <Grid container direction="column">
            <Grid item xs={12} className={classes.gridPadding}>
              <Typography variant="h6" className={classes.header}>
                CONTACT
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">Contact</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">0161 833 8661</Typography>
            </Grid>
            <Grid item>
              <Link
                href="mailto:hello@watt.co.uk"
                color="inherit"
                underline="none"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Typography variant="caption">hello@watt.co.uk</Typography>
              </Link>
            </Grid>
            <Grid container spacing={2} className={classes.socialsStyling}>
              <Grid item xs={12}>
                <Typography variant="h6" className={clsx(classes.subHeading, classes.header)}>
                  SOCIAL
                </Typography>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/wattutilities"
                  color="inherit"
                  underline="none"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Box>
                    <Twitter />
                  </Box>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://www.facebook.com/wattutilitiesuk"
                  color="inherit"
                  underline="none"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Box>
                    <Facebook />
                  </Box>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://www.linkedin.com/company/watt-utilities-uk-ltd"
                  color="inherit"
                  underline="none"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Box>
                    <LinkedIn />
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} lg={2}>
          <Grid container spacing={2} direction="row" className={classes.logoStyling}>
            <Grid item xs={12}>
              <Link href="https://watt.co.uk" color="inherit" underline="none">
                <Box>
                  <img src="/assets/img/watt-logo.svg" alt="Watt.co.uk logo - go to home" height="32px" />
                </Box>
              </Link>
            </Grid>
            <Grid item xs={5}>
              <Divider orientation="horizontal" style={{ background: 'white' }} />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" className={classes.logoStyling}>
                <Grid item xs={3}>
                  <Link
                    href="https://www.investorsinpeople.com/"
                    color="inherit"
                    underline="none"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Box>
                      <img src="/assets/img/iip-logo.png" alt="iip-logo" height="30em" />
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={3}>
                  <Link
                    href="https://ico.org.uk/"
                    color="inherit"
                    underline="none"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Box>
                      <img src="/assets/img/ico-logo.svg" alt="ico-logo" height="30em" />
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Link
                href="https://www.investorsinpeople.com/"
                color="inherit"
                underline="none"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Box>
                  <img src="/assets/img/tpicodeofpractice.png" alt="iip-logo" height="40em" />
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}
