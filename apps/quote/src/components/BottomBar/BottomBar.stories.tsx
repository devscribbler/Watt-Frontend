import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { BottomBar } from './BottomBar.component'

export default {
  component: BottomBar,
  title: 'Quote/Components/BottomBar',
} as Meta

const Template: Story<React.ComponentProps<typeof BottomBar>> = (args) => {
  return <BottomBar previousButtonProps={args.previousButtonProps} nextButtonProps={args.nextButtonProps} />
}

export const Default = Template.bind({})

Default.args = {
  previousButtonProps: {},
  nextButtonProps: {
    loading: false,
    children: 'Next',
  },
}
