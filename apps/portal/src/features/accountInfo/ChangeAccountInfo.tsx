import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { ChangeEmailSection } from '@watt/portal/components/ChangeEmail/ChangeEmailSection'
import { ChangePasswordSection } from '@watt/portal/components/ChangePassword/ChangePasswordSection'
import en from '@watt/portal/i18n'
import { useSpacing } from '@watt/theme'
import { useStyles } from './page.styles'

export const ChangeAccountInfo: React.FunctionComponent = () => {
  const [mb10, mt16] = useSpacing('mb10', 'mt16')
  const classes = useStyles()

  return (
    <div className={mt16}>
      <Grid container spacing={1}>
        <Grid item xs={4} md={2}>
          <Box className={mb10}>
            <Typography component="h3" variant="h4" color="secondary">
              {en.accountInfo.changeEmail.changeEmailTitle}
            </Typography>
          </Box>
          <ChangeEmailSection />
        </Grid>
        <Grid item md={1}>
          <div className={classes.divider} />
        </Grid>
        <Grid item xs={4} md={2}>
          <Box className={mb10}>
            <Typography component="h3" variant="h4" color="secondary">
              {en.accountInfo.changePassword.title}
            </Typography>
          </Box>
          <ChangePasswordSection />
        </Grid>
      </Grid>
    </div>
  )
}
