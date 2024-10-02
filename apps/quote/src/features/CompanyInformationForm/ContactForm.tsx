import { useEffect } from 'react'
import { Checkbox, Input, InputLabel, FormControl, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { addYears, format, isWithinInterval } from 'date-fns'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'
import { TrimmedInput } from '@watt/components'
import { BusinessType, CONTACT_DETAILS_MINIMAL_AGE, CONTACT_DETAILS_DOB_MINIMUM } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { validUkPhoneNumber } from '~/utils/reactHookFormRules'
import { useStyles } from './ContactForm.styles'
import { AddressField } from './field/AddressField'
import { EmailInput } from './field/Email/EmailInput'
import { FormField } from './field/FormField'
import { formConfig, CompanyDetailsForm } from './formConfig'

const { businessPhoneNumber, contactForename, contactSurname, address, position, postcode, addressSameAsSite } =
  formConfig.contact
const i18n = en.companyInformation.contactForm

export function ContactForm() {
  const classes = useStyles()
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CompanyDetailsForm>()

  const addressSameAsSiteWatcher = watch('contact.addressSameAsSite')
  const businessTypeValue = watch(formConfig.company.type.id)

  const [mt2] = useSpacing('mt2')

  // Sole trader: Contact person should have been born in 1900+, and must be minimum 16 yrs of age
  const contact_details_dob_maximum = addYears(new Date(new Date().getFullYear(), 11, 31), -CONTACT_DETAILS_MINIMAL_AGE)

  function isValidDateOfBirth(date?: Date | null) {
    /* Make sure sole trader contact person's age it at least 16, and date of birth is no earlier than 1900. */
    return date
      ? isWithinInterval(date, { start: CONTACT_DETAILS_DOB_MINIMUM, end: contact_details_dob_maximum })
      : false
  }

  useEffect(() => {
    if (addressSameAsSiteWatcher) {
      setValue('contact.address', '')
      setValue('contact.postcode', '')
    }
  }, [addressSameAsSiteWatcher, setValue])

  return (
    <>
      <EmailInput />

      <div className={classes.divider} />

      <FormField
        id={businessPhoneNumber.id}
        name="contact.businessPhoneNumber"
        label={businessPhoneNumber.label}
        validation={{
          required: true,
          pattern: validUkPhoneNumber,
          maxLength: { value: 13, message: en.errors.phoneNumberMaxLength },
        }}
        errorSelector={(errors) => errors.contact?.businessPhoneNumber}
        render={({ field }) => (
          <TrimmedInput
            numeric
            id={businessPhoneNumber.id}
            {...businessPhoneNumber.inputProps}
            {...field}
            autoComplete="tel"
            datatype=""
          />
        )}
      />

      <FormField
        id={contactForename.id}
        name="contact.contactForename"
        label={contactForename.label}
        validation={{ required: true }}
        errorSelector={(errors) => errors.contact?.contactForename}
        render={({ field }) => (
          <Input id={contactForename.id} {...contactForename.inputProps} {...field} autoComplete="name" />
        )}
      />

      <FormField
        id={contactSurname.id}
        name="contact.contactSurname"
        label={contactSurname.label}
        validation={{ required: true }}
        errorSelector={(errors) => errors.contact?.contactSurname}
        render={({ field }) => (
          <Input id={contactSurname.id} {...contactSurname.inputProps} {...field} autoComplete="name" />
        )}
      />

      {businessTypeValue === BusinessType.SOLE_TRADER && (
        <FormField
          // date of birth
          id="company.soletraderPersonalDetails.dateOfBirth"
          name="company.soletraderPersonalDetails.dateOfBirth"
          label="Date of birth"
          validation={{ required: true }}
          errorSelector={(errors) => errors.company?.soletraderPersonalDetails?.dateOfBirth}
          render={({ field }) => {
            const { ref, value, ...rest } = field as ControllerRenderProps<
              CompanyDetailsForm,
              'company.soletraderPersonalDetails.dateOfBirth'
            >

            return (
              <FormControl
                className={mt2}
                fullWidth
                error={Boolean(errors.company?.soletraderPersonalDetails?.dateOfBirth?.type)}
              >
                <DatePicker
                  disableFuture
                  minDate={CONTACT_DETAILS_DOB_MINIMUM}
                  maxDate={contact_details_dob_maximum}
                  inputRef={ref}
                  value={value}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      error={!isValidDateOfBirth(value)}
                      helperText={
                        !isValidDateOfBirth(value)
                          ? `Enter date: ${format(CONTACT_DETAILS_DOB_MINIMUM, 'P')} - ${format(
                              contact_details_dob_maximum,
                              'P'
                            )}`
                          : ''
                      }
                    />
                  )}
                  {...rest}
                />
              </FormControl>
            )
          }}
        />
      )}

      <FormField
        id={position.id}
        name="contact.position"
        label={position.label}
        validation={{ required: true }}
        errorSelector={(errors) => errors.contact?.position}
        render={({ field }) => <Input id={position.id} {...position.inputProps} {...field} />}
      />

      {!addressSameAsSiteWatcher && (
        <AddressField
          postcodeKey="contact.postcode"
          postcodeField={postcode}
          postcodeErrorSelector={(errors) => errors.contact?.postcode}
          postcodeTooltip={i18n.postcode.tooltip}
          addressKey="contact.address"
          addressField={address}
          addressErrorSelector={(errors) => errors.contact?.address}
          mpanKey="contact.mpanKey"
          mprnKey="contact.mprnKey"
        />
      )}

      <FormField
        id={addressSameAsSite.id}
        name="contact.addressSameAsSite"
        errorSelector={(errors) => errors.contact?.addressSameAsSite}
        render={({ field }) => (
          <InputLabel htmlFor={addressSameAsSite.id}>
            <Checkbox id={addressSameAsSite.id} {...field} defaultChecked={addressSameAsSite.defaultValue} />{' '}
            {addressSameAsSite.label}
          </InputLabel>
        )}
      />
    </>
  )
}
