import { Input } from '@mui/material'
import { FormField } from './field/FormField'
import { formConfig } from './formConfig'

const { contractEndDate, optContractEnd1, optContractEnd2, optContractEnd3, optContractEnd4 } =
  formConfig.datesInformation

export const DatesForm = (): JSX.Element => {
  return (
    <>
      <FormField
        id={contractEndDate.id}
        name="datesInformation.contractEndDate"
        label={contractEndDate.label}
        validation={{ required: true }}
        errorSelector={(errors) => errors.datesInformation?.contractEndDate}
        render={({ field }) => <Input id={contractEndDate.id} {...contractEndDate.inputProps} {...field} />}
      />
      <FormField
        id={optContractEnd1.id}
        name="datesInformation.optContractEnd1"
        label={optContractEnd1.label}
        validation={{ required: false }}
        errorSelector={(errors) => errors.datesInformation?.optContractEnd1}
        render={({ field }) => <Input id={optContractEnd1.id} {...optContractEnd1.inputProps} {...field} />}
      />
      <FormField
        id={optContractEnd2.id}
        name="datesInformation.optContractEnd2"
        label={optContractEnd2.label}
        validation={{ required: false }}
        errorSelector={(errors) => errors.datesInformation?.optContractEnd2}
        render={({ field }) => <Input id={optContractEnd2.id} {...optContractEnd2.inputProps} {...field} />}
      />
      <FormField
        id={optContractEnd3.id}
        name="datesInformation.optContractEnd3"
        label={optContractEnd3.label}
        validation={{ required: false }}
        errorSelector={(errors) => errors.datesInformation?.optContractEnd3}
        render={({ field }) => <Input id={optContractEnd3.id} {...optContractEnd3.inputProps} {...field} />}
      />

      <FormField
        id={optContractEnd4.id}
        name="datesInformation.optContractEnd4"
        label={optContractEnd4.label}
        validation={{ required: false }}
        errorSelector={(errors) => errors.datesInformation?.optContractEnd4}
        render={({ field }) => <Input id={optContractEnd4.id} {...optContractEnd4.inputProps} {...field} />}
      />
    </>
  )
}
