import * as React from 'react'
import { ThemeProvider } from '@mui/material'
import { Story, Meta } from '@storybook/react'
import { theme } from '@watt/theme'
import { GetAQuoteCTA } from './GetAQuoteCTA'

export default {
  component: GetAQuoteCTA,
  title: 'Quote/Components/CTA/GetAQuoteCTA',
} as Meta

const Template: Story<React.ComponentProps<typeof GetAQuoteCTA>> = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <GetAQuoteCTA {...args} />
    </ThemeProvider>
  )
}

export const Default = Template.bind({})

Default.args = {}
