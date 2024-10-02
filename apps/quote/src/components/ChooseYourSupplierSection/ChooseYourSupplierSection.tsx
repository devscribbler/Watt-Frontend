import { Typography } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { Provider } from '@watt/api-interface'
import { UtilityKindType, UTILITIES_KIND_PROPERTY_MAP } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { UtilityUsageForm } from '~/constants/forms'
import { PrefilledSupplier } from './PrefilledSupplier'
import { SelectSupplier } from './SelectSupplier'

type Props = {
  providers: Provider[]
  utilityType: UtilityKindType
  formMethods: UseFormReturn<UtilityUsageForm>
  prefilledValues?: UtilityUsageForm
}

export const ChooseYourSupplierSection = (props: Props): JSX.Element => {
  const { providers, utilityType, prefilledValues, formMethods } = props
  const [mb8] = useSpacing('mb8')
  const title = `Current ${UTILITIES_KIND_PROPERTY_MAP[utilityType]} supplier`

  return (
    <div>
      <Typography variant="h5" className={mb8}>
        {title}
      </Typography>

      {prefilledValues?.supplier ? (
        <PrefilledSupplier providers={providers} supplier={prefilledValues.supplier} utilityType={utilityType} />
      ) : (
        <SelectSupplier prefilledValues={prefilledValues} providers={providers} formMethods={formMethods} />
      )}
    </div>
  )
}
