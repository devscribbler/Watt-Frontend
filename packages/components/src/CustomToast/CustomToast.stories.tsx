import { Story, Meta } from '@storybook/react'
import { CustomToast } from './index'

export default {
  component: CustomToast,
  title: 'Quote/Components/CustomToast',
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

const Template: Story<React.ComponentProps<typeof CustomToast>> = (args) => <CustomToast {...args} />

export const Error = Template.bind({})

Error.args = {
  severity: 'error',
  children: 'This is an error toast!',
}

export const Success = Template.bind({})

Success.args = {
  severity: 'success',
  children: 'This is a successful toast!',
}
