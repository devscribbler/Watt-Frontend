import { SetUsageReturnType } from '../usage/types'

const mockResponse: SetUsageReturnType = {
  utilityType: 1,
  data: {
    start_date: '2021-12-01T00:00:00.000',
    end_date: '2022-12-01T00:00:00.000',
    period: 1,
    total_annual_usage: 1000,
  },
}

export const MOCK_SET_USAGE_ELECTRICITY_RESPONSE = {
  useMock: false,
  mockResponse,
}
