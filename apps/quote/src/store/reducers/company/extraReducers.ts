import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getCompanyDetails,
  createCompany,
  submitEmailForVerification,
  submitVerificationCode,
  createAcquisition,
} from '@watt/api-interface'

export const getCompanyDetailsThunk = createAsyncThunk('account/getCompanyDetails', getCompanyDetails)

export const createCompanyThunk = createAsyncThunk('company/create', createCompany)

export const createAcquisitionThunk = createAsyncThunk('company/createAcquisition', createAcquisition)

export const submitEmailForVerificationThunk = createAsyncThunk(
  'company/emailValidationCode',
  submitEmailForVerification
)

export const submitVerifyCodeThunk = createAsyncThunk('company/verifyCode', submitVerificationCode)
