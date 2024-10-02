import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ContractPreviewSection } from './ContractPreviewSection'

export default {
  component: ContractPreviewSection,
  title: 'Quote/Components/UtilityContract/ContractPreviewSection',
} as Meta

const Template: Story<React.ComponentProps<typeof ContractPreviewSection>> = (args) => (
  <ContractPreviewSection {...args} />
)

export const Default = Template.bind({})

Default.args = {
  url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
}
