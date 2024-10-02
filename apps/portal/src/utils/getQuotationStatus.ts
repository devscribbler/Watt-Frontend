import { differenceInCalendarDays, subYears } from 'date-fns'
import { QUOTE_STATUS, QuoteStatusKindType } from '@watt/constants'
import en from '~/i18n'

export type QuoteStatusType = QuoteStatusKindType

type Props = {
  status: QuoteStatusKindType
  end_date: string
}
export const getQuotationStatus = ({ status, end_date }: Props): string => {
  const isDueForRenewal = status === 5

  if (isDueForRenewal) {
    const daysTillExpiration = subYears(new Date(end_date), 1)
    const daysTillRenewal = differenceInCalendarDays(daysTillExpiration, new Date())
    return `Due for renewal in ${daysTillRenewal} days`
  }

  const statusText = en.quoteStatus[QUOTE_STATUS[status]]

  return statusText
}
