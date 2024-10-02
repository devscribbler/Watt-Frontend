import { QuoteRatesType, RATES_MEASUREMENT_UNITS } from '@watt/constants'
import en from '~/i18n'

const i18n = en.electricityQuote

type RatesType = {
  [key in keyof QuoteRatesType]: {
    label: string
    // TODO improve the typing here (remove the union) so we don't need to cast the value
    text: (value: string | number) => string
  }
}

export const RATES: RatesType = {
  unit_rate: {
    label: i18n.rates.dayUnitRate,
    text: (value) => `${Number(value).toFixed(5)} ${RATES_MEASUREMENT_UNITS.unit_rate} / unit`,
  },
  day_unit_rate: {
    label: i18n.rates.dayUnitRate,
    text: (value) => `${Number(value).toFixed(5)} ${RATES_MEASUREMENT_UNITS.day_unit_rate} / unit`,
  },
  evening_unit_rate: {
    label: i18n.rates.eveningUnitRate,
    text: (value) => `${Number(value).toFixed(5)} ${RATES_MEASUREMENT_UNITS.evening_unit_rate} / unit`,
  },
  night_unit_rate: {
    label: i18n.rates.nightUnitRate,
    text: (value) => `${Number(value).toFixed(5)} ${RATES_MEASUREMENT_UNITS.night_unit_rate} / unit`,
  },
  weekend_unit_rate: {
    label: i18n.rates.wendUnitRate,
    text: (value) => `${Number(value).toFixed(5)} ${RATES_MEASUREMENT_UNITS.weekend_unit_rate} / unit`,
  },
  off_peak_unit_rate: {
    label: i18n.rates.offPeakUnitRate,
    text: (value) => `${Number(value).toFixed(5)} ${RATES_MEASUREMENT_UNITS.off_peak_unit_rate} / unit`,
  },
  standing_charge: {
    label: i18n.rates.standingCharge,
    text: (value) => `${Number(value).toFixed(5)} ${RATES_MEASUREMENT_UNITS.standing_charge} / day`,
  },
  annual_price: {
    label: i18n.rates.annualPrice,
    text: (value) => `${RATES_MEASUREMENT_UNITS.annual_price} ${Number(value).toFixed(2)} / year`,
  },
  price_guaranteed: {
    label: i18n.rates.priceGuaranteed,
    text: (period) => {
      // Desired result:  2 months fixed prices / 1 month fixed prices
      const monthLabel = Number(period) === 1 ? 'month' : 'months'

      return `${period} ${monthLabel} fixed prices`
    },
  },
  contract_type: {
    label: i18n.rates.priceGuaranteed,
    text: (period) => {
      // Desired result:  2 years fixed prices
      const year = Number(period) === 1 ? 'year' : 'years'

      return `${period} ${year} fixed prices`
    },
  },
  durationMonths: {
    label: i18n.rates.duration,
    text: (value) => value.toString(),
  },
  capacity_charge_kva: {
    label: i18n.rates.capacityChargeKva,
    text: (value) => `${value.toString()} kVA`,
  },
}
