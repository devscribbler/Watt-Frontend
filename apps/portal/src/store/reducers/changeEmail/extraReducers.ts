import { createAsyncThunk } from '@reduxjs/toolkit'
import { axios } from '@watt/api-interface'
import { cfg } from '~/config/config'
import { removeEmailFromSessionStorage, setEmailToSessionStorage } from '~/utils/sessionStorage'

export const defaultChangeEmailIntend = {
  email: '',
}
export type ChangeEmailIntendFormTypes = typeof defaultChangeEmailIntend

type ChangeEmailIntendResponse = { message: string }

export const changeEmailIntendThunk = createAsyncThunk(
  'users/sendSecurityCode',
  async ({ email }: ChangeEmailIntendFormTypes) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
    setEmailToSessionStorage({ email })
    const { data } = await axios.post<ChangeEmailIntendResponse>(cfg.api.routes.sendSecurityCode, { email }, config)
    return { data }
  }
)

export const defaultChangeEmailForm = {
  email: '',
  code: '',
}
export type changeEmailForm = typeof defaultChangeEmailForm

type changeEmailFormResponse = { message: string }

export const changeEmailThunk = createAsyncThunk('users/changeEmail', async ({ email, code }: changeEmailForm) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  }

  removeEmailFromSessionStorage()

  const { data } = await axios.patch<changeEmailFormResponse>(cfg.api.routes.changeEmail, { email, code }, config)

  return { data }
})
