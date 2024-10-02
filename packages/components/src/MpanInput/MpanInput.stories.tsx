import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { MpanInput } from './MpanInput.component'

export default {
  component: MpanInput,
  title: 'Quote/Components/MpanInput',
  argTypes: { onChange: { action: 'changed' } },
} as Meta

const Template: Story<React.ComponentProps<typeof MpanInput>> = (args) => <MpanInput {...args} />

export const Default = Template.bind({})

Default.args = {
  value: '000000000000',
  id: 'mpan',
  error: false,
  disabled: false,
}
