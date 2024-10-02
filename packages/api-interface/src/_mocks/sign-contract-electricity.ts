import { SignContractByIdResponse } from '../contracts/types'
import { MOCK_ELECTRICITY_QUOTE_1 } from './quotes/electricity'

const mockResponse: SignContractByIdResponse = {
  id: '0001',
  is_signed: false,
  status: 1, // PROCESSING
  utility_type: 1, // ELECTRICITY
  quote: MOCK_ELECTRICITY_QUOTE_1,
  signature: 'test', // TODO what is this?
}

export const MOCK_SIGN_CONTRACT_ELECTRICITY_RESPONSE = {
  useMock: false,
  mockResponse,
}
