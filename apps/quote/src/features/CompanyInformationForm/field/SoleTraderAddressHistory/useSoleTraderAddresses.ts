import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { CompanyDetailsForm } from '../../formConfig'

/**
 * Gets the address history from the "Sole Trader" section
 * of the CompanyDetailsForm.
 *
 * @returns a list of form fields
 */
export function useSoleTraderAddresses() {
  const { watch } = useFormContext<CompanyDetailsForm>()
  const addresses = watch('company.soletraderPersonalDetails.addresses')

  return useMemo(() => {
    return {
      fields: addresses ?? [],
    }
  }, [addresses])
}
