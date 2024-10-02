import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { AnnualEstimateSection } from './AnnualEstimateSection'

export default {
  component: AnnualEstimateSection,
  title: 'Quote/Components/Quote/AnnualEstimateSection',
} as Meta

const Template: Story<React.ComponentProps<typeof AnnualEstimateSection>> = (args) => {
  return <AnnualEstimateSection annualEstimate={args.annualEstimate} />
}

export const Default = Template.bind({})

Default.args = {
  annualEstimate: 12456,
}
