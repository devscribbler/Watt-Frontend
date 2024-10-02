import { createSlice } from '@reduxjs/toolkit'
import { Contract, GetQuoteByUtilityTypeResponse, Provider } from '@watt/api-interface'
import { getContractPDFByIdThunk, getAllContractsWithProvidersThunk } from './extraReducers'

export type ContractWithProvider = {
  contract: Contract
  provider: Provider
  quote: GetQuoteByUtilityTypeResponse | null
}
export interface ContractState {
  status: 'loading' | 'success' | 'error'
  contracts: ContractWithProvider[]
  contractPDF: unknown
}

const initialState: ContractState = {
  status: 'loading',
  contracts: [],
  contractPDF: {},
}

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContractsWithProvidersThunk.fulfilled, (state, { payload }) => {
        state.status = 'success'
        state.contracts = payload
      })
      .addCase(getAllContractsWithProvidersThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllContractsWithProvidersThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(getContractPDFByIdThunk.fulfilled, (state, action) => {
        const { payload } = action

        state.status = 'success'
        state.contractPDF = payload
      })
      .addCase(getContractPDFByIdThunk.rejected, (state) => {
        state.status = 'error'
      })
  },
})
