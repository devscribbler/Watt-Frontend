import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { IconLookup } from '../IconLookup'
import { IconType } from '../types'

type StoryArgs = {
  data: `${IconType}`
  height: number
  width: number
}

const IconSelect = (props: StoryArgs) => {
  const Icon = IconLookup[props.data]
  return <Icon height={props.height} width={props.width} />
}

export default {
  title: 'Quote/Components/Icons',
  component: IconSelect,
  argTypes: {
    data: {
      options: [
        'CloseIcon',
        'DatepickerIcon',
        'DealCompleted',
        'DocumentIcon',
        'DownArrow',
        'DownloadIcon',
        'EnergyIcon',
        'GasIcon',
        'InfoIcon',
        'InternetIcon',
        'MenuIcon',
        'MoreIcon',
        'OngoingIcon',
        'RightChevronIcon',
        'SavingsIcon',
        'StarIcon',
        'TelecomIcon',
        'TreeIcon',
        'UpArrow',
        'WaterIcon',
      ],
      control: {
        type: 'select',
      },
    },
    height: {
      control: { type: 'number' },
    },
    width: {
      control: { type: 'number' },
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof IconSelect>> = (args) => <IconSelect {...args} />

export const Icon = Template.bind({})

Icon.args = {
  data: 'GasIcon',
  height: 50,
  width: 50,
}
