import { createAsyncThunk } from '@reduxjs/toolkit'
import { axios } from '@watt/api-interface'
import { defaultChangePasswordValues } from '~/components/ChangePassword/ChangePasswordForm'
import { cfg } from '~/config/config'

export type ChangePasswordFormTypes = typeof defaultChangePasswordValues

type ChangePassowrdResponse = { message: string }

export const changePasswordThunk = createAsyncThunk(
  'account/changePassword',
  async (formValues: ChangePasswordFormTypes) => {
    const payload = {
      new_password_1: formValues.newPassword,
      new_password_2: formValues.confirmNewPassword,
      current_password: formValues.currentPassword,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }

    const { data } = await axios.patch<ChangePassowrdResponse>(cfg.api.routes.changePasswordAccount, payload, config)

    return { data }
  }
)
