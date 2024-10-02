import * as React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Story, Meta } from '@storybook/react'
import { enGB } from 'date-fns/locale'
import { SnackbarProvider } from 'notistack'
import { TEN_SECONDS } from '@watt/constants'
import { storyDecorator } from '~/utils/storybook'
import CompanyInformationPage from './company.page'

export default {
  component: CompanyInformationPage,
  title: 'Quote/Pages/2 - Company Information',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof CompanyInformationPage>> = (args) => (
  <SnackbarProvider maxSnack={3} autoHideDuration={TEN_SECONDS}>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <CompanyInformationPage {...args} />
    </LocalizationProvider>
  </SnackbarProvider>
)

export const CompanyInformation = Template.bind({})

CompanyInformation.args = {}
