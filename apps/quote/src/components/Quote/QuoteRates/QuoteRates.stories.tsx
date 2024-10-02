import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { quoteRatesBuilder } from '@watt/constants'
import { QuoteRates } from './QuoteRates'

export default {
  component: QuoteRates,
  title: 'Quote/Components/Quote/QuoteRates',
} as Meta

const Template: Story<React.ComponentProps<typeof QuoteRates>> = (args) => <QuoteRates {...args} />

export const Default = Template.bind({})
Default.args = {
  rates: quoteRatesBuilder().build(),
}
