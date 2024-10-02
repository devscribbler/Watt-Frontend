import { Fragment } from 'react'
import { InputAdornment, Typography } from '@mui/material'
import { InfoIconWithTooltip } from '@watt/components'
import en from '~/i18n'

const { companyInformation } = en

export function RegNumberAdornment() {
  return (
    <InputAdornment position="end">
      <InfoIconWithTooltip
        tooltipProps={{
          disableFocusListener: true,
          title: (
            <Fragment>
              <Typography color="inherit">{companyInformation.companyForm.registrationNumber.adornmentTop}</Typography>
              <Typography color="inherit">
                {companyInformation.companyForm.registrationNumber.adornmentBottom}
              </Typography>
              <img src="/assets/img/ex_companies_house.png" alt="Companies House" width="100%" />
            </Fragment>
          ),
        }}
      />
    </InputAdornment>
  )
}
