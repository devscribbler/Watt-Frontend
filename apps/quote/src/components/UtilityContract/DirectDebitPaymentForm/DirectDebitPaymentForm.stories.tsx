import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { DirectDebitPaymentForm } from './DirectDebitPaymentForm'

export default {
  component: DirectDebitPaymentForm,
  title: 'Quote/Components/UtilityContract/DirectDebitPaymentForm',
  argTypes: {
    onFormSubmit: { action: 'submitted' },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof DirectDebitPaymentForm>> = (args) => (
  <DirectDebitPaymentForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  formId: 'direct-debit-payment-form',
}
