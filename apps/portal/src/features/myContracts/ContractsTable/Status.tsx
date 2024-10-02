import { Typography } from '@mui/material'
import { Contract } from '@watt/api-interface'
import { getQuotationStatus } from '~/utils/getQuotationStatus'
import { useStyles } from './contracts.styles'

interface Props {
  contract: Contract
  comingSoon?: boolean
}

export const Status = ({ contract }: Props): JSX.Element => {
  const classes = useStyles()
  const { status, end_date } = contract
  const statusText = getQuotationStatus({ status, end_date })

  return (
    <div className={classes.container}>
      <Typography>{statusText}</Typography>
    </div>
  )
}
