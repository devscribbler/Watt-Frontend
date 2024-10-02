import { useState, useEffect, useCallback } from 'react'
import { Path, useFormContext } from 'react-hook-form'
import en from '~/i18n'
import { findAddressesByPostcode, FindAddressByPostcode } from '~/utils/postcode'
import { CompanyDetailsForm } from './formConfig'

/**
 * Looks up a list of addresses given a postcode
 *
 * @param postcodeKey Must be a key on CompanyDetailsForm leading to a postcode field
 * @param addressKey Must be a key on CompanyDetailsForm leading to an address field
 * @param mpanKey Must be a key on CompanyDetailsForm leading to an encrypted mpan identity
 * @param mprnKey Must be a key on CompanyDetailsForm leading to an encrypted mprn identity
 *
 * @returns A list of addresses
 */

export function usePostcodeLookup(
  postcodeKey: Path<CompanyDetailsForm>,
  addressKey: Path<CompanyDetailsForm>,
  mpanKey?: Path<CompanyDetailsForm>,
  mprnKey?: Path<CompanyDetailsForm>
) {
  const { watch, setError, setValue, clearErrors } = useFormContext<CompanyDetailsForm>()

  const postcode = watch(postcodeKey) as unknown as string
  const [lastLookup, setLastLookup] = useState<string | null>(null)
  const [addresses, setAddresses] = useState<FindAddressByPostcode[] | null>(null)

  const lookUpPostcode = useCallback(
    (postcode: string) => {
      const run = async () => {
        try {
          const addresses = await findAddressesByPostcode(postcode)

          clearErrors(postcodeKey)
          clearErrors(addressKey)

          setAddresses(addresses)

          setValue(addressKey, '')
          if (mpanKey) {
            setValue(mpanKey, '')
          }

          if (mprnKey) {
            setValue(mprnKey, '')
          }

          if (!addresses.length) {
            setError(addressKey, { message: en.errors.noAddressesFound })
          }
        } catch (e) {
          setError(postcodeKey, { message: en.errors.invalidPostcode })
          setValue(addressKey, '')
          setAddresses(null)
          if (mpanKey) {
            setValue(mpanKey, '')
          }
          if (mprnKey) {
            setValue(mprnKey, '')
          }
        }
      }

      run()
    },
    [addressKey, clearErrors, mpanKey, mprnKey, postcodeKey, setError, setValue]
  )

  useEffect(() => {
    if (postcode === lastLookup || !postcode.length) {
      return
    }

    setLastLookup(postcode)

    lookUpPostcode(postcode)
  }, [postcode, lastLookup, setLastLookup, lookUpPostcode])

  return { addresses }
}
