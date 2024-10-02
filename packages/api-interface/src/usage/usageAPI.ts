import { AxiosError } from 'axios'
import { stringify } from 'query-string'
import { UtilityKindType, API_ROUTES, MONTHS, ContractLengthsType } from '@watt/constants'
import { MOCK_SET_USAGE_ELECTRICITY_RESPONSE } from '../_mocks'
import { sleep } from '../_mocks/sleep'
import { axios } from '../axios'
import { SetUsageResponseType, SetUsageReturnType } from './types'
export interface CurrentContract {
  post_code: string
  total_annual_usage: number
  mpan: null | string
  mprn: null | string
  start_date: string
  supplier_name: string
  provider_id: string
  period?: ContractLengthsType
  non_watt_provider_name?: null | string
}

export interface ContractGas {
  start_date: string
  end_date: string
  period: ContractLengthsType
  total_annual_usage: number
  provider_id: string
  non_watt_provider_name: null | string
  mpan: null | string
  mprn: null | string
}

export interface GetGasUsageResponse {
  usage: MonthlyUsage[]
  contract: ContractGas
}

type UtilityUsagePayload = {
  utilityType: UtilityKindType
  mpan?: string
  mprn?: string
}

type d = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type YYYY = `20${d}${d}`
export type MM = keyof typeof MONTHS

export interface MonthlyUsage {
  year_month: `${YYYY}-${MM}`
  monthly_usage: number
}

export interface GetElectricityUsageResponse {
  usage: MonthlyUsage[]
  contract: CurrentContract
}

export type GetUsageErrorType = {
  /**
   * A string identifying the error.
   */
  code: string

  /**
   * A human-readable error message.
   */
  message: string
}

type UsageData = GetElectricityUsageResponse | GetGasUsageResponse

export type GetUsageResponseType =
  | { data: UsageData; error?: never }
  | {
    data?: never; error: GetUsageErrorType
  }

type GetUsageQueryParamsType = {
  utility_type: UtilityKindType
  mpan?: string
}

export const getUsage = async (payload: UtilityUsagePayload): Promise<GetUsageResponseType> => {
  const queryParams: GetUsageQueryParamsType = {
    utility_type: payload.utilityType,
  }

  if (payload.mpan) {
    queryParams.mpan = payload.mpan
  }

  const url = `${API_ROUTES.usage}?${stringify(queryParams)}`

  try {
    const { data } = await axios.get<GetElectricityUsageResponse | GetGasUsageResponse>(url)
    return { data }
  } catch (e) {
    const error = e as AxiosError
    const code = error.response?.data.error ?? 'unknown'
    const message = error.response?.data.message ?? 'An unknown error occurred.'

    return {
      error: { code, message }
    }
  }
}

export type SetUsagePayload = {
  total_annual_usage: number
  provider_id?: string
  non_watt_provider_name?: string
  start_date?: string
  has_no_contract?: boolean
  utility_type: UtilityKindType
  mprn?: string
}

export const setUsage = async (payload: SetUsagePayload): Promise<SetUsageReturnType> => {
  const { useMock, mockResponse } = MOCK_SET_USAGE_ELECTRICITY_RESPONSE

  if (useMock) {
    await sleep(1000)

    return mockResponse
  }

  const url = API_ROUTES.usage
  const body = payload
  const { data } = await axios.post<SetUsageResponseType>(url, body)

  return { utilityType: payload.utility_type, data }
}
