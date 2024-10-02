import { createSlice } from '@reduxjs/toolkit'
import { changePasswordThunk } from './extraReducers'

export interface changePasswordState {
  status: 'loading' | 'success' | 'error'
  changePassword: unknown
}

const initialState: changePasswordState = {
  status: 'loading',
  changePassword: {},
}

export const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        const { payload } = action

        state.status = 'success'
        state.changePassword = payload
      })
      .addCase(changePasswordThunk.rejected, (state, payload) => {
        state.status = 'error'
        state.changePassword = payload
      })
  },
})
