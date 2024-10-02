import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContractWithPDFurl } from '@watt/api-interface'
import {
  GenericUtilityQuote,
  UTILITIES_MAP_BY_NAME,
  UTILITIES_KIND_PROPERTY_MAP,
  UtilityKindType,
} from '@watt/constants'
import { useAppSelector } from '~/store/selectors'
import { signContractByIdThunk } from '../contracts/extraReducers'
import { getCartByUtilityTypeThunk } from './extraReducers'

type CartItemPerUtility = {
  selectedQuote: GenericUtilityQuote | null
  contract: ContractWithPDFurl
}

type SelectedUtilityQuote = {
  [K in Lowercase<keyof UTILITIES_MAP_BY_NAME>]: CartItemPerUtility | null
}

export type CartState = SelectedUtilityQuote & {
  status: 'loading' | 'success' | 'error'
}

const initialState: CartState = {
  status: 'loading',
  electricity: null,
  gas: null,
  water: null,
  internet: null,
  telephone: null,
}

type AddUtilityQuoteToCartPayload = {
  utilityType: UtilityKindType
  quote: GenericUtilityQuote
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addUtilityQuoteToCart: (state, action: PayloadAction<AddUtilityQuoteToCartPayload>) => {
      const { utilityType, quote } = action.payload
      const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
      const cartUtility = state[utilityPropertyName]

      if (cartUtility) {
        cartUtility.selectedQuote = quote
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartByUtilityTypeThunk.fulfilled, (state, { payload }) => {
      const { contract, selectedQuote, utilityType } = payload
      const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]

      if (state[utilityPropertyName] === null) {
        // @ts-expect-error missing empty object assignment
        state[utilityPropertyName] = {}
      }

      // @ts-expect-error object is possibly null
      state[utilityPropertyName].contract = contract
      // @ts-expect-error object is possibly null
      state[utilityPropertyName].selectedQuote = selectedQuote
    })
    builder.addCase(signContractByIdThunk.fulfilled, (state, { payload }) => {
      const { contract } = payload
      const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[contract.utility_type]

      const utilityContractState = state[utilityPropertyName]

      if (utilityContractState && utilityContractState.contract) {
        utilityContractState.contract.is_signed = true
        utilityContractState.contract.pdfUrl = contract.pdfUrl
      }
    })
  },
})

export const { addUtilityQuoteToCart } = cartSlice.actions

export const useSelectedQuoteByUtilityType = (utilityType: UtilityKindType): GenericUtilityQuote | null =>
  useAppSelector((state) => {
    const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
    const utilityCart = state.cart[utilityPropertyName]

    if (utilityCart) {
      return utilityCart.selectedQuote
    }

    return null
  })
