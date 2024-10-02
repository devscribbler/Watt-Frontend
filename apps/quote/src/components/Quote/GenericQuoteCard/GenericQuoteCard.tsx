import * as React from 'react'
import { useCallback } from 'react'
import { Grid } from '@mui/material'
import { ButtonLoading, RightChevronIcon } from '@watt/components'
import { useIsDesktop } from '@watt/components'
import { GenericUtilityQuote } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { AnnualEstimateSection } from '../AnnualEstimateSection/AnnualEstimateSection'
import { GenericCard } from '../GenericCard/GenericCard'
import { QuoteRates } from '../QuoteRates/QuoteRates'
import { RatesComparisonTable } from '../RatesComparisonTable/RatesComparisonTable'
import { SupplierInfoSection } from '../SupplierInfoSection/SupplierInfoSection'
import { useStyles } from './generic.quote.card.style'

type Props = {
  quote: GenericUtilityQuote
  previewOnly?: boolean
  className?: string
  selectQuote?: (quote: GenericUtilityQuote) => void
}

export const GenericQuoteCard = ({ quote, previewOnly, selectQuote, className }: Props) => {
  const classes = useStyles()
  const isDesktop = useIsDesktop()
  const [ml2] = useSpacing('ml2')
  const { currentSupplier, currentSupplierRates, nextSupplier, nextSupplierRates } = quote
  const [showComparison, togglePricesComparison] = React.useState(false)
  const [loading, isLoading] = React.useState(false)

  const onClickSignMeUp = useCallback(() => {
    isLoading(true)
    if (selectQuote) {
      selectQuote(quote)
    }
  }, [selectQuote, quote])

  return (
    <GenericCard className={className}>
      <Grid container alignItems="center" spacing={isDesktop ? 10 : 6} className={classes.marginBottom}>
        <Grid item xs={12} lg={previewOnly ? 3 : 3}>
          <SupplierInfoSection
            supplier={nextSupplier}
            togglePricesComparison={() => togglePricesComparison(!showComparison)}
            showComparison={showComparison}
            className={classes.borderBottom}
          />
        </Grid>

        <Grid item xs={12} lg={previewOnly ? 5 : 4}>
          <QuoteRates rates={quote.nextSupplierRates} className={classes.borderBottom} />
        </Grid>
        <Grid item xs={12} lg={previewOnly ? 4 : 3}>
          <AnnualEstimateSection annualEstimate={quote.nextSupplierRates.annual_price} />
        </Grid>
        {!previewOnly && (
          <Grid item xs={12} lg={2} container justifyContent="flex-end">
            <ButtonLoading
              buttonProps={{
                size: 'large',
                type: 'submit',
                variant: 'contained',
                fullWidth: !isDesktop,
                color: 'primary',
                // TODO: look at why this is shows a linting error
                classes: { root: classes.buttonRoot, endIcon: classes.buttonLabel },
                onClick: onClickSignMeUp,
                endIcon: <RightChevronIcon height={16} width={16} className={ml2} />,
              }}
              loading={loading}
            >
              {en.electricityQuote.signMeUpButton}
            </ButtonLoading>
          </Grid>
        )}
      </Grid>
      {showComparison && (
        <RatesComparisonTable
          nextSupplierRates={nextSupplierRates}
          nextSupplier={nextSupplier}
          currentSupplier={currentSupplier}
          currentSupplierRates={currentSupplierRates}
        />
      )}
    </GenericCard>
  )
}
