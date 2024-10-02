import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { UtilitySelector } from './UtilitySelector'
import { UtilityType } from './UtilityType'

export default {
  component: UtilitySelector,
  title: 'Quote/Components/UtilitySelector/UtilitySelector',
} as Meta

const Template: Story<React.ComponentProps<typeof UtilitySelector>> = (args) => <UtilitySelector {...args} />

export const Default = Template.bind({})

Default.args = {
  type: UtilityType.ELECTRICITY,
  supplierCount: 109,
  disabled: false,
}
