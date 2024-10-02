import { useMemo } from 'react'
import { Autocomplete } from '@mui/material'
import {
  FormHelperText,
  InputLabel,
  Grid,
  RadioGroup,
  FormControl,
  TextField,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Provider } from '@watt/api-interface'
import { useIsDesktop } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { UtilityUsageForm } from '~/constants/forms'
import en from '~/i18n'
import { required } from '~/utils/reactHookFormRules'
import { GenericCard } from '../../Quote/GenericCard/GenericCard'
import { useStyles } from './SelectSupplier.styles'
import { SupplierCard } from './SupplierCard.component'

const i18n = en.selectSupplierWithNoData

type Props = {
  providers: Provider[]
  prefilledValues?: UtilityUsageForm
  formMethods: UseFormReturn<UtilityUsageForm>
}

export const SelectSupplier = ({ providers, prefilledValues, formMethods }: Props): JSX.Element => {
  const {
    control,
    watch,
    formState: { errors },
    setValue,
  } = formMethods
  const isDesktop = useIsDesktop()
  const classes = useStyles()
  const supplierWatcher = watch('supplier')
  const hasNoContractWatcher = watch('hasNoContract')
  const noWattSupplierWatcher = watch('noWattSupplier')
  const [mb4, py8, px6, mt16] = useSpacing('mb4', 'py8', 'px6', 'mt16')

  // TODO (jameskmonger) lots of inline functions here, refactor to use useCallback etc

  const isDisplayedOnCurrentProviderList = useMemo(() => {
    return providers.reduce((uniqueProviders: Provider[], provider) => {
      if (
        // TODO: Olly - this is a temporary fix to remove duplicate logos from the supplier list
        provider.is_displayed_on_current_supplier_list === true &&
        !uniqueProviders.some((p) => p.logo_file_name === provider.logo_file_name)
      ) {
        uniqueProviders.push(provider)
      }
      return uniqueProviders
    }, [])
  }, [providers])

  return (
    <>
      <Controller
        control={control}
        name="supplier"
        rules={{ required: hasNoContractWatcher === true || noWattSupplierWatcher?.length > 0 ? undefined : required }}
        render={({ field }) => {
          const { onChange, ...rest } = field
          return (
            <FormControl fullWidth error={Boolean(errors.supplier)}>
              <InputLabel required htmlFor={`supplierList`} className={mb4}>
                {i18n.yourCurrentSupplier}
              </InputLabel>
              <GenericCard className={clsx(py8, px6, errors.supplier ? classes.errorBorder : null)}>
                <RadioGroup
                  id={`supplierList`}
                  aria-label="suppliers"
                  onChange={(e) => {
                    if (e.target.value !== noWattSupplierWatcher) {
                      setValue('noWattSupplier', e.target.value)
                    }
                    return onChange(e)
                  }}
                  {...rest}
                >
                  <Grid container spacing={isDesktop ? 6 : 4}>
                    {isDisplayedOnCurrentProviderList.map((supplier) => (
                      <Grid item xs={6} sm={4} lg={3} key={supplier.id}>
                        <CustomFormControlLabel
                          disabled={hasNoContractWatcher === true || Boolean(prefilledValues?.supplier)}
                          value={supplier.name}
                          control={<CustomRadio />}
                          label={<SupplierCard supplier={supplier} checked={supplier.name === supplierWatcher} />}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </GenericCard>
              {errors.supplier?.type && <FormHelperText error>{errors.supplier.message}</FormHelperText>}
            </FormControl>
          )
        }}
      />

      <Controller
        control={control}
        name="noWattSupplier"
        rules={{
          required: hasNoContractWatcher === true || supplierWatcher?.length > 0 ? undefined : required,
        }}
        render={({ field }) => {
          const { onChange, ...rest } = field
          return (
            <FormControl error={Boolean(errors.noWattSupplier)} className={mt16}>
              <InputLabel required htmlFor={`noWattSupplierAutocomplete`} className={mb4}>
                {i18n.otherSupplierInputLabel}
              </InputLabel>
              <Autocomplete
                id={`noWattSupplierAutocomplete`}
                disabled={hasNoContractWatcher === true || Boolean(prefilledValues?.noWattSupplier)}
                freeSolo
                placeholder={i18n.otherSupplierInputPlaceholder}
                options={providers.map((option) => option.name)}
                classes={{
                  inputRoot: clsx(classes.autocompleteStyle, errors.noWattSupplier ? classes.errorBorder : null),
                }}
                onInputChange={(_, value) => {
                  // The reason we're using onInputChange event instead of onChange event is because
                  // onChange event is not triggered when user enters a value in field after it selected a value

                  if (value !== supplierWatcher) {
                    const index = providers.findIndex((provider) => provider.name === value)
                    const isInputValueAKnownSupplier = index > -1
                    if (isInputValueAKnownSupplier) {
                      setValue('supplier', value)
                    } else {
                      setValue('supplier', '')
                    }
                  }
                  onChange(value)
                }}
                renderInput={(params) => {
                  const fieldProps = {
                    ...params,
                    inputProps: {
                      ...params.inputProps,
                      className: clsx(...params.InputProps.className, classes.inputFieldAutocompleteStyle),
                    },
                  }
                  return <TextField {...fieldProps} />
                }}
                {...rest}
              />
              {errors.noWattSupplier?.type && <FormHelperText error>{errors.noWattSupplier.message}</FormHelperText>}
            </FormControl>
          )
        }}
      />
    </>
  )
}

const CustomRadio = withStyles(() => ({
  root: {
    display: 'none',
  },
}))(Radio)

const CustomFormControlLabel = withStyles(() => ({
  root: {
    marginLeft: 0,
    marginRight: 0,
  },
}))(FormControlLabel)
