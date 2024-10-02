import { createAsyncThunk } from '@reduxjs/toolkit'
import { getContractPDFData, setSelectedQuoteToContract, UtilityBulkQuotationId } from '@watt/api-interface'
import { GenericUtilityQuote, UtilityKindType } from '@watt/constants'
import { getDirectDebitAccountInfoThunk } from '../banking/extraReducers'
import { getContractsByUtilityTypeThunk } from '../contracts/extraReducers'
import { formatRawQuotes } from '../quotes/extraReducers'
import { addUtilityQuoteToCart } from './cartSlice'

type SetSelectedQuotePayload = {
  quote: GenericUtilityQuote
  quoteId: UtilityBulkQuotationId
  utilityType: UtilityKindType
}

export const setSelectedQuoteToContractThunk = createAsyncThunk(
  'cart/setSelectedQuoteToContract',
  async (payload: SetSelectedQuotePayload, thunkAPI) => {
    const { quote, quoteId, utilityType } = payload
    const quoteIndex = quote.IMMUTABLE_INDEX

    const contract = await setSelectedQuoteToContract({ quoteId, quoteIndex })
    const formattedQuote = await formatRawQuotes([contract.quote])
    thunkAPI.dispatch(addUtilityQuoteToCart({ quote: formattedQuote[0], utilityType }))

    // TODO: (maks) return not needed these values aren't used see if can refactor cart state
    return {
      contract,
      selectedQuote: formattedQuote[0],
      utilityType,
    }
  }
)

type GetCartPayload = {
  utilityType: UtilityKindType
  contractId?: string
}

export const getCartByUtilityTypeThunk = createAsyncThunk(
  'cart/getCartByUtilityType',
  async ({ contractId, utilityType }: GetCartPayload, thunkAPI) => {
    const { contract } = await thunkAPI.dispatch(getContractsByUtilityTypeThunk({ contractId, utilityType })).unwrap()
    const formattedQuotes = await formatRawQuotes([contract.quote])
    await thunkAPI.dispatch(getDirectDebitAccountInfoThunk())

    const { pdfUrl } = await getContractPDFData(contract.id)

    return {
      utilityType,
      contract: {
        ...contract,
        pdfUrl,
      },
      selectedQuote: formattedQuotes[0],
    }
  }
)
