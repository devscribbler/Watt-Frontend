import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { SnackbarProvider } from 'notistack'
import { storyDecorator } from '~/utils/storybook'
import { UtilityQuote } from './UtilityQuote'

export default {
  component: UtilityQuote,
  title: 'Quote/Features/ElectricityQuote',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof UtilityQuote>> = () => (
  <SnackbarProvider>
    <UtilityQuote />
  </SnackbarProvider>
)

export const Default = Template.bind({})

Default.args = {}
