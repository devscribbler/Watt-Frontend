import * as React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Story, Meta } from '@storybook/react'
import { Provider } from 'react-redux'
import { GenericUtilityQuote, quoteRatesBuilder } from '@watt/constants'
import { providersSlice } from '~/store/reducers/providers/providersSlice'
import { quotesSlice } from '../../../store/reducers/quotes/quotesSlice'
import { QuotesSection } from './QuotesSection'

const templateStore = configureStore({
  reducer: {
    quotes: quotesSlice.reducer,
    providers: providersSlice.reducer,
  },
})

export default {
  component: QuotesSection,
  title: 'Quote/Components/UtilityQuote/QuotesSection',
  decorators: [(storyFn) => <Provider store={templateStore}>{storyFn()}</Provider>],
} as Meta

const Template: Story<React.ComponentProps<typeof QuotesSection>> = (args) => {
  return (
    <QuotesSection
      quotes={args.quotes}
      displayAll={args.displayAll}
      toggleDisplayQuotes={args.toggleDisplayQuotes}
      selectQuote={args.selectQuote}
      utilityType={args.utilityType}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  utilityType: 2,
  displayAll: false,
  quotes: [
    {
      id: '1',
      IMMUTABLE_INDEX: 1,
      currentSupplier: {
        id: '1',
        name: 'Test Supplier',
        logo_file_name: '',
        is_displayed_on_current_supplier_list: true,
      },
      nextSupplier: {
        id: '2',
        name: 'Test Supplier 2',
        logo_file_name: '',
        is_displayed_on_current_supplier_list: true,
      },
      currentSupplierRates: quoteRatesBuilder()
        .withDayUnitRate(100)
        .withAnnualPrice(100)
        .withStandingCharge(100)
        .withPriceGuaranteed(100)
        .withContractType('Example Current Contract Type')
        .build(),
      nextSupplierRates: quoteRatesBuilder()
        .withDayUnitRate(300)
        .withAnnualPrice(300)
        .withStandingCharge(300)
        .withPriceGuaranteed(300)
        .withContractType('Example Next Contract Type')
        .build(),
      contractPeriodMonths: 1,
      acceptedPaymentMethod: 'DIRECT_DEBIT',
    },
    {
      id: '2',
      IMMUTABLE_INDEX: 2,
      currentSupplier: {
        id: '1',
        name: 'Test Supplier',
        logo_file_name: '',
        is_displayed_on_current_supplier_list: true,
      },
      nextSupplier: {
        id: '3',
        name: 'Test Supplier3',
        logo_file_name: '',
        is_displayed_on_current_supplier_list: true,
      },
      currentSupplierRates: quoteRatesBuilder()
        .withDayUnitRate(100)
        .withAnnualPrice(100)
        .withStandingCharge(100)
        .withPriceGuaranteed(100)
        .withContractType('Example 2 Current Contract Type')
        .build(),
      nextSupplierRates: quoteRatesBuilder()
        .withDayUnitRate(200)
        .withAnnualPrice(200)
        .withStandingCharge(200)
        .withPriceGuaranteed(200)
        .withContractType('Example 2 Next Contract Type')
        .build(),
      contractPeriodMonths: 2,
      acceptedPaymentMethod: 'DIRECT_DEBIT',
    },
    {
      id: '3',
      IMMUTABLE_INDEX: 3,
      currentSupplier: {
        id: '1',
        name: 'Test Supplier',
        logo_file_name: '',
        is_displayed_on_current_supplier_list: true,
      },
      nextSupplier: {
        id: '4',
        name: 'Test Supplier4',
        logo_file_name: '',
        is_displayed_on_current_supplier_list: true,
      },
      currentSupplierRates: quoteRatesBuilder()
        .withDayUnitRate(100)
        .withAnnualPrice(100)
        .withStandingCharge(100)
        .withPriceGuaranteed(100)
        .withContractType('Example 3 Current Contract Type')
        .build(),
      nextSupplierRates: quoteRatesBuilder()
        .withDayUnitRate(400)
        .withAnnualPrice(400)
        .withStandingCharge(400)
        .withPriceGuaranteed(400)
        .withContractType('Example 4 Next Contract Type')
        .build(),
      contractPeriodMonths: 2,
      acceptedPaymentMethod: 'DIRECT_DEBIT',
    },
  ],

  // TODO use action from storybook for these rather than console.log
  selectQuote: (quote: GenericUtilityQuote) => {
    console.log(quote)
  },
  toggleDisplayQuotes: (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event)
  },
}
