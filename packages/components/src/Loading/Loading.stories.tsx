import { Story, Meta } from '@storybook/react'
import { LoadingSpinnerBackdrop } from './LoadingSpinnerBackdrop'

export default {
  title: 'Quote/Components/Loading/LoadingPage',
  component: LoadingSpinnerBackdrop,
} as Meta

const LoadingTemplate: Story<typeof LoadingSpinnerBackdrop> = (args) => <LoadingSpinnerBackdrop {...args} />

export const LoadingSpinner = LoadingTemplate.bind({})
