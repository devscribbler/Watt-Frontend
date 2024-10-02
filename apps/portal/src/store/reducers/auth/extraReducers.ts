import { createAsyncThunk } from '@reduxjs/toolkit'
import { axios } from '@watt/api-interface'
import { logIn } from '@watt/api-interface'
import { clearAccessToken } from '@watt/utils'
import { LoginForm } from '~/components/LoginForm/LoginForm'
import { cfg } from '~/config/config'
import { setTokensToLocalStorageAndAxios } from '~/utils/localStorage'

export const logInThunk = createAsyncThunk('auth/logIn', async ({ email, password }: LoginForm) => {
  const { access: accessToken } = await logIn({ email, password })

  setTokensToLocalStorageAndAxios({ accessToken })

  return { accessToken }
})

type LogOutResponse = { message: string }

export const logOutThunk = createAsyncThunk('auth/logOut', async () => {
  const { data } = await axios.post<LogOutResponse>(cfg.api.routes.logout)

  if (data.message === 'token_revoked') {
    clearAccessToken()
  }

  return data // TODO
})

// export const refreshTokenThunk = createAsyncThunk('auth/refreshToken', async () => {
//   const { data } = await axios.patch(
//     cfg.api.routes.refreshToken,
//     {
//       access: localStorage.getItem('accessToken'),
//     },
//     {
//       headers: {
//         ['Authorization']: `Bearer ${localStorage.getItem('refreshToken')!}`, // TODO
//       },
//     }
//   )

//   return data // TODO
// })

type AuthenticatingResponse = {
  access: string
}

export const checkSessionThunk = createAsyncThunk('auth/authenticate', async () => {
  try {
    const localStorageAccessToken = localStorage.getItem('accessToken')

    const { data } = await axios.patch<AuthenticatingResponse>(cfg.api.routes.refreshToken, null, {
      withCredentials: true,
      headers: {
        ['Authorization']: `Bearer ${localStorageAccessToken}`, // TODO
      },
    })
    const { access: accessToken } = data

    setTokensToLocalStorageAndAxios({ accessToken })

    return data
  } catch (error) {
    clearAccessToken()
    throw error
  }
})
