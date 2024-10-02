import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'
import { CompanyDetailsForm } from '../../formConfig'
import { EmailInput } from './EmailInput'

export default {
  component: EmailInput,
  title: 'Quote/Components/EmailInput',
} as Meta

const Template: Story<React.ComponentProps<typeof EmailInput>> = () => {
  const methods = useForm<CompanyDetailsForm>({})

  return (
    <FormProvider {...methods}>
      <form id="123">
        <EmailInput />
      </form>
    </FormProvider>
  )
}

export const Default = Template.bind({})

Default.args = {}
