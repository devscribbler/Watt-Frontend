import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { storyDecorator } from '../utils/storybook'
import ThankYouPage from './thank-you.page'

export default {
  component: ThankYouPage,
  title: 'Quote/Pages/4 - Register',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof ThankYouPage>> = (args) => <ThankYouPage {...args} />

export const Default = Template.bind({})

Default.args = {}
