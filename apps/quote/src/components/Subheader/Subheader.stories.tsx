import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Subheader } from './Subheader'

export default {
  component: Subheader,
  title: 'Quote/Components/Subheader',
} as Meta

const Template: Story<React.ComponentProps<typeof Subheader>> = (args) => <Subheader {...args} />

export const Default = Template.bind({})

Default.args = {
  steps: [
    {
      index: 0,
      page: 'Active Step',
      label: 'This is an Active step',
      state: 'active',
    },
    {
      index: 1,
      page: 'Completed Step',
      label: 'This is a Completed step',
      state: 'completed',
    },
    {
      index: 2,
      page: 'Default Step',
      label: 'This is a Default step',
      state: 'default',
    },
  ],
}
