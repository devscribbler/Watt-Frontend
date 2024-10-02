import * as React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Story, Meta } from '@storybook/react'
import { enGB } from 'date-fns/locale'
import { storyDecorator } from '../../utils/storybook'
import ElectricityInformationPage from './index.page'

export default {
  component: ElectricityInformationPage,
  title: 'Quote/Pages/3 - Electricity/1 - Information',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof ElectricityInformationPage>> = (args) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
    <ElectricityInformationPage {...args} />
  </LocalizationProvider>
)

export const Default = Template.bind({})

Default.args = {}
