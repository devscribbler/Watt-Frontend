import { UtilityKindType, ContractLengthsType } from '@watt/constants'

export type SetUsageResponseType = {
  start_date: string
  end_date: string
  period: ContractLengthsType
  total_annual_usage: number
  non_watt_provider_name?: string
  provider_id?: string
}

export type SetUsageReturnType = {
  utilityType: UtilityKindType
  data: SetUsageResponseType
}
