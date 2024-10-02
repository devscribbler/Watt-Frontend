import { AxiosError } from 'axios'
import { API_ROUTES, BUSINESS_TYPES, BusinessRegistrationNumberType } from '@watt/constants'
import { ApiResponse, toSnakeCase } from '../apiResponse'
import { axios } from '../axios'

export type GetCompanyDetailsResponse = {
  main_address: string
  main_postcode: string
  name: string
  business_type: BusinessRegistrationNumberType
  registration_number: string
  mpan: string
  mprn: string
  sites: Site[]
  is_premium: boolean
}

export interface Site {
  address: string
  postcode: string
}

export const getCompanyDetails = async (): Promise<SerializedGetCompanyDetailsResponse> => {
  const { data } = await axios.get<GetCompanyDetailsResponse>(API_ROUTES.companyDetails)

  return serializeCompanyDetailsResponse(data)
}

export type BusinessDetails = {
  type: string
  name: string
  registrationNumber: string
  sitePostcode: string
  siteAddress: string
}

export type SerializedGetCompanyDetailsResponse = {
  company: BusinessDetails
  contact: {
    address: string
    postcode: string
  }
  mpan_key: string[] | null
  mprn_key: string[] | null
  mpan: string
  mprn: string
  is_premium: boolean
}

export type VerificationCodeResponse = {
  message: string
}

type VerificationCodeRequest = {
  email: string
  code: string
}

export const submitVerificationCode = async (input: VerificationCodeRequest): Promise<VerificationCodeResponse> => {
  const { data } = await axios.post<VerificationCodeResponse>(API_ROUTES.verifyCode, input)

  return data
}

export type EmailValidationResponse = {
  message: string
}

type EmailRequest = {
  email: string
}

type createAcquisitionPayload = {
  targetId: string
  campaignId: string
}

export const submitEmailForVerification = async (input: EmailRequest): Promise<EmailValidationResponse> => {
  const inputData = {
    email: input.email,
  }
  const { data } = await axios.post<EmailValidationResponse>(API_ROUTES.sendEmailCode, inputData)

  return data
}

/**
 * Creates a new company acquisition record on the backend API using the specified payload.
 * @param payload The data payload to send with the API request.
 * @returns A promise that resolves with the API response, either success or failure.
 * @throws If an error occurs while sending the API request or processing the response.
 */
export const createAcquisition = async (payload: createAcquisitionPayload): Promise<ApiResponse> => {
  const url = `${API_ROUTES.public.companies.createAcquisition}`

  try {
    await axios.post(url, JSON.stringify(payload, toSnakeCase))
    return { data: null, error: null, code: null, message: null }
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>
    const response = axiosError.response

    if (!response) {
      return { data: null, error: axiosError.message, code: null, message: null }
    }

    if (axiosError.response) {
      const { data } = response
      const { error, code, message } = data || { error: null, code: response.status, message: null }
      const result: ApiResponse = { data: null, error, code, message }

      return result
    } else {
      const result: ApiResponse = { data: null, error: axiosError.message, code: null, message: null }
      return result
    }
  }
}

export function serializeCompanyDetailsResponse(data: GetCompanyDetailsResponse): SerializedGetCompanyDetailsResponse {
  return {
    company: {
      siteAddress: data.main_address, //data.sites[0].address, // TODO we assume each call company will have 1 site added.
      sitePostcode: data.main_postcode,
      name: data.name,
      registrationNumber: data.registration_number,
      type: BUSINESS_TYPES[data.business_type], // TODO check what 2 means
    },
    contact: {
      address: data.sites.length ? data.sites[0].address : '',
      postcode: data.sites.length ? data.sites[0].postcode : '',
    },
    mpan_key: null,
    mprn_key: null,
    mpan: data.mpan,
    mprn: data.mprn,
    is_premium: data.is_premium,
  }
}
