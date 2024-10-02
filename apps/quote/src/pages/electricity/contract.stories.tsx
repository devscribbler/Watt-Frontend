import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { storyDecorator } from '../../utils/storybook'
import ElectricityContractSigningPage from './contract.page'

export default {
  component: ElectricityContractSigningPage,
  title: 'Quote/Pages/3 - Electricity/3 - Contract',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof ElectricityContractSigningPage>> = (args) => (
  <ElectricityContractSigningPage {...args} />
)

export const Default = Template.bind({})

Default.args = {}
