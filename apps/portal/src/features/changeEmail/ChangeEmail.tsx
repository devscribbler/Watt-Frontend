import * as React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { useSpacing } from '@watt/theme'
import { ChangeEmailSection } from '~/components/ChangeEmail/ChangeEmailSection'
import en from '~/i18n'

export const ChangeEmail: React.FunctionComponent = () => {
  const [mb10, mt16] = useSpacing('mb10', 'mt16')

  return (
    <div className={mt16}>
      <Box className={mb10}>
        <Typography component="h1" variant="h3" color="secondary">
          {en.accountInfo.changeEmail.changeEmailTitle}
        </Typography>
      </Box>
      <Grid container spacing={10}>
        <Grid item xs={12} md={5}>
          <ChangeEmailSection />
        </Grid>
      </Grid>
    </div>
  )
}
