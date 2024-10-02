import { ContractLengthsType, UtilityKindType } from '@watt/constants'

export type SingleQuoteType = {
  // TODO (Stephen): these are marked as non optional but may not all becoming back from the API request
  annual_price: number
  contract_type: string
  unit_rate: number
  day_unit_rate: number
  night_unit_rate: number
  evening_unit_rate: number
  weekend_unit_rate: number
  off_peak_unit_rate: number
  duration: ContractLengthsType
  end_date: string // variation against RateTypes
  is_comparison_provider: boolean // variation against RateTypes
  price_guaranteed: number
  provider_id: string // variation against RateTypes
  standing_charge: number
  capacity_charge_kva: string
}

export type UtilityBulkQuotationId = string

export type GetQuoteByUtilityTypeResponse = {
  id: UtilityBulkQuotationId
  utility_type: UtilityKindType
  expiration_date: string
  quotes: SingleQuoteType[]

  /**
   * The total annual usage of electricity in kWh which was used to generate this quote list
   */
  electricity_total_annual_usage?: number

  /**
   * The proportional splits of usage in each tariff
   */
  electricity_tariff_usage_splits?: {
    day: number
    night?: number
    weekend?: number
  }

  /**
   * The actual usage in kWh of each tariff split
   */
  electricity_tariff_usage_values?: {
    day: number
    night?: number
    weekend?: number
  }
}
