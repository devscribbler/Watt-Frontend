import { UtilityType } from '@watt/components'

/**
 * The number of providers available for a given utility type,
 * or null if the utility type is not available.
 */
export const UTILITY_PROVIDER_COUNT: Record<UtilityType, number | null> = {
  [UtilityType.ELECTRICITY]: 54,
  [UtilityType.GAS]: 1,
  [UtilityType.WATER]: null,
  [UtilityType.TELEPHONE]: null,
  [UtilityType.INTERNET]: null,
}
