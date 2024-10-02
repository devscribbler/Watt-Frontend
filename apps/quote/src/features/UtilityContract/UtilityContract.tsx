import { UtilityContractPage } from '~/components/UtilityContract'
import { useAppSelector } from '~/store/selectors'

export function UtilityContract() {
  const utilityType = useAppSelector((state) => state.form.currentFlow)
  const selectedUtilities = useAppSelector((state) => state.form.selectedUtilities)

  if (!utilityType) {
    throw new Error('Utility type is not defined')
  }

  const currentUtilityIndex = selectedUtilities.findIndex((utility) => utility === utilityType)
  const nextUtility =
    selectedUtilities.length > currentUtilityIndex + 1 ? selectedUtilities[currentUtilityIndex + 1] : undefined

  return <UtilityContractPage utilityType={utilityType} nextUtility={nextUtility} />
}
