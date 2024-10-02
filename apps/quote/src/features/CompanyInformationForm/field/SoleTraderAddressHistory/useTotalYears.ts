import { useMemo } from 'react'
import { differenceInYears } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { CompanyDetailsForm } from '../../formConfig'

/**
 * Calculates difference between the moveOut and moveInDate for each address
 * and returns the total years.
 *
 * Must be used within `CompanyDetailsForm` context
 *
 * @param fields the address fields
 * @returns Total years from all addresses
 */
export const useTotalYearsFromSoleTraderAddresses = () => {
  const { watch } = useFormContext<CompanyDetailsForm>()
  const addresses = watch('company.soletraderPersonalDetails.addresses')

  return useMemo(() => {
    // attach to every field in the `addresses` array
    const years = addresses.map((_: typeof addresses[0], index: number) => {
      // get their `moved_in_at` and `moved_out_at` fields
      const moveInDate = watch(`company.soletraderPersonalDetails.addresses.${index}.moved_in_at`)
      const moveOutDate = watch(`company.soletraderPersonalDetails.addresses.${index}.moved_out_at`)

      const parsedMoveIn = new Date(moveInDate)

      // if getTime is NaN then the date is invalid
      if (isNaN(parsedMoveIn.getTime())) {
        throw new Error('Unable to parse move in date')
      }

      // null moveOutDate indicates "still living there" so just use todays date
      if (!moveOutDate) {
        const parsedToday = new Date()

        return differenceInYears(parsedMoveIn, parsedToday)
      }

      const parsedMoveOut = new Date(moveOutDate)

      if (isNaN(parsedMoveOut.getTime())) {
        throw new Error('Unable to parse move in date')
      }

      // this will be some decimal value of the years between move in and move out
      return differenceInYears(parsedMoveIn, parsedMoveOut)
    })

    // TODO (James) should this initialvalue be `1` or `0`?
    const totalYears = years.reduce((a: number, b: number) => a + b, 1)
    return totalYears
  }, [addresses, watch])
}
