import { useEffect } from 'react'
import { Input, MenuItem } from '@mui/material'
import { Path, useFormContext } from 'react-hook-form'
import { InfoIconWithTooltip, SelectField, Tooltip } from '@watt/components'
import { addTestAttribute } from '@watt/utils'
import en from '~/i18n'
import { validPostcode } from '~/utils/reactHookFormRules'
import { CompanyDetailsForm, formConfig } from '../formConfig'
import { usePostcodeLookup } from '../usePostcodeLookup'
import { FormField } from './FormField'
import { ErrorSelector } from './errorSelector'

function useSetMpnFromAddress(
  addresses: ReturnType<typeof usePostcodeLookup>['addresses'],
  mpanKey?: Path<CompanyDetailsForm>,
  mprnKey?: Path<CompanyDetailsForm>
) {
  const { watch, setValue } = useFormContext<CompanyDetailsForm>()
  const address = watch(formConfig.company.siteAddress.id)

  useEffect(() => {
    // TODO this code will fail in the event of duplicate addresses!
    const matching = addresses?.find((a) => a.address === address)

    if (!address) {
      return
    }

    if (!matching) {
      console.error('no matching address', { address }, addresses)
      return
    }

    // TODO (DC): these should probably be `string[]` only, drop the `null`
    if (mpanKey) {
      setValue(mpanKey, matching.mpan_key[0])
    }

    // TODO (DC): these should probably be `string[]` only, drop the `null`
    if (mprnKey) {
      setValue(mprnKey, matching.mprn_key[0])
    }
  }, [addresses, address, setValue, mpanKey])
}

type AddressFieldField = {
  id: string
  label: string
  inputProps?: Record<string, unknown>
}

type AddressFieldProps = {
  postcodeKey: Path<CompanyDetailsForm>
  postcodeField: AddressFieldField
  postcodeErrorSelector: ErrorSelector
  postcodeTooltip?: string
  addressKey: Path<CompanyDetailsForm>
  mpanKey?: Path<CompanyDetailsForm>
  mprnKey?: Path<CompanyDetailsForm>
  addressField: AddressFieldField
  addressErrorSelector: ErrorSelector
}

export function AddressField({
  postcodeKey,
  postcodeField,
  postcodeErrorSelector,
  postcodeTooltip,
  addressKey,
  addressField,
  addressErrorSelector,
  mpanKey,
  mprnKey,
}: AddressFieldProps) {
  const { addresses } = usePostcodeLookup(postcodeKey, addressKey, mpanKey, mprnKey)

  useSetMpnFromAddress(addresses, mpanKey, mprnKey)

  return (
    <>
      <FormField
        id={postcodeField.id}
        name={postcodeKey}
        label={postcodeField.label}
        validation={{ required: true, pattern: validPostcode }}
        errorSelector={postcodeErrorSelector}
        render={({ field }) => (
          <Input
            id={postcodeField.id}
            {...postcodeField.inputProps}
            {...field}
            endAdornment={
              postcodeTooltip ? <InfoIconWithTooltip tooltipProps={{ title: postcodeTooltip }} /> : undefined
            }
            autoComplete="postal-code"
          />
        )}
      />

      <FormField
        id={addressField.id}
        name={addressKey}
        label={addressField.label}
        validation={{ required: true }}
        errorSelector={addressErrorSelector}
        render={({ field }) =>
          addresses ? (
            <SelectField<CompanyDetailsForm>
              id={addressField.id}
              field={field}
              tooltipString={en.companyInformation.tooltips.address_select}
            >
              <MenuItem value="" disabled>
                Select an address
              </MenuItem>
              {addresses.map((address, index) => (
                <MenuItem
                  key={address.id}
                  value={address.address}
                  {...addTestAttribute(`form-field-${addressField.id}-${index + 1}`)}
                >
                  {address.address}
                </MenuItem>
              ))}
            </SelectField>
          ) : (
            <Tooltip title={en.companyInformation.tooltips.insert_postcode} placement="top">
              <Input id={addressField.id} {...addressField.inputProps} {...field} disabled />
            </Tooltip>
          )
        }
      />
    </>
  )
}
