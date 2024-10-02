import * as React from 'react'
import { Input } from '@mui/material'
import { Meta, Story } from '@storybook/react'
import { InfoIconWithTooltip } from '.'

interface InfoTooltipProps {
  toolTipTitle: string
  value: string
  type: string
}

const Component = (props: InfoTooltipProps) => {
  return (
    <Input
      type={props.type}
      value={props.value}
      endAdornment={<InfoIconWithTooltip tooltipProps={{ title: props.toolTipTitle }} />}
    />
  )
}

export default {
  title: 'Quote/Components/InfoIconWithTooltip',
  component: Component,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          'text',
          'password',
          'email',
          'number',
          'search',
          'tel',
          'url',
          'date',
          'time',
          'datetime-local',
          'month',
          'week',
          'color',
        ],
      },
    },
    toolTipTitle: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Component>> = (args) => {
  return <Component {...args} />
}

export const InfoToolTip = Template.bind({})

InfoToolTip.args = {
  type: 'text',
  toolTipTitle: 'This is an example tooltip',
  value: 'Example value',
}
