import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { quoteRatesBuilder } from '@watt/constants'
import { GenericQuoteCard } from './GenericQuoteCard'

export default {
  component: GenericQuoteCard,
  title: 'Quote/Components/Quote/GenericQuoteCard',
} as Meta

const Template: Story<React.ComponentProps<typeof GenericQuoteCard>> = (args) => {
  return <GenericQuoteCard quote={args.quote} />
}

export const Default = Template.bind({})
Default.args = {
  quote: {
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
      .withContractType('example Current Contract Type')
      .build(),
    nextSupplierRates: quoteRatesBuilder()
      .withDayUnitRate(300)
      .withAnnualPrice(300)
      .withStandingCharge(300)
      .withPriceGuaranteed(300)
      .withContractType('example Next Contract Type')
      .build(),
    contractPeriodMonths: 1,
    acceptedPaymentMethod: 'DIRECT_DEBIT',
  },
}
