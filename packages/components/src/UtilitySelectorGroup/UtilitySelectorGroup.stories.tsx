import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { UtilityType } from '../UtilitySelector'
import { UtilitySelectorGroup } from './UtilitySelectorGroup'

export default {
  component: UtilitySelectorGroup,
  title: 'Quote/Components/UtilitySelector/UtilitySelectorGroup',
  argTypes: { onChange: { action: 'changed' } },
} as Meta

const Template: Story<React.ComponentProps<typeof UtilitySelectorGroup>> = (args) => <UtilitySelectorGroup {...args} />

export const Default = Template.bind({})

Default.args = {
  utilities: [
    {
      type: UtilityType.ELECTRICITY,
      supplierCount: 109,
      disabled: false,
    },
    {
      type: UtilityType.GAS,
      supplierCount: 25,
      disabled: false,
    },
    {
      type: UtilityType.WATER,
      supplierCount: 77,
      disabled: true,
    },
    {
      type: UtilityType.TELEPHONE,
      supplierCount: 87,
      disabled: true,
    },
    {
      type: UtilityType.INTERNET,
      supplierCount: 12,
      disabled: true,
    },
  ],
}
