import { Done } from '@mui/icons-material'
import { FormHelperText, IconButton, Input, InputAdornment, Link, MenuItem, Typography } from '@mui/material'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'
import { SelectField, Tooltip } from '@watt/components'
import { TrimmedInput } from '@watt/components'
import { BusinessType, BUSINESS_TYPE_LABELS, COMPANY_NUMBER_REGEX } from '@watt/constants'
import { PRIMARY_COLORS } from '@watt/theme'
import { COMPANIES_HOUSE_URL } from '~/constants/global'
import { useDebounce } from '~/hooks/useDebounce'
import en from '~/i18n/en.json'
import { isValidCompanyNumber } from '~/utils/company'
import { validUKCharityNumber } from '~/utils/validCharityNumber'
import { CompanyDetailsForm, formConfig } from '../formConfig'
import { useStyles } from './BusinessField.styles'
import { FormField } from './FormField'
import { RegNumberAdornment } from './RegNumAdornment'
import { SoleTraderAddressField } from './SoleTraderAddressHistory/SoleTraderAddressField'
import { useCompanyLookup } from './useCompanyLookup'

const { companyInformation } = en

type BusinessFieldField = {
  id: string
  label: string
  inputProps?: Record<string, unknown>
  disabled: boolean
}

type BusinessFieldProps = {
  registrationNumber: BusinessFieldField
  type: typeof formConfig.company.type
  name: BusinessFieldField
}

// TODO (James) convert other fields to use formConfig directly
const { charityNumber } = formConfig.company

export function BusinessField({ registrationNumber, type, name }: BusinessFieldProps) {
  const { watch } = useFormContext<CompanyDetailsForm>()
  const businessTypeValue = watch(formConfig.company.type.id)
  const registrationNumberValue = watch(formConfig.company.registrationNumber.id)

  const debouncedRegistrationNumberValue = useDebounce(registrationNumberValue, 500)
  const { verified } = useCompanyLookup(businessTypeValue, debouncedRegistrationNumberValue)

  const classes = useStyles({ verified })

  return (
    <>
      <FormField
        id={type.id}
        name={formConfig.company.type.id}
        label={type.label}
        validation={{ required: true, disabled: type.disabled }}
        errorSelector={(errors) => errors.company?.type}
        render={({ field }) => (
          <SelectField<CompanyDetailsForm> id={type.id} field={field}>
            <MenuItem value="" disabled>
              Select a business type
            </MenuItem>
            {Object.entries(BUSINESS_TYPE_LABELS).map(([id, value]) => (
              <MenuItem key={id} value={id}>
                {value}
              </MenuItem>
            ))}
          </SelectField>
        )}
      />

      {businessTypeValue === BusinessType.LTD && (
        <>
          <FormField
            id={registrationNumber.id}
            name={formConfig.company.registrationNumber.id}
            label={registrationNumber.label}
            validation={{
              required: true,
              disabled: registrationNumber.disabled,
              pattern: COMPANY_NUMBER_REGEX,
              maxLength: 8,
            }}
            errorSelector={(errors) => errors.company?.registrationNumber}
            render={({ field }) => {
              const { value } = field as ControllerRenderProps<
                CompanyDetailsForm,
                'company.soletraderPersonalDetails.dateOfBirth'
              >

              return (
                <>
                  <TrimmedInput
                    id={registrationNumber.id}
                    {...registrationNumber.inputProps}
                    {...field}
                    endAdornment={<RegNumberAdornment />}
                  />
                  <Link href={COMPANIES_HOUSE_URL} target="_blank">
                    <Typography variant="subtitle2" color="primary" className={classes.formHelperText}>
                      {companyInformation.companyForm.businessField.label}
                    </Typography>
                  </Link>
                  {value && !isValidCompanyNumber(value) && !verified && (
                    <FormHelperText error className={classes.formHelperText}>
                      {en.errors.invalidRegistrationNumber}
                    </FormHelperText>
                  )}
                </>
              )
            }}
          />
        </>
      )}

      {businessTypeValue !== '' && (
        <FormField
          id={name.id}
          name={formConfig.company.name.id}
          label={name.label}
          validation={{ required: true, disabled: name.disabled }}
          errorSelector={(errors) => errors.company?.name}
          render={({ field }) => (
            <Input
              id={name.id}
              {...name.inputProps}
              {...field}
              disabled={verified}
              style={{ borderColor: verified ? `${PRIMARY_COLORS.main}` : '' }}
              endAdornment={
                verified && (
                  <InputAdornment position="end">
                    <Tooltip title={companyInformation.companyForm.registrationNumber.confirmed}>
                      <IconButton>
                        <Typography className={classes.adornment}>
                          <Done />
                        </Typography>
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }
            />
          )}
        />
      )}

      {businessTypeValue === BusinessType.CHARITY && (
        <>
          <FormField
            id={charityNumber.id}
            name={formConfig.company.charityNumber.id}
            label={charityNumber.label}
            validation={{
              required: true,
              minLength: {
                value: 6,
                message: 'Charity number must be at least six digits',
              },
              maxLength: {
                value: 8,
                message: 'Charity number must be a maximum of eight digits',
              },
              pattern: validUKCharityNumber,
            }}
            errorSelector={(errors) => errors.company?.charityNumber}
            render={({ field }) => <TrimmedInput id={charityNumber.id} {...charityNumber.inputProps} {...field} />}
          />
        </>
      )}

      {businessTypeValue === BusinessType.SOLE_TRADER && <SoleTraderAddressField />}
    </>
  )
}
