import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { LayoutDefault } from './LayoutDefault'

export default {
  component: LayoutDefault,
  title: 'Quote/Components/Layout/LayoutDefault',
} as Meta

const Template: Story<React.ComponentProps<typeof LayoutDefault>> = (args) => <LayoutDefault {...args} />

export const Default = Template.bind({})

Default.args = {
  children: <div>LayoutDefault</div>,
}
