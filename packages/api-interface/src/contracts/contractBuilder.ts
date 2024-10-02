import { UtilityKindType, QuoteStatusKindType } from '@watt/constants'
import { SingleQuoteType, quoteBuilder } from '../quotes'
import { Contract } from './types'

export function contractBuilder() {
  // TODO set sensible defaults
  let start_date = ''
  let end_date = ''
  let id = ''
  let quote: SingleQuoteType | null = null
  let is_signed = false
  let utility_type: UtilityKindType = 1
  let status: QuoteStatusKindType = 1

  const builder = {
    withStartDate,
    withEndDate,
    withId,
    withQuote,
    withIsSigned,
    withUtilityType,
    withStatus,
    build,
  }

  function withStartDate(newStartDate: string) {
    start_date = newStartDate

    return builder
  }

  function withEndDate(newEndDate: string) {
    end_date = newEndDate

    return builder
  }

  function withId(newId: string) {
    id = newId

    return builder
  }

  function withQuote(newQuote: SingleQuoteType) {
    quote = newQuote

    return builder
  }

  function withIsSigned(newIsSigned: boolean) {
    is_signed = newIsSigned

    return builder
  }

  function withUtilityType(newUtilityType: UtilityKindType) {
    utility_type = newUtilityType

    return builder
  }

  function withStatus(newStatus: QuoteStatusKindType) {
    status = newStatus

    return builder
  }

  function build(): Contract {
    if (!quote) {
      quote = quoteBuilder().build()
    }

    const contract: Contract = {
      start_date,
      end_date,
      id,
      quote,
      is_signed,
      utility_type,
      status,
    }

    return contract
  }

  return builder
}
