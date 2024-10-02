import * as React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Story, Meta } from '@storybook/react'
import { enGB } from 'date-fns/locale'
import { SnackbarProvider } from 'notistack'
import { UTILITIES_LOOKUP } from '@watt/constants'
import { useAppSelector } from '~/store/selectors'
import { storyDecorator } from '~/utils/storybook'
import { UtilityInformation } from './UtilityInformation'

export default {
  component: UtilityInformation,
  title: 'Quote/Features/UtilityInformation',
  decorators: [storyDecorator],
} as Meta

const Template: Story<React.ComponentProps<typeof UtilityInformation>> = () => {
  const usage = useAppSelector((state) => state.usage.electricity)
  return (
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <UtilityInformation utilityUsage={usage} utilityType={UTILITIES_LOOKUP.ELECTRICITY} nextPage="" />
      </LocalizationProvider>
    </SnackbarProvider>
  )
}

export const Default = Template.bind({})

Default.args = {}
