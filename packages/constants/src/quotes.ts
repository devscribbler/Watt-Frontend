import { Provider } from '@watt/api-interface'
import { UtilityKindType, UTILITY_TYPES } from '.'
import { ContractLengthsType, CurrencyType, PaymentMethodsKeysType } from './general'

export type QuoteRatesType = {
  unit_rate: number
  day_unit_rate: number
  evening_unit_rate: number
  night_unit_rate: number
  weekend_unit_rate: number
  off_peak_unit_rate: number
  annual_price: number
  standing_charge: number
  price_guaranteed: number
  contract_type: string
  durationMonths: number
  capacity_charge_kva: string
}

export type GenericUtilityQuote = {
  id: string
  IMMUTABLE_INDEX: number
  currentSupplier?: Provider
  nextSupplier: Provider
  currentSupplierRates?: QuoteRatesType
  nextSupplierRates: QuoteRatesType
  contractPeriodMonths: ContractLengthsType
  acceptedPaymentMethod: PaymentMethodsKeysType
}

type RatesMeasurementUnitsType = {
  [key in keyof QuoteRatesType]: CurrencyType
}

export const RATES_MEASUREMENT_UNITS: Partial<RatesMeasurementUnitsType> = {
  unit_rate: 'p',
  day_unit_rate: 'p',
  evening_unit_rate: 'p',
  night_unit_rate: 'p',
  weekend_unit_rate: 'p',
  off_peak_unit_rate: 'p',
  standing_charge: 'p',
  annual_price: '£',
} as const

type UtilitiesKindPropertyAccessorType = {
  [K in UtilityKindType]: Lowercase<typeof UTILITY_TYPES[K]>
}

export const UTILITIES_KIND_PROPERTY_MAP: UtilitiesKindPropertyAccessorType = {
  1: 'electricity',
  2: 'gas',
  3: 'water',
  4: 'telephone',
  5: 'internet',
}

export const MINIMUM_CONTRACT_START_OFFSET_FOR_PROVIDERS_DAYS_IN_FUTURE = 7

export const getMinimumContractStartDate = () => {
  const contractStartDate = new Date(
    new Date().setDate(new Date().getDate() + MINIMUM_CONTRACT_START_OFFSET_FOR_PROVIDERS_DAYS_IN_FUTURE)
  ).toDateString()

  return contractStartDate
}
