import { Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { PaymentMethodsKeysType, PAYMENT_METHODS } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'

type Props = {
  filterByPaymentMethod: (paymentMethod: PaymentMethodsKeysType, checked: boolean) => void
  className?: string
}

export const PaymentTypeFilter = ({ filterByPaymentMethod, className }: Props): JSX.Element => {
  const [pb6] = useSpacing('pb6')

  return (
    <section className={className}>
      <Typography variant="body2" component="h3" className={pb6}>
        {en.electricityQuote.filters.paymentTypes}
      </Typography>
      <FormControl component="fieldset">
        <FormGroup>
          {Object.keys(PAYMENT_METHODS).map((key) => {
            const paymentMethod = key as keyof typeof PAYMENT_METHODS
            const label = PAYMENT_METHODS[paymentMethod]

            return (
              <FormControlLabel
                key={key}
                value="top"
                control={
                  <Checkbox color="primary" onChange={(_, checked) => filterByPaymentMethod(paymentMethod, checked)} />
                }
                label={label}
              />
            )
          })}
        </FormGroup>
      </FormControl>
    </section>
  )
}
