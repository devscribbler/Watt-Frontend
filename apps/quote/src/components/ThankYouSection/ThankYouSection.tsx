import { useCallback } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { DealCompleted, useIsDesktop, Button } from '@watt/components'
import en from '~/i18n'
import { useStyles } from './thankYouSection.styles'

interface ThankYouSectionProps {
  isNewClient?: boolean
}

export const ThankYouSection = ({ isNewClient = false }: ThankYouSectionProps): JSX.Element => {
  const classes = useStyles()
  const isDesktop = useIsDesktop()
  const router = useRouter()

  const { title, description } = en.thankYouScreen

  const handleRedirectSeeContracts = useCallback(() => {
    router.push(`/see-contracts-portal`)
  }, [router])

  return (
    <Container>
      <div className={classes.contentContainer}>
        <Grid
          container
          spacing={!isDesktop ? 4 : 10}
          className={classes.gridContainer}
          direction={!isDesktop ? 'column-reverse' : 'row'}
        >
          <Grid item xs sm="auto" md={9}>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.description}>{description}</Typography>
          </Grid>
          <Grid item xs sm="auto" md={3}>
            <DealCompleted width={!isDesktop ? 120 : 'auto'} height={!isDesktop ? 120 : 'auto'} />
          </Grid>
        </Grid>
      </div>
      {!isNewClient && (
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleRedirectSeeContracts}>
            {en.common.buttons.seeContracts}
          </Button>
        </div>
      )}
    </Container>
  )
}
