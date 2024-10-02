import { ContractLengthsType } from '@watt/constants'
import { SingleQuoteType } from './types'

export function quoteBuilder() {
  let annual_price = 300
  let contract_type = 'Test'
  let unit_rate = 100
  let day_unit_rate = 100
  let evening_unit_rate = 200
  let night_unit_rate = 200
  let weekend_unit_rate = 200
  let off_peak_unit_rate = 200
  let duration: ContractLengthsType = 1
  let end_date = '2020-01-02'
  let is_comparison_provider = false
  let price_guaranteed = 300
  let provider_id = '123'
  let standing_charge = 300

  const builder = {
    withAnnualPrice,
    withContractType,
    withUnitRate,
    withDayUnitRate,
    withEveningUnitRate,
    withNightUnitRate,
    withWendUnitRate,
    withOffPeakUnitRate,
    withDuration,
    withEndDate,
    withIsComparisonProvider,
    withPriceGuaranteed,
    withProviderId,
    withStandingCharge,
    build,
  }

  function withAnnualPrice(newAnnualPrice: number) {
    annual_price = newAnnualPrice

    return builder
  }

  function withContractType(newContractType: string) {
    contract_type = newContractType

    return builder
  }

  function withDayUnitRate(newDayUnitRate: number) {
    day_unit_rate = newDayUnitRate

    return builder
  }
  function withUnitRate(newUnitRate: number) {
    unit_rate = newUnitRate

    return builder
  }

  function withEveningUnitRate(newEveningUnitRate: number) {
    evening_unit_rate = newEveningUnitRate

    return builder
  }

  function withNightUnitRate(newNightUnitRate: number) {
    night_unit_rate = newNightUnitRate

    return builder
  }

  function withWendUnitRate(newWendUnitRate: number) {
    weekend_unit_rate = newWendUnitRate

    return builder
  }

  function withOffPeakUnitRate(newOffPeakUnitRate: number) {
    off_peak_unit_rate = newOffPeakUnitRate

    return builder
  }

  function withDuration(newDuration: ContractLengthsType) {
    duration = newDuration

    return builder
  }

  function withEndDate(newEndDate: string) {
    end_date = newEndDate

    return builder
  }

  function withIsComparisonProvider(newIsComparisonProvider: boolean) {
    is_comparison_provider = newIsComparisonProvider

    return builder
  }

  function withPriceGuaranteed(newPriceGuaranteed: number) {
    price_guaranteed = newPriceGuaranteed

    return builder
  }

  function withProviderId(newProviderId: string) {
    provider_id = newProviderId

    return builder
  }

  function withStandingCharge(newStandingCharge: number) {
    standing_charge = newStandingCharge

    return builder
  }

  function build(): SingleQuoteType {
    const quote: SingleQuoteType = {
      annual_price,
      contract_type,
      unit_rate,
      day_unit_rate,
      evening_unit_rate,
      night_unit_rate,
      weekend_unit_rate,
      off_peak_unit_rate,
      duration,
      end_date,
      is_comparison_provider,
      price_guaranteed,
      provider_id,
      capacity_charge_kva: '10',
      standing_charge,
    }

    return quote
  }

  return builder
}
