import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { ThankYouSection } from './ThankYouSection'

export default {
  component: ThankYouSection,
  title: 'Quote/Components/ThankYouSection',
} as Meta

const Template: Story<React.ComponentProps<typeof ThankYouSection>> = (args) => <ThankYouSection {...args} />

export const Default = Template.bind({})

Default.args = {
  isNewClient: false,
}
