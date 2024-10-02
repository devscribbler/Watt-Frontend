import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { MobileDrawerContent } from './MobileDrawerContent'

export default {
  component: MobileDrawerContent,
  title: 'Quote/Components/MobileDrawerContent',
} as Meta

const Template: Story<React.ComponentProps<typeof MobileDrawerContent>> = () => <MobileDrawerContent />

export const Default = Template.bind({})
