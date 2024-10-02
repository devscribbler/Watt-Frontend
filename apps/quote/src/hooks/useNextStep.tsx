import { UTILITIES_LOOKUP, UtilityKindType } from '@watt/constants'
import { cfg } from '~/config/config'
import { useAppSelector } from '~/store/selectors'

export interface nextUtilityPage {
  nextUtility?: UtilityKindType
  nextPage?: string
}

export function getPageByUtilityType(utilityType: UtilityKindType): string {
  switch (utilityType) {
    case UTILITIES_LOOKUP.ELECTRICITY:
      return cfg.pages.electricity.usage
    case UTILITIES_LOOKUP.GAS:
      return cfg.pages.gas.usage
    default:
      break
  }
  return cfg.pages.premium
}

export function useNextUtilityPage(): nextUtilityPage {
  const { currentFlow, selectedUtilities } = useAppSelector((state) => state.form)

  if (currentFlow) {
    const currentUtilityIndex = selectedUtilities.findIndex((utility) => utility === currentFlow)
    const nextUtility = selectedUtilities[currentUtilityIndex + 1]
    const nextPage = getPageByUtilityType(nextUtility)
    return { nextUtility, nextPage }
  }

  return {}
}
