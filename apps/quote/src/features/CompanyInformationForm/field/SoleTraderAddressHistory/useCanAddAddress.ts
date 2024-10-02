import { useSoleTraderAddresses } from './useSoleTraderAddresses'

/**
 * Must be used within `CompanyDetailsForm` context
 *
 * @param fields the address fields
 * @returns If you can add another address field
 */
export const useCanAddAddress = (): boolean => {
  const { fields: addresses } = useSoleTraderAddresses()
  return addresses.slice(0, addresses.length).every((field) => field.address !== '' && field.postcode !== '')
}
