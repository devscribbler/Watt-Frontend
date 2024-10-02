import { useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { UtilityType, UtilitySelectorGroup, GetAQuoteCTA, useIsDesktop } from '@watt/components'
import { UtilityKindType } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { UTILITY_PROVIDER_COUNT } from '~/config/utilities'
import { useOnClickGetAQuote } from '~/utils/homepage'
import { LayoutDefault } from '../components/LayoutDefault/LayoutDefault'
import { useStyles } from './index.styles'

const IndexPage: NextPage = () => {
  const isDesktop = useIsDesktop()
  const [pt10, pb8] = useSpacing('pt10', 'pb8')
  const [pt2, pb2] = useSpacing('pt2', 'pb2')
  const [pl2] = useSpacing('pl2')
  const [selectedUtilities, setSelectedUtilities] = useState<UtilityKindType[]>([])

  const classes = useStyles()

  const onGetAQuote = useOnClickGetAQuote(selectedUtilities)

  const listedUtilities = Object.entries(UTILITY_PROVIDER_COUNT).map(([utility, count]) => ({
    type: utility as UtilityType,
    supplierCount: count || 0,
    disabled: count === null,
  }))

  return (
    <LayoutDefault>
      <Container className={isDesktop ? pt10 : pt2}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography variant="h3" component="h3" className={isDesktop ? clsx(pt2, pb8) : clsx(pt2, pb2)}>
              Get a quote in a few minutes
              <Typography variant="body1" className={isDesktop ? clsx(pt2, pb2, pl2) : clsx(pt2, pb2, pl2)}>
                We&apos;ll find you a new energy deal, take care of all the setup work for you, and save you money as a
                result.
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={5} md={2}>
            <div className={classes.billieContainer}>
              <img src="assets/img/Bill-2red.png" alt="Bill" width={'100%'} height={'auto'} />
            </div>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h4" className={isDesktop ? clsx(pb8) : clsx(pb2)}>
          I am interested in
        </Typography>

        <UtilitySelectorGroup
          utilities={listedUtilities}
          onChange={(utilities) => {
            setSelectedUtilities(utilities)
          }}
        />

        <Typography variant="h4" component="h4" className={isDesktop ? clsx(pt10, pb8) : clsx(pt2, pb2)}>
          I want to
        </Typography>

        <Grid container spacing={6} direction="row" justifyContent="center" alignItems="center">
          <Grid item sm={12} md={6}>
            <GetAQuoteCTA onClick={onGetAQuote} />
          </Grid>

          <Grid item sm={12} md={4}>
            {/* <GetNotifiedCTA
              onClick={() => {
              }}
            /> */}
          </Grid>
        </Grid>
      </Container>
    </LayoutDefault>
  )
}

export default IndexPage
