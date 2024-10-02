import { SetSelectedQuoteToContractResponseType } from '../contracts/types'
import { MOCK_ELECTRICITY_QUOTE_1 } from './quotes/electricity'

const mockResponse: SetSelectedQuoteToContractResponseType = {
  id: '0001',
  start_date: '2021-12-31T11:59:00.000',
  end_date: '2022-12-31T11:59:00.000',
  is_signed: false,
  status: 1, // PROCESSING
  utility_type: 1, // ELECTRICITY
  quote: MOCK_ELECTRICITY_QUOTE_1,
}

export const MOCK_SELECT_ELECTRICITY_QUOTE_RESPONSE = {
  useMock: false,
  mockResponse,
}
