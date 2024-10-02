import { createSlice } from '@reduxjs/toolkit'
import { GetElectricityUsageResponse, GetGasUsageResponse } from '@watt/api-interface'
import { getUsageThunk } from './extraReducers'

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
      .addCase(getUsageThunk.fulfilled, (state, { payload }) => {
        state.status = 'success'
        const { data, type } = payload
        if (type === 1) {
          const { contract, usage } = data as GetElectricityUsageResponse
          state.electricity = { contract, usage: usage.length > 12 ? usage.slice(0, 12) : usage }
        } else if (type === 2) {
          state.gas = data as GetGasUsageResponse
        }
      })
      .addCase(getUsageThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUsageThunk.rejected, (state) => {
        state.status = 'error'
      })
  },
})
