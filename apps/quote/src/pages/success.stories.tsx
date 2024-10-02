import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { storyDecorator } from '../utils/storybook'
import ConfirmationPage from './success.page'

export default {
  component: ConfirmationPage,
  title: 'Quote/Pages/5 - ConfirmationPage',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof ConfirmationPage>> = (args) => <ConfirmationPage {...args} />

export const Default = Template.bind({})

Default.args = {}
