import * as React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Story, Meta } from '@storybook/react'
import { enGB } from 'date-fns/locale'
import { storyDecorator } from '../../utils/storybook'
import GasInformationPage from './index.page'

export default {
  component: GasInformationPage,
  title: 'Quote/Pages/3 - Gas/1 - Information',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof GasInformationPage>> = (args) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
    <GasInformationPage {...args} />
  </LocalizationProvider>
)

export const Default = Template.bind({})

Default.args = {}
