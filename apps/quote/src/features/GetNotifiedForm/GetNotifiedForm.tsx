import * as React from 'react'
import { Container, Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { DatesForm } from './DatesForm'
import { InformationForm } from './InformationForm'
import { GetNotifiedFormValues, getNotifiedFormDefaultValues, formConfig } from './formConfig'

export const GetNotifiedForm: React.FC = () => {
  const methods = useForm<GetNotifiedFormValues>({ defaultValues: getNotifiedFormDefaultValues })
  const [pt4, pb10] = useSpacing('pt4', 'pb10')

  return (
    <>
      <FormProvider {...methods}>
        <form id={formConfig.id}>
          <div
            style={{
              width: '100%',
              height: '10vh',
              display: 'flex',
              background: '#93BD22',
              color: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.5rem',
            }}
          >
            Set up a reminder
          </div>
          <Container className={pt4}>
            <Container className={pb10}>
              <Grid container spacing={3} direction={'row'}>
                <Grid item xs={4}>
                  <Grid container spacing={5} direction={'column'}>
                    <Grid item xs={11} md={11}>
                      &quot;Dont forget&quot; image here
                    </Grid>
                    <Grid item xs={1} md={11}>
                      Fill in this short form so we can remind you when&apos;s best to switch.
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={5} direction={'column'}>
                    <Grid item xs={11} md={12}>
                      <InformationForm />
                    </Grid>
                    <Grid item xs={1} md={12}>
                      <Button variant="contained" color="primary" fullWidth>
                        Set a reminder
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <DatesForm />
                </Grid>
              </Grid>
            </Container>
          </Container>
        </form>
      </FormProvider>
    </>
  )
}
