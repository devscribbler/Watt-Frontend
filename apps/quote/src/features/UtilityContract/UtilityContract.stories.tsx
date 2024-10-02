import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { SnackbarProvider } from 'notistack'
import { storyDecorator } from '~/utils/storybook'
import { UtilityContract } from './UtilityContract'

export default {
  component: UtilityContract,
  title: 'Quote/Features/UtilityContract',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof UtilityContract>> = () => (
  <SnackbarProvider>
    <UtilityContract />
  </SnackbarProvider>
)

export const Default = Template.bind({})

Default.args = {}
