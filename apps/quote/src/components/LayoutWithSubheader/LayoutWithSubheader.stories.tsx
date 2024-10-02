import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { LayoutWithSubheader } from './LayoutWithSubheader'

export default {
  component: LayoutWithSubheader,
  title: 'Quote/Components/Layout/LayoutWithSubheader',
} as Meta

const Template: Story<React.ComponentProps<typeof LayoutWithSubheader>> = (args) => <LayoutWithSubheader {...args} />

export const Default = Template.bind({})

Default.args = {
  steps: [
    {
      index: 0,
      label: 'Active Step',
      page: 'Active Step',
      state: 'active',
    },
    {
      index: 1,
      label: 'Default Step1',
      page: 'Default Step',
      state: 'default',
    },
    {
      index: 2,
      label: 'Default Step2',
      page: 'Default Step',
      state: 'default',
    },
  ],
  children: <div>LayoutWithSubheader</div>,
}
