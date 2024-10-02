import { stringify } from 'query-string'
import { API_ROUTES, UtilityKindType } from '@watt/constants'
import { MOCK_GET_QUOTES_ELECTRICITY_RESPONSE } from '../_mocks'
import { sleep } from '../_mocks/sleep'
import { axios } from '../axios'
import { GetQuoteByUtilityTypeResponse } from './types'

export const getQuoteByUtilityType = async (utilities: UtilityKindType): Promise<GetQuoteByUtilityTypeResponse> => {
  const { useMock, mockResponse } = MOCK_GET_QUOTES_ELECTRICITY_RESPONSE

  if (useMock) {
    await sleep(1000)

    return mockResponse
  }

  const queryParams = { utilities }
  const url = `${API_ROUTES.quotes}?${stringify(queryParams)}`

  const { data } = await axios.get<GetQuoteByUtilityTypeResponse[]>(url)

  if (data.length) {
    return data[0]
  }

  throw new Error('Error in getting the quotes')
}

export const generateQuotesByUtilityType = async (
  utilities: UtilityKindType
): Promise<GetQuoteByUtilityTypeResponse> => {
  const { useMock, mockResponse } = MOCK_GET_QUOTES_ELECTRICITY_RESPONSE

  if (useMock) {
    await sleep(1000)
    return mockResponse
  }

  const queryParams = { utilities }
  const url = `${API_ROUTES.quotes}?${stringify(queryParams)}`

  const { data } = await axios.post<GetQuoteByUtilityTypeResponse[]>(url)

  if (data.length) {
    return data[0]
  }

  throw new Error('Error in generating the quotes')
}
