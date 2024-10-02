import Axios, { AxiosRequestConfig } from 'axios'
import { API_URL } from '@watt/constants'
import { getAccessToken } from '@watt/utils'

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = getAccessToken()

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  config.headers.Accept = 'application/json'
  config.withCredentials = true

  return config
}

export const axios = Axios.create({ baseURL: API_URL, withCredentials: true })

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    // TODO handle error message

    return Promise.reject({ ...error, message })
  }
)
