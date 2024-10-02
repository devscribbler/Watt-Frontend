import { Story, Meta } from '@storybook/react'
import { ButtonLoading, ButtonLoadingProps } from './ButtonLoading'

export default {
  title: 'Quote/Components/Buttons/ButtonLoading',
  component: ButtonLoading,
} as Meta

const LoadingTemplate: Story<ButtonLoadingProps> = (args) => <ButtonLoading {...args} />

export const LoadingSpinner = LoadingTemplate.bind({})
