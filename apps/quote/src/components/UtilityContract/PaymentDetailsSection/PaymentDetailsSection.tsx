import { Typography } from '@mui/material'
import { useSpacing } from '@watt/theme'
import { DirectDebitPaymentForm, DirectDebitPaymentFormType } from '../DirectDebitPaymentForm/DirectDebitPaymentForm'

type Props = {
  formId: string
  onFormSubmit: (data: DirectDebitPaymentFormType) => void
}

export const PaymentDetailsSection = ({ formId, onFormSubmit }: Props): JSX.Element => {
  const [mb8] = useSpacing('mb8')

  return (
    <div>
      <Typography variant="h5" component="h2" className={mb8}>
        Contract signing
      </Typography>
      <DirectDebitPaymentForm formId={formId} onFormSubmit={onFormSubmit} />
    </div>
  )
}
