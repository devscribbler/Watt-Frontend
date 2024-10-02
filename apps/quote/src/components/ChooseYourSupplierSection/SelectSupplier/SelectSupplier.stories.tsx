import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { UtilityUsageForm } from '~/constants/forms'
import { SelectSupplier } from './SelectSupplier.component'

export default {
  component: SelectSupplier,
  title: 'Quote/Components/ChooseYourSupplierSection/SelectSupplier',
} as Meta

const Template: Story<React.ComponentProps<typeof SelectSupplier>> = (args) => {
  const defaultValues: UtilityUsageForm = {
    hasNoContract: false,
    contractStartDate: new Date().toDateString(),
    mpan: '123456789',
    mprn: '123456789',
    annualUsage: '100',
    supplier: '1',
    noWattSupplier: '',
  }

  const formData = useForm({ defaultValues })

  return <SelectSupplier providers={args.providers} formMethods={formData} />
}

export const Default = Template.bind({})
Default.args = {
  providers: [
    {
      id: '1',
      name: 'Supplier 1',
      logo_file_name: 'eon.png',
      is_displayed_on_current_supplier_list: true,
    },
    {
      id: '2',
      name: 'Supplier 2',
      logo_file_name: 'edf.png',
      is_displayed_on_current_supplier_list: true,
    },
  ],
}
