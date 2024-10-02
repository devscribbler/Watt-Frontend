import * as React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { useSpacing } from '@watt/theme'
import { ChangePasswordSection } from '~/components/ChangePassword/ChangePasswordSection'
import en from '~/i18n'

export const ChangePassword: React.FunctionComponent = () => {
  const [mb10, mt16] = useSpacing('mb10', 'mt16')

  return (
    <>
      <div className={mt16}>
        <Box className={mb10}>
          <Typography component="h1" variant="h3" color="secondary">
            {en.accountInfo.changePassword.title}
          </Typography>
        </Box>
        <Grid container spacing={10}>
          <Grid item xs={12} md={5}>
            <ChangePasswordSection />
          </Grid>
        </Grid>
      </div>
    </>
  )
}
