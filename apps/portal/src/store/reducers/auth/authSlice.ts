import { createSlice } from '@reduxjs/toolkit'
import { checkSessionThunk, logInThunk, logOutThunk } from './extraReducers'

export interface User {
  email: string
}

export type AuthStatus = 'unknown' | 'unauthenticated' | 'authenticating' | 'verifying' | 'authenticated' | 'error' // 'loading' | 'error' | 'authenticated' | 'loggedOf'

export interface AuthState {
  status: AuthStatus
  user: User | null
  tokens: {
    accessToken: string
  } | null
}

const initialState: AuthState = {
  status: 'unknown',
  user: null,
  tokens: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logIn: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSessionThunk.pending, (state) => {
        state.status = 'verifying'
      })
      .addCase(checkSessionThunk.fulfilled, (state, action) => {
        const {
          payload: { access: accessToken },
        } = action

        state.status = 'authenticated'
        state.tokens = {
          accessToken,
        }
      })
      .addCase(checkSessionThunk.rejected, (state) => {
        state.status = 'unauthenticated'
        state.tokens = null
      })
      .addCase(logInThunk.pending, (state) => {
        state.status = 'authenticating'
      })
      .addCase(logInThunk.fulfilled, (state, action) => {
        const {
          payload: { accessToken },
        } = action
        state.status = 'authenticated'

        state.tokens = {
          accessToken,
        }
      })
      .addCase(logInThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(logOutThunk.pending, (state) => {
        state.status = 'verifying'
      })
      .addCase(logOutThunk.fulfilled, (state) => {
        state.status = 'unauthenticated'
      })
      .addCase(logOutThunk.rejected, (state) => {
        state.status = 'error'
      })
  },
})

export const { logIn } = authSlice.actions
