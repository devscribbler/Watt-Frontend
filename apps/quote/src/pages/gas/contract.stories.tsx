import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { storyDecorator } from '../../utils/storybook'
import GasContractSigningPage from './contract.page'

export default {
  component: GasContractSigningPage,
  title: 'Quote/Pages/3 - Gas/3 - Contract',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof GasContractSigningPage>> = (args) => (
  <GasContractSigningPage {...args} />
)

export const Default = Template.bind({})

Default.args = {}
