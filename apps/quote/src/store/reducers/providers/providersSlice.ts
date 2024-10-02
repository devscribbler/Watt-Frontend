import { createSlice } from '@reduxjs/toolkit'
import { Provider } from '@watt/api-interface'
import { getProviderByIdThunk, getProvidersByUtilityTypeThunk } from './extraReducers'

export interface UsageState {
  status: 'loading' | 'success' | 'error'
  providers: Provider[]
}

const initialState: UsageState = {
  status: 'loading',
  providers: [],
}

export const providersSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProviderByIdThunk.fulfilled, (state, { payload }) => {
        const providerIndex = state.providers.findIndex((provider) => provider.id === payload.id)

        if (providerIndex > -1) {
          state.providers[providerIndex] = payload
        } else {
          state.providers.push(payload)
        }
      })
      .addCase(getProvidersByUtilityTypeThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProvidersByUtilityTypeThunk.fulfilled, (state, { payload }) => {
        state.status = 'success'
        state.providers = payload
      })
      .addCase(getProvidersByUtilityTypeThunk.rejected, (state) => {
        state.status = 'error'
      })
  },
})
