import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { SupplierInfoSection } from './SupplierInfoSection'

export default {
  component: SupplierInfoSection,
  title: 'Quote/Components/Quote/SupplierInfoSection',
} as Meta

const Template: Story<React.ComponentProps<typeof SupplierInfoSection>> = (args) => <SupplierInfoSection {...args} />

export const Default = Template.bind({})

Default.args = {
  supplier: {
    id: '1',
    name: 'Example Current Supplier',
    logo_file_name: '',
    is_displayed_on_current_supplier_list: true,
  },
}
