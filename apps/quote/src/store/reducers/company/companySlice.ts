import { createSlice } from '@reduxjs/toolkit'
import { BusinessDetails } from '@watt/api-interface'
import { getCompanyDetailsThunk, createCompanyThunk } from './extraReducers'

export interface CompanyState {
  status: 'loading' | 'success' | 'error'
  setCompanyDetailsStatus: 'initial' | 'loading' | 'success' | 'error'
  emailAddress: string
  mpan: string | null
  mprn: string | null
  mpan_key: string[] | null
  mprn_key: string[] | null
  company: BusinessDetails
  isPremium: boolean
}

const initialState: CompanyState = {
  status: 'loading',
  setCompanyDetailsStatus: 'initial',
  emailAddress: '',
  mpan: null,
  mprn: null,
  mpan_key: null,
  mprn_key: null,
  isPremium: false,
  company: {
    type: '',
    name: '',
    registrationNumber: '',
    sitePostcode: '',
    siteAddress: '',
  },
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCompanyThunk.fulfilled, (state, { payload }) => {
        state.mpan = payload.data?.mpan || null
        state.mprn = payload.data?.mprn || null
      })
      .addCase(getCompanyDetailsThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCompanyDetailsThunk.fulfilled, (state, { payload }) => {
        state.status = 'success'
        state.company = payload.company
        state.mpan_key = payload.mpan_key
        state.mprn_key = payload.mprn_key
        state.isPremium = payload.is_premium
      })
      .addCase(getCompanyDetailsThunk.rejected, (state) => {
        state.status = 'error'
      })
  },
})
