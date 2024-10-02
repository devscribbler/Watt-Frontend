import { GetQuoteByUtilityTypeResponse } from '../quotes/types'
import { MOCK_ELECTRICITY_QUOTE_1, MOCK_ELECTRICITY_QUOTE_2 } from './quotes/electricity'

const mockResponse: GetQuoteByUtilityTypeResponse = {
  id: '0001',
  expiration_date: '2022-12-31T11:59:00.000',
  utility_type: 1,
  quotes: [MOCK_ELECTRICITY_QUOTE_1, MOCK_ELECTRICITY_QUOTE_2],
  electricity_total_annual_usage: 1000,
  electricity_tariff_usage_values: {
    day: 1000.0,
    night: 0.0,
    weekend: 0.0,
  },
  electricity_tariff_usage_splits: {
    day: 1.0,
    night: 0.0,
    weekend: 0.0,
  },
}

export const MOCK_GET_QUOTES_ELECTRICITY_RESPONSE = {
  useMock: false,
  mockResponse,
}
