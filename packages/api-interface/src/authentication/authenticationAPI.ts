import { API_ROUTES } from '@watt/constants'
import { axios } from '../axios'

export type LogInResponse = {
  access: string
}

type LogInPayload = {
  email: string
  password: string
}

export const logIn = async (payload: LogInPayload): Promise<LogInResponse> => {
  const { data } = await axios.post<LogInResponse>(API_ROUTES.login, payload)

  return data
}
