import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { BUSINESS_TYPES } from '@watt/constants'
import { BusinessType } from '@watt/constants'
import { findCompanyByCompanyNumber } from '~/utils/company'
import { CompanyDetailsForm, formConfig } from '../formConfig'

const BUSINESS_REG_NUMBER_LENGTH = 8

export function useCompanyLookup(businessTypeValue: string, registrationNumberValue: string) {
  const { setValue, clearErrors } = useFormContext<CompanyDetailsForm>()

  const [lastCompanyName, setLastCompanyName] = useState<string>('')
  const [lastLookup, setLastLookup] = useState<string | null>(null)

  const [verified, setVerified] = useState(false)

  const lookupCompany = useCallback(
    (registrationNumber: string) => {
      setVerified(false)
      const run = async () => {
        try {
          const companyLookup = await findCompanyByCompanyNumber(registrationNumber)

          if (companyLookup) {
            clearErrors(formConfig.company.registrationNumber.id)

            setValue(formConfig.company.name.id, companyLookup.company_name)
            setLastCompanyName(companyLookup.company_name)
            setVerified(true)

            // TODO (Stephen): Consider if we will handle other types doesn't support "Charities" or "Sole Trader"
            // https://github.com/companieshouse/api-enumerations/blob/2f972efaabd033891454cdb57a15ba198d9a633a/constants.yml#L17
            if (companyLookup.company_type && companyLookup.company_type === 'ltd') {
              const companyType = Object.keys(BUSINESS_TYPES).find(
                (key) => BUSINESS_TYPES[key] === companyLookup.company_type.toLocaleUpperCase()
              )
              if (companyType) {
                setValue(formConfig.company.type.id, companyType)
              }
            }
          }
        } catch (e) {
          console.error(e)
          setValue(formConfig.company.name.id, '')
          setVerified(false)
        }
      }

      run()
    },
    [clearErrors, setValue]
  )

  useEffect(() => {
    if (businessTypeValue !== BusinessType.LTD) {
      /*
       * Company is not a LTD
       * Clear the company name, registration number and verified state
       */
      setVerified(false)
      setValue(formConfig.company.registrationNumber.id, '')
      setValue(formConfig.company.name.id, '')
      return
    }
    if (!registrationNumberValue.length) {
      /*
       * Registration number is empty, clear the company name and verified state
       */
      setVerified(false)
      setValue(formConfig.company.name.id, '')
      return
    }

    if (registrationNumberValue === lastLookup && lastLookup.length >= BUSINESS_REG_NUMBER_LENGTH) {
      /*
       * The reg number is a valid reg number and the user's "last lookup"
       * is the same as the current reg number. Set name to previous lookup.
       */
      setValue(formConfig.company.name.id, lastCompanyName)
      return
    }

    setLastLookup(registrationNumberValue)

    lookupCompany(registrationNumberValue)
  }, [
    lastLookup,
    setLastLookup,
    lookupCompany,
    businessTypeValue,
    registrationNumberValue,
    setValue,
    setVerified,
    lastCompanyName,
  ])

  return { verified }
}
