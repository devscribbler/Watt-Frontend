import { differenceInDays } from 'date-fns'
import { SoleTraderPersonalAddress } from '@watt/api-interface'

export const SOLE_TRADER_ADDRESS_HISTORY_YEARS_REQUIRED = 5
export const SOLE_TRADER_ADDRESS_HISTORY_GAP = 31

/**
 * Checks to see if the SoleTraderPersonalAddress array is valid
 * @param moveData SoleTraderPersonalAddress[]
 * @returns null if no errors, otherwise a string with the error message
 */
export const getSoleTraderAddressValidationError = (moveData: SoleTraderPersonalAddress[]): null | string => {
  if (!moveData.length) {
    throw new Error('Must have at least one address')
  }

  const fiveYearsAgo = new Date(Date.now() - 365 * SOLE_TRADER_ADDRESS_HISTORY_YEARS_REQUIRED * 24 * 60 * 60 * 1000)

  // Sort addresses by moved_in_at date
  moveData.sort((a, b) => new Date(a.moved_in_at).getTime() - new Date(b.moved_in_at).getTime())

  // Use a variable to keep track of the last address that was visited
  let lastAddress = moveData[0]

  // check that the sole trader moved into their last address less than 5 yrs ago
  if (new Date(lastAddress.moved_in_at) > fiveYearsAgo) {
    return 'Addresses must cover the last 5 years'
  }

  for (let i = 1; i < moveData.length; i++) {
    const address = moveData[i]
    if (!lastAddress.moved_out_at) {
      return 'Previous address must have a moved out at date'
    }

    // Check for address overlap
    if (new Date(address.moved_in_at) < new Date(lastAddress.moved_out_at)) {
      return 'Address overlaps with a previous address'
    }

    // Check for gap between moved_in date and last address move out
    const gap = differenceInDays(new Date(address.moved_in_at).getTime(), new Date(lastAddress.moved_out_at).getTime())
    if (gap > SOLE_TRADER_ADDRESS_HISTORY_GAP) {
      return `There is a gap of more than ${SOLE_TRADER_ADDRESS_HISTORY_GAP} days between addresses`
    }

    lastAddress = address
  }

  return null
}
