import * as React from 'react'
import { Provider } from '@watt/api-interface'
import { Button } from '@watt/components'
import { UtilityKindType, GenericUtilityQuote } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { GenericQuoteCard } from '~/components/Quote/GenericQuoteCard/GenericQuoteCard'
import en from '~/i18n'
import { useShouldShowMoreQuotesButton } from '~/store/reducers/quotes/quotesSlice'
import { SupplierFilter } from './SupplierFilter'

type Props = {
  quotes: GenericUtilityQuote[]
  selectQuote: (quote: GenericUtilityQuote) => void
  toggleDisplayQuotes: React.MouseEventHandler<HTMLButtonElement>
  displayAll: boolean
  utilityType: UtilityKindType
}

export const QuotesSection = (props: Props): JSX.Element => {
  const { quotes, selectQuote, toggleDisplayQuotes, displayAll, utilityType } = props
  const [mb10] = useSpacing('mb10')
  const displayShowMoreQuotesButton = useShouldShowMoreQuotesButton(utilityType)
  const [selectedFilterSuppliers, setSelectedSuppliers] = React.useState<Provider[]>([])

  const visibleQuotes = React.useMemo(() => {
    if (selectedFilterSuppliers.length === 0) {
      return quotes
    }

    return quotes.filter((quote) => selectedFilterSuppliers.some((supplier) => supplier.id === quote.nextSupplier.id))
  }, [quotes, selectedFilterSuppliers])

  const visibleProviders = React.useMemo(() => {
    const providers = quotes.map((quote) => quote.nextSupplier)
    return [...new Set(providers)]
  }, [quotes])

  return (
    <div>
      <SupplierFilter providers={visibleProviders} onChange={setSelectedSuppliers} />

      {visibleQuotes.map((quote) => (
        <GenericQuoteCard key={quote.id} quote={quote} selectQuote={selectQuote} className={mb10} />
      ))}

      {displayShowMoreQuotesButton && (
        <Button type="button" variant="outlined" onClick={toggleDisplayQuotes}>
          {displayAll ? en.electricityQuote.showLess : en.electricityQuote.showMore}
        </Button>
      )}
    </div>
  )
}
