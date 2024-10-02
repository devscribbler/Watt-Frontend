import { useCallback, useState } from 'react'
import { Grid, Input } from '@mui/material'
import { useForm } from 'react-hook-form'
import { UtilitySelector, UtilityType } from '@watt/components'
import { FormField } from './field/FormField'
import { formConfig } from './formConfig'

const { fullName, email } = formConfig.userInformation

// this is fake data
const utilities = [
  {
    type: UtilityType.ELECTRICITY,
    supplierCount: 109,
    disabled: false,
  },
  {
    type: UtilityType.GAS,
    supplierCount: 25,
    disabled: false,
  },
  {
    type: UtilityType.WATER,
    supplierCount: 77,
    disabled: true,
  },
  {
    type: UtilityType.TELEPHONE,
    supplierCount: 87,
    disabled: true,
  },
  {
    type: UtilityType.INTERNET,
    supplierCount: 12,
    disabled: true,
  },
]

export const InformationForm = (): JSX.Element => {
  const [selectedUtilities, setSelectedUtilities] = useState<UtilityType[]>([])
  const methods = useForm()

  const handleChange = useCallback(
    (utility: UtilityType, checked: boolean) => {
      const selectedWithoutUtility = selectedUtilities.filter((u) => u !== utility)

      const updatedList = checked ? [...selectedUtilities, utility] : selectedWithoutUtility

      setSelectedUtilities(updatedList)

      methods.setValue('selectedUtilities', updatedList)
    },
    [selectedUtilities, methods]
  )

  return (
    <>
      <FormField
        id={fullName.id}
        name="userInformation.fullName"
        label={fullName.label}
        validation={{ required: true }}
        errorSelector={(errors) => errors.userInformation?.fullName}
        render={({ field }) => <Input id={fullName.id} {...fullName.inputProps} {...field} />}
      />
      <FormField
        id={email.id}
        name="userInformation.email"
        label={email.label}
        validation={{ required: true }}
        errorSelector={(errors) => errors.userInformation?.email}
        render={({ field }) => <Input id={email.id} {...email.inputProps} {...field} />}
      />
      <Grid container spacing={2}>
        {utilities.map((utility, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <UtilitySelector
              type={utility.type}
              supplierCount={utility.supplierCount}
              disabled={utility.disabled}
              onChange={(checked) => handleChange(utility.type, checked)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
