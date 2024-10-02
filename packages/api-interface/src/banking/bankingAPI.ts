import { API_ROUTES } from '@watt/constants'
import { MOCK_SET_DIRECT_DEBIT_RESPONSE } from '../_mocks/set-direct-debit'
import { sleep } from '../_mocks/sleep'
import { axios } from '../axios'
import { SetDirectDebitAccountInfoPayload } from './types'

export const setDirectDebitAccountInfo = async (
  payload: SetDirectDebitAccountInfoPayload
): Promise<SetDirectDebitAccountInfoPayload> => {
  const { useMock, mockResponse } = MOCK_SET_DIRECT_DEBIT_RESPONSE

  if (useMock) {
    await sleep(1000)

    return mockResponse
  }

  const url = API_ROUTES.banking
  const { data } = await axios.post<SetDirectDebitAccountInfoPayload>(url, payload)

  return data
}

export const getDirectDebitAccountInfo = async (): Promise<SetDirectDebitAccountInfoPayload> => {
  const { useMock, mockResponse } = MOCK_SET_DIRECT_DEBIT_RESPONSE

  if (useMock) {
    await sleep(1000)

    return mockResponse
  }

  const url = API_ROUTES.banking
  const { data } = await axios.get<SetDirectDebitAccountInfoPayload>(url)

  return data
}
