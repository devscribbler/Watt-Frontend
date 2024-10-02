import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { ComparePricesButton } from './ComparePricesButton'

export default {
  component: ComparePricesButton,
  title: 'Quote/Components/Quote/ComparePricesButton',
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof ComparePricesButton>> = (args) => {
  return <ComparePricesButton onClick={args.onClick} showComparison={args.showComparison} />
}

export const Default = Template.bind({})

Default.args = {
  showComparison: false,
}
