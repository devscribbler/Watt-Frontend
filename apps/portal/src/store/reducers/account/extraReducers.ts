import { createAsyncThunk } from '@reduxjs/toolkit'
import { axios } from '@watt/api-interface'
import { getCompanyDetails } from '@watt/api-interface'
import { cfg } from '~/config/config'
import { CompanyDetailsForm } from '~/features/companyInfo/formConfig'
import { serializeContactDetailsResponse, serializeSetCompanyDetailsRequest } from './serializers'

export type GetContactDetailsResponse = {
  name: string
  email: string
  phone: string
  position: string
  company: Company
}

export interface Company {
  main_address: string
  main_postcode: string
}

export const getCompanyDetailsThunk = createAsyncThunk('account/getCompanyDetails', getCompanyDetails)

export const getContactDetailsThunk = createAsyncThunk('account/getContactDetails', async () => {
  const { data } = await axios.get<GetContactDetailsResponse>(cfg.api.routes.companyContactDetails)

  return {
    ...serializeContactDetailsResponse(data),
  }
})

export interface SetCompanyDetailsResponse {
  id: string
  name: string
  registration_number: string
  main_address: string
  main_postcode: string
  mpan: string
  mprn: string
  contacts: Contact[]
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  position: string
}

export const setCompanyDetailsThunk = createAsyncThunk(
  'account/setCompanyDetails',
  async (payload: CompanyDetailsForm) => {
    const { data } = await axios.put<SetCompanyDetailsResponse>(
      cfg.api.routes.companyDetails,
      serializeSetCompanyDetailsRequest(payload)
    )

    return data
  }
)
