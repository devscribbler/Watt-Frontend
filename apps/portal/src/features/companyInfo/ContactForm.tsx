import { useState, useEffect } from 'react'
import { FormControl, FormHelperText, Input, InputLabel, NativeSelect } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { InfoIconWithTooltip } from '@watt/components'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { findAddressesByPostcode, FindAddressByPostcode } from '~/utils/postcode'
import { required, validUkPhoneNumber } from '~/utils/reactHookFormRules'
import { formConfig, CompanyDetailsForm } from './formConfig'

const { businessPhoneNumber, contactName, address, position, postcode } = formConfig.contact
const i18n = en.companyInformation.contactForm

export const ContactForm = (): JSX.Element => {
  const [mb6] = useSpacing('mb6')
  const {
    control,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<CompanyDetailsForm>()
  const postcodeWatcher = watch('contact.postcode')
  const [postcodeChanged, setPostcodeChanged] = useState(false)
  const [addresses, setAddresses] = useState<FindAddressByPostcode[] | null>(null)

  useEffect(() => {
    if (!postcodeChanged) {
      return
    }

    findAddressesByPostcode(postcodeWatcher)
      .then((addresses) => {
        clearErrors('contact.postcode')
        clearErrors('contact.address')
        setAddresses(addresses)

        if (addresses.length) {
          setValue('contact.address', addresses[0].address)
        } else {
          setValue('contact.address', '')
          setError('contact.address', { message: en.errors.noAddressesFound })
        }
      })
      .catch(() => {
        setError('contact.postcode', { message: en.errors.invalidPostcode })
      })
  }, [postcodeChanged, postcodeWatcher, clearErrors, setError, setValue])

  return (
    <>
      <Controller
        control={control}
        name="contact.businessPhoneNumber"
        rules={{
          required,
          pattern: validUkPhoneNumber,
          maxLength: { value: 13, message: en.errors.phoneNumberMaxLength },
        }}
        render={({ field }) => (
          <FormControl className={mb6} fullWidth error={Boolean(errors.contact?.businessPhoneNumber)}>
            <InputLabel htmlFor={businessPhoneNumber.id} required>
              {businessPhoneNumber.label}
            </InputLabel>
            <Input id={businessPhoneNumber.id} {...businessPhoneNumber.inputProps} {...field} autoComplete="tel" />
            {errors.contact?.businessPhoneNumber && (
              <FormHelperText error>{errors.contact?.businessPhoneNumber.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="contact.contactName"
        rules={{ required }}
        render={({ field }) => (
          <FormControl className={mb6} fullWidth error={Boolean(errors.contact?.contactName)}>
            <InputLabel htmlFor={contactName.id} required>
              {contactName.label}
            </InputLabel>
            <Input id={contactName.id} {...contactName.inputProps} {...field} autoComplete="name" />
            {errors.contact?.contactName && (
              <FormHelperText error>{errors.contact?.contactName.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="contact.position"
        rules={{ required }}
        render={({ field }) => (
          <FormControl className={mb6} fullWidth error={Boolean(errors.contact?.position)}>
            <InputLabel htmlFor={position.id} required>
              {position.label}
            </InputLabel>
            <Input id={position.id} {...position.inputProps} {...field} />
            {errors.contact?.position && <FormHelperText error>{errors.contact?.position.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="contact.postcode"
        rules={{ required }}
        render={({ field }) => (
          <FormControl className={mb6} fullWidth error={Boolean(errors.contact?.postcode)}>
            <InputLabel htmlFor={postcode.id} required>
              {postcode.label}
            </InputLabel>

            <Input
              onKeyDown={() => setPostcodeChanged(true)}
              id={postcode.id}
              {...postcode.inputProps}
              {...field}
              autoComplete="postal-code"
              endAdornment={<InfoIconWithTooltip tooltipProps={{ title: i18n.postcode.tooltip }} />}
            />
            {errors.contact?.postcode && <FormHelperText error>{errors.contact?.postcode.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="contact.address"
        rules={{ required }}
        render={({ field }) => (
          <FormControl className={mb6} fullWidth error={Boolean(errors.contact?.address)}>
            <InputLabel htmlFor={address.id} required>
              {address.label}
            </InputLabel>
            {addresses ? (
              <NativeSelect id={address.id} {...field}>
                {addresses.map((address) => (
                  <option key={address.id} value={address.address}>
                    {address.address}
                  </option>
                ))}
              </NativeSelect>
            ) : (
              <Input id={address.id} {...address.inputProps} {...field} />
            )}

            {errors.contact?.address && <FormHelperText error>{errors.contact?.address.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </>
  )
}
