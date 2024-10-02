import { stringify } from 'query-string'
import { API_ROUTES, UTILITY_TYPES, UtilityKindType } from '@watt/constants'
import { Provider } from '..'
import { MOCK_SELECT_ELECTRICITY_QUOTE_RESPONSE } from '../_mocks/select-quote-electricity'
import { MOCK_SIGN_CONTRACT_ELECTRICITY_RESPONSE } from '../_mocks/sign-contract-electricity'
import { sleep } from '../_mocks/sleep'
import { axios } from '../axios'
import { UtilityBulkQuotationId } from '../quotes'
import { Contract, SetSelectedQuoteToContractResponseType, SignContractByIdResponse } from './types'

export type ContractWithPDFurl = Contract & {
  pdfUrl: string
}

type GetContractsByUtilityPayload = {
  utilityType: UtilityKindType
  contractId?: string
}

export const getContractsByUtilityType = async ({
  utilityType,
  contractId,
}: GetContractsByUtilityPayload): Promise<Contract[]> => {
  const { useMock, mockResponse } = MOCK_SELECT_ELECTRICITY_QUOTE_RESPONSE

  if (useMock) {
    await sleep(1000)

    return [mockResponse]
  }

  const queryParams: { [key: string]: string | number } = {
    utilities: utilityType,
  }

  if (contractId) {
    queryParams.contract_id = contractId
  }

  const url = `${API_ROUTES.contracts}?${stringify(queryParams)}`
  const { data } = await axios.get<Contract[]>(url)

  return data
}

type SignContractByIdPayload = {
  contractId: string
  signature: string
  comments?: string
}

export const getContractPDFData = async (contractId: string) => {
  const { data: buffer } = await axios.get<ArrayBuffer>(`${API_ROUTES.contracts}/${contractId}/pdf`, {
    responseType: 'arraybuffer',
    headers: {
      Accept: 'application/pdf',
    },
  })

  const blob = new Blob([buffer], { type: 'application/pdf' })
  return {
    pdfUrl: URL.createObjectURL(blob),
  }
}

export const signContractById = async (payload: SignContractByIdPayload): Promise<SignContractByIdResponse> => {
  const { useMock, mockResponse } = MOCK_SIGN_CONTRACT_ELECTRICITY_RESPONSE

  if (useMock) {
    await sleep(1000)

    return {
      ...mockResponse,
      signature: payload.signature,
    }
  }

  const { contractId, signature, comments } = payload
  const url = API_ROUTES.contracts
  const body = {
    id: contractId,
    signature,
    comments,
  }
  const { data } = await axios.patch<SignContractByIdResponse>(url, body)

  return data
}

export const getContractById = async (contract_id: string): Promise<Contract> => {
  const url = `${API_ROUTES.contracts}/${contract_id}`
  const { data } = await axios.get<Contract>(url)

  return data
}

export type SetSelectedQuoteToContractPayloadType = {
  quoteId: UtilityBulkQuotationId
  quoteIndex: number
}

export const setSelectedQuoteToContract = async (
  payload: SetSelectedQuoteToContractPayloadType
): Promise<SetSelectedQuoteToContractResponseType> => {
  const { useMock, mockResponse } = MOCK_SELECT_ELECTRICITY_QUOTE_RESPONSE

  if (useMock) {
    await sleep(1000)

    return mockResponse
  }

  const { quoteId, quoteIndex } = payload

  const url = `${API_ROUTES.contracts}/${quoteId}/${quoteIndex}`
  const body = payload
  const { data } = await axios.post<SetSelectedQuoteToContractResponseType>(url, body)

  return data as SetSelectedQuoteToContractResponseType
}

export const getAllContracts = async (): Promise<Array<Contract>> => {
  const url = `${API_ROUTES.contracts}?${stringify({ utilities: Object.keys(UTILITY_TYPES) })}`
  const { data } = await axios.get<Array<Contract>>(url)

  return data
}

export const getContractProviderById = async (providerId: string): Promise<Provider> => {
  const { data } = await axios.get<Provider>(`${API_ROUTES.getContractProvider}/${providerId}`)

  return data
}
