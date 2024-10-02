import { Box, Divider, Grid, InputLabel, Typography, FormControl, Input } from '@mui/material'
import { NextPage } from 'next'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { cfg } from '~/config/config'
import { RootState } from '~/store'
import { useAppSelector } from '~/store/selectors'
import { required } from '~/utils/reactHookFormRules'
import { getStepsBySelectedUtilityTypes } from '~/utils/steps'
import { LayoutWithSubheader } from '../components/LayoutWithSubheader/LayoutWithSubheader'
import { ThankYouSection } from '../components/ThankYouSection'

const ThankYouPage: NextPage = () => {
  const [pt16, mb8] = useSpacing('pt16', 'mb8')

  // TODO (James): This function only cares about electricity - we will need to update this when we support
  // gas and other utilities
  // TODO (James): This used to show the /register page but it is hardcoded to /success
  const utilityTypes = useAppSelector((state: RootState) => state.form.selectedUtilities)
  const steps = getStepsBySelectedUtilityTypes({ currentPage: cfg.pages.premium, utilityTypes })

  const { control } = useForm({ defaultValues: { email: '', password: '' } })

  return (
    <LayoutWithSubheader steps={steps}>
      <Box style={{ paddingLeft: '5vw' }}>
        <Grid container spacing={10} className={pt16}>
          <Grid item xs={12} lg={8}>
            <ThankYouSection isNewClient={true} />
          </Grid>
          <Grid item xs={'auto'} lg={1} container justifyContent="center">
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Grid container spacing={10} className={mb8}>
              <Grid item xs={12}>
                <Typography variant="h5" component="h2" className={mb8}>
                  Register
                </Typography>
                <Typography>Your security code was sent to your email address. Please add it below.</Typography>
                <form
                  id="register"
                  onSubmit={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Controller
                    control={control}
                    rules={{ required }}
                    name="email"
                    render={({ field }) => (
                      <FormControl className={mb8}>
                        <Grid container spacing={2}>
                          <Grid item xs={7}>
                            <InputLabel>Email</InputLabel>
                            <Input id="email" placeholder="name@comp.com" {...field} />
                          </Grid>
                          <Grid item xs={5} style={{ marginTop: '2.5vh' }}>
                            <Button variant="outlined" color="primary">
                              Resend Code
                            </Button>
                          </Grid>
                        </Grid>
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    rules={{ required }}
                    name="email"
                    render={({ field }) => (
                      <FormControl fullWidth className={mb8}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <InputLabel>Security Code recieved via email *</InputLabel>
                            <Input id="security-code" placeholder="123456" {...field} />
                          </Grid>
                        </Grid>
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    rules={{ required }}
                    name="email"
                    render={({ field }) => (
                      <FormControl className={mb8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <InputLabel>Phone Number *</InputLabel>
                            <Input id="phone-number" placeholder="+44 7777 777777" {...field} />
                          </Grid>
                        </Grid>
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    rules={{ required }}
                    name="password"
                    render={({ field }) => (
                      <FormControl className={mb8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <InputLabel>Add password *</InputLabel>
                            <Input id="password" type="password" placeholder="examplepassword" {...field} />
                          </Grid>
                        </Grid>
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    rules={{ required }}
                    name="password"
                    render={({ field }) => (
                      <FormControl className={mb8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <InputLabel>Repeat password *</InputLabel>
                            <Input id="password" type="password" placeholder="examplepassword" {...field} />
                          </Grid>
                        </Grid>
                      </FormControl>
                    )}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit" style={{ width: '14vw' }}>
                        Register
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutWithSubheader>
  )
}

export default ThankYouPage
