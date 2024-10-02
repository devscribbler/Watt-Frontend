import { SetDirectDebitAccountInfoPayload } from '../banking/types'

const mockResponse: SetDirectDebitAccountInfoPayload = {
  bank_name: 'Foo Bank Ltd',
  sort_code: '00-00-00',
  account_number: '11111111',
  account_holder_name: 'Bob Test',
}

export const MOCK_SET_DIRECT_DEBIT_RESPONSE = {
  useMock: false,
  mockResponse,
}
