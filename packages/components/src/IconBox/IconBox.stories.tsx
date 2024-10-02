import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { IconBox } from '.'

export default {
  title: 'Quote/Components/IconBox',
  component: IconBox,
  argTypes: {
    bgcolor: { defaultValue: '#2341e1', control: 'color' },
    height: { control: 'number' },
    width: { control: 'number' },
    className: { control: 'text' },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof IconBox>> = (args) => <IconBox {...args} />

export const EmptyIconBox = Template.bind({})
