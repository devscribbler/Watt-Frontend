import { createSlice } from '@reduxjs/toolkit'
import { Contract } from '@watt/api-interface'
import { UTILITIES_MAP_BY_NAME, UTILITIES_KIND_PROPERTY_MAP } from '@watt/constants'
import { getContractsByUtilityTypeThunk, signContractByIdThunk } from './extraReducers'

type IndividualContractStore = {
  [K in Lowercase<keyof UTILITIES_MAP_BY_NAME>]: Contract | null
}

type ContractsState = IndividualContractStore & {
  status: 'loading' | 'error' | 'success'
}

const initialState: ContractsState = {
  status: 'loading',
  electricity: null,
  gas: null,
  water: null,
  internet: null,
  telephone: null,
}

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContractsByUtilityTypeThunk.fulfilled, (state, { payload }) => {
      state.status = 'success'
      const { contract, utilityType } = payload
      const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
      state[utilityPropertyName] = contract
    })
    builder.addCase(getContractsByUtilityTypeThunk.rejected, (state) => {
      state.status = 'error'
    })
    builder.addCase(getContractsByUtilityTypeThunk.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(signContractByIdThunk.fulfilled, (state, { payload }) => {
      state.status = 'success'
      const { contract } = payload
      const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[contract.utility_type]

      const utilityContractState = state[utilityPropertyName]

      if (utilityContractState) {
        state[utilityPropertyName] = { ...utilityContractState, ...contract }
      }
    })
    builder.addCase(signContractByIdThunk.rejected, (state) => {
      state.status = 'error'
    })
    builder.addCase(signContractByIdThunk.pending, (state) => {
      state.status = 'loading'
    })
  },
})
