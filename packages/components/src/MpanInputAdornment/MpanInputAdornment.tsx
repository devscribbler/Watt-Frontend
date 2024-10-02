import { Fragment } from 'react'
import { InputAdornment, Typography } from '@mui/material'
import { InfoIconWithTooltip } from '@watt/components'

export const MpanInputAdornment = (): JSX.Element => {
  return (
    <InputAdornment position="start">
      <InfoIconWithTooltip
        tooltipProps={{
          disableFocusListener: true,
          title: (
            <Fragment>
              <Typography color="inherit">
                You can find your Meter Point Administration Number (MPAN) on the electricity bill issued by your
                supplier.
              </Typography>
              <Typography color="inherit" gutterBottom>
                It has 21 digits and should be printed in the format below.
              </Typography>
              <img src="/assets/img/mpan.jpg" width="285px" alt="Meter Point Administration Number" />
            </Fragment>
          ),
        }}
      />
    </InputAdornment>
  )
}
