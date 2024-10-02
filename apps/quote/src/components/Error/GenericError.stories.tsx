import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { GenericError } from './GenericError'

export default {
  component: GenericError,
  title: 'Quote/Components/GenericError',
} as Meta

const Template: Story<React.ComponentProps<typeof GenericError>> = () => {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
      <GenericError />
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {}
