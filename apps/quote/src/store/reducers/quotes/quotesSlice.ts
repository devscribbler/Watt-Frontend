import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UtilityBulkQuotationId } from '@watt/api-interface'
import {
  UtilityKindType,
  UTILITIES_KIND_PROPERTY_MAP,
  UTILITIES_MAP_BY_NAME,
  GenericUtilityQuote,
} from '@watt/constants'
import { useAppSelector } from '~/store/selectors'
import { generateQuotesByUtilityTypeThunk } from './extraReducers'

const INITIAL_QUOTES_NUMBER = 5

type SingleUtilityStore = {
  id: UtilityBulkQuotationId
  expirationDate: string
  rawQuotes: GenericUtilityQuote[]
  displayAll: boolean
  appliedFilters: Filter[]
}

type ElectricityStore = SingleUtilityStore & {
  ratePercentage: {
    day: number
    night?: number
    weekend?: number
  }
}

type IndividualQuotesStore = {
  [K in Lowercase<keyof Omit<UTILITIES_MAP_BY_NAME, 'ELECTRICITY'>>]: SingleUtilityStore | null
} & {
  electricity: ElectricityStore | null
}

export type QuotesState = IndividualQuotesStore & {
  status: 'loading' | 'success' | 'error'
}

const initialState: QuotesState = {
  status: 'loading',
  electricity: null,
  gas: null,
  water: null,
  telephone: null,
  internet: null,
}

export type FilterQuotesPayload = {
  utilityType: UtilityKindType
  filter: Filter
}

type Filter = {
  type: keyof Pick<GenericUtilityQuote, 'contractPeriodMonths' | 'acceptedPaymentMethod'>
  value: unknown // TODO
  action: 'add' | 'remove'
}

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    toggleDisplayAllQuotes: (state, action: PayloadAction<UtilityKindType>) => {
      const utilityType = action.payload
      const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
      const singleUtilityStore = state[utilityPropertyName]

      if (singleUtilityStore === null) {
        return
      }

      singleUtilityStore.displayAll = !singleUtilityStore.displayAll
    },

    addFilter: (state, action: PayloadAction<FilterQuotesPayload>) => {
      const { utilityType, filter } = action.payload
      const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
      const singleUtilityStore = state[utilityPropertyName]

      if (singleUtilityStore === null) {
        return
      }

      if (filter.action === 'add') {
        singleUtilityStore.appliedFilters.push(filter)
        return
      }

      if (filter.action === 'remove') {
        const { appliedFilters } = singleUtilityStore

        const index = appliedFilters.findIndex(
          (appliedFilter) => appliedFilter.type === filter.type && appliedFilter.value === filter.value
        )

        appliedFilters.splice(index, 1)
        singleUtilityStore.appliedFilters = appliedFilters
        return
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateQuotesByUtilityTypeThunk.fulfilled, (state, { payload }) => {
      state.status = 'success'
      const { quotes, utilityType, expirationDate, id } = payload

      const ELECTRICITY_UTILITY_TYPE = 1
      if (utilityType === ELECTRICITY_UTILITY_TYPE) {
        const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]

        const { electricity } = payload

        if (!electricity) {
          throw new Error('no electricity data on electricity quote list')
        }

        state[utilityPropertyName] = {
          id,
          displayAll: false,
          appliedFilters: [],
          expirationDate,
          rawQuotes: quotes,
          ratePercentage: {
            day: electricity.tariffUsageSplits.day * 100,
            night: (electricity.tariffUsageSplits.night || 0) * 100,
            weekend: (electricity.tariffUsageSplits.weekend || 0) * 100,
          },
        }
      } else {
        const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]

        state[utilityPropertyName] = {
          id,
          displayAll: false,
          appliedFilters: [],
          expirationDate,
          rawQuotes: quotes,
        }
      }
    })
    builder.addCase(generateQuotesByUtilityTypeThunk.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(generateQuotesByUtilityTypeThunk.rejected, (state) => {
      state.status = 'error'
    })
  },
})

type GetFilteredQuotesType = {
  filters: Filter[]
  quotes: GenericUtilityQuote[]
}

const orderQuotes = (quotes: GenericUtilityQuote[]) =>
  [...quotes].sort((a, b) => a.nextSupplierRates.annual_price - b.nextSupplierRates.annual_price)

const getFilteredQuotes = ({ filters, quotes }: GetFilteredQuotesType): GenericUtilityQuote[] => {
  const orderedQuotes = orderQuotes(quotes)

  if (filters.length === 0) {
    return orderedQuotes
  }

  const selectedPaymentMethodFilters = filters
    .filter((appliedFilter) => appliedFilter.type === 'acceptedPaymentMethod')
    .map((v) => v.value)
  const selectedContractPeriodFilters = filters
    .filter((appliedFilter) => appliedFilter.type === 'contractPeriodMonths')
    .map((v) => v.value)

  const filteredQuotes = orderedQuotes.filter((quote) => {
    const paymentMethodsFilter =
      selectedPaymentMethodFilters.length === 0
        ? true
        : selectedPaymentMethodFilters.includes(quote.acceptedPaymentMethod)

    const contractPeriodFilter =
      selectedContractPeriodFilters.length === 0
        ? true
        : selectedContractPeriodFilters.includes(quote.contractPeriodMonths / 12)

    if (paymentMethodsFilter && contractPeriodFilter) {
      return true
    }

    return false
  })

  return filteredQuotes
}

export const usePaginatedFilteredQuotes = (utilityType: UtilityKindType): GenericUtilityQuote[] =>
  useAppSelector((state) => {
    const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
    const utilityStore = state.quotes[utilityPropertyName]

    if (utilityStore === null) {
      return []
    }

    const { displayAll, appliedFilters, rawQuotes } = utilityStore

    const filteredQuotes = getFilteredQuotes({ filters: appliedFilters, quotes: rawQuotes })

    return getPaginatedQuotes(displayAll, filteredQuotes)
  })

const getPaginatedQuotes = (displayAll: boolean, quotes: GenericUtilityQuote[]): GenericUtilityQuote[] => {
  if (displayAll === true) {
    return quotes
  }

  return quotes.slice(0, INITIAL_QUOTES_NUMBER)
}

export const useShouldShowMoreQuotesButton = (utilityType: UtilityKindType): boolean =>
  useAppSelector((state) => {
    const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
    const utilityStore = state.quotes[utilityPropertyName]

    if (utilityStore === null) {
      return false
    }

    const { displayAll, rawQuotes, appliedFilters } = utilityStore

    const filteredQuotes = getFilteredQuotes({ filters: appliedFilters, quotes: rawQuotes })
    const areMoreThanFiveQuotes = filteredQuotes.length > INITIAL_QUOTES_NUMBER

    if (displayAll === false && areMoreThanFiveQuotes) {
      return true
    }

    if (displayAll === true && areMoreThanFiveQuotes) {
      return true
    }

    return false
  })

export const { toggleDisplayAllQuotes, addFilter } = quotesSlice.actions
