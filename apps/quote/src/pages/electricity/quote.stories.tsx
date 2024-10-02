import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { storyDecorator } from '../../utils/storybook'
import ElectricityQuotePage from './quote.page'

export default {
  component: ElectricityQuotePage,
  title: 'Quote/Pages/3 - Electricity/2 - Quote',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof ElectricityQuotePage>> = (args) => <ElectricityQuotePage {...args} />

export const Default = Template.bind({})

Default.args = {}
