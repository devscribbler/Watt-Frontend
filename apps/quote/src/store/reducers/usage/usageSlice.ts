import { createSlice } from '@reduxjs/toolkit'
import { GetElectricityUsageResponse, GetGasUsageResponse } from '@watt/api-interface'
import { UTILITIES_LOOKUP } from '@watt/constants'
import { getUsageByUtilityTypeThunk, getUsageThunk } from './extraReducers'

export interface UsageState {
  status: 'loading' | 'success' | 'error'
  electricity: GetElectricityUsageResponse | null
  gas: GetGasUsageResponse | null
}

const initialState: UsageState = {
  status: 'loading',
  electricity: null,
  gas: null,
}

export const usageSlice = createSlice({
  name: 'usage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsageThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUsageThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(getUsageByUtilityTypeThunk.fulfilled, (state, { payload }) => {
        const { data, type } = payload
        switch (type) {
          case UTILITIES_LOOKUP.ELECTRICITY:
            state.electricity = data as GetElectricityUsageResponse
            break
          case UTILITIES_LOOKUP.GAS:
            state.gas = data as GetGasUsageResponse
            break
          default:
            break
        }
        state.status = 'success'
      })
  },
})
