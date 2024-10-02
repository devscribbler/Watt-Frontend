import { QuoteStatusKindType, UtilityKindType } from '@watt/constants'
import { SingleQuoteType } from '../quotes'

export type SetSelectedQuoteToContractResponseType = {
  start_date: string
  end_date: string
  id: string
  quote: SingleQuoteType
  is_signed: boolean
  utility_type: UtilityKindType
  status: QuoteStatusKindType
}

export type SignContractByIdResponse = {
  id: string
  quote: SingleQuoteType
  is_signed: boolean
  signature: string
  utility_type: UtilityKindType
  status: QuoteStatusKindType
}

export type Contract = {
  start_date: string
  end_date: string
  id: string
  quote: SingleQuoteType
  is_signed: boolean
  utility_type: UtilityKindType
  status: QuoteStatusKindType
}
