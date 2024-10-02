import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { PaymentDetailsSection } from './PaymentDetailsSection'

export default {
  component: PaymentDetailsSection,
  title: 'Quote/Components/UtilityContract/PaymentDetailsSection',
  argTypes: {
    onFormSubmit: { action: 'submitted' },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof PaymentDetailsSection>> = (args) => (
  <PaymentDetailsSection {...args} />
)

export const Default = Template.bind({})

Default.args = {
  formId: 'payment-details-form',
}
