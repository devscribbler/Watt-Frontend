import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { quoteRatesBuilder } from '@watt/constants'
import { RatesComparisonTable } from './RatesComparisonTable'

export default {
  component: RatesComparisonTable,
  title: 'Quote/Components/Quote/RatesComparisonTable',
} as Meta

const Template: Story<React.ComponentProps<typeof RatesComparisonTable>> = (args) => <RatesComparisonTable {...args} />

export const Default = Template.bind({})

Default.args = {
  currentSupplier: {
    id: '1',
    name: 'Example Current Supplier',
    logo_file_name: '',
    is_displayed_on_current_supplier_list: true,
  },
  nextSupplier: {
    id: '2',
    name: 'Example Next Supplier',
    logo_file_name: '',
    is_displayed_on_current_supplier_list: true,
  },
  currentSupplierRates: quoteRatesBuilder()
    .withDayUnitRate(80)
    .withEveningUnitRate(50)
    .withNightUnitRate(30)
    .withWendUnitRate(undefined as unknown as number)
    .withOffPeakUnitRate(30)
    .withStandingCharge(100)
    .withPriceGuaranteed(3)
    .build(),
  nextSupplierRates: quoteRatesBuilder()
    .withDayUnitRate(70)
    .withEveningUnitRate(undefined as unknown as number)
    .withNightUnitRate(40)
    .withWendUnitRate(undefined as unknown as number)
    .withOffPeakUnitRate(30)
    .withStandingCharge(125)
    .withPriceGuaranteed(2)
    .withContractType('Example Next Contract Type')
    .build(),
}

export const WithLongDecimalNumbers = Template.bind({})
WithLongDecimalNumbers.args = {
  ...Default.args,

  // this story is to test the display of long decimal numbers
  // so we take the rates from Default and add a few decimal places to them
  currentSupplierRates: Default.args.currentSupplierRates
    ? {
        ...Default.args.currentSupplierRates,
        standing_charge: Default.args.currentSupplierRates.standing_charge + 0.3999999,
        day_unit_rate: Default.args.currentSupplierRates.day_unit_rate + 0.3999999,
        evening_unit_rate: Default.args.currentSupplierRates.evening_unit_rate + 0.3999999,
        night_unit_rate: Default.args.currentSupplierRates.night_unit_rate + 0.3999999,
        weekend_unit_rate: (Default.args.currentSupplierRates.weekend_unit_rate || 0) + 0.3999999,
        off_peak_unit_rate: Default.args.currentSupplierRates.off_peak_unit_rate + 0.3999999,
        annual_price: Default.args.currentSupplierRates.annual_price + 0.3999999,
      }
    : undefined,
  nextSupplierRates: Default.args.nextSupplierRates
    ? {
        ...Default.args.nextSupplierRates,
        standing_charge: Default.args.nextSupplierRates.standing_charge + 0.3999999,
        day_unit_rate: Default.args.nextSupplierRates.day_unit_rate + 0.3999999,
        evening_unit_rate: (Default.args.nextSupplierRates.evening_unit_rate || 0) + 0.3999999,
        night_unit_rate: Default.args.nextSupplierRates.night_unit_rate + 0.3999999,
        weekend_unit_rate: (Default.args.nextSupplierRates.weekend_unit_rate || 0) + 0.3999999,
        off_peak_unit_rate: Default.args.nextSupplierRates.off_peak_unit_rate + 0.3999999,
        annual_price: Default.args.nextSupplierRates.annual_price + 0.3999999,
      }
    : undefined,
}
