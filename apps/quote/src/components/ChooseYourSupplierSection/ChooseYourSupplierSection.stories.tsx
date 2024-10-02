import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { UtilityUsageForm } from '~/constants/forms'
import { ChooseYourSupplierSection } from './ChooseYourSupplierSection'

export default {
  component: ChooseYourSupplierSection,
  title: 'Quote/Components/ChooseYourSupplierSection',
} as Meta

type StoryArgs = React.ComponentProps<typeof ChooseYourSupplierSection> & { defaultValues?: Partial<UtilityUsageForm> }

const Template: Story<StoryArgs> = (args) => {
  const defaultValues: UtilityUsageForm = {
    hasNoContract: false,
    contractStartDate: new Date().toDateString(),
    mpan: '',
    mprn: '',
    annualUsage: '',
    supplier: '',
    noWattSupplier: '',

    ...args.defaultValues,
  }

  const formData = useForm({ defaultValues })
  return (
    <ChooseYourSupplierSection
      providers={args.providers}
      utilityType={args.utilityType}
      formMethods={formData}
      prefilledValues={args.prefilledValues}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  providers: [
    {
      id: '1',
      name: 'Example Current Supplier',
      logo_file_name: 'eon.png',
      is_displayed_on_current_supplier_list: true,
    },
    {
      id: '2',
      name: 'Example Next Supplier',
      logo_file_name: 'edf.png',
      is_displayed_on_current_supplier_list: true,
    },
  ],
  utilityType: 1,
  prefilledValues: undefined,
}

export const PredefinedSupplier = Template.bind({})
PredefinedSupplier.args = {
  providers: [
    {
      id: '1',
      name: 'Example Current Supplier',
      logo_file_name: 'eon.png',
      is_displayed_on_current_supplier_list: true,
    },
    {
      id: '2',
      name: 'Example Next Supplier',
      logo_file_name: 'edf.png',
      is_displayed_on_current_supplier_list: true,
    },
  ],
  utilityType: 1,
  defaultValues: {
    supplier: 'Example Current Supplier',
    noWattSupplier: 'Example Current Supplier',
  },
  prefilledValues: {
    supplier: 'Example Current Supplier',
    noWattSupplier: 'Example Current Supplier',
    // ===
    hasNoContract: false,
    contractStartDate: new Date().toDateString(),
    mpan: '123456789',
    mprn: '123456789',
    annualUsage: '100',
  },
}
