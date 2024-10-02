import { useEffect } from 'react'
import { LineWeight, DoneOutline, Phone } from '@mui/icons-material'
import { Box, Container, Grid, IconButton, Link, Typography } from '@mui/material'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { Button } from '@watt/components'
import { GasIcon, InfoIcon, MenuIcon } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { LayoutDefault } from '~/components/LayoutDefault/LayoutDefault'
import { SpeechBubble } from '~/components/SpeechBubble/SpeechBubble'
import { ContractPreviewSection } from '~/components/UtilityContract'
import { WATT_PHONE_NUMBER } from '~/constants/global'
import { getContractsByUtilityTypeThunk } from '~/store/reducers/contracts/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { useConfirmationStyles } from './success.styles'

const ConfirmationPage: NextPage = () => {
  const [mt8, mt4, mt2, mb8, pt8, pr8, pl8] = useSpacing('mt8', 'mt4', 'mt2', 'pt8', 'pr8', 'pl8', 'pb8')
  const dispatch = useAppDispatch()
  const electricityPdfUrl = useAppSelector((state) => state.cart['electricity']?.contract.pdfUrl)

  useEffect(() => {
    dispatch(getContractsByUtilityTypeThunk({ utilityType: 1 }))
  }, [dispatch])

  const classes = useConfirmationStyles()

  return (
    <LayoutDefault>
      <Container className={mt4}>
        <div className={clsx(mb8, pt8, pr8, pl8)}>
          <div className={classes.root}>
            <Grid container spacing={1} direction="row">
              <Grid item xs={12} md={5}>
                <Typography variant="h4">Thank you for using Watt.co.uk...</Typography>
              </Grid>
              <Grid item xs={11} md={6}>
                <Typography variant="h4">Your chosen quote has been accepted....</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h1">
                  <DoneOutline fontSize="inherit" />
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h5">Next steps...</Typography>
            <div className={mt2}>
              <Typography variant="body2">
                Now you have chosen your contract and tariff, we will confirm when your contract has been locked in by
                your chosen supplier and confirm your energy supply start date. If you have more than one energy supply
                point, we will inform you of the start date for each one, as it&apos;s confirmed. Ins ome cases,
                suppliers can reject the contract subject to credit check, pricing issues or reasons beyond our control
                and if this happens we will contact you with an alternative solution. In some cases, previous suppliers
                can object to accounts being transferred. Reasons for objecting can include a customer is still in a
                fixed term contract or there is debt on the account. If this happens we will contact you and we can work
                to resolve the objection. For more information about why suppliers object, please view this FAQ on our
                website.
              </Typography>
            </div>
            {electricityPdfUrl && (
              <Grid container>
                <Grid item className={mt8} xs={12}>
                  <ContractPreviewSection url={electricityPdfUrl} contractViewed={true} />
                </Grid>
              </Grid>
            )}
            <div className={mt8}>
              <Typography variant="subtitle2">Terms and conditions</Typography>
              <Typography variant="body1" className={mt4}>
                A copy of your terms and conditions and the principle terms are available on our site{' '}
                <Link
                  href="assets/pdf/watt-terms-and-conditions.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontWeight: '600', color: 'black' }}
                >
                  here.
                </Link>
              </Typography>
              <Typography variant="caption">
                Prices are valid at the time of quotation but may be withdrawn at the supplier&apos;s discretion due to
                fluctuations in the energy market and are subject to a satisfactory credit check. All Prices quoted are
                base unity rate+1p/kwh commision and standing charge for energy. These prices may include FIT, RO and
                other pass-through charges and government charges or taxes unless otherwise stated. In order for you to
                move to another supplier, contract termination has to be sent to your current supplier. If you
                subsequently fail to agree a new contract before the end of the contract, the current supplier will
                charge you out-of-contract rates until such time as a new contract is agreed. For more information
                please see you contract terms and conditions or contact the sender. The sender does not accept
                responsibility for any errors or omissions.
              </Typography>
            </div>
          </div>
          <div className={clsx(mt8, classes.cardsRoot)}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Grid container direction="row" className={classes.cardGridLeft}>
                  <Grid item xs={2}>
                    <IconButton className={classes.iconLeft} disabled>
                      <GasIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2" className={classes.textWhite}>
                      Want to renew or switch your utility supplier to reduce gas bill?
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="caption" className={classes.textWhite}>
                          However, we are experts in our field and know the ins and outs of every supplier, tariff and
                          contracts out there.| As a result, a member of our team can offer you independent energy
                          advice and conduct a full energy market review to source the best deal for the needs of your
                          business.{' '}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Link href={`tel:${WATT_PHONE_NUMBER}`}>
                          <Button variant="contained" color="secondary">
                            Call us on {WATT_PHONE_NUMBER}
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container direction="row" className={classes.cardGridMid}>
                  <Grid item xs={2}>
                    <IconButton className={classes.iconMid} disabled>
                      {/* TODO change icon */}
                      <LineWeight />
                    </IconButton>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2" className={classes.textBlack}>
                      Our Energy Solutions{' '}
                    </Typography>
                    <Grid container>
                      <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="caption" className={classes.textBlack}>
                          <Link
                            href="https://watt.co.uk"
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontWeight: '600', color: 'black' }}
                          >
                            Watt.co.uk
                          </Link>{' '}
                          and our partner GSM-E assists business in their push for energy demand by using energy
                          efficient equipment and/or micro-generation to deduce customers’ energy requirements to create
                          a more stable UK energy market for the future.
                        </Typography>
                        <Typography variant="caption" className={classes.textBlack}>
                          It’s Watt we do!{' '}
                        </Typography>
                        <Link href="https://watt.co.uk/contact/" target="_blank" rel="noreferrer">
                          <Box className={clsx(mt4, classes.getInTouchCTA)}>
                            <Typography variant="caption">
                              Get in touch today to look at our energy solutions…
                            </Typography>
                          </Box>
                        </Link>
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: '1em' }}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <IconButton>
                              <GasIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs={3}>
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs={3}>
                            <IconButton>
                              <MenuIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs={3}>
                            <IconButton>
                              <GasIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container direction="row" className={classes.cardGridRight}>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2" className={classes.textBlack}>
                      Bill’s utility hub is now open, providing you with helpful advice regarding your business
                      utilities.
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Typography variant="caption" className={classes.textBlack}>
                          Use our Utility hub to set yourself all your utility reminders. Fill in this short form so we
                          can remind you when it is time to renew or switch your utilities. It’s Watt we do!{' '}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <SpeechBubble />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className={clsx(mt8, classes.bottomCardRoot)}>
            <div className={classes.bottomCardEmpty} />
            <div className={classes.bottomCardFlex}>
              <Typography variant="h6" style={{ color: 'white' }}>
                ALTERNATIVELY, GIVE US A CALL ON:
              </Typography>
              <Link href={`tel:${WATT_PHONE_NUMBER}`}>
                <Button variant="contained" color="secondary" className={mt4} endIcon={<Phone />}>
                  {WATT_PHONE_NUMBER}
                </Button>
              </Link>
            </div>
            <div className={classes.bottomCardEmpty} />
          </div>
        </div>
      </Container>
    </LayoutDefault>
  )
}

export default ConfirmationPage
