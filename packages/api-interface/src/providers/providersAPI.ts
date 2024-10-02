import { stringify } from 'query-string'
import { API_ROUTES, UtilityKindType } from '@watt/constants'
import { axios } from '../axios'

export type Provider = {
  id: string
  name: string
  logo_file_name: string
  is_displayed_on_current_supplier_list: boolean
}

export type GetProvidersListResponse = Provider[]

export const getProviders = async (): Promise<Provider[]> => {
  const url = API_ROUTES.providers

  const { data } = await axios.get<Provider[]>(url)

  return data
}

export const getProviderById = async (id: string): Promise<Provider> => {
  const url = `${API_ROUTES.providers}/${id}`

  const { data } = await axios.get<Provider>(url)

  return data
}

export const getProvidersByUtilityType = async (utility_type: UtilityKindType): Promise<GetProvidersListResponse> => {
  const queryParams = { utility_type }
  const url = `${API_ROUTES.providers}?${stringify(queryParams)}`

  const { data } = await axios.get<GetProvidersListResponse>(url)

  return data
}
