import { ContractLengthsType } from '@watt/constants'
import { QuoteRatesType } from './quotes'

// Same as SingleQuoteType but lacking `end_date`, `provider_id` and `is_comparison_provider`
// TODO maybe merge in future

export function quoteRatesBuilder() {
  let unit_rate = 35
  let day_unit_rate = 35
  let evening_unit_rate = 35
  let night_unit_rate = 35
  let weekend_unit_rate = 35
  let off_peak_unit_rate = 35
  let annual_price = 100
  let capacity_charge_kva = '10' // TODO (jude): check default value
  let standing_charge = 75
  let price_guaranteed = 100
  let contract_type = 'Example Current Contract Type'
  let duration = 1

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
    withPriceGuaranteed,
    withCapacityCharge,
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

  function withPriceGuaranteed(newPriceGuaranteed: number) {
    price_guaranteed = newPriceGuaranteed

    return builder
  }

  function withStandingCharge(newStandingCharge: number) {
    standing_charge = newStandingCharge

    return builder
  }

  function withCapacityCharge(newCapacityCharge: string) {
    capacity_charge_kva = newCapacityCharge

    return builder
  }

  function build(): QuoteRatesType {
    // TODO consider splitting this large interface
    const quote: QuoteRatesType = {
      // contract details (meta)
      contract_type,
      durationMonths: duration,
      price_guaranteed,

      // financial
      annual_price,
      standing_charge,
      capacity_charge_kva,

      // rates
      unit_rate,
      day_unit_rate,
      evening_unit_rate,
      night_unit_rate,
      weekend_unit_rate,
      off_peak_unit_rate,
    }

    return quote
  }

  return builder
}
