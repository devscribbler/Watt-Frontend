import { createSlice } from '@reduxjs/toolkit'
import { getDirectDebitAccountInfoThunk, setDirectDebitAccountInfoThunk } from './extraReducers'

export type DirectDebitAccountInfoType = {
  accountNumber: string
  bankName: string
  sortCode: string
  accountHolderName: string
}

export interface BankingState {
  status: 'loading' | 'success' | 'error'
  directDebit: DirectDebitAccountInfoType
}

const initialState: BankingState = {
  status: 'loading',
  directDebit: {
    accountNumber: '',
    bankName: '',
    sortCode: '',
    accountHolderName: '',
  },
}

export const bankingSlice = createSlice({
  name: 'banking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDirectDebitAccountInfoThunk.fulfilled, (state, { payload }) => {
        const { account_holder_name, account_number, bank_name, sort_code } = payload.data

        state.status = 'success'
        state.directDebit = {
          accountHolderName: account_holder_name,
          accountNumber: account_number,
          bankName: bank_name,
          sortCode: sort_code,
        }
      })
      .addCase(getDirectDebitAccountInfoThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getDirectDebitAccountInfoThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(setDirectDebitAccountInfoThunk.fulfilled, (state) => {
        state.status = 'success'
      })
      .addCase(setDirectDebitAccountInfoThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(setDirectDebitAccountInfoThunk.rejected, (state) => {
        state.status = 'error'
      })
  },
})
