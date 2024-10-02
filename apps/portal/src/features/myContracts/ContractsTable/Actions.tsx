/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material'
import { Contract } from '@watt/api-interface'
import en from '~/i18n'
import { getDifferenceBetweenTwoDates, getDuration } from '~/utils/date'
import { ContractDownload } from './ContractDownload'
import { useStyles } from './contracts.styles'

interface Props {
  handlePDF?: (pdf: string) => void
  contract: Contract
  comingSoon?: boolean
}

export const Actions = ({ handlePDF, contract, comingSoon }: Props): JSX.Element => {
  const classes = useStyles()
  const { unit } = getDuration(getDifferenceBetweenTwoDates(contract.start_date, contract.end_date))

  if (comingSoon) return <Typography>{en.myContracts.comingSoon}</Typography>

  return (
    <div className={classes.container}>
      {unit !== 'hours' && <ContractDownload contractLink={handlePDF} contractId={contract.id} />}
    </div>
  )
}
