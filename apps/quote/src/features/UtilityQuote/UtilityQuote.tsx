import * as React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { GenericUtilityQuote, UTILITIES_LOOKUP } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { ContractsPeriodFilter } from '~/components/Filters/ContractsPeriodFilter/ContractsPeriodFilter'
import { QuotesSection } from '~/components/UtilityQuote/QuotesSection/QuotesSection'
import { setSelectedQuoteToContractThunk } from '~/store/reducers/cart/extraReducers'
import { usePaginatedFilteredQuotes, toggleDisplayAllQuotes } from '~/store/reducers/quotes/quotesSlice'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { getPage } from '~/utils/steps'
import { RateSplitBanner } from './RateSplitBanner'

export function UtilityQuote() {
  const [pt16, pb24, pb10] = useSpacing('pt16', 'pb24', 'pb10')
  const dispatch = useAppDispatch()

  const utilityType = useAppSelector((state) => state.form.currentFlow)

  if (!utilityType) {
    throw new Error("Can't render Quote component without utilityType")
  }

  const utilityStore = useAppSelector((state) => {
    switch (utilityType) {
      case UTILITIES_LOOKUP.ELECTRICITY:
        return state.quotes.electricity
      case UTILITIES_LOOKUP.GAS:
        return state.quotes.gas
      default:
        throw new Error('Invalid utility type')
    }
  })

  if (utilityStore === null) {
    throw new Error("Utility store can't be null")
  }

  const quotes = usePaginatedFilteredQuotes(utilityType)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const toggleDisplayQuotes = React.useCallback(() => {
    dispatch(toggleDisplayAllQuotes(utilityType))
  }, [dispatch, utilityType])

  const selectQuote = React.useCallback(
    (quote: GenericUtilityQuote) => {
      const run = async () => {
        try {
          await dispatch(
            setSelectedQuoteToContractThunk({
              quote,
              quoteId: utilityStore.id,
              utilityType,
            })
          )

          await router.push(getPage(utilityType, 'contract'))
        } catch (error) {
          enqueueSnackbar('Something went wrong. Action could not be completed.', { variant: 'error' })
        }
      }

      run()
    },
    [dispatch, utilityStore, enqueueSnackbar, router, utilityType]
  )

  const allQuotes = utilityStore.rawQuotes ?? []

  return (
    <div className={clsx(pb24, pt16)}>
      <RateSplitBanner />
      <ContractsPeriodFilter className={pb10} utilityType={utilityType} quotes={allQuotes} />
      <QuotesSection
        quotes={quotes}
        toggleDisplayQuotes={toggleDisplayQuotes}
        displayAll={utilityStore.displayAll || false}
        selectQuote={selectQuote}
        utilityType={utilityType}
      />
    </div>
  )
}
