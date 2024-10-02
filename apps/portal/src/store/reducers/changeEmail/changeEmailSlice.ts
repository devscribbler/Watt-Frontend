import { createSlice } from '@reduxjs/toolkit'
import { changeEmailIntendThunk, changeEmailThunk } from './extraReducers'

export interface sendSecurityCodeState {
  status: 'loading' | 'success' | 'error'
  changeEmail: {
    data: {
      message: string
    }
  }
  statusIntend: 'loading' | 'success' | 'error'
  changeEmailIntend: {
    data: {
      message: string
    }
  }
  error: unknown
}

const initialState: sendSecurityCodeState = {
  status: 'loading',
  changeEmail: {
    data: {
      message: '',
    },
  },
  statusIntend: 'loading',
  changeEmailIntend: {
    data: {
      message: '',
    },
  },
  error: '',
}

export const changeEmailSlice = createSlice({
  name: 'changeEmail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeEmailThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(changeEmailThunk.fulfilled, (state, action) => {
        const { payload } = action

        state.status = 'success'
        state.changeEmail = payload
      })
      .addCase(changeEmailThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.name
      })
      .addCase(changeEmailIntendThunk.pending, (state) => {
        state.statusIntend = 'loading'
      })
      .addCase(changeEmailIntendThunk.fulfilled, (state, action) => {
        const { payload } = action

        state.statusIntend = 'success'
        state.changeEmailIntend = payload
      })
      .addCase(changeEmailIntendThunk.rejected, (state) => {
        state.statusIntend = 'error'
      })
  },
})
