import * as React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Story, Meta } from '@storybook/react'
import { enGB } from 'date-fns/locale'
import { SnackbarProvider } from 'notistack'
import { TEN_SECONDS } from '@watt/constants'
import { storyDecorator } from '~/utils/storybook'
import { CompanyInformationForm } from './CompanyInformationForm'

export default {
  component: CompanyInformationForm,
  title: 'Quote/Features/CompanyInformationForm',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof CompanyInformationForm>> = (args) => (
  <SnackbarProvider maxSnack={3} autoHideDuration={TEN_SECONDS}>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <CompanyInformationForm {...args} />
    </LocalizationProvider>
  </SnackbarProvider>
)

export const Default = Template.bind({})

Default.args = {}
