import { AxiosError } from 'axios'
import { API_ROUTES } from '@watt/constants'
import { ApiResponse } from '../apiResponse'
import { axios } from '../axios'

export type SoleTraderPersonalAddress = {
  id?: string
  address: string
  postcode: string
  moved_in_at: string
  moved_out_at?: string | null
}

/**
 * This is a DTO for the sole trader personal details
 * For business_type: 3
 */
type SoleTraderPersonalDetails = {
  id?: string
  date_of_birth: string
  addresses: SoleTraderPersonalAddress[]
}

export type CompanyDto = {
  id?: string
  name: string
  registration_number: string | null
  charity_number: string | null
  main_address: string
  main_postcode: string
  mpan?: string
  mprn?: string
  mpan_key: string | null
  mprn_key: string | null
  business_type: number // // TODO(Olly) Update this to be a BusinessType enum #782
  soletrader_personal_details: SoleTraderPersonalDetails | null
}

type ContactDto = {
  id?: string
  forename: string
  surname: string
  email: string
  code: string
  phone: string
  position: string
}

type CompanySiteDto = {
  id?: string
  address: string
  postcode: string
}

type AcquisitionInfoDto = {
  campaign_id: string
  target_id: string
}

type AgreementDto = {
  authorized: boolean
  credit_check: boolean
  letter_of_authority: boolean
  terms_and_conditions: boolean
  smart_meter_agreement: boolean
  direct_debit_agreement: boolean
}

export type CreateCompanyPayload = {
  company: CompanyDto
  contact: ContactDto
  site: CompanySiteDto
  agreement_set: AgreementDto
  acquisition_info?: AcquisitionInfoDto
}

export type CreateCompanyResponseType = {
  company: CompanyDto
  csrf_token: string
}
// TODO (Olly): Update the rejectWithValueType to be a generic type
export const createCompany = async (payload: CreateCompanyPayload): Promise<ApiResponse<CompanyDto>> => {
  const url = `${API_ROUTES.public.companies.create}`

  try {
    const { data } = await axios.post<CreateCompanyResponseType>(url, payload)

    if (data.csrf_token) {
      axios.defaults.headers.common['x-xsrf-token'] = data.csrf_token
    }

    return { data: data.company, error: null, code: null, message: null }
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<CompanyDto>>
    const response = axiosError.response

    if (!response) {
      throw error
    }

    if (axiosError.response) {
      const { data } = response
      if (data.error && data.message) {
        const { error, code, message } = data || { error: null, code: response.status, message: null }
        const result: ApiResponse<CompanyDto> = { data: null, error, code, message }

        return result
      }
    }
    throw error
  }
}
