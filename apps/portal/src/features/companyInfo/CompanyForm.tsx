import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { InfoIconWithTooltip } from '@watt/components'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { required } from '~/utils/reactHookFormRules'
import { formConfig, CompanyDetailsForm } from './formConfig'

const i18n = en.companyInformation.companyForm
const { type, siteAddress, name, registrationNumber, sitePostcode } = formConfig.company

export const CompanyForm = (): JSX.Element => {
  const [mb6] = useSpacing('mb6')
  const {
    control,
    formState: { errors },
  } = useFormContext<CompanyDetailsForm>()

  return (
    <>
      <Controller
        control={control}
        name="company.type"
        rules={{ required }}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.company?.type)} disabled={type.disabled} className={mb6}>
            <InputLabel htmlFor={type.id} required>
              {type.label}
            </InputLabel>
            <Input id={type.id} {...type.inputProps} {...field} />
            {errors.company?.type && <FormHelperText error>{errors.company?.type.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="company.sitePostcode"
        rules={{ required }}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={Boolean(errors.company?.sitePostcode)}
            disabled={sitePostcode.disabled}
            className={mb6}
          >
            <InputLabel htmlFor={sitePostcode.id} required>
              {sitePostcode.label}
            </InputLabel>
            <Input
              id={sitePostcode.id}
              {...sitePostcode.inputProps}
              endAdornment={<InfoIconWithTooltip tooltipProps={{ title: i18n.sitePostcode.tooltip }} />}
              {...field}
            />

            {errors.company?.sitePostcode && (
              <FormHelperText error>{errors.company?.sitePostcode.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="company.siteAddress"
        rules={{ required }}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={Boolean(errors.company?.siteAddress)}
            disabled={siteAddress.disabled}
            className={mb6}
          >
            <InputLabel htmlFor={siteAddress.id} required>
              {siteAddress.label}
            </InputLabel>
            <Input id={siteAddress.id} {...siteAddress.inputProps} {...field} />
            {errors.company?.siteAddress && (
              <FormHelperText error>{errors.company?.siteAddress.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="company.name"
        rules={{ required }}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.company?.name)} disabled={name.disabled} className={mb6}>
            <InputLabel htmlFor={name.id} required>
              {name.label}
            </InputLabel>
            <Input id={name.id} {...name.inputProps} {...field} />
            {errors.company?.name && <FormHelperText error>{errors.company?.name.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="company.registrationNumber"
        rules={{ required }}
        render={({ field }) => (
          <FormControl
            fullWidth
            error={Boolean(errors.company?.registrationNumber)}
            disabled={registrationNumber.disabled}
            className={mb6}
          >
            <InputLabel htmlFor={registrationNumber.id} required>
              {registrationNumber.label}
            </InputLabel>
            <Input id={registrationNumber.id} {...registrationNumber.inputProps} {...field} />
            {errors.company?.registrationNumber && (
              <FormHelperText error>{errors.company?.registrationNumber.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </>
  )
}
