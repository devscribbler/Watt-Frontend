import * as React from 'react'
import { CircularProgress, Typography, Grid, Box } from '@mui/material'
import { useStyles } from './stepper.styles'

export type Step = {
  index: number
  page: string
  label: string
  state: 'active' | 'completed' | 'default'
}

type Props = {
  steps: Step[]
}

export const Stepper = ({ steps }: Props): JSX.Element => {
  const classes = useStyles()
  const activeStep = steps.findIndex((step) => step.state === 'active')

  const percentComplete = Math.round(((activeStep + 1) / steps.length) * 100)

  return (
    <Grid container>
      <Grid item xs={2}></Grid>
      <Grid item xs={2} display="flex" alignItems="center" justifyContent="center">
        <Box position="relative" display="inline-flex">
          <div style={{ position: 'relative' }}>
            <CircularProgress
              size="3em"
              variant="determinate"
              value={100}
              className={classes.circularProgressGray}
              classes={{
                circleDeterminate: classes.circleDeterminate,
              }}
            />
            <CircularProgress size="3em" variant="determinate" value={percentComplete} />
          </div>
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="textSecondary">
              {activeStep + 1} of {steps.length}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6} display="flex" alignItems="center" justifyContent="center">
        <Grid container direction="column" justifyContent="center" alignItems="flex-end">
          <Grid item xs={12}>
            <Typography variant="body2" component="div" color="textSecondary">
              {steps[activeStep].label}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {activeStep + 1 < steps.length && (
              <Typography variant="caption" component="div" color="textSecondary">
                Next: {steps[activeStep + 1].label}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
