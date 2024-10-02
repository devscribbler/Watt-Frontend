import { createAsyncThunk } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { generateQuotesByUtilityType, getProviders, SingleQuoteType } from '@watt/api-interface'
import { PaymentMethodsKeysType, UtilityKindType, QuoteRatesType, GenericUtilityQuote } from '@watt/constants'

type QuoteListResponse = {
  id: string
  quotes: GenericUtilityQuote[]
  expirationDate: string
  utilityType: UtilityKindType
  electricity?: {
    totalAnnualUsage: number
    tariffUsageSplits: {
      day: number
      night?: number
      weekend?: number
    }
    tariffUsageValues: {
      day: number
      night?: number
      weekend?: number
    }
  }
}

/**
 * A thunk to call the POST /quotes endpoint
 */
export const generateQuotesByUtilityTypeThunk = createAsyncThunk(
  'quote/getQuotesByUtilityTypeThunk',
  async (utilityType: UtilityKindType) => {
    const {
      quotes,
      id,
      expiration_date,
      electricity_total_annual_usage,
      electricity_tariff_usage_values,
      electricity_tariff_usage_splits,
    } = await generateQuotesByUtilityType(utilityType)
    const newQuotes = await formatRawQuotes(quotes)

    const quoteList: QuoteListResponse = {
      quotes: newQuotes,
      utilityType,
      id,
      expirationDate: expiration_date,
    }

    const ELECTRICITY_UTILITY_TYPE = 1
    if (utilityType === ELECTRICITY_UTILITY_TYPE) {
      return {
        ...quoteList,
        electricity: {
          totalAnnualUsage: electricity_total_annual_usage,
          tariffUsageSplits: electricity_tariff_usage_splits,
          tariffUsageValues: electricity_tariff_usage_values,
        },
      } as QuoteListResponse
    }

    return quoteList
  }
)

export async function formatRawQuotes(quotes: SingleQuoteType[]): Promise<GenericUtilityQuote[]> {
  const suppliers = await getProviders()

  const newQuotes: GenericUtilityQuote[] = []

  const currentSupplierRates = quotes.find((quote) => quote.is_comparison_provider === true)
  const currentSupplier = suppliers.find((supplier) => supplier.id === currentSupplierRates?.provider_id)

  quotes
    // Stephen: Filter out the comparison provider from the list of quoted providers
    .filter((quote) => quote.is_comparison_provider === false)
    .forEach((quote, index) => {
      const {
        provider_id,
        unit_rate,
        day_unit_rate,
        evening_unit_rate,
        night_unit_rate,
        weekend_unit_rate,
        off_peak_unit_rate,
        annual_price,
        price_guaranteed,
        standing_charge,
        duration,
        contract_type,
        capacity_charge_kva,
      } = quote

      let nextSupplier = suppliers.find((supplier) => supplier.id === provider_id)
      const nextSupplierRates: QuoteRatesType = {
        unit_rate,
        day_unit_rate,
        evening_unit_rate,
        night_unit_rate,
        weekend_unit_rate,
        off_peak_unit_rate,
        annual_price: annual_price,
        price_guaranteed,
        contract_type,
        standing_charge,
        durationMonths: duration,
        capacity_charge_kva,
      }
      const acceptedPaymentMethod: PaymentMethodsKeysType = 'DIRECT_DEBIT' // TODO take from backend

      if (!nextSupplier) {
        // TODO REMOVE THIS!!! TEST CODE
        console.error('[WARNING] supplier did not exist, took a random one from store!')
        nextSupplier = suppliers[0]
      }

      if (!nextSupplier || !nextSupplierRates) {
        console.error(
          'The supplier id from contract quote does not have a correspondent in the list of available suppliers.'
        )
        throw new Error('Error fetching the data. Please contact support.')
      }

      const id = nanoid(5)

      newQuotes.push({
        id,
        IMMUTABLE_INDEX: index,
        nextSupplier,
        nextSupplierRates,
        acceptedPaymentMethod,
        contractPeriodMonths: duration,
        currentSupplier,
        currentSupplierRates: currentSupplierRates
          ? { ...currentSupplierRates, durationMonths: currentSupplierRates.duration }
          : undefined,
      })
    })

  return newQuotes
}
