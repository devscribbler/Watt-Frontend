import React from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Controller, UseFormReturn } from 'react-hook-form'
import { MpanInput, MprnInput } from '@watt/components'
import {
  MINIMUM_CONTRACT_START_OFFSET_FOR_PROVIDERS_DAYS_IN_FUTURE,
  MPAN_LENGTH,
  UTILITIES_LOOKUP,
  UtilityKindType,
} from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { UtilityUsageForm } from '~/constants/forms'
import en from '~/i18n'
import { required, validMPRN } from '~/utils/reactHookFormRules'

interface ContractAndUsageFormSectionProps {
  prefilledValues?: UtilityUsageForm
  formMethods: UseFormReturn<UtilityUsageForm>
  utilityType: UtilityKindType
}

export const ContractAndUsageFormSection = ({
  formMethods,
  prefilledValues,
  utilityType,
}: ContractAndUsageFormSectionProps): JSX.Element => {
  const [mb8] = useSpacing('mb8')
  const {
    watch,
    control,
    formState: { errors },
  } = formMethods
  const hasNoContractWatcher = watch('hasNoContract')

  const memoizedMaxDate = React.useMemo(() => new Date(new Date().setFullYear(new Date().getFullYear() + 1)), [])
  const memoizedMinDate = React.useMemo(
    () =>
      new Date(new Date().setDate(new Date().getDate() + MINIMUM_CONTRACT_START_OFFSET_FOR_PROVIDERS_DAYS_IN_FUTURE)),
    []
  )
  const [mb6, mt2] = useSpacing('mb6', 'mt2')

  return (
    <div>
      <Typography variant="h5" className={mb8}>
        {en.ContractAndUsageFormSection.title}
      </Typography>

      <Controller
        control={control}
        name="hasNoContract"
        render={({ field }) => {
          return (
            <FormControl fullWidth error={Boolean(errors.hasNoContract?.type)} className={mb6}>
              <FormControlLabel
                control={<Checkbox color="primary" {...field} />}
                label={en.ContractAndUsageFormSection.outOfContractLabel}
              />
            </FormControl>
          )
        }}
      />

      <Controller
        control={control}
        name="contractStartDate"
        rules={{ required: hasNoContractWatcher === true ? undefined : required }}
        render={({ field }) => {
          const { ref, value, ...rest } = field

          return (
            <FormControl fullWidth error={Boolean(errors.contractStartDate?.type)} className={mb6}>
              <InputLabel htmlFor={'contractStartDate'} required>
                {en.ContractAndUsageFormSection.datepickerLabel}
              </InputLabel>
              <DatePicker
                disablePast
                className={mt2}
                inputFormat="dd/MM/yyyy"
                renderInput={(props) => <TextField {...props} />}
                disabled={hasNoContractWatcher === true}
                maxDate={memoizedMaxDate}
                minDate={memoizedMinDate}
                inputRef={ref}
                value={value}
                {...rest}
              />
              {errors.contractStartDate?.type && (
                <FormHelperText error>{errors.contractStartDate.message}</FormHelperText>
              )}
            </FormControl>
          )
        }}
      />

      {utilityType === UTILITIES_LOOKUP.ELECTRICITY && (
        <Controller
          control={control}
          name="mpan"
          rules={{ required /*, pattern: validMPAN*/ }}
          render={({ field }) => {
            const { value, ...rest } = field
            return (
              <FormControl fullWidth error={Boolean(errors.mpan?.type)} className={mb6}>
                <InputLabel htmlFor={'mpan'} required>
                  MPAN
                </InputLabel>
                <MpanInput
                  id={'mpan'}
                  error={Boolean(errors.mpan)}
                  disabled={prefilledValues?.mpan?.length === MPAN_LENGTH}
                  value={value || ''}
                  {...rest}
                />
                {errors.mpan?.type && <FormHelperText error>{errors.mpan.message}</FormHelperText>}
              </FormControl>
            )
          }}
        />
      )}

      {utilityType === UTILITIES_LOOKUP.GAS && (
        <Controller
          control={control}
          name="mprn"
          rules={{ required, pattern: validMPRN }}
          render={({ field }) => {
            const { value, ...rest } = field
            return (
              <FormControl fullWidth error={Boolean(errors.mprn?.type)} className={mb6}>
                <InputLabel htmlFor={'mprn'} required>
                  MPRN
                </InputLabel>
                <MprnInput id={'mprn'} error={Boolean(errors.mprn)} value={value || ''} {...rest} />
                {errors.mprn?.type && <FormHelperText error>{errors.mprn.message}</FormHelperText>}
              </FormControl>
            )
          }}
        />
      )}

      <Controller
        control={control}
        name="annualUsage"
        rules={{ required }}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={Boolean(errors.annualUsage?.type)}
            disabled={Boolean(prefilledValues?.annualUsage)}
            className={mb6}
          >
            <InputLabel htmlFor={'annualUsage'} required>
              {en.ContractAndUsageFormSection.annualUsageLabel}
            </InputLabel>
            <Input id={'annualUsage'} {...field} />
            {errors.annualUsage?.type && <FormHelperText error>{errors.annualUsage.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </div>
  )
}
