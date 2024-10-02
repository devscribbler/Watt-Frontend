// import { axios } from '@watt/api-interface'
import { axios } from '@watt/api-interface'
import { COMPANY_NUMBER_REGEX } from '@watt/constants'
import { cfg } from '~/config/config'
import en from '~/i18n'

export const isValidCompanyNumber = (registration_number: string): boolean =>
  COMPANY_NUMBER_REGEX.test(registration_number)

type StandardIndustrialClassification = {
  sic_code: string
  sic_description: string
}

type RegisteredOfficeAddress = {
  postal_code: string
  address_line_1: string
  locality: string
  country: string
  region: string
}

export type CompanyLookup = {
  company_type: string
  date_of_creation: string
  company_status: string
  company_name: string
  registered_office_address: RegisteredOfficeAddress
  sic_descriptions: StandardIndustrialClassification[]
  // TODO (Stephen): Type the errors better
} & { errors: { error: string; type: string }[] }

export async function findCompanyByCompanyNumber(registrationNumber: string): Promise<CompanyLookup> {
  if (isValidCompanyNumber(registrationNumber)) {
    const url = `${cfg.api.routes.companyLookup}?registration_number=${encodeURI(registrationNumber)}`
    const { data } = await axios.get<CompanyLookup>(url, { withCredentials: true })
    if (data) {
      return data
    }
  }

  throw new Error(en.errors.invalidRegistrationNumber)
}
