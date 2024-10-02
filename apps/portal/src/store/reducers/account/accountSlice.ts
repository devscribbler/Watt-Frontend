import { createSlice } from '@reduxjs/toolkit'
import { BusinessContactDetails, BusinessDetails } from '~/features/companyInfo/formConfig'
import { getCompanyDetailsThunk, getContactDetailsThunk, setCompanyDetailsThunk } from './extraReducers'

export interface AccountState {
  status: 'loading' | 'success' | 'error'
  setCompanyDetailsStatus: 'initial' | 'loading' | 'success' | 'error'
  emailAddress: string
  mpan: string | null
  mprn: string | null
  company: BusinessDetails
  contact: BusinessContactDetails
}

const initialState: AccountState = {
  status: 'loading',
  setCompanyDetailsStatus: 'initial',
  emailAddress: '',
  mpan: null,
  mprn: null,
  company: {
    type: '',
    name: '',
    registrationNumber: '',
    sitePostcode: '',
    siteAddress: '',
  },
  contact: {
    businessPhoneNumber: '',
    contactName: '',
    position: '',
    postcode: '',
    address: '',
  },
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyDetailsThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCompanyDetailsThunk.fulfilled, (state, { payload }) => {
        state.status = 'success'
        state.company = payload.company
        state.contact.address = payload.contact.address
        state.contact.postcode = payload.contact.postcode
        state.mpan = payload.mpan
        state.mprn = payload.mprn
      })
      .addCase(getCompanyDetailsThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(getContactDetailsThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getContactDetailsThunk.fulfilled, (state, { payload }) => {
        state.status = 'success'
        state.contact.position = payload.contact.position
        state.contact.contactName = payload.contact.contactName
        state.contact.businessPhoneNumber = payload.contact.businessPhoneNumber
        state.emailAddress = payload.contact.emailAddress
      })
      .addCase(getContactDetailsThunk.rejected, () => {
        // TODO once we have more details about the errors on why this request fail, please to the required changes.
      })
      .addCase(setCompanyDetailsThunk.pending, (state) => {
        state.setCompanyDetailsStatus = 'loading'
      })
      .addCase(setCompanyDetailsThunk.fulfilled, (state) => {
        state.setCompanyDetailsStatus = 'success'
      })
      .addCase(setCompanyDetailsThunk.rejected, (state) => {
        state.setCompanyDetailsStatus = 'error'
      })
  },
})
