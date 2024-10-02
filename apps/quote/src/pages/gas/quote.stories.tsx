import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { storyDecorator } from '../../utils/storybook'
import GasQuotePage from './quote.page'

export default {
  component: GasQuotePage,
  title: 'Quote/Pages/3 - Gas/2 - Quote',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof GasQuotePage>> = (args) => <GasQuotePage {...args} />

export const Default = Template.bind({})

Default.args = {}
