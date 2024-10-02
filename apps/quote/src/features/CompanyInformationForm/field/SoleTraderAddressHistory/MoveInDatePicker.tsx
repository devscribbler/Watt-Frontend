import { FormControl, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'
import en from '~/i18n'
import { CompanyDetailsForm } from '../../formConfig'
import { FormField } from '../FormField'
import { useStyles } from './AddressHistoryField.styles'
import { useSoleTraderAddresses } from './useSoleTraderAddresses'

type MoveInDatePicker = {
  selectedIndex: number
  index: number
  lastMoveInDate: string | undefined
}

export function MoveInDatePicker({ selectedIndex, index }: MoveInDatePicker) {
  const { fields } = useSoleTraderAddresses()
  const classes = useStyles({ fieldCount: fields.length })
  const {
    register,
    formState: { errors },
  } = useFormContext<CompanyDetailsForm>()

  return (
    <div
      ref={register(`company.soletraderPersonalDetails.addresses.${index}.moved_in_at`).ref}
      className={classes.fullWidth}
    >
      <FormField
        id={`company.soletraderPersonalDetails.addresses.${index}.moved_in_at`}
        name={`company.soletraderPersonalDetails.addresses.${index}.moved_in_at`}
        label={en.companyInformation.companyForm.soleTrader.moveInDateHistory.label}
        validation={{ required: true }}
        errorSelector={(errors) => errors.company?.soletraderPersonalDetails?.addresses?.[index]?.moved_in_at}
        render={({ field }) => {
          const { ref, value, ...rest } = field as ControllerRenderProps<
            CompanyDetailsForm,
            `company.soletraderPersonalDetails.addresses.${typeof index}.moved_in_at`
          >
          return (
            <FormControl
              fullWidth
              error={Boolean(errors.company?.soletraderPersonalDetails?.addresses?.[index]?.moved_in_at?.type)}
              className={classes.inputBoxPadding}
            >
              <DatePicker
                disableFuture
                inputFormat="dd/MM/yyyy"
                // id={`company.soletraderPersonalDetails.addresses.${index}.moved_in_at`}
                maxDate={selectedIndex > 0 ? fields[selectedIndex - 1].moved_in_at : undefined}
                // defaultValue={selectedIndex > 0 ? lastMoveInDate : undefined}
                inputRef={ref}
                value={value}
                renderInput={(props) => <TextField {...props} />}
                {...rest}
                InputProps={{
                  classes: {
                    input: classes.inputDatePicker,
                  },
                }}
              />
            </FormControl>
          )
        }}
      />
    </div>
  )
}
