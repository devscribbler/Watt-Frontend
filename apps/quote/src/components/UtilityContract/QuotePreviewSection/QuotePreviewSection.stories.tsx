import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { quoteRatesBuilder } from '@watt/constants'
import { QuotePreviewSection } from './QuotePreviewSection'

export default {
  component: QuotePreviewSection,
  title: 'Quote/Components/UtilityContract/QuotePreviewSection',
} as Meta

const Template: Story<React.ComponentProps<typeof QuotePreviewSection>> = (args) => <QuotePreviewSection {...args} />

export const Default = Template.bind({})

Default.args = {
  selectedQuote: {
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
    currentSupplierRates: quoteRatesBuilder().withDayUnitRate(100).withStandingCharge(100).build(),
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
}
