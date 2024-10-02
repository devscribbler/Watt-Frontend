import { FormControl, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import clsx from 'clsx'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'
import en from '~/i18n'
import { CompanyDetailsForm } from '../../formConfig'
import { FormField } from '../FormField'
import { useStyles } from './AddressHistoryField.styles'
import { useSoleTraderAddresses } from './useSoleTraderAddresses'

type MoveOutDatePicker = {
  selectedIndex: number
  index: number
  lastMoveInDate: string | undefined
}

export function MoveOutDatePicker({ selectedIndex, index }: MoveOutDatePicker) {
  const { fields } = useSoleTraderAddresses()
  const classes = useStyles({ fieldCount: fields.length })
  const {
    register,
    formState: { errors },
  } = useFormContext<CompanyDetailsForm>()

  return (
    <div
      ref={register(`company.soletraderPersonalDetails.addresses.${index}.moved_out_at`).ref}
      className={clsx(classes.fullWidth, classes.spaceLeft)}
    >
      <FormField
        id={`company.soletraderPersonalDetails.addresses.${index}.moved_out_at`}
        name={`company.soletraderPersonalDetails.addresses.${index}.moved_out_at`}
        label={en.companyInformation.companyForm.soleTrader.moveOutDateHistory.label}
        validation={{ required: true }}
        errorSelector={(errors) => errors.company?.soletraderPersonalDetails?.addresses?.[index]?.moved_out_at}
        render={({ field }) => {
          const { ref, value, ...rest } = field as ControllerRenderProps<
            CompanyDetailsForm,
            `company.soletraderPersonalDetails.addresses.${typeof index}.moved_out_at`
          >
          return (
            <FormControl
              fullWidth
              error={Boolean(errors.company?.soletraderPersonalDetails?.addresses?.[index]?.moved_out_at?.type)}
              className={classes.inputBoxPadding}
            >
              <DatePicker
                disableFuture
                inputFormat="dd/MM/yyyy"
                // id={`company.soletraderPersonalDetails.addresses.${index}.moved_out_at`}
                inputRef={ref}
                maxDate={selectedIndex > 0 ? fields[selectedIndex - 1].moved_in_at : undefined}
                // defaultValue={selectedIndex > 0 ? lastMoveInDate : undefined}
                renderInput={(props) => <TextField {...props} />}
                value={value}
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
