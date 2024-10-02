import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { storyDecorator } from '~/utils/storybook'
import IndexPage from './index.page'

export default {
  component: IndexPage,
  title: 'Quote/Pages/1 - Index',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof IndexPage>> = (args) => <IndexPage {...args} />

export const Default = Template.bind({})

Default.args = {}
